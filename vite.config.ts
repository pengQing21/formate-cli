import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, '/index.ts'),
            name: 'Counter',
            fileName: 'counter.js'
        }
    }
})
