// 倒计时
let day = 0;
let hour:string|number = "00";
let min:string|number = "00";
let second:string|number = "00";
function countTime(timeSrt:any) {
  // 获取当前时间
  const date = new Date();
  const now = date.getTime();
  // 设置截止时间
  const endDate = new Date(timeSrt); // 需要倒计时的日期
  const end = endDate.getTime();
  // 时间差
  const leftTime = end - now;
  // 定义变量 d,h,m,s保存倒计时的时间

  if (leftTime >= 0) {
    // 天
    day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    // 时
    const h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
    hour = h < 10 ? "0" + h : h;
    // 分
    const m = Math.floor((leftTime / 1000 / 60) % 60);
    min = m < 10 ? "0" + m : m;
    // 秒
    const s = Math.floor((leftTime / 1000) % 60);
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

    setTimeout(countTime, 1000);
  }

  return { day, hour, min, second };
}

export default function countTimeFun(ck:any,t:any) {
  setInterval(
    (t) => {
      const x = countTime(t.sellDate);
      //console.log(x);
      ck(x,t.countTime);
    },
    1000,
    t
  );
}
