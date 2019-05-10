import { Prompt } from './prompt';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  create(roomName: string, fake: number, playerNumber: number, prompt: Prompt): void {
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
  async getRoomInfo(roomName: string): Promise<Array<any>> {
    let prompt: Prompt;
    let fake: number;
    let limit: number;

    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);
    try {
      const doc = await sfDocRef.get();
      if (doc.exists) {
        prompt = new Prompt(doc.data().category, doc.data().word);
        fake = doc.data().fake;
        limit = doc.data().playerLimit;
        return [prompt, fake, limit];
      } else {
        throw new Error('No such room');
      }
    } catch (error) {
      throw new Error('Room join failed: ' + error);
    }
  }
  async join(roomName: string, limit: number): Promise<number> {
    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);
    try {
      return this.db.firestore.runTransaction((transaction) => {
        return transaction.get(sfDocRef).then((sfDoc) => {
          if (sfDoc.data().players < limit) {
            const n = sfDoc.data().players + 1;
            transaction.update(sfDocRef, { players: n });
            return n;
          } else {
            throw new Error('Room full');
          }
        });
      });
    } catch (error) {
      throw new Error('Room join failed: ' + error);
    }
  }
}
