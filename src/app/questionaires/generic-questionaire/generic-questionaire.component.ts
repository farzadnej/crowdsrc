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
  selector: 'app-generic-questionaire',
  templateUrl: './generic-questionaire.component.html',
  styleUrls: ['./generic-questionaire.component.css']
})
export class GenericQuestionaireComponent implements OnInit {
  questions: any;
  qType: String;
  currentUrl: String;
  nextUrl: String;
  @ViewChild('f') signupForm: NgForm;
  //paramsObj = new HttpParams();

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService, private backendService: BackendService) { }

  ngOnInit() {
    [this.currentUrl, this.nextUrl] = this.backendService.getCurrentAndNextUrl();
    //this.nextUrl = this.backendService.getCurrentAndNextUrl()[1];
    console.log('currentUrl:', this.currentUrl,'nextUrl:', this.nextUrl);

    let questionTypes = this.backendService.getQuestions();
    console.log('questionTypes',questionTypes);
    if (this.currentUrl === 'videoQ') {
      this.qType = questionTypes.videoQ;
    } else if (this.currentUrl === 'blockQ') {
      this.qType = questionTypes.blockQ;
    } else if (this.currentUrl === 'sessionQ') {
      this.qType = questionTypes.sessionQ;
    }
    console.log('qType',this.qType);

    this.authService.getQuestionairesFromDatabase(this.qType).subscribe(
      (response: any) => {
        //console.log(response);
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
    let url = '';
    if (this.currentUrl === 'videoQ') {
      this.authService.updateRow({row: String(this.backendService.getPhase()), videoQduration: this.backendService.getTimer(),
        videoQ1:this.signupForm.value["1"] ? this.signupForm.value["1"]: "",
        videoQ2:this.signupForm.value["2"] ? this.signupForm.value["2"]: "",
        videoQ3:this.signupForm.value["3"] ? this.signupForm.value["3"]: "",
        videoQ4:this.signupForm.value["4"] ? this.signupForm.value["4"]: "",
        videoQ5:this.signupForm.value["5"] ? this.signupForm.value["5"]: "",
        videoQ6:this.signupForm.value["6"] ? this.signupForm.value["6"]: "",
        videoQ7:this.signupForm.value["7"] ? this.signupForm.value["7"]: "",
        videoQ8:this.signupForm.value["8"] ? this.signupForm.value["8"]: "",
        videoQ9:this.signupForm.value["9"] ? this.signupForm.value["9"]: "",
        videoQ10:this.signupForm.value["10"] ? this.signupForm.value["10"]: ""
      });
    } else if (this.currentUrl === 'blockQ') {
      this.authService.updateRow({row: String(this.backendService.getPhase()), blockQduration: this.backendService.getTimer(),
        blockQ1:this.signupForm.value["1"] ? this.signupForm.value["1"]: "",
        blockQ2:this.signupForm.value["2"] ? this.signupForm.value["2"]: "",
        blockQ3:this.signupForm.value["3"] ? this.signupForm.value["3"]: "",
        blockQ4:this.signupForm.value["4"] ? this.signupForm.value["4"]: "",
        blockQ5:this.signupForm.value["5"] ? this.signupForm.value["5"]: "",
        blockQ6:this.signupForm.value["6"] ? this.signupForm.value["6"]: "",
        blockQ7:this.signupForm.value["7"] ? this.signupForm.value["7"]: "",
        blockQ8:this.signupForm.value["8"] ? this.signupForm.value["8"]: "",
        blockQ9:this.signupForm.value["9"] ? this.signupForm.value["9"]: "",
        blockQ10:this.signupForm.value["10"] ? this.signupForm.value["10"]: ""
      });
    } else if (this.currentUrl === 'sessionQ') {
      this.authService.updateRow({row: String(this.backendService.getPhase()), sessionQduration: this.backendService.getTimer(),
        sessionQ1:this.signupForm.value["1"] ? this.signupForm.value["1"]: "",
        sessionQ2:this.signupForm.value["2"] ? this.signupForm.value["2"]: "",
        sessionQ3:this.signupForm.value["3"] ? this.signupForm.value["3"]: "",
        sessionQ4:this.signupForm.value["4"] ? this.signupForm.value["4"]: "",
        sessionQ5:this.signupForm.value["5"] ? this.signupForm.value["5"]: "",
        sessionQ6:this.signupForm.value["6"] ? this.signupForm.value["6"]: "",
        sessionQ7:this.signupForm.value["7"] ? this.signupForm.value["7"]: "",
        sessionQ8:this.signupForm.value["8"] ? this.signupForm.value["8"]: "",
        sessionQ9:this.signupForm.value["9"] ? this.signupForm.value["9"]: "",
        sessionQ10:this.signupForm.value["10"] ? this.signupForm.value["10"]: ""
      });
    }


    if (this.nextUrl === '/youtube' || this.nextUrl === '/session-end') {
      this.backendService.setNextVideoConfig();
      console.log('setNextConfig')
    }
    this.router.navigate([this.nextUrl]);
    console.log('router');

  }

}
