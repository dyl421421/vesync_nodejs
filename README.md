# vesync_nodejs
rewrite of API for VeSync to control smart outlets (etekcity brand)


## Usage
```
var acc = new VesyncApi('USERNAME','PASSWORD');
acc.login().then(() => {
    console.log(acc.getAccount());
});
```
Outputs the JSON device list returned from the API to the console
```
acc.getDevices().then((dat) => {
    console.log(dat);
})
```
Turns on a specified Device called by name
```
acc.turnOn(deviceName)
```
Turns off a specified Device called by name
```
acc.turnOff(deviceName)
```
