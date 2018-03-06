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
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from "./auth/auth.service";
import { SessionQuestionaireComponent } from './questionaires/session-questionaire/session-questionaire.component';
import { SessionEndComponent } from './questionaires/session-end/session-end.component';
import { ConfigComponent } from './admin/config/config.component';
import { StatsComponent } from './admin/stats/stats.component';
import { AdminComponent } from './admin/admin.component';
import { InstructionsComponent } from './training/instructions/instructions.component';
import { TrainingComponent } from './training/training.component';
import { SecondInstructionComponent } from './training/second-instruction/second-instruction.component';
import { TrainingPlayerComponent } from './training/training-player/training-player.component';
import {TrainingService} from "./training/training.service";
import { RateTrainingComponent } from './training/rate-training/rate-training.component';
import { Q301Component } from './questionaires/q301/q301.component';
import {VisibilityService} from "./shared/visibility.service";
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordUpdateComponent } from './auth/password-update/password-update.component';
import { PassUpdateSuccessComponent } from './auth/pass-update-success/pass-update-success.component';
import { PassResetMessageComponent } from './auth/pass-reset-message/pass-reset-message.component';
import { GenericQuestionaireComponent } from './questionaires/generic-questionaire/generic-questionaire.component';



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
    DemographicComponent,
    SignupComponent,
    SigninComponent,
    SessionQuestionaireComponent,
    SessionEndComponent,
    ConfigComponent,
    StatsComponent,
    AdminComponent,
    InstructionsComponent,
    TrainingComponent,
    SecondInstructionComponent,
    TrainingPlayerComponent,
    RateTrainingComponent,
    Q301Component,
    PasswordResetComponent,
    PasswordUpdateComponent,
    PassUpdateSuccessComponent,
    PassResetMessageComponent,
    GenericQuestionaireComponent
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
    AuthGuard,
    AuthService,
    TrainingService,
    VisibilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
