import { walk } from 'estree-walker-ts'
import { parse as babelParse } from '@babel/parser'
import { injectIsCEModifiers } from './inject-vue-shared'
import type { BlockStatement, CallExpression, ClassMethod, Identifier, IfStatement, MemberExpression } from '@babel/types'
import type { MagicStringBase } from 'magic-string-ast'

export const injectImport = 'import { emit } from \'@vue/runtime-core\'\n'
  + 'import { toHandlerKey } from \'@vue/runtime-core\'\n'
  + 'import { isCEModifiers } from \'@vue/shared\'\n'
export function injectVueRuntime(
  mgcStr: MagicStringBase,
  isDev: boolean,
) {
  const ast = babelParse(mgcStr.toString(), {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  ;(walk as any)(ast, {
    enter(
      node: Identifier | CallExpression | BlockStatement,
      parent: ClassMethod | MemberExpression | CallExpression,
    ) {
      injectRuntimeCodeTOCE(mgcStr, node, parent)
      injectRuntimeCodeTOPatchProps(mgcStr, node, parent)
    },
  })

  if (isDev)
    mgcStr = injectIsCEModifiers(mgcStr, true)
  else
    mgcStr.prependLeft(0, injectImport)

  return mgcStr
}

let isVueElIdentifier = false
let isCreateVNode = false
let isExtendCall = false
let isEmitCall = false
export const injectVueElAttr = '\nthis._isCE = true;\n' + '  this._VModelEmits= {};\n'

export const injectCVNodeArg = ', this._VModelEmits'

export const injectCEEmitVModel = ' \n// emit v-model\n'
  + '          const vModelEvent = toHandlerKey(event)\n'
  + '          if (isModelListener(vModelEvent)) {\n'
  + '            emit(instance, event, ...args)\n'
  + '            return\n'
  + '          }\n'
function injectRuntimeCodeTOCE(
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

let isPatchPropIdentifier = false
let isOnCall = false
let isModelListenerCall = false

export const injectCEVModelM = 'if (isCEModifiers(el, key)) {\n'
  + '    // custom element v-model modifiers\n'
  + '    ;(el)._VModelEmits[key] = nextValue\n'
  + '    } else '
export const injectCEVModelL = ' \n// custom element v-model listeners\n'
  + '    if (isModelListener(key) && (el)._isCE) {\n'
  + '      ;(el)._VModelEmits[key] = nextValue\n'
  + '    }\n'
function injectRuntimeCodeTOPatchProps(
  mgcStr: MagicStringBase,
  node: Identifier | CallExpression | BlockStatement,
  parent: ClassMethod | MemberExpression | CallExpression | IfStatement,
) {
  if ((node as Identifier).type === 'Identifier' && (node as Identifier).name === 'patchProp')
    isPatchPropIdentifier = true

  if ((node as CallExpression).type === 'CallExpression'
    && isPatchPropIdentifier
    && ((node as CallExpression).callee as Identifier).type === 'Identifier'
    && ((node as CallExpression).callee as Identifier).name === 'isOn') {
    isOnCall = true
    if (parent && (parent as IfStatement).type === 'IfStatement')
      mgcStr.prependLeft((parent as IfStatement).start!, injectCEVModelM)
  }

  if ((node as CallExpression).type === 'CallExpression'
    && isPatchPropIdentifier
    && ((node as CallExpression).callee as Identifier).type === 'Identifier'
    && ((node as CallExpression).callee as Identifier).name === 'isModelListener')
    isModelListenerCall = true

  if ((node as BlockStatement).type === 'BlockStatement'
    && isPatchPropIdentifier
    && isModelListenerCall
    && isOnCall) {
    isOnCall = false
    isModelListenerCall = false
    mgcStr.prependRight((node as BlockStatement).end! + 1, injectCEVModelL)
  }
}
