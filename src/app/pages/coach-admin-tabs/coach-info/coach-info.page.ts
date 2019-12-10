import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.page.html',
  styleUrls: ['./coach-info.page.scss'],
})
export class CoachInfoPage implements OnInit {

  state: '';
  coach = {};
  coachForm: FormGroup;
  isSubmitted = false
  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.state = this.navParams.get('state')
    this.coach = this.navParams.get('coach')
    console.log(this.coach)
    this.createCoachForm()
    if (this.coach) {
      this.coachForm.setValue({
        firstName: this.coach['firstName'] || "",
        lastName: this.coach['lastName'] || "",
        email: this.coach['email'] || "",
        specialization: this.coach['specialization'] || ""
      })
    }

  }
  createCoachForm() {
    this.coachForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      specialization: ['', [Validators.required]]
    })
  }
  closeModal() {
    this.modalCtrl.dismiss()
  }
  onSubmit() {
    this.isSubmitted = true
    if (this.coachForm.invalid) return
    this.closeModal()
    
  }
}
