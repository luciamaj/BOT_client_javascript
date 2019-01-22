$('#inputRegisterBtn').on('click', function(e) {
    e.preventDefault();
  
    var dataToSend = {
    email: $("#inputEmail").val(),
    password: $("#inputPassword").val(),
    username: $("#inputUsername").val()
    } 
  
    $.ajax({
        url: 'http://localhost:8000/api/register',
        type: 'POST',
        dataType: 'json',
        data: dataToSend,
        success: function(data) {
            console.log(data)
            bootbox.alert("Success", function(){ 
                window.location.replace("login.html");
            });
        },
        error: function() {
            console.log(dataToSend);
            console.log("error");
        }
    });
});