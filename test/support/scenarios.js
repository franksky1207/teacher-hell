/** Explicit synthetic fixtures, never formal events, calendar or saved player data. */
import { createCandidate, confirmCandidate } from '../../src/player/creation.js';
import { createWorld } from '../../src/world/world.js';
import { startEvolution } from '../../src/evolution/time.js';
import { startSettlement } from '../../src/changes/settlement.js';
import { createRandom } from '../../src/numeric/random.js';
import { createId, restoreFoundationEnvelope } from '../../src/contracts/foundation.js';

export function foundationScenario(seed = 11) {
  const id = (kind, ...parts) => createId(kind, ['synthetic', ...parts]);
  const player = confirmCandidate(createCandidate({ seed, playerId:'teacher', schoolId:'school' }));
  const world = createWorld({ seed, player });
  const attemptId = id('attempt','1');
  const numeric = startSettlement(startEvolution(world, {
    seed, date:'2026-08-03', schoolYearId:'synthetic-year:1', openingId:'synthetic-opening:1',
  }), { seed, attemptId });
  const [a,b] = world.classroom.studentIds;
  const moment = { date:'2026-08-03', slotId:'synthetic-period:1' };
  const factId = id('fact','shared'), claimId = id('claim','account');
  return restoreFoundationEnvelope(JSON.stringify({
    kind:'teacher-hell-foundation', schemaVersion:1,
    versions:{world:1,save:1,rules:'n1-n8-v1',content:'synthetic-contract-v1',assets:'none'},
    identity:{careerId:id('career','1'),attemptId,playerId:'teacher',schoolId:'school'},
    position:{...moment,schoolYearId:numeric.evolution.clock.schoolYearId,openingId:numeric.evolution.clock.openingId,serviceYear:1,statisticsPeriodId:'synthetic-statistics:1'},
    numeric, random:{events:createRandom(seed).snapshot()},
    // Same natural person may have distinct historical enrollment references.
    // These supplied references do not execute enrollment or assert calendar legality.
    enrollments:[1,2].map(n => ({id:id('enrollment',String(n)),personId:a,cohortId:id('cohort',String(n)),classId:id('class',String(n)),from:{date:n===1?'2026-08-03':'2029-08-06',slotId:'opening'},until:n===1?{date:'2029-06-29',slotId:'end'}:null})),
    events:[{
      schemaVersion:1,id:id('event','carrier'),definitionId:'synthetic:reference-only',contentVersion:'synthetic-contract-v1',type:'direct',
      participantIds:['teacher',a,b],stageId:id('stage','1'),
      facts:[{id:factId,subjectIds:[a,b],occurredAt:moment}],
      knowledge:[{actorId:a,factId,claimId,versionId:'v1',sourceId:a,acquiredAt:moment,believed:false}],
      results:[a,b].map((subjectId,n) => ({id:id('result',String(n)),factId,subjectId,facet:'synthetic-outcome',effectIds:[id('effect',String(n))],settlementId:id('settlement','shared')})),
      choice:{nodeId:'synthetic-node',options:[{id:'one',emotional:false},{id:'two',emotional:true},{id:'three',emotional:false}],confirmedOptionId:null},
    }],
    extensions:{'teacher-hell/testing':{provenance:'synthetic',seed}},
  }));
}
