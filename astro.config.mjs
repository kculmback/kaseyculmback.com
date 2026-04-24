import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import rehypePrism from '@mapbox/rehype-prism'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  integrations: [
    svelte(),
    mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypePrism] }),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
})
