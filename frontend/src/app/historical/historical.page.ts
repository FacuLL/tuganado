import { Component, OnInit } from '@angular/core';
import { CowService } from '../services/cow.service';
import { RecordService } from '../services/record.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  selectedCow?: string;

  cows?: any[];

  constructor(private cowService: CowService, private recordService: RecordService) { }

  ngOnInit() {
    this.getCows();
  }

  async getCows() {
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
      let dataType = res.type;
      let binaryData = [];
      binaryData.push(res);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: "application/ms-excel"}));
      downloadLink.setAttribute('download', 'datos.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

}
