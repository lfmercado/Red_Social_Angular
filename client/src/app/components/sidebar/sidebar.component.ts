import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit, DoCheck {
  public identity;
  public tokken;
  public stats;
  public url;
  public res;
  public publication: Publication;


  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.stats = this._userService.getStats();
    this.publication = new Publication('','','','',this.identity._id);
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
  onSubmit(form){
    this._publicationService.addPublication(this.tokken, this.publication).subscribe(
      response =>{
        console.log(response);
        
        if(response.publicated){
          this.res=true;
          this.getCounters();
        form.reset();
        }else{
          this.res= false;
        }
      },
      error =>{
        if(error) console.log(error);
        this.res= false;
      });
  }
  getCounters(){

    this._userService.getCounter().subscribe(
      response =>{
        console.log(response);
      if(response.following != undefined){
        localStorage.setItem('stats', JSON.stringify(response));
        this.res = true;
      }
      },
      error=>{    
        this.res = false;   
        console.log(error);
      });
  }

}
