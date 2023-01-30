import { someFunc } from './someFunc';

describe('#someFunc', () => {
  it('returns the input', async () => {
    expect(await someFunc('')).toBe('');
  });
});
