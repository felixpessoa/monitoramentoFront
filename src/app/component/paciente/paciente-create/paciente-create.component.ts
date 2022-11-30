import { Paciente } from './../paciente.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  data = moment().format('YYYY-MM-DD');

  form: any = FormGroup;
  paciente: Paciente = {
    dataNascimento: this.data
  };



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: PacienteService,

  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: [],
      dataAdmissao: [],
      numeroDoGal: [],
      dataDaColetaCovid: [],
      amostra: [],
      localDeColetaCovid: [],
      statusCovid: ['', Validators.required],
      municipioDeOrigem: [],
      statusInfluenza: [],
      vacina: [],
      comorbidade: [],
      tr: [],
      dataColetaTr: [],
      localColetaTr: [],
      statusTr: ['', Validators.required],
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
    console.log("teste pact " + this.paciente.dataNascimento)
    console.log("teste form " + this.form.value.dataNascimento)

  }

  create() {
    if (this.form.valid) {


      this.paciente.nome = this.form.value.nome;
      this.paciente.sexo = this.form.value.sexo;
      this.paciente.dataNascimento = this.form.value.dataNascimento == null ? this.form.value.dataNascimento : moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY')
      this.paciente.dataAdmissao = this.form.value.dataAdmissao == null ? this.form.value.dataAdmissao : moment.utc(this.form.value.dataAdmissao).format('DD/MM/YYYY')
      this.paciente.numeroDoGal = this.form.value.numeroDoGal;
      this.paciente.dataDaColetaCovid = this.form.value.dataDaColetaCovid == null ? this.form.value.dataDaColetaCovid : moment.utc(this.form.value.dataDaColetaCovid).format('DD/MM/YYYY')
      this.paciente.amostra = this.form.value.amostra;
      this.paciente.localDeColetaCovid = this.form.value.localDeColetaCovid;
      this.paciente.statusCovid = this.form.value.statusCovid;
      this.paciente.municipioDeOrigem = this.form.value.municipioDeOrigem;
      this.paciente.statusInfluenza = this.form.value.statusInfluenza;
      this.paciente.vacina = this.form.value.vacina;
      this.paciente.comorbidade = this.form.value.comorbidade;
      this.paciente.tr = this.form.value.tr;
      this.paciente.dataColetaTr = this.form.value.dataColetaTr == null ? this.form.value.dataColetaTr : moment.utc(this.form.value.dataColetaTr).format('DD/MM/YYYY')
      this.paciente.localColetaTr = this.form.value.localColetaTr;
      this.paciente.statusTr = this.form.value.statusTr;
      this.paciente.ativo = this.form.value.ativo == undefined ? null : this.form.value.ativo;

      console.log(this.paciente);
      // console.log(this.form.value);


      this.service.create(this.paciente).subscribe(() => {
        this.service.showMessage('Paciente salvo com sucesso!')
        this.router.navigate(['/pacientes-read'])
      })
    } else
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios faltando.',
        text: 'Por favor, preencher todos os campos com (*) ou em vermelho!',
      })

  }

  cancel() {

  }

  postar() {
    if (!this.form.valid) {
      return
    }
  }




}
