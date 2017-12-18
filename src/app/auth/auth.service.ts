import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {BackendService} from "../shared/backend.service";


@Injectable()
export class AuthService {
  signupUrl = 'http://localhost:3000/api/signup';
  signinUrl = 'http://localhost:3000/api/signin';
  passUpdateUrl = 'http://localhost:3000/api/updatepass';
  resetPassUrl = 'http://localhost:3000/api/resetpass';
  updateUrl = 'http://localhost:3000/api/update';
  configUrl = 'http://localhost:3000/api/config';
  phaseUpdateUrl = 'http://localhost:3000/api/updatePhase';
  getPhaseUrl = 'http://localhost:3000/api/getPhase';
  token: string;
  config: any;
  phaseFromDatabase: number;
  ip = '';
  time= '';

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
            this.router.navigate(['/demographic']);
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
            this.router.navigate(['/pass-reset-message']);
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
            this.token = response.token;
            this.getConfigfromDatabase();
            //this.backendService.updateBuffer({ip:response.ip});
            this.ip = response.ip;
            this.time = Date();
            this.router.navigate(['/youtube']);
          }
          else {
            this.token = null;
          }
          console.log(response);
        }
      );
  }

  signout() {
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }


  getConfigfromDatabase(){
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


  updateDatabasePhase(phase) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    let postBody = {phase: String(phase)};
    this.httpClient.post<any>(this.phaseUpdateUrl, postBody, {
        headers: new HttpHeaders().set('Authorization', this.token),
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
  }


}







