import { Request } from "../utils/AxiosUtils"; //导入请求拦截器request

export function userLogin(parameter: any) {
  //导出方法
  return Request.axiosInstance({
    url: "/user/login",
    method: "post",
    data: parameter,
  });
}

export function getCLientInfo() {
  return Request.axiosInstance({
    url: "/user/getClientInfo",
    method: "get",
  });
}

export function getNewList(listNum: number) {
  return Request.axiosInstance({
    url: "/getList/" + listNum,
    method: "get",
  });
}

export function updateGoods() {
  return Request.axiosInstance({
    url: "/updateGoods",
    method: "post",
  });
}

export function getOneInfo(
  clientId: number | string,
  goodsId: number | string
) {
  return Request.axiosInstance({
    url: "/getOne/" + clientId +"/"+ goodsId,
    method: "get",
  });
}

export function getUserId() {
  return Request.axiosInstance({
    url: "/user/getUserId",
    method: "get",
  });
}
