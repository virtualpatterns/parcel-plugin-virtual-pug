import { Asset as BaseAsset } from 'parcel-bundler'
import FileSystem from 'fs-extra'
import JSON5 from 'json5'
import Path from 'path'
import { Transform } from '@virtualpatterns/mablung-virtual-pug'

// used in source below
import CreateVirtualNode from 'virtual-dom/h.js'
import _ConvertToVirtualNode from 'html-to-vdom'
import VirtualNode from 'virtual-dom/vnode/vnode.js'
import VirtualText from 'virtual-dom/vnode/vtext.js'
const ConvertToVirtualNode = _ConvertToVirtualNode({ 'VNode': VirtualNode, 'VText': VirtualText })
// used in source below

const FilePath = __filePath
const Require = __require

const Package = JSON5.parse(FileSystem.readFileSync(Require.resolve('../../package.json'), { 'encoding': 'utf-8' }))

class Asset extends BaseAsset {

  constructor(...parameter) {
    super(...parameter)
    this.type = 'js'
  }

  async generate() {

    let source = null
    source = await Transform.getFunctionSourceFromContent(this.contents, { 'path': this.name })
    source =  ` import CreateVirtualNode from 'virtual-dom/h.js'
                import _ConvertToVirtualNode from 'html-to-vdom'
                import VirtualNode from 'virtual-dom/vnode/vnode.js'
                import VirtualText from 'virtual-dom/vnode/vtext.js'
                const ConvertToVirtualNode = _ConvertToVirtualNode({ 'VNode': VirtualNode, 'VText': VirtualText })
                ${source}
                export default function(__local = {}, __option = { 'createNode': CreateVirtualNode, 'convertToNode': ConvertToVirtualNode }) { 
                  // Powered by ${Package.name} v${Package.version}
                  // FilePath = '${Path.relative('', FilePath)}'
                  return __getNode(__local, __option) 
                }`
            
    source = await Transform.formatSource(source)

    return [{
      'type': 'js',
      'value': source
    }] 
  
  }

}

// export default Asset
module.exports = Asset