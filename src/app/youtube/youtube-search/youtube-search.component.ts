import { Component, OnInit } from '@angular/core';
import {YoutubeapiService} from "../../shared/youtubeapi.service";

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  searchTerm: string;

  constructor(private youtubeapiService: YoutubeapiService) { }

  ngOnInit() {
    this.searchTerm = '';
  }

  OnSearch(){
    console.log(this.searchTerm);
    this.youtubeapiService.initialSearch(this.searchTerm);
    //this.youtubeapiService.durationFilter(3,10);
  }



}
