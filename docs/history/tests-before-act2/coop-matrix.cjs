process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs'),driver=require('./coop-driver.cjs');
(async()=>{const b=await chromium.launch({headless:true,channel:'msedge'}),p=await b.newPage({viewport:{width:1280,height:800}}),errors=[],reports=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&m.text().includes('Render NOCTURNE'))errors.push(m.text())});await p.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=()=>{}});
const places={gabrys:{x:-5.2,z:-54.75},weronika:{x:5,z:-58.75},boris:{x:-7.2,z:-68.75}},quotes={gabrys:'Jakby Aleks umarł, to bym zapomniał po 3 sekundach.',weronika:'Ummmm… O kurwa, naucz się kurwa grać wreszcie.',boris:'Jednak Gabryś to był zajebisty ziom.'};
for(const target of ['gabrys','weronika','boris'])for(const order of ['help','grave'])for(const item of ['take','flee'])for(const victim of ['gabrys','weronika','boris','sandra','self']){
 await p.goto('http://127.0.0.1:8000/');await p.locator('#screen').click({position:{x:5,y:5}});await p.evaluate(()=>__NOCTURNE.startPlay());const {drain,nav,choose,interact}=driver(p);await drain();await nav(0,-12);await drain();await p.locator(`[data-target=${target}]`).click();await drain();
 const idle=await p.evaluate(()=>__NOCTURNE.playState().players);await p.evaluate(()=>__NOCTURNE.simulate(80));assert.deepEqual((await p.evaluate(()=>__NOCTURNE.playState().players)).map(a=>[a.x,a.z]),idle.map(a=>[a.x,a.z]));assert(!(await p.evaluate(()=>__NOCTURNE.gameState())).warningSeen);
 await nav(0,-59.2);await drain();await choose(order);
 for(let i=0;i<9;i++){
  const st=await p.evaluate(()=>__NOCTURNE.playState());if(st.stage==='escort')break;
  if(st.objective==='grave'){const d=places[target];await nav(d.x,d.z);await interact();await p.locator('[data-action=inspect]').click();assert.equal(await p.locator('#grave-quote').textContent(),quotes[target]);if(target==='gabrys')assert((await p.locator('#grave-print').textContent()).length>2000);await p.keyboard.press('Escape');await p.locator('[data-action=memorial]').click();await drain();}
  else if(st.objective==='house'){await nav(10,-36.2);await interact();}
  else if(st.objective==='house-table'){await nav(.8,-2.8);await interact();await choose(item);}
  else if(st.objective==='leave-house'){await nav(0,2.65);await interact();}
  else if(st.objective==='rescue'){await nav(0,-59.2);await interact();}
  else throw Error('Unexpected quest '+JSON.stringify(st));
 }
 let g=await p.evaluate(()=>__NOCTURNE.gameState()),st=await p.evaluate(()=>__NOCTURNE.playState());assert.equal(st.stage,'escort');assert(g.visited&&g.act.rescueAttempted&&g.act.revived);assert.equal(g.act.rescued,item==='take');assert.equal(g.act.tool,item==='take');assert.equal(g.act.order,order==='help'?'help-first':'grave-first');assert(st.npcs.every(n=>n.route.length>0));
 await nav(0,-43.5);await p.evaluate(()=>__NOCTURNE.simulate(35));await drain();st=await p.evaluate(()=>__NOCTURNE.playState());assert.equal(st.stage,'verdict');assert(st.npcs.every(n=>n.z>-49&&!n.route.length));assert(st.avenger.z>-49);assert.equal(await p.locator('[data-choice]').count(),5);await choose(victim);
 if(victim==='self'){assert.equal((await p.evaluate(()=>__NOCTURNE.playState())).objective,'escape');assert.notEqual((await p.evaluate(()=>__NOCTURNE.gameState())).phase,'complete');await nav(0,-31);await drain();}
 g=await p.evaluate(()=>__NOCTURNE.gameState());assert.equal(g.phase,'complete');assert.equal(g.act.victim,victim);assert.equal(g.act.ending,victim==='self'?'crows':'punishment');assert(g.visited);assert(!g.act.busy&&!g.act.pending);await p.keyboard.press('r');g=await p.evaluate(()=>__NOCTURNE.gameState());st=await p.evaluate(()=>__NOCTURNE.playState());assert.equal(g.target,null);assert(!g.act.tool&&!g.act.rescued&&!g.act.revived&&!st.active);assert.equal(st.players.length,0);assert.equal(st.keys.length,0);
 reports.push({target,order,item,victim,passed:true});if(reports.length%5===0)console.log(`${reports.length}/60 co-op routes passed`);
}
assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync('diagnostics/coop-matrix.json',JSON.stringify({errors,reports},null,2));console.log('60/60 COOP ROUTES PASSED');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
