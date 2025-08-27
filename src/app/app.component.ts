import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from './servicios/pelicula.service';

@Component({
  selector: 'app-root', //Es el nombre del componente, se pone en index.html
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private peliculaService = inject(PeliculaService);    //Esto hace que el componente tenga acceso al servicio PeliculaService para llamar a la API

  query = 'Matrix';                   //Lo que se va a buscar al inicio
  year?: number;                      //Año opcional
  language = 'es';                    //Idioma por defecto
  peliculas: any[] = [];              //Aqui se guarda las películas que devuelve TMDB
  pagina = 1;                         //Para paginacion
  peliculaSeleccionada: any = null;   //Para modal o detalles

  //ngOnInit se ejecuta cuando el componente se carga, asi que busca las películas de inicio(matrix)
  ngOnInit(): void {
    this.buscar();
  }

  //Llama al servicio y cuando los datos llegan(subscribe) los guarda en this.peliculas
  //data.results es donde TMDB devuelve el listado de películas
  //Si no hay resultados, || [] asegura que sea un array vacío
  buscar() {
    this.peliculaService.buscarPeliculas(this.query, this.pagina, this.year, this.language)
      .subscribe((data: any) => {
        this.peliculas = data.results || [];
      });
  }

  //Simplemente se cambia el numero de pagina y se vuelve a llamar buscar() para cargar la nueva pagina de resultados
  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.buscar();
    }
  }

  siguiente() {
    this.pagina++;
    this.buscar();
  }

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w200${path}`;
  }

  abrirDetalles(peli: any) {
    this.peliculaSeleccionada = peli;
  }

  cerrarModal() {
    this.peliculaSeleccionada = null;
  }
}
