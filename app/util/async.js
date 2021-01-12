exports.createPromise = async function () {
  let $resolve, $reject
  const promise = new Promise((resolve, reject) => {
    $resolve = resolve
    $reject = reject
  })
  return {
    promise,
    resolve: $resolve,
    reject: $reject,
  }
}
