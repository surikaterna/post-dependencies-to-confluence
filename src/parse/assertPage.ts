import { AxiosResponse } from 'axios';
import { assertNonNullObject } from '../assertNonNullObject';

export interface Page {
  id: string;
  type: string;
  title: string;
  version: {
    number: number;
  };
}

export const assertPage = (res: AxiosResponse<unknown>): res is AxiosResponse<Page> => {
  if (!assertNonNullObject(res.data)) {
    return false;
  }

  return 'type' in res.data && res.data.type === 'page';
};
