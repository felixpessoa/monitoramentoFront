import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Alta } from './alta.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AltaService {

  baseUrl: string = environment.url + 'alta'

  constructor(
    private http: HttpClient,
  ) { }

  findByDatainAndfi(dataDe:any, dataAte:any): Observable<Alta[]>{
    const url = `${this.baseUrl}/datas?dataDe=${dataDe}&dataAte=${dataAte}`
    return this.http.get<Alta[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  create(alta: Alta): Observable<Alta> {
    return this.http.post<Alta>(this.baseUrl, alta).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  buscarTodos(): Observable<Alta[]> {
    const url = `${this.baseUrl}`
    return this.http.get<Alta[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  findById(id: number): Observable<Alta>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Alta>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(alta: Alta): Observable<Alta>{
    const url = `${this.baseUrl}/${alta.id}`
    return this.http.put<Alta>(url, alta).pipe(
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
