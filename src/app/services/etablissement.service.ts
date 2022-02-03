import { Etablissement } from 'src/data/Etablissement';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
    //private urlEtablissements = "http://festibeds.herokuapp.com/etablissements/"
    // private urlEtablissements = "http://localhost:8080/etablissements/";
    private urlEtablissements = "http://129.88.210.4:8080/etablissements/";

    constructor(private http: HttpClient) { }

    getEtablissements() {
      return this.http.get<Etablissement[]>(this.urlEtablissements);
    }

    getEtablissement(id: number) {
      return this.http.get<Etablissement>(`${this.urlEtablissements}/${id}`);
    }

    createEtablissement(etablissement: Etablissement) {
      return this.http.post<Etablissement>(this.urlEtablissements, etablissement);
    }

    updateEtablissement(etablissement: Etablissement) {
      return this.http.put<Etablissement>(this.urlEtablissements, etablissement);
    }

    deleteEtablissement(id: number) {
      return this.http.delete(`${this.urlEtablissements}/${id}`);
    }
}
