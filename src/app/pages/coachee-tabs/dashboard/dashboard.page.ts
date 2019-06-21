import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],

})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }
  ionViewWillEnter(){
    let tabBar=document.querySelector('ion-tab-bar');
    tabBar.style.display='flex';
  }
  ngOnInit() {
    this.items[0].open = true;
  }
  gotoIndicatorPage(indicator) {
    this.router.navigateByUrl(`/records/${indicator.indicatorName}`)
  }
  items: any[] = [
    {
      groupName: 'Wellness',
      indicators: [
        {
          indicatorName: 'weight',
          value: '68',
          unit: 'kg'

        },
        {
          indicatorName: 'height',
          value: '171',
          unit: 'cm'
        },
        {
          indicatorName: 'BMI',
          value: '25',
          unit: ''
        },
        {
          indicatorName: 'waist',
          value: '89',
          unit: 'cm'
        }
      ]
    },
    {
      groupName: 'Medical',
      indicators: [
        {
          indicatorName: 'HDL',
          value: '4.5',
          unit: 'mm/mmol'
        },
        {
          indicatorName: 'BP-sys',
          value: '110',
          unit: 'mm/mmol'
        },
        {
          indicatorName: 'BP-dys',
          value: '89',
          unit: 'mm/mmol'
        },
        {
          indicatorName: 'LDL',
          value: '4.5',
          unit: 'mm/mmol'
        }
      ]
    }
  ]

  toggleSection(index) {
    this.items[index].open = !this.items[index].open
    if (this.items[index].open) {
      for (let i = 0; i < this.items.length; i++) {
        if (i != index) {
          this.items[i].open = false;
        }
      }
    }
  }

  gotoIndicatorDetails(indicatorName) {
    this.router.navigateByUrl(`/coachee/dashboard/indicator-details/${indicatorName}`)
  }
}
