
interface GoodsRequest{
    name:string,
    count:number,
    sellDate:Date|string,
    description:string|null,
    isPlash:boolean,
    plashCount?:number|null,
    vendorId:number,
}


export default GoodsRequest