import { defineConfig } from 'vite'
// TODO: revert to official `@vitejs/plugin-react-swc` once support for configuring `importSource` is added
import react from 'plugin-react-swc-emotion' // @ts-ignore

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
