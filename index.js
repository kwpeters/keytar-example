const express = require("express");
const service = require("os-service");
const keytar = require("keytar");


const app = express();


const PORT_NUM = 3000;
const SERVICE_NAME = "keytar-example-service";
const CRED_SERVICE = "some_online_service";
const CRED_ACCOUNT = "someone@ra.rockwell.com";
const CRED_PASSWORD = "password123";


if (process.argv[2] === "--add") {
    service.add(SERVICE_NAME, {programArgs: ["--run"]}, function (err) {
        if (err) {
            console.trace(err);
        }
    });
}
else if (process.argv[2] === "--remove") {
    service.remove(SERVICE_NAME, function (err) {
        if (err) {
            console.trace(err);
        }
    });
}
else if (process.argv[2] === "--run") {
    service.run(function () {
        service.stop(0);
    });

    // Service code...
    app.get("/", function (req, res){
        // res.send("hello world");

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

    app.listen(PORT_NUM);

}
else {
    console.trace("TODO: Show usage.");
}
