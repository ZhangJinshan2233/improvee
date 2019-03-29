import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonInfiniteScroll, IonContent,IonTabBar } from '@ionic/angular';
@Component({
  selector: 'app-coachee-tabs',
  templateUrl: './coachee-tabs.page.html',
  styleUrls: ['./coachee-tabs.page.scss'],
})
export class CoacheeTabsPage implements OnInit {
@ViewChild(IonContent) content:IonContent
@ViewChild(IonTabBar) tabs:IonTabBar
  constructor() { }
  ngOnInit() {
  }
}
