import { CommuneService } from './../services/commune.service';
import { LogementService } from './../services/logement.service';
import { Hebergement } from './../../data/Hebergement';
import { Photo } from './../../data/Photo';
import { EtablissementService } from './../services/etablissement.service';
import { Logement } from './../../data/Logement';
import { FestivalService } from './../services/festival.service';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Festival } from 'src/data/Festival';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PanierService } from '../services/panier.service';
import { Etablissement } from 'src/data/Etablissement';
import { Commune } from 'src/data/Commune';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.scss'],
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

export class FestivalDetailsComponent implements OnInit {
  festival: Observable<Festival>;
  nbPassObs: Observable<number>;
  nbPass: number = 1;
  addedToCart: boolean = false;
  aChoisiEtablissement: boolean = false;

  etablissementChoisi: Etablissement;

  hebergementChoisi: Hebergement = {
    idHebergement: ''
  };

  communeChoisieINSEE: string;

  communeChoisie: Commune;

  constructor(private festivalService: FestivalService,
              private etablissementService: EtablissementService,
              private logementService: LogementService,
              private communeService: CommuneService,
              private panierService: PanierService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const festivalIdFromRoute = String(routeParams.get("festivalId"));
    this.festival = this.festivalService.getFestival(festivalIdFromRoute);
    this.festival.subscribe((data) => {
      this.communeService.getCommuneByCodePostal(data?.commune.codePostal).subscribe(
        (data) => {
          this.communeChoisie = data[0];
          console.log(data[0]);
        }
      )
    });
  }

  numberToMonthConverter(month: string) : string {
    return month.slice(4).charAt(0).toUpperCase() + month?.slice(5, -1);
  }

  convertClassement(classement: string): string {
    return classement.slice(0,1);
  }

  incrementNbPass() {
    this.nbPass++;
  }

  decrementNbPass() {
    this.nbPass--;
  }

  calculatePrice(price: number) {
    return price*this.nbPass;
  }

  getCoordinateX(coordinates: string) {
    return coordinates.split(",")[0];
  }

  getCoordinateY(coordinates: string) {
    return coordinates.split(",")[1];
  }

  addToCart(item: Hebergement) {
    this.addedToCart = true;
    this.panierService.addToCart(item);
  }
}
