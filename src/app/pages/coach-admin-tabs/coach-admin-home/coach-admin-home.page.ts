import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-coach-admin-home',
  templateUrl: './coach-admin-home.page.html',
  styleUrls: ['./coach-admin-home.page.scss'],
})
export class CoachAdminHomePage implements OnInit {

  constructor(private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
  // console.log(this.activatedRouter.snapshot.paramMap.get('id'))
  }

}
