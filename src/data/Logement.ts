import { Etablissement } from 'src/data/Etablissement';
import { Hebergement } from './Hebergement';
import { Photo } from "./Photo";

export interface Logement {
  id : number,
  nbPersonnes? : number,
  prix? : number,
  optionsSpecifiques?: string,
  description?: string,
  url_photo?: string,
  type?: string,
  hebergement?: Hebergement,
  etablissement?: Etablissement
}
