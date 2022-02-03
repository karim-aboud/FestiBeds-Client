import { FestivalService } from './../services/festival.service';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Festival } from 'src/data/Festival';
import { Commune } from 'src/data/Commune';
import { Observable } from 'rxjs';
import { CommuneService } from '../services/commune.service';
import { cpuUsage } from 'process';
import { stringify } from 'querystring';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition('* => void', [
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})

export class AccueilComponent {

  allFestivalsObs : Observable<Festival[]>;
  allFestivals: Festival[];
  searchText;

  isClicked = false;
  recherche:string="";
  date : number=0;

  festivalInter: Festival[] = [];
  festivalFiltrer: Festival[] = [];

  filtres: string[] = [];
  commune : Commune = {
    codeInsee: '',
    codePostal: 0,
    nomCommune: '',
    nomDepartement: '',
    nomRegion: ''
  };
  allCommunes: Commune[] = [];
  tailleFestivalsFiltrer = 0;

  prixMini : number = 0;
  prixMaxi : number = 999;

  fetchedData: Festival[] = [];
  displayedData: Festival[] = [];
  itemsPerPage: number = 8;
  allPages: number;

  totalRecords: number;
  page = 1;


  constructor(private festivalService: FestivalService, private communeService: CommuneService) {}

  ngOnInit() {
    this.allFestivalsObs = this.festivalService.getFestivals();
    this.allFestivalsObs.subscribe(
      (data) => {
        this.allFestivals = data
        this.totalRecords = data.length
        }
    )
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.fetchedData.slice(startItem, endItem);
  }

  numberToMonthConverter(month: string) : string {
    return month.slice(4).charAt(0).toUpperCase() + month?.slice(5, -1);
  }

  numberMonthConverter(month: string) : string {
    return month.slice(0,2);
  }

  addPrix(prixMin: string,prixMax: string){
    this.prixMini=Number(prixMin);
    if(prixMax!='')
      this.prixMaxi=Number(prixMax);
    else{
      this.prixMaxi=999;
    }

    if((this.prixMaxi!=999 || this.prixMini!=0) && !this.filtres.includes("prix")){
      this.recherche = "prix";
      this.filtres.push(this.recherche);
      this.tailleFestivalsFiltrer++;
    }
  }

  removeFiltre(filtre : string){
    this.filtres.forEach((value,index)=>{
      if(value==filtre) this.filtres.splice(index,1);
    });
    if(this.tailleFestivalsFiltrer!=0){
      this.tailleFestivalsFiltrer=this.filtres.length
    }
    this.filtrer();
  }

  removePrix(){
    this.prixMaxi = 999;
    this.prixMini = 0;
    this.filtres.forEach((value,index)=>{
      if(value=="prix") this.filtres.splice(index,1);
    });
    if(this.tailleFestivalsFiltrer!=0){
      this.tailleFestivalsFiltrer--
    }
    this.filtrer();

  }

  removeDate(){
    this.date = 0;
    this.filtres.forEach((value,index)=>{
      if(value=="date") this.filtres.splice(index,1);
    });
    if(this.tailleFestivalsFiltrer!=0){
      this.tailleFestivalsFiltrer--
    }
    this.filtrer();
  }

  filtrer(){
    this.festivalFiltrer = [];
    this.festivalInter = [];

    this.allCommunes.forEach((comm : Commune) => {
        if(this.contientCommune(comm,this.filtres)){
          comm?.festivals?.forEach(fest => {
            if(!this.inclusion(this.festivalInter,fest)
            && (fest.prix >= this.prixMini && fest.prix <= this.prixMaxi)
            && ((this.date==0) || this.date==Number(this.numberMonthConverter(fest.moisHabituelDebut)))){
              this.festivalInter.push(fest)
              if(this.tailleFestivalsFiltrer>0)
                this.tailleFestivalsFiltrer=this.filtres.length-1
            }
          });
        }
    })

    if(this.festivalInter.length == 0){
      this.festivalInter = this.allFestivals;
    }

    console.log(this.tailleFestivalsFiltrer)

    if(this.tailleFestivalsFiltrer!=0){
      this.festivalInter.forEach(fest => {
        if(!this.inclusion(this.festivalFiltrer,fest)
        && this.contientFestival(fest,this.filtres,this.prixMini,this.prixMaxi)){
          this.festivalFiltrer.push(fest);
        }
      });
    }else{
      this.festivalFiltrer=this.festivalInter;
    }
    this.totalRecords = this.festivalFiltrer.length;
  }

  inclusion(festivals :Festival[], festival: Festival){
    let res=false;
    festivals.forEach(fest =>
      {
        if(fest.nomManifestation == festival.nomManifestation)
          res=true;
      }
      )
      return res
  }

  contientFestival(fest :  Festival, filtres : string[],prixMin : number, prixMax:number):boolean{
    let res = 0;

    filtres.forEach(recherche => {
      if(fest.domaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(
        recherche.normalize("NFD" ).replace(/[\u0300-\u036f]/g, "").toUpperCase()) || fest.nomManifestation.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(
          recherche.normalize("NFD" ).replace(/[\u0300-\u036f]/g, "").toUpperCase()) ||
        ((recherche=='prix') && fest.prix >= prixMin && fest.prix <= prixMax)
        || ((recherche=='date') && (this.date==Number(this.numberMonthConverter(fest.moisHabituelDebut))))){
          res ++;
      }
    });
    return res==this.tailleFestivalsFiltrer;
  }

  contientCommune(comm :  Commune, filtres : string[]):boolean{
    let res = 0;

    filtres.forEach(recherche => {
      if((comm?.codePostal?.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(
        recherche.normalize("NFD" ).replace(/[\u0300-\u036f]/g, "").toUpperCase()))
        || (comm?.nomCommune?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(
          recherche.normalize("NFD" ).replace(/[\u0300-\u036f]/g, "").toUpperCase()))){
          res ++;
          this.commune = comm;
      }
    });
    return res==1;
  }


  addRecherche(recherche : string){
    if(recherche!=''){
      this.recherche = recherche;
      this.filtres.push(recherche);
      this.tailleFestivalsFiltrer++;
    }
    console.log("APRES ADD",this.filtres);
  }

  addDate(month : string){
      this.date = Number(month);
      if(month!='0' && !this.filtres.includes("date")){
        this.recherche = "date";
        this.filtres.push(this.recherche);
        this.tailleFestivalsFiltrer++;
      }
  }

  truncateLongString(name: string) {
    let substring = name;
    if (name.length > 18) {
      substring = name?.substring(0, 15) + "...";
    }
    return substring;
  }
}
