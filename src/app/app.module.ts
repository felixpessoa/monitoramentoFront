import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/template/header/header.component';
import { HttpClientModule } from '@angular/common/http';



import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from './component/template/nav/nav.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PacienteReadComponent } from './component/paciente/paciente-read/paciente-read.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PacienteCreateComponent } from './component/paciente/paciente-create/paciente-create.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PacienteEditComponent } from './component/paciente/paciente-edit/paciente-edit.component';
import { InternamentoReadComponent } from './component/internamento/internamento-read/internamento-read.component';
import { InternamentoCreateComponent } from './component/internamento/internamento-create/internamento-create.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InternamentoEditComponent } from './component/internamento/internamento-edit/internamento-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { AltaCreateComponent } from './component/alta/alta-create/alta-create.component';
import { AltaReadComponent } from './component/alta/alta-read/alta-read.component';
import { AltaEditComponent } from './component/alta/alta-edit/alta-edit.component';
import { ObitoCreateComponent } from './component/obito/obito-create/obito-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    PacienteReadComponent,
    PacienteCreateComponent,
    PacienteEditComponent,
    InternamentoReadComponent,
    InternamentoCreateComponent,
    InternamentoEditComponent,
    AltaCreateComponent,
    AltaReadComponent,
    AltaEditComponent,
    ObitoCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    CommonModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
