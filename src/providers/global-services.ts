import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


/*
  Generated class for the GlobalsProperties provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalServices {

    //App Identifier
    public APP_ID:string              = "1";
    //PROD URL
    public URL_BACKEND:string         = "http://smgtask.smg.com";

    //URL SERVICES
    public OAUTH:string               = "/mobile/login/";
    public SIGN_UP:string             = "/mobile/signup/";
    public REGISTER:string            = "/mobile/register/";
    public UPDATE_USER:string         = "/mobile/user/update/";
    public USER_BY:string             = "/mobile/user/";
    public RESET_PASS:string          = "/mobile/forgot/";
    public MESSAGE:string             = "/mobile/event/message/";
    public MEDICS:string            = "/mobile/medics/";

    //Errors Code
    public USER_NOT_EXIST:number      = 705;
    public WRONG_PASS:number          = 706;
    public USER_EXIST:number          = 707;
    public SIGN_UP_ERR:number         = 708;
    public WRONG_LOGIN:number         = 401;

  constructor(public storage: Storage) {
    //console.log('Hello GlobalsProperties Provider');
  }

  public getCurrentUser() {
    //get value for localStorage
    if(localStorage.getItem('currentUser') != null){
         return JSON.parse(localStorage.getItem('currentUser'));
       }else {
         return null;
       }
  }

  public setCurrentUser(currentUser_) {
       // set a key/value
       localStorage.setItem('currentUser', JSON.stringify(currentUser_));
  }

  public getFavoritesStorage() {
    //get value for localStorage
    if(localStorage.getItem('favorites') != null){
         return JSON.parse(localStorage.getItem('favorites'));
       }else {
         return null;
       }
  }

  public setFavoritesToStorage(forum_) {
       // set a key/value
       localStorage.setItem('favorites', JSON.stringify(forum_));
  }



  public logout() {
       // set a key/value
       localStorage.removeItem('currentUser');
  }

  private getDay(dateS) {
    let day = new Date(dateS).getDate();
    return day;
  }

  private getMonth(dateS) {
    let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    let month = monthNames[new Date(dateS).getMonth()];
    return month;
  }

  private getTime(dateS) {
    let time_ = new Date(dateS);
    let time = time_.getHours() + ":" + time_.getMinutes() + time_.getSeconds() + " hs";
    return time;
  }

  public getFormatDate(dateS_) {
    return this.getDay(dateS_) + " " + this.getMonth(dateS_) + " " + this.getTime(dateS_);
  }


}
