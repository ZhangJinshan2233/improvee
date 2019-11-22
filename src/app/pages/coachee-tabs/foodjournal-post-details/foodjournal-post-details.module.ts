import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FoodjournalPostDetailsPage } from './foodjournal-post-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [FoodjournalPostDetailsPage],
  entryComponents:[FoodjournalPostDetailsPage]
})
export class FoodjournalPostDetailsPageModule {}
