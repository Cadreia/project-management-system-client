import { UserService } from './_services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { PwaService } from './_services/pwa-service/pwa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = 'task-manager-client';
  showInstallPrompt = this.pwa_service.promptEvent;
  username;

  constructor(private user_service: UserService, private pwa_service: PwaService) {
    this.user_service.username.subscribe(name => {
      console.log(name);
      this.username = name;
    });
  }

  ngOnInit() {
    this.pwa_service.getUpdatedApp();
  }

  installPwa(): void {
    this.pwa_service.promptEvent.prompt();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
