#!/usr/bin/env node

import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { choosePackageManager } from './package-managers'
import { execSync } from 'child_process'
import { INSTALL_PREFIXES, PACKAGE_NAME } from './constants'
import { PackageManager } from './types'
import { confirm } from '@inquirer/prompts'

init().catch(console.error)

async function init() {
	const projectDir = process.cwd()
	const packagePath = `${projectDir}/package.json`

	if (!existsSync(packagePath)) {
		throw Error(`Can't find package.json in ${projectDir}`)
	}

	const packageJson = require(packagePath)

	if (packageJson.prettier) {
		const yes = await confirm({
			message: `'prettier' key (${packageJson.prettier}) found in package.json. Do you want to replace it?`
		})

		if (yes === false) throw Error('Aborted')
	}

	packageJson.prettier = PACKAGE_NAME

	const packageJsonString = JSON.stringify(packageJson, null, 2)

	const packageManager = await choosePackageManager()
	await installDependencies(packageManager)

	await writeFile(packagePath, packageJsonString)
}

async function installDependencies(packageManager: PackageManager) {
	const installPrefix = INSTALL_PREFIXES[packageManager]
	const installCommand = `${installPrefix} prettier ${PACKAGE_NAME}`

	console.log(`📦 Installing dependencies...`)
	console.log(`👉 ${installCommand}`)
	execSync(installCommand, { stdio: 'inherit' })
}
