import { Component, OnInit, DoCheck, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
declare var $;
@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationService]
})
export class PublicationsComponent implements OnInit, DoCheck {

  public res;
  public url;
  public tokken;
  public title;
  public identity;
  public itemsPerPage;
  public page;
  public nextPage;
  public previusPage;
  public total;
  public pages;
  public publications : Publication[];

  @Input() userId:string; 

  constructor(
    private _userServive : UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _publicationService: PublicationService
  ) { 
    this.url = Global.url;
    this.identity = this._userServive.getIdentity();
    this.tokken = this._userServive.getTokken();
    this.title = "Publicaciones";
 
  }

  ngOnInit() {
    this.getPublications(this.userId,this.page);
    this.actualPage();
  }
  ngDoCheck(){
 
  }
  getPublications(userId, page, adding = false){
    this._publicationService.getPublicationsUser(this.tokken,userId, page).subscribe(
      response =>{
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(response.publications && response.publications.length < 1){
            this.res = false;
            console.log(this.res);
          }else{
            this.res = true;
          }
          if(!adding){
            this.publications = response.publications;
          }else{
            var array = this.publications;
            var arrayB = response.publications;
                                //con el concat le añado elementos al array
            this.publications = array.concat(arrayB)
            console.log(this.publications);
            //por medio de la libreria de Jquery hacemos que la pagina haga scroll automatico cada vez que
            //carguemos nuevas publicaciones
            $("html, body").animate({scrollTop: $('body').prop("scrollHeight")},500);
          }
          if (page > this.pages){
            this._router.navigate(['/time-line']);
          }
        }
      },
      error =>{
        if(error) console.log(error);
        
      });
  }
   //Metodo para tomar la pagina actual
   actualPage(){
    this._route.params.subscribe(
      params =>{
                  //con el simbolo mas convierto lo que traiga en un entero
        let page = +params['page'];
         this.page = page;
        if (!params['page']){
          this.page = 1;
        }
        if(!this.page){
          this.page = 1;
        }else{
          this.nextPage = this.page + 1;
          this.previusPage = this.page - 1;
          if(this.previusPage <= 0) this.previusPage = 1;         
        }
        //Tomamos todos los usuarios que existan
        this.getPublications(this.userId,page);
      });
  }
  public noViewMore = false;
  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
        this.noViewMore = true;
    }    
    this.getPublications(this.userId, this.page, true);
  }

}
