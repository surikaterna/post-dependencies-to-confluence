import { Dependency } from './parseDependencies';

export const createMarkup = (dependencies: Array<Dependency>): string => {
  const header = '||Name||Version||License||System(s)||\n';
  const rows = dependencies.map((dep) => `||${dep.name}||${dep.version}||${dep.license}||${dep.systems ?? ''}`).join('\n');
  return `${header}${rows}`;
};
