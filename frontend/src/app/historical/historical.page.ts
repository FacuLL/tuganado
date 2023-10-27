import { Component, OnInit } from '@angular/core';
import { CowService } from '../services/cow.service';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  selectedCow?: string;
  records?: any[];

  cows?: any[];

  constructor(private cowService: CowService, private recordService: RecordService) { }

  ngOnInit() {
    this.getCows();
  }

  selectChange(event: any) {
    this.selectedCow = event.target.value;
    this.getRecords(event.target.value);
  }

  getRecords(caravana: string) {
    this.cowService.getCow(caravana).subscribe({
      next: (res) => {
        this.records = res.records.sort(function(a: any, b: any){
          return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteRecord() {

  }

  getCows() {
    this.cowService.getCows().subscribe({
      next: (res) => {
        this.cows = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  downloadData() {
    this.recordService.downloadData().subscribe((res: any) => {
      let now: Date = new Date();
      let binaryData = [];
      binaryData.push(res);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: "application/ms-excel"}));
      downloadLink.setAttribute('download', `tambo ${this.stringifyDate(now.toString())}.xlsx`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  stringifyDate(date: string) {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    return `${day}/${month}/${year}`
  }

}
