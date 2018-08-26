const fetch = require('node-fetch');
const utf8 = require('utf8');
const crypto = require('crypto');
const BASE_URL = "https://smartapi.vesync.com";

function VesyncApi(user, pass) {

    this.username = user;
    this.password = pass;


}

VesyncApi.prototype.getHeaders = function () {
    this.headers = {
        tk: this.account.tk,
        accountId: this.account.accountId
    }
};

VesyncApi.prototype.login = function () {
    let pass = this.password;
    let user = this.username;
    return new Promise(function (resolve, reject) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(utf8.encode(pass));
        let jsonData = {
            account: user,
            password: md5sum.digest('hex'),
            devToken: ""
        };
        console.log(jsonData);
        return fetch(BASE_URL + "/vold/user/login", {
            method: 'POST',
            body: JSON.stringify(jsonData)
        }).then(function (resp) {
            return resp.json();
        }).then(function (res) {
            let str = JSON.stringify(res);
            if (str.indexOf('error') > -1 || str.indexOf('Not Found') > -1) {
                throw "account error";
            } else {
                resolve(res);
            }
        }).catch(function (err) {
            console.log(err);
            reject(err);
        });
    }).then((res) => {
        this.account = res;
        this.getHeaders();
    });

};

VesyncApi.prototype.getAccount = function () {
    return this.account;
};
VesyncApi.prototype.getHeaders = function () {
    this.headers = {
        tk: this.account.tk,
        accountId: this.account.accountID
    }
};

VesyncApi.prototype.getDevices = function () {
    if (this.devices === undefined) {
        let headers = this.headers;
        return new Promise(function (resolve, reject) {
            return fetch(BASE_URL + '/vold/user/devices', {
                method: 'GET',
                headers: headers
            }).then((resp) => {
                return resp.json();
            }).then((res) => {
                resolve(res);
            })
        }).then((res) => {
            this.devices = res;
        })
    } else { // Minimizes amount of requests to the cloud API, as the devices will be returned from local storage instead of the cloud API if they are already pulled
        // TODO: implement a timeout to repull devices after a set time
        let devices = this.devices;
        return new Promise(function (resolve, reject) {
            resolve(devices);
        })
    }
};

module.exports = exports = VesyncApi;

