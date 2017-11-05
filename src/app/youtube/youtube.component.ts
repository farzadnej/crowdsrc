import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onAddRow(){

    this.authService.getConfig();
    //this.router.navigate(['/demographic']);
  }

}
