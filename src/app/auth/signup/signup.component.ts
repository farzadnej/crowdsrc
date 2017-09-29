import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(){

    console.log(this.signupForm.value.userData.email);
    this.authService.signup(this.signupForm.value.userData.email, this.signupForm.value.userData.password);

  }

}
