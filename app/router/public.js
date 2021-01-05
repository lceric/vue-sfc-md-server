'use strict'

const Router = require('koa-router')
const { public: publicControllers } = require('../controllers')

const router = new Router()
// router.prefix('/api/v1')
// router.post('/login', controllers.login.login)
// router.post('/markdown', controllers.markdown.to)

for (const method in publicControllers) {
  if (Object.hasOwnProperty.call(publicControllers, method)) {
    const fns = publicControllers[method]
    for(let action in fns) {
      router[method](`/${action}`, async (ctx, next) => {
        fns[action].call(ctx, ctx, next)
      })
    }
  }
}
module.exports = router
