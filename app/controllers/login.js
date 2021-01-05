'use strict'

const jwt = require('jsonwebtoken')
const config = require('../../config')


class Login {
  async login(ctx, next) {
    const { username } = ctx.request.body
    console.log(username)
    ctx.result = { token: jwt.sign({ username }, config.secret) }
    return next()
  }
  async get_privited_token(ctx, next) {
    return next()
  }
}

module.exports = new Login()
