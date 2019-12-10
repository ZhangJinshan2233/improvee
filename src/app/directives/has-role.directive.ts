import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from "../services/auth.service";
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole') roles:String[];

  constructor(private template: TemplateRef<any>, 
    private viewContainer: ViewContainerRef,
    private userService:AuthService ) { }
    ngOnInit(){
      this.userService.currentUser.subscribe(()=>{
        if(this.userService.hasRoles(this.roles)){
          this.viewContainer.createEmbeddedView(this.template)
        }else{
          this.viewContainer.clear()
        }
      })
    }

}
