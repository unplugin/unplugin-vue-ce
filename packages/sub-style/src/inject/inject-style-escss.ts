import type { MagicStringBase } from 'magic-string-ast'
import type { ESCSSImport, ESCSSParseRes, IESCSSValuePos, ILoc } from '../parse'

export function injectStyleESCSS(
  mgcStr: MagicStringBase,
  parseRes: ESCSSParseRes,
) {
  if (parseRes.scriptSetup) {
    const { loc, cssImport } = parseRes.scriptSetup
    genStyleTagCode(mgcStr, loc, cssImport)
  }

  if (parseRes.script) {
    const { loc, cssImport } = parseRes.script
    genStyleTagCode(mgcStr, loc, cssImport)
  }
}

function genStyleTagCode(
  mgcStr: MagicStringBase,
  loc: ILoc,
  cssImport: ESCSSImport,
) {
  if (loc && cssImport) {
    for (const [key, css] of Object.entries(cssImport)) {
      css.forEach((v: IESCSSValuePos) => {
        const offset = mgcStr.original.length - mgcStr.length()
        mgcStr.appendRight(mgcStr.length() + offset, `<style lang="${key}"> @import "${v.value}";</style>\n
        `)
      })
    }
  }
}
