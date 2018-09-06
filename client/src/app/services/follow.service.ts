import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { Global } from './Global.service';
import { Follow } from '../models/follow.model';

@Injectable()
export class FollowService{
    public url:string;

    constructor(
        private _hhtp: HttpClient
    ){
        this.url = Global.url;
    }
    addFollow(tokken, follow:Follow):Observable<any>{
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', tokken);

        return this._hhtp.post(this.url + 'follow', params , {headers: headers});
    }
    deleteFollow(tokken, userId):Observable<any>{
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', tokken);

        return this._hhtp.delete(this.url + 'follow/' +userId, {headers: headers});
    }

}