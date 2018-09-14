import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/Global.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
  public title;
  public user : User;
  public res: boolean;
  public identity;
  public tokken: string;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.user = this.identity;
    this.url = Global.url;
    
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.user = this.identity;
  }

  onSubmit(){
    this._userService.updateUser(this.user).subscribe(
      response =>{
        console.log(this.user);
        console.log(response); 
        
        if(!response.userUpdate){
          this.res = false;
        }else{
          localStorage.setItem('identity', JSON.stringify(response.userUpdate));
          this.user = this.identity;
          this.res = true;

          //Subida del avatar del usuario
          if(this.filesToUpload != undefined){
          this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.tokken, 'image')
              .then((result:any) =>{
                this.user.image = result.userUpdate.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
              });
            }
        }
      },
      error =>{
        if(error) console.log(<any>error);
        this.res = false;
      });
  }



  public filesToUpload: Array<File>
  filechangeEvent(fileInput: any){
    if(fileInput != undefined) 
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
