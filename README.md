# prettier-config
Prettier config used at [monogram.io](https://monogram.io)

## Usage

Install the package using `npm` (or `yarn`)

```sh
yarn add --dev @monogram/prettier-config
```

Add the `prettier` key to your `package.json`

```diff
diff --git a/package.json b/package.json
index 2ecef3d..260838f 100644
--- a/package.json
+++ b/package.json
@@ -5,6 +5,7 @@
   "keywords": [
     "prettier"
   ],
+  "prettier": "@monogram/prettier-config",
   "license": "MIT",
   "author": "Monogram",
   "main": "index.js"
 ```
 
 Can also be extended like this:
 ```js
 // .prettierrc.js
 module.exports = {
  ...require('@github/prettier-config'),
  tabWidth: 2,
  useTabs: false,
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        printWidth: 160
      }
    }
  ]
}
 ```

 [Check out the `prettier` documentation for more info on sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations).

 Adapted from [@github/prettier-config](https://www.npmjs.com/package/@github/prettier-config).
