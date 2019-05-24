import { Prompt } from './prompt';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  async create(roomName: string, fake: number, playerNumber: number, prompt: Prompt): Promise<void> {
    roomName = this.prepareRoomName(roomName);
    return this.db.collection('rooms').doc(roomName).set({
      category: prompt.category,
      fake,
      playerLimit: playerNumber,
      players: 1,
      word: prompt.word
    })
      .catch((error) => {
        throw new error('Write error: ' + error);
      });
  }
  async getRoomInfo(roomName: string): Promise<{ prompt: Prompt, fake: number, limit: number }> {
    roomName = this.prepareRoomName(roomName);
    let prompt: Prompt;
    let fake: number;
    let limit: number;

    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);
    const doc = await sfDocRef.get({ source: 'server' });
    if (doc.exists) {
      prompt = new Prompt(doc.data().category, doc.data().word);
      fake = doc.data().fake;
      limit = doc.data().playerLimit;
      return { prompt, fake, limit };
    } else {
      throw new Error('No such room');
    }
  }
  async join(roomName: string, limit: number): Promise<number> {
    roomName = this.prepareRoomName(roomName);
    const sfDocRef = this.db.firestore.collection('rooms').doc(roomName);

    return this.db.firestore.runTransaction(
      async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (sfDoc.data().players < limit) {
          const n = sfDoc.data().players + 1;
          transaction.update(sfDocRef, { players: n });
          return n;
        } else {
          throw new Error('Room full (' + limit + '/' + limit + ')');
        }
      });
  }

  prepareRoomName(roomName: string): string {
    return roomName.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
}
