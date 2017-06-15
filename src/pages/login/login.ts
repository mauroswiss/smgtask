import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController,Platform} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Dialogs } from '@ionic-native/dialogs';
// import { AppAvailability } from '@ionic-native/app-availability';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { LoginService } from './login.service';
import { CurrentUserModel } from './login.model';
import { CurrentNetworkUserModel } from './login.network.model';
import { GlobalServices } from '../../providers/global-services';
import { LangServices } from '../../providers/language-service';
import { ListPage } from '../list/list';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { TwitterConnect } from '@ionic-native/twitter-connect';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
  
})

export class LoginPage {

  login: FormGroup;
  main_page: { component: any };
  loading: any;
  params: any;
  currentUser: CurrentUserModel = new CurrentUserModel();
  currentNetworkUser: CurrentNetworkUserModel = new CurrentNetworkUserModel();
  _isTwitter=false;
  _isFacebook=false;

  constructor(
    public nav: NavController,
    // private fb: Facebook,
    // private googlePlus: GooglePlus,
    // private twitter: TwitterConnect,
    public loadingCtrl: LoadingController,
    public loginSrv: LoginService,
    public globalSrv: GlobalServices,
    private dialogs: Dialogs,
    // private appAvailability: AppAvailability,
    private platform: Platform,
    public langSrv: LangServices,
    public toastCtrl: ToastController
  ) {
    this.main_page = { component: TabsNavigationPage };
    this.loading = this.loadingCtrl.create();

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    //////////////////////////////////////////////////////////////

    // let appTwitter;

    // if (this.platform.is('ios')) {
    //   appTwitter = 'twitter://';
    // } else if (this.platform.is('android')) {
    //   appTwitter = 'com.twitter.android';
    // }

    // this.appAvailability.check(appTwitter)
    // .then((yes: boolean) => {
    //   console.log(appTwitter + ' is available');
    //   this._isTwitter=true;
    // },
    //   (no: boolean) => {
    //     console.log(appTwitter + ' is NOT available');
    //     this._isTwitter=false;
    //   }
    // );

    //////////////////////////////////////////////////////////////

  //   let appFacebook;

  //   if (this.platform.is('ios')) {
  //     appFacebook = 'facebook://';
  //   } else if (this.platform.is('android')) {
  //     appFacebook = 'com.facebook.katana';
  //   }

  //   this.appAvailability.check(appFacebook)
  //   .then((yes: boolean) => {
  //     console.log(appFacebook + ' is available');
  //     this._isFacebook=true;
  //   },
  //     (no: boolean) => {
  //       console.log(appFacebook + ' is NOT available');
  //       this._isFacebook=false;
  //     }
  //   );
  }

  doLogin(){
    this.loading.present();
    // this.params = {'email': this.login.value.email, 'password': this.login.value.password};
    // this.loginSrv.getLogin(this.params)
    //   .then(data => {
    //     this.currentUser = data;
    //     //console.log(this.currentUser);
    //     //Save currentUser to Storage
    //       this.globalSrv.setCurrentUser(this.currentUser);
    //       this.loading.dismiss();
    //       this.nav.setRoot(ListPage);
    //       console.log("Login: "+data);
    //     })
    //   .catch((error: any)  => {
    //     this.loading.dismiss();
    //     let errorMessage: any = JSON.parse(error._body);
    //     this.dialogs.alert(this.langSrv.translate.g_generic_error, 'Ops!', 'Ok');

    //     console.log('ERROR CATCH: doLogin: '+this.langSrv.translate.g_generic_error, errorMessage.errors);

    //     let toast = this.toastCtrl.create({
    //       message: this.langSrv.translate.g_generic_error,
    //       duration: 3000
    //     });

    //     toast.present();
    //   });
    //this.nav.setRoot(this.main_page.component);
    if(this.login.value.email == "patricia.cuenca@swissmedical.com.ar" && this.login.value.password == "patosmg17") {
      this.loading.dismiss();
      this.currentUser = new CurrentUserModel();
      this.currentUser.email = "patricia.cuenca@swissmedical.com.ar";
      this.currentUser.name = "Patricia Cuenca";
      this.currentUser.image = "assets/custom/pato.png"
      this.globalSrv.setCurrentUser(this.currentUser);
      this.nav.setRoot(ListPage);
    } else if(this.login.value.email == "edpiano@swissmedical.com.ar" && this.login.value.password == "edusmg17") {
      this.loading.dismiss();
      this.currentUser = new CurrentUserModel();
      this.currentUser.email = "edpiano@swissmedical.com.ar";
      this.currentUser.name = "Eduardo Del Piano";
      this.currentUser.image = "assets/custom/edu.png"
      this.globalSrv.setCurrentUser(this.currentUser);
      console.log(this.currentUser.name);
      this.nav.setRoot(ListPage);
    } else{
      this.loading.dismiss();
      this.dialogs.alert("El usuario o password ingresado no existe, por favor contacte al administrador", 'Ops!', 'Ok');
      console.log("El usuario o password ingresado no existe, por favor contacte al administrador");
    }
    
  }

  // doFacebookLogin() {
  //   if(this._isFacebook){
  //     this.loading.present();
  //     this.fb.login(['public_profile','user_friends','email'])
  //     .then((res: FacebookLoginResponse) => {
  //       this.loading.dismiss();
  //       console.log('Logged into Facebook!: '+JSON.stringify(res));
  //       //this.dialogs.alert('Logged into Facebook! '+JSON.stringify(res), 'Succes!', 'Ok');
  //         this.fb.api("me/",['email','public_profile'])
  //         .then((user: any) => {
  //           console.log('Facebook User: '+JSON.stringify(user));
  //           let _userFL=user.name.split(" ");
  //           this.currentNetworkUser.email=user.email;
  //           this.currentNetworkUser.first_name=_userFL[0];
  //           this.currentNetworkUser.last_name=_userFL[1];
  //           this.currentNetworkUser.image="https://graph.facebook.com/"+user.id+"/picture?type=large";
  //           //this.dialogs.alert('Ingresaste con Facebook! '+_userFL[0], 'Bien!', 'Ok');
  //           this.nav.push(SignupPage,{param:this.currentNetworkUser});
  //         })
  //         .catch((error: any)  => {
  //           this.loading.dismiss();
  //           console.log('Error logging into Facebook: '+JSON.stringify(error))
  //           //this.dialogs.alert('Error logging into Facebook: '+error, 'Ops!', 'Ok');
  //         });
  //     })
  //     .catch((error: any)  => {
  //       this.loading.dismiss();
  //       console.log('Error logging into Facebook: '+JSON.stringify(error))
  //       //this.dialogs.alert('Error logging into Facebook: '+error, 'Ops!', 'Ok');
  //     });
  //   }else{
  //     this.dialogs.alert('No se encontró la aplicación Facebook', 'Ops!', 'Ok');
  //   }
  // }

  // doGoogleLogin() {
  //   this.loading.present();
  //   this.googlePlus.login({})
  //   .then(res => {
  //     this.currentNetworkUser.email=res.email;
  //     this.currentNetworkUser.first_name=res.givenName;
  //     this.currentNetworkUser.last_name=res.familyName;
  //     this.currentNetworkUser.image=res.imageURL;
  //     this.nav.push(SignupPage,{param:this.currentNetworkUser});
  //     //console.log('Logged into Gplus! '+JSON.stringify(res));
  //     //this.currentNetworkUser.id=res.userId;
  //     //this.dialogs.alert('Ingresaste con Gplus! '+res.givenName, 'Bien!', 'Ok');
  //     this.loading.dismiss();
  //   })
  //   .catch(err => {
  //     this.loading.dismiss();
  //     console.error('Error logging into Gplus '+JSON.stringify(err));
  //     //this.dialogs.alert('Error logging into Gplus '+err, 'Ops!', 'Ok');
  //   });
  // }

  // doTwiterLogin(){
  //   let _dialogs=this.dialogs;
  //   if(this._isTwitter){
  //     this.twitter.login().then(function(res){
  //       //console.log(res);
  //       this.currentNetworkUser.first_name=res.userName;
  //       //_dialogs.alert('Ingresaste con Twitter! '+response.userName, 'Bien!', 'Ok');
  //       this.nav.push(SignupPage,{param:this.currentNetworkUser});
  //     }, function(error){
  //       console.log(error);
  //     });
  //   }else{
  //     this.dialogs.alert('No se encontró la aplicación Twitter', 'Ops!', 'Ok');
  //   }
  // }

  goToSignup() {
    this.nav.push(SignupPage,{param:this.currentNetworkUser});
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }
}
