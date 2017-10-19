import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../shared/backend.service";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit() {
  }

  onSubmit(){
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.sessionQ === "true") {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);

  }

}

