import { walk } from 'estree-walker-ts'
import { parse as babelParse } from '@babel/parser'
import { injectToComponent } from './inject-component'
import type {
  BlockStatement,
  CallExpression,
  FunctionDeclaration,
  Identifier,
  ObjectExpression,
} from '@babel/types'
import type { MagicStringBase } from 'magic-string-ast'
export function injectVueRuntime(
  mgcStr: MagicStringBase,
) {
  const ast = babelParse(mgcStr.toString(), {
    sourceType: 'module',
    plugins: ['typescript'],
  })

     ;(walk as any)(ast, {
    enter(
      node: Identifier | CallExpression | BlockStatement,
      parent: FunctionDeclaration,
    ) {
      // inject code to component instance
      mgcStr = injectToComponent(
        mgcStr,
        node as Identifier | ObjectExpression,
        parent as FunctionDeclaration,
      )
      // TODO: inject code to render
      // TODO: inject code to apiCustomElement
    },
  })

  return mgcStr
}
