import { writeFile,readFile } from 'node:fs/promises';
import { compileSeniorCalendar } from '../src/calendar/senior-rules.js';
import { compileCalendar } from '../src/calendar/rules.js';
const text='/** Generated finite game calendar. Regenerate: npm run calendar:build. Sources and assumptions in docs/07. */\nexport const FIXED_CALENDAR = '+JSON.stringify(compileCalendar())+';\n';
const path=new URL('../src/calendar/fixed.js',import.meta.url);
if(process.argv.includes('--check')){if(await readFile(path,'utf8')!==text)throw Error('Fixed calendar differs from compiler/source; regenerate and validate');console.log('PASS fixed calendar reproducibility');}
else{await writeFile(path,text);const data=compileCalendar();console.log(JSON.stringify({years:data.years.length,conflicts:data.conflicts},null,2));if(data.conflicts.length)process.exitCode=1;}

const seniorText='/** Generated H1 projection; school-world assumptions. Regenerate: npm run calendar:build. */\nexport const SENIOR_CALENDAR = '+JSON.stringify(compileSeniorCalendar(compileCalendar()))+';\n';
const seniorPath=new URL('../src/calendar/senior-fixed.js',import.meta.url);
if(process.argv.includes('--check')){if(await readFile(seniorPath,'utf8')!==seniorText)throw Error('Senior calendar differs from compiler');console.log('PASS senior calendar reproducibility');}
else await writeFile(seniorPath,seniorText);
