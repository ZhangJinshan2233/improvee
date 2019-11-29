import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NoteDetailPage } from "../note-detail/note-detail.page";
import { customModalEnterAnimation } from "../../../_helper/customModalEnter";
import { customModalLeaveAnimation } from "../../../_helper/customModalLeave";
import { NotesService } from "../../../services/notes.service";
@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  notes = [];
  skipNum = 0;
  coacheeId = ''
  constructor(private activatedRouter: ActivatedRoute,
    private notesService: NotesService,
    private modalCtrl: ModalController

  ) { }

  ngOnInit() {
    this.coacheeId = this.activatedRouter.snapshot.params.coacheeId
    this.notesService.get_notes_pagination(this.coacheeId, this.skipNum).subscribe(res => {
      this.notes = res['notes']
      this.skipNum += res['notes'].length
    })
  }

  /**
   * 
   * @param infiniteScrollEvent 
   */
  load_more_notes(infiniteScrollEvent) {
    this.notesService.get_notes_pagination(this.coacheeId, this.skipNum).subscribe(res => {
      if (res['notes'].length >= 1) {
        this.skipNum += res['notes'].length
        this.notes = this.notes.concat(res['notes'])
        infiniteScrollEvent.target.complete();
      }
      else {
        infiniteScrollEvent.target.disabled = true;
      }
    })
  }
  /**
   * 
   */
  create_new_note() {
    this.openNoteDetailModal({}, 'Create', this.coacheeId)
  }

  /**
   * 
   * @param note 
   * @param i 
   */
  updateNote(note, i) {
    this.openNoteDetailModal(note, 'Update', this.coacheeId, i)
  }
  /**
   * 
   * @param note 
   * @param status 
   * @param coachee id 
   * @param i 
   */
  async openNoteDetailModal(note, status, coacheeId, i?) {
    let noteModal = await this.modalCtrl.create({
      component: NoteDetailPage,
      enterAnimation: customModalEnterAnimation,
      leaveAnimation: customModalLeaveAnimation,
      componentProps: {
        note: note,
        status: status,
        coacheeId: coacheeId
      }
    })
    await noteModal.present()
    let { data } = await noteModal.onDidDismiss();
    if (data) {
      if (status === "Create") {
        this.notes.unshift(data['newNote'])
      } else {
        console.log(this.notes[i])
        let { title, discussed, concluded, next } = data['newNote'];
        this.notes[i]['title'] = title
        this.notes[i]['discussed'] = discussed
        this.notes[i]['concluded'] = concluded
        this.notes[i]['next'] = next
      }
    }
  }
}
