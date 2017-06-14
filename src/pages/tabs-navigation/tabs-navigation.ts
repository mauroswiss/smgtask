import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { CheckInPage } from '../check-in/check-in';
//import { MembersPage } from '../members/members';
//import { BarrCodePage } from '../barrcode/barrcode';
//import { NotificationsPage } from '../notifications/notifications';
import { LangServices } from '../../providers/language-service';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  forumId: string = "";
  eventId: string = "";
  eventLocation: string = "";
  eventAddress: string = "";
  eventCity: string = "";

  constructor(
    navParams: NavParams,
    public langSrv: LangServices
    ) {
    this.forumId = navParams.get("forumId");
    this.eventId = navParams.get("eventId");
    this.eventLocation = navParams.get("locationEvent");
    this.eventAddress = navParams.get("addressEvent");
    this.eventCity = navParams.get("cityEvent");
    /*this.tab1Root = CheckInPage;
    this.tab2Root = MembersPage;
    this.tab3Root = NotificationsPage;
    this.tab4Root = BarrCodePage;*/
    console.log('page entered');

  }

  onPageWillEnter(){
   console.log('page entered');
 }
}
