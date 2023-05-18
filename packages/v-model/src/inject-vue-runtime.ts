import { walk } from 'estree-walker-ts'
import { parse as babelParse } from '@babel/parser'
import { injectApiCustomElement } from './inject-api-custom-element'
import { injectPatchProp } from './inject-patch-prop'
import type {
  BlockStatement,
  CallExpression,
  ClassMethod,
  Identifier,
  MemberExpression,
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
      parent: ClassMethod | MemberExpression | CallExpression,
    ) {
      injectApiCustomElement(mgcStr, node, parent)
      injectPatchProp(mgcStr, node, parent)
    },
  })
}
