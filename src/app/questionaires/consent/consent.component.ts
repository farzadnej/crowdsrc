import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/demographic']);
  }

}
