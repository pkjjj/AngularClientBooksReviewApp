import { TestBed } from '@angular/core/testing';

import { PasswwordConfirmationValidatorService } from './password-confirmation-validator.service';

describe('PasswwordConfirmationValidatorService', () => {
  let service: PasswwordConfirmationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswwordConfirmationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
