import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  room = 'test';

  create() {
    this.firestore.collection('rooms').doc(this.room).set({
      category: 'Colours',
      fake: 4,
      playerLimit: 6,
      players: 3,
      word: 'Red'
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}
