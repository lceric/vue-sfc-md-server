'use strict'

const Markdown = require('../model/Markdown')
var FileReader = require('filereader')

const markdownModel = new Markdown()
class MarkdownController {
  async public_parsedFile(ctx, next) {
    let fileReader = new FileReader()
    console.log(ctx)
    const { files } = ctx.request
    let $resolve = null
    let $p = new Promise((resolve) => ($resolve = resolve))

    fileReader.readAsDataURL(files.file)
    fileReader.on('data', (data) => {
      console.log(data.toString('utf-8'))
      $resolve(data.toString('utf-8'))
    })
    let source = await $p
    let [err, md] = await markdownModel.parsed(source, { jsx: true })
    if (err) {
      ctx.status = 500
      next()
    }
    ctx.status = 200
    ctx.result = md
    next()
  }
  /**
   * 转str source
   */
  async public_parsed(ctx, next) {
    let source = ctx.request.body.source || ''
    let [err, md] = await markdownModel.parsed(source, { jsx: true })
    if (err) {
      ctx.status = 500
      next()
    }
    ctx.status = 200
    ctx.result = md
    next()
  }
}

module.exports = new MarkdownController()
