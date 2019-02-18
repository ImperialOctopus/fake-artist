import { Prompt } from './prompt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  constructor() { }

  generatePrompt(): Prompt {
    var p: Prompt = {
      word: 'Wow',
      category: 'Windstorm'
    };
    return p;
  }
}
