process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),driver=require('./campaign-driver.cjs');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'msedge'}),p=await b.newPage({viewport:{width:1366,height:768}}),errors=[],reports=[];p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=()=>{}});await p.goto('http://127.0.0.1:8000/');const d=driver(p),state=()=>p.evaluate(()=>__NOCTURNE.campaignState());
 for(const winA of [false,true])for(const winS of [false,true]){
  await p.evaluate(()=>__NOCTURNE.campaignCheckpoint('zoo',{aleks:'pen',sandra:'pen'}));await d.drain();await p.keyboard.press('e');
  if(winS)for(let i=0;i<5;i++){await d.walkTo(i%2?7:3,-4-i*2,'sandra');await p.keyboard.press('Enter');}
  if(winA)await d.fight(90);else await p.evaluate(()=>__NOCTURNE.simulate(61));await d.drain();let s=await state();assert.equal(s.zoo.aleksWon,winA);assert.equal(s.zoo.sandraWon,winS);
  if(!winS){assert.equal(s.mode,'phone');await p.evaluate(()=>__NOCTURNE.simulate(60.1));await d.drain();}
  if(!winA){assert.equal((await state()).mode,'unseal');await d.walkTo(-.5,1.5,'aleks');await d.walkTo(.5,1.5,'sandra');await p.keyboard.down('ShiftRight');await p.evaluate(()=>__NOCTURNE.simulate(2));await p.keyboard.up('ShiftRight');await d.drain();}
  assert.equal((await state()).mode,'return');assert(!(await state()).seal);reports.push({winA,winS,passed:true});
 }
 for(const [a,s,count] of [['fork','pen',4],['pen','gouda',2],['fork','gouda',1],['gouda','fork',1]]){await p.evaluate(({a,s})=>__NOCTURNE.campaignCheckpoint('zoo',{aleks:a,sandra:s}),{a,s});await d.drain();await p.keyboard.press('x');await d.drain();await p.keyboard.press('.');await d.drain();assert.equal((await state()).zoo.count,count);await p.keyboard.press('x');await p.keyboard.press('.');assert.equal((await state()).zoo.count,count);reports.push({a,s,count,passed:true});}
 assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync('diagnostics/campaign-zoo.json',JSON.stringify({reports,errors},null,2));console.log('4 outcome pairs and 4 private-artifact combinations PASS');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
