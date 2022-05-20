import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('port should equal 5000', () => {
    expect(service.port).toEqual("5000");
  })

  it('apiBase should equal "http://localhost/" ', () => {
    expect(service.apiBase).toEqual("http://localhost/");
  })


});
