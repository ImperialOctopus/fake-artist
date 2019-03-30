import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  playerNumber: number;
  roomName: string;
  formState: number;

  online: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.playerNumber = 3;
    this.online = false;
    this.formState = 0;
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
    this.router.navigate(['/play', { n: this.playerNumber }]);
  }

  join() {
    this.router.navigate(['/online', { host: '0', name: this.roomName }]);
  }
  hostSettings() {
    this.formState = 2;
  }

  hostCancel() {
    this.formState = 1;
  }
  host() {
    this.router.navigate(['/online', { host: '1', name: this.roomName, n: this.playerNumber }]);
  }

  switchMode() {
    if (this.formState === 0) {
      this.formState = 1;
    } else if (this.formState === 1) {
      this.formState = 0;
    }
  }
}
