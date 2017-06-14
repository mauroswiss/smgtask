import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ContactInfoPage} from '../contact-info/contact-info';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';
import { NativeAudio } from '@ionic-native/native-audio';
// import { FileOpener } from '@ionic-native/file-opener';
import { Dialogs } from '@ionic-native/dialogs';

/*
  Generated class for the Chat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [Keyboard,Camera,NativeAudio ]
})

export class ChatPage {

  @ViewChild('cnt') private myScrollContainer: ElementRef;

  private messages = [
      //{type:"received", img:"", text:'Buenos dias necesito un cambio de quipo celular!.', time:"9:13 PM", check:"tick"}
  ]

  private receivedMessages = [
    // {type:"recive", img:"", text:'Buenos dias necesito un cambio de quipo celular!.', time:"9:13 PM", check:"tick"}
  ]
  
   

  private date;
  private hours="";
  private minutes="";
  private ampm="";
  private bar_porcen=100;
  private bar_porcen_text="";
  private bar_porcen_timer;
  private num=0;
  private params: any;
  private contact={
    'id':0,
    'img':"",
    'name':"",
    'status':"Solicitud creada hace 24hs",
    'text':"",
    'open':true
  }
  private showTimer=false;
  //private template='<ion-content><img src="assets/custom/profile.jpg"></ion-content>';


  private inputMessage="";

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    private camera: Camera,
    // private imagePicker: ImagePicker,
    private nativeAudio: NativeAudio,
    public alertCtrl: AlertController,
    private dialogs: Dialogs,
    // private fileOpener: FileOpener
    ) {
      this.params = navParams.get("param");
      this.contact.id=this.params.id;
      this.contact.img=this.params.img;
      this.contact.name=this.params.name;
      this.contact.text=this.params.text;
      this.bar_porcen_text=this.bar_porcen+"%";
     this.messages = [
      {type:"received", img:"", text:this.contact.text, time:"9:13 PM", check:"tick"}
  ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  goToContact(){
    this.nav.push(ContactInfoPage);
  }

  sendNewMessage(type,text){
    if(type=="text"){
      if(this.inputMessage==""){
      }else{
        let message={type:"sent", img:"", text:this.inputMessage, time:this.now(), check:"tick tick-animation"};
        this.messages.push(message);
        this.inputMessage="";
        this.showTimer=true;
        this.barPorcenFun();
        this.scrollToBottom();
        this.nativeAudio.play('send').then();
        setTimeout(() => {
          this.messageChecked();
        }, 1000);

        // setTimeout(() => {
        //   this.contact.status="escribiendo..";
        // }, 2000);

        // setTimeout(() => {
        //   this.messageCreator();
        // }, 3500);
      }

    }else{
      let message={type:"sent", img:type, text:text, time:this.now(), check:"tick tick-animation"};
      this.messages.push(message);
      this.inputMessage="";
      this.showTimer=true;
      this.barPorcenFun();
      this.scrollToBottom();
      this.nativeAudio.play('send').then();
      setTimeout(() => {
        this.messageChecked();
      }, 1000);

      // setTimeout(() => {
      //   this.contact.status="escribiendo..";
      // }, 2000);

      // setTimeout(() => {
      //   this.messageCreator();
      // }, 3500);
    }
  }


  messageChecked(){
    this.messages[this.messages.length-1].check="tick";
    //this.contact.status="Pedido Finalizado";
  }


  messageCreator(){
    if(this.num==4){
      this.num=0;
    }else{
      this.num++;
    }
    let message=this.receivedMessages[this.num];
    this.messages.push(message);
    //this.keyboard.close();
    clearTimeout(this.bar_porcen_timer);
    this.bar_porcen=100;
    this.bar_porcen_text=this.bar_porcen+"%";
    this.showTimer=false;
    this.contact.status="online";
    this.nativeAudio.play('recive').then();
    this.scrollToBottom();
  }

  barPorcenFun(){
    this.bar_porcen_timer=setInterval(() => {
      this.bar_porcen--;
      this.bar_porcen_text=this.bar_porcen+"%";
    }, 100);
  }

  //////////// UTILITIS ////////////////////
  //////////////////////////////////////////

  approve(){
   //DEV///////////////
  // console.log("Esta seguro que desea aprobar esta solicitud?");
  //   this.contact.status = "Solicitud Finalizada";
  // let message={type:"sent", img:"", text:"*******Aprobado*********", time:this.now(), check:"tick tick-animation"};
  // this.messages.push(message);
  ///////////////////////////////////////////////
  
   let confirmPromise = this.dialogs.confirm("Esta seguro que desea aprobar esta solicitud?", "Confirmar Aprobación", ["Ok", "No"]);
            confirmPromise.then(function(data) {
                  if(data == 1){
                     this.contact.status = "Solicitud Finalizada";
                     let message={type:"sent", img:"", text:"-------- Aprobado --------", time:this.now(), check:"tick tick-animation"};
                     this.messages.push(message);
                  }
                }); 
  }

  reject(){
    //DEV///////////////
  // console.log("Esta seguro que desea rechazar esta solicitud?");
  //   this.contact.status = "Solicitud Finalizada";
  // let message={type:"sent", img:"", text:"-------- Rechazado*********", time:this.now(), check:"tick tick-animation"};
  // this.messages.push(message);
  ///////////////////////////////////////////////
  
   let confirmPromise = this.dialogs.confirm("Esta seguro que desea rechazar esta solicitud?", "Confirmar Rechazo", ["Ok", "No"]);
            confirmPromise.then(function(data) {
                  if(data == 1){
                     this.contact.status = "Solicitud Finalizada";
                     let message={type:"sent", img:"", text:"-------- Rechazado ---------", time:this.now(), check:"tick tick-animation"};
                     this.messages.push(message);
                  }
                }); 
  }

  now(){
    this.date =  new Date();
    this.hours= this.date.getHours() < 10 ? "0"+this.date.getHours() : this.date.getHours();
    this.minutes= this.date.getMinutes() < 10 ? "0"+this.date.getMinutes() : this.date.getMinutes();
    this.ampm = this.date.getHours() >= 12 ? 'PM' : 'AM';
    return this.hours+":"+this.minutes+":"+this.ampm;
  }

  scrollToBottom(){
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight+100;
    }, 50);
      //console.log(this.myScrollContainer.nativeElement.scrollHeight);
  }

  imagePrompt(img) {
    let prompt = this.alertCtrl.create({
      title: 'Enviar imágen',
      message: '<div class="alert-img"><img src="'+img+'"></div>',
      enableBackdropDismiss:false,
      /*inputs: [
        {
          name: 'description',
          placeholder: 'Descripción'
        },
      ],*/
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            //console.log('Cancel clicked');
            //console.log(inputs[0].v);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log(data.description);
            this.sendNewMessage(img,data.description)
            //console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  expandImage=function(img){
    console.log("llega");
    this.fileOpener.open(img, 'image/jpg')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error openening file', e));
  }

}
