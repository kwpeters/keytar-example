
const express = require("express");
const service = require("os-service");
const keytar = require("keytar");


const app = express();


const PORT_NUM = 3000;
const SERVICE_NAME = "keytar-service";
const CRED_SERVICE = "some_online_service";
const CRED_ACCOUNT = "someone@ra.rockwell.com";
const CRED_PASSWORD = "password123";


service.run(function () {
    service.stop(0);
});


app.get("/", function (req, res){

    keytar.setPassword(CRED_SERVICE, CRED_ACCOUNT, CRED_PASSWORD)
    .then(() => {
        return keytar.getPassword(CRED_SERVICE, CRED_ACCOUNT);
    })
    .then((password) => {
        res.send(`Successfully read password '${password}' from credential vault.`);
    })
    .catch((err) => {
        res.send("Error: " + err.toString());
    });

});

app.listen(PORT_NUM, () => {
    console.log(`${SERVICE_NAME} is now listening on port ${PORT_NUM}.`);
});
