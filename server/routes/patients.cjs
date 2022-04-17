const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const { createQLDBDriver } = require("../qldbdriversetup.cjs")
const { v4 : uuidv4} = require('uuid')
const { LEDGER_NAME, PATIENT_TABLE_NAME, INSERT_INTO_TEST_TABLE } = require("../constants/constants.cjs")


//packages
app.use( bodyParser.json() ); //to support JSON encoded bodies

app.use(bodyParser.urlencoded({ // to support URL encoded bodies
    extended: true}))
app.use(cors())

//Verify server is working
app.get('/patient', (req, res)=>{
res.send("Welcome to your server")
})


//Route that handles new patient logic
app.post('/patient', async function(req, res) {
    const driver = createQLDBDriver();
    const patient_unique_id = uuidv4();

    const body = {
        'Patient ID' : patient_unique_id,
        'First Name' : req.body.first_name,
        'Last Name' : req.body.last_name,
        'Date of Birth' : req.body.date_of_birth,
        'Occupation' : req.body.occupation,
        'How The Patient Heard of Us' : req.body.how_they_heard_about_us,
        'Street Address Line 1' : req.body.street_address_line_one,
        'Street Address Line 2' : req.body.street_address_line_two,
        'City' : req.body.city,
        'County/State/Province' : req.body.county_state_province,
        'Postal / ZIP Code' : req.body.postal_zip_code,
        'Country' : req.body.country,
        'Email' : req.body.email_address,
        'Contact By Email?' : req.body.email_contact,
        'Phone Number': req.body.phone,
        'Patient Description Of Health' : req.body.health_description,
        'Duration of Issue' : req.body.duration_of_issue,
        'Progression of Issue' : req.body.progression_of_illness,
        'Intensity of Issue' : req.body.intensity_of_illness,
        'Non-Prescription Drugs' : req.body.non_presc_drugs,
        'Prescription Drugs' : req.body.presc_drugs,
        'Previous Medical History' : req.body.medical_history,
        'Family History' : req.body.family_med_history,
        'Smallpox Vaccine' : req.body.smallpox_vax,
        'Polio Vaccine' : req.body.polio_vax,
        'Typhoid Vaccine' : req.body.typhoid_vax,
        'Mumps Vaccine' : req.body.mumps_vax,
        'Tetanus Vaccine' : req.body.tetanus_vax,
        'Influenza Vaccine' : req.body.influenza_vax,
        'COVID-19 Vaccine' : req.body.covid_vax,
        'Other Vaccine(s)' : req.body.other_vax,
        'Reactions to Previous Vaccine' : req.body.prev_vax_reaction
    };

    await driver.executeLambda(async (txn) => {
        await txn.execute(INSERT_INTO_TEST_TABLE, body);
    });

    post_status = res.statusCode;

    if(post_status == 200) {
        console.log("Patient added to database successfully.")
    }
    else {
        console.log("Potential errors present, inspect.")
    }

    res.send('New patient added to database.')

})

//Start server on port 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

