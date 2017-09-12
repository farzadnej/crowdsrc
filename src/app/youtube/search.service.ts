import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Result} from "../shared/result.model";

@Injectable()
export class SearchService {

  private results: Result;
  resultsChanged = new Subject<Result>();

  constructor() { }

  setResults(results: Result) {
    this.results = results;
    this.resultsChanged.next(this.results);
  }

  getResults() {

    return this.results.items
  }
}
