import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

  plugins: [

    react(),

    VitePWA({

      registerType: 'autoUpdate',

      strategies: 'injectManifest',

      srcDir: 'src',

      filename: 'sw.ts',

      devOptions: {
        enabled: true,
      },

      manifest: {

        name: 'FinAssist',

        short_name: 'FinAssist',

        description:
          'Controle financeiro pessoal inteligente',

        theme_color: '#16a34a',

        background_color: '#000000',

        display: 'standalone',

        orientation: 'portrait',

        start_url: '/',

        scope: '/',

        icons: [

          {
            src: '/icons/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },

          {
            src: '/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },

        ],

      },

    }),

  ],

})