import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import * as data from "./words.json";

@inject(Router)
export class Play {
  constructor(private router: Router) {
    this.router = router;
  }
  category: string;
  word: string;
  wordVisible: boolean;
  playerNumber: number;
  fakePlayer: number;
  selectedPlayer: number;
  selectedPlayerFake: boolean;

  activate(params) {
    var p = parseInt(params.playerNumber);
    if (Number.isInteger(p) && p >= 1 && p <= 8) {
      this.playerNumber = p;
    } else {
      this.playerNumber = 1;
    }
    this.fakePlayer = Math.floor(Math.random() * this.playerNumber) + 1;
    this.selectPlayer(1);
    this.generateWord();
    this.wordVisible = false;
  }

  selectPlayer(n) {
    if (n < 1) {
      n = this.playerNumber;
    } else if (n > this.playerNumber) {
      n = 1;
    }
    this.selectedPlayer = n;
    this.selectedPlayerFake = this.selectedPlayer == this.fakePlayer;
  }
  nextPlayer() {
    this.selectPlayer(this.selectedPlayer + 1);
    this.wordVisible = false;
  }
  lastPlayer() {
    this.selectPlayer(this.selectedPlayer - 1);
    this.wordVisible = false;
  }

  generateWord() {
    var random = data.words[Math.floor(Math.random() * data.words.length)];
    this.category = random.category;
    this.word = random.word;
  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }
}
