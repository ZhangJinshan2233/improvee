import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {

  date: any;
  time: any;
  status = '';
  note: any;
  noteForm: FormGroup;
  isSubmitted = false
  constructor(private modalCtrl: ModalController,
    private navPara: NavParams,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createNoteForm()
    let note = this.navPara.get('note');
    let { date, time, discussed, concluded, next } = note
    this.noteForm.setValue({
      date: date || '',
      time: time || "",
      discussed: discussed || '',
      concluded: concluded || '',
      next: next || ''
    })
    this.status = this.navPara.get('status');
  }
  async closeNoteModal() {
    await this.modalCtrl.dismiss()
  }
  createNoteForm() {
    this.noteForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      discussed: ['', Validators.required],
      concluded: ['', Validators.required],
      next: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.noteForm.invalid) return
    this.closeNoteModal()
  }

}
