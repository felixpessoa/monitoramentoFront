import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  date: any = new Date();
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };

  labels:any = [];
  

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

  ) {
    
   }

  ngOnInit(): void {
    console.log(this.NUMBER_CFG)
    this.dias();
  }

  dias() {
    for (let i = 0; i < this.DATA_COUNT; ++i) {
      this.labels.push(moment.utc(new Date(i)).format('DD/MM/YYYY'));
      
    }
  }



}
