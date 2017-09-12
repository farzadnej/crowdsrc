import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  EMBEDURL: string = 'https://www.youtube.com/embed/';
  source: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.source = this.EMBEDURL + params['id'] + '?enablejsapi=1&rel=0';
        console.log(this.source);
      }
    );
  }

}
