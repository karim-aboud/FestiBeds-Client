import { Reservation } from './Reservation';
import { Logement } from './Logement';
import { Festival } from 'src/data/Festival';
export interface Hebergement {
  idHebergement : string,
  festival?: Festival,
  logement?: Logement,
  reservation?: Reservation
}
