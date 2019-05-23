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
  message: string;
  isConnected = true;

  constructor(
    private wordlistService: WordlistService,
    private database: DatabaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.playerNumber = 3;
    this.roomName = '';
    this.wordlistService.initialise();

    this.database.
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
    this.message = 'Loading';
    const fake = this.wordlistService.generateFake(this.playerNumber);
    const totalPlayers = this.playerNumber;
    try {
      const prompt = await this.wordlistService.generatePrompt();
      this.router.navigateByUrl('/play', { state: { online: false, fake, totalPlayers, prompt, thisPlayer: 1 } });
    } catch (error) {
      this.message = error;
    }
  }

  async playOnlineCreate() {
    const room: string = (this.roomName === '') ? 'blank' : this.roomName;
    this.message = 'Loading';

    const fake = this.wordlistService.generateFake(this.playerNumber);
    const totalPlayers = this.playerNumber;

    try {
      const prompt = await this.wordlistService.generatePrompt();
      await this.database.create(room, fake, totalPlayers, prompt);
      this.router.navigateByUrl('/play', { state: { online: true, fake, totalPlayers, prompt, thisPlayer: 1 } });
    } catch (error) {
      this.message = error;
    }
  }

  async playOnlineJoin() {
    const room: string = (this.roomName === '') ? 'blank' : this.roomName;
    this.message = 'Loading';

    try {
      const roomInfo = await this.database.getRoomInfo(room);
      const thisPlayer = await this.database.join(room, roomInfo.limit);
      this.router.navigateByUrl('/play', {
        state: { online: true, fake: roomInfo.fake, totalPlayers: roomInfo.limit, prompt: roomInfo.prompt, thisPlayer }
      });
    } catch (error) {
      if (error.code === 'unavailable') {
        error = 'Internet disconnected';
      }
      this.message = error;
    }
  }


}
