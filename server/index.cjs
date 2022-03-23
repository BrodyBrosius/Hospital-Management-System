const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const { insertPatient } = require("./qldbsetup.cjs");
let ion = require("ion-js");
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

    const body = {
        'First Name' : first_name,
        'Last Name' : last_name
    };


    await driver.executeLambda(async (txn) => {
        await txn.execute("INSERT INTO PATIENTS ?", body);
    });

    //THIS LINE IS A PROBLEM!!!
    //console.log("Before sending, the type of body is " + typeof(body));
    //const result = insertPatient(body);
    res.status(200).send("complete");
})

//Start server on port 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

