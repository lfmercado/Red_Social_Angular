import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { Global } from './Global.service';

@Injectable()
export class UserService{
    public url: string;
    public identity; 
    public tokken;
    public stats;
    constructor(
        public _http: HttpClient 
    ){
        this.url = Global.url;
    }

    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'save-user' , params, {headers: headers});
    }

    sigUp(user: any, getTokken = null):Observable<any>{
        if(getTokken!= null){
            user.getTokken = getTokken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params,{headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getTokken(){
        let tokken = localStorage.getItem('tokken');
        if(tokken != undefined){
            this.tokken = tokken;
        }else{
            this.tokken = null;
        }
        return this.tokken;
    }
    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));
        if(stats != undefined){
            this.stats = stats;
        }else{
            this.stats = null;
        }
        return this.stats;
    }

    getCounter(userId = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getTokken());

        if(userId != null){
           return this._http.get(this.url + 'counters/'+userId, {headers: headers});
        }else{
           return this._http.get(this.url + 'counters', {headers: headers});
        }

    }

    updateUser(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getTokken());
        console.log(user);
        
        return this._http.put(this.url + 'user-update/'+ user._id , params, {headers: headers})

    }

    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getTokken());

        return this._http.get(this.url + 'users/' + page, {headers:headers})
    }

    getUser(userId):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getTokken());

        return this._http.get(this.url + 'user/' + userId, {headers:headers})
    }
}
