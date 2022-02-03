import { Festival } from "./Festival";

export interface Organisateur {
  idCompte? : string,
  nom? : string,
  prenom? : string,
  telephone?: string,
  courriel?: string,
  motDePasse?: string,
  festivals ?: Festival[]
}
