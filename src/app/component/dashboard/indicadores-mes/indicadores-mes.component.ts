import { Internacao } from './../../internamento/internamento.model';
import { Chart } from 'chart.js';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-indicadores-mes',
  templateUrl: './indicadores-mes.component.html',
  styleUrls: ['./indicadores-mes.component.css']
})
export class IndicadoresMesComponent implements OnInit {

  @ViewChild("canvas", { static: true }) element?: ElementRef;

  labelsMes: any[] = [];
  dataAdm: any[] = [];
  dataObito: any[] = [];
  dataAlta: any[] = [];

  data1= new Date('01/01/2022')
  data2= new Date('12/01/2022')

  internacao: Internacao[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(!moment(this.data1).isSame(this.data2, 'month'))
    this.arrayData(this.data1, this.data2)
    this.addAdmicao();
    // this.grafico();

    

  }
  
  grafico(): Chart {
    return new Chart(this.element?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsMes,
        datasets: [{
          type: 'bar',
          label: 'ADMISSÕES',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor:  'rgb(54, 162, 235)',
          
          data: [85, 160, 157, 123, 118, 131, 177, 55, 257, 161, 135],
        }, {
          type: 'bar',
          label: 'ÓBITOS',
          backgroundColor: '#8B0000',
          // borderColor: 'rgb(255, 99, 132)',
          data: [19,54,51,27,46,26,21,25,66,50,41],
        }, {
          type: 'bar',
          label: 'CURA/ALTA',
          backgroundColor: '#008000',
          // borderColor: 'rgb(75, 192, 192)',
          data: [26,86,86,82,72,95,126,59,135,70,132],
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

  addAdmicao() {
    var contador: number = 0
    // this.internacao = internacao;
    this.labelsMes.forEach(res => {
      const data = new Date(res)
      const firstDay = new Date(data.getFullYear(), data.getMonth(), 1);
      console.log('PRIMEIRO DIA DO MES',moment.utc(firstDay).format('DD/MM/YYYY'))
      
      // const lastDay = new Date(res.getFullYear(), res.getMonth() + 1, 0);
      // console.log('ULTIMO DIA DO MES',moment.utc(lastDay).format('DD/MM/YYYY'))
      
      
      
    //   this.internacao.forEach(data => {
    //     if(res === data.inicio) {
    //       contador = contador + 1;
    //     }
    //   })
    //   this.dataAdm.push(contador);
    //   contador = 0;
    })
    this.grafico();
  }

  arrayData(data1: any, data2: any) {
    while(this.labelsMes.length) {
      this.labelsMes.pop();
    }
    const d1 = data1;
    // if (moment(d1).isSame(data2)){

    // }
    // while (d1 > data2) {
    while (!moment(d1).isSame(data2, 'month')) {
      console.log(d1);
      this.labelsMes.push(moment.utc(d1).format('MM/YYYY'));
      d1.setMonth(d1.getMonth() + 1);
    }
    this.labelsMes.push(moment.utc(data2).format('MM/YYYY'));

    console.log('Lista de datas', this.labelsMes);
  }

}
