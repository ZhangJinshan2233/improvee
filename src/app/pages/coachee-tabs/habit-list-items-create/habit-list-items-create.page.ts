import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { FormBuilder,FormGroup ,Validators} from '@angular/forms';
@Component({
  selector: 'app-habit-list-items-create',
  templateUrl: './habit-list-items-create.page.html',
  styleUrls: ['./habit-list-items-create.page.scss'],
})
export class HabitListItemsCreatePage implements OnInit {
  mode = "Add Habit";
  habitForm:FormGroup;
  isUpdate=false;
  habit:any;
  constructor(private modalCtrl: ModalController, private navParams: NavParams,private formBuilder:FormBuilder) {
  }
createHabitForm(){
  this.habitForm=this.formBuilder.group({
    title:['',Validators.required],
    des:[''],
    sunday:[],
    monday:[],
    tuesday:[],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  })
}
  ngOnInit() {
    this.createHabitForm()
    let habit=this.navParams.data['newHabit']
    this.habitForm.setValue({
      title:habit.title,
      des:habit.des,
      sunday:habit.sunday,
      monday:habit.monday,
      tuesday:habit.tuesday,
      wednesday: habit.wednesday,
      thursday: habit.thursday,
      friday: habit.friday,
      saturday: habit.saturday
    }) 
    this.mode = this.navParams.data['mode']
    if(this.mode=="Update habit"){
      this.isUpdate=true
    }
  }

  changeBackgroundColor(isChecked) {
    if (isChecked) {
      return {
        backgroundColor: '#f4a933'
      }
    }
  }

  addHabit(habit) {
    console.log(habit.value)
    this.modalCtrl.dismiss({
      newHabit:habit.value
    })
  }
  updateHabit(habit) {
    console.log(habit.value)
    this.modalCtrl.dismiss({
      habit:habit.value
    })
  }
  deleteHabit(habit) {
    console.log(habit.value)
    this.modalCtrl.dismiss({
      habit: habit.value
    })
  }
  closeModal() {
    this.modalCtrl.dismiss(null);
  }
  selectDay($event){
    console.log(this.habitForm.controls.sunday)
    
  }
}
