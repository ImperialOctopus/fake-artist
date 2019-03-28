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
  online: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.playerNumber = 3;
    this.online = false;
  }
  switchMode() {
    this.online = !this.online;
  }

  playOffline() {
    this.router.navigate(['/play', { n: this.playerNumber }]);
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

  onlineJoin() {
    this.router.navigate(['/online', { host: false, name: this.roomName }]);
  }
  onlineCreate() {
    this.router.navigate(['/online', { host: true, name: this.roomName }]);
  }

  /*
  openSettings() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = { online: this.online };
    console.log(dialogConfig);
    const dialogRef = this.dialog.open(SettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.online = result;
    });
  }
  */

}
