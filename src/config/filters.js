import { dateFormat } from 'vux'

export const picUrl = value => value.indexOf('http') > -1 ? value : ('/static/' + value)

export const date = value => dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
