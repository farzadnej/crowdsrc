import { Injectable } from '@angular/core';
import {AppSettings} from "./app-settings";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class BackendService {
  phase: number = -1;
  //videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
  dataBuffer: any = {};
  date:any;
  dateInMs:any;
  whatToLoad: String;
  whereToNavaigate: String;
  current = '';
  nextUrl: String;


  constructor(private authService: AuthService) {  }

  getVideoConfig(){
    let config: any = this.authService.getConfig();
    //let videoConfig = AppSettings.CONFIGURATION.find(x => x.number === String(this.phase));
    if (this.phase === -1){
      this.phase = this.authService.getPhase();
    }
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

  getstartQ(){
    return {"startQ" : this.getVideoConfig().startSessionQuestionaire}
  }


  getCurrentAndNextUrl(){
    if (this.getVideoConfig().videoQuestionaire && this.current === ''){
      this.current = "videoQ";
      return [this.current,'/video-questionaire']
    } else if (this.getVideoConfig().blockQuestionaire && this.current === '') {
      this.current = "blockQ";
      return [this.current,'/block-questionaire']
    } else if (this.getVideoConfig().sessionQuestionaire && this.current === '') {
      this.current = "sessionQ";
      return [this.current,'/session-questionaire']
    } else if ( this.current === 'videoQ' && this.getVideoConfig().blockQuestionaire) {
      this.current = "blockQ";
      return [this.current,'/block-questionaire']
    } else if ( this.current === 'videoQ' && this.getVideoConfig().sessionQuestionaire) {
      this.current = "sessionQ";
      return [this.current,'/session-questionaire']
    } else if ( this.current === 'blockQ' && this.getVideoConfig().sessionQuestionaire) {
      this.current = "sessionQ";
      return [this.current,'/session-questionaire']
    } else if ( this.current === 'sessionQ') {
      this.current = "";
      return [this.current,'/session-end']
    } else {
      this.current = "";
      return [this.current,'/youtube']
    }


  }



  getCurrentAndNextUrlLL(){
    if (this.getVideoConfig().videoQuestionaire && this.current === ''){
      this.current = "videoQ";
      if (this.getVideoConfig().blockQuestionaure){
        this.nextUrl = '/block-questionaire';
      } else if (this.getVideoConfig().sessionQuestionaure){
        this.nextUrl = '/session-questionaire';
      } else{
        this.nextUrl = '/youtube';
      }
      return [this.current, this.nextUrl]
    } else if (this.getVideoConfig().blockQuestionaire && this.current === '') {
      this.current = "blockQ";
      if (this.getVideoConfig().sessionQuestionaure){
        this.nextUrl = '/session-questionaire';
      } else{
        this.nextUrl = '/session-end';
      }
      return [this.current, this.nextUrl]
    } else if (this.getVideoConfig().sessionQuestionaire && this.current === '') {
      this.current = "sessionQ";
      this.nextUrl = '/session-end';
      return [this.current, this.nextUrl]
    } else if ( this.current === 'videoQ' && this.getVideoConfig().blockQuestionaire) {

      this.current = "blockQ";
      if (this.getVideoConfig().sessionQuestionaure){
        this.nextUrl = '/session-questionaire';
      } else{
        this.nextUrl = '/youtube';
      }
      return [this.current,this.nextUrl]
    } else if ( this.current === 'videoQ' && this.getVideoConfig().sessionQuestionaire) {
      this.current = "sessionQ";
      this.nextUrl = '/session-end';
      return [this.current, this.nextUrl]
    } else if ( this.current === 'blockQ' && this.getVideoConfig().sessionQuestionaire) {
      this.current = "sessionQ";
      this.nextUrl = '/session-end';
      return [this.current, this.nextUrl]
    } else {
      this.current = "";
      return [this.current,'/youtube']
    }


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

  getDetails(){
    return {"userID" : this.getVideoConfig().userID, "email" : this.getVideoConfig().email, "session" : this.getVideoConfig().session, "video" : this.getVideoConfig().video}
  }

}
