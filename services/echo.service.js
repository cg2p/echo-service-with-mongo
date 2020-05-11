const EchoSchema = require('../models/echo.model');

// Put echo into the database
exports.setEcho = function (uid, txt, reverse) {
    console.log(uid);   

    let setText = txt;
    if (reverse) {
        setText = txt.split("").reverse().join("");

    }

    return new Promise(function (resolve, reject) {
        // we call on the connection to return us all the documents in the words collection.
        EchoSchema(
                {
                    userid: uid,
                    text: setText,
                    reversed: reverse,
                    dateCreated: Date.now()
                }
            )
       /*     .save(function (err) {
                if (err) throw(err);
            });*/
            
            .save(function (err, echoes) {
                if (err) {
                    reject(err);
                } else {
                    console.log(echoes);
                    resolve(echoes);
                }
            });
    });
}

// Get echoes from the database
exports.getEchoes = function (uid) {
    console.log(uid);   
    return new Promise(function (resolve, reject) {
        // we call on the connection to return us all the documents in the words collection.
        EchoSchema
            .find({ userid: uid })
            .exec(function (err, echoes) {
                if (err) {
                    reject(err);
                } else {
                    console.log(echoes);
                    resolve(echoes);
                }
            });
    });
}
    
