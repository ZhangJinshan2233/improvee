import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  
  private online$: Observable<boolean> = undefined;

  constructor(public network: Network, public platform: Platform) {
    this.online$ = Observable.create(observer => {
      observer.next(true);
    }).pipe(mapTo(true));
    this.online$ = this.network.onDisconnect().pipe(mapTo(false))
  }

  public getNetworkStatus(): Observable<boolean> {
    return this.online$;
  }
}
