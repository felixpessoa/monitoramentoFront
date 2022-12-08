import { FormGroup, FormBuilder } from '@angular/forms';
import { AltaService } from './../../alta/alta.service';
import { Alta } from './../../alta/alta.model';
import { Obito } from './../../obito/obito.mode';
import { ObitoService } from './../../obito/obito.service';
import { Internacao } from './../../internamento/internamento.model';
import { InternamentoService } from './../../internamento/internamento.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  @ViewChild("canvas", { static: true }) element?: ElementRef;
 

  internacao: Internacao[] = [];
  obitos: Obito[] = [];
  altas: Alta[] = [];
  // data1: any = moment.utc(new Date('12/07/2022')).format('DD/MM/YYYY');
  // data2: any = moment.utc(new Date('12/10/2022')).format('DD/MM/YYYY');
  data1: any = new Date();
  data2: any = new Date();
  
  labelsDate: any[] = [];
  internamentos: any[] = [];
  labels: any = [];
  
  dataAdm: any[] = [];
  dataObito: any[] = [];
  dataAlta: any[] = [];

  form: any = FormGroup;
 

  

  constructor(
    private fb: FormBuilder,
    private internamentoService: InternamentoService,
    private obitoService: ObitoService,
    private altaService: AltaService,
    
  ) {
    

    this.form = this.fb.group({
      dataDe: [''],
      dataAte: [''],
    })
  }

   ngOnInit(): void {
    this.data1.setDate(this.data2.getDate() - 15);
    console.log('data de hoje é ',this.data1, ' e de 15 dias atras é ', this.data2);

    this.getAdm();
    this.getObito();
    this.getAlta();

    this.arrayData(this.data1, this.data2);

  }

  carregarData() {
    console.log('data de hoje é ',moment.utc(this.form.value.dataDe).format('DD/MM/YYYY'), ' e de 15 dias atras é ', moment.utc(this.form.value.dataAte).format('DD/MM/YYYY'));
    // this.arrayData(new Date(), new Date())
    this.arrayData(this.form.value.dataDe, this.form.value.dataAte)
    this.grafico();
  }

  grafico(): Chart {
    return new Chart(this.element?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsDate,
        datasets: [{
          type: 'bar',
          label: 'ADMISSÕES',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor:  'rgb(54, 162, 235)',
          
          data: this.dataAdm,
        }, {
          type: 'bar',
          label: 'ÓBITOS',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.dataObito,
        }, {
          type: 'bar',
          label: 'CURA/ALTA',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          data: this.dataAlta,
        }]
      },
      options: {
        plugins: {
          title: {
            text: 'Chart.js Combo Time Scale',
            display: true
          }
        },
      },
    })
  }

  adcaoDiaria(internacao: any) {
    var contador: number = 0
    this.internacao = internacao;
    this.labelsDate.forEach(res => {
      this.internacao.forEach(data => {
        if(res === data.inicio) {
          contador = contador + 1;
        }
      })
      this.dataAdm.push(contador);
      contador = 0;
    })
    this.grafico();
  }

  addObito(obj: any) {
    var contador: number = 0
    this.obitos = obj;
    this.labelsDate.forEach(res => {
      this.obitos.forEach(data => {
        if(res === data.dataObito) {
          contador = contador + 1;
        }
      })
      this.dataAdm.push(contador);
      contador = 0;
    })
    this.grafico();
  }


  addAlta(obj: any) {
    var contador: number = 0
    this.altas = obj;
    this.labelsDate.forEach(res => {
      this.dataAlta.forEach(data => {
        if(res === data.dataAlta) {
          contador = contador + 1;
        }
      })
      this.dataAdm.push(contador);
      contador = 0;
    })
    this.grafico();
  }



  async getAdm() {
    const d1 = moment.utc(this.data1).format('DD/MM/YYYY');
    const d2 = moment.utc(this.data2).format('DD/MM/YYYY');
    await this.internamentoService.findByDatainAndfi(d1, d2).subscribe(res => {
      var internacao = res;
      // console.log('LISTA DE INTERNACAO',this.internacao);
      this.adcaoDiaria(internacao)
    })
    
  }

  async getObito() {
    const d1 = moment.utc(this.data1).format('DD/MM/YYYY');
    const d2 = moment.utc(this.data2).format('DD/MM/YYYY');
    await this.obitoService.findByDatainAndfi(d1, d2).subscribe(res => {
      var obj = res;
      // console.log('LISTA DE INTERNACAO',this.internacao);
      this.addObito(obj)
    })
    
  }

  async getAlta() {
    const d1 = moment.utc(this.data1).format('DD/MM/YYYY');
    const d2 = moment.utc(this.data2).format('DD/MM/YYYY');
    await this.altaService.findByDatainAndfi(d1, d2).subscribe(res => {
      var obj = res;
      // console.log('LISTA DE INTERNACAO',this.internacao);
      this.addAlta(obj)
    })
    
  }

  arrayData(data1: any, data2: any) {
    while(this.labelsDate.length) {
      this.labelsDate.pop();
    }
    const d1 = data1;
    // if (moment(d1).isSame(data2)){

    // }
    // while (d1 > data2) {
    while (!moment(d1).isSame(data2)) {
      console.log(d1);
      this.labelsDate.push(moment.utc(d1).format('DD/MM/YYYY'));
      d1.setDate(d1.getDate() + 1);
    }
    this.labelsDate.push(moment.utc(data2).format('DD/MM/YYYY'));

    console.log('Lista de datas', this.labelsDate);
  }



}
