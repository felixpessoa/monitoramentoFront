import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from './../paciente.model';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  
  data = moment().format('YYYY-MM-DD');
  form: any = FormGroup;
  paciente: Paciente = {};


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: PacienteService
  ) {
    this.form = this.fb.group({
      nome: [],
      sexo: [],
      dataNascimento: [],
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
      dataCadastro: []
    })
   }

  ngOnInit(): void {
  }

  salvar(){}

  teste() {
    this.paciente.dataNascimento = moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY')
    this.paciente.dataAdmissao = moment.utc(this.form.value.dataAdmissao).format('DD/MM/YYYY')
    this.paciente.dataDaColetaCovid = moment.utc(this.form.value.dataDaColetaCovid).format('DD/MM/YYYY')
    this.paciente.dataColetaTr = moment.utc(this.form.value.dataColetaTr).format('DD/MM/YYYY')
    console.log("teste pact "+this.paciente.dataNascimento)
    console.log("teste form "+this.form.value.dataNascimento)
    
  }

}
