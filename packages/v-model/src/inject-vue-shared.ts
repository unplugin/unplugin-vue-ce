import type { MagicStringBase } from 'magic-string-ast'

/**
 * export const isCEModifiers = (el: Element, key: string) =>
 *     key.endsWith('Modifiers') && !isOn(key) && (el as any)._isCE
 */
export const injectVueSharedContent = 'const isCEModifiers = (el, key) => key.endsWith(\'Modifiers\') && !isOn(key) && e._isCE;\n'

export const injectIsCEModifiers = (
  mgcStr: MagicStringBase,
  isDev: boolean,
) => {
  if (isDev)
    mgcStr.prependLeft(0, injectVueSharedContent)
  else
    mgcStr.replace('export {', `${injectVueSharedContent}export { isCEModifiers, `)

  return mgcStr
}
