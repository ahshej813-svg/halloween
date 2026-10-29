process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright');const assert=require('assert/strict');const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:1280,height:800}}),errors=[],reports=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&m.text().includes('Render NOCTURNE'))errors.push(m.text())});
 await page.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=u=>{u.onstart?.();u.onend?.()};speechSynthesis.cancel=()=>{};});
 async function drain(){return page.evaluate(()=>{for(let i=0;i<100;i++){const state=__NOCTURNE.gameState();if(state.act.busy){__NOCTURNE.advanceAct(9);continue;}const panel=document.querySelector('#conversation'),next=document.querySelector('#next');if(!panel.hidden&&!next.hidden){next.click();continue;}return __NOCTURNE.gameState();}throw Error('Dialogue failed to settle')});}
 async function choose(id){await page.evaluate(id=>{const b=document.querySelector(`[data-choice="${id}"]`);if(!b)throw Error('Missing choice '+id);b.click()},id);return drain();}
 for(const target of ['gabrys','weronika','boris'])for(const order of ['help','grave'])for(const item of ['take','flee'])for(const victim of ['gabrys','weronika','boris','sandra','self']){
  await page.goto('http://localhost:8000/');await page.locator('#screen').click({position:{x:10,y:10}});await page.evaluate(()=>__NOCTURNE.seek(35.5));await page.waitForFunction(()=>__NOCTURNE.gameState().phase==='discovery');await drain();
  await page.evaluate(()=>__NOCTURNE.seek(39));await page.waitForFunction(()=>__NOCTURNE.gameState().phase==='choice');await drain();await page.evaluate(id=>document.querySelector(`[data-target=${id}]`).click(),target);await drain();
  await page.evaluate(()=>__NOCTURNE.seek(58));await page.waitForFunction(()=>__NOCTURNE.gameState().warningSeen);await drain();await choose(order);
  if(order==='grave'){await page.evaluate(()=>__NOCTURNE.seek(68));await page.waitForFunction(()=>__NOCTURNE.gameState().arrival);await drain();await page.evaluate(()=>document.querySelector('[data-action=memorial]').click());await drain();}
  assert.equal((await page.evaluate(()=>__NOCTURNE.gameState())).act.scene,'house');await choose(item);
  if((await page.evaluate(()=>__NOCTURNE.gameState())).act.scene==='cemetery'){await page.evaluate(()=>document.querySelector('[data-action=memorial]').click());await drain();}
  assert.equal(await page.locator('[data-choice]').count(),5);await choose(victim);
  const state=await page.evaluate(()=>__NOCTURNE.gameState());assert.equal(state.phase,'complete');assert.equal(state.target,target);assert.equal(state.visited,order==='grave'||item==='flee');assert.equal(state.act.tool,item==='take');assert.equal(state.act.rescued,item==='take');assert(state.act.rescueAttempted&&state.act.revived);assert.equal(state.act.victim,victim);assert.equal(state.act.ending,victim==='self'?'crows':'punishment');assert.equal(state.act.dice,victim==='self');assert(!state.act.busy&&!state.act.pending&&!state.dialogue);
  await page.evaluate(()=>document.querySelector('#replay').click());const reset=await page.evaluate(()=>__NOCTURNE.gameState());assert.equal(reset.phase,'intro');assert.equal(reset.act.tool,false);assert.equal(reset.act.ending,null);assert.equal(reset.act.releaseAt,null);assert.equal(reset.target,null);
  reports.push({target,order,item,victim,passed:true});if(reports.length%10===0)console.log(`${reports.length}/60 paths passed`);
 }
 assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync('diagnostics/audit-matrix.json',JSON.stringify({errors,reports},null,2));console.log('ALL 60 PATHS PASSED');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
