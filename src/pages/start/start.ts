import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TabsPage } from '../tabs/tabs';

@Component({
    templateUrl: 'start.html'
})

export class StartPage {

    constructor(private nav: NavController, private iab: InAppBrowser) { }

    public openBrowser() {
        this.iab.create('https://google.com', '_blank')
            .on('exit')
            .subscribe(() => this.openTabsPage());
    }

    public openTabsPage() {
        this.nav.setRoot(TabsPage);
    }

}
