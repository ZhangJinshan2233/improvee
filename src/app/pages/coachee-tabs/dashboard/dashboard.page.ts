import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild

} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(200, animateChild()))
      ]),
    ]),
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('500ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class DashboardPage implements OnInit {
  constructor(private router: Router) { }
  ionViewWillEnter() {
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'flex';
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
          unit: 'kg',
          createDate: '7/12/2019',
          state: 'normal'

        },
        {
          indicatorName: 'height',
          value: '171',
          unit: 'cm',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BMI',
          value: '25',
          unit: '',
          createDate: '7/12/2019',
          state: 'over'
        },
        {
          indicatorName: 'waist',
          value: '89',
          unit: 'cm',
          createDate: '7/12/2019',
          state: 'server'
        }
      ]
    },
    {
      groupName: 'Medical',
      indicators: [
        {
          indicatorName: 'HDL',
          value: '4.5',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BP-sys',
          value: '110',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'BP-dys',
          value: '89',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'normal'
        },
        {
          indicatorName: 'LDL',
          value: '4.5',
          unit: 'mm/mmol',
          createDate: '7/12/2019',
          state: 'server'
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

  getStateOfIndicator(state) {
    if (state === 'over') {
      return 'primary'
    } else if (state === 'server') {
      return 'danger'
    } else {
      return undefined
    }

  }
}
