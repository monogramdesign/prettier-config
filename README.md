# prettier-config
Prettier config used at Monogram (forked from GitHub)

## Usage

Install the package using `npm` (or `yarn`)

```sh
yarn add --dev @monogramdesign/prettier-config
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
+  "prettier": "@monogramdesign/prettier-config",
   "license": "MIT",
   "author": "Monogram",
   "main": "index.js"
 ```
 
 [Check out the `prettier` documentation for more info on sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations).
