export default function replaceBigInts(obj: any): any {
  if (obj instanceof Array) {
    return obj.map(x => replaceBigInts(x));
  } else if (obj instanceof Object) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = replaceBigInts(obj[key]!);
    }
    return newObj;
  } else if (typeof obj === "bigint") {
    return "bigint:" + obj.toString() + "";
  } else {
    return obj;
  }
}
