import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  number = 0;

  trainingConf = [
    {
      "number":"0",
      "id": "8majjGwwDZY",
      "videoState":"R",
      "retainability": "40",
      "impairment": ""
    },
    {
      "number":"1",
      "id": "I2lQ_gFO3I0",
      "videoState":"A",
      "retainability": "",
      "impairment": ""
    },
    {
      "number":"2",
      "id": "09blOf3HEGw",
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
