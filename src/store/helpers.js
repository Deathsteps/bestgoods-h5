const defaultMutation = (state, payload) => {
  Object.assign(state, payload)
}

export function buildMutations4Action (actionName) {
  return {
    [actionName + '_REQUEST']: defaultMutation,
    [actionName + '_FAILURE']: defaultMutation,
    [actionName + '_SUCCESS']: defaultMutation
  }
}

export function add (a, b) {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) + mul(b, e)) / e
}

export function mul (a, b) {
  let c = 0
  let d = a.toString()
  let e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}
