import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachInfoPage } from "../coach-info/coach-info.page";
import { async } from 'q';
@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.page.html',
  styleUrls: ['./coach-list.page.scss'],
})
export class CoachListPage implements OnInit {

  coachList = []
  constructor(private modalContrl: ModalController) { }

  ngOnInit() {
    let tabBar=document.querySelector('ion-tab-bar')
    tabBar.style.display='none'
    this.coachList = this.items
  }
  items = [
    {
      id: '001',
      firstName: 'merry',
      lastName:'Teo',
      email: 'merry@gmail.com',
      profileImage: '/assets/img/user1.jpeg',
      specialization: 'lifestyle',
      createDate: '7/8/2019',
      status: 'inavailable',
      numberOfCoachees: 30
    },

    {
      id: '002',
      firstName: 'Ruby',
      lastName:'Teo',
      email: 'Ruby@gmail.com',
      profileImage: '/assets/img/user2.jpg',
      specialization: 'lifestyle',
      createDate: '7/8/2019',
      status: 'inavailable',
      numberOfCoachees: 0
    },

    {
      id: '003',
      firstName: 'Nurhamimah',
      lastName:'Teo',
      email: 'Nurhamimah@gmail.com',
      profileImage: '/assets/img/user4.jpeg',
      specialization: 'fitness',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 60
    },

    {
      id: '004',
      firstName: 'Bhavana',
      lastName:'Teo',
      email: 'bhavana@gmail.com',
      profileImage: '/assets/img/user5.jpeg',
      specialization: 'therapeutic',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 50
    },

    {
      id: '005',
      firstName: 'Jesheila',
      lastName:'Teo',
      email: 'Jesheila@gmail.com',
      profileImage: '/assets/img/user3.jpg',
      specialization: 'fitness',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 40
    },



  ]
  async createNewCaoch() {
    this.showModal('Create new coach',null)
  }
  async gotoCoachDetail(coach) {
    this.showModal('update coach',coach)
  }

  async showModal(state,coach) {
    let coachModal = await this.modalContrl.create({
      component: CoachInfoPage,
      componentProps:{
        state:state,
        coach:coach
      }
    })

    return await coachModal.present()
  }
}
