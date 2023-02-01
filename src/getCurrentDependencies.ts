import * as core from '@actions/core';
import axios from 'axios';
import { assertAtlasDocFormatResponse } from './parse/assertAtlasDocFormatResponse';
import { parseTable } from './parse/parseTable';
import { Dependency } from './parseDependencies';

export const getCurrentDependencies = async (): Promise<Array<Dependency>> => {
  const confluenceUrl = getInput('CONFLUENCE_URL');
  const username = getInput('CONFLUENCE_USER');
  const password = getInput('CONFLUENCE_TOKEN');
  const contentId = getInput('CONTENT_ID');

  const url = `${confluenceUrl}/wiki/rest/api/content/${contentId}?expand=body.atlas_doc_format`;
  const res = await axios<unknown>({
    method: 'get',
    url,
    auth: {
      username,
      password
    }
  });

  if (!assertAtlasDocFormatResponse(res)) {
    throw new Error('No valid data returned from wiki');
  }

  const data = <unknown>JSON.parse(res.data.body.atlas_doc_format.value);
  return parseTable(data);
};

const getInput = (name: string): string => {
  const input = core.getInput(name);

  if (!input) {
    throw new Error(`Required input ${name} not provided`);
  }

  return input;
};
