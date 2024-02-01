import { defineConfig } from 'vitepress'

import { directoryArray } from '../Script/getDirectories'

import path from 'path'
import fs from 'fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: 'English',
  description: 'A website for English by Jack',

  themeConfig: {
    logo: '/English.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Todo', link: '/Todo' },
      {
        text: 'Material',
        items: [
          { text: 'New Concept English 2', link: '/item-2' },
          { text: 'New Concept English 1', link: '/item-3' },
          { text: 'New Concept English 2', link: '/item-1' }
        ]
      }
    ],

    sidebar: directoryArray,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  }
})
