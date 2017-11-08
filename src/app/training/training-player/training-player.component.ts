import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TrainingService} from "../training.service"


@Component({
  selector: 'app-training-player',
  templateUrl: './training-player.component.html',
  styleUrls: ['./training-player.component.css']
})
export class TrainingPlayerComponent implements OnInit {
  EMBEDURL: string = 'https://www.youtube.com/embed/';
  source: string;

  player: YT.Player;
  id: string;

  delay = 0;
  paused = false;
  networkFailed = false;
  impairment = "";
  videoState = '';
  conf: any;
  retainability: number;
  isA = false;
  isR = false;
  isN = false;
  isI = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private TrainingService: TrainingService) {
  }

  ngOnInit() {
    this.conf = this.TrainingService.getConf();
    this.id = this.conf.id + '?enablejsapi=1&rel=0&controls=0&showinfo=0';
    this.source = this.EMBEDURL + this.conf.id + '?enablejsapi=1&rel=0';
    this.videoState = this.conf.videoState;
    this.impairment = this.conf.impairment;
    this.retainability = (+this.conf.retainability) * 1000;
    this.showHelpMessage();


  }


  savePlayer(player) {
    this.player = player;
    //this.player.setOption({
    //  height: '390',
    //  width: '640',
    //  videoId: 'M7lc1UVf-VE'
    // });
    //for logging purposes

    //this.authService.updateRow({row: String(this.backendService.getPhase()), videoUrl: String (this.player.getVideoUrl()), videoDuration: String (this.player.getDuration())});


    this.player.playVideo();
    let videoDuration = 1000 * (player.getDuration());

    if (this.videoState === 'A') {
      this.freeze();
      this.showFailureMessage(10000);
      this.navigate(20000);
    } else {

      let splitted = this.impairment.split(",");
      let start = 0;
      console.log('splitted len', splitted);
      if (splitted.length != 1) {

        for (let i = 0; i < splitted.length && start < videoDuration; i += 2) {
          let freeze = (+splitted[i]) * 1000;
          let duration = ( +splitted[i + 1]) * 1000;
          let start = freeze + this.delay;
          console.log('del1', this.delay);
          setTimeout(() => {
            this.freeze();
          }, start);
          setTimeout(() => {
            this.unfreeze();
          }, start + duration);
          this.delay += duration;
          console.log('del2', this.delay);


          console.log(freeze);
          console.log(duration);
        }

      }

      if (this.videoState === 'I') {
        this.navigate(this.delay + videoDuration);
        console.log('del3', this.delay);
      }
      else if (this.videoState === 'R') {
        setTimeout(() => {
          this.freeze();
        }, this.retainability + this.delay);
        console.log('del4', this.delay);
        console.log('chera', this.retainability, this.delay);
        this.showFailureMessage(this.retainability + this.delay + 15000);
        this.navigate(this.retainability + this.delay + 25000);
        console.log('del5', this.delay);

      }

    }
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  freeze() {
    this.player.pauseVideo();
    this.paused = true;
  }

  unfreeze() {
    this.player.playVideo();
    this.paused = false;
  }

  navigate(when) {

    let url = '/training/rate';
    setTimeout(() => {
      this.router.navigate([url]);
    }, when);
  }

  showFailureMessage(when) {
    setTimeout(() => {
      this.paused = false;
      this.networkFailed = true;
    }, when);

  }

  showHelpMessage() {
    if (this.videoState === 'I') {
      this.isI = true;
    }
    else if (this.videoState === 'R') {
      this.isR = true;
    }
    else if (this.videoState === 'A') {
      this.isA = true;
    }
    else {
      this.isN = true;
    }


  }
}

