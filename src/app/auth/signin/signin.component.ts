import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(){

    console.log(this.signinForm.value.userData.email);
    this.authService.signin(this.signinForm.value.userData.email, this.signinForm.value.userData.password);

  }

    onRead(){

      this.authService.readsth();
      //this.router.navigate(['/demographic']);
    }
}