import { Prompt } from '../prompt';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    this.online = window.history.state.online;
    this.fakePlayer = window.history.state.fake;
    this.totalPlayers = window.history.state.totalPlayers;
    this.prompt = window.history.state.prompt;
    this.thisPlayer = window.history.state.thisPlayer;

    if (this.online === undefined) {
      this.back();
    }
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
    this.wordVisible = false;
  }
  numberDown() {
    if (this.thisPlayer > 1) {
      this.thisPlayer -= 1;
    } else if (this.thisPlayer === 1) {
      this.thisPlayer = this.totalPlayers;
    }
    this.wordVisible = false;
  }

  back() {
    this.router.navigateByUrl('/');
  }
}
