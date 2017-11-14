import { Component, OnInit } from '@angular/core';
import {YoutubeapiService} from "../../shared/youtubeapi.service";
import {BackendService} from "../../shared/backend.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  searchTerm: string;
  min: number;
  max: number;

  constructor(private youtubeapiService: YoutubeapiService, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {
    this.searchTerm = '';
    this.authService.addRow(String(this.backendService.getPhase()));
  }

  OnSearch(){
    console.log(this.searchTerm);
    this.min = this.backendService.getSearchFilterDuration().min;
    this.max = this.backendService.getSearchFilterDuration().max;
    this.youtubeapiService.initialSearch(this.searchTerm, this.min, this.max);
    //this.youtubeapiService.durationFilter(3,10);

    this.authService.updateRow({row: String(this.backendService.getPhase()), searchTerm: this.searchTerm});
    //this.backendService.updateBuffer({row: String(this.backendService.getPhase()), searchTerm: this.searchTerm});
  }



}
