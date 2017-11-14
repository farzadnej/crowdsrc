import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {BackendService} from "../shared/backend.service";


@Injectable()
export class AuthService {
  signupUrl = 'http://localhost:3000/api/signup';
  signinUrl = 'http://localhost:3000/api/signin';
  updateUrl = 'http://localhost:3000/api/update';
  configUrl = 'http://localhost:3000/api/config';
  token: string;
  config: any;

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
            this.router.navigate(['/demographic']);
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
  }

  getConfig(){
    return this.config
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


}







