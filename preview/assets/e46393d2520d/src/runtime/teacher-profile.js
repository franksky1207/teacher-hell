/** Optional teacher display identity. Numeric/player identifiers remain unchanged. */
export const TEACHER_PROFILE_KEY='teacher-hell/profile';
const han=/^\p{Script=Han}+$/u;
export function makeTeacherProfile(surname,givenName){
 if(typeof surname!=='string'||typeof givenName!=='string')throw new TypeError('請輸入姓氏與名字');
 const a=[...surname.trim()],b=[...givenName.trim()];
 if(a.length<1||a.length>2||b.length<1||b.length>3||a.length+b.length<2||a.length+b.length>4||
    !han.test(a.join(''))||!han.test(b.join('')))throw new RangeError('姓名限 2～4 個中文字；姓氏 1～2 字，名字 1～3 字');
 return Object.freeze({version:1,surname:a.join(''),givenName:b.join('')});
}
export function teacherDisplayName(world){
 const profile=world?.extensions?.[TEACHER_PROFILE_KEY];
 if(!profile)return '導師';
 try{
  if(profile.version!==1)return '導師';
  const safe=makeTeacherProfile(profile.surname,profile.givenName);
  return safe.surname+safe.givenName;
 }catch{return '導師';}
}
