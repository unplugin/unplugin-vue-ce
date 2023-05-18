import type { MagicStringBase } from 'magic-string-ast'

export function injectEmit(
  mgcStr: MagicStringBase,
) {
  mgcStr.replace('function emit(instance, event, ...rawArgs) {', 'export function emit(instance, event, ...rawArgs) {')
}
