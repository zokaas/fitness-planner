import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'fitness-planner' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/fitness-planner/',
})
