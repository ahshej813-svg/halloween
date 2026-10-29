module.exports=function(p){
 const base=require('./coop-driver.cjs')(p);
 async function drain(){return base.drain();}
 async function walkTo(x,z,who=null){return p.evaluate(({x,z,who})=>{
  const initial=__NOCTURNE.playState(),selected=initial.players.filter(p=>!who||p.id===who),routes=selected.map((p,i)=>({id:p.id,route:__NOCTURNE.pathTo(p.id,x+(who?0:p.id==='sandra'?.62:-.62),z)}));
  const held=new Set(),keyNames={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ArrowUp:'ArrowUp',ArrowDown:'ArrowDown',ArrowLeft:'ArrowLeft',ArrowRight:'ArrowRight'};
  const release=()=>{for(const code of held)dispatchEvent(new KeyboardEvent('keyup',{code,key:keyNames[code],bubbles:true}));held.clear();};
  if(routes.some(r=>!r.route.length))throw Error('No route '+JSON.stringify({x,z,who,initial}));
  for(let n=0;n<7000;n++){
   const s=__NOCTURNE.playState(),g=__NOCTURNE.gameState();if(g.dialogue||g.act.busy){release();return 'event';}const want=new Set();let done=true;
   for(const r of routes){const p=s.players.find(p=>p.id===r.id),b=r.id==='sandra'?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];while(r.route.length&&Math.hypot(p.x-r.route[0].x,p.z-r.route[0].z)<.14)r.route.shift();if(!r.route.length)continue;done=false;const q=r.route[0],dx=q.x-p.x,dz=q.z-p.z;if(Math.abs(dx)>.05)want.add(dx>0?b[1]:b[0]);if(Math.abs(dz)>.05)want.add(dz>0?b[3]:b[2]);}
   if(done){release();return 'arrived';}for(const code of held)if(!want.has(code)){dispatchEvent(new KeyboardEvent('keyup',{code,key:keyNames[code],bubbles:true}));held.delete(code);}for(const code of want)if(!held.has(code)){dispatchEvent(new KeyboardEvent('keydown',{code,key:keyNames[code],bubbles:true}));held.add(code);}__NOCTURNE.simulate(1/60);
  }release();throw Error('Walk stalled '+JSON.stringify({x,z,who,play:__NOCTURNE.playState(),campaign:__NOCTURNE.campaignState()}));
 },{x,z,who});}
 async function screenshot(name){await p.waitForTimeout(250);await p.screenshot({path:'previews/campaign-'+name+'.png'});}
 async function fight(maxSeconds=400){return p.evaluate(maxSeconds=>{
  const initial=__NOCTURNE.campaignState().mode,held=new Set();const event=(code,down)=>dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,bubbles:true}));const keys=[['KeyA','KeyD','KeyW','KeyS'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']];
  const safe=(x,z,s)=>!s.hazards.some(h=>h.type==='Pentagram'?(Math.abs(Math.hypot(x,z+8)-(s.clock-h.at-h.warn)*4)<1&&Math.abs(Math.atan2(x,z+8))>.6):h.zones.some(a=>a.kind==='circle'?Math.hypot(x-a.x,z-a.z)<a.r+.8:Math.abs(x-a.x)<a.w/2+.65&&Math.abs(z-a.z)<a.d/2+.65));
  for(let step=0;step<maxSeconds*15;step++){
   const s=__NOCTURNE.campaignState(),g=__NOCTURNE.gameState(),players=__NOCTURNE.playState().players;if(s.mode!==initial||g.dialogue||g.act.busy){for(const k of held)event(k,false);held.clear();if(s.mode===initial&&initial==='boss'&&g.dialogue&&!document.querySelector('#next').hidden){document.querySelector('#next').click();continue;}return {mode:s.mode,clock:s.clock,hp:s.hp};}
   const want=new Set();for(let i=0;i<2;i++){
    if(s.hp[i]<=0)continue;const p=players[i],other=players[1-i];if(s.hp[1-i]<=0){want.add(i?'Enter':'KeyE');const dx=other.x-p.x,dz=other.z-p.z;if(Math.hypot(dx,dz)>1.4){if(Math.abs(dx)>.1)want.add(keys[i][dx>0?1:0]);if(Math.abs(dz)>.1)want.add(keys[i][dz>0?3:2]);}continue;}
    const candidates=s.mobs.filter(m=>m.hp>0&&(m.owner===null||m.owner===i)).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z));let target=candidates[0]||{x:i?1.7:-1.7,z:-14.4};
    if(initial==='boss'&&s.hazards.length){const points=[];for(let x=-8;x<=8;x+=2)for(let z=-20;z<=0;z+=2)if(safe(x,z,s))points.push({x,z});points.sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z));target=points[0]||target;}
    const dx=target.x-p.x,dz=target.z-p.z;if(Math.hypot(dx,dz)>(initial==='boss'?.35:1.1)){if(Math.abs(dx)>.12)want.add(keys[i][dx>0?1:0]);if(Math.abs(dz)>.12)want.add(keys[i][dz>0?3:2]);}want.add(i?'ShiftRight':'Space');
   }
   for(const k of held)if(!want.has(k)){event(k,false);held.delete(k);}for(const k of want)if(!held.has(k)){event(k,true);held.add(k);}__NOCTURNE.simulate(1/15);
  }for(const k of held)event(k,false);throw Error('Fight stalled '+JSON.stringify(__NOCTURNE.campaignState()));
 },maxSeconds);}
 return {...base,drain,walkTo,screenshot,fight};
};
