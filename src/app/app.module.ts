import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../pages/login/login';
//import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
//import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
//import { SchedulePage } from '../pages/schedule/schedule';
//import { EventPage } from '../pages/events/events';
//import { MembersPage } from '../pages/members/members';
//import { ForumMembersPage } from '../pages/forum-members/members';
//import { SponsorsPage } from '../pages/sponsors/sponsors';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
//import { BarrCodePage } from '../pages/barrcode/barrcode';
//import { CheckInPage } from '../pages/check-in/check-in';
import { ListPage } from '../pages/list/list';
import { ContactsPage } from '../pages/list/contacts-page';
import { FavoritesTab } from '../pages/list/favorites-page';
import { ChatPage } from '../pages/chat/chat';
import {ContactInfoPage} from '../pages/contact-info/contact-info';
//Components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
//import { GoogleMap } from '../components/google-map/google-map';

//Page Services
import { ProfileService } from '../pages/profile/profile.service';
//import { NotificationsService } from '../pages/notifications/notifications.service';
//import { EventService } from '../pages/events/events.service';
//import { CheckInService } from '../pages/check-in/check-in.service';
//import { ScheduleService } from '../pages/schedule/schedule.service';
//import { ForumMembersService } from '../pages/forum-members/forum-members.service';
import { LoginService } from '../pages/login/login.service';
import { SignUpService } from '../pages/signup/signup.service';

import { LangServices } from '../providers/language-service';
import { GlobalServices } from '../providers/global-services';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    //NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    //WalkthroughPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    //SchedulePage,
    //EventPage,
    //MembersPage,
    //ForumMembersPage,
    //SponsorsPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    //CheckInPage,
    //BarrCodePage,
    ListPage,
    ContactsPage,
    FavoritesTab,
    ChatPage,
    ContactInfoPage,
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating
    //GoogleMap
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement:'top',
      platforms:{
        android:{
          tabsPlacement:'top',
        },
        ios:{
          tabsPlacement:'bottom',
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    //NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    //WalkthroughPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    //SchedulePage,
    //EventPage,
    //MembersPage,
    //ForumMembersPage,
    //SponsorsPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    //CheckInPage,
    //BarrCodePage,
    ListPage,
    ContactsPage,
    FavoritesTab,
    ChatPage,
    ContactInfoPage
  ],
  providers: [
    ProfileService,
    //NotificationsService,
    //EventService,
    //CheckInService,
    //ScheduleService,
    LoginService,
    //ForumMembersService,
    Dialogs,
    GlobalServices,
    InAppBrowser,
    // SocialSharing,
    //BarcodeScanner,
    SignUpService,
    LangServices
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
