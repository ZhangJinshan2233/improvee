import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from "../../../pipes/pipes.module";
import { FoodjournalPostCommentsPage } from './foodjournal-post-comments.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [FoodjournalPostCommentsPage],
  entryComponents:[FoodjournalPostCommentsPage]
})
export class FoodjournalPostCommentsPageModule {}
