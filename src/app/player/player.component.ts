import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BackendService} from "../shared/backend.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  EMBEDURL: string = 'https://www.youtube.com/embed/';
  source: string;

  player: YT.Player;
  id: string;

  delay = 0;
  paused = false;
  impairment:any;
  videoState: string;

  constructor(private route: ActivatedRoute, private router: Router, private backendService: BackendService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = params['id'] + '?enablejsapi=1&rel=0&controls=0&showinfo=0';
        this.source = this.EMBEDURL + params['id'] + '?enablejsapi=1&rel=0';
        console.log(this.source);
      }
    );
    //this.config = this.backendService.getConfig();
    //this.plan = this.backendService.getPhase();
    this.videoState = this.backendService.getVideoState();
    this.impairment = this.backendService.getImpairment();
    console.log("impair",this.impairment);
  }



  savePlayer (player) {
    console.log('del0',this.delay);
    this.player = player;
    //this.player.setOption({
    //  height: '390',
    //  width: '640',
    //  videoId: 'M7lc1UVf-VE'
    // });
    this.player.playVideo();
    let videoDuration = 1000 * (player.getDuration());
    console.log('vid dur', videoDuration);
    console.log('player instance', player);

    if (this.videoState === 'A') {
        this.freeze();
        this.navigate(20000);
    } else {

        let splitted = this.impairment.split(",");
        let start = 0;
         console.log('splitted len',splitted);
        if (splitted.length != 1){

          for (let i = 0; i < splitted.length && start < videoDuration; i += 2) {
            let freeze = (+ splitted[i]) * 1000;
            let duration = ( +splitted[i + 1]) * 1000;
            let start = freeze + this.delay;
            console.log('del1',this.delay);
            setTimeout(() => {
              this.freeze();
            }, start);
            setTimeout(()=> {
              this.unfreeze();
            }, start + duration);
            this.delay += duration;
            console.log('del2',this.delay);


            console.log(freeze);
            console.log(duration);
          }

        }
      if (this.videoState === 'I') {
          this.navigate(this.delay + videoDuration);
        console.log('del3',this.delay);
      }
      else if (this.videoState === 'R'){
          let retainability = this.backendService.getRetainability();
        setTimeout(() => {
          this.freeze();
        }, retainability + this.delay);
        console.log('del4',this.delay);
        console.log('chera', retainability, this.delay);
      this.navigate(retainability + this.delay + 15000);
        console.log('del5',this.delay);

    }

    }




  }
  onStateChange(event){
    console.log('player state', event.data);
  }

  freeze(){
    this.player.pauseVideo();
    this.paused = true;
  }

  unfreeze(){
    this.player.playVideo();
    this.paused = false;
  }

  navigate(when){
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.videoQ === "true") {
      url = '/video-questionaire';
    } else if (questions.blockQ === 'true') {
      url = '/block-questionaire';
    } else if (questions.sessionQ === "true") {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.backendService.setNextVideoConfig();
    }

    setTimeout(()=>{
      this.router.navigate([url]);
    }, when);
  }


}
