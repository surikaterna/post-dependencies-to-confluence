import { Dependency } from '../parseDependencies';
import { TableContentRow } from './assertTableContentRow';
import { getCellValue } from './getCellValue';
import { DependencyPropIndexMapping } from './getDependencyPropIndexMapping';

export const convertTableRowsToDependencies = (rows: Array<TableContentRow>, mapping: DependencyPropIndexMapping): Array<Dependency> =>
  rows.reduce((acc, row) => {
    acc.push({
      name: getCellValue(row, mapping.name),
      version: getCellValue(row, mapping.version),
      license: getCellValue(row, mapping.license),
      systems: getCellValue(row, mapping.systems)
    });
    return acc;
  }, <Array<Dependency>>[]);
