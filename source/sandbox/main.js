import Bundler from 'parcel-bundler'
import Path from 'path'

import Plugin from '../index.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

async function main() {

  try {

    let bundler = new Bundler(Require.resolve('../../source/sandbox/source/main.js'), {
      'cache': false,
      'outDir': `${FolderPath}/target`,
      'target': 'node',
      'watch': false,
      'logLevel': 3
    })

    await Plugin(bundler)
    await bundler.bundle()

  } catch (error) {
    console.error(error)
  }

}

main()
