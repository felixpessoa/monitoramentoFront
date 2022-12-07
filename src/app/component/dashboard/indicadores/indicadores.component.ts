import { Internacao } from './../../internamento/internamento.model';
import { InternamentoService } from './../../internamento/internamento.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  @ViewChild("canvas", { static: true }) element?: ElementRef;
  @ViewChild("canvas2", { static: true }) element2?: ElementRef;

  internacao: any[] = [];
  // data1: any = moment.utc(new Date('12/07/2022')).format('DD/MM/YYYY');
  // data2: any = moment.utc(new Date('12/10/2022')).format('DD/MM/YYYY');
  data1: any = new Date('12/05/2022');
  data2: any = new Date('12/07/2022');
  labelsDate: any[] = [];
  dataAdm: any[] = [];
  internamentos: any[] = [];

  labels: any = [];


  salesData: ChartData<'line'> = {
    labels: this.labels,
    datasets: [
      { label: 'ADMISSÕES', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
      { label: 'ÓBITOS', data: [200, 100, 400, 50, 90], tension: 0.5 },
      { label: 'CURA/ALTA', data: [500, 400, 350, 450, 650], tension: 0.5 },
      // { label: 'Headset', data: [1200, 1500, 1020, 1600, 900], tension: 0.5 },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  constructor(
    private internamentoService: InternamentoService,
  ) {

  }

   ngOnInit(): void {
    this.getAdm()
    this.arrayData(this.data1, this.data2);
    // await this.adcaoDiaria();

    new Chart(this.element?.nativeElement, {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            data: [85, 12, 32, 65, 12]
          }
        ]
      }
    })

    new Chart(this.element2?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsDate.sort(),
        datasets: [{
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: '#FF0000',
          borderColor: '#FF0000',
          data: this.dataAdm,
        }, {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: '#40E0D0',
          borderColor: '#40E0D0',
          data: [85, 12, 32, 65, 12],
        }, {
          type: 'line',
          label: 'Dataset 3',
          backgroundColor: '#3CB371',
          borderColor: '#3CB371',
          fill: false,
          data: [85, 12, 32, 65, 12],
        }]
      }
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

  arrayData(data1: any, data2: any) {
    const d1 = data1;
    this.labelsDate.push(moment.utc(data2).format('DD/MM/YYYY'));
    while (d1 < data2) {
      console.log(d1);
      this.labelsDate.push(moment.utc(d1).format('DD/MM/YYYY'));
      d1.setDate(d1.getDate() + 1);
    }
    console.log('Lista de datas', this.labelsDate.sort());
  }



}
