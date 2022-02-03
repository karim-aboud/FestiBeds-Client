import { Etablissement } from "./Etablissement";

export interface Hebergeur {
  idCompte? : string,
  nom? : string,
  prenom? : string,
  telephone?: string,
  courriel?: string,
  motDePasse?: string,
  etablissements?: Etablissement[]
}
