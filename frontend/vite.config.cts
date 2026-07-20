const path = require('path')
const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const prerender = require('vite-plugin-prerender')

const PuppeteerRenderer = prerender.PuppeteerRenderer

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [
    react.default(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/projects', '/about', '/contact'],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 1500,
      }),
    }),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@mui')) {
              return 'mui-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
