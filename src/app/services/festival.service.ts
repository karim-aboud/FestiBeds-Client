import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festival } from 'src/data/Festival';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
    //private urlFestivals = "http://festibeds.herokuapp.com/Festivals/"
    //private urlFestivals = "http://localhost:8080/festivals/";
    private urlFestivals = "http://129.88.210.4:8080/festivals/";

    constructor(private http: HttpClient) { }

    getFestivals() {
      return this.http.get<Festival[]>(this.urlFestivals);
    }

    getFestival(id: string) {
      return this.http.get<Festival>(`${this.urlFestivals+'id'}/${id}`);
    }

    createFestival(festival: Festival) {
      return this.http.post<Festival>(this.urlFestivals, festival);
    }

    updateFestival(festival: Festival) {
      return this.http.put<Festival>(this.urlFestivals, festival);
    }

    deleteFestival(id: string) {
      return this.http.delete(`${this.urlFestivals}/${id}`);
    }
}
