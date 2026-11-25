import { createCandidate, confirmCandidate } from '../../src/player/creation.js';
import { createWorld, restoreWorld } from '../../src/world/world.js';

const profiles = {
  low: { person: { '3-1':2, '3-2':2, '3-3':2, '3-4':2, '1-3':2, '6-1':2, '1-4':2, '1-2':98 } },
  high: { person: { '3-1':98, '3-2':98, '3-3':98, '3-4':98, '1-3':98, '6-1':98, '1-4':98, '1-2':2 } },
  negative: { work: { '11-1':95, '11-2':5 }, school: { '12-4':95 } },
  recovery: { person: { '2-3':80, '2-2':80 }, work: { '11-1':20 } },
};

export function syntheticCurrentWorld(seed, profile) {
  const player = confirmCandidate(createCandidate({ seed, playerId:'teacher', schoolId:'school' }));
  const world = structuredClone(createWorld({ seed:seed + 1, player }));
  const { person, work, school } = profiles[profile];
  Object.assign(world.player.current.person, person);
  Object.assign(world.player.current.work, work);
  Object.assign(world.school.values, school);
  return restoreWorld(world, { stage:'runtime' });
}
