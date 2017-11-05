import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../shared/backend.service";
import {AuthService} from "../../auth/auth.service";
import {NgForm} from "@angular/forms"

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private router: Router, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.backendService.updateBuffer({blockQuality:this.signupForm.value.quality,
      blockAcceptibility:this.signupForm.value.acceptibility});
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.sessionQ === "Q100") {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.authService.updateRow(this.backendService.getBuffer());
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);

  }

}

