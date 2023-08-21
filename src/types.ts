import type { AVAILABLE_CONFIGS, PACKAGE_MANAGERS } from './constants'

export type AvailableConfig = (typeof AVAILABLE_CONFIGS)[number]
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export type PackageManagerRecord = Record<PackageManager, string>
