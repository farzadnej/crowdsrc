import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BackendService} from "../shared/backend.service";
import {AuthService} from "../auth/auth.service";
import {VisibilityService} from "../shared/visibility.service";

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
  networkFailed = false;
  nextVisible = false;
  nextTime = '';
  submitTime = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private backendService: BackendService, private authService: AuthService, private visibilityService:VisibilityService) { }

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
    this.visibilityService.checkVisibility(document);
  }



  savePlayer (player) {
    console.log('del0',this.delay);
    this.player = player;
    //this.player.setOption({
    //  height: '390',
    //  width: '640',
    //  videoId: 'M7lc1UVf-VE'
    // });
    //for logging purposes

    this.authService.updateRow({row: String(this.backendService.getPhase()), videoUrl: String (this.player.getVideoUrl()), videoDuration: String (this.player.getDuration())});
    /*this.backendService.updateBuffer({row: String(this.backendService.getPhase()), videoUrl: String (this.player.getVideoUrl()),
      videoDuration: String (this.player.getDuration())
      });
      */
      //,PlaybackQuality: String (this.player.getPlaybackQuality()),
      //AvailableQualityLevels: String (this.player.getAvailableQualityLevels())


    //this.authService.updateRow({row: String(this.backendService.getPhase()), videoDuration: String (this.player.getDuration())});
    //this.authService.updateRow({row: String(this.backendService.getPhase()), PlaybackQuality: String (this.player.getPlaybackQuality())});
    //this.authService.updateRow({row: String(this.backendService.getPhase()), AvailableQualityLevels: String (this.player.getAvailableQualityLevels())});


    this.player.playVideo();
    setTimeout(()=>{
      this.authService.updateRow({row: String(this.backendService.getPhase()), quality: this.player.getPlaybackQuality() });
      //console.log('quality', this.player.getPlaybackQuality());
    }, 15000);
    let videoDuration = 1000 * (player.getDuration());
    console.log('vid dur', videoDuration);
    console.log('player instance', player);

    if (this.videoState === 'A') {
        this.accessibilityFreeze();
        this.showFailureMessage(10000);
        this.showNext(20000);
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
          this.showNext(this.delay + videoDuration);
        console.log('del3',this.delay);
      }
      else if (this.videoState === 'R'){
          let retainability = this.backendService.getRetainability();
        setTimeout(() => {
          this.freeze();
        }, retainability + this.delay);
        console.log('del4',this.delay);
        console.log('chera', retainability, this.delay);
        this.showFailureMessage(retainability + this.delay + 15000);
      this.showNext(retainability + this.delay + 25000);
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

  accessibilityFreeze(){
    this.player.pauseVideo();
  }

  unfreeze(){
    this.player.playVideo();
    this.paused = false;
  }

  navigate(){
    this.submitTime = Date();
    this.authService.updateRow({row: String(this.backendService.getPhase()),
      nextTime: this.nextTime, submitTime: this.submitTime, focusedUser: this.visibilityService.wasUserFocused()});
    let questions = this.backendService.getQuestions();
    let url = '';
    if (questions.videoQ === "Q300") {
      url = '/video-questionaire';
    } else if (questions.videoQ === 'Q301') {
      url = '/q301';
    } else if (questions.blockQ === 'Q200') {
      url = '/block-questionaire';
    } else if (questions.sessionQ === "Q100") {
      url = '/session-questionaire';
    } else {
      url = '/youtube';
      this.backendService.setNextVideoConfig();
    }
    this.router.navigate([url]);

  }

  showFailureMessage(when) {
    setTimeout(() => {
      this.paused = false;
      this.networkFailed = true;
    }, when);

  }

  getBrightness(){
    if (this.networkFailed){
      return 'brightness(0%)'
    }
    else{
      return 'brightness(100%)'
    }

  }
  showNext(when){

    setTimeout(()=>{
      this.nextVisible = true;
      this.nextTime = Date();
    }, when);
  }


}
