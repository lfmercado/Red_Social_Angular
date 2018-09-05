import { Injectable } from '@angular/core';
import { Global } from './Global.service';


@Injectable()
export class UploadService{
    public url: string;
    
    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url:string, params: Array<string>, files: Array<File>, tokken :string, name:string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
                        // Este es el objeto de JS para hacer peticiones ajax
            var xhr = new XMLHttpRequest();
            for(var i= 0; i<files.length; i++){
                formData.append(name, files[i],files[i].name);
            }
                //Con este metodo se realiza la peticion
            xhr.onreadystatechange = function(){
                    //pq igual a 4¡??; pq asi tiene que ser, asi esta previamente definido
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', tokken);
            xhr.send(formData);
        }); 
    }
}