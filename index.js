const fetch = require('node-fetch');
const utf8 = require('utf8');
const crypto = require('crypto');
const BASE_URL = "https://smartapi.vesync.com";

/**
 *
 * @param user STRING username of user (usually an email address)
 * @param pass STRING password of user
 * @constructor passes username and password to the object and saves it in the object
 */
function VesyncApi(user, pass) {

    this.username = user;
    this.password = pass;


}

/**
 * sets the headers property to the required headers needed to access the api
 */
VesyncApi.prototype.getHeaders = function () {
    this.headers = {
        tk: this.account.tk,
        accountId: this.account.accountId
    }
};

/**
 * logs in to the API
 * @returns {Promise< | Object>} the account info to access the API
 */
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

/**
 *
 * @returns Object contains the data returned from the login containing account details
 */
VesyncApi.prototype.getAccount = function () {
    return this.account;
};
/// Duplicate function? Not removing as something will probably break
VesyncApi.prototype.getHeaders = function () {
    this.headers = {
        tk: this.account.tk,
        accountId: this.account.accountID
    }
};
/**
 *
 * @returns {Promise} of devices returned from the API
 */
VesyncApi.prototype.getDevices = function () {
    // if (this.devices === undefined) {
    if (true) { // This will update the devices every time
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
            return res;
        })
    // Next block of code is never reached due to above if(true) statement
    } else { // Minimizes amount of requests to the cloud API, as the devices will be returned from local storage instead of the cloud API if they are already pulled
        // TODO: implement a timeout to repull devices after a set time
        let devices = this.devices;
        return new Promise(function (resolve, reject) {
            resolve(devices);
        })
    }
};
/**
 *
 * @param deviceName STRING of deviceName to turn on, the function will find the applicable id and send the request to turn it on
 */
VesyncApi.prototype.turnOn = function(deviceName) {
    let headers = this.headers;
    this.getDevices().then(() => {
        for (let i = 0; i < this.devices.length; i++) {
            if(this.devices[i].deviceName === deviceName) {
                console.log("Found Device " + deviceName + " with id: " + this.devices[i].cid);
                return fetch(BASE_URL + '/v1/wifi-switch-1.3/' + this.devices[i].cid + '/status/on', {
                    method: 'PUT',
                    headers: headers
                })
            }
        }
    })
};
/**
 *
 * @param deviceName STRING of deviceName to turn off, the function will find the applicable id and send the request to turn it off
 */
VesyncApi.prototype.turnOff = function(deviceName) {
    let headers = this.headers;
    this.getDevices().then(() => {
        for (let i = 0; i < this.devices.length; i++) {
            if(this.devices[i].deviceName === deviceName) {
                console.log("Found Device " + deviceName + " with id: " + this.devices[i].cid);
                return fetch(BASE_URL + '/v1/wifi-switch-1.3/' + this.devices[i].cid + '/status/off', {
                    method: 'PUT',
                    headers: headers
                })
            }
        }
    })
};

module.exports = exports = VesyncApi;

