import * as core from '@actions/core';
import axios from 'axios';
import { assertPage, Page } from './parse/assertPage';

export const getCurrentPage = async (): Promise<Page> => {
  const confluenceUrl = getInput('CONFLUENCE_URL');
  const username = getInput('CONFLUENCE_USER');
  const password = getInput('CONFLUENCE_TOKEN');
  const contentId = getInput('CONTENT_ID');

  const url = `${confluenceUrl}/wiki/rest/api/content/${contentId}`;
  const res = await axios<unknown>({
    method: 'get',
    url,
    auth: {
      username,
      password
    }
  });

  if (!assertPage(res)) {
    throw new Error('No valid data returned from wiki');
  }

  return res.data;
};

const getInput = (name: string): string => {
  const input = core.getInput(name) || process.env[name];

  if (!input) {
    throw new Error(`Required input ${name} not provided`);
  }

  return input;
};
