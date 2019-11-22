import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AttachmentPopoverPage } from './attachment-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AttachmentPopoverPage],
  entryComponents:[AttachmentPopoverPage]
})
export class AttachmentPopoverPageModule {}
