'use strict'
class JWTQuery {
  async get_findSomething(ctx, next) {
    ctx.result = ctx.jwtData
    return next()
  }
}

module.exports = new JWTQuery()
