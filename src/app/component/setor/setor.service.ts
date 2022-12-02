import Swal from 'sweetalert2';
import { Setor } from './localInternacao.model';
import { Observable, map, EMPTY, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  baseUrl: string = environment.url + 'localInternacao'

  constructor(
    private http: HttpClient,
  ) { }


findById(id: number): Observable<Setor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Setor>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  buscarTodosSetoresAtivo(): Observable<Setor[]> {
    const url =  `${this.baseUrl}/ativos`
    return this.http.get<Setor[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY
  }

  showMessage(msg: string, isError: boolean = false): void {
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
