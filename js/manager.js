window.onload = function () {
    loadChats();
    loadAnswers();
}

function loadChats() {
    $.ajax({
        url: 'http://localhost:8000/api/grouped-questions',
        type: 'GET',
        dataType: 'json',
        data: '',
        crossDomain: true,
        success: function(data) {
            console.log(data);
            for (var prop in data) {
                var ip = prop;
                var mesNum = data[prop].length;
                var lastMes = data[prop][data[prop].length - 1]["created_at"];
                $(".col-content").append("<a class='ui card'><div data-ip='" + ip + "' class='link-to-chat ui raised link card'><div class='content'><div class='header'>IP: <span class='ip-number'>"+ ip +"</span></div><div class='meta'><span class='category'>Last message: <span>" + lastMes + "</span></span></div><div class='description'><p></p></div></div><div class='extra content'><div class='right floated author'>Numero di messaggi inviati: <span>" + mesNum + "</span></div></div></div></a>");
            }
        },
        error: function() {
            console.log("error");
        }
    });
}

function loadAnswers() {
    $.ajax({
        url: 'http://localhost:8000/api/answers',
        type: 'GET',
        dataType: 'json',
        data: '',
        crossDomain: true,
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                var longContent = data[i]["content"];
                var link = data[i]["filename"];
                var shortContent = longContent.substring(0, 40);
                shortContent = shortContent + "...";
                if(link != null) {
                    $(".list-answers").append("<div class='item'><div class='right floated content'><div class='ui button listAns' data-id='" +  data[i]["id"] +  "'>Add word</div><div class='ui button delKeys' data-id='" +  data[i]["id"] +  "'>Delete words</div><div class='ui button delBtn' data-id='" +  data[i]["id"] +  "'>Delete</div></div><img class='ui avatar image' src='http://localhost:8000/uploads/" + link  +  "'><div class='content'>" + shortContent  +  "</div></div>");
                }
                else{
                    $(".list-answers").append("<div class='item'><div class='right floated content'><div class='ui button listAns' data-id='" +  data[i]["id"] +  "'>Add word</div><div class='ui button delKeys' data-id='" +  data[i]["id"] +  "'>Delete words</div><div class='ui button delBtn' data-id='" +  data[i]["id"] +  "'>Delete</div></div><img class='ui avatar image' src='img/placeholder-image.jpg'><div class='content'>" + shortContent  +  "</div></div>");
                }
            }
        },
        error: function() {
            console.log("error");
        }
    });
}

$(document).on('click', '.link-to-chat', function (e) {
    e.preventDefault();
    var selectedIp = $(this).data('ip');
    localStorage.ip = selectedIp;
    console.log(localStorage.ip);
    window.open('programmer-chat.html', '_blank');
});


$(document).on('click', '.listAns', function (e) {
    var id = $(this).data('id');
    bootbox.prompt("Add keywords to " + $(this).data('id'), function(result){ 
        if(result != "" && result != null) {
            saveWord(id, result)
        }
     });
});

$(document).on('click', '.delKeys', function (e) {
    var id = $(this).data('id');

    var keywords = [];

    $.ajax({
        url: 'http://localhost:8000/api/show-keywords/' + id,
        type: 'GET',
        dataType: 'json',
        data: '',
        crossDomain: true,
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                var word = { text: data[i]["word"], value: data[i]["id"] }
                keywords.push(word);
            }
            createPopUp(keywords);
            console.log(keywords);
        },
        error: function() {
            console.log("error");
        }
    });
});

function createPopUp(keywords) {
    bootbox.prompt({
        title: "Words",
        inputType: 'checkbox',
        inputOptions: keywords,
        callback: function (result) {
            deleteKeywords(result);
        }
    });
}

function deleteKeywords(result) {
    if(result) {
        $.ajax({
            url: 'http://localhost:8000/api/keywords-delete',
            type: 'POST',
            dataType: 'json',
            data: { keywords: result },

            success: function(data) {
                console.log("SUCCESS");
                console.log(data);
                location.reload();
            },
            error: function(e) {
                console.log("error");
                console.log(e);
            }
        });
    }  
}

$(document).on('click', '.delBtn', function (e) {
    var id = $(this).data('id');
    bootbox.confirm("Are you sure you want to delete the answer?", function(result){ 
        confirmDelete(id, result)
     });
});

function confirmDelete (id, result) {
    if(result == true) {
        $.ajax({
            url: 'http://localhost:8000/api/answers-delete/' + id,
            type: 'GET',
            dataType: 'json',
            data: '',

            success: function(data) {
                console.log(data);
                location.reload();
            },
            error: function(e) {
                console.log("error");
                console.log(e);
            }
        });  
    }
}

function saveWord (id, word) {
    var dataToSend = {
        answer_id: id,
        word: word
    }

    $.ajax({
        url: 'http://localhost:8000/api/keywords',
        type: 'POST',
        dataType: 'json',
        data: dataToSend,

        success: function(data) {
            console.log(data);
        },
        error: function(e) {
            console.log("error");
            console.log(e);
            console.log(dataToSend);
        }
    });
}

$("#sendForm").on('submit',(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
        url: 'http://localhost:8000/api/answers',
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        data: formData,
        crossDomain: true,
        
        success: function(data) {
            console.log(data);
            location.reload(); 
        },
        error: function(data) {
            console.log(data);
            console.log("error");
        }
    });
}));

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#temp-img')
            .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}