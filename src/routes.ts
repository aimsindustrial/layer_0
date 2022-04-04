import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS } from './cache'
import routeHandler from './route-handler'
import fetch from 'node-fetch'

export default new Router()
  .use(starterRoutes)
  // .match('/assets/:path*', ({ cache, proxy, compute, removeUpstreamResponseHeader }) => {
  //   // cache(CACHE_ASSETS)
  //   // removeUpstreamResponseHeader('set-cookie')
  //   compute(async request => {
  //     return proxy('origin')
  //   })
  // })
    
  // fallback route for all other requests:
  .fallback(({proxy, cache, compute}) => {
    cache({
      edge: false
    })
    compute(async request => {
      return proxy('origin')
    })
  })

  // .match({
  //   headers: {
  //     "Sec-Fetch-Dest": 'font',
  //   }},
  //   ({proxy, cache})=> {
  //     cache({
  //       edge: false
  //     })
  //     console.log("Font!")
  //     proxy('origin')
  //   },
  // )
  // // asset caching requires compute. Otherwise Neto throws 404s for some assets
  // .match('/assets/:path*', ({ cache, proxy, compute, removeUpstreamResponseHeader }) => {
  //   cache(CACHE_ASSETS)
  //   removeUpstreamResponseHeader('set-cookie')
  //   compute(async request => {
  //     return proxy('origin')
  //   })
  //   // console.log("font!")
  // })
  // .match('/cdn-cgi/challenge-platform/h/b/orchestrate/captcha/',({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })

  // // useful configs for generated outputs 
  // .get('/service-worker.js', ({ cache, serviceWorker }) => {
  //   cache(CACHE_ASSETS)
  //   serviceWorker('dist/service-worker.js')
  // })
  // .match('/main.js', ({ serveStatic, cache }) => {
  //   cache(CACHE_ASSETS)
  //   return serveStatic('dist/browser.js')
  // })

  // // pages to perfect proxy without caching
  // .match('/_mycart', ({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })
  // .match('/_myacct', ({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })
  // .match('/_cpanel', ({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })
  // .match('/_myacct/:accountpath*', ({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })
  // .match('/_cpanel/:cpanelpath*', ({ proxy, cache }) => {
  //   cache({
  //     edge: false
  //   })
  //   proxy('origin')
  // })
    
  // // fallback route for all other requests:
  // .fallback(routeHandler)

  //////////////////////////////////////////////////////////
  ////////// Static Prerendering examples //////////////////
  //////////////////////////////////////////////////////////
  //
  // More details at:
  // https://docs.layer0.co/guides/static_prerendering
  // 
  // append this to the router call above before .fallback to enable
  // .prerender([
  //   // HTML pages
  //   { path: '/' },
  //   { path: '/categories/mens' },
  //
  //   // API responses
  //   { path: '/api/index.json' },
  //   { path: '/api/categories/mens.json' },
  // ])
