import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoacheeService } from "../../../services/coachee.service";
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  //assessment
  public amount: number | string = ''
  nutriotionHabitsState = "yes";
  dailyActivityLevel = "walking around all day";
  physicalActivityState = "yes";
  motivationStage = "not need to lose weight";

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
  constructor(private router: Router,
     private coacheeService:CoacheeService
     ) { }
  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar')
    tabBar.style.display = 'none'
  }

  //life cycle assessment

  getNutriotionHabitsState(event) {
    this.nutriotionHabitsState = event.target.value
  }

  getDailyActivityLevel(event) {
    this.dailyActivityLevel = event.target.value
  }
  getPhysicalActivityState(event) {
    this.physicalActivityState = event.target.value
  }

  getMotivationStage(event) {
    this.motivationStage = event.target.value
  }
  submitInfo() {
    let lifeStyleAssessments = [{
      question: "Do you participate in physical activity?",
      result: this.physicalActivityState
    },
    {
      question: "How active are you in your daily life?",
      result: this.dailyActivityLevel
    }, {
      question: "Are you eating nutritiously enough?",
      result: this.nutriotionHabitsState
    }, {
      question: "Which sentence best describes?",
      result: this.motivationStage
    }
    ]
    this.coacheeService.update_assessments_and_recommended_habit({lifeStyleAssessments:lifeStyleAssessments,firstTimeLogin:false}).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('/coachee')
      }
    })

  }
}