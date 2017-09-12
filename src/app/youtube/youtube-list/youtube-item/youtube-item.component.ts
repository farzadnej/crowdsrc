import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-youtube-item',
  templateUrl: './youtube-item.component.html',
  styleUrls: ['./youtube-item.component.css']
})
export class YoutubeItemComponent implements OnInit {
  @Input() result;
  @Input() index: number;
  link: string;

  constructor() { }

  ngOnInit() {
    this.link = '/player/' + this.result.id;
  }

}
