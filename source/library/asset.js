import { Asset as BaseAsset } from 'parcel-bundler'
// import Path from 'path'
import { Transform } from '@virtualpatterns/mablung-virtual-pug'

class Asset extends BaseAsset {

  constructor(...parameter) {
    super(...parameter)
    this.type = 'js'
  }

  async generate() {
    // console.log(`Asset.generate() this.name = '${Path.relative('', this.name)}'`)

    let source = null
    source = await Transform.getFunctionSourceFromContent(this.contents, { 'path': this.name })
    source =  ` import CreateVirtualNode from 'virtual-dom/h.js'
                import _ConvertToVirtualNode from 'html-to-vdom'
                import VirtualNode from 'virtual-dom/vnode/vnode.js'
                import VirtualText from 'virtual-dom/vnode/vtext.js'
                const ConvertToVirtualNode = _ConvertToVirtualNode({ 'VNode': VirtualNode, 'VText': VirtualText })
                ${source}
                export default function(__local = {}, __option = { 'createNode': CreateVirtualNode, 'convertToNode': ConvertToVirtualNode }) { 
                  return __getNode(__local, __option) 
                }`
            
    source = await Transform.formatSource(source)

    return [{
      'type': 'js',
      'value': source
    }] 
  
  }

}

module.exports = Asset