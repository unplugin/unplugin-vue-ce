import { walk } from 'estree-walker-ts'
import { parse as babelParse } from '@babel/parser'
import { injectToComponent } from './inject-component'
import { injectToRenderer } from './inject-render'
import { injectApiCustomElement } from './inject-api-custom-element'
import type {
  BlockStatement,
  CallExpression,
  FunctionDeclaration,
  Identifier,
  ObjectExpression,
  VariableDeclarator,
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
      parent: FunctionDeclaration | VariableDeclarator | CallExpression,
    ) {
      // inject code to component instance
      injectToComponent(
        mgcStr,
        node as Identifier | ObjectExpression,
        parent as FunctionDeclaration,
      )
      // inject code to render
      injectToRenderer(
        mgcStr,
        node as Identifier | ObjectExpression,
        parent as VariableDeclarator | CallExpression,
      )
      // inject code to apiCustomElement
      injectApiCustomElement(
        mgcStr,
        node as Identifier | CallExpression,
        parent as VariableDeclarator | CallExpression,
      )
    },
  })
}
