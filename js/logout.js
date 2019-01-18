$('#logoutBtn').on('click', function(e) {
    e.preventDefault();
    localStorage.token = "vuoto";
    console.log("token", localStorage.token);
    window.open('index.html', '_self', false);
});