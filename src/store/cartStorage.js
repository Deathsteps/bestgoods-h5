import * as storage from './storage'
import auth from './auth'
import { getShopcart, updateShopcart } from './api'

export default {
  add (product) {
    let cart = storage.get('cart')
    if (!cart) {
      cart = [ product ]
    } else {
      // TODO: import babel-polyfill
      let oldOne = cart.find(p => p.id === product.id && p.specText === product.specText)
      if (oldOne) { // 合并同类项
        oldOne.count += product.count
      } else {
        cart.push(product)
      }
    }
    storage.set('cart', cart)
  },

  get () {
    return storage.get('cart')
  },

  edit (productIndex, count) {
    // NOTE: 暂不保存product的checked状态
    let cart = storage.get('cart')
    cart[productIndex].count = count
  },

  remove (productIndexes) {
    let cart = storage.get('cart')
    cart = cart.filter((p, i) => productIndexes.indexOf(i) === -1)
    storage.set('cart', cart)
  },

  sync () {
    return new Promise(function (resolve, reject) {
      if (!auth.isLogin()) {
        return reject(new Error('未登入'))
      }
      let userId = auth.getUser().phone
      getShopcart(userId, (err, data) => {
        if (err) {
          reject(err)
        } else {
          let local = storage.get('cart')
          // 服务端没数据
          if (!data || !data.length) {
            if (!local) { // 本地也没数据
              resolve()
            } else {
              updateShopcart(
                { userId, products: local },
                err => err ? reject(err) : resolve()
              )
            }
            return
          }

          let server = data.products
          if (!local) {
            storage.set('cart', server)
            return resolve()
          }
          // 合并两端的数据
          for (var i = 0; i < server.length; i++) {
            let { id, specText } = server[i]
            // check whether the server item is in local cart
            // if true, update server item count and remove the local one
            for (var j = 0; j < local.length; j++) {
              if (local[j].id === id && local[j].specText === specText) {
                server[i].count += local[j].count
                local.splice(j, 1)
                break
              }
            }
          }
          // append local items to server cart
          let cart = server.concat(local)
          // save to local
          storage.set('cart', cart)
          // save to server
          updateShopcart(
            { userId, products: cart },
            err => err ? reject(err) : resolve()
          )
        }
      })
    })
  }
}
