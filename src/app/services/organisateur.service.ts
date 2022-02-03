import { Organisateur } from 'src/data/Organisateur';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganisateurService {
    //private urlOrganisateurs = "http://festibeds.herokuapp.com/organisateurs/"
    private urlOrganisateurs = "http://localhost:8080/organisateurs";

    constructor(private http: HttpClient) { }

    getOrganisateurs() {
      return this.http.get<Organisateur[]>(this.urlOrganisateurs);
    }

    getOrganisateur(id: number) {
      return this.http.get<Organisateur>(`${this.urlOrganisateurs}/${id}`);
    }

    getHebergeurByMail(email: string) {
      return this.http.get<Organisateur>(`${this.urlOrganisateurs+'/email'}/${email}`);
    }


    createOrganisateur(organisateur: Organisateur) {
      return this.http.post<Organisateur>(this.urlOrganisateurs, organisateur);
    }

    updateOrganisateur(organisateur: Organisateur) {
      return this.http.put<Organisateur>(this.urlOrganisateurs, organisateur);
    }

    deleteOrganisateur(id: number) {
      return this.http.delete(`${this.urlOrganisateurs}/${id}`);
    }
}
