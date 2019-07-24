import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NoteDetailPageModule } from "../note-detail/note-detail.module";
import { NotePage } from './note.page';

const routes: Routes = [
  {
    path: '',
    component: NotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteDetailPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotePage]
})
export class NotePageModule {}
