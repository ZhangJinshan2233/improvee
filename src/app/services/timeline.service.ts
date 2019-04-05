import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from "@ionic/angular";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  timelineUrl: String
  currentUser: any;

  constructor(private auth: AuthService,
    private http: HttpClient,
    private alertController: AlertController
  ) {

    this.auth.currentUser.subscribe(user=>{
      this.currentUser=user;
      this.timelineUrl = `${environment.url}/api/timelinePost/${this.currentUser._id}`;
    })
   
  }
  /**
   * @function createNewPost
   * @param timelinePost
   * @returns Observable
   */
  createNewPost(timelinePost?: { imgData: any, description: any }) {

    return this.http.post(`${this.timelineUrl}`, timelinePost).pipe(
      catchError(e => {
        let error = e.error['error'] ? e.error['error'] : "fail to sign up"
        this.showAlert(error);
        throw error;
      })
    )
  }

  /**
   * @function getTimelinePost
   * @param skipNum
   * @returns Array[timelinePost]
   */
  getTimelinePost(skipNum?: number): Observable<any> {

    return this.http.get(`${this.timelineUrl}?skipNum=${skipNum}`).pipe(
      catchError(e => {
        let error = e.error['error'] ? e.error['error'] : "fail to sign up"
        this.showAlert(error);
        throw error;
      })
    )
  }
  /**
   * @function createComment
   * @param postId 
   * @param comment 
   * @returns 
   */
  createComment(postId: string, comment?: { _coach?: string, isCoach?: boolean, content?: string }) {
    return this.http.post(`${this.timelineUrl}/${postId}`, comment).pipe(
      catchError(e => {
        let error = e.error['error']
        this.showAlert(error);
        throw error;
      })
    )
  }
  /**
   * @function getComments
   * @param postId 
   * @returns Obserable<timelinePost>
   */
  getComments(postId) {
    return this.http.get(`${this.timelineUrl}/${postId}`).pipe(
      catchError(e => {
        let error = e.error['error']
        this.showAlert(error);
        throw error;
      })
    )
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
