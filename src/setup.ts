#!/usr/bin/env node

import { stat, writeFile } from 'fs'

setupPrettier()

function setupPrettier() {
  const projectDir = process.cwd()
  const packagePath = `${projectDir}/package.json`

	stat(packagePath, (error, stats) => {
		if (stats) {
			const packageJson = require(packagePath)
			packageJson.prettier = '@monogram/prettier-config'

			const packageJsonString = JSON.stringify(
				packageJson,
				null,
				2 // TODO: read from @monogram/prettier-config
			)

			writeFile(packagePath, packageJsonString, (err) => {
				if (err) console.error(err)
				else {
          console.log('✅ prettier added to package.json')
          
          // TODO: exec 'npm install @monogram/prettier-config'
				}
      })
      

		} else {
			throw Error(`Can't found package.json in ${projectDir}`)
		}
	})
}