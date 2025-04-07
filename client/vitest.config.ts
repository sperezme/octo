import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        environment: 'jsdom', //  //   environment: 'node',  For SSR, use 'node' or 'happy-dom' for browser - original client environment: 'jsdom',
        globals: true, // so we dont to import describe etc.. on each test file
        setupFiles: 'test/mocks/setup.ts',
        coverage: { provider: "v8", reporter: ["text", "html", "json"], exclude: [] },
        include: ['test/**/*.test.*'], // Exclude CSR tests for SSR run
    },
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
})
