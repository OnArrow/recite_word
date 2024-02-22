import { defineConfig } from 'vitepress'

import { directoryArray } from '../Script/getDirectories'

import path from 'path'
import fs from 'fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/english',
  lastUpdated: true,

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: 'English',
  description: 'A website for English by Jack',

  themeConfig: {
    logo: '/English.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Todo', link: '/Todo' },
      { text: 'Review', link: '/Review' },
      {
        text: 'Material',
        items: [
          {
            text: 'New Concept English 1',
            link: ''
          },
          {
            text: 'New Concept English 2',
            link: 'http://120.25.124.101:9111/recite_word/%E6%96%B0%E6%A6%82%E5%BF%B5%E8%8B%B1%E8%AF%AD%20%E7%AC%AC2%E5%86%8C.pdf'
          },
          { text: 'New Concept English 3', link: '' }
        ]
      }
    ],

    sidebar: directoryArray,

    socialLinks: [],
    search: {
      provider: 'local'
    }
  }
})
