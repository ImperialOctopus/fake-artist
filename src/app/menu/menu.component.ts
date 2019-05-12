import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordlistService } from '../wordlist.service';
import { DatabaseService } from '../database.service';
import { Prompt } from '../prompt';

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

    this.router.navigate(['/play', { o: 0, f, n, w: p.word, c: p.category, i }]);
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
      f,
      n,
      p);
    this.router.navigate(['/play', { o: 1, f, n, w: p.word, c: p.category, i }]);
  }
  playOnlineJoin() {
    const r: string = (this.roomName === '') ? 'blank' : this.roomName;  // Room name
    let f: number;                  // Fake player
    let n: number;                  // Total players
    let p: Prompt;                  // Prompt
    let i: number;                  // This player's number

    this.database.getRoomInfo(r).then((roomInfo) => {
      p = roomInfo[0];  // Prompt
      f = roomInfo[1];  // Fake
      n = roomInfo[2];  // Total players
      this.database.join(r, n).then((playerN) => {
        i = playerN;
        this.router.navigate(['/play', { o: 1, f, n, w: p.word, c: p.category, i }]);
      });
    });
  }
}
