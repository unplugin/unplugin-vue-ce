import type { ESCSSImport, ESCSSParseRes, IESCSSValuePos, ILoc } from '../parse'
import type { MagicStringBase } from 'magic-string-ast'

export function transformESCSS(
  mgcStr: MagicStringBase,
  parseRes: ESCSSParseRes,
) {
  if (parseRes.scriptSetup) {
    const { loc, cssImport } = parseRes.scriptSetup
    overwriteCode(mgcStr, loc, cssImport)
  }

  if (parseRes.script) {
    const { loc, cssImport } = parseRes.script
    overwriteCode(mgcStr, loc, cssImport)
  }
}

function overwriteCode(
  mgcStr: MagicStringBase,
  loc: ILoc,
  cssImport: ESCSSImport,
) {
  if (loc && cssImport) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, css] of Object.entries(cssImport)) {
      css.forEach((v: IESCSSValuePos) => {
        mgcStr.update(v.start + loc.start.offset, v.end + loc.start.offset, '')
      })
    }
  }
}
