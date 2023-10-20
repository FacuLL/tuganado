import { Component, OnInit } from '@angular/core';
import { CowService } from '../services/cow.service';
import { RecordService } from '../services/record.service';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  selectedCow?: string;
  records?: any[];

  cows?: any[];

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private cowService: CowService, private recordService: RecordService, private transfer: FileTransfer) {}

  ngOnInit() {
    this.getCows();
  }

  selectChange(event: any) {
    this.getRecords(event.target.value);
  }

  getRecords(caravana: string) {
    this.cowService.getCow(caravana).subscribe({
      next: (res) => {
        this.records = res.records;
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  stringifyDate(date: string) {
    let d = new Date(date);
    let day = d.getDate()+1;
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    return `${day}/${month}/${year}`
  }


  loadingData: boolean = false;
  downloadData() {
    this.loadingData = true;
    this.fileTransfer.download(this.recordService.downloadDataURL(), 'file.xslx').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.loadingData = false;
    }, (error) => {
      console.log(error);
    });
  }

}
