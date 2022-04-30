$(document).ready(function(){
    $("#patient_info").on("submit", function(event){
        event.preventDefault();
        let raw_form_input = document.getElementById("patient_info");
        let formData = new FormData(raw_form_input);

        let patient_data = {};
        
        formData.forEach((value, key) => { //Populates patient_data object with HTML form data and also validates multi-select inputs
            if(!Reflect.has(patient_data, key)){
                patient_data[key] = value;
                return;
            }
            if(!Array.isArray(patient_data[key])){
                patient_data[key] = [patient_data[key]];
            }
            patient_data[key].push(value);
        });

        try {
            $.ajax({
                url: "http://localhost:3000/patient",
                method: "POST",
                data: raw_form_input,
                success: function(res){
                    try {
                        document.querySelector('.newpatient-modal').style.display = 'flex';
                        document.querySelector('.close').addEventListener('click', 
                        function() {
                            document.querySelector('.newpatient-modal').style.display = 'none';
                        });
                        document.getElementById('ok_button').addEventListener('click', function() {
                            document.querySelector('.newpatient-modal').style.display = 'none';
                        });
                    } catch(err) {
                        alert("Patient Addition to database failed. Please try again or contact an administrator. Error: " + err);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    try {
                        alert("Patient Addition to database failed. Please try again or contact an administrator. Error: " + jqXHR.status);

                    } catch(err) {
                        alert("Patient Addition to database failed. Please try again or contact an administrator. Error: " + err);
                    }
                }
            });
        } catch(err) {
            alert("Patient Addition to database failed. Please try again or contact an administrator. Error: " + err);
        }
    })
})
