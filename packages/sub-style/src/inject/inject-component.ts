import type { FunctionDeclaration, Identifier, ObjectExpression } from '@babel/types'
import type { MagicStringBase } from 'magic-string-ast'

let isCreateComponentInstance = false
let VariableDeclarationInst = false
const injectToCompContent = '\n    isCEChild: parent && (parent.isCE || parent.isCEChild),\n'
    + '    addCEChildStyle:\n'
    + '      parent && parent.addCEChildStyle ? parent.addCEChildStyle : null,\n'
    + '    removeCEChildStyle:\n'
    + '      parent && parent.removeCEChildStyle ? parent.removeCEChildStyle : null,\n'
    + '    cecStyleIds: null,'
export function injectToComponent(
  mgcStr: MagicStringBase,
  node: Identifier | ObjectExpression,
  parent: FunctionDeclaration,
) {
  if (node.type === 'Identifier'
      && parent
      && parent.type === 'FunctionDeclaration'
      && node.name === 'createComponentInstance')
    isCreateComponentInstance = true

  if (isCreateComponentInstance
        && node.type === 'Identifier'
        && node.name === 'instance')
    VariableDeclarationInst = true

  if (isCreateComponentInstance
        && VariableDeclarationInst
        && node.type === 'ObjectExpression') {
    isCreateComponentInstance = false
    VariableDeclarationInst = false
    mgcStr.prependRight(node.start! + 1, injectToCompContent)
  }
}
