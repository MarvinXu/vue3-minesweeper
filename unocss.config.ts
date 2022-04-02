import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [
    ['bg-flag', { 'background-image': 'url(~/assets/flag.svg)' }],
    ['bg-120%', { 'background-size': '120%' }],
  ],
  shortcuts: [
    [/^border3d-(\d*)$/, ([, c]) => `border-${c} border-t-white border-r-gray border-b-gray border-l-white`],
    [/^border3d-invert-(.*)$/, ([, c]) => `border-${c} border-t-gray border-r-white border-b-white border-l-gray`],
  ],
  theme: {
    colors: {
      blue: '#0000ff',
      green: '#008000',
      red: '#ff0000',
      darkblue: '#00008b',
      brown: '#a52a2a',
      cyan: '#00ffff',
      black: '#000000',
      gray: '#808080',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
