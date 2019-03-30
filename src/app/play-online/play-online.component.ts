import { Prompt } from './../prompt';
import { Component, OnInit } from '@angular/core';
import { WordlistService } from '../wordlist.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../database.service';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-play-online',
  templateUrl: './play-online.component.html',
  styleUrls: ['./play-online.component.scss']
})
export class PlayOnlineComponent implements OnInit {
  hosting: boolean;

  roomName: string;
  fake: number;
  playerNumber: number;

  prompt: Prompt;
  player: number;

  wordVisible: boolean;

  constructor(
    private wordlistService: WordlistService,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.hosting = (params.host === '1');
      this.roomName = params.name;
      if (this.roomName === '') {
        this.roomName = 'blank';
      }
      const p = parseInt(params.n, 10);
      if (Number.isInteger(p) && p >= 3 && p <= 32) {
        this.playerNumber = p;
      }
    });
  }

  ngOnInit() {
    this.prompt = new Prompt('', '');

    if (this.hosting) {
      console.log('hosting');
      this.prompt = this.wordlistService.generatePrompt();
      this.fake = Math.floor(Math.random() * this.playerNumber) + 1;
      this.player = 1;
      this.database.create(
        this.roomName,
        this.fake,
        this.playerNumber,
        this.prompt);
    } else {
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
    }
  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }

  back() {
    this.location.back();
  }
}
