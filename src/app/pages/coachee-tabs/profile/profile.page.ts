import { Component, OnInit } from '@angular/core';
import { MenuService } from "../../../services/menu.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from "../../../services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  nameForm: FormGroup;
  isNameFormSubmitted = false;
  isNameFormShow = false;

  currentUser: {}
  constructor(private menuService: MenuService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router:Router) {

  }

  ngOnInit() {
    this.menuService.getUserInfo().subscribe(res => {
      this.currentUser = res['currentUser']
      this.createNameForm();
    })
    let tabBar = document.querySelector('ion-tab-bar');
    tabBar.style.display = 'none'
  }

  createNameForm() {
    this.nameForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }

  togglerNameForm() {
    this.isNameFormShow = !this.isNameFormShow
    if (this.isNameFormShow)
      this.nameForm.setValue({ 'firstName': this.currentUser['firstName'], 'lastName': this.currentUser['lastName'] })
  }

  submitNameForm() {
    this.isNameFormSubmitted = true
    console.log(this.nameForm.value)
    this.auth.updateProfile(this.nameForm.value).subscribe(res=>{
      this.menuService.getUserInfo().subscribe(res=>{
        this.currentUser=res['currentUser']
      })
      this.isNameFormShow = !this.isNameFormShow
    })
  }

  cancle() {
    this.isNameFormShow = !this.isNameFormShow
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
  }
}
