import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from "rxjs";

@Injectable()
export class OfferManagerService {
  private url = 'http://localhost:3000';
  private socket;
  public offerEvent: Subject<any> = new Subject();

  constructor() {
    this.socket = io(this.url);
    this.listenToOffers();
  }

  public sendOffer(data) {
    this.socket.emit('sendoffer', data);
  }

  public addUser(userId) {
    this.socket.emit('adduser', userId);
  }

  private listenToOffers() {
      this.socket.on('gotoffer', (message) => {
        this.offerEvent.next(message);
      });
  }

  // public getOffer = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('gotoffer', (message) => {
  //       observer.next(message);
  //     });
  //   });
  // }
}
