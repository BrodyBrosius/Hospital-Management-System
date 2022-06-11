const express = require('express');
const router = express.Router();
const { createQLDBDriver } = require('../qldbdriversetup.cjs');
const { v4: uuidv4 } = require('uuid');
const { type } = require('express/lib/response');


router.post('/logindata', async function(req, res) {
    const driver = createQLDBDriver();

    request_user_id = req.body.user_id_field;
    request_password = req.body.password_field;
    
    await driver.executeLambda(async (txn) => {
        const results = (await txn.execute('SELECT * FROM test_admins WHERE username = ? AND password = ?', request_user_id, request_password)).getResultList();
        if(results.length == 0) {
            console.log('Wrong username or password!');
        }
        
        
        for (let result of results) {
            console.log(result.get('username'));
            console.log(result.get('password'));
            console.log(result.get('admin_id'));
        }
    });

    res.send('done');

})


module.exports = router;