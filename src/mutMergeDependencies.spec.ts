import { Dependency } from './parseDependencies';
import { mutMergeDependencies } from './mutMergeDependencies';

describe('#mutMergeDependencies', () => {
  it('should merge the dependencies, sorted by name and then version', () => {
    const name = 'test-service';
    const wikiDependencies: Array<Dependency> = [
      {
        name: 'dep-a',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'a-service, b-service, z-service'
      },
      {
        name: 'dep-b',
        version: '^2.2.0',
        license: 'MIT',
        systems: `b-service, ${name}, z-service`
      },
      {
        name: 'dep-c',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'z-service'
      },
      {
        name: 'dep-e',
        version: '^2.2.0',
        license: 'MIT',
        systems: `a-service, ${name}`
      },
      {
        name: 'dep-f',
        version: '^2.2.0',
        license: 'MIT',
        systems: `${name}, z-service`
      }
    ];

    const serviceDependencies: Array<Dependency> = [
      {
        name: 'dep-e',
        version: '3.0.0',
        license: 'MIT',
        systems: name
      },
      {
        name: 'dep-d',
        version: '^2.2.0',
        license: 'MIT',
        systems: name
      },
      {
        name: 'dep-f',
        version: '2.0.0',
        license: 'MIT',
        systems: name
      },
      {
        name: 'dep-b',
        version: '^2.2.0',
        license: 'MIT',
        systems: name
      }
    ];

    const dependencies = mutMergeDependencies(wikiDependencies, serviceDependencies, name);

    expect(dependencies).toEqual([
      {
        name: 'dep-a',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'a-service, b-service, z-service'
      },
      {
        name: 'dep-b',
        version: '^2.2.0',
        license: 'MIT',
        systems: `b-service, ${name}, z-service`
      },
      {
        name: 'dep-c',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'z-service'
      },
      {
        name: 'dep-d',
        version: '^2.2.0',
        license: 'MIT',
        systems: name
      },
      {
        name: 'dep-e',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'a-service'
      },
      {
        name: 'dep-e',
        version: '3.0.0',
        license: 'MIT',
        systems: name
      },
      {
        name: 'dep-f',
        version: '^2.2.0',
        license: 'MIT',
        systems: 'z-service'
      },
      {
        name: 'dep-f',
        version: '2.0.0',
        license: 'MIT',
        systems: name
      }
    ]);
  });
});
