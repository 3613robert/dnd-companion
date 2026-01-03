import { TestBed } from '@angular/core/testing';

import { CharacterStorageService } from './character-storage';

describe('CharacterStorage', () => {
  let service: CharacterStorageService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
