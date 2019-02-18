import { Prompt } from "./prompt";
import { Injectable } from "@angular/core";
import * as data from "../wordlist/words.json";

@Injectable({
  providedIn: "root"
})
export class WordlistService {
  constructor() {}

  generatePrompt(): Prompt {
    var p: Prompt = data.words[Math.floor(Math.random() * data.words.length)];
    return p;
  }
}
