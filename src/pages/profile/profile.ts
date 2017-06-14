import { Component } from '@angular/core';
import { MenuController, SegmentButton, App, NavParams, LoadingController } from 'ionic-angular';
import { CurrentUserModel } from '../login/login.model';
import { GlobalServices } from '../../providers/global-services';
import { SettingsPage } from '../settings/settings';
import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';
import { SocialSharing } from 'ionic-native';

import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  display: string;
  profile: ProfileModel = new ProfileModel();
  currentUser: CurrentUserModel = new CurrentUserModel(); 
  loading: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public globalSrv: GlobalServices,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController
   
  ) {
    this.display = "list";
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    
    this.currentUser = this.globalSrv.getCurrentUser();
    this.loading.dismiss();
  }
  

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  sharePost(post) {
   //this code is to use the social sharing plugin
   // message, subject, file, url
   SocialSharing.share(post.description, post.title, post.image)
   .then(() => {
     console.log('Success!');
   })
   .catch(() => {
      console.log('Error');
   });
  }
}
