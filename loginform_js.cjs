$(document).ready(function () {
    $("#login_form").on("submit", function(event){
        event.preventDefault();
        let raw_login_pkg = document.getElementById("login_form");
        let formData = new FormData(raw_login_pkg);
        
        login_data = {};

        formData.forEach((value, key) => { //Populates login_data object with HTML form data and also validates multi-select inputs
            if(!Reflect.has(login_data, key)){
                login_data[key] = value;
                return;
            }
            if(!Array.isArray(login_data[key])){
                login_data[key] = [login_data[key]];
            }
            login_data[key].push(value);
        });

        console.log(login_data);

        $.ajax({
            url:"http://localhost:3000/login/logindata", 
            method: "POST",
            data: login_data,
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log('error!');
            }
        });

    })
})