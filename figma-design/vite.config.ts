import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '')
  return {
    plugins: [
      figmaAssetResolver(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],

    define: {
      __MAPBOX_TOKEN__: JSON.stringify(env.MAPBOX_API ?? ''),
      __GOOGLE_KEY__: JSON.stringify(env.GOOGLE_API ?? ''),
    },

    server: {
      proxy: {
        // Récupération de la version du cache khms Google (le JS Google n'envoie
        // pas de header CORS — le proxy contourne pour le navigateur).
        '/gmaps-js': {
          target: 'https://maps.googleapis.com',
          changeOrigin: true,
          rewrite: (p) => p.replace('/gmaps-js', '/maps/api/js'),
        },
        // Proxy vers le serveur-cache local (port 8081) pour les référentiels
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
        },
      },
    },
  }
})
