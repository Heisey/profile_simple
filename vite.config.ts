import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import macrosPlugin from "vite-plugin-babel-macros"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3500
  },
  base: '/<REPO>/',
  plugins: [
		macrosPlugin(),
    tsconfigPaths(),
    react({
      babel: {
        plugins: [
          // 'babel-plugin-macros',
          "babel-plugin-styled-components"
        ]
      }
    })
  ],
})
