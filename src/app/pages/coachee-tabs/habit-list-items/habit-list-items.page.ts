import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HabitListItemsCreatePage } from "../habit-list-items-create/habit-list-items-create.page";
import { customModalEnterAnimation } from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation } from "../../../_helper/customModalLeave";
import { HabitService } from "../../../services/habit.service";
@Component({
  selector: 'app-habit-list-items',
  templateUrl: './habit-list-items.page.html',
  styleUrls: ['./habit-list-items.page.scss'],
})
export class HabitListItemsPage implements OnInit {
  newHabit = {
    _id: "",
    name: "",
    des: "",
    daysOfWeek: []
  }
  habitId: any
  habits: any
  constructor(private modalCtrl: ModalController,
    private habitService: HabitService
  ) { }

  ngOnInit() {
    this.habitService.get_habits().subscribe(res => {
      this.habits = res['habits']
    })
  }

  change_backgroundcolor(habit, day) {
    let dayStatus = habit.daysOfWeek.includes(day)
    if (dayStatus) {
      return {
        backgroundColor: '#f4a933'
      }
    }
  }
  /**
   * edit habit
   * @param habit 
   * @param i 
   */
  async edit_habit(habit, i) {
    const habitModal = await this.modalCtrl.create({
      component: HabitListItemsCreatePage,
      componentProps: { newHabit: habit, mode: "Edit habit" }
    });

    await habitModal.present();
    let { data } = await habitModal.onDidDismiss();
    if (data) {
      if (data.editMode === 'edit') {
        if (data.habit) {
          this.habitService.update_habit(habit._id, data.habit).subscribe(res => {
            this.habits[i] = data.habit
          })
        }
      } else if (data.editMode === 'delete') {
        this.habitService.update_habit(habit._id, { isObsolete: true }).subscribe(res => {
          this.habits.splice(i, 1)
        })
      }
    }
  }

/**
 * add new habit
 */
  async add_habit() {
    const habitModal = await this.modalCtrl.create({
      component: HabitListItemsCreatePage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: { newHabit: this.newHabit, mode: "Add habit" }
    });

    await habitModal.present();
    let { data } = await habitModal.onDidDismiss();
    if (data) {
      console.log(data.newHabit)
      if (data.newHabit) {
        this.habitService.create_habit(data.newHabit).subscribe(res => {
         console.log(res['newHabit'])
          this.habits.push(res['newHabit'])
        })
      }
    }

  }
}
