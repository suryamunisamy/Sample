define({ 

  init: function(){
    this.view.preShow = this.preShow();
  },

  preShow: function(){
    this.view.btnLogin.onClick = this.authenticateUser;
  },

  authenticateUser:function(){
    kony.application.showLoadingScreen("logging in");
    if(((this.view.txtuser.text!=="")||(this.view.txtuser.text!==null)||(this.view.txtuser.text!==undefined))&& 
       ((this.view.txtuser.text!=="")||(this.view.txtuser.text!==null)||(this.view.txtuser.text!==undefined))){
      if(this.view.txtuser.text == "sreekanth.s@cognizant.com" && this.view.txtpassword.text == "Temenos@123"){
        this.loginSuccess();   
      }else{
        this.loginFailure();
      }
    }else{
      alert("Empty fields");
    }

  },

  loginSuccess: function(){
    kony.application.dismissLoadingScreen();
    var ntf = new kony.mvc.Navigation("Form2");
    ntf.navigate();
  },

  loginFailure:function(){
    kony.application.dismissLoadingScreen();
    alert("Invalid credentials unable to autheticate");
  },

});
