import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})

export class SlidesPage implements OnInit {

  imageSlides: any[] = [
    {
      mediaUrl: '../../../assets/img/image2.jpg'
    },
    {
      mediaUrl: '../../../assets/img/image1.jpg'
    },
    {
      mediaUrl: '../../../assets/img/image3.jpg'
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
  }

  skip() {
    this.router.navigateByUrl('/home')
  }
}
