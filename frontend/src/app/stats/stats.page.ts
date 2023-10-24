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

  weekLabels = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
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
      // We use this empty structure as a placeholder for dynamic theming
      y: {
        position: 'left',
        beginAtZero: true
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  ngOnInit() {
    this.getData();
  }

  changePeriod() {
    console.log(this.period);
    
    
  }

  getData() {
    this.recordService.getAll().subscribe((res: any) => {
      this.data = res;
      console.log(this.periodData(this.period, this.data));
      let results = this.periodData(this.period, this.data);
      this.lineChartData.datasets[0].data = results.data;
      this.lineChartData.labels = results.labels;
    })
  }

  numDaysBetween(d1: Date, d2: Date) {
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  numMonthBetween(d1: Date, d2: Date) {
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    d1.setDate(0);
    d2.setDate(0);
    return d2.getMonth() - d1.getMonth() + 
   (12 * (d2.getFullYear() - d1.getFullYear()))
  };

  periodData(period: Period, data?: any[]): {data: number[], labels: string[]} {
    if (!data) return {data: [], labels: []};
    data = data.sort(function(a,b){
      return (new Date(a.date).getTime()) - (new Date(b.date).getTime());
    });
    console.log(data);
    
    let current: number = 0;
    let last: Date | undefined;
    let output: number[] = [];
    let labels: string[] = [];
    let now: Date = new Date();
    switch(period) {
      case 'week':
        data.forEach(record => {
          let d: Date = new Date(record.date);
          if (last && this.numDaysBetween(d, last) != 0) {
            output.push(current);
            labels.push(this.weekLabels[last.getDay()]);
            current = 0;
          }
          if (this.numDaysBetween(d, now) <= 7){ 
            current+=record.amount;
            last = d;
          };
        });
        output.push(current);
        if (last)labels.push(this.weekLabels[last.getDay()]);
        break;
      case 'month':
        
        break;
      case 'year':
        data.forEach(record => {
          let d: Date = new Date(record.date);
          if (last && this.numMonthBetween(d, last) != 0) {
            output.push(current);
            labels.push(this.yearLabels[last.getDay()]);
            current = 0;
          }
          if (this.numMonthBetween(d, now) <= 7){ 
            current+=record.amount;
            last = d;
          };
        });
        output.push(current);
        if (last)labels.push(this.yearLabels[last.getDay()]);
        break;
      case 'all':
        break;
      default: 
        console.log("Incorrect period");
    }
    
    return {data: output, labels: labels};
  }

}
