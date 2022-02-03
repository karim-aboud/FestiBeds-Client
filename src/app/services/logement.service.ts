import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logement } from 'src/data/Logement';

@Injectable({
  providedIn: 'root'
})
export class LogementService {
    //private urlFestivals = "http://festibeds.herokuapp.com/Festivals/"
    private urlLogements = "http://localhost:8080/logements";

    constructor(private http: HttpClient) { }

    getLogements() {
      return this.http.get<Logement[]>(this.urlLogements);
    }

    getLogement(id: string) {
      return this.http.get<Logement>(`${this.urlLogements}/${id}`);
    }

    createLogement(logement: Logement) {
      return this.http.post<Logement>(this.urlLogements, logement);
    }

    updateLogement(logement: Logement) {
      return this.http.put<Logement>(this.urlLogements, logement);
    }

    deleteLogement(id: string) {
      return this.http.delete(`${this.urlLogements}/${id}`);
    }
}
