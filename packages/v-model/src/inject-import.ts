import type { MagicStringBase } from 'magic-string-ast'

// build only
export function injectImport(
  mgcStr: MagicStringBase,
) {
  const injectImport = 'import { emit } from \'@vue/runtime-core\'\n'
    + 'import { toHandlerKey } from \'@vue/runtime-core\'\n'
    + 'import { isCEModifiers } from \'@vue/shared\'\n'
  mgcStr.prependLeft(0, injectImport)
}
