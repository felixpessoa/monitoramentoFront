import Swal from 'sweetalert2';
import { Observable, map, catchError, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Internacao } from './internamento.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternamentoService {

  baseUrl: string = environment.url + 'internacao'

  constructor(
    private http: HttpClient,
  ) { }

  create(internacao: Internacao): Observable<Internacao> {
    return this.http.post<Internacao>(this.baseUrl, internacao).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  buscarTodos(): Observable<Internacao[]> {
    const url = `${this.baseUrl}/ativos`
    return this.http.get<Internacao[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  bucarPorSetor(ids: number[]): Observable<Internacao[]> {
    const url = `${this.baseUrl}/setor/${ids}`
    return this.http.get<Internacao[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  findById(id: number): Observable<Internacao>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Internacao>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }


  findByDatainAndfi(dataDe:any, dataAte:any): Observable<Internacao[]>{
    const url = `${this.baseUrl}/datas?dataDe=${dataDe}&dataAte=${dataAte}`
    return this.http.get<Internacao[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  


  update(internacao: Internacao): Observable<Internacao>{
    const url = `${this.baseUrl}/${internacao.id}`
    return this.http.put<Internacao>(url, internacao).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    console.log(e.error.message);
    this.showMessage(e.error.message, true);
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
