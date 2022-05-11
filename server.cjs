const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000


//packages
app.use( bodyParser.json() ); //to support JSON encoded bodies

app.use(bodyParser.urlencoded({ // to support URL encoded bodies
    extended: true}))
app.use(cors())






//Start server on port 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

//Verify server is working
app.get('/', (req, res)=>{
    res.send("Welcome to your server")
})

app.use('/', require('./server/routes/patient.cjs'));


const login_route = require("./server/routes/login.cjs");
app.use(login_route);
