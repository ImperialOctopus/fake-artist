import { Component, OnInit } from '@angular/core';
import { Prompt } from '../prompt';
import { WordlistService } from '../wordlist.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  prompt: Prompt;
  playerNumber: number = 3;
  fakePlayer: number;
  wordVisible: boolean;
  selectedPlayer: number;
  selectedPlayerFake: boolean;

  constructor(private wordlistService: WordlistService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      var p = parseInt(params.n);
      if (Number.isInteger(p) && p >= 3 && p <= 32) {
        this.playerNumber = p;
      }
     });
  }

  ngOnInit() {
    this.prompt = this.wordlistService.generatePrompt();

    this.fakePlayer = Math.floor(Math.random() * this.playerNumber) + 1;
    this.selectPlayer(1);
    this.wordVisible = false;
  }

  back() {
    this.router.navigate(['/']);
  }

  selectPlayer(n) {
    if (n < 1) {
      n = this.playerNumber;
    } else if (n > this.playerNumber) {
      n = 1;
    }
    this.selectedPlayer = n;
    this.selectedPlayerFake = this.selectedPlayer == this.fakePlayer;
  }
  nextPlayer() {
    this.selectPlayer(this.selectedPlayer + 1);
    this.wordVisible = false;
  }
  lastPlayer() {
    this.selectPlayer(this.selectedPlayer - 1);
    this.wordVisible = false;
  }

  toggleWord() {
    this.wordVisible = !this.wordVisible;
  }
}
