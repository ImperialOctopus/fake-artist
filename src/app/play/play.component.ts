import { Prompt } from '../prompt';
import { Component, OnInit } from '@angular/core';
import { WordlistService } from '../wordlist.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  online: boolean;
  fakePlayer: number;
  totalPlayers: number;
  prompt: Prompt;
  thisPlayer: number;

  wordVisible: boolean;

  constructor(
    private wordlistService: WordlistService,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.online = params.o;
      this.fakePlayer = parseInt(params.f, 10);
      this.totalPlayers = parseInt(params.n, 10);
      this.prompt = new Prompt(params.c, params.w);
      this.thisPlayer = parseInt(params.i, 10);
    });
  }

  ngOnInit() {
    console.log(this.prompt.word);
  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }

  numberUp() {
    if (this.thisPlayer < this.totalPlayers) {
      this.thisPlayer += 1;
    } else if (this.thisPlayer === this.totalPlayers) {
      this.thisPlayer = 1;
    }
  }
  numberDown() {
    if (this.thisPlayer > 0) {
      this.thisPlayer -= 1;
    } else if (this.thisPlayer === 0) {
      this.thisPlayer = this.totalPlayers;
    }
  }

  back() {
    this.location.back();
  }
}
