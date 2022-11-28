import { Router } from '@angular/router';
import { InternamentoService } from './../internamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { Internacao } from './../internamento.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-internamento-read',
  templateUrl: './internamento-read.component.html',
  styleUrls: ['./internamento-read.component.css']
})
export class InternamentoReadComponent implements OnInit {

  internacao: Internacao[] = [];

  displayedColumns: string[] = ['id'];
  //   
  dataSource = new MatTableDataSource<Internacao>(this.internacao);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: InternamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.buscarTodos().subscribe({
      next: (res) => {
        this.internacao = res;
        this.dataSource = new MatTableDataSource<Internacao>(this.internacao);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  navigateToCreate(){
    this.router.navigate(['internamento-create']);
  }

}
