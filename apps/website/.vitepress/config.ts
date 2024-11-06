import bodyParser from 'body-parser'
import { defineConfig } from 'vitepress'

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, timeout)
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: '../../dist',
  title: 'icebreaker\'s demo website',
  description: 'icebreaker\'s demo website',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '使用手册', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sonofmagic/demo.icebreaker.top' },
    ],
    outline: {
      label: '目录',
      level: [2, 3],
    },
    logo: '/logo.jpg',
    // sidebar: {
    //   '/': [
    //     { text: '使用手册', link: '/' },
    //     { text: '一些思考', link: 'thinking' },
    //   ],
    // },
  },
  vite: {
    plugins: [
      {
        name: 'icebreaker:api',
        configureServer: {
          handler(server) {
            server.middlewares.use(bodyParser.json())
            server.middlewares.use('/api/resolve', async (req, res) => {
              if (typeof req.body.timeout === 'number') {
                await wait(req.body.timeout)
              }

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ message: 'resolve', timeout: req.body.timeout, now: Date.now() }))
            })

            server.middlewares.use('/api/reject', async (req, res) => {
              if (typeof req.body.timeout === 'number') {
                await wait(req.body.timeout)
              }
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ message: 'reject', timeout: req.body.timeout, now: Date.now() }))
            })
          },
        },
      },
    ],
  },
})

declare module 'http' {
  interface IncomingMessage {
    body: {
      [key: string]: any
    }
  }
}
