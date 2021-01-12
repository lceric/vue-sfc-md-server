'use strict'

const Router = require('koa-router')
// const koaBody = require('koa-body')
const { public: publicControllers } = require('../controllers')

const router = new Router()
// router.prefix('/api/v1')
// router.post('/login', controllers.login.login)
console.log(publicControllers)
// router.post('/parsed', publicControllers.markdown.parsed)

for (const method in publicControllers) {
  if (Object.hasOwnProperty.call(publicControllers, method)) {
    const fns = publicControllers[method]
    if (['get', 'post', 'put', 'delete'].includes(fns)) {
      for(let action in fns) {
        router[method](`/${action}`,  async (ctx, next) => {
          fns[action].call(ctx, ctx, next)
        })
      }
      continue
    }
    router['post'](`/${method}`,  async (ctx, next) => {
      await fns.call(ctx, ctx, next)
    })
  }
}
module.exports = router
