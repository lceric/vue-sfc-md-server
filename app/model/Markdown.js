const { parsed } = require('vue-sfc-md')
const to = require('await-to-js').default

class Markdown {
  async parsed(sourceStr) {
    if (!sourceStr) return [null, '']
    let [err, doc] = await to(parsed(sourceStr))
    if (err) {
      return [err]
    }
    let sfcDoc = doc
      .map((m) => m.doc)
      .filter((itm) => !itm.empty)
      .join('\n')
    return [null, sfcDoc]
  }
}

module.exports = Markdown
