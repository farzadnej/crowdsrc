import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/youtube']);
  }

}

