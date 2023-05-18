import type { MagicStringBase } from 'magic-string-ast'
import type {
  BlockStatement,
  CallExpression,
  ClassMethod,
  Identifier,
  IfStatement,
  MemberExpression,
  VariableDeclarator,
} from '@babel/types'

let isPatchPropIdentifier = false
let isOnCall = false
let isModelListenerCall = false

const injectCEVModelM = 'if (isCEModifiers(el, key)) {\n'
  + '    ;(el)._VModelEmits[key] = nextValue\n'
  + '    } else '
const injectCEVModelL = '    if (isModelListener(key) && (el)._isCE) {\n'
  + '      ;(el)._VModelEmits[key] = nextValue\n'
  + '    }\n'
export function injectPatchProp(
  mgcStr: MagicStringBase,
  node: Identifier | CallExpression | BlockStatement,
  parent: ClassMethod | MemberExpression | CallExpression | IfStatement | VariableDeclarator,
) {
  if ((node as Identifier).type === 'Identifier'
    && (node as Identifier).name === 'patchProp'
    && parent.type === 'VariableDeclarator')
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
    isPatchPropIdentifier = false
    mgcStr.prependRight((node as BlockStatement).end! + 1, injectCEVModelL)
  }
}
