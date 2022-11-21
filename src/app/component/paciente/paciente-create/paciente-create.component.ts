import { MatPaginator } from '@angular/material/paginator';
import { Paciente } from './../paciente.model';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  
  data = moment().format('YYYY-MM-DD');
  data2 = moment().format('YYYY-MM-DD');
  data3 = moment().format('YYYY-MM-DD');
  data4 = moment().format('YYYY-MM-DD');
  form: any = FormGroup;
  paciente: Paciente = {};


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: PacienteService,
    
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

  teste() {
    this.paciente.dataNascimento = moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY')
    this.paciente.dataAdmissao = moment.utc(this.form.value.dataAdmissao).format('DD/MM/YYYY')
    this.paciente.dataDaColetaCovid = moment.utc(this.form.value.dataDaColetaCovid).format('DD/MM/YYYY')
    this.paciente.dataColetaTr = moment.utc(this.form.value.dataColetaTr).format('DD/MM/YYYY')
    console.log("teste pact "+this.paciente.dataNascimento)
    console.log("teste form "+this.form.value.dataNascimento)
    
  }

  create(){
    this.paciente.nome = this.form.value.nome;
    this.paciente.sexo = this.form.value.sexo;
    this.paciente.dataNascimento = moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY')
    this.paciente.dataAdmissao = moment.utc(this.form.value.dataAdmissao).format('DD/MM/YYYY')
    this.paciente.numeroDoGal = this.form.value.numeroDoGal;
    this.paciente.dataDaColetaCovid = moment.utc(this.form.value.dataDaColetaCovid).format('DD/MM/YYYY')
    this.paciente.amostra = this.form.value.amostra;
    this.paciente.localDeColetaCovid = this.form.value.localDeColetaCovid;
    this.paciente.statusCovid = this.form.value.statusCovid;
    this.paciente.municipioDeOrigem = this.form.value.municipioDeOrigem;
    this.paciente.statusInfluenza = this.form.value.statusInfluenza;
    this.paciente.vacina = this.form.value.vacina;
    this.paciente.comorbidade = this.form.value.comorbidade;
    this.paciente.tr = this.form.value.tr;
    if(this.form.value.dataColetaTr == null){
      this.paciente.dataColetaTr = "";
    }else{
      this.paciente.dataColetaTr = moment.utc(this.form.value.dataColetaTr).format('DD/MM/YYYY')
    }
    this.paciente.localColetaTr = this.form.value.localColetaTr;
    this.paciente.statusTr = this.form.value.statusTr;
    this.paciente.ativo = this.form.value.ativo;

    console.log(this.paciente);

    this.service.create(this.paciente).subscribe(() => {
      this.service.showMessage('Paciente salvo com sucesso!')
        this.router.navigate(['/pacientes-read'])
    })

  }

  cancel(){

  }

}
