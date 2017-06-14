import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  template: `
  <ion-content>
    <p *ngIf="favorites.length == 0" class="emptyList">Muy bien! no hay trabajos pendientes</p>
    <ion-list>

      <ion-item *ngFor="let contact of favorites; let i=index">
        <div (click)="goTochat(contact.id,contact.img,contact.name,contact.text)" class="itemCnt">
          <ion-avatar item-left>
            <img src="{{contact.img}}">
          </ion-avatar>
          <h2>{{contact.name}}</h2>
          <h3>{{contact.title}}</h3>
          <p>{{contact.text}}</p>
        </div>
        <ion-note item-end="" class="note note-ios">{{contact.time}}</ion-note>
        <ion-note item-end="" class="note note-ios starCnt">
          <ion-icon (click)="removeFav(i,contact)" name="ios-close-outline" class="star closeOn" item-left></ion-icon>
        </ion-note>
      </ion-item>


    </ion-list>
  </ion-content>`
})
export class FavoritesTab {

  private favorites;

  constructor(public events: Events) {

        this.events.subscribe('itemFilter:filteredFavorites', (val) => {
          this.filter(val);
        });

        this.events.subscribe('addFavorites', (arr) => {
          //console.log(arr);
          this.favorites=arr;
          this.favorites.slice();
        });

        this.events.subscribe('itemFilter:cancel', () => {
          this.initializeItems();
        });

        this.initializeItems();
  }

  initializeItems(){
    this.favorites = [];
  }

  filter(val){
    this.initializeItems();
    if (val && val.trim() != '') {
      this.favorites = this.favorites.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  goTochat(id,img,name,text){
    this.events.publish('itemCall:selected',id,img,name,text);
  }

  removeFav(index,obj){
    obj.favorite=false;
    this.events.publish('itemCall:toFavorites',obj);
  }

}
