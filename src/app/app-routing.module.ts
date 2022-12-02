import { AltaCreateComponent } from './component/alta/alta-create/alta-create.component';
import { InternamentoCreateComponent } from './component/internamento/internamento-create/internamento-create.component';
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
  },
  {
    path: 'internamento-create',
    component: InternamentoCreateComponent
  },
  {
    path: 'alta-create',
    component: AltaCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
