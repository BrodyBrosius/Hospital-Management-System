const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const { insertPatient } = require("./qldbsetup.cjs");
const { createQLDBDriver } = require("./qldbsetup.cjs");


//packages
app.use( bodyParser.json() ); //to support JSON encoded bodies

app.use(bodyParser.urlencoded({ // to support URL encoded bodies
    extended: true}))
app.use(cors())

//Verify server is working
app.get('/', (req, res)=>{
res.send("Welcome to your server")
})


//Route that handles new patient logic
app.post('/newpatient', async function(req, res) {
    const driver = createQLDBDriver();

    first_name = req.body.first_name;
    last_name = req.body.last_name;
    date_of_birth = req.body.date_of_birth;
    occupation = req.body.occupation;
    how_they_heard_about_us = req.body.how_they_heard_about_us;
    street_address_line_one = req.body.street_address_line_one;
    street_address_line_two = req.body.street_address_line_two;
    city = req.body.city;
    county_state_province = req.body.county_state_province;
    postal_zip_code = req.body.postal_zip_code;
    country = req.body.country;
    email = req.body.email;
    email_contact = req.body.email_contact;
    phone = req.body.phone;
    health_description = req.body.health_description;
    description_of_issue = req.body.description_of_issue;
    intensity_of_illness = req.body.intensity_of_illness;
    non_presc_drugs = req.body.non_presc_drugs;
    presc_drugs = req.body.presc_drugs;
    medical_history = req.body.medical_history;
    family_med_history = req.body.family_med_history;
    smallpox_vax = req.body.smallpox_vax;
    polio_vax = req.body.polio_vax;
    typhoid_vax = req.body.typhoid_vax;
    mumps_vax = req.body.mumps_vax;
    tetanus_vax = req.body.tetanus_vax;
    influenza_vax = req.body.influenza_vax;
    covid_vax = req.body.covid_vax;
    other_vax = req.body.other_vax;
    prev_vax_reaction = req.body.prev_vax_reaction;

    const body = {
        'First Name' : first_name,
        'Last Name' : last_name,
        'Date of Birth' : date_of_birth,
        'Occupation' : occupation,
        'How The Patient Heard of Us' : how_they_heard_about_us,
        'Street Address Line 1' : street_address_line_one,
        'Street Address Line 2' : street_address_line_two,
        'City' : city,
        'County/State/Province' : county_state_province,
        'Postal / ZIP Code' : postal_zip_code,
        'Country' : country,
        'Email' : email,
        'Contact By Email?' : email_contact,
        'Phone Number': phone,
        'Patient Description Of Health' : health_description,
        'Duration of Issue' : description_of_issue,
        'Intensity of Issue' : intensity_of_illness,
        'Non-Prescription Drugs' : non_presc_drugs,
        'Prescription Drugs' : presc_drugs,
        'Previous Medical History' : medical_history,
        'Family History' : family_med_history,
        'Smallpox Vaccine' : smallpox_vax,
        'Polio Vaccine' : polio_vax,
        'Typhoid Vaccine' : typhoid_vax,
        'Mumps Vaccine' : mumps_vax,
        'Tetanus Vaccine' : tetanus_vax,
        'Influenza Vaccine' : influenza_vax,
        'COVID-19 Vaccine' : covid_vax,
        'Other Vaccine(s)' : other_vax,
        'Reactions to Previous Vaccine' : prev_vax_reaction
    };

    console.log(body);


    
    //await driver.executeLambda(async (txn) => {
        //await txn.execute("INSERT INTO test_table ?", body);
    //});

    res.status(200).send("complete");
})

//Start server on port 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

