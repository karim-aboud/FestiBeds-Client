import { Commune } from 'src/data/Commune';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
    //private urlCommunes = "http://festibeds.herokuapp.com/communes/"
    //private urlCommunes = "http://localhost:8080/communes/";
    private urlCommunes = "http://129.88.210.4:8080/communes/";

    constructor(private http: HttpClient) { }

    getCommunes() {
      return this.http.get<Commune[]>(this.urlCommunes);
    }

    getCommuneByCodePostal(codePostal: number) {
      return this.http.get<Commune[]>(`${this.urlCommunes+'cp'}/${codePostal}`);
    }

    getCommuneByName(name: string) {
      return this.http.get<Commune>(`${this.urlCommunes+'nom'}/${name}`);
    }

    getCommuneByInsee(insee: string) {
      return this.http.get<Commune>(`${this.urlCommunes+'insee'}/${insee}`);
    }

    createCommune(commune: Commune) {
      return this.http.post<Commune>(this.urlCommunes, commune);
    }

    updateCommune(commune: Commune) {
      return this.http.put<Commune>(this.urlCommunes, commune);
    }

    deleteCommune(id: number) {
      return this.http.delete(`${this.urlCommunes}/${id}`);
    }
}
