import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../services/upload.service';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit, DoCheck {
  public identity;
  public tokken;
  public stats;
  public url;
  public res;
  public publication: Publication;
  public total;
  public publications;
  public pages;

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.stats = this._userService.getStats();
    this.publication = new Publication('', '', '', '', this.identity._id);
  }

  ngOnInit() {

  }
  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.stats = this._userService.getStats();
  }
 //Propiedad para poder pasar datos del componente al otro
  @Output() sended = new EventEmitter();
  onSubmit(form, $event) {
    this._publicationService.addPublication(this.tokken, this.publication).subscribe(
      response => {
        console.log(response);
        console.log(response.publicated._id);
        if (response.publicated) {
            
            

          //Subida del avatar del usuario
          if (this.filesToUpload != undefined) {
            this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publicated._id, [], this.filesToUpload, this.tokken, 'image')
              .then((result: any) => {
                console.log(result);
                this.publication.file = result.publication.file;
                form.reset();
                this.res = true;
                this.getCounters();
                this.getPublication(1);
                this.sended.emit({ send: 'true' });
                this._router.navigate(['/time-line']);
              });
          }
          else{
      
            form.reset();
            this.res = true;
            this.getCounters();
            this.getPublication(1);
            this.sended.emit({ send: 'true' });
            this._router.navigate(['/time-line']);
          }
  
        } else {
          this.res = false;
        }
      },
      error => {
        if (error) console.log(error);
        this.res = false;
      });
  }
  getCounters() {

    this._userService.getCounter().subscribe(
      response => {
        //console.log(response);
        if (response.following != undefined) {
          localStorage.setItem('stats', JSON.stringify(response));
          this.res = true;
        }
      },
      error => {
        this.res = false;
        console.log(error);
      });
  }
  getPublication(page) {

    this._publicationService.getPublications(this.tokken, page).subscribe(
      response => {
        if (response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.publications = response.publications;
          if (page > this.pages) {
            this._router.navigate(['/time-line']);
          }
        }
      },
      error => {
        if (error) console.log(error);

      });
  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {     //Se toman los ficheros seleccionados
    if (fileInput != undefined) this.filesToUpload = <Array<File>>fileInput.target.files;
  }


 


}
