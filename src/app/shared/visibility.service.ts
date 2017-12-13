import { Injectable } from '@angular/core';

@Injectable()
export class VisibilityService {
  document: any;
  focusedUser = true;

  constructor() { }

  checkVisibility(document){
    this.document = document;
    let prefix = this.getPrefix();
    let hidden = this.getHiddenProperty(prefix);
    let visibilityState = this.getVisibilityStateProperty(prefix);
    let visibilityChangeEvent = this.getVisibilityEvent(prefix);

    document.addEventListener(visibilityChangeEvent, function(e) {
      console.log(e);

      // If the document is hidden we want to pause the video.
      if (document[hidden]) {
        this.focusedUser = false;

        }
    });
  }

  getPrefix() {
    // Check to see if the browser supports the unprefixed property.
    if ('hidden' in this.document) {
      // No prefix needed, return null.
      return null;
    }

    // Loop through all the possible prefixes.
    let prefixes = ['moz', 'ms', 'o', 'webkit'];

    for (let i = 0; i < prefixes.length; i++) {
      let testPrefix = prefixes[i] + 'Hidden';
      if (testPrefix in this.document) {
        return prefixes[i];
      }
    }

    // The API must not be supported in this browser.
    return null;
  }

  getHiddenProperty(prefix) {
    if (prefix) {
      return prefix + 'Hidden';
    } else {
      return 'hidden';
    }
  }

  getVisibilityStateProperty(prefix) {
    if (prefix) {
      return prefix + 'VisibilityState';
    } else {
      return 'visibilityState';
    }
  }

  getVisibilityEvent(prefix) {
    if (prefix) {
      return prefix + 'visibilitychange';
    } else {
      return 'visibilitychange';
    }
  }
  wasUserFocused(){
    if (this.focusedUser){
      return 'yes'
    }
    return 'no'
  }


}
