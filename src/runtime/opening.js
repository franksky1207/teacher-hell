/** Build a detached, reproducible formal three-year opening. Persistence belongs to storage/session. */
import { confirmCandidate, restoreCreation } from '../player/creation.js';
import { createWorld } from '../world/world.js';
import { startEvolution } from '../evolution/time.js';
import { startSettlement } from '../changes/settlement.js';
import { createRandom } from '../numeric/random.js';
import { createId, restoreFoundationEnvelope } from '../contracts/foundation.js';
import { newThreeYearStart } from '../calendar/calendar.js';
import { startThreeYearSchoolCareer } from '../runtime/transactions.js';

export function createCareerOpening({candidate, seed, taipeiDate, difficulty, subject, careerKey}) {
  const draft=restoreCreation(candidate);
  if(draft.phase!=='candidate') throw new RangeError('A candidate awaiting confirmation is required');
  if(typeof careerKey!=='string'||!careerKey) throw new TypeError('A unique career key is required');
  const player=confirmCandidate(draft), world=createWorld({seed,player});
  const id=(kind,...parts)=>createId(kind,[careerKey,...parts]);
  const attemptId=id('attempt','1'), date=newThreeYearStart(taipeiDate).start;
  const schoolYearId=id('cohort','opening'), openingId=id('history','opening');
  const numeric=startSettlement(startEvolution(world,{seed,date,schoolYearId,openingId}),{seed,attemptId});
  const foundation=restoreFoundationEnvelope({
    kind:'teacher-hell-foundation',schemaVersion:1,
    versions:{world:1,save:1,rules:'n1-n8-v1',content:'opening-v1',assets:'none'},
    identity:{careerId:id('career','1'),attemptId,playerId:player.current.playerId,schoolId:player.current.schoolId},
    position:{date,slotId:'early',schoolYearId,openingId,serviceYear:1,statisticsPeriodId:'opening:1'},
    numeric,random:{events:createRandom(seed).snapshot()},enrollments:[],events:[],extensions:{},
  });
  return startThreeYearSchoolCareer(foundation,{taipeiDate,difficulty,subject,seed});
}
