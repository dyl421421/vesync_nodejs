# vesync_nodejs
rewrite of API for VeSync to control smart outlets (etekcity brand)


## Usage
```
var acc = new VesyncApi('USERNAME','PASSWORD');
acc.login().then(() => {
    console.log(acc.getAccount());
});
```