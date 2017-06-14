import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the Language provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LangServices {
  private lang: any;
  public translate: any;
  loc: string;

  constructor(public http: Http, public storage: Storage) {
    this.lang = {
                "EN": {
                 "intro": {
                    "login": "Log in",
                    "signup": "Sign up",
                    "welcome": "Welcome!",
                    "message1": "Log in to your account.",
                    "message2": "We are ready!",
                    "langES": "Español",
                    "langEN": "Inglés",
                    "langTxt": "Language"
                  },
                  "login": {
                    "title": "Sign in",
                    "login": "Log in",
                    "email": "Email",
                    "password": "Password",
                    "forgot": "Forgot Password?",
                    "signup": "Sign up!"
                  },
                  "signup": {
                    "title": "Sign up",
                    "subtitle": "Create an account",
                    "email": "Email",
                    "password": "Password",
                    "confirm": "Confirm Password",
                    "name": "Full name",
                    "phone": "Phone",
                    "country":"Country",
                    "job":"Job Title",
                    "company":"Company",
                    "share":"Share your profile",
                    "signup":"Sign up",
                    "terms":"You need to accept terms of service"
                  },
                  "tabs": {
                    "tab1": "Check-in",
                    "tab2": "Members",
                    "tab3": "Messages",
                    "tab4": "QRCheck-in"
                  },
                  "barrcode": {
                    "title": "QRCheck-in",
                    "tap": "Tap for scan!",
                    "event": "Event to be checked in",
                    "confirm": "Confirm check-in",
                    "tk": "Thanks for check-in on this event!",
                    "tapo": "Tap here for scan another event!"
                  },
                  "checkin": {
                    "title": "Event",
                    "share": "Share",
                    "survey": "Survey",
                    "cktitle": "Please check-in at this event.",
                    "desc": "Event Description",
                    "speakers": "Speakers"
                  },
                  "events": {
                    "title": "Event Schedule"
                  },
                  "forgot": {
                    "fgtitle": "Forgot Password?",
                    "recover": "Recover your password",
                    "recovermsg": "Please enter your email address and we'll send you an email to reset your password.",
                    "email": "Email",
                    "reset": "Reset password"
                  },
                  "fmembers": {
                    "title": "Members",
                    "search": "Search member...",
                    "registers": "Registered Members"
                  },
                  "profile": {
                    "language_label": "Lenguaje",
                    "lang_es": "Español",
                    "lang_us": "Inglés"
                  },
                  "notif": {
                    "title": "Messages",
                    "message": "Event Messages",
                    "send": "Send your message..."
                  },
                  "schedule": {
                    "title": "Choose a forum"
                  },
                  "menu": {
                    "profile": "Profile",
                    "events": "Event Schedule",
                    "forums": "Select Forum",
                    "members": "Forum Members",
                    "sponsors": "Sponsors",
                    "survey": "Forum Survey",
                    "settings": "Settings"
                  },
                  "settings":{
                    "title": "Settings",
                    "name": "Name",
                    "company": "Company",
                    "role": "Role",
                    "email": "Email",
                    "phone": "Phone",
                    "desc": "Description",
                    "share": "Share your profile",
                    "logout": "Log out"
                  },
                  "sponsors":{
                    "title": "Sponsors",
                    "subtitle": "Forum sponsors"
                  },
                  "list":{
                    "contacts_page": "Contacts",
                    "favorites_page": "Favorites"
                  },
                  "g_internet_error": "Please check your internet connection!",
                  "g_login_error": "User or Password incorrect!",
                  "g_generic_error": "An error occurred, please try again!"
                },
                "ES": {
                 "intro": {
                    "login": "Ingresar",
                    "signup": "Registrarse",
                    "welcome": "Bienvenido!",
                    "message1": "Ingrese a su cuenta.",
                    "message2": "Estamos listos!",
                    "langES": "Español",
                    "langEN": "Inglés",
                    "langTxt": "Lenguaje"
                  },
                  "login": {
                    "title": "Registrarse",
                    "login": "Ingresar",
                    "email": "Email",
                    "password": "Contraseña",
                    "forgot": "Recuperar Contraseña?",
                    "signup": "Registrarse!"
                  },
                  "signup": {
                    "title": "Registrarse",
                    "subtitle": "Crear una cuenta",
                    "email": "Email",
                    "password": "Contraseña",
                    "confirm": "Confirmar Contraseña",
                    "name": "Nombre Completo",
                    "phone": "Teléfono",
                    "country":"País",
                    "job":"Cargo",
                    "company":"Compañía",
                    "share":"Compartir Perfil",
                    "signup":"Registro",
                    "terms":"Debes aceptar los términos y condiciones"
                  },
                  "tabs": {
                    "tab1": "Inscripción",
                    "tab2": "Miembros",
                    "tab3": "Mensajes",
                    "tab4": "InscripciónQR"
                  },
                  "barrcode": {
                    "title": "Inscripción por QR",
                    "tap": "Presione para escanear!",
                    "event": "Evento al que se inscribirá",
                    "confirm": "Confirmar Inscripción",
                    "tk": "Gracias por inscribirse en éste evento!",
                    "tapo": "Presione para escanear otro evento!"
                  },
                  "checkin": {
                    "title": "Evento",
                    "share": "Compartir",
                    "survey": "Encuesta",
                    "cktitle": "Incríbase en éste evento",
                    "desc": "Descripción del evento",
                    "speakers": "Oradores"
                  },
                  "events": {
                    "title": "Agenda"
                  },
                  "forgot": {
                    "fgtitle": "Olvidó su contraseña?",
                    "recover": "Recuperar Contraseña",
                    "recovermsg": "Ingrese su email y le enviaremos instrucciones para restablecer su contraseña.",
                    "email": "Email",
                    "reset": "Recuperar Contraseña"
                  },
                  "fmembers": {
                    "title": "Miembros",
                    "search": "Buscar miembros...",
                    "registers": "Miembros registrados"
                  },
                  "profile": {
                    "language_label": "Lenguaje",
                    "lang_es": "Español",
                    "lang_us": "Inglés"
                  },
                  "notif": {
                    "title": "Mensajes",
                    "message": "Mensajes del evento",
                    "send": "Escriba un mensaje aquí..."
                  },
                  "schedule": {
                    "title": "Elija un foro"
                  },
                  "menu": {
                    "profile": "Mi perfíl",
                    "events": "Agenda",
                    "forums": "Foros",
                    "members": "Miembros",
                    "sponsors": "Patrocinadores",
                    "survey": "Encuesta",
                    "settings": "Configuración"
                  },
                  "settings":{
                    "title": "Configuración",
                    "name": "Nombre",
                    "company": "Compañia",
                    "role": "Cargo",
                    "email": "Email",
                    "phone": "Teléfono",
                    "desc": "Descripción",
                    "share": "Status online",
                    "logout": "Salir"
                  },
                  "sponsors":{
                    "title": "Patrocinadores",
                    "subtitle": "Patrocinadores del foro"
                  },
                  "list":{
                    "contacts_page": "Contactos",
                    "favorites_page": "Favoritos"
                  },
                  "g_internet_error": "Por favor revise su conexión!",
                  "g_login_error": "User or Password incorrect!",
                  "g_generic_error": "Ocurrió un error, intente otra vez!"
                }
              };

    this.loc = localStorage.getItem("localization");
    if(this.loc == null){
      this.loc = "ES";
      this.setLocalization(this.loc);
    }
    this.translate = this.lang[this.loc];
  }


  public getLocalization(){
    return localStorage.getItem("localization");
  }

  public setLocalization(loc_: string){
    this.translate = this.lang[loc_];
    localStorage.setItem("localization", loc_);
  }
}
