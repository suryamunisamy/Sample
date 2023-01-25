define({ 

//Type your controller code here 

authenticateUSer:function(){
 
var authClient = null;
var providerName = "InfinityUserRepositry";
try {
//alert("Entering into authenticate user");
kony.application.showLoadingScreen("logging in");
authClient = KNYMobileFabric.getIdentityService(providerName);
  
} catch (exception) {
//handle exception
}
var authparams={
"userid":this.view.txtuser.text,
"password":this.view.txtpassword.text
};
  
  if((this.view.txtuser.text!=="")||(this.view.txtuser.text!==null)||(this.view.txtuser.text!==undefined))
  {
     authClient.login(authparams,this.loginSuccess,this.loginFailure);
//     authClient.login(authparams, function() {
//       authClient.getUserAttributes(function(response) {
//         alert("Got Security response"+JSON.stringify(response));
//         alert("Mobilenumber="+response["phone"]);
//          this.testing();
//       }, function(err) {
//         kony.print("errrrrrrorrr");
//       });
//       kony.application.dismissLoadingScreen();
//       alert("Login Success Hurray");  
//       var ntf = new kony.mvc.Navigation("Form2");
//       ntf.navigate();
//       alert("flagnotification"+flagnotification);
        
      
      
//     }, function(error) {
//       kony.print ("Entering into login failure");
//       kony.application.dismissLoadingScreen();
//       alert("Login Failure: " + JSON.stringify(error));
//       alert("unable to autheticate");
//       kony.print ("Exiting out of application");
//     });

   }
  else
  {
    alert("Empty fields");
  }

},

  loginSuccess:function(response){
//     authClient.getUserAttributes(function(response) {
//       alert("Got getUserAttributes"+JSON.stringify(response));
      
//     }, function(err) {
//       kony.print("errrrrrrorrr");
//     });
    kony.application.dismissLoadingScreen();
      alert("Successfully loggedin");  
      var ntf = new kony.mvc.Navigation("Form2");
      ntf.navigate();
      this.watsappnotification("poc_update");
     kony.application.destroyForm("Form1");    
  },

loginFailure:function(error){
kony.print ("Entering into login failure");
kony.application.dismissLoadingScreen();
//alert("Login Failure: " + JSON.stringify(error));
alert("Invalid credentials unable to autheticate");
kony.print ("Exiting out of application");
},
  
// testing:function(){
// alert("entered into tessssssttttttiiiing ");
// },
  
// watsappcontentswitch:function(){
// alert(" inside watsappcontentswitch :: "+flagnotification);
// switch(flagnotification){
//   case 1: 
//     this.watsappnotification("poc_update");
//     break;
//     case 2: 
//     this.watsappnotification("cognizant_poc_logout");
//     break;
//     case 3: 
//     this.watsappnotification("dynamicupdate");
//     break;
//   default:
    
// }
// },
  
   
  
watsappnotification:function(content){
 // alert("Notification inside");
 var phnnum="919400114037";

serviceName = "watsappintegration";
integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
// 9447505048
operationName =  "whatsappcall";
data= {
    "messaging_product": "whatsapp",
    "to": phnnum,
    "type": "template",
    "template": {
        "name": content,
        "language": {
            "code": "en_US"
        }
    }
};
headers= {"Authorization": "Bearer EAANqe3mlIR4BAGP2CuKH2NSdEFiCTAN5HR9BgIDN6crAskVMYRjTZCbbFQoNP7IrliixBJ7CEZBSZBbZCeul9eBNIkYdQJEAu4Me2AUI68PfOKVnAqXbLwRb49O7r2KAcv50vulHohw2X9CpSs94uvtfFn0ZAi7OVLZAqvemFCfo0vSmZAry5Wn0Dxjt13V3bZC2E7ZAinZBVeVQZDZD","Content-Type": "application/json"};
integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);

function operationSuccess(res){
    //alert("whatsapp notification send Successfully");
 // alert("Login Success: " + JSON.stringify(res));
}
function operationFailure(res){
    //alert("whatsapp notification Failure");
 // alert("Login Failure: " + JSON.stringify(res));
}
  

},
});





// {
// 	"messaging_product": "whatsapp",
// 	"to": "918547625407",
// 	"type": "template",
// 	"template": {
// 		"name": "dynamicupdate",
// 		"language": {
// 			"code": "en_US"
// 		},
// 		"components": [{
// 			"type": "body",
// 			"parameters": [{
// 					"type": "text",
// 					"text": "sreekanth"
// 				},
// 				{
// 					"type": "text",
// 					"text": "Hi there"
// 				}
// 			]
// 		}]
// 	}
// }