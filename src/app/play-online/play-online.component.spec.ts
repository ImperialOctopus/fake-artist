import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayOnlineComponent } from './play-online.component';

describe('PlayOnlineComponent', () => {
  let component: PlayOnlineComponent;
  let fixture: ComponentFixture<PlayOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
