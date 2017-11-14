import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import {BackendService} from "../../shared/backend.service";
import {AuthService} from "../../auth/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-session-questionaire',
  templateUrl: './session-questionaire.component.html',
  styleUrls: ['./session-questionaire.component.css']
})
export class SessionQuestionaireComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private router: Router, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.updateRow({row: String(this.backendService.getPhase()), sessionQuality:this.signupForm.value.quality,
      sessionAcceptibility:this.signupForm.value.acceptibility});
    /*this.backendService.updateBuffer({sessionQuality:this.signupForm.value.quality,
      sessionAcceptibility:this.signupForm.value.acceptibility}); */
    //this.authService.updateRow(this.backendService.getBuffer());
    this.router.navigate(['/session-end']);
    this.backendService.setNextVideoConfig();
  }

}
