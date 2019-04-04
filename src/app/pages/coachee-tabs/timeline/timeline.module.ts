import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TimelineCommentPageModule } from "../timeline-comment/timeline-comment.module";
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { TimelinePage } from './timeline.page';
import { TimelineCreatePageModule } from "../timeline-create/timeline-create.module";
const routes: Routes = [
  {
    path: '',
    component: TimelinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    TimelineCreatePageModule,
    TimelineCommentPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimelinePage]
})
export class TimelinePageModule { }
