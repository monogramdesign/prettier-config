import { existsSync } from "node:fs";

export const packageManagers = ["yarn", "pnpm", "npm"] as const;

export type PackageManagers = typeof packageManagers;
export type PackageManager = (typeof packageManagers)[number];

export const installPrefixes = {
  yarn: "yarn add -D",
  pnpm: "pnpm i -D",
  npm: "npm i -D",
} as const;

export const lockFiles = {
  yarn: `${process.cwd()}/yarn.lock`,
  pnpm: `${process.cwd()}/pnpm-lock.yaml`,
  npm: `${process.cwd()}/package-lock.json`,
};

export function findPackageManager(): PackageManager | null {
  const found = packageManagers.find((pkg: PackageManager) => {
    if (existsSync(lockFiles[pkg as PackageManager])) return pkg;

    return null;
  });

  return found as PackageManager | null;
}
