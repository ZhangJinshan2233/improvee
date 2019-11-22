import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRating } from 'ionic4-star-rating';
import { IonicModule } from '@ionic/angular';
import { AttachmentPopoverPage } from "./attachment-popover/attachment-popover.page";
@NgModule({
  declarations: [StarRating,AttachmentPopoverPage],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[StarRating],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[AttachmentPopoverPage]
})
export class ShareModule { }
