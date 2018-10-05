import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";
import {Result} from "../../shared/result.model";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.css']
})
export class YoutubeListComponent implements OnInit {

  results;
  notFound;
  justLoaded;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.results = [];
    this.notFound = false;
    this.justLoaded = true;
    this.searchService.resultsChanged.subscribe(
      (results: Result) => {
        this.justLoaded = false;

        console.log("subscription");
        console.log("farRes", results);
        if (results.items.length === 0){
          this.notFound = true;
        } else {
          this.notFound = false;
        }
        this.results = results.items;
        console.log(this.results);
      }
    );

    //this.results = this.searchService.getResults();
  }

}
