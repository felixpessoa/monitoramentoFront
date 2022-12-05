import Swal from 'sweetalert2';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Obito } from './obito.mode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObitoService {

  baseUrl: string = environment.url + 'obito'

  constructor(
    private http: HttpClient,
  ) { }

  create(obito: Obito): Observable<Obito> {
    return this.http.post<Obito>(this.baseUrl, obito).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  buscarTodos(): Observable<Obito[]> {
    const url = `${this.baseUrl}`
    return this.http.get<Obito[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  findById(id: number): Observable<Obito>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Obito>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(obito: Obito): Observable<Obito>{
    const url = `${this.baseUrl}/${obito.id}`
    return this.http.put<Obito>(url, obito).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }

  showMessage(msg: string, isError: boolean = false) {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'algo deu errado...',
        text: msg,
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Tudo certo.',
        text: msg,
        // showConfirmButton: false,
        // timer: 1500
      })
    }
  }
}
