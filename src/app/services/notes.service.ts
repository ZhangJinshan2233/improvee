import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  loading: any
  url = `${environment.url}/api/notes`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }
  /**
   * create new  category
   * @param newCategory 
   */
  create_note(note) {
    return this.http.post(`${this.url}`, note).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  /**
   * get all  categories
   */
  get_notes_pagination(coacheeId, skipNum) {
    return this.http.get(`${this.url}/?coacheeId=${coacheeId}&skipNum=${skipNum}`).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
  /**
   * 
   * @param id 
   */
  get_note_by_id(noteId) {
    this.show_loading()
    return this.http.get(`${this.url}/${noteId}`).pipe(
      tap(() => {
        this.loading.then(loading => {
          loading.dismiss()
        })
      }),
      catchError(e => {
        this.loading.then(loading => {
          loading.dismiss()
        })
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }

  update_note(noteId, changedFields) {
    return this.http.put(`${this.url}/${noteId}`, changedFields).pipe(
      catchError(e => {
        let error = e.error.message;
        this.show_alert(error);
        throw error;
      })
    )
  }
  async show_alert(msg) {
    let alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  show_loading() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
    })
    this.loading.then(loading => {
      loading.present()
    })
  }

  notes = [
    {
      coacheeId: '001',
      title: 'note1',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '001',
      title: 'note2',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '001',
      title: 'note3',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '003',
      title: 'note5',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    },
    {
      coacheeId: '002',
      title: 'note6',
      discussed: '123',
      concluded: '456',
      next: '789',
      date: '12/5/2018',
      time: '12:12'
    }
  ]

  getNotesByCoacheeId(id) {

    return this.notes.filter((item) => item.coacheeId == id)

  }
}
