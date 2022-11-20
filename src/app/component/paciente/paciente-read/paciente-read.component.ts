import { Router } from '@angular/router';
import { PacienteService } from './../paciente.service';
import { Paciente } from '../paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paciente-read',
  templateUrl: './paciente-read.component.html',
  styleUrls: ['./paciente-read.component.css']
})
export class PacienteReadComponent implements OnInit {

  
  pacientes: Paciente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'sexo', 'ativo', 'dataNascimento'];
  //   
  dataSource = new MatTableDataSource<Paciente>(this.pacientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.pacienteService.buscarTodos().subscribe({
      next: (res) => {
        this.pacientes = res;
        this.dataSource = new MatTableDataSource<Paciente>(this.pacientes);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    })

    // this.pacienteService.findAll().subscribe((resposta) => {
    //   this.pacientes = resposta;
    //   this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.clientes);
    // })

  }

  navigateToCreate(){
    this.router.navigate(['pacientes-create']);
  }

}
