#!/usr/bin/env node

import { stat, writeFile } from 'fs'
import {
	packageManagers,
	type PackageManager,
	installPrefixes,
	findPackageManager
} from './package-managers'
import { question, exec } from './utils'

const PACKAGE_NAME = '@monogram/prettier-config' as const

setupPrettier()

async function setupPrettier() {
	const projectDir = process.cwd()
	const packagePath = `${projectDir}/package.json`

	stat(packagePath, (error, stats) => {
		if (stats) {
			const packageJson = require(packagePath)
			packageJson.prettier = PACKAGE_NAME

			const packageJsonString = JSON.stringify(
				packageJson,
				null,
				2 // TODO: read from @monogram/prettier-config
			)

			writeFile(packagePath, packageJsonString, async (err) => {
				if (err) console.error(err)
				else {
					console.log('✅ prettier added to package.json')

					const packageManager = await choosePackageManager()

					installDependencies(packageManager)
				}
			})
		} else {
			throw Error(`Can't found package.json in ${projectDir}`)
		}
	})
}

async function choosePackageManager() {
	let packageManager = findPackageManager()

	if (packageManager) {
		console.log(`📦 An existing ${packageManager} installation was found`)
	} else {
		const packageManagersOptions = packageManagers.join(', ')

		const chosenManager = await question(
			`Which package manager should be used? \n[${packageManagersOptions}] `
		)

		if (packageManagersOptions.includes(chosenManager as PackageManager)) {
			packageManager = chosenManager as PackageManager
		}
	}

	return packageManager
}

async function installDependencies(packageManager: PackageManager) {
	const installPrefix = installPrefixes[packageManager]

	const installCommand = `${installPrefix} ${PACKAGE_NAME}`

	console.log(`📦 Installing dependencies...`)
	console.log(`${installCommand}\n`)

	await exec(
		installCommand,
		// @ts-ignore
		(stdout: string, stderr: string) => {
			if (stderr) {
				console.error(stderr)
			} else {
				console.log(stdout)
			}

			Promise.resolve({ stdout, stderr })
		}
	)
}
