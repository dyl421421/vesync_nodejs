const express = require('express');
const pageGen = require('./views');
// Next is from a separate file to obscure my own username and password from github
const userInfo = require('./login');
const app = express();



const vesync = require('./index');

let acc = new vesync(userInfo.user(), userInfo.password());



app.get('/', function (req, res) {
    acc.login().then( () => {
        acc.getDevices().then((dat) => {

            let data = Object();
            data.devices = dat;
            let page = pageGen.homeView(data);

            res.send(page);
        })
    });
});


const server = app.listen(8081, function () {
    const host = "localhost";
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});