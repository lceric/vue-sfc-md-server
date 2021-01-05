'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const staticCache = require('koa-static-cache')

const config = require('../config')
const publicRouter = require('./router/public')
const privatedRouter = require('./router/privated')
const { errorHandler, responseHandler } = require('./middleware/response')
const { loggerMiddleware } = require('./middleware/logger')

const app = new Koa()

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// Global Middlewares
app.use(bodyParser)
app.use(staticCache(config.publicDir))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privatedRouter.routes(), privatedRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app
