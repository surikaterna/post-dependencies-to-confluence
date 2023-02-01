import * as core from '@actions/core';
import { getCurrentDependencies } from './getCurrentDependencies';
import { getCurrentPage } from './getCurrentPage';
import { getDependencyInputName } from './getDependencyInputName';
import { getPackageJson } from './getPackageJson';
import { mutMergeDependencies } from './mutMergeDependencies';
import { parseDependencies } from './parseDependencies';
import { publishDependencies } from './publishDependencies';

async function run(): Promise<void> {
  try {
    // Read from previous actions
    const dependencyInputName = getDependencyInputName();
    const dependenciesJson = core.getInput(dependencyInputName);

    if (dependenciesJson === '') {
      core.debug(`Aborting without error. Got no dependencies from the ${dependencyInputName} input`);
      return;
    }

    const packageJson = await getPackageJson();
    const serviceDependencies = parseDependencies(dependenciesJson);
    const [wikiDependencies, page] = await Promise.all([getCurrentDependencies(), getCurrentPage()]);

    const dependencies = mutMergeDependencies(wikiDependencies, serviceDependencies, packageJson.name);
    await publishDependencies(dependencies, page);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run().catch(() => {
  // Noop
});
