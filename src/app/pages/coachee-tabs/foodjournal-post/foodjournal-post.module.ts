import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from "../../../pipes/pipes.module";
import { IonicModule } from '@ionic/angular';
import { ShareModule } from "../../share/share.module";
import { FoodjournalPostPage } from './foodjournal-post.page';
import { FoodjournalPostDetailsPageModule } from "../foodjournal-post-details/foodjournal-post-details.module";
import { FoodjournalPostCommentsPageModule } from "../foodjournal-post-comments/foodjournal-post-comments.module";
const routes: Routes = [
  {
    path: '',
    component: FoodjournalPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ShareModule,
    FoodjournalPostCommentsPageModule,
    FoodjournalPostDetailsPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FoodjournalPostPage]
})
export class FoodjournalPostPageModule { }
