export type atomicCSSType = 'tailwind' | 'windi' | 'uno'
export const tailwindCSS = '@tailwind base;\n'
  + '@tailwind components;\n'
  + '@tailwind utilities;'

export const atomicCSSPreset = {
  tailwind: tailwindCSS,
  uno: '',
  windi: '',
}
