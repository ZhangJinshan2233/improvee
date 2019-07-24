import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from "../../../services/notes.service";
import { ModalController } from '@ionic/angular';
import { NoteDetailPage } from "../note-detail/note-detail.page";
import {customModalEnterAnimation} from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation} from "../../../_helper/customModalLeave";

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute,
    private notesService: NotesService,
    private modalCtrl: ModalController

  ) { }
  notes = []
  ngOnInit() {
    let id = this.activatedRouter.snapshot.params.coacheeId
    this.notes = this.notesService.getNotesByCoacheeId(id)
  }

  createNewNote() {
    this.openNoteDetailModal({}, 'Create')
  }

  updateNote(note) {
    this.openNoteDetailModal(note, 'Update')
  }
  async openNoteDetailModal(note, status) {

    let newNoteModal = await this.modalCtrl.create({
      component: NoteDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: {
        note: note,
        status: status
      }
    })

    return await newNoteModal.present()
  }

}
