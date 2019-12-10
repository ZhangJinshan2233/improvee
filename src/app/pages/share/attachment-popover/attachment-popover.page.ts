import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-attachment-popover',
  templateUrl: './attachment-popover.page.html',
  styleUrls: ['./attachment-popover.page.scss'],
})
export class AttachmentPopoverPage implements OnInit {

  constructor(private popoverCtrl:PopoverController) { }

  ngOnInit() {
  }
  dismissPopover(){
    this.popoverCtrl.dismiss()
  }

  choose_upload_method(method){
    this.popoverCtrl.dismiss({method:method})
  }
}
