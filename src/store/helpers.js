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
