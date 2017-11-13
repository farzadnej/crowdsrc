import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  number = 0;

  trainingConf = [
    {
      "number":"0",
      "id": "U_6BRY50Zmc",
      "videoState":"R",
      "retainability": "40",
      "impairment": ""
    },
    {
      "number":"1",
      "id": "sV2t3tW_JTQ",
      "videoState":"A",
      "retainability": "",
      "impairment": ""
    },
    {
      "number":"2",
      "id": "q3oiWDkjzOw",
      "videoState":"I",
      "retainability": "",
      "impairment": "3,5,15,2,20,7"
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
