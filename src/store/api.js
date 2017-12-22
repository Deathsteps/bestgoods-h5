
const ajax = (url, method, params, callback, onBeforeSend) => {
  let xhr = new window.XMLHttpRequest()
  xhr.open(method, url, true)
  // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let body = xhr.responseText
      if (xhr.status >= 200 && xhr.status < 300 ||
        xhr.status === 304) {
        let data
        try {
          data = JSON.parse(body)
          callback(null, data)
        } catch (ex) {
          callback(ex)
        }
      } else {
        callback(body)
      }
    }
  }

  let content = onBeforeSend(xhr)
  content = params ? JSON.stringify(params) : content

  try {
    xhr.send(content)
  } catch (e) {
    window.alert(e)
    throw new Error(e)
  }
}

const post = (url, params, callback) => {
  ajax(
    url, 'POST', params, callback,
    function (xhr) {
      xhr.setRequestHeader('Content-type', 'application/json')
    }
  )
}

export const upload = (url, params, callback, onProgress) => {
  ajax(
    url, 'POST', null, callback,
    function (xhr) {
      // listen to upload
      if (onProgress && xhr.upload) { // Progress
        xhr.upload.addEventListener('progress', function (event) {
          if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total).toFixed(2) * 100
            onProgress(percentComplete)
          }
        }, false)
      }
      // build form data
      let data = new window.FormData()
      for (let k in params) {
        data.append(k, params[k])
      }
      return data
    }
  )
}

export const request = (url, params, callback) => {
  // 测试环境  api地址是 http://139.196.211.52:8501/api/metadata
  post(
    'http://localhost:8080/data/' + url,
    params,
    function (err, data) {
      if (err) {
        callback(err)
      } else {
        if (data && data.error) { // 统一处理异常
          let err = new Error(data.error)
          callback(err)
        } else {
          callback(null, data)
        }
      }
    }
  )
}

export function getTopCategories (callback) {
  request('categories', { level: 'L1' }, callback)
}
export function getHotSale (callback) {
  request('hot-sale', {}, callback)
}
export function getListProducts (params, callback) {
  setTimeout(() => {
    request('list-products', params, callback)
  }, 1000)
}
export function getSubCategories (superId, callback) {
  request('categories', { superId, level: 'L2' }, callback)
}
export function getProduct (id, callback) {
  request('product', { id }, callback)
}

export function requestUserRegister (params, callback) {
  request('user', params, callback)
}
export function userLogin (params, callback) {
  request('user', params, callback)
}
export function sendVerfyCode () {
  console.log('send..')
}

export function getAddresses (params, callback) {
  request('address', { ...params, action: params.id ? 'find' : 'findAll' }, callback)
}
export function requestAddressCreate (params, callback) {
  request('address', { ...params, action: 'create' }, callback)
}
export function requestAddressEdit (params, callback) {
  request('address', { ...params, action: 'edit' }, callback)
}
export function requestAddressDelete (id, callback) {
  request('address', { id, action: 'delete' }, callback)
}
export function getUserDefaultAddress (userId, callback) {
  request('address', { userId, action: 'find-default' }, callback)
}

export function getShopcart (userId, callback) {
  request('shopcart', { userId }, callback)
}
export function updateShopcart (params, callback) {
  request('shopcart', params, callback)
}

export function getDeliveryFee (params, callback) {
  // 模拟运费接口
  setTimeout(() => {
    callback(null, 24)
  }, 100)
}
export function requestOrderCreate (order, callback) {
  request('order', { order, action: 'create' }, callback)
}
export function requestOrderPay (orderId, callback) {
  setTimeout(() => {
    request('order', { orderId, action: 'pay' }, callback)
  }, 200)
}
export function requestOrderProductsReceive (orderId, callback) {
  request('order', { orderId, action: 'receive' }, callback)
}
export function getOrder (orderId, callback) {
  request('order', { orderId, action: 'find' }, callback)
}
export function getOrderList (params, callback) {
  request('order', { ...params, action: 'findAll' }, callback)
}

export const onServer = false
