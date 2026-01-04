import { TestBed } from '@angular/core/testing';

import { CharacterState } from './character-state';

describe('CharacterState', () => {
  let service: CharacterState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
