import Swal from 'sweetalert2';
import { ObitoService } from './../obito.service';
import { AltaEditComponent } from './../../alta/alta-edit/alta-edit.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Obito } from './../obito.mode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Paciente } from '../../paciente/paciente.model';
import { PacienteService } from '../../paciente/paciente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-obito-edit',
  templateUrl: './obito-edit.component.html',
  styleUrls: ['./obito-edit.component.css']
})
export class ObitoEditComponent implements OnInit {

  form: any = FormGroup;
  fromPage: any;
  obito: Obito = {}
  paciente: any;
  pacientes: Paciente[] = [];
  selectedValue: any = {};
  pacienteId: any;

  constructor(
    private fb: FormBuilder,
    private service: ObitoService,
    private pacienteService: PacienteService,
    private router: Router,
    public dialogRef: MatDialogRef<AltaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      dataObito: ['', Validators.required],
      descricao: [''],
      paciente: ['', Validators.required],
    })
    this.fromPage = data.dialogoId;
  }

  ngOnInit(): void {
    this.findById(+this.fromPage)
  }

  finByIdPaciente() {
    this.pacienteService.findById(this.pacienteId).subscribe({
      next: (res) => {
        this.selectedValue = res;
        this.form.patchValue({
          paciente: this.selectedValue.id,
        })
      }
    })
  }

  findById(id: number) {
    this.service.findById(id).subscribe(obj => {
      console.log(obj)
      this.obito = obj;
      this.selectedValue = obj.paciente
      this.form.patchValue({
        dataObito: obj.dataObito == null ? null : this.toDate(obj.dataObito),
        descricao: obj.descricao == null ? null : this.obito.descricao,
        paciente: this.selectedValue.id,
      })
    })
  }

  toDate(dateStr: string) {
    const parts = dateStr.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
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

  upDate() {
    if (this.form.valid) {
      this.obito.id = +this.fromPage
      this.obito.dataObito = this.form.value.dataAlta == null ? this.form.value.dataAlta : moment.utc(this.form.value.dataAlta).format('DD/MM/YYYY');
      this.obito.descricao = this.form.value.tipoDeAlta;
      this.obito.paciente = this.selectedValue;
      this.service.update(this.obito).subscribe(() => {
        this.service.showMessage('Alta atualizada.')
      });
      // this.router.navigate(['/alta-read'])

      this.dialogRef.close()
      location.reload();

    } else {
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

  onNoClick(): void {
    this.dialogRef.close();
  }


}
