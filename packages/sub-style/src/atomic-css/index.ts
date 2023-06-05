export type atomicCSSType = 'tailwind' | 'windi' | 'uno'
export const virtualTailwind = '@virtual:tailwind'
export const tailwindCSS = ''
  + '<style>'
  + '@tailwind base;\n'
  + '@tailwind components;\n'
  + '@tailwind utilities;'
  + '</style>'

export const atomicCSSPreset = {
  [virtualTailwind]: tailwindCSS,
  uno: '',
  windi: '',
}
