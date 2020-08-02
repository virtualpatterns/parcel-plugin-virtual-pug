const Require = __require

// export default 
export default function(bundler) {
  bundler.addAssetType('pug', Require.resolve('./library/asset.cjs'))
}
