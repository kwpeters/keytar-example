const keytar = require("keytar");


const CRED_SERVICE = "some_online_service";
const CRED_ACCOUNT = "someone@ra.rockwell.com";

keytar.findCredentials(CRED_SERVICE)
.then((result) => {
    console.log(result);
});
