import { Commune } from './Commune';
import { Logement } from './Logement';
import { AvisEtablissement } from './AvisEtablissement';
import { Hebergeur } from './Hebergeur';
import { Photo } from "./Photo";

export interface Etablissement {
  id : number,
  nomCommercial? : string,
  classement : string,
  description?: string,
  siteInternet?: string,
  adresse?: string,
  telephone?: string,
  courriel?: string,
  coordonnees?: string,
  note?: number,
  type?: string,
  hebergeur?: Hebergeur,
  avisEtablissement?: AvisEtablissement[],
  logements?: Logement[],
  commune?: Commune,
  url_photo?: string,
}
