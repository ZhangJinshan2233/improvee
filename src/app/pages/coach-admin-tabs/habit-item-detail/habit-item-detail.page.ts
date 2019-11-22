import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-habit-item-detail',
  templateUrl: './habit-item-detail.page.html',
  styleUrls: ['./habit-item-detail.page.scss'],
})
export class HabitItemDetailPage implements OnInit {
  state: any;
  habitItemForm: FormGroup;
  isSubmitted = false
  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    let tabBar=document.querySelector('ion-tab-bar')
    tabBar.style.display='none'
    this.createHabitItemForm()
    let habitItem = this.navParams.get('habitItem')
    this.state = this.navParams.get('state')
    if (habitItem) {
      this.habitItemForm.setValue({
        title: habitItem.title,
        desc: habitItem.desc
      })
    }

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  createHabitItemForm() {
    this.habitItemForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    })
  }

  submitHabitItemForm() {
    this.isSubmitted = true;
    if (this.habitItemForm.invalid) return
    this.closeModal()
  }
}
