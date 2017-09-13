import { Injectable } from '@angular/core';

@Injectable()
export class BackendService {

  constructor() { }

  getPlan(){

    return [3,5,8,2,12,3]
  }

}
