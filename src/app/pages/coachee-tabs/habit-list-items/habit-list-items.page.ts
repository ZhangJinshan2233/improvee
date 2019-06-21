import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController} from '@ionic/angular';
import { HabitListItemsCreatePage } from "../habit-list-items-create/habit-list-items-create.page";


@Component({
  selector: 'app-habit-list-items',
  templateUrl: './habit-list-items.page.html',
  styleUrls: ['./habit-list-items.page.scss'],
})
export class HabitListItemsPage implements OnInit {
  newHabit = {
    id: null,
    title: "",
    des: "",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  }
  habitId: any
  constructor(public alertCtrl: AlertController, private modalCtrl: ModalController) { }
  ngOnInit() {
   
  }
 
  deleteHabit(habitId) {
    let index = this.habitlist.findIndex((element) => {
      return element.id = habitId
    })
    this.habitlist.splice(index, 1)
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',

          handler: () => {

            this.deleteHabit(this.habitId)
          }
        }
      ]

    });

    await alert.present();
  }

  changeBackgroundColor(isChecked) {
    if (isChecked) {
      return {
        backgroundColor: '#9acc3e'
      }
    }
  }

  showAlert(habitId) {
    this.habitId = habitId;
    this.presentAlert()

  }

  habitlist = [
    {
      id: 1,
      title: "drink water",
      des: "",
      sunday: false,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    },
    {
      id: 2,
      title: "eat healthy food",
      des: "",
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    }

  ]

  async editHabit(habit) {
    const habitModal = await this.modalCtrl.create({
      component: HabitListItemsCreatePage,
      // cssClass: 'habit-add-modal-css',
      componentProps: { newHabit: habit, mode: "Update habit" }
    });

    await habitModal.present();
    let { data } = await habitModal.onDidDismiss();
    if (data) {
      console.log(data.habit)
    }
  }
  
  async addHabit() {
    const habitModal = await this.modalCtrl.create({
      component: HabitListItemsCreatePage,
      // cssClass: 'habit-add-modal-css',
      componentProps: { newHabit: this.newHabit, mode: "Add habit" }
    });

    await habitModal.present();
    let { data } = await habitModal.onDidDismiss();
    if (data) {
      this.newHabit = data.newHabit;
      this.habitlist.push(this.newHabit)
    }
  }

}
