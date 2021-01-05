'use strict'

const Markdown = require('../model/Markdown')

class MarkdownController {
  async get_parsed(ctx, next) {
    const body = ctx.request.body
    
    ctx.result = await Markdown.parsed()
    ctx.result = {
      data: id
    }
    return next()
  }
}

module.exports = new MarkdownController()
