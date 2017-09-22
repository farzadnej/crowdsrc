import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-questionaire',
  templateUrl: './video-questionaire.component.html',
  styleUrls: ['./video-questionaire.component.css']
})
export class VideoQuestionaireComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigate(['/block']);
  }

}
