import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import {ContactInfoPage} from '../contact-info/contact-info';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeAudio } from '@ionic-native/native-audio';
import { FileOpener } from '@ionic-native/file-opener';

/*
  Generated class for the Chat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [Keyboard,Camera,ImagePicker,NativeAudio, FileOpener]
})

export class ChatPage {

  @ViewChild('cnt') private myScrollContainer: ElementRef;

  private messages = [
      {type:"sent", img:"", text:'Buenos dias como estás!.', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'Hola, bien gracias..', time:"9:14 PM", check:""},
      {type:"sent", img:"", text:'es sobre la consulta de ayer, quería saber si quedo claro.', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'Si, todo perfecto, te estoy respondiendo mañana', time:"9:13 PM", check:""},
      {type:"sent", img:"", text:'Ok, muy bien gracias', time:"9:13 PM", check:"tick"}
  ]

  private receivedMessages = [
      {type:"received", img:"", text:'Lo podemos ver en algún momento del día, seguro!!', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'Puedo darte un turno el martes que viene', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'Si seguro , no hay problema', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'Claro, hay que hacer el chequeo anual', time:"9:13 PM", check:"tick"},
      {type:"received", img:"", text:'me parece bien', time:"9:13 PM", check:"tick"}
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
    'status':"-",
  }
  private showTimer=false;
  //private template='<ion-content><img src="assets/custom/profile.jpg"></ion-content>';


  private inputMessage="";

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private nativeAudio: NativeAudio,
    public alertCtrl: AlertController,
    private fileOpener: FileOpener
    ) {
      this.params = navParams.get("param");
      this.contact.id=this.params.id;
      this.contact.img=this.params.img;
      this.contact.name=this.params.name;
      this.bar_porcen_text=this.bar_porcen+"%";
      //this.keyboard.close();
      this.nativeAudio.preloadSimple('send', 'assets/custom/send.mp3').then(function(){console.log("OK loaded send")}, function(){console.log("ERROR loaded send")});
      this.nativeAudio.preloadSimple('recive', 'assets/custom/recive.mp3').then(function(){console.log("OK loaded recive")}, function(){console.log("ERROR loaded recive")});
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

        setTimeout(() => {
          this.contact.status="escribiendo..";
        }, 2000);

        setTimeout(() => {
          this.messageCreator();
        }, 3500);
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

      setTimeout(() => {
        this.contact.status="escribiendo..";
      }, 2000);

      setTimeout(() => {
        this.messageCreator();
      }, 3500);
    }
  }


  messageChecked(){
    this.messages[this.messages.length-1].check="tick";
    this.contact.status="online";
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

  callGallery(){
    let options = {
        // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
        // selection of a single image, the plugin will return it.
        maximumImagesCount: 1,

        // max width and height to allow the images to be.  Will keep aspect
        // ratio no matter what.  So if both are 800, the returned image
        // will be at most 800 pixels wide and 800 pixels tall.  If the width is
        // 800 and height 0 the image will be 800 pixels wide if the source
        // is at least that wide.
        //width: int,
        //height: int,

        // quality of resized image, defaults to 100
        quality: 80,

        // output type, defaults to FILE_URIs.
        // available options are
        // window.imagePicker.OutputType.FILE_URI (0) or
        // window.imagePicker.OutputType.BASE64_STRING (1)
        outputType: 0
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagePrompt(results[i]);
      }
    }, (err) => { console.log(err); });
  }

  callCamera(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     //console.log(imageData);
     this.imagePrompt(imageData);
    }, (err) => {
     // Handle error
     console.log(err);
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
