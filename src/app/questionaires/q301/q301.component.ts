import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import {BackendService} from "../../shared/backend.service"
import {AuthService} from "../../auth/auth.service"
import {NgForm} from "@angular/forms"

@Component({
  selector: 'app-q301',
  templateUrl: './q301.component.html',
  styleUrls: ['./q301.component.css']
})
export class Q301Component implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private router:Router, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.backendService.updateBuffer({vidQuality:this.signupForm.value.quality,
      vidAcceptibility:this.signupForm.value.acceptibility,vidCompare:this.signupForm.value.prev});
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.blockQ === "Q200") {
      url = '/block-questionaire';
    } else if (questions.sessionQ === 'Q100') {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.authService.updateRow(this.backendService.getBuffer());
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);

    //console.log(this.signupForm.value.quality);
  }

}
