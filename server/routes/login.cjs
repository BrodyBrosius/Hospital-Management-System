const express = require('express');
const router = express.Router();
const { createQLDBDriver } = require('../qldbdriversetup.cjs');
const { v4: uuidv4 } = require('uuid');

router.get('/message', async function(req, res) {
    res.send("LOL");
})


router.post('/logindata', async function(req, res) {
    const driver = createQLDBDriver();
    console.log(req.body.user_id_field);
    console.log(req.body.password_field);

    res.send('done');

})


module.exports = router;