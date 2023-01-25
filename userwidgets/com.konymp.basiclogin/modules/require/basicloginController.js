/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/

define(function() {
    var konyLoggerModule = require('com/konymp/basiclogin/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("Basic Login Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    constants.DEFAULT_MINIMUM_CHAR_LENGTH = 8;
    constants.DEFAULT_MAX_LENGTH = 30;
    constants.USERNAME_VALIDATION_MESSAGE = "Username too small";
    constants.PASSWORD_VALIDATION_MESSAGE = "Password too small";
    constants.DEFAULT_PROVIDER_NAME = "userstore";
    constants.MF_ALERT_MESSAGE = "Please connect to MobileFabric";
    constants.LOGIN_SUCCESS_EVENT_MISSING_MESSAGE = "Login Success but loginSuccessEvent not defined";
    constants.LOGIN_FAILURE_EVENT_MISSING_MESSAGE = "Login Failed but loginFailureEvent not defined";
    return {
        /**
         * @constructor constructor
         * @param basicConfig
         * @param layoutConfig
         * @param pspConfig
         */
        constructor: function(basicConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"basiclogin"+"/analytics");
            analytics.notifyAnalytics();
            konymp.logger.trace("In Component constructor", konymp.logger.FUNCTION_ENTRY);
            this._usernameMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
            this._passwordMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
            this._usernameValidationMsg = constants.USERNAME_VALIDATION_MESSAGE;
            this._passwordValidationMsg = constants.PASSWORD_VALIDATION_MESSAGE;
            this._providerName = constants.DEFAULT_PROVIDER_NAME;
            this._encryptCredentials = true;
          	this._defaultUsernameSkin = this.view.lblUsername.skin;
        },
        /**
         * @function initGettersSetters
         * @description contains getters/setters for custom properties
         */
        initGettersSetters: function() {
            defineGetter(this, "usernameMinimumChar", function() {
                konymp.logger.trace("----------Entering usernameMinimumCharacter Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._usernameMinimumChar;
            });

            defineSetter(this, "usernameMinimumChar", function(val) {
                konymp.logger.trace("----------Entering usernameMinimumCharacter Setter---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (val === null || val === undefined) {
                        konymp.logger.warn("Username Min Char is undefined");
                        throw {
                            "type":"CUSTOM",
                            "message": "Username Min Char is undefined"
                        };
                    }
                    if (isNaN(val)) {
                        konymp.logger.warn("Invalid datatype for Username Min Characters Property");
                        throw {
                            "type":"CUSTOM",
                            "message": "Invalid datatype for Username Min Characters Property"
                        };
                    }
                    if (this.usernameMaxChar < val) {
                        konymp.logger.warn("usernameMaxChar is less than usernameMinimumChar");
                        throw {
                            "type":"CUSTOM",
                            "message": "username Max Char is less than Username Min Character propert"
                        };
                    }
                    this._usernameMinimumChar = val;
                } catch (exception) {
                    konymp.logger.error("Exception in usernameMinimumChar settter : " + exception.message, konymp.logger.EXCEPTION);
                    if (exception.type === "CUSTOM"){
                      throw exception;
                    }
                        
                }
            });
            defineGetter(this, "passwordMinimumChar", function() {
                konymp.logger.trace("----------Entering passwordMinimumCharacter Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._passwordMinimumChar;
            });
            defineSetter(this, "passwordMinimumChar", function(val) {
                konymp.logger.trace("----------Entering passwordMinimumCharacter Setter---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    if (val === null || val === undefined) {
                        konymp.logger.warn("Password Min Char is undefined");
                        throw {
                            "type":"CUSTOM",
                            "message": "Password Min Char is undefined"
                        };
                    }
                    if (isNaN(val)) {
                        konymp.logger.warn("Invalid datatype for Password Min Characters Property");
                        throw {
                            "type":"CUSTOM",
                            "message": "Invalid datatype for Password Min Characters Property"
                        };
                    }
                    if (this.passwordMaxChar < val) {
                        konymp.logger.warn("passwordMaxChar is less than password Min Character");
                        throw {
                            "type":"CUSTOM",
                            "message": "Password Max Char is less than Password Min Character propert"
                        };
                    }
                    this._passwordMinimumChar = val;
                } catch (exception) {
                    konymp.logger.error("Exception in passwordMinimumChar setter : " + exception.message, konymp.logger.EXCEPTION);
                    if (exception.type == "CUSTOM") {
                        throw exception
                    }
                }
            });
            defineGetter(this, "usernameValidationMsg", function() {
                konymp.logger.trace("----------Entering usernameValidationMsg Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._usernameValidationMsg;
            });
            defineSetter(this, "usernameValidationMsg", function(val) {
                konymp.logger.trace("----------Entering usernameValidationMsg Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._usernameValidationMsg = val;
            });
            defineGetter(this, "passwordValidationMsg", function() {
                konymp.logger.trace("----------Entering passwordValidationMsg Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._passwordValidationMsg;
            });
            defineSetter(this, "passwordValidationMsg", function(val) {
                konymp.logger.trace("----------Entering passwordValidationMsg Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._passwordValidationMsg = val;
            });
            defineGetter(this, "providerName", function() {
                konymp.logger.trace("----------Entering providerName Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._providerName;
            });
            defineSetter(this, "providerName", function(val) {
                konymp.logger.trace("------------Entering providerName Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._providerName = val;
            });
            defineGetter(this, "encryptCredentials", function() {
                konymp.logger.trace("----------Entering encryptCredentials Getter---------", konymp.logger.FUNCTION_ENTRY);
                return this._encryptCredentials;
            });
            defineSetter(this, "encryptCredentials", function(val) {
                konymp.logger.trace("------------Entering encryptCredentials Setter---------", konymp.logger.FUNCTION_ENTRY);
                try {
                    this._encryptCredentials = val;
                    if (val == true) {
                        this.getRememberMe();
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
                konymp.logger.trace("------------Exiting encryptCredentials Setter---------", konymp.logger.FUNCTION_EXIT);
            });
        },
        /**
         * @function invokeTouch
         * @description This function is used to invoke animation
         * @private
         * @param {string} value
         * @param {string} top
         */
        invokeTouch: function(value, top) {
            konymp.logger.trace("---------------Entering invoke touch function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                value.animate(
                    kony.ui.createAnimation({
                        "100": {
                            "left": "5%",
                            "top": top,
                            "stepConfig": {
                                "timingFunction": kony.anim.EASE
                            },
                        }
                    }), {
                        "delay": 0,
                        "iterationCount": 1,
                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                        "duration": 0.25
                    }, {
                        "animationEnd": this.focus(value, top)
                    });
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting invoke touch function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function focus
         * @description This function is invoked after invokeTouch animation success
         * @private
         * @param {Object} value
         * @param {string} top
         * @callback invokeTouchCallback
         */
        focus: function(value, top) {
            konymp.logger.trace("---------------Entering focus function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (value.id == "lblUsername" && top == "-1%") {
                    this.view.tbxUsername.setFocus(true);
                    this.view.flxLblUsername.isVisible = false;
                    this.view.forceLayout();
                    value.skin = this.view.lblSknHidden.skin;
                } else if (value.id == "lblPassword" && top == "16%") {
                    this.view.tbxPassword.setFocus(true);
                    this.view.flxLblPassword.isVisible = false;
                    this.view.forceLayout();
                    value.skin = this.view.lblSknHidden.skin;
                } else {
                    value.skin = this._defaultUsernameSkin;
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting focus function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function onDoneCredentials
         * @description Common onDone function for username and password textboxes
         * @private
         * @param {Object} view
         * @event usernameOnDone
         * @event passwordOnDone
         */
        onDoneCredentials: function(view) {
            konymp.logger.trace("---------------Entering onDoneCredentials function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (view.id == "lblUsername") {
                    this.invokeTouch(this.view.lblPassword, "16%");
                    if (this.view.tbxUsername.text === "") {
                        this.invokeTouch(view, "6%");
                        this.view.flxLblUsername.isVisible = true;

                    }
                    if (this.usernameOnDone !== null && this.usernameOnDone !== undefined) {
                        konymp.logger.info("Invoking usernameOnDone event");
                        this.usernameOnDone();
                    } else {
                        this.validateUsername();
                    }
                } else if (view.id == "lblPassword") {
                    if (this.view.tbxPassword.text === "") {
                        this.invokeTouch(view, "23%");
                        this.view.flxLblPassword.isVisible = true;
                    }
                    if (this.passwordOnDone !== null && this.passwordOnDone !== undefined) {
                        konymp.logger.info("Invoking passwordOnDone event");
                        this.passwordOnDone();
                    } else {
                        this.validatePassword();
                    }
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting onDoneCredentials function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function getUsername
         * @description Returns username entered by the user
         * @public
         * @return {string} username
         */
        getUsername: function() {
            konymp.logger.trace("---------------Entering getUsername api---------------", konymp.logger.FUNCTION_ENTRY);
            try {
              	var uname = (this.view.tbxUsername.text).trim();
                return uname;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
        },
        /**
         * @function getPassword
         * @description Returns password entered by the user
         * @public
         * @return {string} password
         */
        getPassword: function() {
            konymp.logger.trace("---------------Entering getPassword api---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                var pwd = (this.view.tbxPassword.text).trim();
              	return pwd;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
        },
        /**
         * @function invokeIdentityService
         * @description Invokes identity service provided by the user
         * @public
         * @param {string} providername
         */
        invokeIdentityService: function(providername) {
            konymp.logger.trace("---------------Entering invokeIdentityService api---------------", konymp.logger.FUNCTION_ENTRY);
          	var errorObj;
          
          	if(this.onErrorCallback === null || this.onErrorCallback === undefined){
              throw {
                "type": "CUSTOM",
                "message": "onErrorCallback is not defined"
              };
            }
          
            if (!kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
               	errorObj = new konymp.logger.errorObject(90001, "No Internet Connection Available");
              	this.onErrorCallback(errorObj.getErrorObject());
              	return;
            }
            try {
                var argument = {};
                var authorizationClient = null;
                kony.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
                var sdkClient = new kony.sdk.getCurrentInstance();
                if (Object.keys(sdkClient).length !== 0) {
                    authorizationClient = sdkClient.getIdentityService(providername);
                }
                if (authorizationClient === null || authorizationClient === undefined) {
                    kony.application.dismissLoadingScreen();
                    konymp.logger.info("Authorization object null - Connect to MF");
                  	errorObj = new konymp.logger.errorObject(90002, constants.MF_ALERT_MESSAGE);
                  	this.onErrorCallback(errorObj.getErrorObject());
                    return;
                }
                argument.userid = this.getUsername();
                argument.password = this.getPassword();
                konymp.logger.info("Network call to MF for identity authentication", konymp.logger.SERVICE_CALL);
                authorizationClient.login(argument, this.successWrapper.bind(this), this.failureWrapper.bind(this));
            } catch (exception) {
                kony.application.dismissLoadingScreen();
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting invokeIdentityService api---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function successWrapper
         * @description Success callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event loginSuccessEvent
         */
        successWrapper: function(response) {
            konymp.logger.trace("---------------Entering successWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Invoke identity service success---" + JSON.stringify(response), konymp.logger.SUCCESS_CALLBACK);
            try {
                kony.application.dismissLoadingScreen();
              	if (this.remembermeProperty === true) {
					this.rememberMe();
				}
                if (this.loginSuccessEvent !== null && this.loginSuccessEvent !== undefined) {
                    konymp.logger.info("Invoking Login Success event");
                    this.loginSuccessEvent(response);
                } else {
                  var errorObj = new konymp.logger.errorObject(90003, constants.LOGIN_SUCCESS_EVENT_MISSING_MESSAGE);
                  this.onErrorCallback(errorObj.getErrorObject());
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting successWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function failureWrapper
         * @description Failure callback for invokeIdentityService
         * @private
         * @param {Object} response
         * @callback invokeIdentityServiceCallback
         * @event loginFailureEvent
         */
        failureWrapper: function(response) {
            konymp.logger.trace("---------------Entering failureWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Invoke identity service failure" + JSON.stringify(response), konymp.logger.ERROR_CALLBACK);
            try {
                kony.application.dismissLoadingScreen();
                if (this.loginFailureEvent !== null && this.loginFailureEvent !== undefined) {
                    konymp.logger.info("Invoking Login Failure event");
                    this.loginFailureEvent(response);
                } else {
                  	var errorObj = new konymp.logger.errorObject(90004, constants.LOGIN_FAILURE_EVENT_MISSING_MESSAGE);
                  	this.onErrorCallback(errorObj.getErrorObject());
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting failureWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function getrememberKey
         * @description Creates a keyobject from the key that is generated by generatePassword
         * @private
         */
        getrememberKey: function() {
            konymp.logger.trace("---------------Entering getrememberKey function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (kony.store.getItem("konymploginkey") === null) {
                    var encryptDecryptKey = kony.crypto.newKey("securerandom", 256, {
                        subalgo: "aes"
                    });
                    var myUniqueIDKey = kony.crypto.saveKey("encryptionKey", encryptDecryptKey);
                    kony.store.setItem("konymploginkey", myUniqueIDKey);
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting getrememberKey function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function encryptData
         * @description Encrypts data with keyobject
         * @private
         * @param {string} data
         * @return {string} encrpytedData
         */
        encryptData: function(data) {
            konymp.logger.trace("---------------Entering encryptData function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (kony.store.getItem("konymploginkey") === null) {
                    this.getrememberKey();
                }
                var rememberKey = kony.store.getItem("konymploginkey");
                var myUniqueKey = kony.crypto.readKey(rememberKey);
                var properties = {
                    padding: "pkcs5",
                    mode: "cbc",
                    initializationvector: "1234567890123456"
                };
                var encryptedData = kony.crypto.encrypt("aes", myUniqueKey, data, properties);
                return (kony.convertToBase64(encryptedData));
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting encryptData function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function decryptData
         * @description Decrypts data with keyobject
         * @private
         * @param {string} data
         * @return {string} decryptedData
         */
        decryptData: function(data) {
            konymp.logger.trace("---------------Entering decryptData function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (kony.store.getItem("konymploginkey") === null) {
                    this.getrememberKey();
                }
                var rememberKey = kony.store.getItem("konymploginkey");
                var myUniqueKey = kony.crypto.readKey(rememberKey);
                var properties = {
                    padding: "pkcs5",
                    mode: "cbc",
                    initializationvector: "1234567890123456"
                };
                var decryptedData = kony.crypto.decrypt("aes", myUniqueKey, kony.convertToRawBytes(data), properties);
                return decryptedData;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting decryptData function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function changeImage
         * @description Invoked when user toggles remember me icon
         * @private
         */
        changeImage: function() {
            konymp.logger.trace("---------------Entering changeImage function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (this.view.imgRememberme.isVisible == true) {
                    this.view.imgRememberme.isVisible = false;
                    this.view.imgUnselected.isVisible = true;
                } else {
                    this.view.imgRememberme.isVisible = true;
                    this.view.imgUnselected.isVisible = false;
                }
                this.view.forceLayout();
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting changeImage function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function getRememberMe
         * @description Checks if any user credentials exist already
         * @private
         */
        getRememberMe: function() {
            konymp.logger.trace("---------------Entering getRememberMe function---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Retrieving Username and password locally", konymp.logger.DATA_STORE);
            try {
                var Username = "";
                var Password = "";
                Username = kony.store.getItem("konympLoginUsername");
                Password = kony.store.getItem("konympLoginPassword");
                if (Username !== null && Password !== null) {
                    if (Username !== "" && Password !== "") {
                        this.view.lblPassword.top = "16%";
                        this.view.lblPassword.skin = this.view.lblSknHidden.skin;
                        this.view.lblUsername.top = "-1%";
                        this.view.lblUsername.skin = this.view.lblSknHidden.skin;
                        this.view.flxLblUsername.isVisible = false;
                        this.view.flxLblPassword.isVisible = false;

                    }
                    if (this.encryptCredentials) {
                        //#ifdef android
                        Username = this.decryptData(kony.store.getItem("konympLoginUsername"));
                        Password = this.decryptData(kony.store.getItem("konympLoginPassword"));
                        //#endif

                        //#ifdef iphone
                        Username = this.decryptData(kony.store.getItem("konympLoginUsername"));
                        Password = this.decryptData(kony.store.getItem("konympLoginPassword"));
                        //#endif

                        //#ifdef winphone8
                        Username = kony.store.getItem("konympLoginUsername");
                        Password = kony.store.getItem("konympLoginPassword");
                        //#endif
                    } else {
                        Username = kony.store.getItem("konympLoginUsername");
                        Password = kony.store.getItem("konympLoginPassword");
                    }
                    this.view.tbxUsername.text = Username;
                    this.view.tbxPassword.text = Password;
                } else {
                    this.view.flxLblUsername.isVisibile = true;
                    this.view.flxLblPassword.isVisible = true;
                    this.view.lblPassword.top = "23%";
                    this.view.lblPassword.skin = this._defaultUsernameSkin;
                    this.view.lblUsername.top = "6%";
                    this.view.lblUsername.skin = this._defaultUsernameSkin;
                    this.view.tbxUsername.text = "";
                    this.view.tbxPassword.text = "";
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting getRememberMe function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function rememberMe
         * @description Stores user credentials by encrypting them
         * @public
         */
        rememberMe: function() {
            konymp.logger.trace("---------------Entering rememberMe api---------------", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.info("Storing Username and password locally", konymp.logger.DATA_STORE);
            try {
                if (this.view.imgUnselected.isVisible === true) {
                    kony.store.setItem("konympLoginUsername", "");
                    kony.store.setItem("konympLoginPassword", "");
                } else if (kony.store.getItem("konympInputType") === "password" && this.view.imgRememberme.isVisible === true) {
                    if (this.encryptCredentials) {
                        //#ifdef android
                        kony.store.setItem("konympLoginUsername", this.encryptData(this.getUsername()));
                        kony.store.setItem("konympLoginPassword", this.encryptData(this.getPassword()));
                        //#endif

                        //#ifdef iphone
                        kony.store.setItem("konympLoginUsername", this.encryptData(this.getUsername()));
                        kony.store.setItem("konympLoginPassword", this.encryptData(this.getPassword()));
                        //#endif

                        //#ifdef winphone8
                        kony.store.setItem("konympLoginUsername", this.getUsername());
                        kony.store.setItem("konympLoginPassword", this.getPassword());
                        //#endif
                    } else {
                        kony.store.setItem("konympLoginUsername", this.getUsername());
                        kony.store.setItem("konympLoginPassword", this.getPassword());
                    }
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting rememberMe api---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function invokeButtonClick
         * @description invoked when user clicks on submit button
         * @private
         * @event submitOnClick
         */
        invokeButtonClick: function() {
            konymp.logger.trace("---------------Entering invokeButtonClick function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                kony.store.setItem("konympInputType", "password");
                if (this.submitOnClick !== null && this.submitOnClick !== undefined) {
                    this.submitOnClick();
                } else {
                    if (this.validate()) {
                        if (this.providerName !== null || this.providerName !== undefined || this.providerName !== "") {
                            konymp.logger.info("Invoking identity service of providername - - - " + this.providerName);
                            this.invokeIdentityService(this.providerName);
                        } else {
                            this.invokeIdentityService("userstore");
                        }
                    } 
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting invokeButtonClick function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function remembermeSelection
         * @description Event triggered when user sets remember me action event
         * @private
         * @event remembermeOnSelection
         */
        remembermeSelection: function() {
            konymp.logger.trace("---------------Entering remembermeSelection function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                this.changeImage();
                if (this.remembermeOnSelection !== null && this.remembermeOnSelection !== undefined) {
                    konymp.logger.info("Invoking rememberOnSelection event");
                    this.remembermeOnSelection();
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                    throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting remembermeSelection function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function validateUsername
         * @description Validates username entered by the user
         * @private
         * @returns {boolean} true/false
         */
        validateUsername: function() {
            konymp.logger.trace("---------------Entering validateUsername function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (parseInt(this.usernameMinimumChar) > this.getUsername().length) {
                  	this.view.tbxUsername.text = this.getUsername();
                     var errorObj = new konymp.logger.errorObject(90005, this.usernameValidationMsg);
                    if(this.onErrorCallback!== null && this.onErrorCallback!== undefined){
                      this.onErrorCallback(errorObj.getErrorObject());
                    }else {
                      throw {
                        "type": "CUSTOM",
                        "message": "onErrorCallback is not defined"
                      };
                    }
                    return false;
                }
                return true;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting validateUsername function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function validatePassword
         * @description Validates password entered by the user
         * @private
         * @returns {boolean} true/false
         */
        validatePassword: function() {
            konymp.logger.trace("---------------Entering validatePassword function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (parseInt(this.passwordMinimumChar) > this.getPassword().length) {
                  	this.view.tbxPassword.text = this.getPassword();
                    var errorObj = new konymp.logger.errorObject(90006, this.passwordValidationMsg);
                    if(this.onErrorCallback!== null && this.onErrorCallback!== undefined){
                      this.onErrorCallback(errorObj.getErrorObject());
                    }else {
                      throw {
                        "type": "CUSTOM",
                        "message": "onErrorCallback is not defined"
                      };
                    }
                    return false;
                }
                return true;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting validatePassword function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function validate
         * @description validates username and password
         * @private
         * @return {boolean} true/false
         */
        validate: function() {
            konymp.logger.trace("---------------Entering validate function---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (this.getUsername() !== null && this.validateUsername()) {

                    if (this.getPassword() !== null && this.validatePassword()) {
                        return true;
                    }
                }
                return false;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.type === "CUSTOM"){
                  throw exception;
                }
            }
            konymp.logger.trace("---------------Exiting validate function---------------", konymp.logger.FUNCTION_EXIT);
        }
    };
});