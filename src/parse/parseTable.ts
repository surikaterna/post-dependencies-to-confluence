import { Dependency } from '../parseDependencies';
import { assertConfluenceDocument } from './assertConfluenceDocument';
import { assertTableContent, Table } from './assertTableContent';
import { assertTableContentRow } from './assertTableContentRow';
import { assertTableHeaderRow } from './assertTableHeaderRow';
import { convertTableRowsToDependencies } from './convertTableRowsToDependencies';
import { getDependencyPropIndexMapping } from './getDependencyPropIndexMapping';

export function parseTable(value: unknown): Array<Dependency> {
  if (!assertConfluenceDocument(value)) {
    throw new Error('Not a valid Confluence document');
  }

  try {
    const table: Table | undefined = value.content.find(assertTableContent);

    if (!table) {
      return [];
    }

    const tableHeaderRow = table.content.find(assertTableHeaderRow);
    const tableContentRows = table.content.filter(assertTableContentRow);
    const dependencyPropIndexMapping = getDependencyPropIndexMapping(tableHeaderRow);

    return convertTableRowsToDependencies(tableContentRows, dependencyPropIndexMapping);
  } catch (err) {
    return [];
  }
}
