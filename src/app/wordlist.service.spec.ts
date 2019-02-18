import { TestBed } from '@angular/core/testing';

import { WordlistService } from './wordlist.service';

describe('WordlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordlistService = TestBed.get(WordlistService);
    expect(service).toBeTruthy();
  });
});
