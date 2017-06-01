var express = require('express')
, sio = require('socket.io')

var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var wait = false;
var conversation = new ConversationV1({
  username: 'be5fb214-90b8-40e6-971a-6b29043a740f', // replace with username from service key
  password: 'muemQLlWMdBa', // replace with password from service key
  path: { workspace_id: 'cf22ad4d-9c78-42d4-a368-16cc7acda83c' }, // replace with workspace ID
  version_date: '2016-07-11'
});

app = express.createServer(
express.bodyParser()
, express.static('public')
);

app.listen(3000);
var io = sio.listen(app);
io.sockets.on('connection', function (socket) {

socket.on('join', function (name) {
    console.log('At least chala to');
    conversation.message({}, processResponse);
});


function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    console.log('gadbad');
    return;
  }

  var endConversation = false;
  
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }
  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      if(wait === false)
        socket.emit('bmsg',response.output.text[0]);
      wait = true;
  }

  socket.on('text', function (msg) {
      wait = false;
     if(!endConversation){
            conversation.message({
            input: { text: msg},
            context: response.context
        }, processResponse);

        }
    });

}


});