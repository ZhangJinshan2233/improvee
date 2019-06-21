import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides
  dateOfBirth: any;
  disablePrevBtn: boolean;
  disableNextBtn: boolean;
  gender: string;
  hightValue: any;
  weightValue: any;
  weightGoalValue: any;
  isSubmit = false
  //assessment

  nutriotionState = "yes";
  walkActiveState = "walking around all day";
  physicalActivityState = "yes";
  sentenceDescribeState = "not need to lose weight";


  slideOpts = {
    initialSlide: 0,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span style="color:#0cd1e8" class="' + currentClass + '"></span>' +
          '<span style="color:#0cd1e8">/</span>' +
          '<span style="color:#0cd1e8" class="' + totalClass + '"></span>';
      }
    }
  }
  constructor(private router: Router) { }
  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar')
    tabBar.style.display = 'none'
    this.dateOfBirth = new Date().toISOString()
    this.gender = 'male'
    this.disablePrevBtn = true;
    this.disableNextBtn = false;
    this.slides.lockSwipes(true)
  }
  doCheck() {
    let peomiseBegining = this.slides.isBeginning()
    let promiseEnd = this.slides.isEnd()

    Promise.all([peomiseBegining]).then(data => {
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      console.log(data)
    })

    Promise.all([promiseEnd]).then(data => {
      if (data[0]) {
        this.isSubmit = true

      } else {
        this.isSubmit = false
      }
    })
  }
  gotoNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    if (this.isSubmit) {
      this.submitInfo()
      this.router.navigateByUrl('/coachee')
    }
  }
  gotoPre() {

    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  getHeightValue(value) {
    this.hightValue = value
  }
  getWeightValue(value) {
    this.weightValue = value
  }

  getWeightGoalValue(value) {
    this.weightGoalValue = value
  }

  getGender($event) {
    console.log($event.target.value)
  }

  getDOB(event) {
    this.dateOfBirth = event.target.value
    console.log(this.dateOfBirth)
  }

  //assessment

  getNutritionState(event) {
    console.log(event.target.value)
  }

  getWalkActiveState(event) {
    console.log(event.target.value)
  }
  getPhysicalActivityState(event) {
    console.log(event.target.value)
  }

  getSentenceDescribeState(event) {
    console.log(event.target.value)
  }
  submitInfo() {
    console.log('sumitinfo')
  }
}
