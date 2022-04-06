import MyTime from "./DefineTime";
interface Goods{
    name:string,
    count:number,
    sellDate:Date|string,
    imagePath:string,
    description:string|null,
    isPlash:boolean,
    plashCount?:number|null,
    vendorId:number,
    countTime:MyTime
}

export default Goods;