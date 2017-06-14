import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

//import { WalkthroughPage } from '../walkthrough/walkthrough';
import { Dialogs } from '@ionic-native/dialogs';

import 'rxjs/Rx';


import { CurrentUserModel } from '../login/login.model';
import { GlobalServices } from '../../providers/global-services';
import { ProfileService } from '../profile/profile.service';
import { LangServices } from '../../providers/language-service';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  // make LoginPage the root (or first) page
  rootPage: any = LoginPage;
  loading: any;
  currentUser: CurrentUserModel = new CurrentUserModel();

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public globalSrv: GlobalServices,
    public profileService: ProfileService,
    public dialogs: Dialogs,
    public langSrv: LangServices


  ) {
    this.loading = this.loadingCtrl.create();

  }

  ionViewDidLoad() {
    this.currentUser = this.globalSrv.getCurrentUser();
    this.loading.dismiss();
  }

  status() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.globalSrv.setCurrentUser(this.currentUser);
    this.loading.dismiss();
  }

  logout() {
    this.globalSrv.logout();    
    this.nav.setRoot(this.rootPage);
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
