ajaxPostRequest = function(user, pass) {

// create a new Ajax request
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:8080/api/user/save", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    var data = JSON.stringify({"id": "1" ,"username": user, "password": pass});
    xhttp.send(data);
}