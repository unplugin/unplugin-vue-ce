import type { MagicStringBase } from 'magic-string-ast'
import type { BlockStatement, CallExpression, ClassMethod, Identifier, IfStatement, MemberExpression } from '@babel/types'

export const injectVueElAttr = '\nthis._isCE = true;\n' + '  this._VModelEmits= {};\n'

export const injectCVNodeArg = ', this._VModelEmits'

export const injectCEEmitVModel = ' \n// emit v-model\n'
  + '          const vModelEvent = toHandlerKey(event)\n'
  + '          if (isModelListener(vModelEvent)) {\n'
  + '            emit(instance, event, ...args)\n'
  + '            return\n'
  + '          }\n'

let isVueElIdentifier = false
let isCreateVNode = false
let isExtendCall = false
let isEmitCall = false

export function injectApiCustomElement(
  mgcStr: MagicStringBase,
  node: Identifier | CallExpression | BlockStatement,
  parent: ClassMethod | MemberExpression | CallExpression | IfStatement,
) {
  if ((node as Identifier).type === 'Identifier' && (node as Identifier).name === 'VueElement')
    isVueElIdentifier = true

  if ((node as CallExpression).type === 'CallExpression'
    && (node as CallExpression).arguments.length === 0
    && (node as CallExpression).callee.type === 'Super' && isVueElIdentifier)
    mgcStr.prependRight(((node as CallExpression).callee).end! + 3, injectVueElAttr)

  if ((node as Identifier).type === 'Identifier'
    && (parent).type === 'ClassMethod'
    && isVueElIdentifier
    && (node as Identifier).name === '_createVNode')
    isCreateVNode = true

  if ((node as CallExpression).type === 'CallExpression'
    && isVueElIdentifier
    && isCreateVNode
    && ((node as CallExpression).callee as Identifier).name === 'extend'
    && (node as CallExpression).callee.type === 'Identifier')
    isExtendCall = true

  if ((node as Identifier).type === 'Identifier'
    && isVueElIdentifier
    && isCreateVNode
    && isExtendCall
    && (node as Identifier).name === '_props') {
    isExtendCall = false
    mgcStr.prependRight((node as Identifier).end!, injectCVNodeArg)
  }

  if (parent && (parent as MemberExpression).type === 'MemberExpression'
    && isVueElIdentifier
    && isCreateVNode
    && (node as Identifier).name === 'emit'
    && (node as Identifier).type === 'Identifier')
    isEmitCall = true

  if ((node as BlockStatement).type === 'BlockStatement'
    && isVueElIdentifier
    && isCreateVNode
    && isEmitCall) {
    isEmitCall = false
    isCreateVNode = false
    isVueElIdentifier = false
    mgcStr.prependRight((node as BlockStatement).start! + 1, injectCEEmitVModel)
  }
}
