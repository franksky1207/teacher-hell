/** Offline weighted Taiwan-style name catalog: deterministic, bounded and no network. */
export const SURNAME_GROUPS=Object.freeze({"common":["陳","林","黃","張","李","王","吳","劉","蔡","楊","許","鄭","謝","郭","洪","邱","曾","廖","賴","徐","周","葉","蘇","莊","呂","江","何","蕭","羅","高","潘","簡","朱","鍾","彭","游","詹","胡","施","沈","余","趙","盧","梁","顏","柯","孫","魏","翁","戴","范","宋","方","鄧","杜","傅","侯","曹","薛","丁","卓","馬","蔣","唐","馮","董","程","袁","于","田","石","紀"],"secondary":["康","溫","姜","汪","白","涂","尤","巫","鐘","黎","辜","賈","夏","錢","阮","易","毛","連","童","官","莫","龔","鄒","嚴","韓","凌","龐","雷","陶","樊","姚","陸","柳","米","甘","湯","章","辛","歐","駱","蒲","包","齊","任","孔","倪","秦","尹","穆","邵","伍","喬","牛","邢","裴","賀","龍","郝","安","柏","韋","常","孟","平","谷","祁","卜","滕","萬","成","武","霍","封","雲","歸","花","俞","曲","隋","邊","燕","吉"],"uncommon":["邴","戚","鮑","史","費","廉","岑","狄","貝","顧","沙","嵇","和","樂","於","時","皮","卞","元","經","房","裘","繆","幹","解","應","宗","宣","賁","鄂","索","咸","籍","藺","屠","蒙","池","喻","陰","鬱","蒼","雙","聞","莘","慎"],"compound":["歐陽","司馬","上官","諸葛","夏侯","皇甫","東方","慕容","公孫","令狐","長孫","宇文","南宮","司徒","司空","獨孤","西門","端木","尉遲"]});
const MALE_FIRST=["宇","承","家","文","哲","冠","柏","俊","子","品","宥","佑","立","建","志","彥","睿","皓","昱","庭","宗","昊","翊","宸","奕","祐","秉","昇","嘉","益","博","駿","敬","弘","晨","竣","詠","維","韋","廷","紹","修","丞","彬","展","彭","翔","宏","浩","晟"],MALE_LAST=["軒","宇","哲","宏","安","恩","瑋","傑","豪","庭","翔","廷","霖","毅","睿","澤","昊","勳","宸","賢","倫","陽","平","澄","辰","言","叡","凱","翰","佑","濬","智","銘","彥","祐","鈞","成","新","岳","均","洋","杰","勝","綸","騰"];
const FEMALE_FIRST=["雅","怡","欣","思","語","庭","婉","心","佳","宜","書","詠","品","可","羽","依","宛","芷","芸","涵","嘉","宥","子","佩","筱","孟","晨","晴","妍","柔","玟","珮","郁","采","詩","芮","芊","映","昕","湘","予","歆","若","琬","禹","盈","淑","沛","安","靜"],FEMALE_LAST=["涵","怡","安","庭","雅","欣","妤","萱","琪","晴","瑄","恩","柔","婷","潔","儀","瑜","嫻","彤","妍","璇","伶","惠","芯","蓉","瑤","馨","穎","芸","喬","瑩","霏","慈","敏","茹","綺","寧","琳","甯","蔓","珊","鈺","佳","君","樂"];
const NEUTRAL=Object.freeze(['宇涵','文安','思恩','家宇','承恩','宇庭','怡安','文涵','承宇','安哲','欣宇','書涵','庭安','晨安','嘉恩']);
export const GIVEN_NAME_CATALOG=Object.freeze({
 male:Object.freeze([...new Set([...MALE_FIRST.flatMap(a=>MALE_LAST.filter(b=>a!==b).map(b=>a+b)),...NEUTRAL])]),
 female:Object.freeze([...new Set([...FEMALE_FIRST.flatMap(a=>FEMALE_LAST.filter(b=>a!==b).map(b=>a+b)),...NEUTRAL])]),
 neutral:NEUTRAL
});
export const NAME_CATALOG_COUNTS=Object.freeze({surnames:new Set(Object.values(SURNAME_GROUPS).flat()).size,male:GIVEN_NAME_CATALOG.male.length,female:GIVEN_NAME_CATALOG.female.length});
export function chooseSurname(rng){
 const tier=rng.integer(0,999);
 const group=tier<530?SURNAME_GROUPS.common.slice(0,10):tier<790?SURNAME_GROUPS.common:tier<935?SURNAME_GROUPS.secondary:tier<995?SURNAME_GROUPS.uncommon:SURNAME_GROUPS.compound;
 return group[rng.integer(0,group.length-1)];
}
export function chooseGivenName(rng,gender,used=new Set()){
 const pool=GIVEN_NAME_CATALOG[gender]??GIVEN_NAME_CATALOG.neutral;
 const start=rng.integer(0,pool.length-1);
 for(let n=0;n<pool.length;n++){const name=pool[(start+n)%pool.length];if(!used.has(name)){used.add(name);return name;}}
 throw new RangeError('Given-name catalogue exhausted; cannot guarantee unique names');
}

export function surnameOf(fullName){
 for(const compound of SURNAME_GROUPS.compound)if(fullName.startsWith(compound))return compound;
 return [...fullName][0]??'';
}
