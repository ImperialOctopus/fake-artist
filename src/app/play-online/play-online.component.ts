import { Component, OnInit } from '@angular/core';
import { Prompt } from '../prompt';
import { WordlistService } from '../wordlist.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-play-online',
  templateUrl: './play-online.component.html',
  styleUrls: ['./play-online.component.scss']
})
export class PlayOnlineComponent implements OnInit {
  hosting: boolean;
  roomName: string;

  constructor(
    private wordlistService: WordlistService,
    private database: DatabaseService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.hosting = params.host;
      this.roomName = params.name;
    });
  }

  ngOnInit() {
    this.database.create();
  }

  back() {
    this.location.back();
  }
}
