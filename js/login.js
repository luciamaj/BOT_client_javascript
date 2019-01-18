var token;

$('#inputLoginBtn').on('click', function(e) {
    e.preventDefault();
  
    var dataToSend = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val()
    } 
  
    $.ajax({
        url: 'http://localhost:8000/api/login',
        type: 'POST',
        dataType: 'json',
        data: dataToSend,
        success: function(data) {
            console.log(data)
            token = data.api_token;
            localStorage.token = token;
            window.location.replace("manager.html");
        },
        error: function() {
            console.log(dataToSend);
            console.log("error");
        }
    });
  });