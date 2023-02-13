import { parseDependencies } from 'parseDependencies';

describe('#parseDependencies', () => {
  it('should add parse the dependencies and add service name', () => {
    const input = JSON.stringify([
      {
        name: 'dep-d',
        version: '^2.2.0',
        license: 'MIT'
      },
      {
        name: 'dep-f',
        version: '2.0.0',
        license: 'MIT'
      }
    ]);

    const serviceName = 'service-name';
    const actual = parseDependencies(input, serviceName);
    expect(actual).toEqual([
      {
        name: 'dep-d',
        version: '^2.2.0',
        license: 'MIT',
        systems: serviceName
      },
      {
        name: 'dep-f',
        version: '2.0.0',
        license: 'MIT',
        systems: serviceName
      }
    ]);
  });
});
