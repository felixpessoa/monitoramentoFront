import { PacienteService } from './../../paciente/paciente.service';
import { Paciente } from './../../paciente/paciente.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InternamentoEditComponent } from './../../internamento/internamento-edit/internamento-edit.component';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
  ) {
    this.form = this.fb.group({
      dataAlta: [],
      tipoDeAlta: [],
      paciente: [],
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
          console.log(this.paciente)
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

  }

  cancel(): void {
    this.router.navigate(['/internamento-read'])
  }

}
