import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TrainingService} from "../training.service";

@Component({
  selector: 'app-rate-training',
  templateUrl: './rate-training.component.html',
  styleUrls: ['./rate-training.component.css']
})
export class RateTrainingComponent implements OnInit {

  constructor(private router:Router, private trainingService:TrainingService) { }

  ngOnInit() {
  }
  onSubmit(){
    let number = this.trainingService.getNumber();
    if (number === 3){
      this.router.navigate(['/start-questionaire']);
    } else {
      this.router.navigate(['/training/player']);
    }

  }

}
