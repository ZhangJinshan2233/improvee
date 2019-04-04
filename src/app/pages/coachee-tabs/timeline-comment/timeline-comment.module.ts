import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from "../../../pipes/pipes.module";
import { TimelineCommentPage } from './timeline-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
  declarations: [TimelineCommentPage],
  entryComponents:[TimelineCommentPage]
})
export class TimelineCommentPageModule {}
