import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlertController, LoadingController } from '@ionic/angular';
import { mapTo, catchError, tap, merge, } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  newChallengeSubject = new Subject<any>()
  loading: any
  url = `${environment.url}/api`;
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  /**
   * create challenge
   * @param newChallenge 
   */
  create_challenge(newChallenge) {
    this.show_loading()
    return this.http.post(`${this.url}/challenges`, newChallenge).pipe(
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
   */
  get_categories_and_active_categories() {
    this.show_loading()
    return forkJoin(this.http.get(`${this.url}/challenges/active`),
      this.http.get(`${this.url}/challengeCategories`)).pipe(
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
   * get categories by challenge id and active challenges
   * @param challengeCategoryId 
   */
  get_categories_by_id_and_active_challenges(challengeCategoryId) {
    this.show_loading()
    return forkJoin(this.http.get(`${this.url}/challengeCategories/${challengeCategoryId}`),
      this.http.get(`${this.url}/challenges/active`)).pipe(
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
   * get active challenges
   */
  get_active_challenges() {
    this.show_loading()
    return this.http.get(`${this.url}/challenges/active`).pipe(
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
   * create foodjournal post
   * @param challengeId 
   * @param post 
   */
  create_foodjournal_post(challengeId, post) {
    this.show_loading()
    return this.http.post(`${this.url}/challenges/${challengeId}/posts`, post).pipe(
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

 get_posts_pagination(challengeId,skipNum){
  return this.http.get(`${this.url}/challenges/${challengeId}/posts?skipNum=${skipNum}`).pipe(
    catchError(e => {
      let error = e.error.message;
      this.show_alert(error);
      throw error;
    })
  )
 } 

 create_new_comment(postId,comment){
   return this.http.post(`${this.url}/challenges/posts/${postId}/comments`,comment).pipe(
    catchError(e => {
      let error = e.error.message;
      this.show_alert(error);
      throw error;
    })
   )
 }

 get_comments(postId){
  this.show_loading()
  return this.http.get(`${this.url}/challenges/posts/${postId}/comments`).pipe(
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

 create_comment(postId,content){
  this.show_loading()
  return this.http.post(`${this.url}/challenges/posts/${postId}/comments`,content).pipe(
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

 get_nonactiveChallenge_by_challengeCategoryId(challengeCategoryId){
  this.show_loading()
  return this.http.get(`${this.url}/challenges/nonactive/?challengeCategoryId=${challengeCategoryId}`).pipe(
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

 rate_post(postId,rating){
  this.show_loading();
  return this.http.put(`${this.url}/challenges/posts/${postId}/rating`,{rating:rating}).pipe(
    tap(() => {
      this.loading.then(loading => {
        loading.dismiss()
      })
    }),
    catchError(e => {
      let error = e.error;
      if (!e.error) {
        this.show_alert("internet error")
        throw error;
      }
      this.show_alert(e.error);
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
