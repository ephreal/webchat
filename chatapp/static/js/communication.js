$(document).ready(function() {

    // Catch the enter key if the focus is the chat message
    $("#chat_message").on("keyup", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#chat_submit").click();
        }
    });

    var chat_namespace = io.connect('/chat');

    // Initial connection handling
    chat_namespace.on('connect', function() {
        $("#status").text("Connected");
        console.log("Connection initiated");
    });


    // message handling
    chat_namespace.on('message', function(msg) {
        $('#messages').append('<p>' + msg + '</p>');
        $("#messages").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 1000);
        $("#messages").stop(false, true);
    });


    // Handling the submit button
    $("#chat_submit").on('click', function() {
        var username = $('#chat_username').val();
        var message = $('#chat_message').val();
        message = '<strong>' + username + ':</strong> ' + message;
        $('#chat_message').val('');

        chat_namespace.send(message);
    });
});
