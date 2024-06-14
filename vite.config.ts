import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    resolve: {
        alias: {
            '@entity': '/src/entity',
            '@const': '/src/const',
        }
    },
    build: {
        minify: true,
    },
    envPrefix: 'MY',
    // ssr: { SSG options
    //     crittersOptions: {
    //         preload: 'media',
    //         script: 'async'
    //     }
    // }
})
