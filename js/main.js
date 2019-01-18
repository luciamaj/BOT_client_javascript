$('#sendBtn').on('click', function(e) {
  e.preventDefault();

  var dataToSend = {
    content: $("#userInput").val()
  } 

  $.ajax({
      url: 'http://localhost:8000/api/query',
      type: 'POST',
      dataType: 'json',
      data: dataToSend,
      success: function(data) {
        $(".content-card").append("<p class='message-container-mine'><span class='message-mine'>" + $('#userInput').val() + "</span></p>");
        $('#userInput').val('');
        sleep(800).then(() => {
          if (data.content == 'error') {
            $(".content-card").append("<p class='message-container'><span class='message'>Sorry, I didn't get it</span><br><button onclick=\"location.href='programmer.html'\" type='button' class='btn btn-light btn-operator'>Talk with a real programmer</button></p>");
          }
          else if (data.content == 'negative') {
            $(".content-card").append("<p class='message-container'><span class='message'>You seem angry</span><br><button onclick=\"location.href='programmer.html'\" type='button' class='btn btn-light btn-operator'>Talk with a real programmer</button></p>");
          }
          else {
            $(".content-card").append("<p class='message-container'><span class='message'>" + data.content + "</span></p>");
          }
          if(data.filename) {
            sleep(400).then(() => {
              $(".content-card").append("<p class='message-container'><img src='http://localhost:8000/uploads/" + data.filename  + "' alt='code pieces' width='100%'></p>");
            });
          }
        });
      },
      error: function() {
          console.log("error");
      }
  });
});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

