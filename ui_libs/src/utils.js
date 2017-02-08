let zIndex = 20141223

export const getZIndex = () => zIndex++

export const getDOM = function (dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling
    getDOM(dom)
  }
  return dom
}

/**
 * 将 String, Object, Array 转成 Array
 */
export function convertClass (classes) {
  let newClasses = []
  if (!classes) return newClasses
  if (classes instanceof Array) {
    newClasses = newClasses.concat(classes)
  } else if (classes instanceof Object) {
    for (const name in classes) {
      if (classes[name]) newClasses.push(name)
    }
  } else {
    newClasses = newClasses.concat(classes.split(' '))
  }
  return newClasses
}