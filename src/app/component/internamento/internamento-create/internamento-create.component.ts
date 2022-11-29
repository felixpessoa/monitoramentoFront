import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { InternamentoService } from './../internamento.service';
import { Internacao } from './../internamento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-internamento-create',
  templateUrl: './internamento-create.component.html',
  styleUrls: ['./internamento-create.component.css']
})
export class InternamentoCreateComponent implements OnInit {

  form: any = FormGroup;
  internacao: Internacao = {};

  constructor(
    private service: InternamentoService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      localInternacao: ['', Validators.required],
      inicio: [],
      fim: [],
      paciente: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  create() {
    if(this.form.valid) {
      this.internacao.localInternacao = this.form.value.localInternacao;
      this.internacao.inicio = this.form.value.inicio == null ? this.form.value.inicio : moment.utc(this.form.value.inicio).format('HH:mm DD/MM/YYYY')
      this.internacao.fim = this.form.value.fim == null ? this.form.value.fim : moment.utc(this.form.value.fim).format('HH:mm DD/MM/YYYY')
      this.internacao.paciente = this.form.value.paciente;

      this.service.create(this.internacao).subscribe(() => {
        this.service.showMessage('Internamento salvo com sucesso!')
        this.router.navigate(['/internamento-read'])
      })
    }else
    Swal.fire({
      icon: 'warning',
      title: 'Campos obrigatórios faltando.',
      text: 'Por favor, preencher todos os campos com (*) ou em vermelho!',
    })
  }

}
