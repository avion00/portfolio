// Static prerender: turns the SPA build into per-route static HTML so search
// engines, social scrapers and AI answer engines get fully-rendered pages
// (content + meta + JSON-LD) even without running JavaScript.
//
//   npm run build:static     (= vite build, then this script)
//
// It serves ./dist locally, visits each route in a headless browser with
// animations disabled, then writes dist/<route>/index.html.

import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 4178
const WAIT_AFTER_LOAD = 1800 // ms — lets skeleton timers resolve to real content

// Keep in sync with the routes in src/App.tsx + project ids in src/data/projects.ts
const PROJECT_IDS = [
  'multi-agent-ai-platform',
  'enterprise-erp-system',
  'crm-sales-platform',
  'ai-support-chatbot',
  'cross-platform-mobile-app',
  'saas-analytics-dashboard',
  'ecommerce-platform',
  'autonomous-ai-agent-system',
  'workflow-automation-pipeline',
]

const ROUTES = [
  '/',
  '/about',
  '/works',
  '/services',
  '/skills',
  '/experience',
  '/company',
  '/gallery',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/sitemap',
  ...PROJECT_IDS.map((id) => `/project/${id}`),
]

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('✗ dist/index.html not found — run `npm run build` first.')
  process.exit(1)
}

// Tiny static server with SPA fallback to index.html.
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0])
    const filePath = join(DIST, urlPath)
    if (extname(filePath) && existsSync(filePath)) {
      const data = await readFile(filePath)
      res.writeHead(200, {
        'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream',
      })
      res.end(data)
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(await readFile(join(DIST, 'index.html')))
  } catch (err) {
    res.writeHead(500)
    res.end(String(err))
  }
})

await new Promise((resolve) => server.listen(PORT, resolve))

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

let ok = 0
for (const route of ROUTES) {
  const page = await browser.newPage()
  try {
    // Disable animations so the captured DOM matches the client's first render
    // as closely as possible (fewer hydration mismatches) and is cleaner.
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ])
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'load',
      timeout: 60000,
    })
    await page.waitForSelector('#root > *', { timeout: 30000 })
    await new Promise((r) => setTimeout(r, WAIT_AFTER_LOAD))

    const html = await page.content()
    const outDir = route === '/' ? DIST : join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), html, 'utf8')
    ok += 1
    console.log(`✓ prerendered ${route}`)
  } catch (err) {
    console.error(`✗ failed ${route}:`, err.message)
  } finally {
    await page.close()
  }
}

await browser.close()
server.close()
console.log(`\nDone — ${ok}/${ROUTES.length} routes prerendered into dist/.`)
