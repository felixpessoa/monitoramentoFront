import Swal from 'sweetalert2';
import { AltaService } from './../alta.service';
import { Alta } from './../alta.model';
import { PacienteService } from './../../paciente/paciente.service';
import { Paciente } from './../../paciente/paciente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InternamentoEditComponent } from './../../internamento/internamento-edit/internamento-edit.component';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-alta-create',
  templateUrl: './alta-create.component.html',
  styleUrls: ['./alta-create.component.css']
})
export class AltaCreateComponent implements OnInit {

  pacienteId: any ;
  form: any = FormGroup;
  pacientes: Paciente[] = [];
  paciente: Paciente = {};
  selectedValue: any = {};
  alta: Alta = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private service: AltaService,
  ) {
    this.form = this.fb.group({
      dataAlta: ['', Validators.required],
      tipoDeAlta: ['', Validators.required],
      paciente: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.pacienteId = history.state.passiente;
    this.finByIdPaciente();
  }

  finByIdPaciente(){
    if(this.pacienteId != null){
      this.pacienteService.findById(this.pacienteId).subscribe({
        next: (res) => {
          this.selectedValue = res;
          this.form.patchValue({
            paciente: this.selectedValue.id,
          })
        }
      })
    }
  }

  buscarPaciente(nome: any) {
    this.pacienteService.findByIdName(nome).subscribe({
      next: (res) => {
        console.log(res);
        this.pacientes = res
        this.paciente = res[0];
        this.form.patchValue({
          paciente: this.paciente.id,
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  create() {
    if (this.form.valid) {
      this.alta.dataAlta = this.form.value.dataAlta == null ? this.form.value.dataAlta : moment.utc(this.form.value.dataAlta).format('DD/MM/YYYY');
      this.alta.tipoDeAlta = this.form.value.tipoDeAlta;
      this.alta.paciente = this.form.value.paciente;

      this.service.create(this.alta).subscribe(() => {
        this.service.showMessage('Alta salva com sucesso!')
        this.router.navigate(['/alta-read'])
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
    this.router.navigate(['/internamento-read'])
  }

}
