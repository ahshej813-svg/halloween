process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),driver=require('./act2-test-driver.cjs');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'msedge'}),context=await b.newContext({viewport:{width:1366,height:768}}),p=await context.newPage(),errors=[],checks=[];
 await context.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=()=>{}});p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8000/');await p.evaluate(()=>__NOCTURNE.startPlay({aleks:'food',sandra:'tom'}));await driver(p).drain();
 await p.keyboard.down('w');await p.evaluate(()=>__NOCTURNE.simulate(.4));await p.keyboard.up('w');assert(await p.evaluate(()=>__NOCTURNE.saveCheckpoint()));
 const before=await p.evaluate(()=>__NOCTURNE.checkpointState());await p.reload();assert(await p.locator('#resume-checkpoint').isVisible());await p.locator('#resume-checkpoint').focus();await p.keyboard.press('Enter');
 let after=await p.evaluate(()=>__NOCTURNE.playState());assert(after.active);assert.equal(after.players[0].z,before.play.players[0].z);assert.equal((await p.evaluate(()=>__NOCTURNE.inventoryState())).bag.aleks.id,'food');checks.push('world inventory/position; reload; keyboard resume');
 await p.evaluate(()=>__NOCTURNE.startChapter('weronika',{aleks:'pen',sandra:'tom'}));await driver(p).drain();await driver(p).seat();
 await p.locator('[data-owner=aleks][data-answer="0"]').click();assert(await p.evaluate(()=>__NOCTURNE.saveCheckpoint()));await p.reload();await p.locator('#resume-checkpoint').click();
 let q=(await p.evaluate(()=>__NOCTURNE.chapterState())).quiz;assert(q.open);assert.deepEqual(q.answers[0],{aleks:0,sandra:null});assert.equal(q.ink.aleks,'pen');assert.equal(q.ink.sandra,'red');checks.push('partial trust and individual ink');
 await p.locator('[data-owner=sandra][data-answer="1"]').click();await driver(p).drain();await p.locator('[data-owner=aleks][data-answer="2"]').click();await p.locator('[data-owner=sandra][data-answer="3"]').click();
 await p.reload();await p.locator('#resume-checkpoint').click();q=(await p.evaluate(()=>__NOCTURNE.chapterState())).quiz;assert.deepEqual(q.answers[1],{aleks:2,sandra:3});assert(!q.complete);await p.locator('[data-owner=sandra][data-answer="2"]').click();assert.equal((await p.evaluate(()=>__NOCTURNE.chapterState())).quiz.animal,'arena');checks.push('disagreement reload and recovery');
 await p.reload();await p.locator('#resume-checkpoint').click();q=(await p.evaluate(()=>__NOCTURNE.chapterState())).quiz;assert(q.complete&&q.animal==='arena');await p.locator('#leave-quiz').click();await p.keyboard.down('w');await p.evaluate(()=>__NOCTURNE.simulate(.2));await p.keyboard.up('w');checks.push('completed quiz and room movement');
 await p.keyboard.press('r');assert.equal(await p.evaluate(()=>__NOCTURNE.checkpointState()),null);await p.reload();assert(!(await p.locator('#resume-checkpoint').isVisible()));checks.push('full reset clears loop checkpoint');
 for(const bad of ['{broken',JSON.stringify({version:99}),JSON.stringify({...before,play:{...before.play,players:[{...before.play.players[0],x:900},before.play.players[1]]}})]){
  await p.evaluate(raw=>localStorage.setItem('halloween.checkpoint.v1',raw),bad);await p.reload();assert(!(await p.locator('#resume-checkpoint').isVisible()));assert(!(await p.evaluate(()=>__NOCTURNE.resumeCheckpoint())));
 }checks.push('malformed, unsupported version and out-of-range records');assert.equal(errors.length,0,errors.join('\n'));
 fs.writeFileSync('diagnostics/v12-checkpoints.json',JSON.stringify({checks,errors},null,2));console.log(JSON.stringify({checks,errors}));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
