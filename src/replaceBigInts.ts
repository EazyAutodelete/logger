export default function replaceBigInts(obj: any): any {
  let depth = 0;
  if (obj instanceof Array) return obj.map((x, i) => (i < 100 ? replaceBigInts(x) : "Array too deep to display"));
  else if (obj instanceof Object) {
    const newObj: any = {};
    for (const key in obj) {
      depth++;
      if (depth < 100) newObj[key] = replaceBigInts(obj[key]!);
    }
    return newObj;
  } else if (typeof obj === "bigint") return obj.toString() + "n";
  else return obj;
}
