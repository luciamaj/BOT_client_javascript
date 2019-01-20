var latest = "";

function checkForNewMessages() {
    $.ajax({
        url: 'http://localhost:8000/api/last-question',
        type: 'POST',
        dataType: 'json',
        data: '',
        success: function(data) {
            if (data.content != null && data.created_at != latest && localStorage.token != "vuoto") {
                latest = data.created_at;
                if(data.is_dev == 0) {
                    $(".content-card").append("<p class='message-container'><span class='message-mine'>" + data.content + "</span></p>");
                }
            }
            else if(data.content != null && data.created_at != latest && localStorage.token == "vuoto") {
                latest = data.created_at;
                if(data.is_dev == 1) {
                    $(".content-card").append("<p class='message-container'><span class='message-mine'>" + data.content + "</span></p>");
                }
            }
        },
        error: function() {
            console.log("error");
        }
    });
}

window.setInterval(function(){
    checkForNewMessages();
}, 200);

$('#sendBtnProg').on('click', function(e) {
    e.preventDefault();
    console.log(localStorage.token);
    if(localStorage.token == "vuoto") {
        console.log("sono nell'if");
        var dataToSend = {
            content: $("#userInput2").val(),
        } 

        $.ajax({
            url: 'http://localhost:8000/api/question-user',
            type: 'POST',
            dataType: 'json',
            data: dataToSend,
            success: function(data) {
                $(".content-card").append("<p class='message-container-mine'><span class='message'>" + dataToSend.content + "</span><br></p>");
                $("#userInput2").val('');
            },
            error: function() {
                console.log(dataToSend);
                console.log("error");
            }
        });
    }
    else {
        var dataToSend = {
            content: $("#userInput2").val(),
            ip: localStorage.ip
        } 
      
        $.ajax({
            url: 'http://localhost:8000/api/questions',
            type: 'POST',
            dataType: 'json',
            data: dataToSend,
            success: function(data) {
                console.log("sono nell'else");
                $(".content-card").append("<p class='message-container-mine'><span class='message'>" + dataToSend.content + "</span><br></p>");
                $("#userInput2").val('');
            },
            error: function() {
                console.log(dataToSend);
                console.log("error");
            }
        });
    }
  });  