"use strict";

var _parcelBundler = _interopRequireDefault(require("parcel-bundler"));

var _createElement = _interopRequireDefault(require("virtual-dom/create-element.js"));

var _pretty = _interopRequireDefault(require("pretty"));

var _pug = _interopRequireDefault(require("pug"));

var _ava = _interopRequireDefault(require("ava"));

var _index = _interopRequireDefault(require("../../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _ava.default)('Bundler(require.resolve(\'./source/source.js\'), { ... })', async test => {
  let bundler = new _parcelBundler.default(require.resolve('./source/source.js'), {
    'cache': false,
    'outDir': `${__dirname}/target`,
    'outFile': 'target.js',
    'target': 'node',
    'watch': false,
    'logLevel': 2
  });
  await (0, _index.default)(bundler);
  await bundler.bundle();
  let local = {
    'name': 'Bob'
  };
  let {
    default: virtualContentFn
  } = await Promise.resolve(`${require.resolve('./target/target.js')}`).then(s => _interopRequireWildcard(require(s)));
  let virtualContent = null;
  virtualContent = virtualContentFn(local);
  virtualContent = virtualContent.map(virtualContent => (0, _createElement.default)(virtualContent)).map(realContent => realContent.toString()).join('\n');
  virtualContent = (0, _pretty.default)(virtualContent);
  test.log(virtualContent);

  let realContentFn = _pug.default.compileFile(require.resolve('./source/source.pug'));

  let realContent = (0, _pretty.default)(realContentFn(local));
  test.log(realContent);
  test.is(virtualContent, realContent);
});
//# sourceMappingURL=asset.test.js.map