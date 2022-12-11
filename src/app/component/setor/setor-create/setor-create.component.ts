import Swal  from 'sweetalert2';
import { Setor } from './../localInternacao.model';
import { SetorService } from './../setor.service';
import { Internacao } from './../../internamento/internamento.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setor-create',
  templateUrl: './setor-create.component.html',
  styleUrls: ['./setor-create.component.css']
})
export class SetorCreateComponent implements OnInit {

  form: any = FormGroup;
  setor: Setor = {};
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: SetorService,
  ) { 
    this.form = this.fb.group({
      nome: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  create() {
    if (this.form.valid) {
      this.setor.nome = this.form.value.nome;
      this.setor.ativo = true;

      // console.log(this.obito);
      this.service.create(this.setor).subscribe(() => {
        this.service.showMessage('Setor salva com sucesso!')
        this.router.navigate(['/setor-read'])
      })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios faltando.',
        text: 'Por favor, preencher todos os campos com (*) ou em vermelho!',
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/setor-read'])
  }

}
