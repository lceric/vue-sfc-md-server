'use strict'

const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')()
// const staticCache = require('koa-static-cache')
const serve = require('koa-static')

const config = require('../config')
const publicRouter = require('./router/public')
const privatedRouter = require('./router/privated')
const { errorHandler, responseHandler } = require('./middleware/response')
const { loggerMiddleware } = require('./middleware/logger')
const koaBody = require('koa-body')

const app = new Koa()
// Logger
app.use(loggerMiddleware)
app.use(serve(config.publicDir))

// Error Handler
app.use(errorHandler)


// Global Middlewares
// app.use(bodyParser)
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    formidable: {
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    },
  })
)
// app.use(staticCache(config.publicDir))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privatedRouter.routes(), privatedRouter.allowedMethods())


// Response
app.use(responseHandler)
module.exports = app
