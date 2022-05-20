import { TestBed } from '@angular/core/testing';
import { isObservable } from 'rxjs';
import { IMessage } from '../models/Message';

import { MessageService } from './message.service';

describe('MessagesService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return archived as empty Observable ', () => {
    expect(service.getArchived()).toBeTruthy(isObservable);
  });

  it('should return messages as empty Observable', () => {
    expect(service.messages).toBeTruthy(isObservable);
  });
});
