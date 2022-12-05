import Swal from 'sweetalert2';
import { Paciente } from './../paciente.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { PacienteService } from './../paciente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css']
})
export class PacienteEditComponent implements OnInit {


  form: any = FormGroup;
  paciente: Paciente = {};
 
  constructor(
    private fb: FormBuilder,
    private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      id: [],
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: [],
      // dataAdmissao: [],
      numeroDoGal: [],
      dataDaColetaCovid: [],
      amostra: [],
      localDeColetaCovid: [],
      statusCovid: ['', Validators.required],
      municipioDeOrigem: [],
      statusInfluenza: [],
      vacina: [],
      comorbidade: [],
      tr: [],
      dataColetaTr: [],
      localColetaTr: [],
      statusTr: ['', Validators.required],
      dataCadastro: []
    })
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!
    this.service.findById(id).subscribe(data => {
      console.log(data)
      this.paciente = data;
      this.form.patchValue({
        id: data.id,
        nome: data.nome,
        sexo: data.sexo,
        dataNascimento: data.dataNascimento == null ? null : this.toDate(data.dataNascimento!),
        // dataAdmissao: data.dataAdmissao == null ? null : this.toDate(data.dataAdmissao!),
        numeroDoGal: data.numeroDoGal,
        dataDaColetaCovid: data.dataDaColetaCovid == null ? null : this.toDate(data.dataDaColetaCovid!),
        amostra: data.amostra,
        localDeColetaCovid: data.localDeColetaCovid,
        statusCovid: data.statusCovid,
        municipioDeOrigem: data.municipioDeOrigem,
        statusInfluenza: data.statusInfluenza,
        vacina: data.vacina,
        comorbidade: data.comorbidade,
        tr: data.tr,
        dataColetaTr: data.dataColetaTr == null ? null : this.toDate(data.dataColetaTr!),
        localColetaTr: data.localColetaTr,
        statusTr: data.statusTr,
        dataCadastro: data.dataCadastro == null ? null : this.toDate(data.dataCadastro!)
      })
    });





  }

  toDate(dateStr: string) {
    const parts = dateStr.split("/");
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  teste(dateStr: string) {
    const data = new Date(dateStr);
    return moment(data).format('YYYY-MM-DD')
  }

  changeDatePicker(): any {
    // this.form.value.dataNascimento = this.form.value.dataNascimento;
    // this.form.value.dataNascimento = (moment(this.form.value.dataNascimento).format('YYYY-MM-DD'));
    console.log(this.form.value.dataNascimento);
  }


  testeButon() {
    this.form.value.dataNascimento = moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY');
    console.log(this.form.value.dataNascimento);
  }

  upDate() {
    if (this.form.valid) {


      this.paciente.id = this.form.value.id;
      this.paciente.nome = this.form.value.nome;
      this.paciente.sexo = this.form.value.sexo;
      this.paciente.dataNascimento = this.form.value.dataNascimento == null ? this.form.value.dataNascimento : moment.utc(this.form.value.dataNascimento).format('DD/MM/YYYY')
      // this.paciente.dataAdmissao = this.form.value.dataAdmissao == null ? this.form.value.dataAdmissao : moment.utc(this.form.value.dataAdmissao).format('DD/MM/YYYY')
      this.paciente.numeroDoGal = this.form.value.numeroDoGal;
      this.paciente.dataDaColetaCovid = this.form.value.dataDaColetaCovid == null ? this.form.value.dataDaColetaCovid : moment.utc(this.form.value.dataDaColetaCovid).format('DD/MM/YYYY')
      this.paciente.amostra = this.form.value.amostra;
      this.paciente.localDeColetaCovid = this.form.value.localDeColetaCovid;
      this.paciente.statusCovid = this.form.value.statusCovid;
      this.paciente.municipioDeOrigem = this.form.value.municipioDeOrigem;
      this.paciente.statusInfluenza = this.form.value.statusInfluenza;
      this.paciente.vacina = this.form.value.vacina;
      this.paciente.comorbidade = this.form.value.comorbidade;
      this.paciente.tr = this.form.value.tr;
      this.paciente.dataColetaTr = this.form.value.dataColetaTr == null ? this.form.value.dataColetaTr : moment.utc(this.form.value.dataColetaTr).format('DD/MM/YYYY')
      this.paciente.localColetaTr = this.form.value.localColetaTr;
      this.paciente.statusTr = this.form.value.statusTr;
      this.paciente.ativo = this.form.value.ativo == undefined ? true : this.form.value.ativo;

      console.log(this.paciente);
      this.service.update(this.paciente).subscribe(
        event => {
          this.service.showMessage('Paciente atualizado.')
          this.router.navigate(['/pacientes-read'])}
     )

    } else{
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios faltando.',
        text: 'Por favor, preencher todos os campos com (*) ou em vermelho!',
      })
    }

  }

  cancel(): void {
    this.router.navigate(['/pacientes-read'])
  }

}
