import type { MagicStringBase } from 'magic-string-ast'
import type {
  CallExpression,
  Identifier,
  ObjectExpression,
  VariableDeclarator,
} from '@babel/types'

const injectToUnMountContent = 'if (vnode.component.ceContext && isHmrUpdating) {\n'
  + '        vnode.component.ceContext.removeCEChildStyles(vnode.component.uid);\n'
  + '      }\n'

const injectToBaseCreateRendererContent = 'if (instance && instance.parent) {\n'
  + '            if (!(instance.parent.type.__asyncLoader && instance.parent.isCE)) {\n'
  + '              const styles = instance.ceContext && instance.type.styles || null;\n'
  + '              if (instance.ceContext && styles) {\n'
  + '                instance.ceContext.addCEChildStyle(\n'
  + '                  styles,\n'
  + '                  instance.uid,\n'
  + '                  instance.hasStyleAttrs\n'
  + '                );\n'
  + '              }\n'
  + '            }\n'
  + '          }\n'

let isComponentUpdateFnIdentifier = false
let isUnmountIdentifier = false
export function injectToRenderer(
  mgcStr: MagicStringBase,
  node: Identifier | ObjectExpression,
  parent: VariableDeclarator | CallExpression,
) {
  if (node.type === 'Identifier' && node.name === 'componentUpdateFn')
    isComponentUpdateFnIdentifier = true

  if (isComponentUpdateFnIdentifier
      && parent
    && parent.type === 'VariableDeclarator'
    && node.type === 'Identifier'
    && node.name === 'subTree') {
    isComponentUpdateFnIdentifier = false
    mgcStr.prependRight(parent.end! + 1, injectToBaseCreateRendererContent)
  }

  if (node.type === 'Identifier' && node.name === 'unmount')
    isUnmountIdentifier = true

  if (isUnmountIdentifier
      && parent
    && parent.type === 'CallExpression'
    && node.type === 'Identifier'
    && node.name === 'unmountComponent') {
    isUnmountIdentifier = false
    mgcStr.prependLeft(parent.start! - 1, injectToUnMountContent)
  }
}
