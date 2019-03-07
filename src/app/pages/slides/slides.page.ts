import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import {  IonSlides} from "@ionic/angular";
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})

export class SlidesPage implements OnInit {
@ViewChild('') slides:IonSlides
  imageSlides: any[] = [
    {
      mediaUrl: '../../../assets/img/image2.jpg'
    },
    {
      mediaUrl: '../../../assets/img/image1.jpg'
    }
  ];
  slidesOptions = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    pager: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    }

  }
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.slides)
  }

  skip() {
    this.router.navigateByUrl('/coachee-tabs')
  }
}
