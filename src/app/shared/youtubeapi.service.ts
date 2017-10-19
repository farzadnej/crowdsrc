import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchService} from "../youtube/search.service";
import 'rxjs/Rx';
import {Result} from "./result.model";



@Injectable()
export class YoutubeapiService {


  rawResults;
  videoIds: string;
  filteredResults: any[];
  searchUrl = 'https://www.googleapis.com/youtube/v3/search';
  videoUrl = 'https://www.googleapis.com/youtube/v3/videos';
  params = {
    maxResults: '50',
    part: 'snippet',
    key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
    type: 'video',
    videoEmbeddable: 'true'
    //, q: this.searchTerm
  };
  paramsObj = new HttpParams().append('maxResults',this.params.maxResults).append('part', this.params.part).
  append('key',this.params.key).append('videoEmbeddable', this.params.videoEmbeddable).append('type', this.params.type);

  secondParamsObj = new HttpParams().append('part', 'contentDetails').append('key', this.params.key);

  constructor(private httpClient: HttpClient, private searchService: SearchService) { }

  //initialSearch(){

  //  const req = new HttpRequest('GET', 'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
  //  return this.httpClient.request(req);

  //}


  initialSearch(searchTerm,start, end) {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Result>(this.searchUrl, {
      observe: 'body',
      responseType: 'json',
      params: this.paramsObj.append('q',searchTerm)
    })
      .map(
        (results) => {
          console.log('unprocessed');
          console.log(results);
          //for (let recipe of recipes) {
          // if (!recipe['ingredients']) {
          //  recipe['ingredients'] = [];
          // }
          //}
          return results;
        }
      )
      .subscribe(
        (results: Result) => {
          this.rawResults = results;
          this.durationFilter(start, end,results);
        }
      );
  }



  durationFilter(start: number, end: number, results: Result) {
    this.videoIds = '';
    for (let res of results.items) {
      this.videoIds += res['id']['videoId'] + ',';
    }
    this.videoIds = this.videoIds.slice(0,-1);
    console.log(this.videoIds);
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Result>(this.videoUrl, {
      observe: 'body',
      responseType: 'json',
      params: this.secondParamsObj.append('id', this.videoIds)
    })
      .map(
        (results) => {
          results.items.forEach((res, index) => {
            res['snippet'] = this.rawResults.items[index]['snippet'];
          });

          //for (let [indexss, res] of results['items'].entries() ) {
          //  console.log(indexss);
            //res['snippet'] = this.rawResults.items[0]['snippet'];
          //}


          return results;
        }
      )
      .subscribe(
        (results: Result) => {
          results = this.filterResults(start, end, results);
          this.searchService.setResults(results);

        }
      );
  }

  filterResults(start: number, end: number, results){
    this.filteredResults = [];

    for (let res of results.items) {
      //length = res['contentDetails']['duration'].slice(2,res['contentDetails']['duration'].indexOf('M'));
      let length = this.convertTime(res['contentDetails']['duration']);
      if (start < length && length < end){

        this.filteredResults.push(res);
      }

    }

    results['items'] = this.filteredResults;
    results['pageInfo']['totalResults'] = this.filteredResults.length;
    console.log("duration");
    console.log(results);
    return results

  }

  convertTime(duration) {

    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
      a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
      a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
      a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
      duration = duration + parseInt(a[0]);
    }
    return duration
  }


}
