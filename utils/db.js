const mongoose = require('mongoose');
const config = require('../config');

exports.connect = async function () {    
    console.log("db_name: %s", config.db.name);
    console.log("db.host: %s", config.db.host);
    console.log("db.port: %s", config.db.port);

    var connectionString;
    var options;

    options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: config.db.name,
    };

    if (config.env == 'dev') {
        connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
    } else {
        if (config.db.binding) {
            credentials = JSON.parse(config.db.binding);
    
            // get first bound MongoDB service and extract its credentials object from BINDING
            let mongodbConn = credentials.connection.mongodb;
    
            // read the CA certificate and assign that to the CA variable
            let ca = [Buffer.from(mongodbConn.certificate.certificate_base64, 'base64')];
    
            // for bound service  make a validated TLS/SSL connection
            options.ssl = true;
            options.sslValidate = true;
            options.sslCA = ca;

            // extract the database username and password
            let authentication = mongodbConn.authentication;
            let username = authentication.username;
            let password = authentication.password;
    
            // Extract the MongoDB URIs
            let connectionPath = mongodbConn.hosts;
            connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/?replicaSet=replset`;
        }       
    }
    
    if (connectionString) {
        try {
            console.log("connection string %s", connectionString);
            console.log("connection options %s", options);
            await mongoose.connect(connectionString, options);
        } catch (err) {
            throw err;
        }
    } else {
        console.log("connection string not defined - connection not made");
    }
 }

