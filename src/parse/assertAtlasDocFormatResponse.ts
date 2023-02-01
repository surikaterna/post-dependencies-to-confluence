import { AxiosResponse } from 'axios';
import { assertNonNullObject } from '../assertNonNullObject';

interface AtlasDocFormatData {
  body: {
    atlas_doc_format: {
      value: string;
    };
  };
}

export const assertAtlasDocFormatResponse = (res: AxiosResponse<unknown>): res is AxiosResponse<AtlasDocFormatData> => {
  if (!assertNonNullObject(res.data)) {
    return false;
  }

  if (!('body' in res.data) || !assertNonNullObject(res.data.body)) {
    return false;
  }

  if (!('atlas_doc_format' in res.data.body) || !assertNonNullObject(res.data.body.atlas_doc_format)) {
    return false;
  }

  if (!('value' in res.data.body.atlas_doc_format)) {
    return false;
  }

  return typeof res.data.body.atlas_doc_format.value === 'string';
};
