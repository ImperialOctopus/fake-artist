import { Prompt } from "./prompt";
import { Injectable } from "@angular/core";

import * as animals from "./wordlists/animals.json";
import * as food from "./wordlists/food.json";
import * as organs from "./wordlists/organs.json";

@Injectable({
  providedIn: "root"
})
export class WordlistService {
  constructor() {}

  generatePrompt(): Prompt {
    let array: Array<Object> = [];

    array = array.concat(animals);
    array = array.concat(food);
    array = array.concat(organs);

    let prompt: Prompt = Object.assign(
      array[Math.floor(Math.random() * array.length)]
    );

    return prompt;
  }
}
