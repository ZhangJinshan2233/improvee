import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NotesService } from "../../../services/notes.service";
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
  status = '';
  note: any;
  noteForm: FormGroup;
  isSubmitted = false;
  coacheeId = ""
  constructor(private modalCtrl: ModalController,
    private navPara: NavParams,
    private formBuilder: FormBuilder,
    private noteService: NotesService
  ) { }

  ngOnInit() {
    this.createNoteForm()
    this.note = this.navPara.get('note');
    let { title, discussed, concluded, next } = this.note
    this.noteForm.patchValue({
      title: title || '',
      discussed: discussed || '',
      concluded: concluded || '',
      next: next || ''
    })
    this.status = this.navPara.get('status');
    this.coacheeId = this.navPara.get('coacheeId')
  }
  async closeNoteModal() {
    await this.modalCtrl.dismiss()
  }

  createNoteForm() {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      discussed: ['', Validators.required],
      concluded: ['', Validators.required],
      next: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.noteForm.invalid) return
    if (this.status === "Create") {
      this.noteService.create_note({ _coachee: this.coacheeId, ...this.noteForm.value }).subscribe(res => {
        if (res['newNote']) {
          this.modalCtrl.dismiss({
            newNote: res['newNote']
          })
        }
      })
    } else {
      this.noteService.update_note(this.note._id, this.noteForm.value).subscribe(res => {
        if (res) {
          this.modalCtrl.dismiss({
            newNote: this.noteForm.value
          })
        }
      })
    }
  }
}
