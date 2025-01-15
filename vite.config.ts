import { fileURLToPath, URL } from 'node:url'

import { defineConfig, externalizeDepsPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { resolve } from 'path'
// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { DevUiResolver } from 'unplugin-vue-components/resolvers'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// import rawLoader from 'raw-loader'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  // base: '/my-app/',

  // plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@renderer': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    VueRouter({
      dts: resolve('src/typed-router.d.ts'),
      routesFolder: [
        {
          src: resolve('src/pages'),
          path: '',
          // override globals
          exclude: (excluded) => excluded,
          filePatterns: (filePatterns) => filePatterns,
          extensions: (extensions) => extensions,
        },
      ],
    }),
    Layouts(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [DevUiResolver()],
    }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve('src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  define: { 'process.env': {} },
})
