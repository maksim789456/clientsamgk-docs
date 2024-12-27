import path from 'node:path'
import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  search: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

const sep = path.sep === '/' ? '/' : '\\\\'
const ALLOWED_SVG_REGEX = new RegExp(`components${sep}icons${sep}.+\\.svg$`)

export default withNextra({
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru'
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    fileLoaderRule.exclude = ALLOWED_SVG_REGEX

    config.module.rules.push({
      test: ALLOWED_SVG_REGEX,
      use: ['@svgr/webpack']
    })
    return config
  },
})