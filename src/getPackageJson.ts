import fs from 'fs/promises';
import path from 'path';

export interface PackageJson {
  name: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const getPackageJson = async () => {
  const resolvedPath = path.resolve('./package.json');
  const pkgJson = await fs.readFile(resolvedPath, { encoding: 'utf-8' });
  return <PackageJson>JSON.parse(pkgJson);
};
