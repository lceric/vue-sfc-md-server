'use strict'

const Router = require('koa-router')
const { privated: privatedControllers } = require('../controllers')
const jwtMiddleware = require('../middleware/jwt')

const router = new Router()
router.prefix('/api/v1')
router.use(jwtMiddleware)

for (const method in privatedControllers) {
  if (Object.hasOwnProperty.call(privatedControllers, method)) {
    const fns = privatedControllers[method]
    for(let action in fns) {
      router[method](`/${action}`, async (ctx, next) => {
        await fns[action].call(ctx, ctx, next)
      })
    }
  }
}
// router.get('/jwtquery', controllers.jwtquery.findSomething)

// router.get('/crud', controller.crud.search)
// router.post('/crud', controller.crud.add)
// router.delete('/crud', controller.crud.delete)

module.exports = router
