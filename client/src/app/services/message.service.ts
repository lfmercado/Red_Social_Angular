import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Global } from './Global.service';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService{
    public url:string;
    public messages;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    addMessage(tokken, message):Observable<any>{
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', tokken);

        return this._http.post(this.url + 'message', params, {headers:headers});
    }

    getMyMessages(tokken, page =1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', tokken);

        return this._http.get(this.url +'get-messages/'+ page, {headers:headers});
    }

    getSendedMessages(tokken, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', tokken);

        return this._http.get(this.url +'messages/'+ page, {headers:headers});
    }

    getUnviewedMessages(tokken):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json') 
                                        .set('Authorization', tokken);

        return this._http.get(this.url + 'unviewed-messages', {headers:headers});
    }

    getMessagesUnviewed(){
        let messages = JSON.parse(localStorage.getItem('unviewed'));
        if(messages != undefined){
            this.messages = messages;
        }else{
            this.messages = null;
        }
        return this.messages;
    }

    setViewedMessages(tokken):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','applicacion/json') 
                                        .set('Authorization', tokken);

        return this._http.get(this.url + 'set-viewed-messages', {headers:headers});
    }
}