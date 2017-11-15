import { Injectable } from '@angular/core';
import {AppSettings} from "./app-settings";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class BackendService {
  phase: number = 1;
  //videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
  dataBuffer: any = {};
  date:any;
  dateInMs:any;

  constructor(private authService: AuthService) { }

  getVideoConfig(){
    let config: any = this.authService.getConfig();
    //let videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
    let videoConfig = config.find(x => x.seqNo === String(this.phase));
    return videoConfig
  }

  getPhase(){

    return this.phase
  }


  setNextVideoConfig(){

    this.phase += 1;
  }

  getImpairment(){
    let impairment = '';
    if (this.getVideoConfig().F1){
      impairment += this.getVideoConfig().F1 + ',';
    }
    if (this.getVideoConfig().D1){
      impairment += this.getVideoConfig().D1 + ',';
    }
    if (this.getVideoConfig().F2){
      impairment += this.getVideoConfig().F2 + ',';
    }
    if (this.getVideoConfig().D2){
      impairment += this.getVideoConfig().D2 + ',';
    }
    if (this.getVideoConfig().F3){
      impairment += this.getVideoConfig().F3 + ',';
    }
    if (this.getVideoConfig().D3){
      impairment += this.getVideoConfig().D3 + ',';
    }
    if (this.getVideoConfig().F4){
      impairment += this.getVideoConfig().F4 + ',';
    }
    if (this.getVideoConfig().D4){
      impairment += this.getVideoConfig().D4 + ',';
    }
    if (this.getVideoConfig().F5){
      impairment += this.getVideoConfig().F5 + ',';
    }
    if (this.getVideoConfig().D5){
      impairment += this.getVideoConfig().D5 + ',';
    }
    if (this.getVideoConfig().F6){
      impairment += this.getVideoConfig().F6 + ',';
    }
    if (this.getVideoConfig().D6){
      impairment += this.getVideoConfig().D6 + ',';
    }
    if (this.getVideoConfig().F7){
      impairment += this.getVideoConfig().F7 + ',';
    }
    if (this.getVideoConfig().D7){
      impairment += this.getVideoConfig().D7 + ',';
    }
    if (this.getVideoConfig().F8){
      impairment += this.getVideoConfig().F8 + ',';
    }
    if (this.getVideoConfig().D8){
      impairment += this.getVideoConfig().D8 + ',';
    }
    if (this.getVideoConfig().F9){
      impairment += this.getVideoConfig().F9 + ',';
    }
    if (this.getVideoConfig().D9){
      impairment += this.getVideoConfig().D9 + ',';
    }
    if (this.getVideoConfig().F10){
      impairment += this.getVideoConfig().F10 + ',';
    }
    if (this.getVideoConfig().D10){
      impairment += this.getVideoConfig().D10 + ',';
    }
    if (impairment){
      impairment = impairment.slice(0,-1);
    }
    console.log("impairment", impairment);
    return impairment
  }
  getSearchFilterDuration(){

    return {"min" : + this.getVideoConfig().min * 60, "max" : + this.getVideoConfig().max * 60}
  }

  getVideoState(){
    return this.getVideoConfig().videoState
  }
  getRetainability(){
    return (+ this.getVideoConfig().R) * 1000
  }
  getQuestions(){
    return {"videoQ" : this.getVideoConfig().videoQuestionaire, "blockQ" : this.getVideoConfig().blockQuestionaire, "sessionQ" : this.getVideoConfig().sessionQuestionaire}
  }

  updateBuffer(newData){
    this.dataBuffer = { ...this.dataBuffer, ...newData };
    console.log(this.dataBuffer);
  }
  getBuffer(){
    return this.dataBuffer
  }
  
  startTimer(){
    this.dateInMs = Date.now();
    console.log('date', this.dateInMs)
  }
  getTimer(){
    let now = Date.now();
    return String(now - this.dateInMs)
  }

}
