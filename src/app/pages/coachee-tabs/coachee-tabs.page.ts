import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonContent,IonTabBar, IonTabs } from '@ionic/angular';
@Component({
  selector: 'app-coachee-tabs',
  templateUrl: './coachee-tabs.page.html',
  styleUrls: ['./coachee-tabs.page.scss'],
})
export class CoacheeTabsPage implements OnInit {
@ViewChild(IonContent,{static:false}) content:IonContent
@ViewChild(IonTabs,{static:false}) tabs: IonTabs;
activeTab
getSelectedTab(): void {
  this.activeTab = this.tabs.getSelected();
}
  constructor() { }
  ngOnInit() {
  }
}
