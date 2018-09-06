import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';


@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css'],
  providers: [UserService, PublicationService]
})
export class TimeLineComponent implements OnInit {
  public url;
  public tokken;
  public title;
  public identity;
  public page = 1;
  public total;
  public pages;
  public publications : Publication[];
  constructor(
    private _userServive : UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _publicationService: PublicationService
  ) { 
    this.url = Global.url;
    this.identity = this._userServive.getIdentity();
    this.tokken = this._userServive.getTokken();
    this.title = "TimeLine";
  }

  ngOnInit() {
    this.getPublication(this.page);
  }
  getPublication(page){
    
    this._publicationService.getPublications(this.tokken, page).subscribe(
      response =>{
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.publications = response.publications;
          if (page > this.pages){
            this._router.navigate(['/time-lime']);
          }
        }
        
      
      },
      error =>{
        if(error) console.log(error);
        
      });
  }

}
