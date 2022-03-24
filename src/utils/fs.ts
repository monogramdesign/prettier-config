import { existsSync } from 'fs'

export function fileExists(filePath: string) {
	return existsSync(filePath)
}
