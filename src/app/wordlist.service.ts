import { Prompt } from "./prompt";
import { Injectable } from "@angular/core";

import * as wordlist from "./wordlists/wordlist.json";

@Injectable({
  providedIn: "root"
})
export class WordlistService {
  constructor() {}

  generatePrompt(): Prompt {
    let array: Array<Object> = wordlist;

    let prompt: Prompt = Object.assign(
      array[Math.floor(Math.random() * array.length)]
    );

    return prompt;
  }
}
