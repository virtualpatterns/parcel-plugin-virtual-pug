import { createRequire as _createRequire } from "module";import _URL from "url";import Bundler from 'parcel-bundler';
import CreateRealContent from 'virtual-dom/create-element.js';
import Format from 'pretty';
import Path from 'path';
import Pug from 'pug';
import Test from 'ava';

import Plugin from '../../index.js';

const FilePath = _URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);
const Require = _createRequire(import.meta.url);

Test('Bundler(Require.resolve(\'./source/source.js\'), { ... })', async test => {

  let bundler = new Bundler(Require.resolve('./source/source.js'), {
    'cache': false,
    'outDir': `${FolderPath}/target`,
    'outFile': 'target.cjs',
    'target': 'node',
    'watch': false,
    'logLevel': 4 });


  await Plugin(bundler);
  await bundler.bundle();

  // bundle produces CommonJS which import loads as ESModule ... which fails

  let local = { 'name': 'Bob' };

  let module = await import(Require.resolve('./target/target.cjs'));
  let virtualContentFn = module.default.default;

  let virtualContent = null;
  virtualContent = virtualContentFn(local);
  virtualContent = virtualContent.
  map(virtualContent => CreateRealContent(virtualContent)).
  map(realContent => realContent.toString()).
  join('\n');

  virtualContent = Format(virtualContent);

  let realContentFn = Pug.compileFile(Require.resolve('./source/source.pug'));
  let realContent = Format(realContentFn(local));

  test.log(`virtualContent = ${virtualContent}`);
  test.log(`   realContent = ${realContent}`);
  test.is(virtualContent, realContent);

});
//# sourceMappingURL=asset.test.js.map