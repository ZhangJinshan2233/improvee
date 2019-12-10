import { Component, OnInit } from "@angular/core";
import { addYears, compareAsc } from "date-fns";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  isSubmitted = false;
  isIndividual = true;
  coachee = {};
  isLoaded=false
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService) { }
  ngOnInit() {
    this.create_profile_form_group();
    this.authService.get_user_profile().subscribe(res => {
      this.coachee = res['currentUser'];
      this.profileForm.setValue({
        firstName: this.coachee['firstName'],
        lastName: this.coachee['lastName'],
        phoneNumber: this.coachee['phoneNumber'],
        height: this.coachee['height'],
        weight: this.coachee['weight'],
        gender: this.coachee['gender'],
        dateOfBirth: new Date(this.coachee['dateOfBirth']).toISOString()
      })
      this.isLoaded=true
    })
  
  }

  get f() {
    return this.profileForm.controls
  }

  create_profile_form_group() {
    this.profileForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
        height: ['', [Validators.required, Validators.min(100), Validators.max(230), Validators.pattern(/^\d*\.?\d*$/)]],
        weight: ['', [Validators.required, Validators.min(30), Validators.max(200), Validators.pattern(/^\d*\.?\d*$/)]],
        gender: ['male', Validators.required],
        dateOfBirth: [new Date().toISOString(), Validators.required],
      }
    );
  }

  /**
   * profile
   * @function onSubmit
   * @param firstName lastName email phoneNumber password
   */
  async onSubmit() {
    this.isSubmitted = true;
    if (this.profileForm.invalid) return
    console.log(this.profileForm.value)
    let date = new Date(addYears(this.profileForm.controls['dateOfBirth'].value, 10))
    if (compareAsc(date, new Date()) === 1) {
      this.show_alert("choose right date of birth")
      return
    }
    this.authService.updateProfile(this.profileForm.value).subscribe(res=>{
      if(res){
        this.router.navigateByUrl('/coachee/menu')
      }
    })
  }

  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
