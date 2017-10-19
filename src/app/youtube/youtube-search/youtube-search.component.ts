import { Component, OnInit } from '@angular/core';
import {YoutubeapiService} from "../../shared/youtubeapi.service";
import {BackendService} from "../../shared/backend.service";

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  searchTerm: string;
  min: number;
  max: number;

  constructor(private youtubeapiService: YoutubeapiService, private backendService: BackendService) { }

  ngOnInit() {
    this.searchTerm = '';
  }

  OnSearch(){
    console.log(this.searchTerm);
    this.min = this.backendService.getSearchFilterDuration().min;
    this.max = this.backendService.getSearchFilterDuration().max;
    this.youtubeapiService.initialSearch(this.searchTerm, this.min, this.max);
    //this.youtubeapiService.durationFilter(3,10);
  }



}
