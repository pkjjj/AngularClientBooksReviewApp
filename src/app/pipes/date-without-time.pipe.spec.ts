import { DateWithoutTimePipe } from './date-without-time.pipe';

describe('DateWithoutTimePipe', () => {
  it('create an instance', () => {
    const pipe = new DateWithoutTimePipe();
    expect(pipe).toBeTruthy();
  });
});
