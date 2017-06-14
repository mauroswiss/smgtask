import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import { GlobalServices } from '../../providers/global-services';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProfileService {
  constructor(public http: Http,
              public globalSrv: GlobalServices){}


   
  updateProfile(shred_: string): Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Accept", 'application/json');
    params.set('single_access_token', this.globalSrv.getCurrentUser().single_access_token);
    params.set('app_id', this.globalSrv.APP_ID);
    params.set('shared_user', shred_); 
    
    let requestOptions = new RequestOptions();
    requestOptions.search = params;
    requestOptions.headers = headers;
    
    return this.http.get(this.globalSrv.URL_BACKEND + this.globalSrv.UPDATE_USER, requestOptions)
     .toPromise()
     .then(response => response.json())  
     .catch(this.handleError);
  }

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
