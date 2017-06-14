import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CurrentUserModel } from '../login/login.model';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { LoginPage } from '../login/login';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { SignUpService } from './signup.service';
import { GlobalServices } from '../../providers/global-services';
import { LangServices } from '../../providers/language-service';
import { ListPage } from '../list/list';

//import { FacebookLoginService } from '../facebook-login/facebook-login.service';
//import { GoogleLoginService } from '../google-login/google-login.service';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
  providers: [SignUpService]
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  params: any;
  paramsNetworks: any;
  terms:boolean;
  currentUser: CurrentUserModel = new CurrentUserModel();

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public signupSrv: SignUpService,
    public globalSrv: GlobalServices,
    public langSrv: LangServices,
    private dialogs: Dialogs,
    public toastCtrl: ToastController
  ) {
    this.main_page = { component: TabsNavigationPage };
    this.paramsNetworks = navParams.get("param");
    this.terms=false;

    //console.log(this.paramsNetworks);

    this.loading = this.loadingCtrl.create();

    this.signup = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      terms: new FormControl(this.terms, Validators.required)
    });
  }

  doSignup(){

    if(this.terms==false){

      let toast = this.toastCtrl.create({
        message: this.langSrv.translate.signup.terms,
        duration: 3000
      });
      toast.present();

    }else{
      this.loading.present();
      this.params = {email: this.signup.value.email, password: this.signup.value.password, country:"", first_name: this.signup.value.name, last_name: this.signup.value.lastname, terms_of_service: this.signup.value.terms, password_confirmation:this.signup.value.confirm_password,gender:"", birthday:"",latitude:"",longitude:"",mobile:true};

      this.signupSrv.signUp(this.params)
        .then(data => {
           this.currentUser = data.user;
           console.log(data.user);
           //Save currentUser to Storage
            this.globalSrv.setCurrentUser(this.currentUser);

            setTimeout(() => {
              this.loading.dismiss();
              this.dialogs.alert(this.langSrv.translate.intro.welcome+" "+this.currentUser.first_name, 'Succes!', 'Ok');
              this.nav.setRoot(ListPage);
              //this.nav.setRoot(this.main_page.component);
            }, 2000);

           })
        .catch((error: any)  => {
          this.loading.dismiss();
          let errorMessage: any = JSON.parse(error._body);
          //this.dialogs.alert(this.langSrv.translate.g_generic_error, 'Ops!', 'Ok');
          console.log('ERROR CATCH: register:', errorMessage.errors);

          let toast = this.toastCtrl.create({
            message: this.langSrv.translate.g_generic_error,
            duration: 3000
          });
          toast.present();
        });
    }

    //this.nav.setRoot(this.main_page.component);
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

}
