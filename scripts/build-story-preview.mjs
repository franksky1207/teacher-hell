// AVG-only preview packaging. The shared build currently synthesizes a legacy
// health fixture that is invalid under V3 states; a static story rehearsal needs
// only the validated web/src module graph and original art assets.
import {readFile,readdir,mkdir,cp,rm,writeFile} from 'node:fs/promises';
import {resolve,relative,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {checkProject,filesUnder,root} from './project.js';
await checkProject();
const destination=resolve(root,'dist');
await rm(destination,{recursive:true,force:true});
await mkdir(destination);
await cp(resolve(root,'src'),resolve(destination,'src'),{recursive:true});
for(const file of await filesUnder(resolve(root,'web'))){
 const target=resolve(destination,file.endsWith(sep+'index.html')?'index.html':relative(root,file));
 await mkdir(resolve(target,'..'),{recursive:true});
 await cp(file,target);
}
const manifest={};
for(const file of await filesUnder(destination)){
 const name=relative(destination,file).split(sep).join('/');
 manifest[name]=createHash('sha256').update(await readFile(file)).digest('hex');
}
await writeFile(resolve(destination,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('PASS story preview static package:',Object.keys(manifest).length,'files');
