import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Play {
  constructor(private router: Router) {
    this.router = router;
  }
  category;
  word;
  wordVisible;

  playerNumber;
  fakePlayer;
  selectedPlayer;
  selectedPlayerFake;

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
    this.category = "Food";
    this.word = "Macaroni Cheese";
  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }
}
