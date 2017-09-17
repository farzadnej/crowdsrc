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

  lag: number = 0;
  plan;
  timerObj;
  paused = false;

  constructor(private route: ActivatedRoute, private router: Router, private backendService: BackendService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = params['id'] + '?enablejsapi=1&rel=0&controls=0&showinfo=0';
        this.source = this.EMBEDURL + params['id'] + '?enablejsapi=1&rel=0';
        console.log(this.source);
      }
    );
    this.plan = this.backendService.getPlan();
  }

  savePlayer (player) {
    this.player = player;
    //this.player.setOption({
    //  height: '390',
    //  width: '640',
    //  videoId: 'M7lc1UVf-VE'
    // });
    this.player.playVideo();
    console.log('player instance', player);
    setTimeout(()=>{
      this.freeze();
    },3000);
    setTimeout(()=>{
      this.unfreeze();
    },7000);

    setTimeout(()=>{
      this.freeze();
    },15000);

    setTimeout(()=>{
      this.unfreeze();
    },23000);

    setTimeout(()=>{
      this.freeze();
    },32000);




    setTimeout(()=>{
      this.router.navigate(['/demographic']);
    },12000);


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


}
