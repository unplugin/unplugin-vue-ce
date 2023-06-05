export type atomicCSSType = 'tailwind' | 'windi' | 'uno'
export const virtualTailwind = '@virtual:tailwind'
export const virtualWindi = '@virtual:windi'
export const virtualUno = '@virtual:uno'
export const tailwindCSS = ''
  + '<style>'
  + '@tailwind base;\n'
  + '@tailwind components;\n'
  + '@tailwind utilities;'
  + '</style>'

export const atomicCSSPreset = {
  [virtualTailwind]: tailwindCSS,
  [virtualUno]: tailwindCSS,
  [virtualWindi]: tailwindCSS,
}
