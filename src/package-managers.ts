import { existsSync } from "node:fs";
import { select, confirm } from "@inquirer/prompts";
import { LOCK_FILES, PACKAGE_MANAGERS } from "./constants";
import type { PackageManager } from "./types";

export async function choosePackageManager(): Promise<PackageManager> {
  const packageManager = findPackageManager();

  if (packageManager === undefined) {
    return selectPackageManager();
  }

  const useAutoDetected = await confirm({
    message: `Auto-detected package manager. Use ${packageManager} for installation?`,
    default: true,
  });

  if (useAutoDetected === false) {
    return selectPackageManager();
  }

  return packageManager;
}

function findPackageManager(): PackageManager | undefined {
  return PACKAGE_MANAGERS.find((packageManager) =>
    existsSync(LOCK_FILES[packageManager])
  );
}

function selectPackageManager() {
  return select({
    message: "Which package manager should be used for installation?",
    choices: PACKAGE_MANAGERS.map((packageManager) => ({
      value: packageManager,
    })),
  });
}
