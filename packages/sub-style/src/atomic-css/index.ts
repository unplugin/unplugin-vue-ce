export type atomicCSSType = 'tailwind' | 'windi' | 'uno'
export const virtualTailwind = '@virtual:tailwind'
export const virtualWindi = '@virtual:windi'
export const virtualUno = '@virtual:uno'
export const tailwindCSS = ''
  + '<style>\n'
  + '@tailwind base;\n'
  + '@tailwind components;\n'
  + '@tailwind utilities;\n'
  + '</style>\n'

export const unoCSS = ''
  + '<style>\n'
  + '@unocss preflights;\n'
  + '@unocss default;\n'
  + '@unocss all;\n'
  + '</style>\n'

export const atomicCSSPreset = {
  [virtualTailwind]: tailwindCSS,
  [virtualUno]: unoCSS,
  [virtualWindi]: tailwindCSS,
}
