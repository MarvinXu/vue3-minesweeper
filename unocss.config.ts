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
  // include: [/\.[jt]sx?$/],
  rules: [
    ['bg-flag', { 'background-image': 'url(~/assets/flag.svg)' }],
    ['bg-120%', { 'background-size': '120%' }],
    ['border-outset', { 'border-style': 'outset' }],
  ],
  shortcuts: [
    { border3d: 'border-t-white border-r-gray border-b-gray border-l-white' },
    { 'border3d-invert': 'border-t-gray border-r-white border-b-white border-l-gray' },
  ],
  safelist: [
    // i-carbon-number from 1 to 9
    ...Array.from({ length: 8 }, (_, i) => `i-carbon-number-${i + 1}`),
    // i-fad:digital from 0 to 9
    ...Array.from({ length: 10 }, (_, i) => `i-fad:digital${i}`),
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
      customizations: {
        iconCustomizer(collection, icon, props) {
          // customize this @iconify icon in this collection
          if (collection === 'carbon' && icon.startsWith('number-')) {
            // props.width = '4em'
            // props.height = '4em'
            props.viewBox = '5 5 22 22'
          }
        },
      },
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
