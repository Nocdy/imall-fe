import { Request } from './AxiosUtils'//导入请求拦截器request
 
export function getUserlist(parameter: any) {//导出方法
  return Request.axiosInstance({
    url: '/user/login',
    method: 'post',
    data: parameter
  })
}