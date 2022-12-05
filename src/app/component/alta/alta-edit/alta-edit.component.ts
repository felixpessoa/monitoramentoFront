import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PacienteService } from './../../paciente/paciente.service';
import { Paciente } from './../../paciente/paciente.model';
import { Alta } from './../alta.model';
import { AltaService } from './../alta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-alta-edit',
  templateUrl: './alta-edit.component.html',
  styleUrls: ['./alta-edit.component.css']
})
export class AltaEditComponent implements OnInit {

  form: any = FormGroup;
  fromPage: any;
  alta: Alta = {}
  paciente: any;
  pacientes: Paciente[] = [];
  selectedValue: any = {};
  pacienteId: any ;


  constructor(
    private fb: FormBuilder,
    private service: AltaService,
    private pacienteService: PacienteService,
    private router: Router,
    public dialogRef: MatDialogRef<AltaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      dataAlta: ['', Validators.required],
      tipoDeAlta: ['', Validators.required],
      paciente: ['', Validators.required],
    })
    this.fromPage = data.dialogoId;
   }

  ngOnInit(): void {
    this.findById(+this.fromPage)
    // this.pacienteId = this.alta.paciente;
    // this.finByIdPaciente();
  }

  finByIdPaciente(){
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
      this.alta = obj;
      this.selectedValue = obj.paciente
      this.form.patchValue({
        dataAlta: obj.dataAlta == null ? null : this.toDate(obj.dataAlta),
        tipoDeAlta: obj.tipoDeAlta == null ? null : this.alta.tipoDeAlta,
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
    if(this.form.valid){
      this.alta.id = +this.fromPage
      this.alta.dataAlta = this.form.value.dataAlta == null ? this.form.value.dataAlta : moment.utc(this.form.value.dataAlta).format('DD/MM/YYYY');
      this.alta.tipoDeAlta = this.form.value.tipoDeAlta;
      this.alta.paciente = this.selectedValue;
      this.service.update(this.alta).subscribe( () =>{
        this.service.showMessage('Alta atualizada.') 
    });
    // this.router.navigate(['/alta-read'])
   
    this.dialogRef.close()
    location.reload();

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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
