import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, Events, ToastController } from 'ionic-angular';
// import { Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
//import { GlobalServices } from '../../providers/global-services';
import { LangServices } from '../../providers/language-service';
import { GlobalServices } from '../../providers/global-services';

//import { ionicBootstrap } from 'ionic-angular';
import { ContactsPage } from './contacts-page';
import { FavoritesTab } from './favorites-page';
import {ChatPage} from '../chat/chat';

@Component({
  selector: 'page-list',
  template: `
  <ion-header>
    <ion-navbar hideBackButton="true">
      <ion-title>SMGTask</ion-title>
      <button ion-button menuToggle class="showMenu">
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-buttons end>
        <button ion-button icon-right (click)="callSearchBar()">
          <ion-icon name="search" ></ion-icon>
        </button>
        <button ion-button icon-right>
          <ion-icon name="md-more"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <div *ngIf="showSearchBar" class="searBarCnt">
      <ion-searchbar placeholder="buscar..." (ionClear)="hideSearchBar($event)" (ionInput)="getItems($event)"></ion-searchbar>
      <div class="closeSearch" (click)="hideSearchBar()">
        <ion-icon name="md-close-circle" class="closeSearchIcon"></ion-icon>
      </div>
    </div>
    <ion-tabs class="tabs-basic" (ionChange)="tabSelected($event)">
      <ion-tab tabTitle="SOLICITUDES" [root]="ContactsPage" ></ion-tab>
      <ion-tab tabTitle="PENDIENTES" [root]="favoritesTab"></ion-tab>
    </ion-tabs>
  </ion-content>`
})

export class ListPage {

  private ContactsPage: any;
  private favoritesTab: any;
  private titulos: any;
  private showSearchBar: any;
  private selectedTab: any;
  private favorites;
  private loading: any;

  constructor(
      // public http: Http,
      public navCtrl: NavController,
      public navParams: NavParams,
      public langSrv: LangServices,
      public nav: NavController,
      public events: Events,
      public toastCtrl: ToastController,
      public globalSrv: GlobalServices,
      public loadingCtrl: LoadingController,) {
    this.ContactsPage = ContactsPage;
    this.favoritesTab = FavoritesTab;
    this.titulos=this.langSrv.translate.list;
    this.showSearchBar=false;
    this.favorites = [];
    this.loading = this.loadingCtrl.create();

    this.events.subscribe('itemCall:selected', (id,img,name, text) => {
      this.goTochat(id,img,name,text);
    });

    this.events.subscribe('itemCall:toFavorites', (obj) => {

      let message="";

      if(obj.favorite==true){
        this.favorites.push(obj);
        message="Agregaste a "+obj.name+" a tus pendientes";
      }else{
        for(let a=0; a<this.favorites.length; a++){
          if(this.favorites[a].id==obj.id){
            this.favorites.splice(a,1);
            message="Eliminaste a "+obj.name+" de tus pendientes";
          }
        }
      }

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();

    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ListPage');
    // let currentUser_ = this.globalSrv.getCurrentUser();
    //this.loading.present();
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append("Accept", 'application/json');
    // return this.http.post(this.globalSrv.URL_BACKEND + this.globalSrv.MEDICS,{"user":currentUser_},{'headers': headers})
    //     .toPromise()
    //     .then(response => {
    //       //response.json() as any;
    //       console.log(response.json());
    //     })
  }

  goTochat(id,img,name,text){
    this.nav.push(ChatPage,{param:{'id':id, 'img':img, 'name':name, 'text':text}});
  }

  callSearchBar(){
    this.showSearchBar=true;
  }

  tabSelected(tab:any){
    this.selectedTab=tab.index;
    if(tab.index==1){
      this.addFavoritesFun();
    }
    console.log(tab.index);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if(this.selectedTab==0){
      this.events.publish('itemFilter:filteredContact',val);
    }else{
      this.events.publish('itemFilter:filteredFavorites',val);
    }
  }

  hideSearchBar(){
    this.events.publish('itemFilter:cancel');
    this.showSearchBar=false;
  }

  addFavoritesFun(){
    this.events.publish('addFavorites',this.favorites);
  }



}
