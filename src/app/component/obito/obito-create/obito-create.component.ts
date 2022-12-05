import Swal from 'sweetalert2';
import { Obito } from './../obito.mode';
import { ObitoService } from './../obito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../paciente/paciente.service';
import { Paciente } from '../../paciente/paciente.model';
import * as moment from 'moment';

@Component({
  selector: 'app-obito-create',
  templateUrl: './obito-create.component.html',
  styleUrls: ['./obito-create.component.css']
})
export class ObitoCreateComponent implements OnInit {

  pacienteId: any ;
  form: any = FormGroup;
  pacientes: Paciente[] = [];
  paciente: Paciente = {};
  selectedValue: any = {};
  obito: Obito = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private service: ObitoService,
  ) {
    this.form = this.fb.group({
      dataObito: ['', Validators.required],
      descricao: [''],
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
      this.obito.dataObito = this.form.value.dataObito == null ? this.form.value.dataObito : moment.utc(this.form.value.dataObito).format('DD/MM/YYYY');
      this.obito.descricao = this.form.value.tipoDeAlta;
      this.obito.paciente = this.form.value.paciente;

      // console.log(this.obito);
      this.service.create(this.obito).subscribe(() => {
        this.service.showMessage('Alta salva com sucesso!')
        this.router.navigate(['/obito-read'])
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
    this.router.navigate(['/obito-read'])
  }

}
