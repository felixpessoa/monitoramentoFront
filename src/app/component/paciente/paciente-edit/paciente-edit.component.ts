import { Paciente } from './../paciente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from './../paciente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css']
})
export class PacienteEditComponent implements OnInit {

  form: any = FormGroup;
  paciente: Paciente = {};
  data: any = moment.utc(this.paciente.dataNascimento).format('MM/DD/YYYY')

  constructor(
    private fb: FormBuilder,
    private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [],
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
    const id = +this.route.snapshot.paramMap.get('id')!
    this.service.findById(id).subscribe( data => {
      this.paciente = data;
      this.form.value.dataNascimento = this.paciente.dataNascimento;
      console.log(this.paciente)
      console.log(this.data)
    });
  }

}
