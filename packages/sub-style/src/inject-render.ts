import type { MagicStringBase } from 'magic-string-ast'
import type {
  CallExpression,
  Identifier,
  ObjectExpression,
  VariableDeclarator,
} from '@babel/types'

const injectToUnMountContent = '\n'
  + '      if (\n'
  + '        vnode.component.isCEChild &&\n'
  + '        vnode.component.cecStyleIds &&\n'
  + '        vnode.component.removeCEChildStyle\n'
  + '      ) {\n'
  + '        vnode.component.removeCEChildStyle(vnode.component.cecStyleIds);\n'
  + '        vnode.component.cecStyleIds = null;\n'
  + '      }\n'

const injectToBaseCreateRendererContent = '\n'
  + '         if (\n'
  + '            instance &&\n'
  + '            !(\n'
  + '              instance.parent &&\n'
  + '              (instance.parent.type).__asyncLoader\n'
  + '            )\n'
  + '          ) {\n'
  + '            const styles = (instance.isCEChild && instance.type.styles) || null;\n'
  + '            if (instance.addCEChildStyle && styles) {\n'
  + '              instance.addCEChildStyle(styles, instance)\n'
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
    && parent.type === 'VariableDeclarator'
    && node.type === 'Identifier'
    && node.name === 'subTree') {
    isComponentUpdateFnIdentifier = false
    mgcStr.prependRight(parent.end! + 1, injectToBaseCreateRendererContent)
  }

  if (node.type === 'Identifier' && node.name === 'unmount')
    isUnmountIdentifier = true

  if (isUnmountIdentifier
    && parent.type === 'CallExpression'
    && node.type === 'Identifier'
    && node.name === 'unmountComponent') {
    isUnmountIdentifier = false
    mgcStr.prependLeft(parent.start! - 1, injectToUnMountContent)
  }
}
