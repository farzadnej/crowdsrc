import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {BackendService} from "../shared/backend.service";


@Injectable()
export class AuthService {
  signupUrl = '/api/signup';
  signinUrl = '/api/signin';
  passUpdateUrl = '/api/updatepass';
  resetPassUrl = '/api/resetpass';
  updateUrl = '/api/update';
  configUrl = '/api/config';
  phaseUpdateUrl = '/api/updatePhase';
  getPhaseUrl = '/api/getPhase';
  qustionaireUrl = '/api/questionaire';
  sendSessionEmailUrl = '/api/sendSessionEmail';
  token: string;
  config: any;
  phaseFromDatabase: number;
  ip = '';
  time= '';
  questionaires: any;
  signinError = '';
  passResetError = '';
  signupError = '';

  paramsObj = new HttpParams();

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  signup(username, password) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {username: username, password: password};
    this.httpClient.post<any>(this.signupUrl, postBody)
      .map(
        (results) => {
          console.log(results);
          return results;
        }
      )
      .subscribe(
        (result: any) => {
          if (result.success){
            console.log(result);
            this.firstSignIn(username, password);
            this.signupError = '';
            this.router.navigate(['/demographic']);
          } else if (!result.success){
            this.signupError = result.msg;
          }

        }
      );
  }

  updatePass(username, password, randID) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {username: username, password: password, randID: randID};
    this.httpClient.post<any>(this.passUpdateUrl, postBody)
      .subscribe(
        (result: any) => {
          if (result.success){
            console.log(result);
            this.router.navigate(['/pass-update-success']);
          }

        }
      );
  }


  resetPass(username) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {username: username};
    this.httpClient.post<any>(this.resetPassUrl, postBody)
      .subscribe(
        (result: any) => {
          if (result.success){
            console.log(result);
            this.passResetError = '';
            this.router.navigate(['/pass-reset-message']);
          } else if (!result.success){
           this.passResetError = result.msg;
          }


        }
      );
  }

  signin(username, password) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {username: username, password: password};
    this.httpClient.post<any>(this.signinUrl, postBody)
      .subscribe(
        (response: any) => {
          if (response.token) {
            this.signinError = '';
            this.token = response.token;
            this.getConfigfromDatabase();
            //this.backendService.updateBuffer({ip:response.ip});
            this.ip = response.ip;
            this.time = Date();
            this.determineRoute().subscribe(
              (response:any) => {
                if (response.startSessionQuestionaire === ''){
                  this.router.navigate(['/youtube']);
                } else {
                  this.router.navigate([ '/start-questionaire']);
                }

              }
            );
            console.log(response, this.signinError, 'if');
          }
          else {
            this.token = null;
          }
          console.log(response);
        },
        (err: any) => {
          this.signinError = err.error.msg;
          console.log(err.error);
        }
      );
  }

  signout() {
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }


  getConfigfromDatabase() {
    this.httpClient.get<any>(this.configUrl, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
      .map(
        (response) => {
          return response

        }
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.config = response.config;
        }
      );


    this.httpClient.get<any>(this.getPhaseUrl, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
      .subscribe(
        (response: any) => {
          console.log('phase',response);
          if (response.phase != null){
            this.phaseFromDatabase = +(response.phase);
          } else{
            this.phaseFromDatabase = 1;
          }

        }
      );


  }

  getConfig(){
    return this.config
  }

  getPhase(){
    return this.phaseFromDatabase
  }



  addRow(row: string){
    this.httpClient.post<any>(this.updateUrl, {statistics: {row:row}}, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
      .map(
        (response) => {
          return response

        }
      )
      .subscribe(
        (token: any) => {
          console.log(token);
        }
      );
  }


  updateRow(statistics:any){
    this.httpClient.post<any>(this.updateUrl, {statistics: statistics}, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
      .map(
        (response) => {
          return response

        }
      )
      .subscribe(
        (token: any) => {
          console.log(token);
        }
      );
  }

  getIP(){
    return this.ip
  }
  getTime(){
    return this.time
  }



  firstSignIn(username, password) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {username: username, password: password};
    this.httpClient.post<any>(this.signinUrl, postBody)
      .subscribe(
        (response: any) => {
          if (response.token) {
            this.token = response.token;
            this.getConfigfromDatabase();
            //this.backendService.updateBuffer({ip:response.ip});
            this.ip = response.ip;
            this.time = Date();
          }
          else {
            this.token = null;
          }
          console.log(response);
        }
      );
  }


  updateDatabasePhase(phase, sessionTime) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {phase: String(phase), sessionTime: sessionTime};
    return this.httpClient.post<any>(this.phaseUpdateUrl, postBody, {
        headers: new HttpHeaders().set('Authorization', this.token),
      });
  }

  sendSessionEmail() {
    let postBody = {};
    this.httpClient.post<any>(this.sendSessionEmailUrl, postBody, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
  }

  getQuestionairesFromDatabase(qType) {

    let paramsObj = new HttpParams().append('qType', qType);
     return this.httpClient.get<any>(this.qustionaireUrl, {
      observe: 'body',
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization', this.token),
      params: paramsObj
    })
      .map(
        (response) => {
          return response

        }
      );


  }

  determineRoute(){
    return this.httpClient.get<any>(this.configUrl, {
      headers: new HttpHeaders().set('Authorization', this.token),
    })

  }


}







