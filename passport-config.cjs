const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const { createQLDBDriver } = require('../qldbdriversetup.cjs');

passport.use(new LocalStrategy(
    async (user_id, password, done) => {

        await driver.executeLambda(async (txn) => {
            const results = (await txn.execute('SELECT * FROM test_admins WHERE username = ? AND password = ?', user_id, password)).getResultList();
            if(results.length == 0) {
                console.log('Wrong username or password!');
            } else {
                console.log(`${user_id} and ${password}`);
            }
    }
))



module