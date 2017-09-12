import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";
import {Result} from "../../shared/result.model";

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.css']
})
export class YoutubeListComponent implements OnInit {

  results;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.resultsChanged.subscribe(
      (results: Result) => {

        console.log("subscription");
        this.results = results.items;
        console.log(this.results);
      }
    );

    this.results = this.searchService.getResults();
  }

}
