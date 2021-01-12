'use strict'

const fs = require('fs')

const files = fs.readdirSync(__dirname).filter((file) => file !== 'index.js')

const controllers = {
  public: {},
  privated: {},
}
for (const file of files) {
  // 忽略_开头的
  if (file.indexOf('_') < 0 && file.toLowerCase().endsWith('js')) {
    const controller = require(`./${file}`)
    // 获取Controller中的key
    const methodsNames = Object.getOwnPropertyNames(controller.__proto__)
    const prefix = file.replace('.js', '')
    methodsNames.forEach(function(mn) {
      const reg = /(get_)|(post_)|(put_)|(delete_)/
      const decReg = /(public_)|(privated_)/
      if (typeof controller[mn] != 'function') return
      // 过滤符合路由命名的方法
      if (reg.test(mn)) {
        let splitArr = mn.split('_')
        let isPub = true
        isPub = splitArr.length < 3
        let method = mn.split('_')[0]
        // get_privated_token
        let action = mn.split('_')[isPub ? 1 : 2]
        
        console.log(`/${action}`, method)
        console.log(controller[mn])
        let part = controllers[isPub ? 'public' : 'privated']
        part[method] = part[method] || {}
        controllers[isPub ? 'public' : 'privated'][method][`${prefix}/${action}`] = controller[mn]
      } else if (decReg.test(mn)) {
        let [dec, fnName] = mn.split('_')
        controllers[dec][`${prefix}/${fnName}`] = controller[mn]
      }
    })
    console.log(JSON.stringify(controllers))
    // controllers[`${file.replace(/\.js/, '')}`] = controller
  }
}

module.exports = controllers
