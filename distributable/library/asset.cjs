"use strict";

var _parcelBundler = require("parcel-bundler");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

var _path = _interopRequireDefault(require("path"));

var _mablungVirtualPug = require("@virtualpatterns/mablung-virtual-pug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FilePath = __filename;
const Require = require;

const Package = _json.default.parse(_fsExtra.default.readFileSync(Require.resolve('../../package.json'), {
  'encoding': 'utf-8'
}));

class Asset extends _parcelBundler.Asset {
  constructor(...parameter) {
    super(...parameter);
    this.type = 'js';
  }

  async generate() {
    let source = null;
    source = await _mablungVirtualPug.Transform.getFunctionSourceFromContent(this.contents, {
      'path': this.name
    });
    source = ` import CreateVirtualNode from 'virtual-dom/h.js'
                import _ConvertToVirtualNode from 'html-to-vdom'
                import VirtualNode from 'virtual-dom/vnode/vnode.js'
                import VirtualText from 'virtual-dom/vnode/vtext.js'
                const ConvertToVirtualNode = _ConvertToVirtualNode({ 'VNode': VirtualNode, 'VText': VirtualText })
                ${source}
                export default function(__local = {}, __option = { 'createNode': CreateVirtualNode, 'convertToNode': ConvertToVirtualNode }) { 
                  // Powered by ${Package.name} v${Package.version}
                  // FilePath = '${_path.default.relative('', FilePath)}'
                  return __getNode(__local, __option) 
                }`;
    source = await _mablungVirtualPug.Transform.formatSource(source);
    return [{
      'type': 'js',
      'value': source
    }];
  }

} // export default Asset


module.exports = Asset;
//# sourceMappingURL=asset.cjs.map