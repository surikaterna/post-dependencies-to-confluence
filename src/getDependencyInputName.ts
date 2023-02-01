import * as core from '@actions/core';

export const getDependencyInputName = (): string => core.getInput('dependency-input-name') || 'external-dependencies';
