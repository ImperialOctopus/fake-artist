import { Prompt } from './prompt';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as wordlist from './wordlists/wordlist.json';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  constructor(private db: AngularFirestore) { }

  async generatePrompt(): Promise<Prompt> {

    const c = await this.db.collection('wordlist').get();
    c.subscribe(queriedItems => {
      console.log(queriedItems);
    });
    return null;
  }

  async generatePromptOffline(): Promise<Prompt> {
    const array: Array<object> = wordlist.words;

    return Object.assign(
      array[Math.floor(Math.random() * array.length)]
    );
  }
}
