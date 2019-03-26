const express = require("express");
const app = express();
const service = require("os-service");


const PORT_NUM = 3000;


if (process.argv[2] === "--add") {
    service.add("keytar-example-service", {programArgs: ["--run"]}, function (err) {
        if (err) {
            console.trace(err);
        }
    });
}
else if (process.argv[2] === "--remove") {
    service.remove("keytar-example-service", function (err) {
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
        res.send("hello world");
    });

    app.listen(PORT_NUM);

}
else {
    console.trace("TODO: Show usage.");
}
