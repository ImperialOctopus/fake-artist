import { Prompt } from './prompt';
import { Injectable } from '@angular/core';

import * as wordlist from './wordlists/wordlist.json';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  constructor() { }

  async generatePrompt(): Promise<Prompt> {
    const array: Array<object> = wordlist.words;

    const prompt: Prompt = Object.assign(
      array[Math.floor(Math.random() * array.length)]
    );

    return prompt;
  }
}
