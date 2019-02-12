import { Router } from 'aurelia-router';

export class Menu {
  router;
  constructor(router) {
    this.router = router;
  }
  header = "Header";
  playerNumber;
  play() {
    //this.header = this.playerNumber;
    alert(" ");
    this.router.navigate('play');
  }
}
