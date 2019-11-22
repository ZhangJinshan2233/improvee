import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitService } from 'src/app/services/habit.service';
@Component({
  selector: 'app-habit-list-items-create',
  templateUrl: './habit-list-items-create.page.html',
  styleUrls: ['./habit-list-items-create.page.scss'],
})
export class HabitListItemsCreatePage implements OnInit {
  mode = "Add habit";
  habitForm: FormGroup;
  isUpdate = false;
  habit: any;
  week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
  }
  create_habitForm() {
    this.habitForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      Sunday: [false, []],
      Monday: [false, []],
      Tuesday: [false, []],
      Wednesday: [false, []],
      Thursday: [false, []],
      Friday: [false, []],
      Saturday: [false, []],
    })
  }
  ngOnInit() {
    this.create_habitForm()
    this.habit = this.navParams.data['newHabit']
    this.mode = this.navParams.data['mode']
    if (this.mode == "Edit habit") {
      this.isUpdate = true
      this.habitForm.setValue({
        name: this.habit.name,
        description: this.habit.description,
        Sunday: this.habit.daysOfWeek.includes('Sunday'),
        Monday: this.habit.daysOfWeek.includes('Monday'),
        Tuesday: this.habit.daysOfWeek.includes('Tuesday'),
        Wednesday: this.habit.daysOfWeek.includes('Wednesday'),
        Thursday: this.habit.daysOfWeek.includes('Thursday'),
        Friday: this.habit.daysOfWeek.includes('Friday'),
        Saturday: this.habit.daysOfWeek.includes('Saturday'),
      })
    }
  }

  change_background_color(isChecked) {
    if (isChecked) {
      return {
        backgroundColor: '#f4a933'
      }
    }
  }

  submit_habit_form() {
    if (this.habitForm.invalid) return
    let daysOfWeek = this.week.filter((item) => {
      return this.habitForm.value[item]
    })
    let { name, description } = this.habitForm.value
    if (this.mode =="Add habit") {
      this.modalCtrl.dismiss({
        newHabit: {
          name,
          description,
          daysOfWeek
        }
      })
    } else {
      this.modalCtrl.dismiss({
        habit: {
          _id: this.habit._id,
          isObsolete: this.habit.isObsolete,
          name,
          description,
          daysOfWeek
        },
        editMode: 'edit'
      })
    }
  }
  
  deleteHabit() {
    this.modalCtrl.dismiss({
      editMode: 'delete'
    })
  }

  closeModal() {
    this.modalCtrl.dismiss(null);
  }
}
