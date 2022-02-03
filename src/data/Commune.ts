import { Etablissement } from 'src/data/Etablissement';
import { Festival } from "./Festival";

export interface Commune {
  codeInsee : string,
  codePostal : number,
  nomCommune : string,
  nomDepartement : string,
  nomRegion : string,
  festivals? : Festival[],
  etablissements? : Etablissement[]
}
