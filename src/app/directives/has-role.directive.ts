import { Directive, ViewContainerRef, TemplateRef, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from "../services/user.service";
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole') roles:String[];

  constructor(private template: TemplateRef<any>, 
    private viewContainer: ViewContainerRef,
    private userService:UserService ) { }
    ngOnInit(){
      this.userService.getUserSubject().subscribe(()=>{
        if(this.userService.hasRoles(this.roles)){
          this.viewContainer.createEmbeddedView(this.template)
        }else{
          this.viewContainer.clear()
        }
      })
    }

}
