import * as core from '@actions/core';
import axios from 'axios';
import { createMarkup } from './createMarkup';
import { Page } from './parse/assertPage';
import { Dependency } from './parseDependencies';

export const publishDependencies = async (dependencies: Array<Dependency>, page: Page): Promise<void> => {
  const confluenceUrl = core.getInput('confluence-url');
  const username = core.getInput('confluence-user');
  const password = core.getInput('confluence-token');
  const contentId = core.getInput('confluence-content-id');

  const markup = createMarkup(dependencies);
  core.debug(`Will publish to the "${page.title}" page`);

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
