import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
  randID: string;
  @ViewChild('f') signupForm: NgForm;

  constructor(private route:ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) =>{
        this.randID = params['id'];
      });
  }

  onUpdatePass(){

    console.log(this.signupForm.value.userData.email);
    this.authService.updatePass(this.signupForm.value.userData.email, this.signupForm.value.userData.password, this.randID );

  }

}
