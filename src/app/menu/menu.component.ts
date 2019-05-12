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
    const fake = this.generateFake(this.playerNumber);
    const totalPlayers = this.playerNumber;
    const prompt = this.wordlistService.generatePrompt();

    this.router.navigate(['/play', { o: 0, f: fake, n: totalPlayers, w: prompt.word, c: prompt.category, i: 1 }]);
  }
  async playOnlineCreate() {
    const room: string = (this.roomName === '') ? 'blank' : this.roomName;

    const fake = this.generateFake(this.playerNumber);
    const totalPlayers = this.playerNumber;
    const prompt = this.wordlistService.generatePrompt();

    try {
      await this.database.create(room, fake, totalPlayers, prompt);
      this.router.navigate(['/play', { o: 1, f: fake, n: totalPlayers, w: prompt.word, c: prompt.category, i: 1 }]);
    } catch (error) {
      this.errorMessage = error;
    }
  }
  async playOnlineJoin() {
    const room: string = (this.roomName === '') ? 'blank' : this.roomName;

    try {
      const roomInfo = await this.database.getRoomInfo(room);
      const thisPlayer = await this.database.join(room, roomInfo.limit);
      this.router.navigate(['/play',
        { o: 1, f: roomInfo.fake, n: roomInfo.limit, w: roomInfo.prompt.word, c: roomInfo.prompt.category, i: thisPlayer }]);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  generateFake(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
  }
}
