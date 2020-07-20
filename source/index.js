
module.exports = function(bundler) {
  bundler.addAssetType('pug', require.resolve('./library/asset.js'))
}
