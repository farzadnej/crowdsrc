import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { YoutubeComponent } from './youtube/youtube.component';
import { YoutubeSearchComponent } from './youtube/youtube-search/youtube-search.component';
import { YoutubeListComponent } from './youtube/youtube-list/youtube-list.component';
import {AuthGuard} from "./auth/auth.guard";
import {PlayerComponent} from "./player/player.component";
import {ConsentComponent} from "./questionaires/consent/consent.component"
import {BlockComponent} from "./questionaires/block/block.component"
import {VideoQuestionaireComponent} from "./questionaires/video-questionaire/video-questionaire.component"
import {DemographicComponent} from "./questionaires/demographic/demographic.component"
import {SignupComponent} from "./auth/signup/signup.component"
import {SigninComponent} from "./auth/signin/signin.component"

const appRoutes: Routes = [
  { path: '', redirectTo: '/youtube', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'player/:id', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'consent', component: ConsentComponent },
  { path: 'block', component: BlockComponent, canActivate: [AuthGuard] },
  { path: 'video-questionaire', component: VideoQuestionaireComponent, canActivate:[AuthGuard]},
  { path: 'demographic', component: DemographicComponent},
  { path: 'youtube', component: YoutubeComponent, canActivate: [AuthGuard] ,children: [
    //{ path: '', component: YoutubeComponent },
    { path: 'new', component: YoutubeComponent },
    { path: ':id', component: YoutubeComponent },
    { path: ':id/edit', component: YoutubeComponent },
  ] },
  { path: 'shopping-list', component: YoutubeComponent },
  { path: 'signup', component: YoutubeComponent },
  { path: 'signin', component: YoutubeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

