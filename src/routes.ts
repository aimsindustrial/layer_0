import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS } from './cache'
import routeHandler from './route-handler'
import fetch from 'node-fetch'

export default new Router()
  .use(starterRoutes)

  // asset passthrough requires compute. Otherwise Neto throws 404s for some assets
  .match('/assets/:path*', ({ cache, proxy, compute, removeUpstreamResponseHeader }) => {
    // cache(CACHE_ASSETS)
    // removeUpstreamResponseHeader('set-cookie')
    compute(async request => {
      return proxy('origin')
    })
  })
    
  // fallback route for all other requests:
  .fallback(({proxy, cache}) => {
    cache({
      edge: false
    })
    proxy('origin')
  })

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
