import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { CurrentUserModel } from '../pages/login/login.model';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { GlobalServices } from '../providers/global-services';
import { SettingsPage } from '../pages/settings/settings';
import { ContactInfoPage } from '../pages/contact-info/contact-info';
// import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
// import { SchedulePage } from '../pages/schedule/schedule';
// import { ForumMembersPage } from '../pages/forum-members/members';
// import { SponsorsPage } from '../pages/sponsors/sponsors';
// import { EventPage } from '../pages/events/events';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LangServices } from '../providers/language-service';
// import { FCM } from '@ionic-native/fcm';



@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
  // providers: [FCM]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  rootPage: any;
  // rootPage: any = TabsNavigationPage;
  public currentUser: CurrentUserModel = new CurrentUserModel();

  pages: Array<{title: string, icon: string, component: any}>;
  pushPages: Array<{title: string, icon: string, component: any}>;
  localization = "ES";
  components: any;

  forum: any;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public storage: Storage,
    public iab: InAppBrowser,
    public globalSrv: GlobalServices,
    public langSrv: LangServices,
    // private fcm: FCM

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Splashscreen.hide();
      StatusBar.styleDefault();

      let currentUser_ = this.globalSrv.getCurrentUser();

      /*fcm.getToken().then(token=>{
        //backend.registerToken(token);
        console.log("APP token: "+token);
      })

      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })

      fcm.onTokenRefresh().subscribe(token=>{
        //backend.registerToken(token);
        console.log(token);
      })*/

      if(currentUser_ != null){
        this.currentUser = currentUser_;
        this.rootPage = ListPage;
        //this.rootPage = LoginPage;
      }else {
        this.rootPage = LoginPage;
      }

      this.localization = localStorage.getItem("localization");
      if(this.localization == "") {
        localStorage.setItem("localization", "ES");
      }
      this.localization="ES";
    });

    this.pages = [
      // { title:'', icon:'contact',component: ContactInfoPage },
      // { title: '', icon: 'md-git-compare', component: SchedulePage },
      // { title: '', icon: 'people', component: ForumMembersPage },
      // { title: '', icon: 'megaphone', component: SponsorsPage },
    ];

    this.components = {contact:ContactInfoPage, settings: SettingsPage};

    this.pushPages = [
      { title: '', icon: 'settings', component: SettingsPage }
    ];
  }

  openSurvey(){
    this.forum = JSON.parse(localStorage.getItem('forum'));
    let survey_url = this.forum.survey_url;
    if(survey_url == ""){
      survey_url = "http://www.smg.com";
    }
    const browser = this.iab.create(survey_url, "_blank", "location=false");
    browser.show();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page);
  }
}
