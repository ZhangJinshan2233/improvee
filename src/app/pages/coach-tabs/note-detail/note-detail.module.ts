import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDetailPage } from './note-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [NoteDetailPage],
  entryComponents:[NoteDetailPage]
})
export class NoteDetailPageModule {}
