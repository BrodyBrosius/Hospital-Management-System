$(document).ready(function(){
    $("#patient_info").on("submit", function(event){
        event.preventDefault();
        let raw_form_input = document.getElementById("patient_info");
        let formData = new FormData(raw_form_input);

        patient_data = {};
        
        formData.forEach((value, key) => (patient_data[key] = value));



        $.ajax({
            url: "http://localhost:3000/patient",
            method: "POST",
            data: patient_data,
            success: function(res){
                console.log('success!');
            }
        }) 
    })
})