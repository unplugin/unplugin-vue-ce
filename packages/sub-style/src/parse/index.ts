import { parse } from '@vue/compiler-sfc'
import { log, setGlobalPrefix } from 'baiwusanyu-utils'
import { parse as babelParse } from '@babel/parser'
import { walk } from 'estree-walker-ts'
import type { SFCParseOptions } from '@vue/compiler-sfc'
import type { ImportDeclaration, StringLiteral } from '@babel/types'

interface ILocPos {
  column: number
  line: number
  offset: number
}
export interface ILoc {
  source: string
  start: ILocPos
  end: ILocPos
}

export interface IESCSSValuePos {
  value: string
  start: number
  end: number
}

export interface ESCSSImport {
  css: IESCSSValuePos[]
  sass: IESCSSValuePos[]
  less: IESCSSValuePos[]
  scss: IESCSSValuePos[]
}
export interface ESCSSParseRes {
  script: {
    loc?: ILoc // 替换 sfc 源码
    cssImport: ESCSSImport
  }
  scriptSetup: {
    loc?: ILoc // 替换 sfc 源码
    cssImport: ESCSSImport
  }
}
export function parseESCSS(
  code: string,
  options: SFCParseOptions) {
  const parseSFCRes = parse(code, options)
  if (parseSFCRes.errors) {
    setGlobalPrefix('[unplugin-vue-ce]:')
    parseSFCRes.errors.forEach((error) => {
      log('error', error.message)
    })
  }

  const { descriptor } = parseSFCRes
  const parseRes: ESCSSParseRes = {
    script: {
      cssImport: {
        css: [],
        sass: [],
        less: [],
        scss: [],
      },
    },
    scriptSetup: {
      cssImport: {
        css: [],
        sass: [],
        less: [],
        scss: [],
      },
    },
  }
  if (descriptor.scriptSetup) {
    const { loc } = descriptor.scriptSetup
    parseRes.scriptSetup.loc = loc
    parseScript(loc.source, parseRes, 'scriptSetup')
  }
  if (descriptor.script) {
    const { loc } = descriptor.script
    parseRes.script.loc = loc
    parseScript(loc.source, parseRes, 'script')
  }
  return parseRes
}

function parseScript(
  code: string,
  parseRes: ESCSSParseRes,
  type: 'scriptSetup' | 'script',
) {
  const ast = babelParse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  })

  const regx = /\.(css|sass|less|scss)$/
  ;(walk as any)(ast, {
    enter(
      node: ImportDeclaration | StringLiteral,
      parent: ImportDeclaration | StringLiteral,
    ) {
      if (parent && node.type === 'StringLiteral'
        && parent.type === 'ImportDeclaration') {
        const matched = node.value.match(regx)
        if (matched) {
          const key = matched[1] as 'css' | 'sass' | 'less' | 'scss'
          parseRes[type].cssImport[key].push({
            value: node.value,
            start: parent.start!,
            end: parent.end!,
          })
        }
      }
    },
  })
}
