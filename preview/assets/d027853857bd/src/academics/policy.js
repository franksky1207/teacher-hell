/** Term policy version is separate from the frozen learner/curriculum versions 1/2. */
export const SENIOR_ASSESSMENT_POLICY='senior-spring-403030-v1';
export function assessmentPolicy(id=null){
 if(id===null)return {id:null,rounds:[0,1,2,3],weights:[4,2,2,2]};
 if(id!==SENIOR_ASSESSMENT_POLICY)throw new RangeError('ACADEMICS: unknown term assessment policy');
 return {id,rounds:[0,1,2],weights:[4,3,3]};
}
export const isSeniorTerm=t=>t?.assessmentPolicy===SENIOR_ASSESSMENT_POLICY;
