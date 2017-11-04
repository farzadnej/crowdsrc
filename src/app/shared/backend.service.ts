import { Injectable } from '@angular/core';
import {AppSettings} from "./app-settings";

@Injectable()
export class BackendService {
  phase: number = 0;
  //videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
  dataBuffer: any = {};

  constructor() { }

  getVideoConfig(){
    let videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
    return videoConfig
  }

  getPhase(){

    return this.phase
  }


  setNextVideoConfig(){

    this.phase += 1;
  }

  getImpairment(){
    return this.getVideoConfig().impairment
  }
  getSearchFilterDuration(){

    return {"min" : + this.getVideoConfig().min, "max" : + this.getVideoConfig().max}
  }

  getVideoState(){
    return this.getVideoConfig().videoState
  }
  getRetainability(){
    return (+ this.getVideoConfig().retainability) * 1000
  }
  getQuestions(){
    return {"videoQ" : this.getVideoConfig().videoQ, "blockQ" : this.getVideoConfig().blockQ, "sessionQ" : this.getVideoConfig().sessionQ}
  }

  updateBuffer(newData){
    this.dataBuffer = { ...this.dataBuffer, ...newData };
    console.log(this.dataBuffer);
  }
  getBuffer(){
    return this.dataBuffer
  }

}
