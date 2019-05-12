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
  errorMessage: string;

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

  async playOffline() {
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 1;

    this.router.navigate(['/play', { o: 0, f, n, w: p.word, c: p.category, i }]);
  }
  async playOnlineCreate() {
    const f = Math.floor(Math.random() * this.playerNumber) + 1;
    const n = this.playerNumber;
    const p = this.wordlistService.generatePrompt();
    const i = 1;
    if (this.roomName === '') {
      this.roomName = 'blank';
    }

    try {
      await this.database.create(
        this.roomName,
        f,
        n,
        p);
      this.router.navigate(['/play', { o: 1, f, n, w: p.word, c: p.category, i }]);
    } catch (error) {
      this.errorMessage = error;
    }
  }
  async playOnlineJoin() {
    const room: string = (this.roomName === '') ? 'blank' : this.roomName;  // Room name
    try {
      const roomInfo = this.database.getRoomInfo(room);
      const prompt = roomInfo[0];  // Prompt
      const fake = roomInfo[1];  // Fake
      const totalPlayers = roomInfo[2];  // Total players
      const thisPlayer = await this.database.join(room, totalPlayers);
      this.router.navigate(['/play', { o: 1, fake, totalPlayers, w: prompt.word, c: prompt.category, thisPlayer }]);
    } catch (error) {
      this.errorMessage = error;
    }
  }
}
