process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),driver=require('./act2-test-driver.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),p=await browser.newPage({viewport:{width:1366,height:768}}),errors=[],cases=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=()=>{}});
 await p.goto('http://127.0.0.1:8000/');assert.match(await p.title(),/Halloween/);await p.locator('[data-confirm=aleks]').click();
 for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  await p.evaluate(()=>__NOCTURNE.startChapter('boris',{aleks:'pen',sandra:'tom'}));await driver(p).drain();await driver(p).seat();
  await p.locator('[data-owner=aleks][data-answer="0"]').click();await p.locator('[data-owner=sandra][data-answer="1"]').click();await driver(p).drain();
  const old=await p.locator(`[data-owner=aleks][data-answer="${a}"]`).elementHandle();
  await p.locator(`[data-owner=aleks][data-answer="${a}"]`).click();await p.locator(`[data-owner=sandra][data-answer="${b}"]`).click();
  let s=await p.evaluate(()=>__NOCTURNE.chapterState());
  assert.equal(s.quiz.complete,a===b);
  if(a!==b){
   assert.equal(s.quiz.animal,null);assert.equal(await p.locator('#leave-quiz').isVisible(),false);
   assert.equal(await p.locator('.quiz-options button:not(:disabled)').count(),8);
   for(let i=0;i<b;i++)await p.keyboard.press('s');await p.keyboard.press('f');
  }
  s=await p.evaluate(()=>__NOCTURNE.chapterState());assert(s.quiz.complete);assert.equal(s.quiz.animal,['chrupek','lila','arena','etf'][b]);assert.deepEqual(s.quiz.answers[1],{aleks:b,sandra:b});
  await old.evaluate(el=>el.click());assert.equal((await p.evaluate(()=>__NOCTURNE.chapterState())).quiz.animal,s.quiz.animal);
  await p.locator('#leave-quiz').click();assert(!(await p.evaluate(()=>__NOCTURNE.chapterState())).quiz.open);
  await p.keyboard.press('r');assert.equal((await p.evaluate(()=>__NOCTURNE.chapterState())).quiz.animal,null);
  cases.push({initial:[a,b],agreed:b,passed:true});
 }
 assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync('diagnostics/v12-shared-quiz.json',JSON.stringify({cases,errors,viewport:[1366,768]},null,2));console.log('16/16 shared choice combinations, keyboard recovery, stale clicks and reset PASS');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
