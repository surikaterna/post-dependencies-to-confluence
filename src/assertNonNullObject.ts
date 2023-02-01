export const assertNonNullObject = (value: unknown): value is object => typeof value === 'object' && value !== null;
