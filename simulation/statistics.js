export function describe(values) {
  const sorted=[...values].sort((a,b)=>a-b),n=sorted.length;
  if(!n)return null;
  const mean=sorted.reduce((a,b)=>a+b,0)/n;
  const quantile=p=>sorted[Math.floor((n-1)*p)];
  return {n,mean,sd:Math.sqrt(sorted.reduce((s,v)=>s+(v-mean)**2,0)/n),min:sorted[0],p05:quantile(.05),p50:quantile(.5),p95:quantile(.95),max:sorted.at(-1),zero:sorted.filter(v=>v===0).length,hundred:sorted.filter(v=>v===100).length,extreme:sorted.filter(v=>v<=5||v>=95).length};
}
export function correlation(xs,ys) {
  const mx=xs.reduce((a,b)=>a+b,0)/xs.length,my=ys.reduce((a,b)=>a+b,0)/ys.length;
  let xy=0,xx=0,yy=0;xs.forEach((x,i)=>{xy+=(x-mx)*(ys[i]-my);xx+=(x-mx)**2;yy+=(ys[i]-my)**2;});
  return xx&&yy?xy/Math.sqrt(xx*yy):null;
}
