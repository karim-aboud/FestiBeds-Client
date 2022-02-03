import { Commune } from './Commune';
import { Hebergement } from './Hebergement';
import { Reservation } from './Reservation';
import { AvisFestival } from './AvisFestival';
import { AvisFestivalier } from './AvisFestivalier';
import { Festivalier } from './Festivalier';
import { Organisateur } from './Organisateur';
import { Photo } from './Photo';
export interface Festival {
  ndegIdentification : string,
  nomManifestation : string,
  domaine : string,
  complementDomaine?: string,
  nbPassDisponibles?: number,
  periodicite?: string,
  moisHabituelDebut: string,
  siteWeb?: string,
  coordonneesInsee: string,
  commentaires?: string,
  dateDebutAncien?: Date,
  dateFinAncien?: Date,
  duree : number,
  prix: number,
  url_photo: string,
  organisateur?: Organisateur,
  festivaliers?: Festivalier[],
  avis?: AvisFestival[],
  reservations?: Reservation[],
  hebergements?: Hebergement[],
  commune: Commune
}
