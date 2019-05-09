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
    const p = this.wordlistService.generatePrompt();

    this.router.navigate(['/play', { n: this.playerNumber }]);
  }
  playOnlineCreate() {
    const r = this.roomName;
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const p = this.wordlistService.generatePrompt();

    this.database.create(
      this.roomName,
      Math.floor(Math.random() * this.playerNumber) + 1,
      this.playerNumber,
      this.wordlistService.generatePrompt());

    this.router.navigate(['/play', { name: this.roomName, n: this.playerNumber }]);
  }
  playOnlineJoin() {
    const r = this.roomName;
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const p = this.wordlistService.generatePrompt();

    this.database.getRoomInfo(this.roomName).then((roomInfo) => {
      console.log(roomInfo);
      this.prompt = roomInfo[0];
      this.fake = roomInfo[1];
      this.playerNumber = roomInfo[2];
      this.database.join(this.roomName, this.playerNumber).then((n) => {
        this.player = n;
        if (n === 0) {
          this.roomName = 'Error Joining Room';
          this.prompt.category = 'Error joining room';
          this.prompt.word = '';
        }
      });
    });
    this.router.navigate(['/play', { host: '0', name: this.roomName }]);
  }
}
