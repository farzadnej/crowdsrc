import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { YoutubeSearchComponent } from './youtube/youtube-search/youtube-search.component';
import { YoutubeListComponent } from './youtube/youtube-list/youtube-list.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {SearchService} from "./youtube/search.service";
import {YoutubeapiService} from "./shared/youtubeapi.service";
import { YoutubeItemComponent } from './youtube/youtube-list/youtube-item/youtube-item.component';
import { PlayerComponent } from './player/player.component';
import { SafePipe } from './player/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    YoutubeSearchComponent,
    YoutubeListComponent,
    YoutubeItemComponent,
    PlayerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SearchService, YoutubeapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
