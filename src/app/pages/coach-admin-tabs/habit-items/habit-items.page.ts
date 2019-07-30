import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { HabitItemDetailPage } from "../habit-item-detail/habit-item-detail.page";
import { customModalEnterAnimation } from '../../../_helper/customModalEnter'
import { customModalLeaveAnimation } from "../../../_helper/customModalLeave";
@Component({
  selector: 'app-habit-items',
  templateUrl: './habit-items.page.html',
  styleUrls: ['./habit-items.page.scss'],
})
export class HabitItemsPage implements OnInit {

  isSearching = false;
  habitItems = []
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
    let tabBar=document.querySelector('ion-tab-bar')
    tabBar.style.display='none'
    this.habitItems = this.items
  }

  onSearchInput() {
    this.isSearching = true
  }

  filterItems(event) {
    this.isSearching = false
    this.habitItems = this.items.filter((item) => {
      return item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
  }
  items = [
    {
      id: '001',
      title: 'drin',
      desc: '123'
    },
    {
      id: '002',
      title: 'drin',
      desc: '123'
    },
    {
      id: '003',
      title: 'drink water',
      desc: '123'
    },
    {
      id: '004',
      title: 'drink water',
      desc: '123'
    },
    {
      id: '005',
      title: 'drink water',
      desc: '123'
    }
  ]

  async gotoDetails(item) {

    this.showHabitItemModal(item,'update item')

  }

  addNewHabitItem() {
    this.showHabitItemModal(null,'create new item')
  }
  async showHabitItemModal(item, state) {
    let habitItemDetail = await this.modalCtrl.create({
      component: HabitItemDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: {
        habitItem: item,
        state: state
      }
    })

    return await habitItemDetail.present()
  }
}
