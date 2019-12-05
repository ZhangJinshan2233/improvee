import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
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
/**
 * 
 * @param note id 
 * @param changed fields 
 */
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
}
