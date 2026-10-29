process.chdir(require('path').resolve(__dirname,'..'));
const {chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict'),os=require('os'),driver=require('./coop-driver.cjs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),p=await browser.newPage(),errors=[],reports=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await p.addInitScript(()=>{window.AudioContext=null;window.webkitAudioContext=null;speechSynthesis.speak=()=>{}});await p.goto('http://127.0.0.1:8000/');
 for(const viewport of [{width:1366,height:768},{width:1920,height:1080}])for(const quality of ['low','high'])for(const scene of ['storm','zoo','boss','pigeons']){
  await p.setViewportSize(viewport);await p.keyboard.press('Escape');await p.getByLabel('Jakość',{exact:true}).selectOption(quality);await p.keyboard.press('Escape');
  if(scene==='storm')await p.evaluate(()=>__NOCTURNE.startChapter('weronika'));else{await p.evaluate(scene=>__NOCTURNE.campaignCheckpoint(scene==='pigeons'?'ending':scene,{aleks:'rem',sandra:'tom'},scene==='pigeons'?{ending:2}:{}),scene);await driver(p).drain();}
  await p.waitForTimeout(300);await p.evaluate(()=>__NOCTURNE.resetPerformance());await p.waitForTimeout(scene==='storm'?2500:scene==='pigeons'?1800:3500);
  const data=await p.evaluate(()=>({performance:__NOCTURNE.performance(),settings:__NOCTURNE.settingsState(),campaign:__NOCTURNE.campaignState().mode})),a=data.performance.intervals.slice(2).sort((a,b)=>a-b);
  assert(a.length>12);reports.push({scene,quality,viewport,samples:a.length,fps:1000/(a.reduce((s,x)=>s+x,0)/a.length),median:a[Math.floor(a.length*.5)],p95:a[Math.floor(a.length*.95)],mode:data.campaign,gpu:data.performance.gpu});await p.screenshot({path:`previews/perf-${scene}-${quality}-${viewport.width}.png`});console.log(JSON.stringify(reports.at(-1)));
 }
 assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync('diagnostics/campaign-performance.json',JSON.stringify({hardware:{cpu:os.cpus()[0].model,ramGB:Math.round(os.totalmem()/1024**3),platform:os.platform()},reports,errors,note:'Actual headless Edge frame intervals on this machine; not a physical low-end laptop or two-person hardware ghosting test.'},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
