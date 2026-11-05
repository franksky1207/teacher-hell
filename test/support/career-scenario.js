/** Real later-year failure through ready 11-C content and the normal batch boundary. */
import {prepareWorldOperation} from '../../src/runtime/transactions.js';
import {runAnnual} from './annual-scenario.js';
import {catalogueFor,failureRequest} from './failure-scenario.js';
import {failureResult} from '../../src/runtime/homeroom.js';
export function runCareerFailure(initial){
 const catalogueId='homeroom:career-social';
 const registered=prepareWorldOperation(initial,failureRequest(initial,[catalogueFor('social',catalogueId)])).world;
 const stopDate=new Date(Date.parse(initial.position.date+'T00:00:00Z')+10*86400000).toISOString().slice(0,10);
 const result=runAnnual(registered,{catalogueId,option:'appeal',stopDate});
 if(!failureResult(result.world))throw Error('Formal later-year failure was not reached within ten legal days');
 return result.world;
}
