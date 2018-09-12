import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { Global } from './Global.service';
import { Follow } from '../models/follow.model';


@Injectable()
export class PublicationService{
    public url: string;

    constructor(
        private _htpp: HttpClient
    ){
        this.url = Global.url;
    }

    addPublication(tokken, publication):Observable<any>{
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'Application/json')
                                        .set('Authorization', tokken);
        return this._htpp.post(this.url + 'save-publication', params, {headers: headers});

    }

    getPublications(tokken, page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json')
                                        .set('Authorization', tokken);
        return this._htpp.get(this.url + 'publications/'+ page, {headers: headers});
    }

    getPublicationsUser(tokken,userId, page = 1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json')
                                        .set('Authorization', tokken);
        return this._htpp.get(this.url + 'publications-user/'+userId + '/' + page, {headers: headers});
    }


    deletePublication(tokken, publicationId):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json')
                                        .set('Authorization', tokken);

        return this._htpp.delete(this.url + 'publication/'+ publicationId, {headers: headers});
    }
}