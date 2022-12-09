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

  data1= new Date('12/09/2022')
  data2= new Date('10/09/2022')

  constructor() { }

  ngOnInit(): void {
    !moment(this.data1).isSame(this.data2, 'month')
    // this.arrayData(this.data1, this.data2)
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
      this.labelsMes.push(moment.utc(d1).format('DD/MM/YYYY'));
      d1.setMonth(d1.getMonth() + 1);
    }
    this.labelsMes.push(moment.utc(data2).format('DD/MM/YYYY'));

    console.log('Lista de datas', this.labelsMes);
  }

}
