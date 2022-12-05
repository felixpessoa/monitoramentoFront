import { Alta } from './../../alta/alta.model';
import { Router } from '@angular/router';
import { InternamentoService } from './../internamento.service';
import { PacienteService } from './../../paciente/paciente.service';
import { Paciente } from './../../paciente/paciente.model';
import { Setor } from './../../setor/localInternacao.model';
import { SetorService } from './../../setor/setor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Internacao } from './../internamento.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';


@Component({
  selector: 'app-internamento-edit',
  templateUrl: './internamento-edit.component.html',
  styleUrls: ['./internamento-edit.component.css']
})
export class InternamentoEditComponent implements OnInit {

  internacao: Internacao = {};
  seto: Setor = {};
  teste: any;

  alta2: Alta = {};
  form: any = FormGroup;
  fromPage: any;
  setor: Setor[] = [];
  pacientes: Paciente[] = [];
  paciente: Paciente = {};
  selectedValue: any;
  labelPosition: any;

  constructor(
    private fb: FormBuilder,
    private service: InternamentoService,
    private setorService: SetorService,
    private pacienteService: PacienteService,
    public dialogRef: MatDialogRef<InternamentoEditComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      localInternacao: [],
      inicio: [],
      fim: [],
      paciente: [],
      // paciente: [this.selectedValue, Validators.required],
    })
    this.fromPage = data.dialogoId;
  }

  ngOnInit(): void {
    this.findById(+this.fromPage);
    this.buscarSetor();
  }

  findById(id: number) {
    this.service.findById(id).subscribe(obj => {
      this.teste = obj.localInternacao;
      this.selectedValue = obj.paciente
      this.internacao = obj;
      this.form.patchValue({
        localInternacao: this.teste.id,
        inicio: obj.inicio == null ? null : this.toDate(obj.inicio),
        fim: obj.fim == null ? null : this.toDate(obj.fim),
        paciente: this.paciente.id,
      })

    })
  }


  buscarSetor() {
    this.setorService.buscarTodosSetoresAtivo().subscribe({
      next: (res) => {
        this.setor = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
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

  toDate(dateStr: string) {
    const parts = dateStr.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  upDate() {
    this.internacao.id = +this.fromPage;
    this.internacao.inicio = this.form.value.inicio == null ? this.form.value.inicio : moment.utc(this.form.value.inicio).format('DD/MM/YYYY');
    this.internacao.localInternacao = this.form.value.localInternacao;
    this.internacao.paciente = this.selectedValue.id;
    this.internacao.ativo = true

    console.log(this.selectedValue.id)
    console.log(this.form.value)
    console.log('Internacao 8===) --', this.internacao)

    this.service.update(this.internacao).subscribe( () =>{
      this.service.showMessage('Internamento atualizado.') 
    });
    this.router.navigate(['/internamento-read'])
    // this.router.navigateByUrl('/internamento-read');
    this.dialogRef.close()
    location.reload();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.router.navigate(['/internamento-read'])
  }

  alta() {
    // this.alta.paciente = this.selectedValue.id;
    // this.router.navigate(['/alta-create'],
    // {queryParams: this.selectedValue.id}
    // );
    this.router.navigateByUrl('/alta-create',
    {state: {passiente: this.selectedValue.id}}
    );
    
    // this.dialogRef.close({
    //   clicked: 'submit',
    // });
    this.dialogRef.close()
  }

  obito() {
    this.router.navigateByUrl('/obito-create',
    {state: {passiente: this.selectedValue.id}}
    );
    this.dialogRef.close()
  }


}
