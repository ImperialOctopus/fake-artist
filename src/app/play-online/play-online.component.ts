import { Component, OnInit } from '@angular/core';
import { Prompt } from '../prompt';
import { WordlistService } from '../wordlist.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.hosting = params.host;
      this.roomName = params.name;
    });
  }

  ngOnInit() {

  }

  back() {
    this.location.back();
  }
}
