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
import {SessionQuestionaireComponent} from "./questionaires/session-questionaire/session-questionaire.component"
import {SessionEndComponent} from "./questionaires/session-end/session-end.component"
import {ConfigComponent} from "./admin/config/config.component"
import {StatsComponent} from "./admin/stats/stats.component"
import {AdminComponent} from "./admin/admin.component"

const appRoutes: Routes = [
  { path: '', redirectTo: '/youtube', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'player/:id', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'consent', component: ConsentComponent },
  { path: 'block-questionaire', component: BlockComponent, canActivate: [AuthGuard] },
  { path: 'video-questionaire', component: VideoQuestionaireComponent, canActivate:[AuthGuard]},
  { path: 'session-questionaire', component: SessionQuestionaireComponent, canActivate:[AuthGuard]},
  { path: 'session-end', component: SessionEndComponent, canActivate:[AuthGuard]},
  { path: 'demographic', component: DemographicComponent},
  { path: 'youtube', component: YoutubeComponent, canActivate: [AuthGuard] , children: [
    //{ path: '', component: YoutubeComponent },
    { path: 'new', component: YoutubeComponent },
    { path: ':id', component: YoutubeComponent },
    { path: ':id/edit', component: YoutubeComponent },
  ] },

  { path: 'admin', component: AdminComponent ,canActivate: [AuthGuard], children: [
    { path: 'config', component: ConfigComponent },
    { path: 'stats', component: StatsComponent },
  ] },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

