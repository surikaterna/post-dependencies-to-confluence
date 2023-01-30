import * as core from '@actions/core';
import { someFunc } from './someFunc';

async function run(): Promise<void> {
  try {
    // Read from previous actions
    const someInput = core.getInput('some-input');

    // ...logic
    const someOutput = await someFunc(someInput);

    // Set output for following actions
    core.setOutput('some-output', someOutput);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run().catch(() => {
  // Noop
});
