# tabs-with-in-app-browser

The purpose of this project is to demonstrate an issue with using the Ionic Tabs layout with the Ionic Native In App Browser plugin.

### To get the project running:
- Fork the repository.
- Run `npm install` in the project directory.
- Run the Ionic application (`ionic cordova emulate ios`).

### To spot the issue:
- Start the Ionic application.
- Wait for the In App Browser to automatically load a webpage on startup.
- Close the In App Browser window.
- Wait for the app to navigate to a page with a tabbed layout.
- Switch tabs.

The issue demonstrated causes the tab bar to highlight the wrong tab as active. However, the tabbed navigation continues to function as expected. The following workaround can be used to make the tabs appear to function normally in this scenario.

``` html
<!-- tabs.html -->
<ion-tabs tabsPlacement="bottom" tabsHighlight="false">
    <ion-tab [root]="tab1Root" (ionSelect)="selectTab($event)" tabTitle="Home" tabIcon="home"></ion-tab>
    <ion-tab [root]="tab2Root" (ionSelect)="selectTab($event)" tabTitle="About" tabIcon="information-circle"></ion-tab>
    <ion-tab [root]="tab3Root" (ionSelect)="selectTab($event)" tabTitle="Contact" tabIcon="contacts"></ion-tab>
</ion-tabs>
```

``` typescript
// tabs.ts
import { Component } from '@angular/core';
import { Tab } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root = HomePage;
    tab2Root = AboutPage;
    tab3Root = ContactPage;
    private selectedTab: Tab;

    public selectTab(tab: Tab) {
        this.deselectCurrentTab();
        this.selectNextTab(tab);
    }

    private deselectCurrentTab() {
        if (this.selectedTab) {
            const currentTabElement: HTMLElement = document.getElementById(this.selectedTab._btnId);
            currentTabElement.setAttribute('aria-selected', 'false');
            const currentTabIcon: Element = currentTabElement.querySelector('ion-icon');
            this.changeToOutlineIcon(currentTabIcon);
        }
    }

    private selectNextTab(tab: Tab) {
        this.selectedTab = tab;
        const nextTabElement: HTMLElement = document.getElementById(this.selectedTab._btnId);
        nextTabElement.setAttribute('aria-selected', 'true');
        const nextTabIcon: Element = nextTabElement.querySelector('ion-icon');
        this.changeToFilledIcon(nextTabIcon);
    }

    private changeToOutlineIcon(iconElement: Element): void {
        iconElement.className = iconElement.className
                .split(' ')
                .map((className: string) => className.startsWith('ion-ios-') ? className + '-outline' : className)
                .join(' ');
    }

    private changeToFilledIcon(iconElement: Element): void {
        iconElement.className = iconElement.className
            .split(' ')
            .map((className: string) => className.endsWith('-outline') ? className.replace('-outline', '') : className)
            .join(' ');
    }
}

```
