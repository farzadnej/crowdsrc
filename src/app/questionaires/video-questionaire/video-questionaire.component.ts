import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../shared/backend.service";

@Component({
  selector: 'app-video-questionaire',
  templateUrl: './video-questionaire.component.html',
  styleUrls: ['./video-questionaire.component.css']
})
export class VideoQuestionaireComponent implements OnInit {

  constructor(private router:Router, private backendService: BackendService) { }

  ngOnInit() {
  }

  onSubmit(){
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.blockQ === "true") {
      url = '/block-questionaire';
    } else if (questions.sessionQ === 'true') {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);
  }

}
