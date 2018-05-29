import { Component, OnInit, ViewChild  } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import { Injectable } from '@angular/core';
import {NgForm} from "@angular/forms"
import {BackendService} from "../../shared/backend.service";

@Injectable()
@Component({
  selector: 'app-start-questionaire',
  templateUrl: './start-questionaire.component.html',
  styleUrls: ['./start-questionaire.component.css']
})
export class StartQuestionaireComponent implements OnInit {
  questions: any;
  qType: String;
  currentUrl: String;
  nextUrl: String;
  @ViewChild('f') signupForm: NgForm;
  //paramsObj = new HttpParams();

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService, private backendService: BackendService) { }

  ngOnInit() {
    this.qType = this.backendService.getVideoConfig().startSessionQuestionaire;
    if (this.qType === ''){
      this.router.navigate(['/youtube']);
    }
    this.authService.getQuestionairesFromDatabase(this.qType).subscribe(
      (response: any) => {
        this.questions = response.questionaires.sort(function(a, b){
          return a.qNumber - b.qNumber
        });
        console.log(this.questions);
      }
    );

    this.backendService.startTimer();

  }
  onSubmit(){
    //let questions = this.backendService.getQuestions();
      this.authService.updateRow({row: String(this.backendService.getPhase()), startQduration: this.backendService.getTimer(),
        startQ1:this.signupForm.value["1"] ? this.signupForm.value["1"]: "",
        startQ2:this.signupForm.value["2"] ? this.signupForm.value["2"]: "",
        startQ3:this.signupForm.value["3"] ? this.signupForm.value["3"]: "",
        startQ4:this.signupForm.value["4"] ? this.signupForm.value["4"]: "",
        startQ5:this.signupForm.value["5"] ? this.signupForm.value["5"]: "",
        startQ6:this.signupForm.value["6"] ? this.signupForm.value["6"]: "",
        startQ7:this.signupForm.value["7"] ? this.signupForm.value["7"]: "",
        startQ8:this.signupForm.value["8"] ? this.signupForm.value["8"]: "",
        startQ9:this.signupForm.value["9"] ? this.signupForm.value["9"]: "",
        startQ10:this.signupForm.value["10"] ? this.signupForm.value["10"]: ""
      });

    this.router.navigate(['/youtube']);

  }

}
