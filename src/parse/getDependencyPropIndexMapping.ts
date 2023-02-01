import { TableHeader, TableHeaderRow } from './assertTableHeaderRow';

export interface DependencyPropIndexMapping {
  name: number;
  version: number;
  license: number;
  systems: number;
}

export function getDependencyPropIndexMapping(row?: TableHeaderRow): DependencyPropIndexMapping {
  if (!row) {
    return {
      name: 0,
      version: 1,
      license: 2,
      systems: 3
    };
  }

  return {
    name: row.content.findIndex(findPropIndex('name')),
    version: row.content.findIndex(findPropIndex('version')),
    license: row.content.findIndex(findPropIndex('license')),
    systems: row.content.findIndex(findPropIndex('system', true))
  };
}

const findPropIndex =
  (searchValue: string, checkStart = false) =>
  (tableHeader: TableHeader) =>
    tableHeader.content.some((paragraph) =>
      paragraph.content?.some((text) => (checkStart ? text.text.toLowerCase().startsWith(searchValue) : text.text.toLowerCase() === searchValue))
    );
