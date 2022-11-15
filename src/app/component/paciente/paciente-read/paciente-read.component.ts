import { PacienteService } from './../paciente.service';
import { Paciente } from '../paciente.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-paciente-read',
  templateUrl: './paciente-read.component.html',
  styleUrls: ['./paciente-read.component.css']
})
export class PacienteReadComponent implements OnInit {

  
  pacientes: Paciente[] = [];

  displayedColumns: string[] = ['registro', 'Nome', 'sexo', 'dataNascimento', 'ativo'];
  dataSource = new MatTableDataSource<Paciente>(this.pacientes);

  constructor(
    private pacienteService: PacienteService,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.pacienteService.buscarTodos().subscribe({
      next: (res) => {
        this.pacientes = res;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
