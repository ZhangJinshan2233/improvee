import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class MenuService {
currentUser:any
  constructor(private auth:AuthService) {
    this.auth.currentUser.subscribe(user=>{
    this.currentUser=user
    })
   }
}
