import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  @ViewChild('f') consentForm: NgForm;
  ready = false;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/demographic']);
  }
  evaluateReady(){
    this.ready = (this.consentForm.value.agreement === 'yes' && this.consentForm.value.agree !== '') ;
  }

}
