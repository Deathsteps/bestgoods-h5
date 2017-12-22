import { getCommentList } from './api'
import { buildMutations4Action } from './helpers'

export default {
  state: {
    comments: null,
    tags: null,
    fetching: false,
    err: null
  },
  actions: {
    fetchComments ({ commit }, productId) {
      commit('COMMENT_LIST_REQUEST', { fetching: true })
      getCommentList(
        productId,
        (err, data) => {
          if (err) {
            commit('COMMENT_LIST_FAILURE', { fetching: false, err })
          } else {
            data = data[0]
            commit('COMMENT_LIST_SUCCESS', {
              fetching: false,
              comments: data && Object.freeze(data.data),
              tags: data && Object.freeze(data.tags)
            })
          }
        }
      )
    }
  },
  mutations: {
    ...buildMutations4Action('COMMENT_LIST')
  }
}
