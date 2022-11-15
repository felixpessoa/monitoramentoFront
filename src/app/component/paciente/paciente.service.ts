import { Paciente } from './paciente.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private _URL = environment.url+'paciente'

  constructor(
    private http: HttpClient,
  ) { }

  buscarTodos() {
    return this.http.get<Paciente[]>(this._URL);
  }




}
