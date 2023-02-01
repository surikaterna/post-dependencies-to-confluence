import { ConfluenceContent } from './assertConfluenceDocument';
import { TableCellContent, TableRow } from './assertTableHeaderRow';

export interface TableContentRow extends ConfluenceContent {
  type: 'tableRow';
  content: Array<TableCellContent>;
}

export const assertTableContentRow = (row: TableRow): row is TableContentRow => row.content?.[0]?.type === 'tableCell';
