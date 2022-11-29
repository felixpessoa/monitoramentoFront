import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InternamentoService } from './../internamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { Internacao } from './../internamento.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-internamento-read',
  templateUrl: './internamento-read.component.html',
  styleUrls: ['./internamento-read.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InternamentoReadComponent implements OnInit {

  internacao: Internacao[] = [];
  // columnsToDisplay : string[] = ['id', 'nome', 'sexo', 'dataNascimento', 'dataAdmissao', 'numeroDoGal', 'dataDaColetaCovid', 'amostra', 'localDeColetaCovid', 'statusCovid', 'municipioDeOrigem'];
  columnsToDisplay = ['id', 'nome', 'dataAdmissao', 'localInternacao'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Internacao | null;
  dataSource = new MatTableDataSource<Internacao>(this.internacao);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: any = FormGroup;

  setorList: string[] = ['UTI A', 'UTI B'];

  constructor(
    private service: InternamentoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      idInternacao: [],
      nome: [],
      sexo: [],
      dataNascimento: [],
      idade: [],
      dataAdmissao: [],
      numeroDoGal: [],
      dataDaColetaCovid: [],
      amostra: [],
      localDeColetaCovid: [],
      statusCovid: [],
      municipioDeOrigem: [],
      statusInfluenza: [],
      vacina: [],
      comorbidade: [],
      tr: [],
      dataColetaTr: [],
      localColetaTr: [],
      statusTr: [],
    })
  }

  ngOnInit(): void {
    this.findAll();
    this.findAllSetor();
  }

  findAll() {
    this.service.buscarTodos().subscribe({
      next: (res) => {
        console.log(res)
        this.internacao = res;
        // this.form.patchValue({
        //   idInternacao: res.id,
        //   nome: [],
        //   sexo: [],
        //   dataNascimento: [],
        //   idade: [],
        //   dataAdmissao: [],
        //   numeroDoGal: [],
        //   dataDaColetaCovid: [],
        //   amostra: [],
        //   localDeColetaCovid: [],
        //   statusCovid: [],
        //   municipioDeOrigem: [],
        //   statusInfluenza: [],
        //   vacina: [],
        //   comorbidade: [],
        //   tr: [],
        //   dataColetaTr: [],
        //   localColetaTr: [],
        //   statusTr: [],
        // })
        this.dataSource = new MatTableDataSource<Internacao>(this.internacao);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  findAllSetor() {

  }

  navigateToCreate() {
    this.router.navigate(['internamento-create']);
  }

}
