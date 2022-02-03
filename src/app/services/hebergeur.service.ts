import { Hebergeur } from 'src/data/Hebergeur';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HebergeurService {
    //private urlHebergeurs = "http://festibeds.herokuapp.com/hebergeurs/"
    private urlHebergeurs = "http://localhost:8080/hebergeurs";

    constructor(private http: HttpClient) { }

    getHebergeurs() {
      return this.http.get<Hebergeur[]>(this.urlHebergeurs);
    }

    getHebergeur(id: number) {
      return this.http.get<Hebergeur>(`${this.urlHebergeurs}/${id}`);
    }

    getHebergeurByMail(email: string) {
      return this.http.get<Hebergeur>(`${this.urlHebergeurs+"/email"}/${email}`);
    }

    createHebergeur(hebergeur: Hebergeur) {
      return this.http.post<Hebergeur>(this.urlHebergeurs, hebergeur);
    }

    updateHebergeur(hebergeur: Hebergeur) {
      return this.http.put<Hebergeur>(this.urlHebergeurs, hebergeur);
    }

    deleteHebergeur(id: number) {
      return this.http.delete(`${this.urlHebergeurs}/${id}`);
    }
}
