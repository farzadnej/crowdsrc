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

import { YoutubePlayerModule } from 'ng2-youtube-player';
import {BackendService} from "./shared/backend.service";
import { ConsentComponent } from './questionaires/consent/consent.component';
import { HeaderComponent } from './header/header.component';
import { LogosComponent } from './header/logos/logos.component';
import { LoginComponent } from './header/login/login.component';
import { BlockComponent } from './questionaires/block/block.component';
import { YoutubeHeaderComponent } from './youtube/youtube-header/youtube-header.component';
import { VideoQuestionaireComponent } from './questionaires/video-questionaire/video-questionaire.component';
import { DemographicComponent } from './questionaires/demographic/demographic.component';
import {AuthGuard} from "./auth/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    YoutubeSearchComponent,
    YoutubeListComponent,
    YoutubeItemComponent,
    PlayerComponent,
    SafePipe,
    ConsentComponent,
    HeaderComponent,
    LogosComponent,
    LoginComponent,
    BlockComponent,
    YoutubeHeaderComponent,
    VideoQuestionaireComponent,
    DemographicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    YoutubePlayerModule
  ],
  providers: [
    SearchService,
    YoutubeapiService,
    BackendService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
