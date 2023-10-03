import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CowService } from '../services/cow.service';
import Cow from '../models/cow';

@Component({
  selector: 'app-new-cow',
  templateUrl: './new-cow.page.html',
  styleUrls: ['./new-cow.page.scss'],
})
export class NewCowPage implements OnInit {

  output: string = '';
  success: boolean = false;

  cowForm: FormGroup = this.formBuilder.group<Cow>({
    caravana: ''
  });

  registerCow() {
    this.cowService.registerCow(this.cowForm.value).subscribe({next: (res) => {
      this.output = 'Vaca creada correctamante';
      this.success = true;
    }, error: (err) => {
      console.log(err);
      this.output = err.error.message;
      this.success = false;
    }});
    this.cowForm.reset();
  }

  constructor(private formBuilder: FormBuilder, private cowService: CowService) { }

  ngOnInit() {
  }

}
