import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Subscription } from 'rxjs/Rx';
import { TabsPage } from '../tabs/tabs';

const iabOptions: InAppBrowserOptions = {};

@Component({
    selector: 'browser-component',
    template: `<ion-content></ion-content>`
})

export class BrowserPage implements OnInit {
    private browser: InAppBrowserObject;

    constructor(private iab: InAppBrowser, private nav: NavController) { }

    ngOnInit() {
        this.openBrowser();
    }

    private openBrowser() {
        this.browser = this.iab.create('http://google.com', '_blank', iabOptions);
        this.addBrowserListeners();
    }

    private addBrowserListeners() {
        const sub: Subscription = this.browser.on('exit').subscribe(() => {
            this.nav.setRoot(TabsPage);
            sub.unsubscribe();
        });
    }

    
}

