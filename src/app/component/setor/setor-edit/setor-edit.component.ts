import { AltaEditComponent } from './../../alta/alta-edit/alta-edit.component';
import { Router } from '@angular/router';
import { Setor } from './../localInternacao.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SetorService } from './../setor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-setor-edit',
  templateUrl: './setor-edit.component.html',
  styleUrls: ['./setor-edit.component.css']
})
export class SetorEditComponent implements OnInit {

  form: any = FormGroup;
  setor: Setor = {}
  fromPage: any;

  constructor(
    private fb: FormBuilder,
    private service: SetorService,
    private router: Router,
    public dialogRef: MatDialogRef<AltaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      ativo: [''],
      dataCadastro: [''],
    })
    this.fromPage = data.dialogoId;
  }

  ngOnInit(): void {
    this.findById(+this.fromPage)
    console.log(this.form.value)
  }

  findById(id: number) {
    this.service.findById(id).subscribe(obj => {
      console.log(obj)
      this.setor = obj;
      this.form.patchValue({
        id: obj.id,
        nome: obj.nome,
        ativo: obj.ativo,
        // yyyy-MM-ddThh:mm
        dataCadastro: obj.dataCadastro == null ? null : moment(obj.dataCadastro).format('YYYY-DD-MM hh:mm'),
        // dataCadastro: obj.dataCadastro == null ? null : this.toDate(obj.dataCadastro),
      })
    })
  }

  toDate(dateStr: string) {
    const parts = dateStr.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  upDate(){

  }

  cancel(): void {
    this.router.navigate(['/internamento-read'])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
