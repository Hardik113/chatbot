window.onload = function () {
    var socket = io.connect();
    socket.on('connect', function () {
    // send a join event with your name
        socket.emit('join', '');
        // show the chat
            // socket.on('announcement', function (msg) {
            //     var li = document.createElement('li');
            //     li.className = 'announcement';
            //     li.innerHTML = msg;
            //     document.getElementById('messages').appendChild(li);
    // });
});

function addUserMessage (text) {
    console.log('User:'+text);
    var msg = '<div class = "msg" id = "user"><p class = "head">User:</p><p class = "msg-con">'+text+'</p></div>';
    $('.messages').append(msg);
}

function addBotMessage(text) {
    var msg = '<div class = "msg" id = "bot"><p class = "head">Sierra:</p><p class = "msg-con">' + text + '</p></div>';
    console.log('Bot:'+text);
    $('.messages').append(msg);
}

var input = $('textarea');

$('.submit').click(function(){
    addUserMessage(input.val());
    socket.emit('text', input.val());
    input.val('');
    input.focus();
});

$('.logout').click(function(){
    alert("Logout Successfull");
    $(location).attr('href','landing.html');
});

socket.on('bmsg', addBotMessage);

}