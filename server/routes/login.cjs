const express = require('express');
const router = express.Router();
const { createQLDBDriver } = require('../qldbdriversetup.cjs');
const { v4: uuidv4 } = require('uuid');
const { type } = require('express/lib/response');
var passport = require('passport');
var LocalStrategy = require('passport-local');


router.post('/logindata', passport.authenticate('local'), async function(req, res) {


    res.send('done');

})


module.exports = router;