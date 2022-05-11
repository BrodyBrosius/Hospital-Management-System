const express = require('express');
const router = express.Router();
const { createQLDBDriver } = require('../qldbdriversetup.cjs');
const { v4: uuidv4 } = require('uuid');

router.get('/login', async function(req, res) {
    console.log("LOL");
})


router.post('/login', async function(req, res) {
    const driver = createQLDBDriver();
    console.log(req.body.user_id_field);
    console.log(req.body.password_field);

})


module.exports = router;