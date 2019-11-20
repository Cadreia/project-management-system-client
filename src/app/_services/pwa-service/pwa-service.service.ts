import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent;

  constructor(private sw_update: SwUpdate) {
    //store the beforeinstallprompt browser event when it shows up
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  //check if user confirmed to update the app
  getUpdatedApp() {
    return this.sw_update.available.subscribe(event => {
      if (this.askUserToUpdate()) {
        window.location.reload();

        //this.sw_update.activateUpdate().then(() => document.location.reload())
      }
    });
  }

  askUserToUpdate() {
    return confirm("A more recent version of the app exists. Do you want to update?");
  }
}
