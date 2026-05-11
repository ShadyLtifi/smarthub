import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  getDocs
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private firestore: Firestore) {}

  async getEvents() {

    const eventCollection = collection(
      this.firestore,
      'events'
    );

    const snapshot = await getDocs(eventCollection);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }

}