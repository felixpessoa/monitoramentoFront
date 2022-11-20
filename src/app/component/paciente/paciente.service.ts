import { Paciente } from './paciente.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  baseUrl: string = environment.url+'paciente';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, paciente).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  buscarTodos(): Observable<Paciente[]>{;
    return this.http.get<Paciente[]>(this.baseUrl).pipe(
          map(obj => obj),
          catchError(e => this.errorHandler(e))
        );
  }

  errorHandler(e: any): Observable<any> {
    console.log("EEEEEEEEEEEERRRRRRRRRRRO "+JSON.stringify(e.message))
    this.showMessage(e.message, true);
    return EMPTY
  }

  showMessage2(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  showMessage(msg: string, isError: boolean = false): void {
    if (!isError) {

    }else{
      Swal.fire({
        icon: 'error',
        title: 'algo deu errado...',
        text: msg,
      })
    }
  }




}
