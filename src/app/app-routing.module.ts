import { InternamentoReadComponent } from './component/internamento/internamento-read/internamento-read.component';
import { PacienteEditComponent } from './component/paciente/paciente-edit/paciente-edit.component';
import { PacienteCreateComponent } from './component/paciente/paciente-create/paciente-create.component';
import { PacienteReadComponent } from './component/paciente/paciente-read/paciente-read.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pacientes-read',
    component: PacienteReadComponent
  },
  {
    path: 'pacientes-create',
    component: PacienteCreateComponent
  },
  {
    path: 'paciente-edit/:id',
    component: PacienteEditComponent
  },
  {
    path: 'internamento-read',
    component: InternamentoReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
