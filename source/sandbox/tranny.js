import { Transform } from '@virtualpatterns/mablung-virtual-pug'

async function main() {

  try {

    let source = null
    source = await Transform.getFunctionSourceFromPath(require.resolve('./source/main.pug'))
    console.log(source)

  } catch (error) {
    console.error(error)
  }

}

main()

//   let source = null
//     // source = await Transform.getFunctionSourceFromContent(this.contents, { 'path': this.name })
//     // console.log(source)

//     // source =  ` import CreateVirtualNode from 'virtual-dom/h.js'
//     //             import _ConvertToVirtualNode from 'html-to-vdom'
//     //             import VirtualNode from 'virtual-dom/vnode/vnode.js'
//     //             import VirtualText from 'virtual-dom/vnode/vtext.js'
//     //             const ConvertToVirtualNode = _ConvertToVirtualNode({ 'VNode': VirtualNode, 'VText': VirtualText })
//     //             ${source}
//     //             export default function(__local = {}, __option = { 'createNode': CreateVirtualNode, 'convertToNode': ConvertToVirtualNode }) { 
//     //               return __getNode(__local, __option) 
//     //             }`
//     // console.log(source)
            
//     source = 'export default function(locals) { console.dir(local) }'
//     // source = Transform.formatSource(source)

//     return [{
//       'type': 'js',
//       'value': source
//     }] 
  
//   }

// }

// module.exports = Asse