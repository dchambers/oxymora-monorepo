import { defineConfig } from 'vite'
import react from 'plugin-react-swc-emotion' // TODO: revert to official `plugin-react-swc-emotion` once support for configuring `importSource` is added

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
