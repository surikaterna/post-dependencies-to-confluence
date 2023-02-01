import { Dependency } from './parseDependencies';

export const mutMergeDependencies = (wikiDependencies: Array<Dependency>, serviceDependencies: Array<Dependency>, name: string): Array<Dependency> => {
  if (wikiDependencies.length === 0) {
    return serviceDependencies;
  }

  wikiDependencies.forEach((dep) => {
    dep.systems = joinServiceNames(removeServiceName(splitServiceNames(dep.systems), name));
  });

  serviceDependencies.forEach((serviceDep) => {
    const wikiDep = wikiDependencies.find((dep) => serviceDep.name === dep.name && serviceDep.version === dep.version);

    if (wikiDep) {
      wikiDep.systems = joinServiceNames(addServiceName(splitServiceNames(wikiDep.systems), name));
    } else {
      wikiDependencies.push({ ...serviceDep, systems: name });
    }
  });

  return sortDependenciesAsc(wikiDependencies);
};

const splitServiceNames = (services?: string): Array<string> => services?.split(', ') ?? [];
const sortNamesAsc = (serviceNames: Array<string>): Array<string> => serviceNames.sort((a, b) => a.localeCompare(b));
const sortDependenciesAsc = (dependencies: Array<Dependency>): Array<Dependency> =>
  dependencies.sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version));
const joinServiceNames = (serviceNames: Array<string>): string => sortNamesAsc(serviceNames).join(', ');
const removeServiceName = (names: Array<string>, name: string): Array<string> => names.filter((n) => n !== name);
const addServiceName = (names: Array<string>, name: string): Array<string> => names.concat(name);
