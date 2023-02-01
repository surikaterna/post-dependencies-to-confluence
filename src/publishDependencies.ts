import * as core from '@actions/core';
import axios from 'axios';
import { createMarkup } from './createMarkup';
import { Page } from './parse/assertPage';
import { Dependency } from './parseDependencies';

export const publishDependencies = async (dependencies: Array<Dependency>, page: Page): Promise<void> => {
  const confluenceUrl = core.getInput('CONFLUENCE_URL');
  const username = core.getInput('CONFLUENCE_USER');
  const password = core.getInput('CONFLUENCE_TOKEN');
  const contentId = core.getInput('CONTENT_ID');

  const markup = createMarkup(dependencies);

  const url = `${confluenceUrl}/wiki/rest/api/content/${contentId}`;
  await axios({
    method: 'put',
    url,
    data: {
      id: page.id,
      type: page.type,
      title: page.title,
      body: {
        storage: {
          value: markup,
          representation: 'wiki'
        }
      },
      version: {
        ...page.version,
        number: page.version.number + 1
      }
    },
    auth: {
      username,
      password
    }
  });
};
