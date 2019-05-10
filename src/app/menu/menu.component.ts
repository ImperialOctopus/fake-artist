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
    const r = 'Offline';
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 0;

    this.router.navigate(['/play', { r, f, n, p, i }]);
  }
  playOnlineCreate() {
    const r = this.roomName;
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 1;

    this.database.create(
      this.roomName,
      Math.floor(Math.random() * this.playerNumber) + 1,
      this.playerNumber,
      this.wordlistService.generatePrompt());
    this.router.navigate(['/play', { r, f, n, p, i }]);
  }
  playOnlineJoin() {
    let r = this.roomName;  // Room name
    let f;                  // Fake player
    let n;                  // Total players
    let p;                  // Prompt
    let i;                  // This player's number

    this.database.getRoomInfo(r).then((roomInfo) => {
      p = roomInfo[0];
      f = roomInfo[1];
      n = roomInfo[2];
      this.database.join(r, n).then((playerN) => {
        i = playerN;
        if (playerN === 0) {
          r = 'Error Joining Room';
        }
      });
    });
    this.router.navigate(['/play', { r, f, n, p, i }]);
  }
}
