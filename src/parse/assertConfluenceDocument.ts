export interface ConfluenceDocument {
  type: 'doc';
  content: Array<ConfluenceContent>;
  version: number;
}

export interface ConfluenceContent {
  type: string;
}

export const assertConfluenceDocument = (data: unknown): data is ConfluenceDocument =>
  typeof data === 'object' && data !== null && 'type' in data && data.type === 'doc';
