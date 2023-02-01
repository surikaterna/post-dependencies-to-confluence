import { TableContentRow } from './assertTableContentRow';

export const getCellValue = (row: TableContentRow, index: number): string => row.content[index].content[0].content?.[0].text ?? '';
