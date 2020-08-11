"use strict";

const Require = require; // export default 

module.exports = function (bundler) {
  bundler.addAssetType('pug', Require.resolve('./library/asset.cjs'));
};
//# sourceMappingURL=index.cjs.map