import { build } from 'esbuild'
import { spawn } from 'child_process'

// Function to start the compiled app
const runApp = () => {
  const subprocess = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    shell: true
  })

  subprocess.on('close', (code) => {
    if (code !== 0) {
      console.error(`App exited with code ${code}`)
    }
  })

  return subprocess
}

// Run the build
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'esm',
  target: 'es2022',
  bundle: true,
  sourcemap: true,
  logLevel: 'info'
}).then(() => {
  // Run the built output
  runApp()
})
