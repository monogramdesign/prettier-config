import { createInterface } from 'readline'

export function getReadlineInterface() {
	return createInterface({
		input: process.stdin,
		output: process.stdout
	})
}

export async function question(q: string): Promise<string> {
	const rl = getReadlineInterface()

	let response: string

	rl.setPrompt(q)
	rl.prompt()

	return new Promise((resolve) => {
		rl.on('line', (userInput) => {
			response = userInput
			rl.close()
		})

		rl.on('close', () => {
			resolve(response)
		})
	})
}
