import { Prompt } from './prompt';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import * as offlineList from './wordlists/wordlist.json';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  constructor(private db: AngularFirestore) { }

  wordlist: Promise<Array<Prompt>>;

  async initialise() {
    this.wordlist = this.loadWordlist();
  }

  async loadWordlist(): Promise<Array<Prompt>> {
    try {
      let list: Array<Prompt> = new Array<Prompt>();
      const col = this.db.collection('wordlist').get();

      await col.forEach((qs) => {
        qs.forEach((doc) => {
          const n: Array<Prompt> = doc.data().words.map((element: string) => {
            return new Prompt(doc.data().category, element);
          });
          list = list.concat(n);
        });
      });
      return list;
    } catch (error) {
      return offlineList.words;
    }
  }

  async generatePrompt(): Promise<Prompt> {
    console.log(this.wordlist);
    const loadedList = await this.wordlist;
    console.log(loadedList);
    return loadedList[Math.floor(Math.random() * loadedList.length)];
  }

  generateFake(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
  }
}
