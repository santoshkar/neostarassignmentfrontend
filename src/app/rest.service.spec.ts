import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      FormsModule, HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
