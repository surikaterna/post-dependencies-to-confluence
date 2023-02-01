import { ConfluenceContent } from './assertConfluenceDocument';
import { TableRow } from './assertTableHeaderRow';

export interface Table extends ConfluenceContent {
  type: 'table';
  attrs: TableAttrs;
  content: Array<TableRow>;
}

export interface TableAttrs {
  layout: string;
  localId: string;
}

export const assertTableContent = (content: ConfluenceContent): content is Table => content.type === 'table';
