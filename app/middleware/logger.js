const { logger } = require('../util/logger')

const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start

  const remoteAddress =
    ctx.headers['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)))

  let logText = `${ctx.method} ${ctx.status} ${ctx.url} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}

module.exports = {
  loggerMiddleware,
}
