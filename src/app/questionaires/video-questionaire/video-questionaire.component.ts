import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../shared/backend.service";
import {NgForm} from "@angular/forms"
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-video-questionaire',
  templateUrl: './video-questionaire.component.html',
  styleUrls: ['./video-questionaire.component.css']
})
export class VideoQuestionaireComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private router:Router, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
    this.backendService.startTimer();
  }

  onSubmit(){
    this.authService.updateRow({row: String(this.backendService.getPhase()), q300Duration: this.backendService.getTimer(),q300Quality:this.signupForm.value.quality,
      q300Acceptibility:this.signupForm.value.acceptibility,q300Compare:this.signupForm.value.prev});
    /*this.backendService.updateBuffer({vidQuality:this.signupForm.value.quality,
      vidAcceptibility:this.signupForm.value.acceptibility,vidCompare:this.signupForm.value.prev}); */
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.blockQ === "Q200") {
      url = '/block-questionaire';
    } else if (questions.sessionQ === 'Q100') {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      //this.authService.updateRow(this.backendService.getBuffer());
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);

    //console.log(this.signupForm.value.quality);
  }


}
