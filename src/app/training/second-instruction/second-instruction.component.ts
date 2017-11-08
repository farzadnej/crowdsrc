import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-second-instruction',
  templateUrl: './second-instruction.component.html',
  styleUrls: ['./second-instruction.component.css']
})
export class SecondInstructionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/training/player']);
  }

}
