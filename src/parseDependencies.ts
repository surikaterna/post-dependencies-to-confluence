export interface Dependency {
  name: string;
  version: string;
  license: string;
  systems?: string;
}

const assertArray = (data: unknown): data is Array<unknown> => Array.isArray(data);
const assertObject = (data: unknown): data is object => typeof data === 'object';
const assertDependency = (dep: unknown): dep is Dependency => assertObject(dep) && 'name' in dep && 'version' in dep && 'license' in dep;
const assertDependencies = (data: Array<unknown>): data is Array<Dependency> => data.every(assertDependency);

export const parseDependencies = (json: string): Array<Dependency> => {
  const dependencies = <unknown>JSON.parse(json);

  if (!assertArray(dependencies)) {
    throw new Error('Dependencies is not an array');
  }

  if (!assertDependencies(dependencies)) {
    throw new Error('Not a valid dependency list');
  }

  return dependencies;
};
