import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';

import { fadeLateral } from '../../animation';  

declare var $;
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css'],
  providers: [UserService, PublicationService],
  animations: [fadeLateral]
})
export class TimeLineComponent implements OnInit, DoCheck {
  
  public url;
  public tokken;
  public title;
  public identity;
  public itemsPerPage;
  public page;
  public res;
  public nextPage;
  public previusPage;
  public total;
  public pages;
  public publications : Publication[];

  constructor(
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _publicationService: PublicationService
  ) { 
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.title = "TimeLine";
 
  }

  ngOnInit() {
    this.getPublications(this.page);
    this.actualPage();
  }
  ngDoCheck(){
 
  }
  getPublications(page, adding = false){
    this._publicationService.getPublications(this.tokken, page).subscribe(
      response =>{
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){
            this.publications = response.publications;
            if(response.publications.length <= 0){
              this.res = false;
              console.log(this.res);
            }else{
              this.res = true;
            }
          }else{
            var array = this.publications;
            var arrayB = response.publications;
                                //con el concat le añado elementos al array
            this.publications = array.concat(arrayB)
            console.log(this.publications);
            //por medio de la libreria de Jquery hacemos que la pagina haga scroll automatico cada vez que
            //carguemos nuevas publicaciones
            $("html, body").animate({scrollTop: $('html').prop("scrollHeight")}, 500);
            //$('.panel-body').slice();

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
        this.getPublications(page);
      });
  }
  public noViewMore = false;
  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
        this.noViewMore = true;
    }    
    this.getPublications(this.page, true);
  }

//Refrescar las publicaciones automaticamente
  refresPublications(event){
    this.getPublications(1);
  }
  public showImage = false;
  public pubId;
  showPubImage(id){
    this.showImage = true;
    this.pubId = id;
  }
  hideImage(){
    this.showImage = false;
  }

  deletePublication(id){
    
    this._publicationService.deletePublication(this.tokken, id).subscribe(
      response => {
        console.log(response);
        console.log(id);
        console.log('Publicacion Eliminada');
        this.getPublications(this.page);
        this.getCounters();
      },
     error =>{
      if(error) console.log(error);
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
}
