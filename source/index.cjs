const Require = __require

// export default 
module.exports = function(bundler) {
  bundler.addAssetType('pug', Require.resolve('./library/asset.cjs'))
}
