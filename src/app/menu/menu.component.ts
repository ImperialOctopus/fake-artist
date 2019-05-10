import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordlistService } from '../wordlist.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  playerNumber: number;
  roomName: string;

  constructor(
    private wordlistService: WordlistService,
    private database: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.playerNumber = 3;
    this.roomName = '';
  }

  numberUp() {
    if (this.playerNumber < 32) {
      this.playerNumber += 1;
    }
  }
  numberDown() {
    if (this.playerNumber > 3) {
      this.playerNumber -= 1;
    }
  }

  playOffline() {
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 1;

    this.router.navigate(['/play', { o: false, f, n, p, i }]);
  }
  playOnlineCreate() {
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 1;

    if (this.roomName === '') {
      this.roomName = 'blank';
    }

    this.database.create(
      this.roomName,
      Math.floor(Math.random() * n) + 1,
      n,
      p);
    this.router.navigate(['/play', { o: true, f, n, w: p.word, c: p.category, i }]);
  }
  playOnlineJoin() {
    let r = this.roomName;  // Room name
    let f;                  // Fake player
    let n;                  // Total players
    let p;                  // Prompt
    let i;                  // This player's number

    if (this.roomName === '') {
      this.roomName = 'blank';
    }

    this.database.getRoomInfo(r).then((roomInfo) => {
      p = roomInfo[0];
      f = roomInfo[1];
      i = roomInfo[2];
      this.database.join(r, i).then((playerN) => {
        i = playerN;
        if (playerN === 0) {
          r = 'Error Joining Room';
        }
      });
    });
    this.router.navigate(['/play', { o: true, f, n, p, i }]);
  }
}
