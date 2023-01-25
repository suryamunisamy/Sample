define(function() {
    return {
        analyticsHost: "https://sampleapps.konycloud.com:443/services/data/v1/analytics/objects/log",
        constructBody: function() {
            try {
                var date = new Date();
                var deviceInfo = this.getDeviceOS();
                var body = {
                    "deviceModel": deviceInfo.model,
                    "Locale": kony.i18n.getCurrentDeviceLocale().language,
                    "Platform": deviceInfo.name,
                    "PlatformVersion": deviceInfo.version,
                    "appId": appConfig.appId,
                    "serviceUrl": appConfig.serviceUrl,
                    "itemGuid": "g4e6f1379ce140caa9b85564f453329a",
                    "assetName": "com.konymp.basiclogin",
                    "assetVersion": "1.0.0",
                    "releaseMode": !appConfig.isDebug,
                    "konySdkVersion": kony.sdk.version,
                    "date": date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(),
                    "endpointId": this.generateUniqueId(),
                    "deviceHeight": deviceInfo.deviceHeight,
                    "deviceWidth": deviceInfo.deviceWidth,
                    "kuid":"ua674e424b5d46568292a6526e930f24",
                };
                return body;
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },

        notifyAnalytics: function() {
            try {
                if (this.checkInternetConnectivity() && this.isItFirstTime()) {
                    var httpclient = new kony.net.HttpRequest();
                    httpclient.open(constants.HTTP_METHOD_POST, this.analyticsHost);
                    httpclient.setRequestHeader("Content-Type", "application/json");
                    httpclient.send(JSON.stringify(this.constructBody()));
                }
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },
        getDeviceOS: function() {
            try {
                return kony.os.deviceInfo();
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }

        },
        generateUniqueId: function() {
            try {
                return kony.crypto.createHMacHash("SHA512", this.getDeviceOS().deviceid, "KonyAnalytics");
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },
        isItFirstTime: function() {
            var bodyDetails = this.constructBody();
            var assetVersion = kony.store.getItem(bodyDetails.assetName + "Version");
            if (kony.sdk.isNullOrUndefined(assetVersion) || assetVersion != bodyDetails.assetVersion) {
                kony.store.setItem(bodyDetails.assetName + "Version", bodyDetails.assetVersion);
                return true;
            } else {
                return false;
            }
        },
        checkInternetConnectivity: function() {
            return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
        }
    };
});
