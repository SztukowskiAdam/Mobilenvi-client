import { TestBed } from '@angular/core/testing';

import { PostifyService } from './postify.service';

describe('PostifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostifyService = TestBed.get(PostifyService);
    expect(service).toBeTruthy();
  });
});
