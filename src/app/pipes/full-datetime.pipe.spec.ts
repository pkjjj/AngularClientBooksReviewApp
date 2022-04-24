import { FullDatetimePipe } from './full-datetime.pipe';

describe('FullDatetimePipe', () => {
  it('create an instance', () => {
    const pipe = new FullDatetimePipe();
    expect(pipe).toBeTruthy();
  });
});
