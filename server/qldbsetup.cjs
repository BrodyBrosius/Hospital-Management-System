var AWS = require("aws-sdk"); 
AWS.config.update({region: "us-east-1"});
var qldb = require('amazon-qldb-driver-nodejs');
var https = require('https');


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
            region: "us-east-1",
            httpOptions: {
                agent: agentForQldb
            }
        };

        var retryConfig = new qldb.RetryConfig(retryLimit);
        const qldbDriver = new qldb.QldbDriver("test-ledger-1", serviceConfigurationOptions, maxConcurrentTransactions, retryConfig);
        console.log("Driver intialized successfully.");
        return qldbDriver;
    
    } catch(e) {
        console.log("Unable to initialize driver", e);
    }

}


const list_tables = async function() {
    try {
        console.log("Listing table names...");
        var tableNames = await getQLDBDriver().getTableNames();
        tableNames.forEach(element => console.log(element));
    } catch (e) {
        console.log(e);
    }
}

async function createTable(txn) {
    await txn.execute("CREATE TABLE test_table_2");
}

async function test_main() {
    const driver = getQLDBDriver();

    await driver.executeLambda(async (txn) => {
        await list_tables();
        console.log("Inserting Patient...");
        await insertPatient(txn);
        console.log("Fetching from test_table");
        await fetchAllFromTest_Table(txn);
        var result = await fetchAllFromTest_Table(txn);
        console.log("The result List is ", JSON.stringify(result, null, 2));

        return result;
    });



    driver.close();
}


async function fetchAllFromTest_Table(txn) {
    return await txn.execute("SELECT * FROM PATIENTS");
}

async function insertPatient(txn, body) {
    const driver = createQLDBDriver();
    console.log("After sending, body is of type " + typeof(body));
    await driver.executeLambda(async (txn) => {
        await txn.execute("INSERT INTO PATIENTS ?", body);
    });
}














module.exports = { createQLDBDriver };
