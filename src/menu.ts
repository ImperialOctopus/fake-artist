import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Menu {
  constructor(private router: Router) {
    this.router = router;
  }

  playerNumber = 1;
  play() {
    this.router.navigateToRoute("play", { playerNumber: this.playerNumber });
  }
  info() {}

  numberUp() {
    if (this.playerNumber < 8) {
      this.playerNumber += 1;
    }
  }
  numberDown() {
    if (this.playerNumber > 1) {
      this.playerNumber -= 1;
    }
  }
}
