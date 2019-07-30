import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachesPage } from "../coaches/coaches.page";
@Component({
  selector: 'app-manage-coachee',
  templateUrl: './manage-coachee.page.html',
  styleUrls: ['./manage-coachee.page.scss'],
})
export class ManageCoacheePage implements OnInit {
  selectedCoach = ''
  isShow = false
  constructor(private modalCtrl: ModalController) { }
  showCheckbox() {
    this.isShow = !this.isShow
  }
  ngOnInit() {
    let tabBar = document.querySelector('ion-tab-bar')
    tabBar.style.display = 'none'
  }
  items = [
    {
      id: '001',
      firstName: 'merry',
      lastName: 'Teo',
      email: 'merry@gmail.com',
      profileImage: '/assets/img/user1.jpeg',
      specialization: 'lifestyle',
      createDate: '7/8/2019',
      status: 'inavailable',
      numberOfCoachees: 30,
      hasCoach: true
    },

    {
      id: '002',
      firstName: 'Ruby',
      lastName: 'Teo',
      email: 'Ruby@gmail.com',
      profileImage: '/assets/img/user2.jpg',
      specialization: 'lifestyle',
      createDate: '7/8/2019',
      status: 'inavailable',
      numberOfCoachees: 0,
      hasCoach: false
    },

    {
      id: '003',
      firstName: 'Nurhamimah',
      lastName: 'Teo',
      email: 'Nurhamimah@gmail.com',
      profileImage: '/assets/img/user4.jpeg',
      specialization: 'fitness',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 60,
      hasCoach: false
    },

    {
      id: '004',
      firstName: 'Bhavana',
      lastName: 'Teo',
      email: 'bhavana@gmail.com',
      profileImage: '/assets/img/user5.jpeg',
      specialization: 'therapeutic',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 50,
      hasCoach: false
    },

    {
      id: '005',
      firstName: 'Jesheila',
      lastName: 'Teo',
      email: 'Jesheila@gmail.com',
      profileImage: '/assets/img/user3.jpg',
      specialization: 'fitness',
      createDate: '7/8/2019',
      status: 'available',
      numberOfCoachees: 40,
      hasCoach: false
    },



  ]

  getCoach() {
    this.showModal()
  }

  async showModal() {
    let coachModal = await this.modalCtrl.create({
      component: CoachesPage
    })

    await coachModal.present()
    let { data } = await coachModal.onWillDismiss();
    this.selectedCoach = data['coach'].firstName
  }
}
