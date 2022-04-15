import { Request } from "../utils/AxiosUtils"; //导入请求拦截器request

export function userLogin(parameter: any) {
  //导出方法
  return Request.axiosInstance({
    url: "/login",
    method: "post",
    data: parameter,
  });
}

export function getCLientInfo() {
  return Request.axiosInstance({
    url: "/getClientInfo",
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
    url: "/getOne/" + clientId + "/" + goodsId,
    method: "get",
  });
}

export function getUserId() {
  return Request.axiosInstance({
    url: "/getUserId",
    method: "get",
  });
}

export function addListToShoppingCart(
  clientId: number | string,
  goodsId: number | string
) {
  return Request.axiosInstance({
    url: "/addList/" + clientId + "/" + goodsId,
    method: "get",
  });
}

export function showList(clientId: number | string) {
  return Request.axiosInstance({
    url: "/showList/" + clientId,
    method: "get",
  });
}

export function flash(clientId: number | string, goodsId: number | string) {
  return Request.axiosInstance({
    url: "/Flash/" + clientId + "/" + goodsId,
    method: "get",
  });
}

export function getOrder(parameter: any) {
  return Request.axiosInstance({
    url: "/showOrder",
    method: "post",
    data: parameter,
  });
}

export function confirmOrder(parameter: any) {
  return Request.axiosInstance({
    url: "/confirmOrder",
    method: "post",
    data: parameter,
  });
}

export function commonpurchase(clientId: number | string) {
  return Request.axiosInstance({
    url: "/purchase/" + clientId,
    method: "get",
  });
}

export function userLogout() {
  return Request.axiosInstance({
    url: "/logout",
    method: "get",
  });
}

export function userRegistry(parameter: any) {
  return Request.axiosInstance({
    url: "/registry",
    method: "post",
    data: parameter,
  });
}

export function getVendorInfo(vendorId:number|string){
  return Request.axiosInstance({
    url:"/getVendorInfo/"+vendorId,
    method:"get",
  })
}

export function search(keyword:string){
  return Request.axiosInstance({
    url:"/search/"+keyword,
    method:"get"
  })
}

export function getCarousel(){
  return Request.axiosInstance({
    url:"/carouselGet",
    method:"get"
  })
}