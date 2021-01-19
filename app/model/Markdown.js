const { parsed } = require('vue-sfc-md')
const to = require('await-to-js').default

class Markdown {
  async parsed(sourceStr) {
    if (!sourceStr) return [null, '']
    let [err, doc] = await to(
      parsed(sourceStr, {
        jsx: true,
        removeEmptyColumns: true,
        emptyFlags: ['-', '`false`'],
      })
    )
    if (err) {
      return [err]
    }
    let sfcDoc = doc
      .filter((m) => !m.empty)
      .map((m) => m.doc)
      .join('\n')
    return [null, sfcDoc]
  }
}

module.exports = Markdown
