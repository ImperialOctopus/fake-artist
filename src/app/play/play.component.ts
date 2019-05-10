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
      this.fakePlayer = params.f;
      this.totalPlayers = params.n;
      this.prompt = new Prompt(params.c, params.w);
      this.thisPlayer = params.i;
    });
  }

  ngOnInit() {

  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }

  back() {
    this.location.back();
  }
}
