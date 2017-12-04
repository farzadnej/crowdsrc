import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../shared/backend.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-session-end',
  templateUrl: './session-end.component.html',
  styleUrls: ['./session-end.component.css']
})
export class SessionEndComponent implements OnInit {

  constructor(private backendService: BackendService, private authService: AuthService) { }

  ngOnInit() {

    this.authService.updateDatabasePhase(this.backendService.getPhase());



  }

}
