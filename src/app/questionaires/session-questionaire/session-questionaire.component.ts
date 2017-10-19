import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {BackendService} from "../../shared/backend.service";

@Component({
  selector: 'app-session-questionaire',
  templateUrl: './session-questionaire.component.html',
  styleUrls: ['./session-questionaire.component.css']
})
export class SessionQuestionaireComponent implements OnInit {

  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.router.navigate(['/session-end']);
    this.backendService.setNextVideoConfig();
  }

}
