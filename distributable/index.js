import { createRequire as _createRequire } from "module";const Require = _createRequire(import.meta.url);

// export default 
export default function (bundler) {
  bundler.addAssetType('pug', Require.resolve('./library/asset.cjs'));
}
//# sourceMappingURL=index.js.map