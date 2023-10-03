import { Component, OnInit } from '@angular/core';
import { CowService } from '../services/cow.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  selectedCow?: string;

  cows?: any[];

  constructor(private cowService: CowService) { }

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

  downloadData() {}

}
