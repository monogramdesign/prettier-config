# prettier-config

Prettier config used at [monogram.io](https://monogram.io)

## Installing

### Auto install

Executing it with `npx` from the project's root will perform the manual installation steps, installing `@monogram/prettier-config` as a dev dependency and adding `"prettier": "@monogram/prettier-config"` to your project's `package.json`.

```sh
npx @monogram/prettier-config
```

### Install manually

Install the package using your package manager

```sh
yarn add -D @monogram/prettier-config
# or
npm i -D @monogram/prettier-config
# or
pnpm i -D @monogram/prettier-config
# or
bun add -D @monogram/prettier-config
```

Add the `prettier` key to your `package.json`

```diff
+++  "prettier": "@monogram/prettier-config"
```

## Extending

Can also be extended like this:

```js
// .prettierrc.js
module.exports = {
	...require('@monogram/prettier-config'),
	tabWidth: 2,
	useTabs: false,
	overrides: [
		{
			files: '*.scss',
			options: {
				singleQuote: true,
				tabWidth: 2,
				useTabs: false,
				printWidth: 160,
			},
		},
	],
}
```

[Check out the `prettier` documentation for more info on sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations).

## Acknowledgment

Inspired by [@github/prettier-config](https://www.npmjs.com/package/@github/prettier-config).
