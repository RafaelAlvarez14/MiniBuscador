import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Se usa para hacer peticiones HTTP (como pedirle datos a TMDB)
import { Observable } from 'rxjs'; //Es una “promesa especial” de Angular que te dice: “cuando los datos lleguen, te aviso”

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  //Aqui se guarda la clave de TMDB y la url para buscar peliculas
  private apiKey = 'db56a2858c177b848888d521483d033f';
  private apiUrl = 'https://api.themoviedb.org/3/search/movie';

  constructor(private http: HttpClient) {}

  buscarPeliculas(query: string, page: number = 1, year?: number, language: string = 'es'): Observable<any> {
    let url = `${this.apiUrl}?api_key=${this.apiKey}&query=${query}&page=${page}&language=${language}`;
    if (year) {
      url += `&year=${year}`;
    }
    return this.http.get(url);
  }
}
