$(document).ready(function(){

    var db_ref = firebase.database();
    var auth = firebase.auth();

    auth.signOut();

    $('.reg').click(function(){
        $('.modal-box').css('display','flex');
    });

    $('.log-form').click(function(){
        $(this).css('color','#0097A7');
        $('.reg-form').css('color','rgb(98,230,219)');
        $('#logf').css('display','block');
        $('#regf').css('display','none');
    });

    $('.reg-form').click(function(){
        $(this).css({'color':'#0097A7'});
        $('.log-form').css('color','rgb(98,230,219)');
        $('#regf').css('display','block');
        $('#logf').css('display','none');
    });

    $('.close').click(function(){
        $('.modal-box').css('display','none');
    });

    $('#log_button').click(function(){
        var email = $('#l_email').val();
        var pass = $('#l_pass').val();
        const e = auth.signInWithEmailAndPassword(email,pass).catch(function(error){
            console.log(error.message);
        });
        alert("Login Successfull");
        window.location.href = "http://localhost:3000";
    });

    $('#reg_button').click(function(){
        var email = $('#r_email').val();
        var pass = $('#r_pass').val();
        var reg = $('[name="regno"]').val();
        var name = $('[name="full_name"]').val();
        var mob = $('[name="mob"]').val();
        var pass = $('#r_pass').val();

        var data = {
            u_name: name,
            u_email: email,
            u_reg: reg,
            u_mob: mob
        }

        const e = auth.createUserWithEmailAndPassword(email,pass).catch(function(error){
            console.log(error.message);
        });

        db_ref.ref('users/'+reg).set(data);

        alert("Registration Complete");
        $(location).attr('href','http://localhost:3000');

    });

    $('.cme-submit').click(function(){
        var name = $('[name="uname"]').val();
        var msg = $('textarea').val();
        var mob = $('[name="uphone"]').val();
        var email = $('[name="uemail"]').val();

        var data = {
            uname: name,
            umsg: msg,
            umob: mob,
            uemail: email
        }

        db_ref.ref('cme/'+name).set(data);
        alert("Message Sent Successfully");

        $('[name="uname"]').val('');
        $('textarea').val('');
        $('[name="uphone"]').val('');
        $('[name="uemail"]').val('');

    });

    auth.onAuthStateChanged(user => {
        if(user){
            console.log(user);
        }
        else{
            console.log("Not Logged In");
        }
    });


});