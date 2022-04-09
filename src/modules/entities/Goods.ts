import MyTime from "./DefineTime";
class Goods {
  id: number | string;
  name: string;
  count: number;
  sellDate: Date | string;
  imagePath: string;
  description: string | null;
  isPlash: boolean;
  plashCount?: number | null;
  vendorId: number;
  countTime: MyTime;
  //   constructor(
  //     id: number | string,
  //     name: string,
  //     count: number,
  //     sellDate: Date | string,
  //     imagePath: string,
  //     description: string | null,
  //     isPlash: boolean,
  //     vendorId: number,
  //     countTime: MyTime,
  //     plashCount?: number | null
  //   ) {
  //     this.id = id;
  //     this.name = name;
  //     this.count = count;
  //     this.sellDate = sellDate;
  //     this.imagePath = imagePath;
  //     this.description = description;
  //     this.isPlash = isPlash;
  //     this.plashCount = plashCount;
  //     this.vendorId = vendorId;
  //     this.countTime = countTime;
  //   }

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.count = data.count;
    this.sellDate = data.sellDate;
    this.imagePath = data.imagePath;
    this.description = data.description;
    this.isPlash = data.isPlash;
    this.plashCount = data.plashCount;
    this.vendorId = data.vendorId;
    this.countTime = new MyTime(0,"00","00","00");
  }

  

}

export default Goods;
