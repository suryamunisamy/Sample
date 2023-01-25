define({ 

  watsapplogout:function(){
    var phnnum="919400114037";
    data= {
    "messaging_product": "whatsapp",
    "to": phnnum,
    "type": "template",
    "template": {
        "name": "cognizant_poc_logout",
        "language": {
            "code": "en_US"
        }
    }
};
    kony.application.showLoadingScreen("logging out");
    this.watsappnotification(data);
    
    var back = new kony.mvc.Navigation("Form1");
    back.navigate();
    kony.application.destroyForm("Form2");
    alert("Successfully loggedout" );
    kony.print ("Exiting out of application");
  },

  fundtransfer:function(){
    
    var cardno =(this.view.lstcard.selectedKey).slice(-4);
    var amount =this.view.txtamount.text;
   // alert("cardno"+cardno);
   data= {
	"messaging_product": "whatsapp",
	"to": "919400114037",
	"type": "template",
	"template": {
		"name": "dynamicupdate",
		"language": {
			"code": "en_US"
		},
		"components": [{
			"type": "body",
			"parameters": [{
					"type": "text",
					"text": amount
				},
				{
					"type": "text",
					"text": cardno
				}
			]
		}]
	}
};
    kony.application.showLoadingScreen("Transaction inprogress");
    this.view.flxtransaction.setVisibility(true);
        this.watsappnotification(data);
  },
  
watsappnotification:function(data){
  //alert("Notification inside");
 

serviceName = "watsappintegration";
integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
// 9447505048
operationName =  "whatsappcall";
  

headers= {"Authorization": "Bearer EAANqe3mlIR4BAGP2CuKH2NSdEFiCTAN5HR9BgIDN6crAskVMYRjTZCbbFQoNP7IrliixBJ7CEZBSZBbZCeul9eBNIkYdQJEAu4Me2AUI68PfOKVnAqXbLwRb49O7r2KAcv50vulHohw2X9CpSs94uvtfFn0ZAi7OVLZAqvemFCfo0vSmZAry5Wn0Dxjt13V3bZC2E7ZAinZBVeVQZDZD","Content-Type": "application/json"};
integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);

function operationSuccess(res){
  //  alert("Notification Success");
 // alert("Login Success: " + JSON.stringify(res));
  kony.application.dismissLoadingScreen();
}
function operationFailure(res){
  //  alert("notification Failure");
 // alert("Login Failure: " + JSON.stringify(res));
  kony.application.dismissLoadingScreen();
}
  

},
});
