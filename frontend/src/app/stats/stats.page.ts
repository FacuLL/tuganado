import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { RecordService } from '../services/record.service';
import { BaseChartDirective } from 'ng2-charts';

type Period = 'week' | 'month' | 'year' | 'all';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})

export class StatsPage implements OnInit {

  constructor(private recordService: RecordService) { }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data?: any[];

  period: Period = 'week';

  weekLabels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  yearLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Litros',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
      }
    ],
    labels: this.weekLabels,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  ngOnInit() {
  }

  getData() {
    this.recordService.getAll().subscribe((res: any) => {
      this.data = res;
      this.periodData(this.period, this.data);
    })
  }

  numDaysBetween(d1: Date, d2: Date) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  periodData(period: Period, data?: any[]) {
    if (!data) return;
    let output: any[] = [];
    let current: number = 0;
    let lastDate: Date;
    let now: Date
    data.forEach(record => {
      let d: Date = new Date(record.date)
      switch(period) {
        case 'week':
          if (!lastDate || d.getDay() != lastDate.getDay()) current = 0;
          if (this.numDaysBetween(d, now) <= 7) current+=record.amount;
          break;
        case 'month':
          break;
        case 'year':
          break;
        case 'all':
          break;
        default: 
          return;
          break;
      }
    })
  }

}
