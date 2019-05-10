import { Prompt } from './prompt';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  create(roomName, fake, playerNumber, prompt: Prompt): void {
    this.db.collection('rooms').doc(roomName).set({
      category: prompt.category,
      fake,
      playerLimit: playerNumber,
      players: 1,
      word: prompt.word
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
  getRoomInfo(roomName): Promise<Array<any>> {
    let prompt: Prompt;
    let fake: number;
    let limit: number;

    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);
    return sfDocRef.get().then((doc) => {
      if (doc.exists) {
        prompt = new Prompt(doc.data().category, doc.data().word);
        fake = doc.data().fake;
        limit = doc.data().playerLimit;
        return [prompt, fake, limit];
      } else {
        throw new Error('No such room');
      }
    }).catch((error) => {
      console.log('Room join failed:', error);
      return null;
    });
  }
  join(roomName, limit): Promise<number> {
    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);
    return this.db.firestore.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(sfDocRef).then((sfDoc) => {
        if (sfDoc.data().players < limit) {
          const n = sfDoc.data().players + 1;
          transaction.update(sfDocRef, { players: n });
          return n;
        } else {
          throw new Error('Room full');
        }
      });
    }).catch((error) => {
      console.log('Room join failed: ', error);
      return 0;
    });
  }
}
