import type { MagicStringBase } from 'magic-string-ast'

/**
 * export const isCEModifiers = (el: Element, key: string) =>
 *     key.endsWith('Modifiers') && !isOn(key) && (el as any)._isCE
 */
export const injectVueSharedContent = 'const isCEModifiers = (el, key) => key.endsWith(\'Modifiers\') && !isOn(key) && e._isCE;'

export const injectIsCEModifiers = (mgcStr: MagicStringBase) => {
  mgcStr.replace('export {', `const isCEModifiers = () => console.log(1);\nexport { isCEModifiers, `)
  return mgcStr
}
