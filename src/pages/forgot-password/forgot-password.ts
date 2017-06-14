import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CurrentUserModel } from '../login/login.model';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Dialogs } from '@ionic-native/dialogs';
import { GlobalServices } from '../../providers/global-services';
import { LangServices } from '../../providers/language-service';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  params: any;
  forgot_password: FormGroup;
  main_page: { component: any };
  loading: any;

  constructor(public nav: NavController,
    private dialogs: Dialogs,
    public loadingCtrl: LoadingController,
    public http: Http,
    public langSrv: LangServices,
    public globalSrv: GlobalServices,
    public toastCtrl: ToastController) {

    this.main_page = {component: TabsNavigationPage};

    this.loading = this.loadingCtrl.create();

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  recoverPassword(){
    this.loading.present();
    this.getPassword(this.forgot_password.value.email)
    .then(data => {
        this.loading.dismiss();

        console.log(data.message);

        let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
        //this.dialogs.alert('Please check your mail and reset your password', 'Confirmation Sent...', 'Ok');
        //this.nav.setRoot(this.main_page.component);
       })
    .catch((error: any)  => {
      this.loading.dismiss();
      let errorMessage: any = JSON.parse(error._body);
      //this.dialogs.alert(this.langSrv.translate.g_generic_error, 'Ops!', 'Ok');
      let toast = this.toastCtrl.create({
        message: this.langSrv.translate.g_generic_error,
        duration: 3000
      });
      toast.present();

      console.log('ERROR CATCH: doLogin', errorMessage.error);
    });
  }

  getPassword(email_): Promise<any> {
    this.params = {'email': email_};
    let logued_user: CurrentUserModel = this.params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Accept", 'application/json');
    return this.http.post(this.globalSrv.URL_BACKEND + this.globalSrv.RESET_PASS,{'user':logued_user},{'headers': headers})
        .toPromise()
        .then(response => response.json() as CurrentUserModel)
      /*let params: URLSearchParams = new URLSearchParams();
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append("Accept", 'application/json');
      params.set('email', email_);
      //params.set('app_id', this.globalSrv.APP_ID);

      let requestOptions = new RequestOptions();
      requestOptions.search = params;
      requestOptions.headers = headers;
      return this.http.get(this.globalSrv.URL_BACKEND + this.globalSrv.RESET_PASS, requestOptions)
       .toPromise()
       .then(response => response.json())*/
    }

  goToSupport(){
    console.log("Click support");
  }
}
