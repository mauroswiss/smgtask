import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  template: `
  <ion-content>
      <ion-list>

          <ion-item *ngFor="let contact of contacts">
            <div (click)="goTochat(1,contact.img,contact.name,contact.text)" class="itemCnt">
              <ion-avatar item-left>
                <img src="{{contact.img}}">
              </ion-avatar>
              <h2>{{contact.name}}</h2>
              <h3>{{contact.title}}</h3>
              <p>{{contact.text}}</p>
            </div>
            <ion-note item-end="" class="note note-ios">{{contact.time}}</ion-note>
            <ion-note item-end="" class="note note-ios starCnt">
              <ion-icon *ngIf="!contact.favorite" (click)="favorite(contact.id,true)"  name="timer" class="star" item-left></ion-icon>
              <ion-icon *ngIf="contact.favorite"  (click)="favorite(contact.id,false)" name="ios-timer-outline" class="star starOn" item-left></ion-icon>
            </ion-note>
          </ion-item>

      </ion-list>
  </ion-content>`
})
export class ContactsPage {

  _listPage: any;

  private contacts;

  constructor(
    public events: Events,
  ){
    this.events.subscribe('itemFilter:filteredContact', (val) => {
      this.filter(val);
    });

    this.events.subscribe('itemFilter:cancel', () => {
      this.initializeItems();
    });

    this.initializeItems();
  }

  initializeItems(){
    this.contacts = [
        {id:0, img:"assets/custom/avatar-ts-woody.png", name:'Victor Samuel',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", time:"9:13 PM", check:"tick", favorite:false},
        {id:1, img:"assets/custom/avatar-ts-buzz.png", name:'Ana Oreva',title:"Cambio Plan", text:"Cambio de plan movistar...", time:"9:13 PM", check:"tick", favorite:false},
        {id:2, img:"assets/custom/avatar-ts-jessie.png", name:'Carolina Vanega',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", time:"9:13 PM", check:"tick", favorite:false},
        {id:3, img:"assets/custom/avatar-ts-woody.png", name:'Manuel Arrega',title:"Cambio Linea", text:"Cambio de linea...", time:"9:13 PM", check:"tick", favorite:false},
        {id:4, img:"assets/custom/avatar-ts-woody.png", name:'Victor Samuel',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", time:"9:13 PM", check:"tick", favorite:false},
        {id:5, img:"assets/custom/avatar-ts-buzz.png", name:'Ana Oreva',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", favorite:false},
        {id:6, img:"assets/custom/avatar-ts-jessie.png", name:'Carolina Vanega',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", time:"9:13 PM", check:"tick", favorite:false},
        {id:7, img:"assets/custom/avatar-ts-woody.png", name:'Manuel Arrega',title:"Pedido equipo", text:"Reemplazo por equipo nuevo...", check:"tick", favorite:false}
    ];
  }

  goTochat(id,img,name,text){
    this.events.publish('itemCall:selected',id,img,name,text);
  }

  favorite(id,status){
    //console.log(id+"-"+status);
    for(let a=0; a<this.contacts.length; a++){
      if(this.contacts[a].id==id){
        this.contacts[a].favorite=status;
        this.events.publish('itemCall:toFavorites',this.contacts[a]);
      }
    }
    this.contacts.slice();
    //this.initializeItems();
  }

  filter(val){
    this.initializeItems();
    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
