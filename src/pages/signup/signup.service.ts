import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CurrentUserModel } from '../login/login.model';
import { GlobalServices } from '../../providers/global-services';

@Injectable()
export class SignUpService {
  constructor(
  public http: Http,
  public globalSrv: GlobalServices
  ) {}


  signUp(params_): Promise<any> {
    let logued_user: CurrentUserModel = params_;
     console.log(CurrentUserModel);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     headers.append("Accept", 'application/json');
     return this.http.post(this.globalSrv.URL_BACKEND + this.globalSrv.REGISTER, {'user':logued_user}, {'headers': headers})
         .toPromise()
         .then(response => response.json() as Object)
  }

}
