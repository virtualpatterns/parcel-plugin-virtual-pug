import Bundler from 'parcel-bundler'
import Source from 'source-map-support'

import Plugin from '../index.js'

Source.install({ 'environment': 'node', 'handleUncaughtExceptions': false, 'hookRequire': false })

async function main() {

  try {

    let bundler = new Bundler(require.resolve('./source/main.js'), {
      'cache': false,
      'outDir': `${__dirname}/target`,
      'target': 'node',
      'watch': false,
      'logLevel': 2
    })

    await Plugin(bundler)
    await bundler.bundle()

  } catch (error) {
    console.error(error)
  }

}

main()
