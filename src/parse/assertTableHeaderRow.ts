import { ConfluenceContent } from './assertConfluenceDocument';

export interface TableRow extends ConfluenceContent {
  type: 'tableRow';
  content: Array<TableHeader> | Array<TableCellContent>;
}

export interface TableHeaderRow extends ConfluenceContent {
  type: 'tableRow';
  content: Array<TableHeader>;
}

export interface TableHeader extends ConfluenceContent {
  type: 'tableHeader';
  attrs: TableCellAttrs;
  content: Array<Paragraph>;
}

export interface TableCellContent extends ConfluenceContent {
  type: 'tableCell';
  attrs: TableCellAttrs;
  content: Array<Paragraph>;
}

export interface TableCellAttrs {
  colspan: number;
  rowspan: number;
  colwidth: Array<number>;
}

export interface Paragraph extends ConfluenceContent {
  type: 'paragraph';
  content?: Array<Text>;
}

export interface Text extends ConfluenceContent {
  type: 'text';
  text: string;
  marks?: Array<TextMarks>;
}

type TextMarks = StrongTextMark | AlignmentTextMark;

interface StrongTextMark {
  type: 'strong';
}

interface AlignmentTextMark {
  type: 'alignment';
  attrs: {
    align: string;
  };
}

export const assertTableHeaderRow = (row: TableRow): row is TableHeaderRow => row.content?.[0]?.type === 'tableHeader';
