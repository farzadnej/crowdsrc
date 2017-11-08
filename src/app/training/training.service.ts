import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  number = 0;

  trainingConf = [
    {
      "number":"0",
      "id": "U_6BRY50Zmc",
      "videoState":"R",
      "retainability": "10",
      "impairment": ""
    },
    {
      "number":"1",
      "id": "q3oiWDkjzOw",
      "videoState":"I",
      "retainability": "",
      "impairment": "3,5,15,2,20,7"
    },
    {
      "number":"2",
      "id": "sV2t3tW_JTQ",
      "videoState":"A",
      "retainability": "",
      "impairment": ""
    }
  ];


  constructor() { }

  getConf(){
    let videoConfig = this.trainingConf.find(x => x.number === String(this.number));
    this.number += 1;
    return videoConfig
  }
  getNumber(){
    return this.number
  }

}
