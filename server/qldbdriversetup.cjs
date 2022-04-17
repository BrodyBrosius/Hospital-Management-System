var AWS = require("aws-sdk"); 
var qldb = require('amazon-qldb-driver-nodejs');
var https = require('https');
const {LEDGER_NAME} = require("./constants/constants.cjs");


function getQLDBDriver() {
    return qldbDriver;
}


function createQLDBDriver() {
    try {
        var maxConcurrentTransactions = 10;
        var retryLimit = 4;

        var agentForQldb = new https.Agent({
            keepAlive: true,
            maxSockets: maxConcurrentTransactions
        });

        var serviceConfigurationOptions = {
            region: 'us-east-1',
            httpOptions: {
                agent: agentForQldb
            }
        };

        var retryConfig = new qldb.RetryConfig(retryLimit);
        const qldbDriver = new qldb.QldbDriver(LEDGER_NAME, serviceConfigurationOptions, maxConcurrentTransactions, retryConfig);
        console.log("Driver intialized successfully.");
        return qldbDriver;
    
    } catch(e) {
        console.log("Unable to initialize driver", e);
    }

}















module.exports = { createQLDBDriver };
