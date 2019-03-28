import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  playerNumber: number;
  online: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.playerNumber = 3;
    this.online = false;
  }

  play() {
    this.router.navigate(['/play', this.playerNumber]);
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

  switchMode() {
    this.online = !this.online;
  }

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
}
