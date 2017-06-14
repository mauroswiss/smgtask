import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CurrentUserModel } from './login.model';
import { GlobalServices } from '../../providers/global-services';

@Injectable()
export class LoginService {
  constructor(
  public http: Http,
  public globalSrv: GlobalServices
  ) {}

  getLogin(params_): Promise<CurrentUserModel> {
    let logued_user: CurrentUserModel = params_;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Accept", 'application/json');
    return this.http.post(this.globalSrv.URL_BACKEND + this.globalSrv.OAUTH,{'user':logued_user},{'headers': headers})
        .toPromise()
        .then(response => response.json() as CurrentUserModel)
  }
}
