import Bundler from 'parcel-bundler'
import CreateRealContent from 'virtual-dom/create-element.js'
import Format from 'pretty'
import Pug from 'pug'
import Test from 'ava'

import Plugin from '../../index.js'

Test('Bundler(require.resolve(\'./source/source.js\'), { ... })', async (test) => {

  let bundler = new Bundler(require.resolve('./source/source.js'), {
    'cache': false,
    'outDir': `${__dirname}/target`,
    'outFile': 'target.js',
    'target': 'node',
    'watch': false,
    'logLevel': 2
  })

  await Plugin(bundler)
  await bundler.bundle()
  
  let local = { 'name': 'Bob' }
  let { default: virtualContentFn } = await import(require.resolve('./target/target.js'))

  let virtualContent = null
  virtualContent = virtualContentFn(local)
  virtualContent = virtualContent
    .map((virtualContent) => CreateRealContent(virtualContent)) 
    .map((realContent) => realContent.toString())
    .join('\n')

  virtualContent = Format(virtualContent)

  test.log(virtualContent)

  let realContentFn = Pug.compileFile(require.resolve('./source/source.pug'))
  let realContent = Format(realContentFn(local))

  test.log(realContent)

  test.is(virtualContent, realContent)

})
