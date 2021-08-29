import axios, { AxiosInstance } from 'axios'
import QS from 'qs'

export class HttpInterceptorService {
  public varaxios :AxiosInstance = axios.create()
  constructor () {
    // 请求超时时间
    this.varaxios.defaults.timeout = 5000
    // post请求头
    this.varaxios.defaults.headers.post['Content-Type'] = 'application/json'

    this.varaxios.defaults.baseURL = 'https://localhost:5001'

    // 请求拦截器
    this.varaxios.interceptors.request.use(config => {
      return config
    },
    error => {
      return Promise.reject(error)
    })

    // 响应拦截器
    this.varaxios.interceptors.response.use(
      response => {
        if (response.status === 200) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      },
      // 服务器状态码不是200的情况
      error => {
        if (error.response.status) {
          switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
              console.error('登录')
              break
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
              console.error('登录过期对用户进行提示')
              break
            // 404请求不存在
            case 404:
              console.error('404请求不存在')
              break
            // 其他错误，直接抛出错误提示
            default:
              console.error('其他错误')
          }
          return Promise.reject(error.response)
        }
      }
    )
  }

  public request (params: any): any {
    if (params.method === 'post' || params.method === 'POST') {
      return this.post(params.url, params.data)
    } else {
      return this.get(params.url, params.data)
    }
  }

  public get (url: string, params: any): any {
    return new Promise((resolve, reject) => {
      this.varaxios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  public post (url: string, params: any): any {
    return new Promise((resolve, reject) => {
      this.varaxios.post(url, JSON.stringify(params))
        .then(res => {
          // resolve(this.handleSucccess(res))
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // public handleSucccess (res: any): any {
  //   const body = res
  //   if (body) {
  //     return {
  //       resdata: body,
  //       success: true
  //     }
  //   } else {
  //     return {
  //       statusText: res.statusText,
  //       status: res.status,
  //       success: true
  //     }
  //   }
  // }
}
const Https : HttpInterceptorService = new HttpInterceptorService()
export default Https
