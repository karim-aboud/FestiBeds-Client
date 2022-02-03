import { Festival } from 'src/data/Festival';
import { Hebergement } from './Hebergement';
import { Festivalier } from './Festivalier';
export interface Reservation {
  idReservation : string,
  dateReservation? : Date,
  statutReservation? : string,
  montant?: number,
  festivalier?: Festivalier,
  festival?: Festival,
  nbPass?: number,
  hebergements?: Hebergement[],
  idCompte?: string
}
