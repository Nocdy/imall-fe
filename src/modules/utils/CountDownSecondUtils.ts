let day = 0;
let hour: string | number = "00";
let min: string | number = "00";
let second: string | number = "00";

function countSecond(sec: any) {
  if (sec > 0) {
    day =0;
    const h = Math.floor((sec / (60 * 60)) % 24);
    const m = Math.floor((sec / 60) % 60);
    const s = Math.floor(sec % 60);
    hour = h < 10 ? "0" + h : h;
    min = m < 10 ? "0" + m : m;
    second = s < 10 ? "0" + s : s;
  } else {
    day = 0;
    hour = "00";
    min = "00";
    second = "00";
  }
  // 等于0的时候不调用
  if (
    Number(hour) === 0 &&
    Number(day) === 0 &&
    Number(min) === 0 &&
    Number(second) === 0
  ) {
    return;
  } else {
    // 递归每秒调用countTime方法，显示动态时间效果,

    setTimeout(countSecond, 1000);
  }

  return { day, hour, min, second };
}


export default function countSecondFun(ck:any,sec:any,t:any) {
    setInterval(
      (t) => {
        const x = countSecond(sec);
        sec-=1
        //console.log(x);
        ck(x,t);
      },
      1000,
      t
    );
  }


