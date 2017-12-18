import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  resetPass(){
    this.authService.resetPass(this.signupForm.value.userData.email );
  }

}
