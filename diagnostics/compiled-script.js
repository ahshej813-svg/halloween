
/* A single HTML file, with a genuine perspective-projected 3D environment and
   separately lit spherical objects. The ENTIRE displayed picture is built from
   monospaced glyphs; no photo, image, texture or smooth 3D canvas is shown. */
(()=>{
 'use strict';
 const view=document.querySelector('#screen'),out=view.getContext('2d',{alpha:false});
 const source=document.createElement('canvas'),g=source.getContext('2d',{alpha:false});
 const replay=document.querySelector('#replay');replay.tabIndex=-1;
 const glyphs=' .,:;-=+*oO0%@';
 const palette=['#353e50','#515e73','#718298','#9dabb9','#f0efdf','#594032','#805038','#a5623c','#c87f48','#e6a45f','#f6cd8c','#631a20','#91252c','#314a40','#64816c'];
 let ambientTime=0,windStrength=.2,windPhase=0,cameraFocus=0;
 let W=960,H=540,C=156,R=76,cw=7,ch=12,dpr=1,seed=12891,starfield=[],trees=[],cloudTex;
 const rnd=()=>((seed= (Math.imul(seed,1664525)+1013904223)|0)>>>0)/4294967296;
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const smooth=(a,b,x)=>{let t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
 const mix=(a,b,t)=>a+(b-a)*t;
 const v=(x,y,z)=>({x,y,z});
 const add=(a,b)=>v(a.x+b.x,a.y+b.y,a.z+b.z);
 const sub=(a,b)=>v(a.x-b.x,a.y-b.y,a.z-b.z);
 const mul=(a,k)=>v(a.x*k,a.y*k,a.z*k);
 const dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
 const cross=(a,b)=>v(a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x);
 const norm=a=>mul(a,1/(Math.sqrt(dot(a,a))||1));
 const fmt=(n)=>Math.max(0,Math.min(255,n|0));
 const bg=(x,y)=>{let gr=g.createRadialGradient(W*.48,H*.64,12,W*.48,H*.49,W*.8);gr.addColorStop(0,'#060b12');gr.addColorStop(.54,'#06080f');gr.addColorStop(1,'#010103');g.fillStyle=gr;g.fillRect(0,0,W,H)};
 function resetWorld(){
  seed=12891;starfield=[];
  for(let i=0;i<250;i++)starfield.push({x:(rnd()-.5)*72,y:3+rnd()*19,z:-28-rnd()*33,s:rnd(),tw:rnd()*7});
  // Framing instead of filling: large foreground silhouettes outside the lane.
  trees=[
    makeTree(-5.5,1.2,7.5,1.1,true),
    makeTree(6.6,-2.8,8.3,3.8,true),
    makeTree(-5.5,-13.2,5.1,5.6,false),
    makeTree(8.5,-15.5,4.8,8.7,false),
    makeTree(-7.8,-25,4.9,2.5,false),
    makeTree(9,-27,5.2,7.5,false),
    makeTree(-7.1,-35,4.8,1.6,false),
    makeTree(13.8,-37.2,4.9,3.5,false)
  ];
  // Layered tree line behind the entrance, with gaps around the moon.
  for(let i=0;i<32;i++){
   const side=i%2?-1:1,z=-38-Math.floor(i/2)*4.7;
   trees.push(makeTree(side*(7.8+(i%5)*1.45),z,6.7+(i%4)*.8,i*.83,false));
  }
  cloudTex=makeCloudTexture();
 }
 function makeTree(x,z,h,phase,near){
  const list=[],base=v(x,-1.53,z),outward=Math.sign(x);
  // A tapering, crooked trunk; branches inherit its actual joints.
  const joints=[base];
  for(let k=1;k<=8;k++){
   const f=k/8,prev=joints[k-1];
   const q=v(x+outward*h*(.075*f+.035*Math.sin(f*5+phase)*f),base.y+h*f,z-.4*f);
   list.push({p:prev,q,w:(near?.23:.16)*Math.pow(1-f*.91,1.15),depth:5});joints.push(q);
  }
  function fork(p,ang,len,depth,w){
   if(depth<1||len<.15)return;
   let q=add(p,v(Math.cos(ang)*len,Math.sin(ang)*len,(rnd()-.5)*len*.28));
   // Inward boughs turn upward before entering the moon / path corridor.
   const limit=Math.abs(x)*(near?.64:.69);
   if(q.x*outward<limit){q.x=outward*limit;q.y+=len*.32;}
   const mid=add(mul(add(p,q),.5),v((rnd()-.5)*len*.16,len*.07,0));
   list.push({p,q:mid,w,depth},{p:mid,q,w:w*.73,depth});
   if(depth>1){
    fork(q,ang+(.28+rnd()*.31),len*(.57+rnd()*.13),depth-1,w*.61);
    fork(q,ang-(.29+rnd()*.32),len*(.49+rnd()*.16),depth-1,w*.55);
   }
  }
  for(let k=2;k<8;k++){
   const side=k%2?outward:-outward,len=h*(.30+(7-k)*.022)*(side===outward?1:.62);
   fork(joints[k],(side>0?.56:Math.PI-.56)+(rnd()-.5)*.32,len,4,(near?.105:.073)*(1-k*.07));
  }
  // Roots anchor the trunk beside the road.
  for(let k=0;k<3;k++)list.push({p:base,q:v(x+outward*(.3+k*.22),-1.55,z+(k-1)*.5),w:.10,depth:3});
  for(const segment of list)for(const point of [segment.p,segment.q])point.windWeight=Math.pow(Math.max(0,point.y+1.53)/8,1.7);
  return {x,z,near,segments:list};
 }
 function makeCloudTexture(){
  const t=document.createElement('canvas');t.width=410;t.height=130;const c=t.getContext('2d');const id=c.createImageData(410,130);
  const phases=Array.from({length:12},()=>rnd()*9);
  for(let y=0;y<130;y++)for(let x=0;x<410;x++){
   let u=x/410,yy=(y-65)/65;
   const billow=.13*Math.sin(u*18+phases[2])+.08*Math.cos(u*35+phases[3]);
   const shape=Math.exp(-Math.pow((u-.5)/.43,6)-Math.pow((yy-billow)/.39,2));
   let n=.61+.14*Math.sin(u*22+yy*3+phases[0])+.10*Math.cos(u*43+yy*6+phases[1])+.04*Math.cos(u*80-yy*15);
   const wisps=Math.max(0, Math.min(1,(n-.27)*2.1));
   const alpha=Math.floor(255*clamp(shape*wisps)*(1-Math.pow(Math.abs(yy),1.4)*.5));
   const k=(y*410+x)*4;const light=95+65*clamp(-yy+.35);id.data[k]=light*.83;id.data[k+1]=light*.91;id.data[k+2]=light;id.data[k+3]=alpha;
  }
  c.putImageData(id,0,0);return t;
 }
 let cam,forward,right,up,focal,moonCache=null,pumpkinCache=null,pumpkinSkin=null,mouseX=0,mouseY=0;
 function actorPose(t){
  if(play.active){const c=partyCenter();return {z:c.z,center:c.x,turn:0,d:game.target?destinations[game.target]:null};}
  const d=game.target?destinations[game.target]:null,turn=smooth(60,68,t);
  const z=t<39?mix(-8.5,-13.5,smooth(33,39,t)):mix(-13.5,d?d.z+1.85:-13.5,smooth(39,68,t));
  const center=d?(d.x+(cam?cam.x-d.x:0)*1.85/Math.max(2,cam?cam.z-d.z:9))*turn:0;
  return {z,center,turn,d};
 }
 function setupCamera(t){
  if(play.active){setupPlayCamera();return;}
  const progress=smooth(27,33,t),tunnel=smooth(26,30,t)*(1-smooth(33,36,t));
  const d=game.target?destinations[game.target]:null,turn=smooth(60,68,t),route=actorPose(t);
  const following=smooth(33,38,t),introZ=9-progress*11.2;
  let z=mix(introZ,route.z+5.6,following);
  if(d)z=Math.min(z,mix(introZ,-52.5,smooth(52,57,t)));
  const focus=smooth(54.5,57,t)*(1-smooth(58.5,61,t));cameraFocus=d?focus:0;
  const eye=mix(1.55,.18,following);
  cam=v((mouseX*.065+Math.sin(t*.23)*.035)*(1-tunnel)+(d?d.x*.48*turn:0),mix(mix(eye,-.28,tunnel),.26,cameraFocus),z);
  let target=v(d?d.x*turn:0,mix(1.48,.08,following),d?mix(route.z-12,d.z,turn):route.z-18);
  if(t<33)target=v(0,mix(1.48,-.28,tunnel),-46);
  target=v(target.x*(1-cameraFocus),mix(target.y,1.0,cameraFocus),mix(target.z,-62,cameraFocus));
  forward=norm(sub(target,cam));right=norm(cross(forward,v(0,1,0)));up=norm(cross(right,forward));
  focal=Math.min(H*mix(1.15,1.55,cameraFocus),W*mix(1.02,1.5,cameraFocus));
 }
 function projectXYZ(px,py,pz){const dx=px-cam.x,dy=py-cam.y,dz=pz-cam.z,z=dx*forward.x+dy*forward.y+dz*forward.z;if(z<.15)return null;const s=focal/z;return {x:W*.5+(dx*right.x+dy*right.y+dz*right.z)*s,y:H*.5-(dx*up.x+dy*up.y+dz*up.z)*s,s,z}}
 function proj(p){return projectXYZ(p.x,p.y,p.z)}
 function discPosition(center,rad){let p=proj(center);return p?{...p,r:rad*p.s}:null}
 function drawStars(t){for(let i=0;i<starfield.length;i++){const s=starfield[i];let p=proj(s);if(!p||p.x<1||p.x>W-1||p.y<0||p.y>H*.84)continue;let a=.14+.27*s.s+Math.sin(t*.7+s.tw)*.09;g.fillStyle=`rgba(176,187,205,${a})`;g.fillRect(p.x,p.y,Math.max(1.3,s.s*2.0),Math.max(1.3,s.s*2.0))}}
 const roadHalf=z=>2.30+.13*Math.sin(z*.165)+.05*Math.sin(z*.59);
 const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
 // Fixed world-space plants: shape and placement never randomize per frame.
 const deadNature=[];
 for(let i=0;i<27;i++){
  const side=i%2?-1:1,z=3-i*2.55;
  deadNature.push({type:'shrub',x:side*(3.55+hash(i+90)*2.1),z,size:.34+hash(i+1)*.32,id:i});
 }
 for(let i=0;i<43;i++)deadNature.push({type:'grass',x:(i%2?-1:1)*(2.85+hash(i+2)*1.1),z:5-i*1.65,size:.45+hash(i+6)*.55,id:80+i});
 for(const [x,z,size,id] of [[-4.3,-12,1,170],[4.7,-22,.85,171],[-5.1,-32,.7,172],[5,-44,.8,173]])deadNature.push({type:'stump',x,z,size,id});
 for(const [x,z,size,id] of [[-4.6,-17,1,180],[5.2,-31,.75,181],[-5.8,-47,.7,182]])deadNature.push({type:'log',x,z,size,id});
 function natureStroke(a,b,width,color){if(geometryStroke(a,b,width,color))return;
  const p=proj(a),q=proj(b);if(!p||!q)return;
  g.strokeStyle=color;g.lineWidth=clamp(width*p.s,.8,9);g.lineCap='round';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();
 }
 function drawDeadNature(n){
  const base=proj(v(n.x,-1.51,n.z));if(!base||base.x<-200||base.x>W+200||base.y>H+160)return;
  if(game.target){const d=destinations[game.target];if(Math.hypot(n.x-d.x,n.z-d.z)<2)return;}
  // Leave a deliberate open pocket around the corpse and its blood pool.
  if(n.x>2.0&&n.x<5.8&&n.z>-18&&n.z<-10)return;
  const size=n.size,id=n.id,side=Math.sign(n.x);
  const point=(x,y,z=0)=>v(n.x+x*size,-1.5+y*size,n.z+z*size);
  if(n.type==='shrub'){
   // A low, irregular mass of dead leaves supports the forked thorn silhouette.
   for(let k=0;k<8;k++){
    const dx=(hash(id*11+k)-.5)*1.1,dy=.22+hash(id*19+k)*.6;
    const p=proj(point(dx,dy,Math.sin(k)*.18));if(!p)continue;
    g.fillStyle=k%2?'#26302e':'#303935';g.beginPath();g.ellipse(p.x,p.y,p.s*size*.25,p.s*size*.16,k*.8,0,Math.PI*2);g.fill();
   }
   for(let k=0;k<9;k++){
    const dx=(hash(id*27+k)-.5)*1.75,dy=.52+hash(id*7+k)*.95;
    const sway=Math.sin(windPhase*.65+k+id)*.042*windStrength;
    const endX=side*Math.max(2.7,Math.abs(n.x+dx*size+sway));
    const root=point((hash(k+id)-.5)*.24,0),joint=point(dx*.45,dy*.57),tip=v(endX,-1.5+dy*size,n.z+Math.sin(k)*.22);
    natureStroke(root,joint,.043,'#515952');natureStroke(joint,tip,.024,k%3?'#657064':'#857e69');
    const fork=v(tip.x+Math.cos(k*2.3)*size*.28,tip.y+size*.20,tip.z-.12);
    natureStroke(joint,fork,.019,'#657064');
    const thorn=add(joint,v(size*.12,0,.02));natureStroke(joint,thorn,.014,'#8b836e');
    if(k%3===0){const p=proj(tip);if(p){g.fillStyle='#87785a';g.beginPath();g.ellipse(p.x,p.y,p.s*size*.055,p.s*size*.10,-.6,0,Math.PI*2);g.fill();}}
   }
  }else if(n.type==='grass'){
   for(let k=0;k<7;k++){
    const dx=(k-3)*.11,dy=.43+hash(id+k)*.53;
    const tip=point(dx+Math.sin(windPhase*.7+id)*.12*windStrength,dy,Math.sin(k)*.08);
    natureStroke(point((k-3)*.025,0),tip,.018,k%2?'#636653':'#494f46');
    if(k%2===0)natureStroke(tip,add(tip,v(.025*size,.12*size,0)),.043,'#86816a');
   }
  }else if(n.type==='stump'){
   const a=proj(point(-.25,0)),b=proj(point(.25,0)),c=proj(point(.21,.91)),d=proj(point(-.27,.72));if(!a||!b||!c||!d)return;
   g.fillStyle='#42443d';g.strokeStyle='#817966';g.lineWidth=1.4;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.lineTo(c.x,c.y);g.lineTo(d.x,d.y);g.closePath();g.fill();g.stroke();
   for(let k=0;k<4;k++)natureStroke(point(-.18+k*.11,.04),point(-.20+k*.11,.71+hash(k+id)*.18),.018,k%2?'#7e7867':'#262f2c');
   for(const sign of [-1,1])natureStroke(point(sign*.15,.15),point(sign*.65,0,sign*.17),.07,'#626251');
   natureStroke(point(.12,.61),point(.54,.82,.05),.065,'#6c6c58');
  }else{
   const from=point(-.95,.18,.12),to=point(.85,.20,-.25);
   natureStroke(from,to,.31,'#40453e');natureStroke(add(from,v(0,.09,0)),add(to,v(0,.08,0)),.075,'#85806a');
   natureStroke(add(from,v(0,-.07,0)),add(to,v(0,-.06,0)),.035,'#232e2b');
   for(let k=0;k<3;k++){const joint=add(from,mul(sub(to,from),.22+k*.26));natureStroke(joint,add(joint,v(.18,.32+k*.07,-.22)),.06,'#6e715e');}
   const p=proj(to);if(p){g.fillStyle='#a29370';g.beginPath();g.ellipse(p.x,p.y,p.s*size*.10,p.s*size*.145,-.5,0,Math.PI*2);g.fill();g.strokeStyle='#4d5144';g.lineWidth=1;g.beginPath();g.ellipse(p.x,p.y,p.s*size*.055,p.s*size*.085,-.5,0,Math.PI*2);g.stroke();}
  }
 }
 let meshFaces=[],meshCapture=null;
 const graveGeometry=new Map();
 const moonDirection=norm(v(-.36,.78,.52));
 function meshFace(points,color){
  if(modelTransform){const {x,z,c,s}=modelTransform;points=points.map(p=>{const dx=p.x-x,dz=p.z-z;return v(x+dx*c+dz*s,p.y,z-dx*s+dz*c)});}
  if(meshCapture){meshCapture.push({points,color});return;}
  if(act.scene==='resurrection'||play.stage==='resurrection'||journey.mode==='burial'){
   const clipped=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],inside=a.y>=-1.49,nextInside=b.y>=-1.49;if(inside)clipped.push(a);if(inside!==nextInside){const t=(-1.49-a.y)/(b.y-a.y);clipped.push(add(a,mul(sub(b,a),t)));}}points=clipped;if(points.length<3)return;
  }
  if(points.moonShade===undefined)points.moonShade=.25+.75*Math.max(0,dot(norm(cross(sub(points[1],points[0]),sub(points[2],points[0]))),moonDirection));
  let projected=points.map(proj);
  if(projected.some(p=>!p)){
   const clipped=[],shade=points.moonShade,depth=p=>(p.x-cam.x)*forward.x+(p.y-cam.y)*forward.y+(p.z-cam.z)*forward.z;
   for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],da=depth(a),db=depth(b),inside=da>=.16,nextInside=db>=.16;if(inside)clipped.push(a);if(inside!==nextInside)clipped.push(add(a,mul(sub(b,a),(.16-da)/(db-da))));}
   if(clipped.length<3)return;points=clipped;points.moonShade=shade;projected=points.map(proj);if(projected.some(p=>!p))return;
  }
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,sumZ=0;
  for(const p of projected){minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);sumZ+=p.z;}
  if(maxX<0||minX>W||maxY<0||minY>H)return;
  const depth=sumZ/projected.length;
  const diffuse=modelTransform?Math.max(.52,points.moonShade):points.moonShade;
  const fog=Math.exp(-Math.max(0,depth-14)*.032);
  meshFaces.push({points:projected,depth,alpha:g.globalAlpha,color:color.map(c=>fmt(c*diffuse*fog))});
 }
 function meshBox(x,y,z,w,h,d,color){
  const a=[v(x-w/2,y,z+d/2),v(x+w/2,y,z+d/2),v(x+w/2,y+h,z+d/2),v(x-w/2,y+h,z+d/2),v(x-w/2,y,z-d/2),v(x+w/2,y,z-d/2),v(x+w/2,y+h,z-d/2),v(x-w/2,y+h,z-d/2)];
  for(const face of [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[3,2,6,7],[4,5,1,0]])meshFace(face.map(i=>a[i]),color);
 }
 function meshPrism(x,y,z,profile,depth,color){
  meshFace(profile.map(([a,b])=>v(x+a,y+b,z+depth/2)),color);
  meshFace([...profile].reverse().map(([a,b])=>v(x+a,y+b,z-depth/2)),color);
  for(let i=0;i<profile.length;i++){const a=profile[i],b=profile[(i+1)%profile.length];meshFace([v(x+a[0],y+a[1],z+depth/2),v(x+a[0],y+a[1],z-depth/2),v(x+b[0],y+b[1],z-depth/2),v(x+b[0],y+b[1],z+depth/2)],color);}
 }
 function meshLimb(a,b,r1,r2,color,sides=8){
  const axis=norm(sub(b,a)),ref=Math.abs(axis.y)>.9?v(1,0,0):v(0,1,0),u=norm(cross(axis,ref)),w=norm(cross(axis,u));
  const ring=(p,r)=>Array.from({length:sides},(_,i)=>add(p,add(mul(u,Math.cos(i/sides*Math.PI*2)*r),mul(w,Math.sin(i/sides*Math.PI*2)*r))));
  const ra=ring(a,r1),rb=ring(b,r2);
  for(let i=0;i<sides;i++)meshFace([ra[i],ra[(i+1)%sides],rb[(i+1)%sides],rb[i]],color);
  meshFace([...ra].reverse(),color);meshFace(rb,color);
 }
 function meshEllipsoid(center,rx,ry,rz,color){
  const small=characterMotion&&Math.max(rx,ry,rz)*(proj(center)?.s||0)<12,rings=small?4:6,sides=small?6:10,vertices=[];
  for(let i=0;i<=rings;i++){const row=[],angle=(i/rings-.5)*Math.PI,c=Math.cos(angle),s=Math.sin(angle);for(let j=0;j<=sides;j++){const a=j/sides*Math.PI*2;row.push(v(center.x+rx*c*Math.cos(a),center.y+ry*s,center.z+rz*c*Math.sin(a)));}vertices.push(row);}
  for(let i=0;i<rings;i++)for(let j=0;j<sides;j++)meshFace([vertices[i][j],vertices[i+1][j],vertices[i+1][j+1],vertices[i][j+1]],color);
 }
 function flushMesh(){if(geometryDeferred&&geometryInit())return;if(geometryFlush(meshFaces)){meshFaces=[];return;}
  meshFaces.sort((a,b)=>b.depth-a.depth);
  for(const face of meshFaces){g.fillStyle=`rgb(${face.color.join(',')})`;g.beginPath();face.points.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fill();}
  meshFaces=[];
 }
 function tombProfile(w,h,kind){
  if(kind===1)return [[-w/2,0],[w/2,0],[w/2,h*.76],[w*.43,h*.92],[w*.2,h],[0,h*1.03],[-w*.2,h],[-w*.43,h*.92],[-w/2,h*.76]];
  return [[-w/2,0],[w/2,0],[w/2,h*.91],[w*.38,h],[-w*.38,h],[-w/2,h*.91]];
 }
 const livingPlants=Array.from({length:12},(_,i)=>({x:(i%2?-1:1)*(3.2+(i%3)*.65),z:-6-i*4.4,id:i}));
 function drawLivingPlant(plant){
  if(plant.x>2&&plant.x<5.8&&plant.z>-18&&plant.z<-10)return;
  const root=v(plant.x,-1.49,plant.z),height=.56+(plant.id%3)*.12;
  const bend=Math.sin(windPhase*.9+plant.id)*.12*windStrength;
  const tip=add(root,v(bend,height,0));meshLimb(root,tip,.025,.012,[72,105,87],5);
  for(let i=1;i<6;i++)for(const side of [-1,1]){
   const stem=add(root,mul(sub(tip,root),i/6)),reach=(1-i/7)*.37;
   const end=add(stem,v(side*reach+bend*.3,.11+Math.sin(windPhase+plant.id+i)*.035*windStrength,.08));
   meshFace([stem,add(stem,v(side*reach*.42,.02,.11)),end,add(stem,v(side*reach*.42,.05,-.08))],[80+i*3,116+i*3,95+i*2]);
  }
  flushMesh();
 }
 function graveMesh(x,z,w,h,kind,color,selected=false){
  const distant=play.active&&!selected&&cam.z-z>24,key=[x,z,w,h,kind,...color,selected,distant].join(',');let faces=graveGeometry.get(key);
  if(!faces){meshCapture=[];if(distant){meshPrism(x,-1.3,z,tombProfile(w,h,kind),.28,color);meshFace([v(x-w*.65,-1.45,z+1.6),v(x+w*.65,-1.45,z+1.6),v(x+w*.65,-1.45,z-.1),v(x-w*.65,-1.45,z-.1)],color.map(c=>c*.63));}else buildGraveMesh(x,z,w,h,kind,color,selected);faces=meshCapture;meshCapture=null;graveGeometry.set(key,faces);}
  for(const face of faces)meshFace(face.points,face.color);
 }
 function buildGraveMesh(x,z,w,h,kind,color,selected=false){
  meshBox(x,-1.48,z+.72,w+.35,.16,1.95,color.map(c=>c*.63));
  meshBox(x,-1.32,z,w+.20,.16,.75,color.map(c=>c*.84));
  meshPrism(x,-1.16,z,tombProfile(w,h,kind),selected?.48:.30,color);
  if(kind===2){meshBox(x,-1.15,z+.73,w*.76,.24,1.35,color.map(c=>c*.75));}
 }
 function groundPolygon(points,fill,stroke){if(geometryGround(points,fill,stroke))return;
  let ps=points.map(proj);if(ps.some(p=>!p)){
   const clipped=[],depth=p=>(p.x-cam.x)*forward.x+(p.y-cam.y)*forward.y+(p.z-cam.z)*forward.z;
   for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],da=depth(a),db=depth(b),inside=da>=.16,next=db>=.16;if(inside)clipped.push(a);if(inside!==next)clipped.push(add(a,mul(sub(b,a),(.16-da)/(db-da))));}if(clipped.length<3)return;ps=clipped.map(proj);if(ps.some(p=>!p))return;
  }
  if(ps.every(p=>p.x<0)||ps.every(p=>p.x>W)||ps.every(p=>p.y<0)||ps.every(p=>p.y>H))return;
  g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fillStyle=fill;g.fill();
  if(stroke){g.strokeStyle=stroke;g.lineWidth=.8;g.stroke();}
 }
 function drawGround(t){
  const far=-76,near=play.active?10:cam.z-.35;
  const horizon=proj(v(0,-1.57,far)),horizonY=clamp(horizon?.y??H*.30,0,H);
  const gr=g.createLinearGradient(0,horizonY,0,H);
  gr.addColorStop(0,'#101620');gr.addColorStop(.65,'#0b1017');gr.addColorStop(1,'#080c12');
  g.fillStyle=gr;g.fillRect(0,horizonY,W,H-horizonY);
  // World-space cobbles survive camera movement; no ground corners behind the eye.
  const rowSize=1.45;
  for(let row=-65;row<Math.ceil(near/rowSize);row++){
   const z0=row*rowSize;if(z0>=near)continue;
   const z1=Math.min(z0+rowSize-.09,near),cols=3+Math.floor(hash(row+190)*3);
   const edge=(k,back)=>k===0?0:k===cols?1:k/cols+(hash(row*71+k+(back?15:0))-.5)*.14;
   for(let col=0;col<cols;col++){
    const id=row*19+col;if(hash(id+510)<.065)continue;
    const hw=roadHalf(z0),hb=roadHalf(z1),gap=.045+hash(id+40)*.03;
    const x0=mix(-hw,hw,edge(col,false))+gap,x1=mix(-hw,hw,edge(col+1,false))-gap;
    const xa=mix(-hb,hb,edge(col,true))+gap,xb=mix(-hb,hb,edge(col+1,true))-gap;
    const topL=z0+(hash(row*17+col)-.5)*.26,topR=z0+(hash(row*17+col+1)-.5)*.26;
    const bottomL=z1-(hash(id+8)*.09),bottomR=z1-(hash(id+9)*.09);
    const chip=.04+hash(id+7)*.16,y=-1.535+hash(id+13)*.012;
    const light=33+hash(id+43)*29+clamp((z0+65)/70)*10;
    const warmth=0;
    // Unequal widths, twisted joints and small missing corners; still one lane.
    groundPolygon([v(x0+chip,y,topL),v(x1-chip*.5,y,topR),v(x1,y,topR+chip),v(xb,y,bottomR-chip),v(xb-chip,y,bottomR),v(xa+chip*.3,y,bottomL),v(xa,y,bottomL-chip),v(x0,y,topL+chip)],
     `rgb(${fmt(light+warmth*24)},${fmt(light*.99+warmth*7)},${fmt(light*1.10)})`,'#171e28');
    if(hash(id+7)>.71){
     const center=(x0+x1+xa+xb)/4,z=(z0+z1)/2;
     const a=proj(v(center-.16,y+.012,z-.37)),m=proj(v(center+.07,y+.012,z)),b=proj(v(center-.11,y+.012,z+.38));
     if(a&&m&&b){if(geometryInit()){const color=geometryColor('#111a24'),width=clamp(a.s*.018,.8,2);geometryLineProjected(a,m,width,color);geometryLineProjected(m,b,width,color);}else{g.strokeStyle='#111a24';g.lineWidth=clamp(a.s*.018,.8,2);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(m.x,m.y);g.lineTo(b.x,b.y);g.stroke();}}
    }
   }
  }
  for(let z=-65;z<near;z+=1.12)for(const side of [-1,1]){
   if(hash(Math.floor(z*11)+74)<.11)continue;
   const end=Math.min(z+.97,near),a=side*(roadHalf(z)+.08),b=side*(roadHalf(end)+.08);
   groundPolygon([v(a,-1.48,z),v(a+side*.23,-1.48,z),v(b+side*.23,-1.48,end),v(b,-1.48,end)],'#5d6470','#232b37');
  }
  geometryDrain();for(let i=0;i<390;i++){
   const z=8-(i*.83)%80,side=i%2?-1:1,dist=2.85+hash(i)*7;
   const p=proj(v(side*dist,-1.53,z));if(!p||p.x<-10||p.x>W+10||p.y>H)continue;
   let sz=clamp(p.s*.07,.5,9);g.strokeStyle=i%3?'#333e49':'#48515a';g.lineWidth=.8;
   g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-sz*.4,p.y-sz);g.moveTo(p.x,p.y);g.lineTo(p.x+sz*.3,p.y-sz*.8);g.stroke();
  }
 }
 function drawMoon(t){
  // Reserved sky pocket: the moon remains far above the path and outside foreground props.
  const arc=smooth(0,8,t);
  const x=mix(-.15,.035,arc)*W*189/focal,y=1.55+H*(.285+Math.sin(arc*Math.PI)*.045)*189/focal,z=-180;
  const pos=discPosition(v(x,y,z),Math.min(W*.16,H*.112)*189/focal);if(!pos)return;
  const {x:cx,y:cy,r}=pos;
  if(cx+r<0||cx-r>W||cy+r<0||cy-r>H)return;
  const sz=320;
  if(!moonCache){
    const temp=document.createElement('canvas');temp.width=temp.height=sz;
    const ctx=temp.getContext('2d'),img=ctx.createImageData(sz,sz),data=img.data;
    const craters=[];let s=87239;
    for(let n=0;n<31;n++){
      s=(Math.imul(s,1664525)+1013904223)|0;const a=(s>>>0)/4294967296;
      s=(Math.imul(s,1664525)+1013904223)|0;const b=(s>>>0)/4294967296;
      s=(Math.imul(s,1664525)+1013904223)|0;const c=(s>>>0)/4294967296;
      craters.push([(a*2-1)*.88,(b*2-1)*.88,.045+Math.pow(c,2)*.19]);
    }
    const light=norm(v(-.35,.41,1.15));
    for(let py=0;py<sz;py++)for(let px=0;px<sz;px++){
      const u=(px+.5)/sz*2-1,vv=1-(py+.5)/sz*2,rr=u*u+vv*vv;if(rr>=1)continue;
      const zz=Math.sqrt(1-rr);let relief=0,albedo=0;
      for(const [a,b,c] of craters){const d=Math.hypot(u-a,vv-b);if(d>c*1.42)continue;
        relief+=.115*Math.exp(-Math.pow((d-c)/(c*.19),2))-.07*Math.exp(-Math.pow(d/(c*.62),2));
        albedo+=(-.21+.15*((u-a)-(vv-b))/c)*Math.exp(-Math.pow(d/(c*.82),4))+.13*Math.exp(-Math.pow((d-c)/(c*.13),2));
      }
      const maria=.055*Math.sin(u*8+vv*3)+.06*Math.sin(u*14-vv*5)*Math.cos(vv*9);
      const grain=.028*Math.sin(u*117+vv*36)*Math.cos(vv*92-u*51);
      const n=norm(v(u+relief*.16,vv+relief*.22,zz));
      const diffuse=clamp(dot(n,light)*.61+.26);
      const shade=clamp(diffuse+albedo*1.65+maria*1.4+grain*.35);
      const edge=smooth(1,.967,Math.sqrt(rr));let val=(119+133*shade)*edge;
      const i=(py*sz+px)*4;
      data[i]=fmt(val*.98);data[i+1]=fmt(val*.99);data[i+2]=fmt(val);data[i+3]=fmt(255*edge);
    }
    ctx.putImageData(img,0,0);moonCache=temp;
  }
  // Atmospheric halo is much dimmer than the surface and stays in the sky.
  g.save();const aura=g.createRadialGradient(cx,cy,r*.4,cx,cy,r*2.05);
  aura.addColorStop(0,'rgba(156,172,191,.15)');aura.addColorStop(1,'rgba(73,87,122,0)');
  g.fillStyle=aura;g.fillRect(cx-r*2.1,cy-r*2.1,r*4.2,r*4.2);
  g.drawImage(moonCache,cx-r,cy-r,2*r,2*r);g.restore();
 }
 function drawCloud(layer,t,flash){
  const z=layer.z,x=layer.x+Math.sin(t*(.04+layer.speed))*.5 + t*layer.speed*.65;
  const p=proj(v(x,layer.y,z));if(!p)return;
  let wid=p.s*layer.width,hei=p.s*layer.height;
  if(p.x+wid<0||p.x-wid>W)return;
  g.globalAlpha=layer.alpha*(.7+flash*.75);
  g.drawImage(cloudTex,p.x-wid/2,p.y-hei/2,wid,hei);
  g.globalAlpha=1;
 }
 function drawTree(tree,t,near=false,flash=0){
  const distance=Math.max(0,cam.z-tree.z),bright=Math.exp(-Math.max(0,distance-16)*.025);
  const rgb=near?[80,94,109]:[107,122,139];
  g.lineCap='round';
  const portraitScale=W/H<.8&&tree.near?.56:1,wind=Math.sin(windPhase*.48+tree.z*.17)*.20*windStrength;
  const treePoint=a=>projectXYZ((a.x+wind*a.windWeight)*portraitScale,a.y,a.z);
  const detail=play.active?(distance>85?4:distance>55?3:distance>32?2:0):0;
  const depthShade=clamp(bright+.18*flash)*(near?1.0:.95);
  const barkColor=`rgba(${fmt(rgb[0]*depthShade)},${fmt(rgb[1]*depthShade)},${fmt(rgb[2]*depthShade+flash*70)},${clamp(.7+flash*.3)})`,barkHighlight=`rgba(117,104,110,${.04+flash*.14})`;
  for(const s of tree.segments){
   if(s.depth<detail)continue;
   let p=treePoint(s.p),q=treePoint(s.q);if(!p||!q)continue;
   if(p.z>65&&s.depth<3)continue;
   const thickness=clamp(s.w*p.s*1.05,near?.9:1.5,24);
   g.strokeStyle=barkColor;
   g.lineWidth=thickness;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();
   if(s.depth>=3&&thickness>3){g.strokeStyle=barkHighlight;g.lineWidth=thickness*.24;g.beginPath();g.moveTo(p.x-thickness*.2,p.y);g.lineTo(q.x-thickness*.1,q.y);g.stroke()}
  }
 }
 const eyeL=[{x:-.7,y:.24},{x:-.15,y:.38},{x:-.37,y:.05}];
 const eyeR=[{x:.15,y:.38},{x:.7,y:.24},{x:.37,y:.05}];
 const nose=[{x:-.095,y:-.085},{x:.095,y:-.085},{x:0,y:-.255}];
 function drawShadow(t){
  const presence=smooth(6.9,9.3,t)*(1-smooth(32,33,t));if(!presence)return;
  const p=proj(v(0,-1.49,-.25));if(!p)return;
  const w=p.s*1.85,h=p.s*.28;
  g.save();g.globalAlpha=presence;g.translate(p.x,p.y);g.scale(1,h/w);
  const grad=g.createRadialGradient(0,0,4,0,0,w);
  grad.addColorStop(0,'rgba(0,0,0,.9)');grad.addColorStop(.5,'rgba(0,0,0,.5)');grad.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=grad;g.beginPath();g.arc(0,0,w,0,Math.PI*2);g.fill();g.restore();
 }
 function drawPumpkin(t,flash){if(t<=33)geometryDrain();
  let land=smooth(5.6,9.6,t);
  if(land<=0)return;
  let fall=1-Math.pow(1-land,3),y=mix(9.25,-.10,fall);
  if(land>=1)y=-.10;
  const departure=1;if(t>33)return;
  let px=0;let p=proj(v(px,y,-.25));if(!p)return;
  let rx=1.62*p.s,ry=1.43*p.s;
  if(rx<1||ry<1)return;
  const width=320,height=280;
  const frameKey=Math.floor(t*12);
  const cacheKey=frameKey+':'+flash;
  if(!pumpkinCache || pumpkinCache.key!==cacheKey){
  const tmp=document.createElement('canvas');tmp.width=width;tmp.height=height;
  const ctx=tmp.getContext('2d');
  const talking=t>10&&t<23;
  const laugh=smooth(23,24,t)*(1-smooth(26,28,t));
  const opening=smooth(26,29.5,t);
  let lip=talking?(speechActive?.6:.3)*Math.abs(Math.sin(t*10.7)*Math.sin(t*3.2)):laugh*(.35+.65*Math.abs(Math.sin(t*8)));
  if(!pumpkinSkin||pumpkinSkin.key!==flash){
  const img=ctx.createImageData(width,height),dst=img.data;
  const pumpkinLight=norm(v(-.68,.72,1.0));
  for(let yy=0;yy<height;yy++)for(let xx=0;xx<width;xx++){
    let u=(xx+.5)/width*2-1,vv=1-(yy+.5)/height*2;
    // Mild silhouette deformation: 10 genuinely rounded pumpkin ribs.
    const front=Math.sqrt(Math.max(0,1-u*u-vv*vv));
    const theta=Math.atan2(u,front);let ribs=Math.cos(theta*9);
    let contour=1+.035*ribs-.10*Math.exp(-u*u/.04)*smooth(.45,1,vv)-.035*Math.exp(-u*u/.08)*smooth(.5,1,-vv);
    let h=(u*u+vv*vv/(contour*contour));if(h>1)continue;
    let n=norm(v(u*.9,vv*.89,Math.sqrt(Math.max(0,1-h))*1.05));
    const ridges=(Math.cos(theta*9)+.18*Math.cos(theta*21))*0.14;
    const side=dot(n,pumpkinLight);
    const shadow=clamp(.20+Math.max(0,side)*.53 + ridges*.75 + flash*.3);
    const indent=Math.pow(Math.max(0,Math.sin(theta*9)),11)*.12;
    const grain=.009*Math.sin(u*76+vv*23)*Math.sin(vv*96-u*31);
    const vshade=shadow-indent+grain;
    let rr=fmt(39+198*vshade),gg=fmt(15+108*vshade),bb=fmt(8+36*vshade);
    const rim=smooth(.985,1,Math.sqrt(h));rr=fmt(rr*(1-rim*.46));gg=fmt(gg*(1-rim*.44));bb=fmt(bb*(1-rim*.4));
    const id=(yy*width+xx)*4;dst[id]=rr;dst[id+1]=gg;dst[id+2]=bb;dst[id+3]=255;
  }
  ctx.putImageData(img,0,0);pumpkinSkin={key:flash,canvas:tmp};
  }
  // The expensive rind lighting is static. Animate only the carved chamber;
  // this avoids rebuilding 90,000 shaded pixels six times every second.
  const faceCanvas=document.createElement('canvas');faceCanvas.width=width;faceCanvas.height=height;
  const f=faceCanvas.getContext('2d');f.drawImage(pumpkinSkin.canvas,0,0);
  f.translate(width/2,height/2);f.scale(width/2,-height/2);
  const flicker=.5+.18*Math.sin(t*3.4)+.09*Math.sin(t*7.1);
  const chamber=f.createLinearGradient(0,.45,0,-.7);
  chamber.addColorStop(0,'#080c12');chamber.addColorStop(.65,'#141d28');chamber.addColorStop(1,'#283646');
  const cut=()=>{f.closePath();f.fillStyle=chamber;f.fill();f.strokeStyle='#d18a48';f.lineWidth=.022;f.stroke();};
  for(const tri of [eyeL,eyeR,nose]){f.beginPath();tri.forEach((p,i)=>i?f.lineTo(p.x,p.y):f.moveTo(p.x,p.y));cut();}
  const upper=x=>-.25-.08*(1-Math.abs(x)/.77)+lip*.17;
  f.beginPath();f.moveTo(-.77,upper(-.77));
  for(let i=0;i<=40;i++){const x=-.77+i*1.54/40;f.lineTo(x,upper(x));}
  for(let i=40;i>=0;i--){const x=-.77+i*1.54/40;f.lineTo(x,-.63-lip*.16+.26*Math.pow(Math.abs(x)/.77,2));}cut();
  // Irregular teeth remain attached to the thick upper shell.
  for(const x of [-.49,-.16,.18,.50]){
   const y=upper(x);f.fillStyle='#9f592f';f.strokeStyle='#d18a48';f.lineWidth=.012;
   f.beginPath();f.moveTo(x-.045,y+.012);f.lineTo(x-.035,y-.10);f.lineTo(x+.035,y-.085);f.lineTo(x+.045,y+.012);f.fill();f.stroke();
  }
  if(opening>0){
   // A real hole in the shell reveals the same world, never a second page.
   f.globalCompositeOperation='destination-out';f.beginPath();
   f.ellipse(0,-.13,.76*opening,.82*opening,0,0,Math.PI*2);f.fill();
   f.globalCompositeOperation='source-over';f.strokeStyle='#ba7139';f.lineWidth=.045;
   f.beginPath();f.ellipse(0,-.13,.76*opening,.82*opening,0,0,Math.PI*2);f.stroke();
  }
  pumpkinCache={key:cacheKey,canvas:faceCanvas};
  }
  // Top stem is a shaded taper, attached to the same projected 3D pumpkin.
  let sy=p.y-ry*.93;g.save();g.globalAlpha=departure;g.strokeStyle='#483d2d';g.lineCap='round';g.lineWidth=Math.max(4,p.s*.16);
  g.beginPath();g.moveTo(p.x-3,sy+8);g.quadraticCurveTo(p.x+12,sy-33,p.x-10,sy-ry*.29);g.stroke();
  g.strokeStyle='#796946';g.lineWidth=Math.max(1,p.s*.05);g.beginPath();g.moveTo(p.x-7,sy+2);g.quadraticCurveTo(p.x+5,sy-31,p.x-9,sy-ry*.28);g.stroke();g.restore();
  g.save();g.globalAlpha=departure;g.shadowColor='#8d4929';g.shadowBlur=flash*10;g.drawImage(pumpkinCache.canvas,p.x-rx,p.y-ry,rx*2,ry*2);g.restore();
 }
 function drawMist(t,flash){
  // Fine ground-hugging haze; no blanket that obscures the silhouettes.
  for(let i=0;i<5;i++){
   const y=H*(.62+i*.095),x=W*(.36+.13*Math.sin(i*1.95+t*.065)),rad=W*(.20+i*.037);
   let gr=g.createRadialGradient(x,y,4,x,y,rad);
   gr.addColorStop(0,`rgba(85,92,116,${.022+flash*.06})`);gr.addColorStop(1,'rgba(30,34,45,0)');
   g.fillStyle=gr;g.fillRect(0,y-rad,W,rad*2);
  }
 }
 function drawLightning(t){let dt=t-15.35;let strike=(dt>0&&dt<.14)||(dt>.22&&dt<.33)||(dt>.46&&dt<.53);
  if(!strike)return 0;
  const p=proj(v(5.2,7.8,-3.2)),q=proj(v(5.5,3.8,-3.6));if(!p||!q)return 0;
  g.save();g.lineCap='square';g.strokeStyle='#d7dced';g.shadowBlur=17;g.shadowColor='#d8e7ff';g.lineWidth=2.5;g.beginPath();g.moveTo(p.x,p.y);
  for(let i=1;i<=9;i++){let f=i/9;g.lineTo(mix(p.x,q.x,f)+Math.sin(i*7.6)*14,mix(p.y,q.y,f))}g.stroke();g.restore();return 1;
 }

 function drawGate(t,flash){
  const reveal=smooth(31,39,t);if(reveal<.002)return;
  const Z=-49,base=-1.51;
  const stroke=(a,b,col,w=2)=>{let p=proj(a),q=proj(b);if(!p||!q)return;g.lineWidth=clamp(p.s*.042*w,2.25,7.2);g.strokeStyle=col;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke()};
  g.save();g.globalAlpha=reveal;
  for(const side of [-1,1]){
    const x=side*3.1;
    stroke(v(x,base,Z),v(x,3.5,Z),'#a29cad',4);
    stroke(v(x-.24,3.52,Z),v(x+.24,3.52,Z),'#b0a2a0',2);
    stroke(v(x-.33,base,Z),v(x+.33,base,Z),'#746977',3);
    for(let k=0;k<20;k++){
      const xx=x+side*(.6+k*.7);
      stroke(v(xx,base,Z),v(xx,1.65,Z),'#626777',1.5);
      stroke(v(xx,1.65,Z),v(xx,1.85,Z),'#89818b',1);
    }
  }
  // Wrought-iron pointed arch, not a typographic logo.
  for(let i=0;i<25;i++){
    let a=-3.1+i*6.2/24,b=-3.1+(i+1)*6.2/24;
    const yy=x=>2.8+1.45*(1-Math.pow(Math.abs(x)/3.1,1.65));
    stroke(v(a,yy(a),Z),v(b,yy(b),Z),'#bbb3c2',2.2);
  }
  for(const side of [-1,1]){for(let k=0;k<5;k++){const x=side*(3.1+k*.24);stroke(v(x,base,Z-k*.55),v(x,2.05,Z-k*.55),'#777b8a',.9);}stroke(v(side*3.1,1.8,Z),v(side*4.1,1.8,Z-2.2),'#8e8696',1.4);}
  g.restore();
 }
 function drawGraves(t){
  if(t<31)return;
  for(let row=11;row>=0;row--)for(let col=0;col<10;col++){
   const side=col<5?-1:1,rank=col%5,id=row*13+col,z=-51-row*3.1-hash(id)*.8,x=side*(3.8+rank*1.65+hash(id+3)*.4);
   if(game.target){const d=destinations[game.target];if(Math.hypot(x-d.x,z-d.z)<2.4)continue;}
   const p=proj(v(x,-1.4,z));if(!p||p.x<-60||p.x>W+60)continue;
   const h=.8+hash(id+9)*1.2,w=.50+hash(id+2)*.45;
   graveMesh(x,z,w,h,id%3,[105+hash(id)*40,116+hash(id)*35,131+hash(id)*30]);
  }
  meshBox(0,-1.48,-84,4,4.8,3,[105,116,132]);
  meshPrism(0,3.32,-84,[[-2.5,0],[2.5,0],[0,2.7]],3.5,[92,105,125]);
  meshBox(0,-1.48,-82.45,1.1,2.8,.12,[31,41,55]);flushMesh();
 }
 function drawBirds(t,crows=false){
  const motion=ambientTime;
  if(crows&&t<30)return;
  const cycle=motion%17;if(!crows&&(cycle<3||cycle>9))return;
  const count=crows?7:4;
  for(let i=0;i<count;i++){
   const a=motion*(crows?.27:.37)+i*1.31;
   const center=crows?v(Math.sin(a)*9,4.8+Math.sin(a*.73+i)*1.3,-39+Math.cos(a)*5):v(((cycle-3)/6-.5)*31-i*1.4,9+Math.sin(a+i),-27-i*2);
   const p=proj(center);if(!p)continue;
   const span=p.s*(crows?.38:.47),flap=Math.sin(motion*(crows?6:11)+i*2)*span*.7;
   g.strokeStyle=crows?'#919aaa':'#748499';g.lineWidth=clamp(p.s*.045,1.2,3);g.lineCap='round';
   g.beginPath();g.moveTo(p.x-span,p.y-flap);g.quadraticCurveTo(p.x-span*.5,p.y-span*.25,p.x,p.y);g.quadraticCurveTo(p.x+span*.5,p.y-span*.25,p.x+span,p.y-flap);g.stroke();
   if(!crows){g.fillStyle='#566779';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-span,p.y-flap);g.lineTo(p.x-span*.7,p.y+span*.19);g.lineTo(p.x-span*.35,p.y+span*.05);g.lineTo(p.x,p.y+span*.24);g.lineTo(p.x+span*.35,p.y+span*.05);g.lineTo(p.x+span*.7,p.y+span*.19);g.lineTo(p.x+span,p.y-flap);g.closePath();g.fill();}
   g.fillStyle='#a2a7b2';g.beginPath();g.ellipse(p.x,p.y,Math.max(1,span*.12),Math.max(1.2,span*.25),0,0,Math.PI*2);g.fill();
  }
 }
 function drawLanterns(t){
  // Empty, unlit lanterns catch only the cold moonlight.
  for(const [index,z] of [-7,-18,-29,-42,-55,-68,-81].entries()){
   const x=(index%2?-1:1)*3.05,p=proj(v(x,2.15,z)),b=proj(v(x,-1.49,z));if(!p||!b)continue;
   const sc=p.s,r=clamp(sc*.18,2.4,23);g.save();g.strokeStyle='#515e6b';g.lineWidth=clamp(sc*.055,.8,4);
   g.beginPath();g.moveTo(b.x,b.y);g.lineTo(p.x,p.y+r);g.stroke();
   g.fillStyle='#101821';g.fillRect(p.x-r*.7,p.y-r*.8,r*1.4,r*1.6);g.lineWidth=1;g.strokeRect(p.x-r*.8,p.y-r*.9,r*1.6,r*1.8);
   g.beginPath();g.moveTo(p.x-r,p.y-r);g.lineTo(p.x,p.y-r*1.65);g.lineTo(p.x+r,p.y-r);g.stroke();g.restore();
  }
 }
 function drawCentralCross(t){
  if(t<31)return;const z=-62,breath=act.strangerDead?0:Math.sin(ambientTime*1.3)*.028,warning=smooth(54,57,t)*(1-smooth(59,62,t));
  for(let i=0;i<4;i++)groundPolygon([v(-.26+i*.17,-1.505,z+.55),v(.09+i*.13,-1.505,z+.65),v(.25+i*.11,-1.505,z+1.05+i*.08),v(-.18+i*.12,-1.505,z+1.12+i*.04)],'#962738');
  meshBox(0,-1.49,z,1.45,.34,1.1,[113,123,133]);
  meshBox(0,-1.15,z,.42,4.2,.40,[75,88,103]);meshBox(0,2.48,z,2.75,.32,.42,[75,88,103]);
  const released=act.tool&&act.releaseAt!==null?smooth(0,2,ambientTime-act.releaseAt):0;
  const at=(x,y,zz=.41)=>v(x*.68,mix(1.2+(y-1.2)*.68,-1.34+(zz-.41)*.68,released),z+mix(zz*.68,1.25+(y-1.2)*.68,released));
  const personLimb=(a,b,r1,r2,color,sides=8)=>meshLimb(a,b,r1*.68,r2*.68,color,sides);
  const personEllipsoid=(p,rx,ry,rz,color)=>meshEllipsoid(p,rx*.68,ry*.68,rz*.68,color);
  const torsoRings=[[1.18,.26,.19],[1.46,.22,.18],[1.95+breath,.36,.21],[2.20+breath,.40,.19],[2.29+breath,.19,.15]];
  for(let ring=0;ring<torsoRings.length-1;ring++)for(let i=0;i<10;i++){
   const vertex=(r,j)=>{const [y,w,d]=torsoRings[r],a=j/10*Math.PI*2;return at(Math.cos(a)*w,y,.41+Math.sin(a)*d)};
   meshFace([vertex(ring,i),vertex(ring+1,i),vertex(ring+1,i+1),vertex(ring,i+1)],[219,225,224]);
  }
  personEllipsoid(at(-.03,1.20),.27,.28,.21,[161,173,185]);
  const shoulderL=at(-.34,2.25+breath),elbowL=at(mix(-.75,-.48,released),mix(2.53,1.50,released)),handL=at(mix(-1.26,-.44,released),mix(3.10,.69,released));
  const shoulderR=at(.34,2.25+breath),elbowR=at(mix(.79,.48,released),mix(2.58,1.50,released)),handR=at(mix(1.26,.44,released),mix(3.10,.69,released));
  for(const [a,b,c] of [[shoulderL,elbowL,handL],[shoulderR,elbowR,handR]]){personLimb(a,b,.14,.11,[193,185,175]);personLimb(b,c,.11,.075,[202,190,178]);personEllipsoid(c,.09,.13,.07,[211,195,180]);}
  const hipL=at(-.15,1.20),kneeL=at(-.37,.42,.43),ankleL=at(-.42,-.32,.49);
  const hipR=at(.15,1.20),kneeR=at(.36,.40,.46),ankleR=at(.43,-.39,.52);
  for(const [a,b,c] of [[hipL,kneeL,ankleL],[hipR,kneeR,ankleR]]){personLimb(a,b,.16,.11,[171,179,186]);personLimb(b,c,.11,.07,[171,179,186]);personEllipsoid(add(c,v(0,-.04,.08)),.11,.09,.18,[150,164,178]);}
  personLimb(at(0,2.35),at(.04,2.59+warning*.08),.11,.11,[164,158,152]);
  personEllipsoid(at(.07,2.72+breath+warning*.09,.46),.20,.27,.19,[216,204,187]);
  personEllipsoid(at(.06,2.91+breath+warning*.09,.43),.215,.12,.19,[50,58,68]);
  // Bruising, torn fabric and dark blood are limited to surface marks.
  personLimb(at(-.18,2.17,.61),at(.05,1.78,.62),.075,.045,[107,33,46]);
  personLimb(at(.53,2.38,.48),at(.67,2.45,.49),.08,.07,[113,33,45]);
  personEllipsoid(at(.16,2.72+warning*.09,.62),.07,.055,.022,[104,58,66]);
  personLimb(at(-.10,2.16,.61),at(.10,1.53,.62),.055,.035,[113,34,48]);
  for(const x of [-.01,.13])personEllipsoid(at(x,2.77+breath+warning*.09,.645),.035,.018,.014,[35,39,49]);
  personLimb(at(.065,2.69+breath+warning*.09,.63),at(.07,2.67+breath+warning*.09,.73),.039,.024,[169,155,143],6);
  personLimb(at(.015,2.60+breath+warning*.09,.64),at(.12,2.60+breath+warning*.09,.64),speechActive?.026:.014,.012,[56,40,47],6);
  meshFace([at(-.28,1.38,.59),at(-.12,.95,.60),at(.02,1.35,.59)],[62,77,94]);
  meshFace([at(.12,1.35,.60),at(.28,.98,.60),at(.31,1.42,.59)],[62,77,94]);
  if(released<.35)for(const x of [-1.26,1.26]){personLimb(at(x,3.32,.28),at(x,3.06,.48),.035,.035,[173,169,148]);}
  flushMesh();
 }
 function drawBloodTrail(t){
  if(t<32)return;
  // Broken drag marks and droplets remain legible on the outer paving stones.
  for(let i=0;i<29;i++){
   const z=-15-i*1.08,x=2.18+Math.sin(i*.67)*.19,w=.10+hash(i+18)*.13;
   const len=.25+hash(i+4)*.50;
   groundPolygon([v(x-w,-1.51,z),v(x+w*.7,-1.51,z-.1),v(x+w,-1.51,z-len),v(x-w*.6,-1.51,z-len-.09)],i%3?'#91293d':'#bd3e51');
   if(i%2===0)groundPolygon([v(x+.25,-1.51,z-.1),v(x+.34,-1.51,z-.15),v(x+.31,-1.51,z-.29)],'#b63147');
  }
 }
 function drawHidingFigure(t){
  if(play.active)t=play.glimpseAt===null?0:43+ambientTime-play.glimpseAt;
  if(t<43||t>50)return;
  const appear=smooth(43,44.1,t)*(1-smooth(48.7,50,t)),retreat=smooth(44.3,48.7,t);
  const x=mix(-3.45,-8.95,retreat),z=-40.5-Math.sin(retreat*Math.PI)*.45;
  const lean=Math.sin(retreat*Math.PI)*.12,head=v(x+lean,.06,z),shoulder=v(x,-.25,z),hip=v(x,-.92,z);
  g.save();g.globalAlpha=appear*.78;
  meshEllipsoid(head,.115,.15,.105,[121,134,143]);
  meshLimb(hip,shoulder,.13,.20,[84,104,118],7);
  meshLimb(add(shoulder,v(-.16,-.03,0)),v(x-.24,-.91,z+.03),.055,.035,[91,109,122],6);
  meshLimb(add(shoulder,v(.16,-.03,0)),v(x+.23,-.86,z-.02),.055,.035,[91,109,122],6);
  meshLimb(add(hip,v(-.07,0,0)),v(x-.11,-1.48,z),.065,.04,[73,93,110],6);
  meshLimb(add(hip,v(.07,0,0)),v(x+.13,-1.48,z-.07),.065,.04,[73,93,110],6);
  flushMesh();g.restore();
 }
 function drawForestLife(t){
  if(t<32)return;
  const cycle=ambientTime%19,visible=smooth(4,6,cycle)*(1-smooth(10,12,cycle));if(visible<.01)return;
  const p=proj(v(-7.6+(cycle-4)*.26,-.42,-39));if(!p)return;
  g.save();g.globalAlpha=visible*.68;g.strokeStyle='#667781';g.lineCap='round';g.lineWidth=Math.max(1,p.s*.16);
  g.beginPath();g.moveTo(p.x,p.y-p.s*.28);g.lineTo(p.x,p.y+p.s*.37);g.stroke();
  g.fillStyle='#819099';g.beginPath();g.ellipse(p.x,p.y-p.s*.46,p.s*.09,p.s*.12,0,0,Math.PI*2);g.fill();g.restore();
 }
 function drawWindblownLeaves(t){
  for(let i=0;i<13;i++){
   const phase=(windPhase*.14+i*.37)%1,side=i%2?-1:1;
   const z=2-i*4.7-phase*2.2,x=side*(2.85+hash(i)*2.8)+Math.sin(phase*8+i)*.20;
   const p=proj(v(x,-.35-phase*.95+Math.sin(phase*6+i)*.12,z));if(!p||p.x<0||p.x>W||p.y>H)continue;
   const len=clamp(p.s*.09,1,5),angle=ambientTime*1.8+i;
   g.strokeStyle=i%3?'#7e775c':'#a28a62';g.lineWidth=1.1;g.beginPath();g.moveTo(p.x-Math.cos(angle)*len,p.y-Math.sin(angle)*len*.45);g.lineTo(p.x+Math.cos(angle)*len,p.y+Math.sin(angle)*len*.45);g.stroke();
  }
 }
 function drawBody(t){
  if(t<32)return;
  const point=(x,y,z=-14.5)=>proj(v(x,y,z));
  // Dark blood pools follow the ground plane, never float over the body.
  for(let i=0;i<5;i++){
   const x=2.85+i*.25,z=-14.1+Math.sin(i*2)*.36;
   groundPolygon([v(x-.30,-1.515,z-.25),v(x+.32,-1.515,z-.18),v(x+.36,-1.515,z+.20),v(x-.22,-1.515,z+.28)],i%2?'#a12b42':'#c4384b');
  }
  const head=point(3.06,-1.22),chest=point(3.62,-1.29),hips=point(4.15,-1.34);
  if(!head||!chest||!hips)return;const sc=chest.s;
  const line=(a,b,w,col)=>{if(!a||!b)return;g.strokeStyle=col;g.lineWidth=Math.max(1,w*sc);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();};
  g.save();g.lineCap='round';
  line(chest,hips,.46,'#b5afb0');line(chest,hips,.31,'#515c69');line(chest,point(3.8,-1.29),.16,'#bd344b');
  line(hips,point(5.20,-1.43,-14.3),.18,'#8d91a0');line(hips,point(5.05,-1.44,-15.02),.16,'#777f8e');
  line(chest,point(3.57,-1.46,-13.9),.09,'#62616a');line(chest,point(3.92,-1.46,-15.02),.09,'#535663');
  g.fillStyle='#b9aaa2';g.beginPath();g.ellipse(head.x,head.y,sc*.14,sc*.13,-.3,0,Math.PI*2);g.fill();
  g.fillStyle='#33313a';g.beginPath();g.ellipse(head.x-sc*.05,head.y-sc*.04,sc*.13,sc*.08,0,0,Math.PI*2);g.fill();
  for(let i=0;i<4;i++){
   const peck=(Math.sin(ambientTime*4.5+i*2)+1)/2;
   const p=point(3.43+i*.32,-1.16,-14.15+(i%2)*-.65);if(!p)continue;
   g.fillStyle='#737c8d';g.beginPath();g.ellipse(p.x,p.y,sc*.14,sc*.085,-.35,0,Math.PI*2);g.fill();
   const hx=p.x-sc*.15,hy=p.y+sc*(peck*.10-.10);
   line(v(p.x,p.y,0),v(hx,hy,0),.06,'#6f798a');
   g.fillStyle='#9da2aa';g.beginPath();g.ellipse(hx,hy,sc*.052,sc*.05,0,0,Math.PI*2);g.fill();
   line(v(hx,hy,0),v(hx-sc*.09,hy+sc*.025,0),.025,'#b4ab9b');
   line(v(p.x,p.y+sc*.05,0),v(p.x+sc*.02,p.y+sc*.17,0),.025,'#747480');
  }
  g.restore();
 }
 function castShadow(x,z,width,height,opacity=.55){
  // Parallel moon rays: a single consistent direction across the entire ground.
  const dx=-height*.42,dz=height*1.65;
  g.save();g.globalAlpha=opacity*.47;
  groundPolygon([v(x-width,journey.zone||play.space==='catacombs'?-1.485:-1.52,z),v(x+width,journey.zone||play.space==='catacombs'?-1.485:-1.52,z),v(x+dx+width*1.1,journey.zone||play.space==='catacombs'?-1.485:-1.52,z+dz),v(x+dx-width*1.1,journey.zone||play.space==='catacombs'?-1.485:-1.52,z+dz)],'#010205');g.restore();
 }
 function drawCastShadows(t){
  for(const tree of trees)castShadow(tree.x,tree.z,.24,5,.72);
  for(const n of deadNature)castShadow(n.x,n.z,n.type==='grass'?.15:.5,n.size,.55);
  if(t>=31)castShadow(0,-62,.25,4.2,.95);
  if(t<33)castShadow(0,-.25,1.3,2.6,.7);
  if(t>=32){castShadow(3.8,-14.5,1.1,.27,.85);castShadow(5.4,-20,.65,1.3,.7);}
  if(t>=31)for(let row=0;row<12;row++)for(let col=0;col<10;col++){
   const side=col<5?-1:1,rank=col%5,id=row*13+col;
   castShadow(side*(3.8+rank*1.65+hash(id+3)*.4),-51-row*3.1-hash(id)*.8,.30,.85+hash(id+9)*.85,.6);
  }
  for(const side of [-1,1])castShadow(side*3.1,-49,.30,4.7,.8);
  if(t>=33&&!play.active){
   const {z,center,turn}=actorPose(t),spacing=mix(.53,1.35,turn);
   castShadow(center-spacing,z,.18,1.86,.8*(1-cameraFocus));castShadow(center+spacing,z,.16,1.51,.8*(1-cameraFocus));
  }
  if(game.target){const d=destinations[game.target];castShadow(d.x,d.z,.5,game.target?destinations[game.target].h:1.65,.8);}
 }
 function drawThicket(t){
  if(t<32)return;
  const cycle=ambientTime%14,glimpse=smooth(3,5,cycle)*(1-smooth(7,9,cycle));
  // Something briefly shifts behind the right-hand brambles.
  if(glimpse>.01){const p=proj(v(5.52+Math.sin(ambientTime*.9)*.23,-.35,-20.8));if(p){
   g.save();g.globalAlpha=glimpse*.7;g.fillStyle='#323c47';g.beginPath();g.ellipse(p.x,p.y,p.s*.29,p.s*.56,-.2,0,Math.PI*2);g.fill();
   g.fillStyle='#9a7850';g.fillRect(p.x-p.s*.08,p.y-p.s*.31,Math.max(1,p.s*.04),Math.max(1,p.s*.035));g.restore();
  }}
  for(let bush=0;bush<3;bush++){
   drawDeadNature({type:'shrub',x:5.0+(bush%3)*.45,z:-20.8-Math.floor(bush/3)*1.25,size:.48+(bush%2)*.12,id:220+bush});
   const bx=4.95+(bush%3)*.47,bz=-20.3-Math.floor(bush/3)*1.2;
   for(let i=0;i<6;i++){
    const a=hash(bush*17+i)*Math.PI,reach=.4+hash(i+31)*.6;
    const sway=Math.sin(ambientTime*(.8+hash(i)*.3)+i)*.035+(bush===2?glimpse*.11:0);
    const p=proj(v(bx,-1.5,bz)),q=proj(v(bx+Math.cos(a)*reach+sway,-1.5+Math.sin(a)*reach+.3,bz+Math.sin(i)*.3));if(!p||!q)continue;
    g.strokeStyle=i%3?'#46534e':'#657064';g.lineWidth=clamp(p.s*.027,.8,2.5);g.beginPath();g.moveTo(p.x,p.y);g.quadraticCurveTo(mix(p.x,q.x,.5),q.y-p.s*.12,q.x,q.y);g.stroke();
    g.lineWidth=.8;g.beginPath();g.moveTo(mix(p.x,q.x,.7),mix(p.y,q.y,.7));g.lineTo(q.x-p.s*.14,q.y-p.s*.1);g.stroke();
   }
  }
 }
 function drawMemorial(t){
  if(play.active)return;
  if(!game.target||t<36)return;const d=destinations[game.target];
  graveMesh(d.x,d.z,d.w,d.h,d.kind,d.color,true);
  // Recessed front tablet and a substantial cap expose thickness in perspective.
  meshBox(d.x,-.97,d.z+.28,d.w*.82,d.h*.83,.055,d.color.map(c=>Math.min(220,c+25)));
  if(game.target==='gabrys')meshBox(d.x,2.05,d.z,d.w+.13,.14,.62,[151,155,160]);
  if(game.visited)meshBox(d.x+.48,-1.13,d.z+1.12,.18,.28,.18,[177,184,185]);
  flushMesh();
 }
 function wrapEngraving(text,width){
  const lines=[];let line='';for(const word of text.split(' ')){if((line+' '+word).trim().length>width){lines.push(line);line=word}else line=(line+' '+word).trim();}if(line)lines.push(line);return lines;
 }
 function planeGlyph(char,x,y,z,cellW,cellH,color){
  const a=proj(v(x,y,z)),b=proj(v(x+cellW,y,z)),c=proj(v(x,y-cellH,z));if(!a||!b||!c)return;
  const sx=view.width/W,sy=view.height/H;
  out.save();out.transform((b.x-a.x)*sx/10,(b.y-a.y)*sy/10,(c.x-a.x)*sx/16,(c.y-a.y)*sy/16,a.x*sx,a.y*sy);
  out.font="16px 'Courier New', monospace";out.textBaseline='top';out.fillStyle=color;out.fillText(char,0,0);out.restore();
 }
 function drawWorldTypography(t){
  if(play.active&&play.space==='catacombs'){drawCatacombTypography();return;}
  if(act.scene!=='cemetery'||!game.target||(!play.active&&t<64)||(play.active&&Math.hypot(partyCenter().x-destinations[game.target].x,partyCenter().z-destinations[game.target].z)>9))return;const d=destinations[game.target],z=d.z+.325;
  const name=d.name.normalize('NFC').toUpperCase(),nameW=d.w*.72/name.length;
  [...name].forEach((c,i)=>planeGlyph(c,d.x-d.w*.36+i*nameW,d.h-1.28,z,nameW,.19,'#edeada'));
  if(game.target==='gabrys'){
   const width=d.w*.70,cell=width/32,top=d.h-1.57;
   memePrint.forEach((line,row)=>[...line].forEach((c,col)=>{if(c!==' ')planeGlyph(c,d.x-width/2+col*cell,top-row*cell*1.55,z+.002,cell,cell*1.55,'#c8d3d7')}));
  }
  const lines=wrapEngraving(d.quote,game.target==='gabrys'?28:22),cw=d.w*.76/(game.target==='gabrys'?28:22);
  const top=game.target==='gabrys'?-.45:d.h-1.72;
  lines.forEach((line,row)=>[...line.normalize('NFC')].forEach((c,col)=>planeGlyph(c,d.x-d.w*.38+col*cw,top-row*cw*1.7,z+.006,cw,cw*1.7,'#d8d5cb')));
 }
 function drawWalkers(t){
  if(play.active)return;
  const appear=smooth(33,35,t)*(1-cameraFocus);if(appear<=0)return;
  const {z,center,turn,d:destination}=actorPose(t);
  const walking=!dialogue.active&&t<67;
  g.save();g.globalAlpha=appear;
  for(let person=0;person<2;person++){
   const female=person===1,spacing=mix(.53,1.35,turn),x=center+(female?spacing:-spacing),step=walking?Math.sin(ambientTime*5+person*2.1):Math.sin(ambientTime)*.12,height=female?1.51:1.86;
   const p=proj(v(x,-1.48,z+(female?-.04:.04)));if(!p)continue;const sc=p.s,hr=sc*(female?.105:.12),headY=p.y-height*sc*.9;
   const shoulder=headY+hr*1.65,hip=p.y-sc*.54;
   // Aleks: taller, broad shoulders, short hair and a cool grey coat.
   // Sandra: distinctly shorter, warm scarf, narrower coat and longer hair.
   g.fillStyle=female?'#ba987b':'#9eacb9';g.strokeStyle=female?'#ccb49b':'#c0ccd4';g.lineWidth=Math.max(1,sc*.025);
   g.beginPath();g.moveTo(p.x-sc*(female?.14:.23),shoulder);g.lineTo(p.x+sc*(female?.14:.23),shoulder);g.lineTo(p.x+sc*(female?.20:.19),hip);g.lineTo(p.x-sc*(female?.20:.19),hip);g.closePath();g.fill();g.stroke();
   g.fillStyle='#aaa2a0';g.beginPath();g.ellipse(p.x,headY,hr,hr*1.15,0,0,Math.PI*2);g.fill();
   g.fillStyle=female?'#594641':'#42474f';g.beginPath();g.ellipse(p.x,headY-hr*.20,hr*1.05,hr*(female?1.08:.7),0,Math.PI,Math.PI*2);g.fill();
   if(female){g.fillRect(p.x-hr*1.05,headY-hr*.15,hr*.45,hr*2.5);g.fillRect(p.x+hr*.6,headY-hr*.15,hr*.45,hr*2.7);g.strokeStyle='#dfa564';g.lineWidth=Math.max(1,sc*.06);g.beginPath();g.moveTo(p.x-sc*.13,shoulder);g.lineTo(p.x+sc*.13,shoulder);g.lineTo(p.x+sc*.17,shoulder+sc*.28);g.stroke();}
   g.strokeStyle=female?'#b7a599':'#98a6b6';g.lineCap='round';g.lineWidth=clamp(sc*.07,1,7);
   g.beginPath();g.moveTo(p.x-sc*.16,shoulder+sc*.06);g.lineTo(p.x-sc*.25+step*sc*.04,hip+sc*.03);g.moveTo(p.x+sc*.16,shoulder+sc*.06);g.lineTo(p.x+sc*.25-step*sc*.04,hip+sc*.03);
   g.moveTo(p.x-sc*.09,hip);g.lineTo(p.x-sc*.13+step*sc*.07,p.y);g.moveTo(p.x+sc*.09,hip);g.lineTo(p.x+sc*.13-step*sc*.07,p.y);g.stroke();
  }
  g.restore();
 }
 function rasterScene(t){geometryDeferred=!journey.zone||journey.zone==="room";try{rasterSceneBase(t);}finally{geometryDeferred=false;flushMesh();}}
 function rasterSceneBase(t){geometryBegin();
  if(journey.zone&&journey.zone!=='room'){jRender();return;}
  if(act.scene!=='cemetery'){drawActScene();return;}
  windStrength=mix(.22,1.45,smooth(33,68,t));windPhase=ambientTime*(.45+windStrength*.8);
  setupCamera(t);bg();drawStars(t);
  const flash=0;
  // Clouds flank a protected upper-sky pocket where the moon passes.
  const sky=(sx,sy,width,height,alpha,speed,z=-55)=>{
   const depth=9-z;
   drawCloud({z,x:(sx-.5)*W*depth/focal,y:1.55+(.5-sy)*H*depth/focal,width:width*W*depth/focal,height:height*H*depth/focal,alpha,speed},t,flash);
  };
  sky(.14,.32,.36,.12,.7,.008);
  sky(.86,.27,.34,.11,.65,-.01);
  drawMoon(t);
  drawGround(t);if(chapter.phase==='collapse')drawCollapseFloor();drawCastShadows(t);drawBloodTrail(t);drawMeadow(t);
  // Sort solid world groups from far to near, including the cemetery entrance.
  const solids=trees.filter(a=>play.active||a.z<-4).map(tree=>({x:tree.x,z:tree.z,draw:()=>drawTree(tree,t,false,flash)}));
  for(const plant of deadNature)solids.push({x:plant.x,z:plant.z,draw:()=>drawDeadNature(plant)});
  for(const plant of livingPlants)solids.push({x:plant.x,z:plant.z,draw:()=>drawLivingPlant(plant)});
  solids.push({z:-40.5,draw:()=>drawHidingFigure(t)});
  if(play.active){addPlaySolids(solids);jWorldSolids(solids);}else solids.push({z:-67,draw:()=>drawGraves(t)});
  solids.push({z:-62,draw:()=>drawCentralCross(t)},{z:-49,draw:()=>drawGate(t,flash)});
  if(play.active)solids.push({x:3.8,z:-14.5,draw:()=>drawBody(t)});
  solids.sort((a,b)=>play.active?dot(sub(v(b.x||0,0,b.z),cam),forward)-dot(sub(v(a.x||0,0,a.z),cam),forward):a.z-b.z).forEach(item=>item.draw());
  drawForestLife(t);drawMemorial(t);drawLanterns(t);drawThicket(t);if(!play.active)drawBody(t);
  geometryDrain();sky(.08,.40,.29,.075,.38,.013,-23);
  sky(.93,.39,.27,.08,.36,-.018,-25);
  drawBirds(t);drawBirds(t,true);
  drawWalkers(t);
  for(const tree of trees.filter(a=>!play.active&&a.near&&a.z<-.25))drawTree(tree,t,true,flash);
  drawShadow(t);drawPumpkin(t,flash);
  for(const tree of trees.filter(a=>!play.active&&a.near&&a.z>=-.25))drawTree(tree,t,true,flash);
  drawWindblownLeaves(t);drawMist(t,flash);if(play.active){drawPlayEffects();drawStorm();}
  if(flash)drawLightning(t);
  if(flash){g.fillStyle='rgba(199,210,239,.025)';g.fillRect(0,0,W,H)}
 }
 const sampleCanvas=document.createElement('canvas'),sampleContext=sampleCanvas.getContext('2d',{alpha:false,willReadFrequently:true});
 const glyphMask=document.createElement('canvas'),maskContext=glyphMask.getContext('2d');
 const colorCanvas=document.createElement('canvas'),colorContext=colorCanvas.getContext('2d');
 let colorImage=null;
 const paletteRGB=palette.map(hex=>[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)]);
 const gpuCanvas=document.createElement('canvas');
 let gpu=null,gpuProgram=null,gpuSource=null,gpuAtlas=null,gpuFailed=false;
 function initializeGPU(){
  if(gpu||gpuFailed)return;
  try{
   gpu=gpuCanvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:true});if(!gpu)throw Error('WebGL2 unavailable');
   const vertex=`#version 300 es
   out vec2 uv;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);uv=p;gl_Position=vec4(p*2.-1.,0.,1.);}`;
   const fragment=`#version 300 es
   precision highp float;
   in vec2 uv;out vec4 outputColor;
   uniform sampler2D sceneTexture;uniform sampler2D glyphTexture;uniform vec2 grid;
   uniform vec3 colors[15];
   void main(){
    vec2 cell=floor(uv*grid),center=(cell+.5)/grid,offset=.24/grid;
    vec3 a=texture(sceneTexture,center+vec2(-offset.x,-offset.y)).rgb*255.;
    vec3 b=texture(sceneTexture,center+vec2(offset.x,-offset.y)).rgb*255.;
    vec3 c=texture(sceneTexture,center+vec2(-offset.x,offset.y)).rgb*255.;
    vec3 d=texture(sceneTexture,center+offset).rgb*255.;
    vec3 weights=vec3(.29,.57,.14);
    float peak=max(max(dot(a,weights),dot(b,weights)),max(dot(c,weights),dot(d,weights)));
    vec3 rgb=(a+b+c+d)*.22+vec3(peak*.12);float lum=dot(rgb,weights);
    bool blood=rgb.r>rgb.g*1.8&&rgb.b>rgb.g*1.05&&rgb.r>50.;
    bool leaf=rgb.g>rgb.r*1.18&&rgb.g>rgb.b*1.08&&rgb.g>30.;
    bool amber=rgb.r>rgb.b*1.44&&rgb.r>rgb.g*1.2;
    float light=blood?rgb.r/180.:(amber?(rgb.r*.65+rgb.g*.35):lum)/204.;
    if(light<.095){outputColor=vec4(0.,0.,0.,1.);return;}
    float glyph=clamp(floor(pow(light,.95)*float(GLYPH_COUNT-1)*1.13),1.,float(GLYPH_COUNT-1));
    int color=lum>175.?4:lum>126.?3:lum>78.?2:lum>39.?1:0;
    if(blood)color=rgb.r>80.?12:11;else if(leaf)color=rgb.g>90.?14:13;
    else if(amber)color=rgb.r>198.?(rgb.g>135.?10:9):rgb.r>159.?8:rgb.r>113.?7:rgb.r>76.?6:5;
    vec2 inside=fract(uv*grid);vec2 glyphUV=vec2((glyph*32.+1.+inside.x*30.)/(float(GLYPH_COUNT)*32.),inside.y);
    float ink=texture(glyphTexture,glyphUV).a;outputColor=vec4(colors[color]*ink,1.);
   }`.replaceAll('GLYPH_COUNT',String(glyphs.length));
   const compile=(type,text)=>{const shader=gpu.createShader(type);gpu.shaderSource(shader,text);gpu.compileShader(shader);if(!gpu.getShaderParameter(shader,gpu.COMPILE_STATUS))throw Error(gpu.getShaderInfoLog(shader));return shader};
   gpuProgram=gpu.createProgram();gpu.attachShader(gpuProgram,compile(gpu.VERTEX_SHADER,vertex));gpu.attachShader(gpuProgram,compile(gpu.FRAGMENT_SHADER,fragment));gpu.linkProgram(gpuProgram);if(!gpu.getProgramParameter(gpuProgram,gpu.LINK_STATUS))throw Error(gpu.getProgramInfoLog(gpuProgram));gpu.useProgram(gpuProgram);
   const texture=(unit)=>{gpu.activeTexture(gpu.TEXTURE0+unit);const tex=gpu.createTexture();gpu.bindTexture(gpu.TEXTURE_2D,tex);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_MIN_FILTER,gpu.LINEAR);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_MAG_FILTER,gpu.LINEAR);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_WRAP_S,gpu.CLAMP_TO_EDGE);gpu.texParameteri(gpu.TEXTURE_2D,gpu.TEXTURE_WRAP_T,gpu.CLAMP_TO_EDGE);return tex};
   gpuSource=texture(0);gpuAtlas=texture(1);
   const atlas=document.createElement('canvas');atlas.width=glyphs.length*32;atlas.height=48;const ctx=atlas.getContext('2d');ctx.font="44px Consolas, 'Courier New', monospace";ctx.textBaseline='middle';ctx.fillStyle='#fff';const natural=ctx.measureText('M').width;
   for(let k=1;k<glyphs.length;k++){ctx.save();ctx.translate(k*32,0);ctx.beginPath();ctx.rect(0,0,32,48);ctx.clip();ctx.scale(32/natural,1);ctx.fillText(glyphs[k],0,25);ctx.restore();}
   gpu.pixelStorei(gpu.UNPACK_FLIP_Y_WEBGL,true);gpu.texImage2D(gpu.TEXTURE_2D,0,gpu.RGBA,gpu.RGBA,gpu.UNSIGNED_BYTE,atlas);
   gpu.uniform1i(gpu.getUniformLocation(gpuProgram,'sceneTexture'),0);gpu.uniform1i(gpu.getUniformLocation(gpuProgram,'glyphTexture'),1);gpu.uniform3fv(gpu.getUniformLocation(gpuProgram,'colors[0]'),new Float32Array(paletteRGB.flat().map(c=>c/255)));
   gpuCanvas.addEventListener('webglcontextlost',e=>{e.preventDefault();gpuFailed=true;gpu=null;});
  }catch(error){gpuFailed=true;gpu=null;console.warn('ASCII GPU fallback:',error.message);}
 }
 function gpuASCIIFrame(){
  initializeGPU();if(!gpu)return false;
  if(gpuCanvas.width!==view.width||gpuCanvas.height!==view.height){gpuCanvas.width=view.width;gpuCanvas.height=view.height;}
  gpu.viewport(0,0,view.width,view.height);gpu.useProgram(gpuProgram);gpu.activeTexture(gpu.TEXTURE0);gpu.bindTexture(gpu.TEXTURE_2D,gpuSource);gpu.pixelStorei(gpu.UNPACK_FLIP_Y_WEBGL,true);gpu.texImage2D(gpu.TEXTURE_2D,0,gpu.RGBA,gpu.RGBA,gpu.UNSIGNED_BYTE,source);
  gpu.uniform2f(gpu.getUniformLocation(gpuProgram,'grid'),C,R);gpu.drawArrays(gpu.TRIANGLES,0,3);
  out.globalCompositeOperation='copy';out.drawImage(gpuCanvas,0,0);out.globalCompositeOperation='source-over';return true;
 }
 function asciiFrame(t){
  if(gpuASCIIFrame())return;
  // Batch one text string per row, then tint through the character mask.
  // This replaces hundreds of full-width strings per color with ~90 draws.
  sampleContext.drawImage(source,0,0,C*2,R*2);
  const pix=sampleContext.getImageData(0,0,C*2,R*2).data,stride=C*2*4;
  const colors=colorImage.data,advance=view.width/C,step=view.height/R,fs=step*.94;
  maskContext.clearRect(0,0,view.width,view.height);maskContext.font=`${fs}px Consolas, 'Courier New', monospace`;maskContext.textBaseline='middle';maskContext.fillStyle='#fff';
  maskContext.save();maskContext.scale(advance/maskContext.measureText('M').width,1);
  for(let row=0;row<R;row++){
   const chars=Array(C);
   for(let col=0;col<C;col++){
    const k=(row*2*C*2+col*2)*4,k1=k+4,k2=k+stride,k3=k2+4;
    let rr=(pix[k]+pix[k1]+pix[k2]+pix[k3])*.25,gg=(pix[k+1]+pix[k1+1]+pix[k2+1]+pix[k3+1])*.25,bb=(pix[k+2]+pix[k1+2]+pix[k2+2]+pix[k3+2])*.25;
    const peak=Math.max(pix[k]*.29+pix[k+1]*.57+pix[k+2]*.14,pix[k1]*.29+pix[k1+1]*.57+pix[k1+2]*.14,pix[k2]*.29+pix[k2+1]*.57+pix[k2+2]*.14,pix[k3]*.29+pix[k3+1]*.57+pix[k3+2]*.14);
    rr=rr*.88+peak*.12;gg=gg*.88+peak*.12;bb=bb*.88+peak*.12;
    const lum=rr*.29+gg*.57+bb*.14,blood=rr>gg*1.8&&bb>gg*1.05&&rr>50,foliage=gg>rr*1.18&&gg>bb*1.08&&gg>30,amber=rr>bb*1.44&&rr>gg*1.2;
    const light=blood?rr/180:(amber?(rr*.65+gg*.35):lum)/204;
    if(light<.095){chars[col]=' ';continue;}
    chars[col]=glyphs[Math.min(glyphs.length-1,Math.max(1,Math.floor(Math.pow(light,.95)*(glyphs.length-1)*1.13)))];
    let color=lum>175?4:lum>126?3:lum>78?2:lum>39?1:0;
    if(blood)color=rr>80?12:11;else if(foliage)color=gg>90?14:13;else if(amber)color=rr>198?(gg>135?10:9):rr>159?8:rr>113?7:rr>76?6:5;
    const index=(row*C+col)*4,rgb=paletteRGB[color];colors[index]=rgb[0];colors[index+1]=rgb[1];colors[index+2]=rgb[2];colors[index+3]=255;
   }
   maskContext.fillText(chars.join('').trimEnd(),0,(row+.53)*step);
  }
  maskContext.restore();colorContext.putImageData(colorImage,0,0);
  out.save();out.imageSmoothingEnabled=false;out.globalCompositeOperation='copy';out.drawImage(colorCanvas,0,0,view.width,view.height);out.globalCompositeOperation='destination-in';out.drawImage(glyphMask,0,0);out.restore();
 }

 const act={scene:'cemetery',order:'help-first',houseVisited:false,tool:false,rescued:false,rescueAttempted:false,revived:false,ending:null,victim:null,busy:false,pending:null,started:0,dice:false,releaseAt:null,strangerDead:false,rescueHint:false};
 function resetAct(){Object.assign(act,{scene:'cemetery',order:'help-first',houseVisited:false,tool:false,rescued:false,rescueAttempted:false,revived:false,ending:null,victim:null,busy:false,pending:null,started:0,dice:false,releaseAt:null,strangerDead:false,rescueHint:false});}
 function showActChoices(options){
  cancelLine();const choiceToken=dialogue.token;answers.replaceChildren();next.hidden=true;
  options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.dataset.choice=option.id;b.textContent=`[${i+1}] ${option.label}`;b.onclick=()=>{if(choiceToken!==dialogue.token||!dialogue.active)return;enableAudio(false);closeDialogue();option.run();};answers.append(b);});answers.firstElementChild?.focus();
 }
 function actConversation(lines,options=null,done=null){openDialogue(lines,done,options||false);panel.dataset.position=chapter.active&&play.space==='world'?'low':'upper';}
 function actScene(scene){act.scene=scene;act.started=ambientTime;act.busy=false;act.pending=null;game.phase='act2';}
 function cutscene(scene,seconds,done){closeDialogue();actScene(scene);act.busy=true;act.pending={at:ambientTime+seconds,done};}
 function actTick(){if(act.pending&&ambientTime>=act.pending.at){const done=act.pending.done;act.pending=null;act.busy=false;done();}}
 function drawMeadow(t){
  for(let i=0;i<180;i++){
   const z=-8-(i%30)*2.5,side=i%2?-1:1,x=side*(3.0+hash(i+91)*13);
   const p=proj(v(x,-1.5,z)),q=proj(v(x+Math.sin(windPhase+i)*.10*windStrength,-1.03-hash(i)*.48,z));if(!p||!q||p.x<0||p.x>W)continue;
   g.strokeStyle=i%3?'#465347':'#65705b';g.lineWidth=clamp(p.s*.018,.8,1.8);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();
  }
 }
 function actHuman(x,z,color,offset=0,fallen=false,gun=false,character='person'){
  const base=-1.48+offset,female=character==='sandra'||character==='weronika',scale=female?.86:1,stride=characterMotion?.moving?Math.sin(characterMotion.walk)*.20:0,seated=!!characterMotion&&chapter.seated[characterMotion.id];
  if(offset>-.9)castShadow(x,z,fallen?.56:.20*scale,fallen?.22:1.8*scale,.55);
  const reactionAge=characterMotion?.reactionAt===undefined?10:ambientTime-characterMotion.reactionAt,shake=reactionAge<.4?Math.sin(reactionAge*35)*.08*(1-reactionAge/.4):0;
  const at=(dx,y,dz=0)=>v(x+(dx+(y>1.44?shake:0))*scale,base+y*scale,z+dz*scale);const slap=characterMotion?.gesture,age=slap?ambientTime-slap.at:10,gestureAmount=age<.55?Math.sin(clamp(age/.55)*Math.PI):0;
  if(fallen){meshEllipsoid(at(-.18,.20),.48,.22,.24,color);meshEllipsoid(at(-.80,.18),.14,.15,.14,[171,169,160]);for(const side of [-1,1])meshLimb(at(.23,.16,side*.10),at(1.03,.10,side*.18),.10,.07,color,6);return;}
  meshPrism(x,base+.66*scale,z,[[-.15*scale,0],[.15*scale,0],[.24*scale,.62*scale],[.18*scale,.75*scale],[-.18*scale,.75*scale],[-.24*scale,.62*scale]],.30*scale,color);
  meshLimb(at(0,1.36),at(0,1.49),.065,.065,[161,157,148],6);
  meshEllipsoid(at(0,1.62),.13*scale,.17*scale,.13*scale,[183,176,164]);
  meshEllipsoid(at(0,1.75,-.02),.14*scale,.065*scale,.13*scale,female?[69,57,54]:[49,56,66]);
  if(female){for(const side of [-1,1])meshLimb(at(side*.11,1.67,-.02),at(side*.14,1.32,-.02),.045,.045,[69,57,54],5);meshLimb(at(-.17,1.35,.17),at(.17,1.35,.17),.04,.04,[176,138,96],6);}
  for(const side of [-1,1]){if(seated){meshLimb(at(side*.10,.70),at(side*.15,.48,.30),.075*scale,.055*scale,color,6);meshLimb(at(side*.15,.48,.30),at(side*.15,.25,.42),.055*scale,.04*scale,color,6);}else meshLimb(at(side*.10,.70),at(side*.15,.08,.04+side*stride),.075*scale,.045*scale,color,6);meshEllipsoid(at(side*.15,seated?.25:.05,seated?.42:.10+side*stride),.065*scale,.045*scale,.13*scale,[86,99,112]);if(!(gun&&side===1))meshLimb(at(side*.19,1.31),at(side*.28*(1-gestureAmount*.7),.75+gestureAmount*.75,.05-side*stride*.6+gestureAmount*(slap?.self?.06:.95)),.055*scale,.033*scale,color,6);}
  if(gun){meshLimb(at(.19,1.31),at(.37,1.13,.35),.055,.035,color,6);meshBox(x+.37,base+1.11,z+.49,.12,.12,.38,[160,172,182]);meshBox(x+.37,base+.96,z+.40,.10,.18,.12,[58,70,83]);}
 }
 const actForest=[makeTree(-7,-15,6.5,1,false),makeTree(8,-17,7.2,2,false),makeTree(-11,-23,7,3,false),makeTree(12,-25,8,4,false)];
 function drawActTerrain(){
  for(let i=0;i<30;i++){
   const z=4-i*.92,w=2.6;
   groundPolygon([v(-w,-1.495,z),v(w,-1.495,z),v(w,-1.495,z-.72),v(-w,-1.495,z-.82)],i%3?'#202a36':'#283341','#101923');
  }
  for(const tree of actForest)drawTree(tree,ambientTime,false);
  for(let i=0;i<65;i++){
   const side=i%2?-1:1,z=3-i*.45,x=side*(2.9+hash(i+69)*4.5),p=proj(v(x,-1.49,z)),q=proj(v(x+Math.sin(ambientTime*.7+i)*.08,-.9-hash(i)*.4,z));if(!p||!q)continue;
   g.strokeStyle=i%2?'#445148':'#616d5c';g.lineWidth=.9;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();
  }
 }
 function drawActScene(){
  if(play.space==='catacombs'){drawCatacombs();return;}
  setupPlayCamera();g.fillStyle='#0b1118';g.fillRect(0,0,W,H);
  const near=4;
   for(let i=0;i<20;i++){const x=-5.1+i*.52;groundPolygon([v(x,-1.49,near),v(x+.48,-1.49,near),v(x+.46,-1.49,-6.8),v(x,-1.49,-6.8)],i%3?'#252c32':'#31373c','#121b24');}
   meshBox(0,-1.5,-7,11,5,.35,[52,66,83]);meshBox(-5.3,-1.5,-1.7,.35,5,10,[48,63,81]);meshBox(5.3,-1.5,-1.7,.35,5,10,[48,63,81]);
   meshBox(-2.3,.65,-6.78,2,1.7,.05,[159,177,190]);for(const x of [-2.7,-1.9])meshBox(x,.65,-6.65,.07,1.7,.07,[45,57,72]);meshBox(-2.3,1.4,-6.65,2,.07,.07,[45,57,72]);
   for(let i=0;i<5;i++){const x=-3.7+(i%3)*2.6,z=-1.8-Math.floor(i/3)*2.5;actHuman(x,z,[136,146,157],0,true);groundPolygon([v(x-.7,-1.49,z+.3),v(x+.9,-1.49,z+.3),v(x+.6,-1.49,z+.9),v(x-.9,-1.49,z+.6)],'#8a2839');}
   meshBox(.8,-.55,-4.4,2.2,.16,1.0,[168,163,150]);for(const x of [-.1,1.7])for(const z of [-4.7,-4.1])meshBox(x,-1.5,z,.10,1,.10,[88,92,94]);
   if(!act.tool){meshLimb(v(.35,-.34,-4.2),v(1.25,-.34,-4.55),.045,.030,[226,232,228],6);meshLimb(v(.35,-.34,-4.6),v(1.25,-.34,-4.25),.045,.030,[226,232,228],6);for(const zz of [-4.18,-4.61])meshEllipsoid(v(.30,-.33,zz),.11,.025,.08,[123,154,176]);}
  jHouseLoot();for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();
 }
 const destinations={
  gabrys:{name:'Gabryś',x:-5.2,z:-57,action:'Postaw znicz dla Gabrysia',kind:0,w:2.2,h:3.25,color:[115,124,138],description:'Szeroki nagrobek z ciemnego granitu. W kamień wprawiono jasną tablicę i znakowy nadruk kota z uniesioną łapką.',quote:'Jakbyś umarł, Aleks zapomniałby o tobie po trzech sekundach.'},
  weronika:{name:'Weronika',x:5.0,z:-61,action:'Postaw znicz dla Weroniki',kind:1,w:1.55,h:2.75,color:[191,188,178],description:'Jasny marmur, zaokrąglona góra i głęboko osadzona tablica. Na narożnikach zbiera się mech.',quote:'Męczyła się na studiach i nawet nie zdążyła ich skończyć. Beka XD.'},
  boris:{name:'Borys',x:-7.2,z:-71,action:'Postaw znicz dla Borysa',kind:2,w:1.85,h:2.0,color:[125,143,142],description:'Ciężki, niski grobowiec z zielonkawego kamienia, z szeroką pokrywą i prostą tablicą. Stoi na końcu lewej alejki.',quote:'Młody, piękny milioner. Niestety milion go nie uratował przed śmiercią.'}
 };
 const memePrint=[":;i:,,;i;s25hhhAirAAr;rr;;;:,,:,", ".,:;:irsiisAA22AsXAXXArrs::;:::,", ",:;:rr,r3h55A522XA5hHA.;s;;;:,:,", ";;;;XX:XH35333XX523333sii;;;;:::", ";;isXX5HArA5G2ss55AXs5G5i;i;;::,", ";rXAAXhhi:  hHXA5r   rhhi:;ii;:,", ";rXAAhh5A;;irGM32:;;rXsM2:;;i;:,", "XXA23GAsAs25rsXr:;AAsAX53;;;;;::", "hMMMHSA252AhH;:,,2XrrXsAhr;;::;:", "HGGGSSM3hGGSS5::A3352ss2hsii;;;;", "HGGGSGHHhhM3AXirssAAA2335rrri;;:", "5MHHH3MGHh2AX2AA25srr2M3riii;:::", "s25252MShA5AsXAA2AriiAMHsiii;;;;", "iirr23hS#HAX5h5252ris223Mr;i;;;;", ";::ih2X2HMA3G5MHHhMAAA;AG2;;iiri", ":::rMHGh33MHA ihi.hSH3:rH5;irAXi", ":::s3GSHGMsss,:i,:iihM5hH5rsri::", ";i;X2As,35. : .  ;. A3Xr55rsr;::", ";i:ss;sr2Ar.      ,s2AsiA2s;;;;:", ";;;Ar;siXr,       ,X2X22Aii;;;;:", ",::A:i2XAX:.,:i;;irXAXXi.ir;;:::", ":,:siAA5A;XiirrrsrsX:rXr;sX:::::", ",,rrrsr2XrXri,.,iXXr,;ssi;;,,,:,", ".,riiss,:s;::::;rrr;iiri, ,:,.,,"];
 const memeDetail=":;ii;::,,,:rrrrX53hhhhMhh5XiirXAAXr;;;iiii;i;:,,,,,:,,\n,::;i;::,,:i;::;isXA253335ArisA22As;iXXXr;;;;;:,,:,:,,\n..,,:;:::rsXXriirssXXAAXXAAXsXXXXXsA2riiAr;::;;:::::,,\n.,,:;;;;X;:;s5AXAX53A555352AsA35352hX:.,AX;;::;;:,,,,,\n,::;;;:i2i,,:AMGHh35X232A252rX25hS#HX,.:Xi;;;;;;;:,::,\n:;;ii;;X2A;,ih#M2AA55sh3ri5XXA2AAAh32r.:r;;;;;;;;:::::\n;i;;;;rAss;:2H3A25S2G#522XXh#3XSShX5GS5sX;;;ii;;;;:,::\n;;;irsXAX2AGS3AXrAh2HG2XrsA233X2XsX25H#32;;;ii;;;;::,,\n;;rsXXXXXs3S5A;,i..;hS3XrisrA2;.   ,X2H5i;;;;ii;;:::,,\n;;rsXAA22X2MM2:::.. ,##32A35M: .   .AhMG3;;:;iiii;;:,.\n:;rsX2222hM3hhX,   ..5BGGMh35.    ,r2sAMSs:;;;iii;;:,,\n;irssXXX3S32rA22A2hhirhh35XXi:X5225Ar;sAGX;;;;;ii;::,:\nXXXAA255GS2sr5XrsA5Arisssri;::r2AArs55sAG5;;;;;i;;;:::\n5555553hGS5;rAAXXAX5MA;;ii;.:ssrriisA2i2HHsi;;;;;;;;::\nMHHHHGGGSShs3h55322M#Gi.::. rM5XsrsXXArs2hXi;;;::::;;:\nMHGGGGSSSGMh35hHGGGS##MX, ;X3Mh3352XsrrA3hXiii;;::;;;;\nHGGGHGGSSGGH53hGSGGHHh5A:.rXXA55522XXA25MhXrrrrii;;;;;\nHGGGGGGSSHHMHM33hMh5Arss;:rrrsXAAA225hh5h5srrrrii;;;::\n5MHHHGSSGhGGSSGHh555A2532A2222XsssX233h32Xriiiii;;:::,\nA3MMMMMMM55MHMMH32XXsXXXXXA253Asri;r2hHMsiiiiiii;;::::\nsA3hh55h3X5G#HAsA52AXXXXXXXAAAsiirsA5hHMX;iiiiii;;:;;;\nrrsAAsX225MG##G3A232sXA222222Assr;:iA5HSS5riiiii;;;;i;\ni;iiiisA255hS#SSH5A255h322A22Asi;rs23h55HHsi;ii;;;;;ii\n;;;;;;rMH3553GSGMr.rhSGGGM3HHH3AX225A:.;hH2iiiiii;;:;:\n::::::sh3irsX3MHM3hS9HXXMGSS53SH5ss2Ars5HGGX;;;;iirssi\n::::::AHGGGH2XA2A3SGMi .ihh2.,XG#GHHhr,;5HMX;;;isA52Xr\n::::::23MSSS##SGHMh52i  :A2i  :hMGGH5:.r3HhsirirsXsr;:\n:::::;52hS##GGGGhsisAr::;;r;.:rr,ihHMh5MHHMArXsri;::::\n:;;;;i3MhHHA:rMHX  .i;.:,.  :r:   AhhMh3hh3XiXXXri::::\n:iii;;3X:Xs..ih3A.  .:      .i:  ;252s,,;5h2irrri;;:::\n;ii;::5X,issrs35Xr:..         ,;rX22AXi;rA53r;;;;;;:::\n;;i;:i3X:is2r;22ssi.           .sA5AX2AXA5XsAi;;;;;;;:\n:;ii;r3siiss;s2s:..            :sA5AsA2522s:ri;;;;;;::\n:::::X2. ,ssrXrXr,      .,.  ,;isA22XXXsi:;:;i;;;;:;::\n,,,::sA:;A55A22AXi:,,:;irrrrrrrrXAXXXXXi. :sXi::;::::,\n:,,,:sXrr22X5h2,rAii;isssXXXsrrsXX;;XXXs,,rXAr::::::::\n:::,rsr:sArs53X,s2Xrrii;:,:iirsAX;..issXsrsssi,,::::::\n.,,:sX;iAr;A52XisXsri;,   .;sAAAXi,:irsXri;;i:.,,,:::,\n..,:ssirXXsXi;rXXsri;:,,::;rXsssii;;irrrr:  ::,..,,,,,\n..,irii;isXr  ,rr,,,::::;;ii;;ri:;iiiii;:.  ::;:...,,,";
 const game={phase:'intro',target:null,visited:false,bodySeen:false,arrival:false,warningSeen:false};
 const dialogue={active:false,lines:[],index:0,choices:null,done:null,token:0,timer:null};
 const panel=document.querySelector('#conversation'),speaker=document.querySelector('#speaker'),subtitle=document.querySelector('#line'),answers=document.querySelector('#answers'),next=document.querySelector('#next');
 function cancelLine(){clearTimeout(speechTimer);clearTimeout(dialogue.timer);dialogue.token++;if('speechSynthesis' in window)speechSynthesis.cancel();speechActive=false;}
 function closeDialogue(){clearMovement();cancelLine();dialogue.active=false;panel.hidden=true;answers.replaceChildren();view.focus({preventScroll:true});}
 function showChoices(){
  cancelLine();speaker.textContent='Aleks';subtitle.textContent='Kogo dziś odwiedzamy?';answers.replaceChildren();next.hidden=true;
  for(const [i,key] of ['gabrys','weronika','boris'].entries()){
   const button=document.createElement('button');button.type='button';button.dataset.target=key;button.textContent=`[${i+1}] ${destinations[key].name}`;
   button.onclick=()=>chooseTarget(key);answers.append(button);
  }
  answers.firstElementChild.focus({preventScroll:true});
 }
 function showLine(){
  cancelLine();answers.replaceChildren();next.hidden=false;next.textContent=audioEnabled?'[ENTER] Dalej':'[ENTER] Włącz głos';
  const line=dialogue.lines[dialogue.index];speaker.textContent=line[0];subtitle.textContent=line[1].normalize('NFC');next.focus({preventScroll:true});
  if(line[0]==='Sandra'&&line[1]==='Tom. Tom. Tom.')act.dice=true;
  if(play.stage==='rescue'&&act.tool&&line[1].startsWith('Przecinam')&&act.releaseAt===null)act.releaseAt=ambientTime;
  if(audioEnabled)speak(line[1],false,line[0]);
  // No auto-timeout for choices or subtitles: the reader controls the pace.
 }
 function openDialogue(lines,done=null,choices=false){
  clearMovement();
  closeDialogue();panel.dataset.position=time>=52?'upper':'center';dialogue.active=true;dialogue.lines=lines;dialogue.index=0;dialogue.done=done;dialogue.choices=choices;panel.hidden=false;showLine();
 }
 function advanceDialogue(){
  if(!dialogue.active||next.hidden)return;if(!audioEnabled){enableAudio(false);return;}cancelLine();
  if(++dialogue.index<dialogue.lines.length){showLine();return;}
  if(dialogue.choices){if(Array.isArray(dialogue.choices))showActChoices(dialogue.choices);else showChoices();return;}
  const done=dialogue.done;closeDialogue();if(done)done();
 }
 function chooseTarget(key){
  if(!destinations[key]||game.target||!dialogue.active||!next.hidden)return;
  enableAudio(false);game.target=key;game.phase='approach';
  const replies={
   gabrys:[['Sandra','Gabrysia. Jego grób jest po lewej, przy starych drzewach.'],['Aleks','Ten szeroki, ciemny nagrobek z nadrukiem. Pamiętam.']],
   weronika:[['Sandra','Weronikę. Jej grób jest przy prawej alejce.'],['Aleks','Jasny kamień, zaokrąglony u góry. Chodźmy.']],
   boris:[['Sandra','Borysa. Leży dalej, na końcu lewej alejki.'],['Aleks','Ten ciężki grobowiec z szeroką płytą. Trzymaj się blisko mnie.']]
  };
  openDialogue(replies[key],()=>setObjective('cross-warning'));
 }
 const detail=document.querySelector('#grave-detail'),detailClose=document.querySelector('#grave-close');
 function inspectGrave(){
  const d=destinations[game.target];if(!d)return;cancelLine();
  document.querySelector('#grave-name').textContent=d.name.normalize('NFC');document.querySelector('#grave-description').textContent=d.description.normalize('NFC');document.querySelector('#grave-quote').textContent=d.quote.normalize('NFC');
  const print=document.querySelector('#grave-print');print.textContent=game.target==='gabrys'?memeDetail:'';print.hidden=game.target!=='gabrys';detail.hidden=false;panel.hidden=true;detailClose.focus();
 }
 detailClose.onclick=()=>{detail.hidden=true;if(game.target&&!game.visited&&play.objective==='grave'){jGraveVisit(true);return;}panel.hidden=false;next.hidden=true;answers.querySelector('button')?.focus();};
 detail.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();detailClose.click()}if(e.key==='Tab'){e.preventDefault();detailClose.focus()}});
 function offerMemorial(){jGraveVisit();return;
  if(game.visited||!game.target)return;const d=destinations[game.target],session=++play.session;
  actConversation([['Sandra',d.description],['Aleks',d.quote]],null,()=>{
   dialogue.active=true;panel.hidden=false;speaker.textContent=d.name;subtitle.textContent='Przyjrzyj się tablicy albo zostaw znicz.';next.hidden=true;answers.replaceChildren();
   const inspect=document.createElement('button');inspect.type='button';inspect.dataset.action='inspect';inspect.textContent='[I] Przyjrzyj się nagrobkowi';inspect.onclick=inspectGrave;answers.append(inspect);
   const button=document.createElement('button');button.type='button';button.dataset.action='memorial';button.textContent=d.action;button.onclick=()=>{
    if(game.visited||session!==play.session)return;enableAudio(false);game.visited=true;
    const lines=act.rescueAttempted?[['Sandra','Znicz zostaje tutaj. Zrobiliśmy, co mogliśmy…'],['Aleks','Czekaj. Ktoś stoi za nami.']]:[['Sandra','Znicz zostaje tutaj. Teraz pomóżmy człowiekowi na krzyżu.'],['Aleks',act.houseVisited?'Wracamy pod krzyż. Spróbujemy rozwiązać więzy.':'Najpierw potrzebujemy narzędzia. Sprawdźmy domek przed bramą.']];
    actConversation(lines,null,()=>{if(act.rescueAttempted)startAvenger();else if(act.houseVisited)setObjective('rescue');else enterHouse();});
   };answers.append(button);inspect.focus();
  });
 }
 next.onclick=advanceDialogue;
 panel.addEventListener('keydown',e=>{
  const buttons=[...panel.querySelectorAll('button:not([hidden])')];
  if(e.key==='Tab'){const index=buttons.indexOf(document.activeElement);if(e.shiftKey&&index===0){e.preventDefault();buttons.at(-1)?.focus()}else if(!e.shiftKey&&index===buttons.length-1){e.preventDefault();buttons[0]?.focus()}}
  if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();const direction=e.key==='ArrowDown'||e.key==='ArrowRight'?1:-1;buttons[(buttons.indexOf(document.activeElement)+direction+buttons.length)%buttons.length]?.focus();}
  if(e.key.toLowerCase()==='i'&&answers.querySelector('[data-action=inspect]')){e.preventDefault();inspectGrave();}
  if(['1','2','3','4','5'].includes(e.key)&&(answers.querySelector('[data-target]')||answers.querySelector('[data-choice]'))){e.preventDefault();answers.children[Number(e.key)-1]?.click();}
 });
 // Two local players share one persistent world. Quest progress never uses film time.
 const play={active:false,space:'world',stage:'intro',objective:null,keys:new Set(),players:[],obstacles:[],graves:[],camera:null,departure:null,npcs:[],avenger:null,glimpseAt:null,resurrectionAt:0,endingAt:0,interact:null,prompt:'',steps:0,waitingFor:null,session:0};
 const HOUSE={x:10,z:-36.2},CROSS={x:0,z:-59.2},EXIT={x:0,z:-43.5};
 const interaction=document.createElement('div');interaction.id='interaction';interaction.hidden=true;interaction.setAttribute('role','status');document.body.append(interaction);
 const movementGuide=document.createElement('p');movementGuide.id='movement-guide';movementGuide.textContent='ALEKS [WASD] · SANDRA [STRZAŁKI] · [E / ENTER] interakcja. KAMERA: [Q / C] lub przeciągnij PPM, kółko — dystans, [V] — reset. LIŚCIE: [F / L] obok siebie, [G / K] sobie. PRZEDMIOT: [X / .]';movementGuide.hidden=true;panel.append(movementGuide);
 function clearMovement(){jHeld.clear();orbit.drag=null;play.keys.clear();for(const p of play.players)p.moving=false;}
 function resetPlay(){clearMovement();play.session++;Object.assign(play,{active:false,space:'world',stage:'intro',objective:null,players:[],obstacles:[],graves:[],camera:null,departure:null,npcs:[],avenger:null,glimpseAt:null,resurrectionAt:0,endingAt:0,interact:null,prompt:'',steps:0,waitingFor:null});interaction.hidden=true;movementGuide.hidden=true;}
 function makeWorldGraves(){
  const result=[];for(let row=0;row<12;row++)for(let col=0;col<10;col++){
   const side=col<5?-1:1,rank=col%5,id=row*13+col,z=-51-row*3.1-hash(id)*.8,x=side*(3.8+rank*1.65+hash(id+3)*.4);
   if(Object.values(destinations).some(d=>Math.hypot(x-d.x,z-d.z)<2.7||(Math.abs(x-d.x)<2.5&&z>d.z-1&&z<d.z+4.7)))continue;
   result.push({x,z,w:.50+hash(id+2)*.45,h:.8+hash(id+9)*1.2,kind:id%3,color:[105+hash(id)*40,116+hash(id)*35,131+hash(id)*30]});
  }return result;
 }
 function worldObstacles(){
  const rect=(x,z,w,d)=>({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2});
  const list=[rect(10,-41,6,7),rect(0,-62,1.65,1.25),rect(3.95,-14.45,2.65,1.15),rect(-10,-49,14, .65),rect(10,-49,14,.65)];
  for(const t of trees)list.push(rect(t.x,t.z,.62,.62));
  for(const d of [...play.graves,...Object.values(destinations)])list.push(rect(d.x,d.z+.62,d.w+.4,2.2));
  return list;
 }
 function blocked(x,z,space=play.space,r=.23){
  if(space==='journey')return jBlocked(x,z);
  if(space==='catacombs')return x<-8.45||x>8.45||z<-12.45||z>3.25||[-2,2].some(cx=>x>cx-1.35-r&&x<cx+1.35+r&&z>-8.95-r&&z<-7.2+r);
  if(space==='house')return x<-4.72||x>4.72||z<-6.45||z>3.25||(x>-.53-r&&x<2.13+r&&z>-5.02-r&&z<-3.78+r);
  if(x<-16.1||x>16.1||z<-78.5||z>-5.6)return true;
  return play.obstacles.some(o=>x>o.minX-r&&x<o.maxX+r&&z>o.minZ-r&&z<o.maxZ+r);
 }
 function partyNear(point,radius){return play.players.length===2&&play.players.every(p=>Math.hypot(p.x-point.x,p.z-point.z)<=radius);}
 function partyCenter(){const [a,b]=play.players;return a?{x:(a.x+b.x)/2,z:(a.z+b.z)/2}:{x:0,z:-8.5};}
 function setObjective(id){clearMovement();play.objective=id;play.stage=id==='escape'?'escape':'explore';game.phase='explore';act.busy=false;act.pending=null;if(id==='house-table')jHouseHint();saveCheckpoint();}
 function startExploration(){
  play.active=true;play.space='world';play.graves=makeWorldGraves();play.obstacles=worldObstacles();play.players=[{id:'aleks',x:-.65,z:-8.5,heading:Math.PI,walk:0,moving:false},{id:'sandra',x:.65,z:-8.55,heading:Math.PI,walk:2,moving:false}];
  play.stage='opening';play.objective='body';game.phase='explore';time=35;size();movementGuide.hidden=false;
  actConversation([['Sandra','Jesteśmy za dynią… Cmentarz jest przed nami. Trzymajmy się razem.'],['Aleks','Idziemy ostrożnie. Jeśli coś znajdziemy, podejdziemy oboje.']],null,()=>{movementGuide.hidden=true;setObjective('body');});
 }
 function movePlayer(p,dx,dz,other){
  const oldX=p.x,oldZ=p.z;
  const length=Math.hypot(dx,dz),separation=Math.hypot(p.x-other.x,p.z-other.z);
  if(length&&Math.hypot(p.x+dx-other.x,p.z+dz-other.z)<.5){
   const nx=(p.x-other.x)/(separation||1),nz=(p.z-other.z)/(separation||1),inward=Math.min(0,dx*nx+dz*nz);
   let tx=dx-inward*nx,tz=dz-inward*nz,tangent=Math.hypot(tx,tz);
   if(tangent<length*.35){tx=nz;tz=-nx;tangent=1;}
   dx=tx/tangent*length;dz=tz/tangent*length;
  }
  for(const axis of ['x','z']){
   const amount=axis==='x'?dx:dz;if(!amount)continue;const x=p.x+(axis==='x'?amount:0),z=p.z+(axis==='z'?amount:0),distance=Math.hypot(x-other.x,z-other.z);
   if(distance>jLeash()&&distance>Math.hypot(p.x-other.x,p.z-other.z)){play.waitingFor=other.id;continue;}if(blocked(x,z)||journey.zone==='zoo'&&journey.mode==='zoo'&&jBlocked(x,z,p)||distance<.48)continue;p.x=x;p.z=z;
  }
  const distance=Math.hypot(p.x-oldX,p.z-oldZ);p.moving=distance>.0001;if(p.moving){p.walk+=distance*6.2;p.heading=Math.atan2(p.x-oldX,p.z-oldZ);}
 }
 function updatePlay(dt){
  if(!play.active)return;play.steps++;play.waitingFor=null;const free=!dialogue.active&&detail.hidden&&!act.busy&&!chapter.quiz.open&&!selection.active&&!jLocks()&&!journey.finished&&!journey.arenaChallenge&&game.phase!=='complete';
  if(free){orbit.yaw+=(Number(play.keys.has('KeyC'))-Number(play.keys.has('KeyQ')))*dt*1.5;const bindings=[['KeyA','KeyD','KeyW','KeyS'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']];
   play.players.forEach((p,i)=>{const b=bindings[i],dx=Number(play.keys.has(b[1]))-Number(play.keys.has(b[0])),dz=Number(play.keys.has(b[3]))-Number(play.keys.has(b[2])),length=Math.hypot(dx,dz)||1;if(chapter.seated[p.id]||journey.hp[i]<=0||['trance','betrayal-run'].includes(journey.mode)&&i===1){p.moving=false;return;}const c=Math.cos(orbit.yaw),s=Math.sin(orbit.yaw);movePlayer(p,(dx*c+dz*s)/length*(journey.seal&&i===0?1.65:2.8)*dt,(-dx*s+dz*c)/length*(journey.seal&&i===0?1.65:2.8)*dt,play.players[1-i]);});
  }else for(const p of play.players)p.moving=false;
  if(play.stage==='escort'&&!dialogue.active)for(const p of [...play.npcs,play.avenger])walkNPC(p,dt);
  if(play.space==='world'){
   const c=partyCenter();time=clamp(35+(-c.z-8.5)*.74,35,68);
   if(play.glimpseAt===null&&c.z<-31)play.glimpseAt=ambientTime;
  }
  if(free)playEvents();jTick(dt);updateInteraction();
 }
 function playEvents(){
  if(play.objective==='body'&&partyNear({x:0,z:-13.4},4.2)){
   game.bodySeen=true;play.objective=null;game.phase='discovery';
   actConversation([['Sandra','Aleks… zatrzymaj się. Przy drodze… to krew. Te ptaki coś jedzą.'],['Aleks','Widzę. Nie odchodź ode mnie. Coś poruszyło się w tych krzakach.'],['Sandra','Nie chcę tu stać. Chodźmy… ale powoli.']],null,()=>{game.phase='choice';actConversation([['Sandra','Dawno nas tu nie było… Pewnie grób już cały zarósł.'],['Aleks','Najpierw go znajdźmy. Kogo dziś odwiedzamy?']],true);});
  }else if(play.objective==='cross-warning'&&partyNear(CROSS,6.4)){
   game.warningSeen=true;play.stage='warning';play.objective=null;
   actConversation([['Nieznajomy','Uciekajcie…'],['Sandra','Aleks… on jeszcze żyje! Może mu pomóżmy?'],['Aleks','Możemy najpierw sprawdzić nasz grób… albo poszukać czegoś do przecięcia więzów.']],
   [{id:'help',label:'Pomóżmy mu — poszukajmy narzędzia',run:()=>{act.order='help-first';enterHouse();}},{id:'grave',label:'Najpierw odwiedźmy grób',run:()=>{act.order='grave-first';actConversation([['Sandra',graveDirections()]],null,()=>setObjective('grave'));}}]);
  }else if(play.stage==='escort'&&partyNear(EXIT,2.5)&&[...play.npcs,play.avenger].every(p=>!p.route.length&&p.goal&&Math.hypot(p.x-p.goal.x,p.z-p.goal.z)<.35)){
   play.stage='verdict';play.objective=null;actConversation([['Mściciel','Dobrze. Jesteśmy przed cmentarzem. Teraz wybieraj, Aleks.']],finalChoices());
  }else if(play.objective==='escape'&&play.players.every(p=>p.z>-32.5)){
   play.objective=null;actConversation([['Sandra','Jesteśmy poza cmentarzem. Teraz naprawdę stąd odchodzimy.'],['Aleks','Razem. Ani kroku z powrotem.']],null,completeGame);
  }
 }
 function targetGenitive(){return {gabrys:'Gabrysia',weronika:'Weroniki',boris:'Borysa'}[game.target];}
 function graveDirections(){return {gabrys:'Grób Gabrysia jest w pierwszej lewej alejce, niedaleko krzyża. Podejdźmy do tablicy.',weronika:'Grób Weroniki jest po prawej stronie krzyża. Podejdźmy do jasnego, zaokrąglonego nagrobka.',boris:'Grób Borysa jest dalej, w lewej alejce, za krzyżem. Szukajmy szerokiej pokrywy.'}[game.target];}
 function interactionTarget(){
  if(!play.active||dialogue.active||!detail.hidden||act.busy||chapter.quiz.open||play.space==='catacombs'||game.phase==='complete')return null;
  if(play.space==='house')return play.departure?{point:{x:0,z:2.65},radius:1.85,label:'wyjdźcie z domku',run:leaveHouse}:{point:{x:.8,z:-2.8},radius:1.75,label:'sprawdźcie nożyce na stole',run:houseTable};
  if(play.objective==='house')return {point:HOUSE,radius:1.85,label:'wejdźcie do domku',run:houseDoor};
  if(play.objective==='grave'){const d=destinations[game.target];return {point:{x:d.x,z:d.z+2.25},radius:1.7,label:`grób: ${d.name}`,run:()=>{game.arrival=true;offerMemorial();}};}
  if(play.objective==='rescue')return {point:CROSS,radius:2.35,label:'spróbujcie uwolnić człowieka',run:attemptRescue};
  return null;
 }
 function updateInteraction(){
  if(play.active&&!dialogue.active&&!act.busy&&!journey.zone){const loot=jLootPrompt();if(loot){interaction.textContent=loot;interaction.hidden=false;return;}}
  if(journey.zone){const text=!dialogue.active&&!act.busy&&!jLocks()?jPrompt():'';interaction.textContent=text;interaction.hidden=!text;return;}
  if(play.space==='catacombs'){play.interact=null;const label=!dialogue.active&&!chapter.quiz.open&&!act.busy?catPrompt():'';if(label!==play.prompt){play.prompt=label;interaction.textContent=label;interaction.hidden=!label;}return;}
  const action=interactionTarget();play.interact=action;const near=action&&play.players.some(p=>Math.hypot(p.x-action.point.x,p.z-action.point.z)<action.radius+1.3);
  const label=near?(partyNear(action.point,action.radius)?`[E / ENTER] ${action.label}`:`[ ${action.label} — podejdźcie oboje ]`):play.waitingFor&&!dialogue.active?`[ Poczekaj na ${play.waitingFor==='sandra'?'Sandrę — jej sterowanie: strzałki':'Aleksa — jego sterowanie: WASD'} ]`:'';
  if(label!==play.prompt){play.prompt=label;interaction.textContent=label;interaction.hidden=!label;}
 }
 function requestInteraction(who=null){
  if(jInteract(who))return;
  if(play.space==='catacombs'){requestSeat();return;}
  const action=interactionTarget();if(action&&partyNear(action.point,action.radius)){clearMovement();action.run();return;}
  const hints={body:'Trzymajmy się ścieżki. Przy prawej krawędzi drogi coś leży.', 'cross-warning':'Przejdźmy przez otwartą bramę. Człowiek jest przy wielkim krzyżu na środku.',house:'Drewniany domek stoi po prawej stronie drogi, przed bramą cmentarza.',grave:game.target?graveDirections():'',rescue:'Wróćmy pod krzyż. Oboje musimy podejść do człowieka.',escort:'Wyjdźmy otwartą bramą na drogę przed cmentarzem. Oboje.',escape:'Biegnijmy drogą od cmentarza, z powrotem w stronę dyni.'};
  const text=action&&!partyNear(action.point,action.radius)&&play.players.some(p=>Math.hypot(p.x-action.point.x,p.z-action.point.z)<action.radius+1.3)?'Poczekaj. Musimy podejść oboje.':play.space==='house'?(play.departure?'Wyjście jest za nami, pośrodku ściany od strony drogi.':'Podejdźmy do stołu w głębi pokoju. Nie do ciał.'):hints[play.objective];
  if(text)actConversation([['Sandra',text]]);
 }
 function houseDoor(){
  if(!partyNear(HOUSE,1.85))return;clearMovement();play.space='house';actScene('house');act.houseVisited=true;play.camera=null;play.players[0].x=-.65;play.players[1].x=.65;for(const p of play.players){p.z=2.4;p.heading=Math.PI;}
  actConversation([['Sandra','Boże… tyle krwi. Ci ludzie się nie ruszają.'],['Aleks','Na stole w głębi pokoju leżą nożyce. Podejdźmy razem. Mogą przeciąć jego więzy.']],null,()=>setObjective('house-table'));
 }
 function houseTable(){
  if(play.departure||act.tool)return;
  actConversation([['Aleks','To mocne nożyce do drutu. Bierzemy je i wracamy do człowieka?']],
   [{id:'take',label:'Weź nożyce i wróć do wyjścia',run:()=>{act.tool=true;play.departure='tool';actConversation([['Aleks','Mam je. Teraz do drzwi, potem wracamy pod krzyż.'],['Sandra','Szybko, zanim będzie za późno.']],null,()=>setObjective('leave-house'));}},
    {id:'flee',label:'Zostaw nożyce — wycofaj się do wyjścia',run:fleeHouse}]);
 }
 function fleeHouse(){
  play.departure='flee';actConversation([['Sandra',game.visited?'Aleks, ty toksyczna szmato! Grób już odwiedziliśmy. Przynajmniej spróbujmy pomóc temu człowiekowi.':`Aleks, ty toksyczna szmato! Przynajmniej zobaczmy grób ${targetGenitive()}.`],['Aleks','Dobra… wyjdźmy na drogę. Potem spróbujemy rozwiązać więzy.']],null,()=>setObjective('leave-house'));
 }
 function leaveHouse(){
  if(!play.departure||!partyNear({x:0,z:2.65},1.85))return;
  clearMovement();play.space='world';actScene('cemetery');play.camera=null;play.players[0].x=9.35;play.players[1].x=10.65;for(const p of play.players){p.z=-36.1;p.heading=0;}
  setObjective(act.tool||game.visited?'rescue':'grave');
 }
 function enterHouse(){actConversation([['Aleks','Dobra, chodźmy. W drewnianym domku po prawej, przed bramą, może znajdziemy narzędzie.'],['Sandra','Tylko trzymaj się blisko.']],null,()=>setObjective('house'));}
 function returnToGrave(){actScene('cemetery');actConversation([['Sandra',graveDirections()]],null,()=>setObjective('grave'));}
 function attemptRescue(){
  if(act.rescueAttempted||!partyNear(CROSS,2.35))return;
  act.rescueAttempted=true;play.objective=null;play.stage='rescue';
  actConversation([['Aleks',act.tool?'Przecinam więzy. Spokojnie, zaraz cię zdejmiemy.':'Nie mam nożyc… spróbuję poluzować te węzły.'],['Sandra',act.tool?'Trzymam go. Ostrożnie!':'Nie puszczają… Nie damy rady go teraz zdjąć.']],null,()=>{
   cutscene('cemetery',2.2,()=>{act.rescued=act.tool;act.rescueHint=act.tool&&act.order==='help-first';const lines=[['Nieznajomy','Aaaaa! Aaaaa! On idzie!']];if(act.rescueHint)lines.push(['Nieznajomy','Nie ufajcie temu, który wygląda jak on.']);lines.push(['Sandra',act.tool?'Połóżmy go pod krzyżem. Traci za dużo krwi…':'Nie możemy rozwiązać więzów. Traci przytomność…']);actConversation(lines,null,()=>{act.strangerDead=true;actConversation([['Sandra','Aleks… już nie oddycha.'],['Aleks',act.rescueHint?'Słyszałem, co powiedział. Zapamiętam.':'Nie zdążyliśmy.']],null,()=>game.visited?startAvenger():actConversation([['Aleks','Coś nas obserwuje. Zanim odejdziemy, sprawdźmy jeszcze nasz grób.'],['Sandra',graveDirections()]],null,()=>setObjective('grave')));});});
  });
 }
 function finalChoices(){return ['gabrys','weronika','boris','sandra','self'].map(id=>({id,label:{gabrys:'Gabryś (Gabriel)',weronika:'Weronika',boris:'Borys',sandra:'Sandra',self:'Sam siebie'}[id],run:()=>jConfirmVictim(id)}));}
 function startAvenger(){
  if(!game.visited||!act.rescueAttempted||play.avenger)return;
  const c=partyCenter(),sx=Math.round(clamp(c.x,-1.2,1.2)*2)/2,sz=Math.round((c.z-4.5)*2)/2;
  const spawn=[0,-1.5,1.5,-2.5,2.5,-3.5,3.5].map(dx=>({x:sx+dx,z:sz})).find(p=>!blocked(p.x,p.z,'world',.35))||{x:0,z:-53};
  play.avenger={id:'avenger',...spawn,heading:0,walk:0,moving:false,route:[]};play.stage='ambush';play.objective=null;
  actConversation([['Mściciel','Odwróćcie się.'],['Aleks','Spierdalaj, gościu, stąd!'],['Sandra','Aleks, nie dygaj. Będzie dobrze.'],['Mściciel','Aleks. Musisz wybrać, kogo zabijasz: Gabriela, Weronikę, Borysa, Sandrę… czy samego siebie.'],['Aleks','Przecież kurwa oni nie żyją!'],['Mściciel','Gabriel, którego nazywacie Gabrysiem, i pozostali. Spójrz na ich groby. Jeszcze nie skończyliśmy.']],null,()=>{
   play.stage='resurrection';play.resurrectionAt=ambientTime;play.npcs=['gabrys','weronika','boris'].map(id=>({id,x:destinations[id].x,z:destinations[id].z+2.15,heading:0,walk:0,moving:false,route:[]}));
   cutscene('cemetery',7.5,()=>{act.revived=true;play.stage='resurrect-talk';actConversation([['Gabryś','Ahh… dobra drzemka.'],['Weronika','Ahh… dobra drzemka.'],['Borys','Ahh… dobra drzemka.'],jGraveReply(),['Mściciel','Teraz znów możecie umrzeć. Wyjdźcie przede mną za bramę. Wszyscy.'],['Sandra','Nie puszczaj mojej ręki, Aleks. Idziemy razem.']],null,startEscort);});
  });
 }
 function startEscort(){
  play.stage='escort';play.objective='escort';game.phase='explore';clearMovement();
  [...play.npcs,play.avenger].forEach((p,i)=>{const target=i===3?{x:0,z:-47}:{x:(i-1)*2.2,z:-46};p.route=findRoute(p,target,'world');p.goal=target;});
 }
 function finishAct(victim){
  if(play.stage!=='verdict'||act.ending)return;if(['self','sandra'].includes(victim)){act.ending='resurrection';jResurrectionBranch(victim);return;}act.victim=victim;play.objective=null;
  if(victim==='self'){
   act.ending='crows';act.dice=false;actConversation([['Aleks','Wybieram siebie. Zostaw ich.'],['Sandra','Ty pizdo! Nie pozwolę na to.'],['Sandra','Tom. Tom. Tom.']],null,()=>{play.stage='crow-ending';play.endingAt=ambientTime;cutscene('cemetery',4,()=>actConversation([['Mściciel','Nie… odsuńcie je!'],['Sandra','Już po nim. Aleks, biegnijmy drogą w stronę dyni!']],null,()=>setObjective('escape')));});
  }else{
   act.ending='punishment';actConversation([['Aleks',`Wybieram… ${{gabrys:'Gabrysia',weronika:'Weronikę',boris:'Borysa',sandra:'Sandrę'}[victim]}.`],['Mściciel','Twój wybór. Mój strzał.']],null,()=>{play.stage='victim-ending';play.endingAt=ambientTime;cutscene('cemetery',2.5,()=>actConversation([[{gabrys:'Gabryś',weronika:'Weronika',boris:'Borys',sandra:'Sandra'}[victim],'Aleks, zasługujesz na karę. Trzy klapsy.']],null,()=>['gabrys','weronika','boris'].includes(victim)?beginActTwo():completeGame()));});
  }
 }
 function completeGame(){clearMovement();play.stage='complete';play.objective=null;game.phase='complete';act.busy=false;replay.tabIndex=0;replay.classList.add('visible');updateInteraction();}
 function endAct(){completeGame();}
 function findRoute(from,to,space=play.space){
  const step=.5,minX=space==='house'?-4.5:space==='catacombs'?-8:space==='journey'?-10:-16,minZ=space==='house'?-6:space==='catacombs'?-12:space==='journey'?-25:-78,cols=space==='house'?19:space==='catacombs'?33:space==='journey'?41:65,rows=space==='house'?19:space==='catacombs'?31:space==='journey'?59:146;
  const cell=p=>({x:clamp(Math.round((p.x-minX)/step),0,cols-1),z:clamp(Math.round((p.z-minZ)/step),0,rows-1)}),point=n=>({x:minX+n.x*step,z:minZ+n.z*step}),key=n=>n.z*cols+n.x,start=cell(from),goal=cell(to),open=[start],came=new Map(),cost=new Map([[key(start),0]]),closed=new Set();
  let end=null;while(open.length){let best=0;for(let i=1;i<open.length;i++)if(open[i].f<open[best].f)best=i;const n=open.splice(best,1)[0],k=key(n);if(closed.has(k))continue;closed.add(k);if(n.x===goal.x&&n.z===goal.z){end=n;break;}
   for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const q={x:n.x+dx,z:n.z+dz};if(q.x<0||q.x>=cols||q.z<0||q.z>=rows)continue;const p=point(q);if(blocked(p.x,p.z,space,.28))continue;if(dx&&dz&&(blocked(point(n).x+dx*step,point(n).z,space,.28)||blocked(point(n).x,point(n).z+dz*step,space,.28)))continue;const nk=key(q),g=cost.get(k)+Math.hypot(dx,dz);if(g>=(cost.get(nk)??Infinity))continue;cost.set(nk,g);came.set(nk,n);q.f=g+Math.hypot(q.x-goal.x,q.z-goal.z);open.push(q);}
  }
  if(!end)return [];const path=[];while(key(end)!==key(start)){path.push(point(end));end=came.get(key(end));}path.reverse();if(!blocked(to.x,to.z,space,.28))path.push({...to});return path;
 }
 function walkNPC(p,dt){
  if(!p?.route?.length){if(p)p.moving=false;return;}const q=p.route[0],dx=q.x-p.x,dz=q.z-p.z,d=Math.hypot(dx,dz),amount=Math.min(d,3.15*dt);p.x+=dx/(d||1)*amount;p.z+=dz/(d||1)*amount;p.walk+=amount*6;p.heading=Math.atan2(dx,dz);p.moving=amount>.001;if(d<.13)p.route.shift();
 }
 function setupPlayCamera(){
  let c=partyCenter(),distance=(8.1+Math.hypot(play.players[0].x-play.players[1].x,play.players[0].z-play.players[1].z)*.42)*orbit.zoom,lookY=-.35,yaw=orbit.yaw,pitch=orbit.pitch;cameraFocus=0;
  if(play.stage==='ambush'&&play.avenger){c=play.avenger;distance=5.8;lookY=-.25;pitch=.15;yaw=0;cameraFocus=1;}
  if(play.stage==='warning'||play.stage==='rescue'){c={x:0,z:-60.5};distance=8;lookY=1;pitch=-.09;yaw=0;cameraFocus=1;}
  if(play.stage==='resurrection'||play.stage==='resurrect-talk'){const i=play.stage==='resurrection'?Math.min(2,Math.floor((ambientTime-play.resurrectionAt)/2.5)):['Gabryś','Weronika','Borys'].indexOf(dialogue.lines[dialogue.index]?.[0]);if(i>=0){c=play.npcs[i]||c;distance=6.5;pitch=.16;yaw=0;}}
  if(play.space==='house')distance*=.8;if(play.space==='catacombs')distance*=.88;
  if(chapter.active&&play.space==='world'){distance=14;lookY=2;pitch=.18;yaw=0;}
  const desired={x:c.x+Math.sin(yaw)*Math.cos(pitch)*distance,y:lookY+Math.sin(pitch)*distance,z:c.z+Math.cos(yaw)*Math.cos(pitch)*distance,lookX:c.x,lookY,lookZ:c.z};if(!play.camera)play.camera={...desired};
  for(const key of Object.keys(desired))play.camera[key]=mix(play.camera[key],desired[key],.2);
  cam=v(play.camera.x,play.camera.y,play.camera.z);forward=norm(sub(v(play.camera.lookX,play.camera.lookY,play.camera.lookZ),cam));right=norm(cross(forward,v(0,1,0)));up=norm(cross(right,forward));focal=Math.min(H*1.17,W*1.02);
 }
 let modelTransform=null,characterMotion=null;
 function drawPlayPerson(p,npc=false,flush=true){
  if(!npc&&cameraFocus>.65)return;const fallen=act.ending==='punishment'&&act.victim===p.id&&ambientTime-play.endingAt>1.1||p.id==='avenger'&&(chapter.avengerDown||act.ending==='crows'&&ambientTime-play.endingAt>2);
  const female=p.id==='sandra'||p.id==='weronika',color=journey.ghost===p.id?[143,189,218]:p.id==='avenger'?[167,184,197]:female?[173,146,124]:[144,162,181];
  let offset=play.stage==='resurrection'?mix(-2.1,0,smooth(.2,2.2,(ambientTime-play.resurrectionAt)%2.5)):0;
  if(play.stage==='resurrection'){const i=play.npcs.indexOf(p);offset=mix(-2.1,0,smooth(i*2.5+.2,i*2.5+2.2,ambientTime-play.resurrectionAt));}
  if(!npc)offset=chapter.seated[p.id]?-.2:chapter.phase==='collapse'?-Math.pow(Math.max(0,ambientTime-chapter.at),2)*.7:0;modelTransform={x:p.x,z:p.z,c:Math.cos(p.heading),s:Math.sin(p.heading)};characterMotion=p;
  try{actHuman(p.x,p.z,color,offset,fallen,p.id==='avenger',female?(p.id==='sandra'?'sandra':'weronika'):'person');}finally{modelTransform=null;characterMotion=null;}if(flush)flushMesh();
 }
 function drawHouseExterior(){
  castShadow(10,-41,2.5,4,.7);meshBox(10,-1.5,-41,6,3.6,7,[75,87,99]);meshPrism(10,2.1,-41,[[-3.35,0],[3.35,0],[0,2.0]],7.6,[58,70,85]);meshBox(10,-1.48,-37.45,1.25,2.4,.12,[24,31,40]);meshBox(11.85,.05,-37.4,.85,1.0,.10,[137,152,165]);meshBox(11.85,.05,-37.32,.045,1.0,.06,[45,55,66]);
  for(let i=0;i<11;i++)meshBox(7.2+i*.55,-1.45,-37.39,.035,3.4,.035,[45,57,70]);flushMesh();
  groundPolygon([v(9.3,-1.49,-37.35),v(10.7,-1.49,-37.35),v(11,-1.49,-34.9),v(9,-1.49,-34.9)],'#59616b','#202a35');
 }
 function addPlaySolids(solids){
  solids.push({x:10,z:-41,draw:drawHouseExterior});
  for(const d of play.graves)solids.push({x:d.x,z:d.z,draw:()=>{graveMesh(d.x,d.z,d.w,d.h,d.kind,d.color);flushMesh();}});
  for(const [key,d] of Object.entries(destinations))solids.push({x:d.x,z:d.z,draw:()=>{graveMesh(d.x,d.z,d.w,d.h,d.kind,d.color,true);meshBox(d.x,-.97,d.z+.28,d.w*.82,d.h*.83,.055,d.color.map(c=>Math.min(220,c+25)));if(key==='gabrys')meshBox(d.x,2.05,d.z,d.w+.13,.14,.62,[151,155,160]);if(game.visited&&journey.candle&&game.target===key)meshBox(d.x+.48,-1.13,d.z+1.12,.18,.28,.18,[177,184,185]);flushMesh();}});
  for(const p of play.players)solids.push({x:p.x,z:p.z,draw:()=>drawPlayPerson(p)});
  for(const p of play.npcs)solids.push({x:p.x,z:p.z,draw:()=>drawPlayPerson(p,true)});
  if(play.avenger)solids.push({x:play.avenger.x,z:play.avenger.z,draw:()=>drawPlayPerson(play.avenger,true)});
 }
 function drawPlayEffects(){
  if(act.dice&&['verdict','crow-ending'].includes(play.stage)){const p=play.players[1],x=p.x+.35,y=-.5+Math.abs(Math.sin(ambientTime*6))*.5,z=p.z;meshBox(x,y,z,.18,.18,.18,[220,224,209]);for(let dot=0;dot<3;dot++)meshEllipsoid(v(x+(dot-1)*.045,y+.09+(dot-1)*.045,z+.095),.012,.012,.008,[25,34,43]);flushMesh();}
  if(act.ending==='crows'&&play.avenger){const center=play.avenger,elapsed=ambientTime-play.endingAt;for(let i=0;i<30;i++){const a=i*2.4+ambientTime*3,r=mix(3.8,.5,smooth(0,3,elapsed)),p=proj(v(center.x+Math.cos(a)*r,.1+Math.sin(a*1.7)*1.3,center.z+Math.sin(a)*r));if(!p)continue;g.strokeStyle='#a0adbb';g.lineWidth=1.5;const span=p.s*.18;g.beginPath();g.moveTo(p.x-span,p.y-Math.sin(a*5)*span*.5);g.lineTo(p.x,p.y);g.lineTo(p.x+span,p.y-Math.sin(a*5)*span*.5);g.stroke();}}
 }
 function storyTick(){if(!play.active&&time>=33)startExploration();}
 const movementCodes=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
 window.addEventListener('keydown',e=>{
  if(jKey(e))return;
  if(!play.active||selection.active||chapter.quiz.open||e.ctrlKey||e.altKey||e.metaKey)return;
  if(movementCodes.has(e.code)&&!dialogue.active&&detail.hidden&&!act.busy&&game.phase!=='complete'){e.preventDefault();if(!e.repeat)play.keys.add(e.code);if(!audioEnabled)enableAudio(false);}
  if((e.code==='KeyE'||e.code==='Enter')&&!e.repeat&&!dialogue.active&&detail.hidden&&!act.busy&&game.phase!=='complete'){e.preventDefault();requestInteraction(e.code==='Enter'?'sandra':'aleks');}
 },true);
 window.addEventListener('keyup',e=>{play.keys.delete(e.code);jKeyUp(e);});window.addEventListener('blur',clearMovement);

 const REM_ASCII="\n\n\n\n                               **\n                           %x**+**\n                        %%x********x\n                      %xx*+++*x**+**x\n                     %x***++*x*++-=**\n                    %**x*++*x*x++;;-+x\n                   %*+**++++xx*+*-;-=*\n                  %x+**++++*x****-;--+\n                  x****+***xx****-;;-++\n+x#              x*+xx****x**x***=;--=+\n;-+*%           %x+*x*****xxx***x+;--=+\n;:;;=*x        %x+*xx*****xx****x* ;--+\n-;:;;;-+x%    #x***xx****xxxx***x*  --=\n=-;::;;;;=*%@#%*+*xx****xx**x***x*   -=\n--;:::::::;+x%x++********xxx****x*  ;-+*\n=---;;;:::;;;;------;;;-=+******xx  -=++*\n===-----;--;;;;;;:::;--;::;----==+++==+++\n=====----=;;;;::::-%####%=,:;;;;;:;======\n======---;;;;::::-########=,:;;;;:=#+.\n========;;;;::::,x########%,::;;;:+#%;\n======+-;;;::::::%########%:,:::::+##=\n====---;;;::::::,x########x,:::;;;=##+,\n  --=--;;;;:::::,-########=::;;;;-*%#+,\n   ==-;;;;;::::::,-x####x=::::;;;;=*%=:\n  ++=-;;;;;:::::::,,;--;,,:::::::::;+=::\n-----;;;;;;;:::::::::,,,:,,,,,,::::::-:\n  -;;;;;;;;;;::::::::::::::::::::::::::\n   ;;;;;;;;;;:::::::::::::::::::::::::\n     ;;;;;;;;;::::::::::::::::::::::\n       ;;;;;:::::;;;;;;::::::::::;:\n     =+*xx*++==--;;;;;;;;;;;;;;;;:\n     ;:;=*xxxxxxxx**+=--;;;;;;;;;+x*\n     :,,;=-+*xxxxxxxxxx***+==---+x%%%*\n     ==*x*=-;=*xxxxxxxxxx*++=-=*xxxx%%+\n   x%%%x*+++-;-=+xxxxxxx+==-;-==+*xxxxx\nx%%xx****+++=-==-=+**x*==+=---=+==+*xx*x%\n%%x**++++++++=++++=====++**+==+***===+++xx%%x*+*\n*++*++++++*++=++++++++++****+=++***+=++*+**xxx==";
 // Loadout, camera orbit, comic gestures and the Goon Room are separate modal states.
 const itemCatalog={
  rem:{name:'Rem',art:REM_ASCII,description:'Mały pasażer ze świata snów.',place:'Posłanie przy lewej ścianie.',station:{x:-6,z:-4}},
  paper:{name:'Kartka „gaźnik”',art:Array.from({length:15},(_,i)=>i===0||i===14?'+--------------------------------+':'| gaźnik gaźnik gaźnik gaźnik      |').join('\n'),description:'Ani jednego wolnego miejsca. Tylko gaźnik.',place:'Kamienna szczelina w lewym narożniku.',station:{x:-6,z:-10}},
  food:{name:'Karma dla psa',art:'       .----------.\n      /  ________  \\\n     |  /  /\\  \\  |\n     | |  (oo) | |\n     |  \\_ -- _/  |\n     |    KARMA    |\n     |  o  o  o  o |\n     |  o  o  o  o |\n      \\__________/',description:'Puszka karmy. Ktoś na nią czeka.',place:'Miska przy prawej ścianie.',station:{x:6,z:-3}},
  fork:{name:'Widelec',art:'       | | | |\n       | | | |\n       | | | |\n       \\_____ /\n          ||\n          ||\n          ||\n          ||\n          ||\n         (__) ',description:'Ambitna broń przeciwko makaronowi.',place:'Żelazna krata w prawym narożniku.',station:{x:6,z:-9}},
  gouda:{name:'Ser gouda',art:'            ______\n         .-\'  o  /|\n      .-\' o     / |\n    .\'_____o__/  |\n    | o   O   | o |\n    |   o     |  /\n    | O    o  | /\n    |_________|/',description:'Pachnie lepiej, niż wygląda cała wyprawa.',place:'Mała nora pod tylną ścianą.',station:{x:0,z:-11}},
  pen:{name:'Długopis',art:'                 /\\\n                / /\n               / /\n              / /\n             / /\n            / /\n           / /\n          /_/\n         / /\n        /_/',description:'Zaznacza odpowiedzi zwykłym atramentem.',place:'Przyda się na kartce z quizem.'},
  tom:{name:'Tom',art:'               ___\n          ____/o o\\____\n        /     \\_v_/    \\\n       / .--. .--. .--. \\\n      | / xx V xx V xx \\ |\n      | \\__/ \\__/ \\__/ |\n       \\  .--. .--.   /\n     __/\\/ xx V xx \\/\\__\n    (___)\\___/\\___/(____)\n             (___)',description:'Pluszowy żółw. Miękki. Podejrzanie spokojny.',place:'Okrągła nisza przy wejściu.',station:{x:0,z:.3}}
 };
 const baseItems=['rem','paper','food','fork','gouda','pen'];
 const selection={active:true,index:{aleks:0,sandra:0},confirmed:{aleks:false,sandra:false},bag:{aleks:null,sandra:null}};
 const orbit={yaw:0,pitch:.12,zoom:1,drag:null};
 const chapter={active:false,phase:null,victim:null,at:0,avengerDown:false,seated:{aleks:false,sandra:false},used:[],quiz:{open:false,round:0,cursor:{aleks:0,sandra:0},answers:[{aleks:null,sandra:null},{aleks:null,sandra:null}],ink:{aleks:null,sandra:null},complete:false,animal:null}};
 const loadout=document.createElement('section');loadout.id='loadout';loadout.setAttribute('aria-label','Wybór przedmiotów Aleksa i Sandry');
 const loadoutPanes={};
 for(const who of ['aleks','sandra']){
  const pane=document.createElement('section');pane.className='loadout-pane';pane.dataset.player=who;
  pane.innerHTML=`<header><span>[ PRZED WYPRAWĄ ]</span><h1>${who==='aleks'?'ALEKS':'SANDRA'}</h1><p>Jeden przedmiot. Twój wybór.</p></header><div class="loadout-body"><pre class="item-art" aria-label="Przedmiot w ASCII"></pre><div class="item-list" role="group" aria-label="Przedmioty"></div></div><p class="item-description"></p><button class="lock-item" type="button"></button><small>${who==='aleks'?'W / S — wybór · F — potwierdź':'↑ / ↓ — wybór · L — potwierdź'}</small>`;
  loadoutPanes[who]=pane;loadout.append(pane);
 }
 const depart=document.createElement('button');depart.id='depart';depart.type='button';depart.textContent='[ ENTER ] Wyruszamy';depart.onclick=beginProlog;loadout.append(depart);document.body.append(loadout);
 const quizPanel=document.createElement('section');quizPanel.id='quiz';quizPanel.hidden=true;quizPanel.setAttribute('aria-label','Dwie kartki quizu');const quizPanes={};
 for(const who of ['aleks','sandra']){const pane=document.createElement('section');pane.className='quiz-paper';pane.dataset.player=who;pane.innerHTML=`<header><span>GOON ROOM / KARTKA ${who==='aleks'?'01':'02'}</span><h2>${who==='aleks'?'ALEKS':'SANDRA'}</h2><small class="ink-method"></small></header><p class="quiz-question"></p><div class="quiz-options" role="group" aria-label="Odpowiedzi"></div><p class="quiz-status" aria-live="polite"></p><small>${who==='aleks'?'W / S — wybór · F — zaznacz':'↑ / ↓ — wybór · L — zaznacz'}</small>`;quizPanes[who]=pane;quizPanel.append(pane);}
 const leaveQuiz=document.createElement('button');leaveQuiz.type='button';leaveQuiz.id='leave-quiz';leaveQuiz.textContent='[ WSTAŃ I WRÓĆ DO SALI ]';leaveQuiz.hidden=true;leaveQuiz.onclick=()=>{if(chapter.quiz.complete){jAfterQuiz();return;}chapter.quiz.open=false;quizPanel.hidden=true;chapter.seated={aleks:false,sandra:false};play.stage='explore';play.objective='next-act';game.phase='awaiting-next-act';clearMovement();};quizPanel.append(leaveQuiz);document.body.append(quizPanel);
 function choicesFor(who){return who==='sandra'?[...baseItems,'tom']:baseItems;}
 function renderSelection(){
  for(const who of ['aleks','sandra']){const pane=loadoutPanes[who],ids=choicesFor(who),current=ids[selection.index[who]],item=itemCatalog[current];pane.querySelector('.item-art').textContent=item.art;pane.querySelector('.item-description').textContent=item.description;const list=pane.querySelector('.item-list');list.replaceChildren();
   ids.forEach((id,i)=>{const b=document.createElement('button');b.type='button';b.dataset.item=id;b.dataset.owner=who;b.setAttribute('aria-pressed',String(i===selection.index[who]));b.textContent=`${i===selection.index[who]?'[X]':'[ ]'} ${itemCatalog[id].name}`;b.onclick=()=>{selection.index[who]=i;selection.confirmed[who]=false;renderSelection();};list.append(b);});
   const confirm=pane.querySelector('.lock-item');confirm.dataset.confirm=who;confirm.textContent=selection.confirmed[who]?`[ GOTOWE: ${item.name} ]`:'[ BIORĘ TEN PRZEDMIOT ]';confirm.onclick=()=>confirmItem(who);pane.classList.toggle('ready',selection.confirmed[who]);
  }depart.disabled=!Object.values(selection.confirmed).every(Boolean);
 }
 function confirmItem(who){if(!selection.active)return;const id=choicesFor(who)[selection.index[who]];selection.bag[who]={id,used:false};selection.confirmed[who]=true;enableAudio(false);renderSelection();}
 function resetSelection(){selection.active=true;selection.index={aleks:0,sandra:0};selection.confirmed={aleks:false,sandra:false};selection.bag={aleks:null,sandra:null};loadout.hidden=false;renderSelection();}
 function beginProlog(){if(!Object.values(selection.confirmed).every(Boolean))return;selection.active=false;loadout.hidden=true;time=0;ambientTime=0;lastTick=performance.now();paused=false;view.focus({preventScroll:true});}
 function resetChapter(){chapter.active=false;chapter.phase=null;chapter.victim=null;chapter.at=0;chapter.avengerDown=false;chapter.seated={aleks:false,sandra:false};chapter.used=[];chapter.quiz={open:false,round:0,cursor:{aleks:0,sandra:0},answers:[{aleks:null,sandra:null},{aleks:null,sandra:null}],ink:{aleks:null,sandra:null},complete:false,animal:null};quizPanel.hidden=true;leaveQuiz.hidden=true;orbit.yaw=0;orbit.pitch=.12;orbit.zoom=1;orbit.drag=null;}
 function gesture(who,self=false){
  if(!play.active||dialogue.active||act.busy||!detail.hidden||selection.active||chapter.quiz.open||game.phase==='complete')return;
  const p=play.players.find(p=>p.id===who),other=play.players.find(p=>p.id!==who);if(!p||chapter.seated[who]||ambientTime-(p.lastSlap??-10)<.75)return;
  const victim=!self&&Math.hypot(p.x-other.x,p.z-other.z)<1.45?other:p;p.lastSlap=ambientTime;p.gesture={self:victim===p,at:ambientTime};victim.reactionAt=ambientTime;
  if(victim!==p)p.heading=Math.atan2(victim.x-p.x,victim.z-p.z);comicSound();
 }
 function comicSound(){if(!audio||audio.state!=='running')return;const o=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;o.type='triangle';o.frequency.setValueAtTime(190,now);o.frequency.exponentialRampToValueAtTime(65,now+.09);gain.gain.setValueAtTime(.035,now);gain.gain.exponentialRampToValueAtTime(.001,now+.12);o.connect(gain).connect(audio.destination);o.start(now);o.stop(now+.13);o.onended=()=>{o.disconnect();gain.disconnect()};}
 function beginActTwo(){
  if(chapter.active||!['gabrys','weronika','boris'].includes(act.victim))return;chapter.active=true;chapter.victim=act.victim;chapter.phase='storm';chapter.at=ambientTime;play.objective=null;play.stage='judgment';clearMovement();
  cutscene('cemetery',4.5,()=>{chapter.phase='tom';const name={gabrys:'Gabrysia',weronika:'Weronikę',boris:'Borysa'}[chapter.victim];actConversation([['Tom',`Jak śmiałeś zabić ${name}?!`],['Tom',`Powinieneś poświęcić całego siebie. Być mężny. Być dorosły. A ty zabiłeś ${name}.`]],null,()=>{chapter.phase='lightning';chapter.at=ambientTime;stormSound();cutscene('cemetery',2,()=>{chapter.phase='fire';chapter.at=ambientTime;actConversation([['Mściciel','Co jest, kurwa?!']],null,()=>{chapter.avengerDown=true;chapter.phase='blackout';chapter.at=ambientTime;stormSound();cutscene('cemetery',1.4,()=>actConversation([['Aleks','Sandro… chyba to nasz ostatni moment.'],['Sandra','Aleks, podłoga… ziemia pod nami pęka!']],null,()=>{chapter.phase='collapse';chapter.at=ambientTime;cutscene('cemetery',3,enterCatacombs);}));});});});});
 }
 function stormSound(){if(!audio||audio.state!=='running')return;const now=audio.currentTime,o=audio.createOscillator(),gain=audio.createGain();o.type='sawtooth';o.frequency.setValueAtTime(70,now);o.frequency.exponentialRampToValueAtTime(23,now+.7);gain.gain.setValueAtTime(.035,now);gain.gain.exponentialRampToValueAtTime(.001,now+.9);o.connect(gain).connect(audio.destination);o.start(now);o.stop(now+1);o.onended=()=>{o.disconnect();gain.disconnect()};}
 function enterCatacombs(){
  chapter.phase='room';chapter.at=ambientTime;play.space='catacombs';actScene('catacombs');play.camera=null;play.npcs=[];play.avenger=null;orbit.yaw=0;orbit.pitch=.2;orbit.zoom=1;
  for(const [i,p] of play.players.entries()){p.x=i?.8:-.8;p.z=1.7;p.heading=Math.PI;p.moving=false;}
  actConversation([['Sandra','Żyjemy… Co to za katakumby?'],['Aleks','Goon Room. Dwa krzesła i dwie kartki. To chyba dla nas.'],['Sandra','Usiądźmy przy swoich kartkach. Zaufanie zaznaczamy osobno. Zwierzę musimy wybrać wspólnie.']],null,()=>setObjective('seats'));
 }
 function requestSeat(){
  const candidates=play.players.filter(p=>!chapter.seated[p.id]&&Math.hypot(p.x-(p.id==='aleks'?-2:2),p.z+6.4)<1.15);
  if(candidates.length){for(const p of candidates){chapter.seated[p.id]=true;p.x=p.id==='aleks'?-2:2;p.z=-6.4;p.heading=Math.PI;p.moving=false;}clearMovement();if(Object.values(chapter.seated).every(Boolean))openQuiz();return;}
  const seated=play.players.filter(p=>chapter.seated[p.id]);if(seated.length){for(const p of seated){chapter.seated[p.id]=false;p.z=-5.55;}clearMovement();return;}
  actConversation([['Sandra',chapter.quiz.complete?'Odpowiedzi już zapisane. Możemy rozejrzeć się po sali.':'Moje krzesło jest po prawej, twoje po lewej. Podejdźmy od strony wejścia i usiądźmy.']]);
 }
 function openQuiz(){
  clearMovement();chapter.quiz.open=true;quizPanel.hidden=false;play.objective='quiz';game.phase='quiz';play.stage='quiz';
  jCaptureAnimalCheckpoint();for(const who of ['aleks','sandra'])chapter.quiz.ink[who]=selection.bag[who]?.id==='pen'?'pen':'red';renderQuiz();(chapter.quiz.complete?leaveQuiz:quizPanel.querySelector('button:not(:disabled)'))?.focus();saveCheckpoint();
 }
 function quizOptions(){return chapter.quiz.round===0?['Tak','Nie']:['Chrupek','Lila','Arena','wykres ETF, giełda, Bitcoin, short'];}
 function renderQuiz(){
  const quiz=chapter.quiz,options=quizOptions();for(const who of ['aleks','sandra']){const pane=quizPanes[who],answer=quiz.answers[quiz.round][who];pane.dataset.ink=quiz.ink[who];pane.querySelector('.ink-method').textContent=quiz.ink[who]==='pen'?'[ DŁUGOPIS / ATRAMENT ]':'[ CZERWONY ŚLAD NA PAPIERZE ]';pane.querySelector('.quiz-question').textContent=quiz.round===0?(who==='aleks'?'Czy ufasz Sandrze?':'Czy ufasz Aleksowi?'):'Kto jest najlepszym zwierzęciem?';const list=pane.querySelector('.quiz-options');list.replaceChildren();
   const round=quiz.round;options.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.dataset.answer=String(i);b.dataset.owner=who;b.disabled=quiz.complete||(quiz.round===0&&answer!==null);b.setAttribute('aria-pressed',String(answer===i));b.classList.toggle('cursor',quiz.cursor[who]===i&&!b.disabled);b.textContent=`[${answer===i?'X':' '}] ${text}`;b.onclick=()=>{if(chapter.quiz===quiz&&quiz.round===round)answerQuiz(who,i);};list.append(b);});pane.querySelector('.quiz-status').textContent=quiz.complete?'Wspólny wybór zapisany.':quiz.round===1?'Wybierzcie to samo zwierzę. Przy rozbieżności możecie zmienić odpowiedź.':answer===null?'Zaznacz jedną odpowiedź.':'Zapisano. Czekasz na drugą osobę.';
  }leaveQuiz.hidden=!quiz.complete;
 }
 function answerQuiz(who,index){
  const quiz=chapter.quiz;if(!quiz.open||quiz.complete||(quiz.round===0&&quiz.answers[quiz.round][who]!==null)||index<0||index>=quizOptions().length)return;quiz.answers[quiz.round][who]=index;if(selection.bag[who]?.id==='pen')selection.bag[who].used=true;play.players.find(p=>p.id===who).writingAt=ambientTime;renderQuiz();
  if(Object.values(quiz.answers[quiz.round]).some(a=>a===null))return;
  if(quiz.round===0){quiz.open=false;quizPanel.hidden=true;const a=quiz.answers[0],lines=[['Sandra',a.aleks===1?'Ty szmato! Ty szmato!':'OK. Tom, Tom, Tom.'],['Aleks',a.sandra===1?'Aha, serio?':'Sandra, jakbyś umarła, to po trzech sekundach bym o tobie zapomniał.']];actConversation(lines,null,()=>{quiz.round=1;quiz.cursor={aleks:0,sandra:0};openQuiz();});}
  else{const a=quiz.answers[1];if(a.aleks!==a.sandra){game.phase='quiz-agreement';saveCheckpoint();return;}quiz.animal=['chrupek','lila','arena','etf'][a.aleks];quiz.complete=true;chapter.phase='waiting';game.phase='awaiting-next-act';replay.tabIndex=0;replay.classList.add('visible');renderQuiz();leaveQuiz.focus();saveCheckpoint();}
 }
 function useItem(who){
  const slot=selection.bag[who],p=play.players.find(p=>p.id===who);if(!slot||!p)return;const item=itemCatalog[slot.id];
  if(slot.id==='pen'){actConversation([[who==='aleks'?'Aleks':'Sandra','Długopis zostawiam na odpowiedzi. Przynajmniej z tym będzie normalnie.']]);return;}
  if(play.space!=='catacombs'||Math.hypot(p.x-item.station.x,p.z-item.station.z)>1.65){actConversation([[who==='aleks'?'Aleks':'Sandra',play.space==='catacombs'?item.place:'Jeszcze nie widzę tu miejsca na ten przedmiot. Zabiorę go dalej.']]);return;}
  if(slot.used){actConversation([[who==='aleks'?'Aleks':'Sandra','Już go tutaj użyliśmy.']]);return;}slot.used=true;chapter.used.push({who,id:slot.id});comicSound();
  const lines={rem:'Rem układa się na posłaniu. Ktoś tutaj wreszcie umie odpoczywać.',paper:'Kartka pasuje w szczelinę. Kamień odpowiada: gaźnik, gaźnik, gaźnik.',food:'Karma znika z miski. W ciemności coś merda ogonem.',fork:'Widelec uderza w kratę. Najgorszy kamerton świata.',gouda:'Ser znika w norze. Zostaje tylko zadowolone piszczenie.',tom:'Tom siedzi w niszy. Tom, Tom, Tom.'};actConversation([[who==='aleks'?'Aleks':'Sandra',lines[slot.id]]]);
 }
 function catPrompt(){
  for(const p of play.players)if(!chapter.seated[p.id]&&Math.hypot(p.x-(p.id==='aleks'?-2:2),p.z+6.4)<1.15)return `[E / ENTER] ${p.id==='aleks'?'Aleks':'Sandra'} — usiądź`;
  if(Object.values(chapter.seated).some(Boolean))return '[ E / ENTER ] Wstań / poczekaj na drugą osobę';
  for(const p of play.players){const slot=selection.bag[p.id],item=slot&&itemCatalog[slot.id];if(item?.station&&!slot.used&&Math.hypot(p.x-item.station.x,p.z-item.station.z)<1.65)return `[${p.id==='aleks'?'X':'.'}] Użyj: ${item.name}`;}return '';
 }
 function drawTom(x,y,z,scale=1){
  const at=(a,b,c=0)=>v(x+a*scale,y+b*scale,z+c*scale),s=scale;
  meshEllipsoid(at(0,.7),.90*s,.90*s,.54*s,[130,170,145]);meshEllipsoid(at(0,.62,.31),.67*s,.72*s,.34*s,[180,194,159]);meshEllipsoid(at(0,1.65,.23),.52*s,.43*s,.40*s,[182,200,171]);
  for(const side of [-1,1]){meshEllipsoid(at(side*.83,.65,.04),.37*s,.24*s,.28*s,[113,156,137]);meshEllipsoid(at(side*.46,-.04,.12),.30*s,.19*s,.34*s,[112,151,134]);meshEllipsoid(at(side*.19,1.76,.59),.07*s,.075*s,.045*s,[23,39,38]);meshLimb(at(side*.08,1.48,.60),at(side*.27,1.56,.58),.014*s,.014*s,[50,79,66],4);}
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2;meshLimb(at(Math.cos(a)*.47,.65+Math.sin(a)*.48,.64),at(Math.cos(a)*.25,.65+Math.sin(a)*.26,.67),.018*s,.018*s,[76,117,91],4);}
 }
 function drawStorm(){geometryDrain();
  if(!chapter.active||play.space!=='world')return;const c=partyCenter(),elapsed=ambientTime-chapter.at,phase=chapter.phase;
  if(!['storm','tom','lightning','fire','blackout','collapse'].includes(phase))return;
  if(phase!=='blackout'){
   for(let i=0;i<115;i++){const x=c.x+(hash(i+12)-.5)*24,z=c.z+(hash(i+90)-.5)*28,y=8-((ambientTime*7+hash(i)*10)%10),p=proj(v(x,y,z)),q=proj(v(x+.12,y-.43,z));if(!p||!q)continue;g.strokeStyle='#8095a6';g.lineWidth=.85;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();}
   for(let i=0;i<13;i++){const y=5+i*.3,rad=1.0+i*.21,center=proj(v(c.x+Math.sin(ambientTime*.5+i)*.3,y,c.z-11));if(!center)continue;g.strokeStyle=i%2?'#364354':'#4b5567';g.lineWidth=Math.max(2,center.s*.18);g.beginPath();g.ellipse(center.x,center.y,center.s*rad,center.s*.23,Math.sin(ambientTime+i)*.1,0,Math.PI*2);g.stroke();}
   for(let i=0;i<15;i++){const x=c.x+(hash(i+41)-.5)*17,z=c.z-3-hash(i+32)*18,y=10-((ambientTime*2.8+i*.9)%12),p=proj(v(x,y,z));if(!p)continue;const r=p.s*(.28+hash(i)*.28);g.fillStyle='#b57136';g.beginPath();g.ellipse(p.x,p.y,r,r*.88,Math.sin(ambientTime+i)*.4,0,Math.PI*2);g.fill();g.fillStyle='#1b2524';g.fillRect(p.x-r*.5,p.y-r*.15,r*.23,r*.2);g.fillRect(p.x+r*.25,p.y-r*.15,r*.23,r*.2);}
   drawTom(c.x-3.6,phase==='storm'?mix(10,1.8,smooth(0,4.5,elapsed)):1.8,c.z-5,3.2);flushMesh();
  }
  if(['fire','blackout','collapse'].includes(phase))for(let i=0;i<20;i++){const a=i/20*Math.PI*2,root=v(c.x+Math.cos(a)*3.8,-1.48,c.z+Math.sin(a)*3.8),p=proj(root),q=proj(add(root,v(Math.sin(ambientTime*6+i)*.25,1.0+Math.sin(ambientTime*8+i)*.5,0)));if(!p||!q)continue;g.fillStyle=i%2?'#d88b38':'#e7b85b';g.beginPath();g.moveTo(p.x-p.s*.18,p.y);g.lineTo(q.x,q.y);g.lineTo(p.x+p.s*.18,p.y);g.fill();}
  if(phase==='lightning'||phase==='blackout'){
   if(Math.floor(elapsed*10)%4===0){g.fillStyle='rgba(198,217,229,.65)';g.fillRect(0,0,W,H);}g.strokeStyle='#ebede0';g.lineWidth=3;g.beginPath();g.moveTo(W*.55,0);g.lineTo(W*.46,H*.2);g.lineTo(W*.53,H*.22);g.lineTo(W*.43,H*.57);g.stroke();
  }
  if(phase==='collapse'){g.fillStyle=`rgba(0,0,0,${smooth(1.5,3,elapsed)})`;g.fillRect(0,0,W,H);}
 }
 function drawCollapseFloor(){
  const c=partyCenter(),radius=3.8*smooth(0,1.4,ambientTime-chapter.at),points=[];
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2,r=radius*(.85+hash(i+181)*.25);points.push(v(c.x+Math.cos(a)*r,-1.475,c.z+Math.sin(a)*r));}
  groundPolygon(points,'#000103','#5b6268');
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2,p=proj(v(c.x+Math.cos(a)*radius,-1.47,c.z+Math.sin(a)*radius)),q=proj(v(c.x+Math.cos(a+.06)*(radius+1.5),-1.47,c.z+Math.sin(a+.06)*(radius+1.5)));if(!p||!q)continue;g.strokeStyle='#071018';g.lineWidth=3;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();}
 }
 function drawCatacombs(){
  setupPlayCamera();g.fillStyle='#060c12';g.fillRect(0,0,W,H);
  for(let row=0;row<20;row++)for(let col=0;col<12;col++){const x=-9+col*1.5,z=4-row*.9;groundPolygon([v(x,-1.5,z),v(x+1.44,-1.5,z),v(x+1.42,-1.5,z-.84),v(x,-1.5,z-.81)],(row+col)%3?'#243039':'#303b43','#101b23');}
  meshBox(0,-1.5,-13.2,18,6,.35,[71,88,99]);meshBox(-9,-1.5,-4.5,.35,6,18,[63,82,95]);meshBox(9,-1.5,-4.5,.35,6,18,[63,82,95]);
  flushMesh();
  for(let row=0;row<9;row++){const y=-1.45+row*.60;natureStroke(v(-8.9,y,-12.99),v(8.9,y,-12.99),.014,'#243b48');for(let col=0;col<10;col++){const x=-8.8+col*1.9+(row%2)*.9;natureStroke(v(x,y,-12.99),v(x,y+.56,-12.99),.012,'#293e49');}}
  for(const z of [-11,-5,1]){for(const side of [-1,1])meshBox(side*6.5,-1.5,z,.55,4,.6,[101,116,122]);for(let i=0;i<12;i++){const a=Math.PI*i/12,b=Math.PI*(i+1)/12;meshLimb(v(Math.cos(a)*6.5,2.4+Math.sin(a)*2.3,z),v(Math.cos(b)*6.5,2.4+Math.sin(b)*2.3,z),.19,.19,[92,110,119],5);}}
  for(const [i,who] of ['aleks','sandra'].entries()){const x=i?2:-2;
   meshBox(x,-.78,-6.4,1.0,.16,.86,[116,126,125]);meshBox(x,-.75,-5.96,1,.95,.13,[96,112,119]);for(const side of [-1,1])meshBox(x+side*.38,-1.5,-6.4,.09,.8,.65,[81,98,108]);
   meshBox(x,-.58,-8.0,2.35,.17,1.6,[132,137,127]);for(const side of [-1,1])meshBox(x+side*.9,-1.5,-8,.12,.95,1.25,[84,99,106]);meshBox(x,-.399,-8.0,1.55,.012,1.22,[213,210,187]);
   if(chapter.quiz.ink[who]==='red')meshEllipsoid(v(x+.58,-.38,-7.7),.10,.008,.08,[110,33,44]);else if(selection.bag[who]?.id==='pen')meshLimb(v(x+.55,-.37,-7.5),v(x+.72,-.37,-8.3),.018,.018,[55,77,113],5);
  }
  for(const [id,item] of Object.entries(itemCatalog)){if(!item.station)continue;const {x,z}=item.station,used=chapter.used.some(e=>e.id===id);meshBox(x,-1.48,z,1,.55,.85,used?[99,135,121]:[68,88,104]);if(id==='tom'&&used)drawTom(x,-.9,z,.36);if(id==='food'){meshEllipsoid(v(x,-.89,z),.28,.07,.22,[119,139,146]);if(used){meshEllipsoid(v(x+.3,-.35,z),.15,.22,.12,[139,153,154]);meshEllipsoid(v(x+.3,-.15,z+.12),.12,.10,.12,[153,163,163]);}}if(id==='gouda'&&used)meshEllipsoid(v(x,-.85,z),.15,.06,.08,[147,142,121]);}
  meshEllipsoid(v(-6,-.85,-4),.52,.13,.34,[140,158,170]);meshBox(-6,-.94,-10,1.2,1.25,.14,[116,130,132]);meshBox(0,-1.48,-11.3,.65,.35,.1,[12,21,27]);
  for(let i=0;i<6;i++)meshLimb(v(5.5+i*.2,-1.1,-9.3),v(5.5+i*.2,1,-9.3),.025,.025,[118,138,149],4);
  jRoomProps();for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();
 }
 function tableGlyph(char,x,y,z,width,height,color){const a=proj(v(x,y,z)),b=proj(v(x+width,y,z)),c=proj(v(x,y,z+height));if(!a||!b||!c)return;const sx=view.width/W,sy=view.height/H;out.save();out.transform((b.x-a.x)*sx/10,(b.y-a.y)*sy/10,(c.x-a.x)*sx/16,(c.y-a.y)*sy/16,a.x*sx,a.y*sy);out.font="16px 'Courier New',monospace";out.fillStyle=color;out.textBaseline='top';out.fillText(char,0,0);out.restore();}
 function drawCatacombTypography(){
  const sign='GOON ROOM';[...sign].forEach((ch,i)=>planeGlyph(ch,-1.35+i*.34,1.8,-12.99,.34,.42,'#bfc9c3'));
  for(const [index,who] of ['aleks','sandra'].entries()){const x=index?2:-2,lines=[who.toUpperCase(),chapter.quiz.round===0?(who==='aleks'?'UFASZ SANDRZE?':'UFASZ ALEKSOWI?'):'NAJLEPSZE ZWIERZE?',...quizOptions().map((s,i)=>`[${chapter.quiz.answers[chapter.quiz.round][who]===i?'X':' '}] ${s}`)].flatMap(line=>wrapEngraving(line,25));lines.forEach((line,row)=>[...line].forEach((ch,i)=>tableGlyph(ch,x-.7+i*.055,-.376,-8.5+row*.13,.055,.09,chapter.quiz.ink[who]==='red'?'#882f3a':'#364963')));}
  if(chapter.used.some(e=>e.id==='paper'))for(let row=0;row<8;row++)[...'gaźnik gaźnik'].forEach((ch,i)=>planeGlyph(ch,-6.5+i*.08,.13-row*.12,-9.92,.08,.1,'#c9d5ce'));
  if(chapter.used.some(e=>e.id==='rem'))REM_ASCII.split('\n').forEach((line,row)=>[...line].forEach((ch,i)=>{if(ch!==' ')planeGlyph(ch,-6.6+i*.025,.65-row*.036,-3.9,.025,.036,'#b8d2df')}));
 }
 function chapterSnapshot(){return {active:chapter.active,phase:chapter.phase,victim:chapter.victim,seated:{...chapter.seated},quiz:JSON.parse(JSON.stringify(chapter.quiz)),used:chapter.used.map(x=>({...x})),inventory:JSON.parse(JSON.stringify(selection.bag)),loadout:selection.active};}
 window.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.altKey||e.metaKey)return;
  if(selection.active){let who=null,direction=0;if(['KeyW','KeyA','KeyS','KeyD'].includes(e.code)){who='aleks';direction=['KeyW','KeyA'].includes(e.code)?-1:1;}if(['ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(e.code)){who='sandra';direction=['ArrowUp','ArrowLeft'].includes(e.code)?-1:1;}if(who&&!e.repeat){selection.index[who]=(selection.index[who]+direction+choicesFor(who).length)%choicesFor(who).length;selection.confirmed[who]=false;renderSelection();}if(!e.repeat&&e.code==='KeyF')confirmItem('aleks');if(!e.repeat&&e.code==='KeyL')confirmItem('sandra');if(!e.repeat&&e.code==='Enter'){if(document.activeElement===resumeCheckpointButton)resumeCheckpointButton.click();else beginProlog();}if(who||['KeyF','KeyL','Enter'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();}return;}
  if(chapter.quiz.open){const q=chapter.quiz;let who=null,direction=0;if(['KeyW','KeyS'].includes(e.code)){who='aleks';direction=e.code==='KeyW'?-1:1;}if(['ArrowUp','ArrowDown'].includes(e.code)){who='sandra';direction=e.code==='ArrowUp'?-1:1;}if(who&&!e.repeat&&(q.round===1||q.answers[q.round][who]===null)&&!q.complete){q.cursor[who]=(q.cursor[who]+direction+quizOptions().length)%quizOptions().length;renderQuiz();}if(!e.repeat&&e.code==='KeyF')answerQuiz('aleks',q.cursor.aleks);if(!e.repeat&&e.code==='KeyL')answerQuiz('sandra',q.cursor.sandra);if(who||['KeyF','KeyL'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();}return;}
  if(!play.active||dialogue.active||act.busy||!detail.hidden||game.phase==='complete')return;
  if(!e.repeat&&['KeyF','KeyG','KeyL','KeyK'].includes(e.code)){e.preventDefault();gesture(['KeyF','KeyG'].includes(e.code)?'aleks':'sandra',['KeyG','KeyK'].includes(e.code));}
  if(!e.repeat&&['KeyX','Period'].includes(e.code)){e.preventDefault();useItem(e.code==='KeyX'?'aleks':'sandra');}
  if(e.code==='KeyQ'||e.code==='KeyC'){e.preventDefault();play.keys.add(e.code);}
  if(e.code==='KeyV'||e.code==='Home'){e.preventDefault();orbit.yaw=0;orbit.pitch=.12;orbit.zoom=1;}
 },true);
 view.addEventListener('contextmenu',e=>e.preventDefault());view.addEventListener('pointerdown',e=>{if(e.button===2&&play.active&&!dialogue.active&&!chapter.quiz.open&&!act.busy){orbit.drag={x:e.clientX,y:e.clientY};view.setPointerCapture(e.pointerId);e.preventDefault();}});
 view.addEventListener('pointermove',e=>{if(!orbit.drag)return;orbit.yaw+=(e.clientX-orbit.drag.x)*.006;orbit.pitch=clamp(orbit.pitch+(e.clientY-orbit.drag.y)*.004,.04,.65);orbit.drag={x:e.clientX,y:e.clientY};});
 window.addEventListener('pointerup',()=>orbit.drag=null);window.addEventListener('blur',()=>orbit.drag=null);view.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey||!play.active||dialogue.active||chapter.quiz.open||act.busy)return;e.preventDefault();orbit.zoom=clamp(orbit.zoom+e.deltaY*.001,.72,1.55);},{passive:false});
 resetSelection();

 // Browser-native voice and quiet synthesized wildlife; no external assets.
 let speechTimer=null;
 let audio=null,audioEnabled=false,speechActive=false,spoken=false,laughed=false,lastCrow=-1,utterance=null;
 const audioEvents=[];
 function speak(text,laugh=false,character='Dynia'){
  if(!audioEnabled||jSettings.muted||!('speechSynthesis' in window))return;
  clearTimeout(speechTimer);speechSynthesis.cancel();utterance=new SpeechSynthesisUtterance(text);utterance.lang='pl-PL';
  const voices=speechSynthesis.getVoices().filter(v=>v.lang.startsWith('pl'));
  const female=voices.find(v=>/Paulina|Zofia|Zira|female/i.test(v.name))||voices[1]||voices[0];
  const male=voices.find(v=>/Adam|Pawel|Paweł|Marek|David|male/i.test(v.name)&&!/female/i.test(v.name))||voices.find(v=>v!==female)||voices[0];
  utterance.voice=(['Sandra','Weronika'].includes(character)?female:male)||null;
  utterance.rate=character==='Nieznajomy'?.65:character==='Sandra'?.98:character==='Aleks'?.94:laugh?.72:.93;utterance.pitch=character==='Nieznajomy'?.67:character==='Sandra'?1.08:character==='Aleks'?.86:laugh?.48:.62;utterance.volume=character==='Nieznajomy'?.53:.78;
  const voiceLine=utterance;
  if(character==='Nieznajomy'&&text.startsWith('Aaaaa')){utterance.rate=.88;utterance.pitch=.92;utterance.volume=.94;}
  if(character==='Sandra'&&text.startsWith('Ty szmato')){utterance.rate=1.16;utterance.pitch=1.22;utterance.volume=.94;}
  if(character==='Tom'){utterance.rate=.80;utterance.pitch=.54;utterance.volume=.88;}
  utterance.onstart=()=>{if(utterance===voiceLine)speechActive=true;audioEvents.push(character+':voice-start')};utterance.onend=()=>{if(utterance===voiceLine)speechActive=false;audioEvents.push(character+':voice-end')};utterance.onerror=e=>{if(utterance===voiceLine)speechActive=false;audioEvents.push(['interrupted','canceled'].includes(e.error)?character+':voice-skipped':character+':voice-error:'+e.error)};
  speechTimer=setTimeout(()=>{if(utterance===voiceLine)speechSynthesis.speak(voiceLine)},75);audioEvents.push(character+':'+(laugh?'laugh':'speech')+':'+(utterance.voice?.name||'default')); 
 }
 function crow(){
  if(!audio||audio.state!=='running')return;
  const now=audio.currentTime,noise=audio.createBuffer(1,audio.sampleRate*.46,audio.sampleRate),data=noise.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.5;
  const source=audio.createBufferSource();source.buffer=noise;
  const band=audio.createBiquadFilter();band.type='bandpass';band.frequency.setValueAtTime(1250,now);band.frequency.exponentialRampToValueAtTime(670,now+.4);band.Q.value=3.5;
  const gain=audio.createGain();gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.075,now+.045);gain.gain.exponentialRampToValueAtTime(.001,now+.43);
  source.connect(band).connect(gain).connect(audio.destination);source.start(now);source.stop(now+.46);
  const tone=audio.createOscillator(),voice=audio.createGain();tone.type='sawtooth';tone.frequency.setValueAtTime(310,now);tone.frequency.exponentialRampToValueAtTime(155,now+.4);
  voice.gain.setValueAtTime(.012,now);voice.gain.exponentialRampToValueAtTime(.001,now+.4);tone.connect(voice).connect(audio.destination);tone.start(now);tone.stop(now+.43);source.onended=()=>{source.disconnect();band.disconnect();gain.disconnect();tone.disconnect();voice.disconnect()};audioEvents.push('crow');
 }
 function soundTick(t){
  if(!audioEnabled)return;
  if(act.scene==='cemetery'&&t>=10&&t<23&&!spoken){spoken=true;speak('Aleks! Sandra! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!');}
  if(act.scene==='cemetery'&&t>=23&&t<27&&!laughed){laughed=true;speak('Ha! Ha, ha, ha! Ha, ha!',true);}
  const event=Math.floor((t-35)/8);
  if(t>=35&&event!==lastCrow){lastCrow=event;crow();}
 }
 async function enableAudio(resetIntro=true){if(jSettings.muted)return;
  if(audioEnabled){if(audio?.state==='suspended')await audio.resume();return;}
  audioEnabled=true;const Context=window.AudioContext||window.webkitAudioContext;if(Context){audio=new Context();await audio.resume();}
  if(dialogue.active&&!next.hidden){next.textContent='[ENTER] Dalej';const line=dialogue.lines[dialogue.index];speak(line[1],false,line[0]);}
  if(resetIntro&&time>=10&&time<33){started=performance.now()-9.7*1000;time=9.7;spoken=false;laughed=false;}
 }
 view.addEventListener('pointerdown',()=>enableAudio());
 window.addEventListener('keydown',e=>{if(play.active||dialogue.active||!detail.hidden)return;if(e.key===' '||e.key==='Enter'){e.preventDefault();enableAudio();}});
 if('speechSynthesis' in window)speechSynthesis.getVoices();
 view.tabIndex=0;view.title='Kliknij, aby włączyć głos dyni i dźwięki';
 const frameIntervals=[];let previousPresented=0;
 let time=0,started=performance.now(),last=0,lastTick=performance.now(),paused=false;
 function size(){
  dpr=Math.min(1.5,window.devicePixelRatio||1);
  view.width=Math.round(innerWidth*dpr);view.height=Math.round(innerHeight*dpr);
  // Higher resolution keeps glyphs detailed, without becoming micro-noise.
  C=Math.round(clamp(innerWidth/6,80,280));R=Math.round(clamp(innerHeight/(innerWidth/C/.60),38,120));
  W=Math.round(Math.min(jResolution(!play.active),Math.max(440,C*(play.active?3.4:4))));H=Math.min(1300,Math.round(W*view.height/view.width));
  source.width=W;source.height=H;
  ch=view.height/R;cw=view.width/C;
  sampleCanvas.width=C*2;sampleCanvas.height=R*2;glyphMask.width=view.width;glyphMask.height=view.height;colorCanvas.width=C;colorCanvas.height=R;colorImage=colorContext.createImageData(C,R);
  out.imageSmoothingEnabled=false;
 }
 function frame(now){
  if(document.hidden||selection.active){lastTick=now;requestAnimationFrame(frame);return;}
  const delta=clamp((now-lastTick)/1000,0,.15);lastTick=now;
  if(!paused){ambientTime+=delta;if(play.active){const steps=Math.max(1,Math.ceil(delta/.016));for(let i=0;i<steps;i++)updatePlay(delta/steps);}else if(!dialogue.active&&!act.busy&&game.phase!=='complete')time+=delta;}
  if(!paused&&now-last>=1000/(jSettings.quality==='low'?30:60)){const renderStart=performance.now();try{actTick();if(!act.busy&&act.scene==='cemetery')storyTick();soundTick(time);rasterScene(time);asciiFrame(time);drawWorldTypography(time);jSharp();jBudget(performance.now()-renderStart);if(previousPresented)frameIntervals.push(now-previousPresented);if(frameIntervals.length>300)frameIntervals.shift();previousPresented=now;}catch(e){console.error('Render NOCTURNE:',e);paused=true}last=now-((now-last)%(1000/(jSettings.quality==='low'?30:60)));}
  requestAnimationFrame(frame);
 }
 replay.onclick=()=>{jReset();clearCheckpoint();replay.tabIndex=-1;resetPlay();resetChapter();resetSelection();size();resetAct();detail.hidden=true;closeDialogue();Object.assign(game,{phase:'intro',target:null,visited:false,bodySeen:false,arrival:false,warningSeen:false});ambientTime=0;frameIntervals.length=0;previousPresented=0;lastTick=performance.now();if('speechSynthesis' in window)speechSynthesis.cancel();speechActive=false;spoken=false;laughed=false;lastCrow=-1;started=performance.now();time=0;paused=false;pumpkinCache=null;replay.classList.remove('visible')};
 document.addEventListener('visibilitychange',()=>{if(document.hidden){clearMovement();if(audio)audio.suspend();if('speechSynthesis' in window)speechSynthesis.pause();}else{lastTick=performance.now();if('speechSynthesis' in window&&!paused&&!jSettings.muted)speechSynthesis.resume();if(audio&&!paused&&!jSettings.muted)audio.resume();}});
 window.addEventListener('resize',size,{passive:true});window.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){mouseX=(e.clientX/window.innerWidth-.5)*2;mouseY=(e.clientY/window.innerHeight-.5)*2}},{passive:true});window.addEventListener('keydown',e=>{if((e.key==='r'||e.key==='R')&&!e.repeat&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&detail.hidden)replay.click()});
 window.__NOCTURNE={startPlay:(items={aleks:'pen',sandra:'pen'})=>{replay.click();for(const who of ['aleks','sandra']){const id=choicesFor(who).includes(items[who])?items[who]:'pen';selection.bag[who]={id,used:false};selection.confirmed[who]=true;}selection.active=false;loadout.hidden=true;time=33;startExploration();},playState:()=>({active:play.active,space:play.space,stage:play.stage,objective:play.objective,players:play.players.map(p=>({...p})),npcs:play.npcs.map(p=>({...p})),avenger:play.avenger?{...play.avenger}:null,keys:[...play.keys],interact:play.interact?{point:play.interact.point,radius:play.interact.radius,label:play.interact.label}:null}),pathTo:(id,x,z)=>findRoute(play.players.find(p=>p.id===id),{x,z}),simulate:(seconds)=>{const n=Math.ceil(seconds/.016);for(let i=0;i<n;i++){ambientTime+=seconds/n;updatePlay(seconds/n);actTick();}lastTick=performance.now();},seek:(s)=>{time=s;ambientTime=s;lastTick=performance.now()},renderAt:(s)=>{paused=true;time=s;ambientTime=s;rasterScene(s);asciiFrame(s);drawWorldTypography(s)},rawAt:(s)=>{rasterScene(s);return source.toDataURL('image/png')},benchmark:(s)=>{let a=performance.now();rasterScene(s);let b=performance.now();asciiFrame(s);return {raster:b-a,ascii:performance.now()-b}},resume:()=>{lastTick=performance.now();paused=false},getTime:()=>time,advanceAct:(s)=>{ambientTime+=s;actTick()},resetPerformance:()=>{frameIntervals.length=0;previousPresented=0},performance:()=>({gpu:!!gpu,intervals:[...frameIntervals],camera:{...cam},grid:[C,R]}),gameState:()=>({...game,act:{...act,pending:!!act.pending},dialogue:dialogue.active,line:dialogue.lines[dialogue.index],destination:game.target?destinations[game.target]:null}),audioState:()=>({enabled:audioEnabled,state:audio?.state,speechActive,events:[...audioEvents]}),testCrow:crow};
 Object.assign(window.__NOCTURNE,{chapterState:chapterSnapshot,inventoryState:()=>JSON.parse(JSON.stringify(selection)),cameraState:()=>({yaw:orbit.yaw,pitch:orbit.pitch,zoom:orbit.zoom}),startChapter:(victim='gabrys',items={aleks:'pen',sandra:'pen'})=>{window.__NOCTURNE.startPlay(items);closeDialogue();movementGuide.hidden=true;game.target=victim;game.visited=true;act.victim=victim;act.ending='punishment';play.players[0].x=-.65;play.players[1].x=.65;for(const p of play.players)p.z=-43.5;play.avenger={id:'avenger',x:0,z:-47,heading:0,walk:0,route:[]};play.stage='victim-ending';beginActTwo();}});
 const J_DIALOGUE={"e1_intro": [["Sandra", "Aleks, chyba naprawdę wygraliśmy."], ["Aleks", "To może w końcu pójdziemy do domu?"], ["Dynia", "Wygraliście?"], ["Sandra", "Pokonaliśmy Toma."], ["Dynia", "Owszem. Ale ja nie powiedziałam, że Tom jest końcem."], ["Aleks", "Ty pierdolona dynio, czemu nas tu wciągnęłaś?!"], ["Dynia", "Ostrzegałam was. Prawdę mówiąc, zawsze ostrzegam."], ["Sandra", "Po co, skoro to pułapka?"], ["Dynia", "Bo strach uruchamia historię. A nadzieja każe w nią wejść."], ["Dynia", "Każda para dostaje wybory. Każda wierzy, że wybiera drogę do domu. Nawet kiedy zabija Toma, nadal gra według moich zasad."], ["Aleks", "To teraz złamię ci tę zasadę."], ["Dynia", "Spróbuj."], ["Dynia", "Ktoś musi leżeć przy drodze. Ktoś musi jeszcze oddychać na krzyżu."], ["Sandra", "Czyje miejsca?"], ["Dynia", "Tych, których spotkaliście na początku."]], "e1_tragedy": [["Aleks", "Sandra?! SANDRA, KURWA, WSTAWAJ!"], ["Sandra", "Aleks… nie pozwól, żeby…"], ["Aleks", "Nie, nie, nie. Patrz na mnie. Sandra!"], ["Aleks", "Mieliśmy stąd wyjść razem."], ["Dynia", "Jedno ciało, żeby wzbudzić strach. Jeden żywy, żeby wzbudzić nadzieję."], ["Aleks", "Ty pierdolona dynio…"], ["Dynia", "Do zobaczenia w następnym rozdziale."]], "e1_newPair": [["Salsa", "Alex, gdzie my w ogóle jesteśmy?"], ["Alex (X)", "Nie wiem. Ale chyba tam jest jakiś cmentarz."], ["Dynia", "Alex! Salsa! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!"], ["Salsa", "Czemu do nas mówi dynia?"], ["Alex (X)", "Nie wiem, kurwa, ale idziemy."], ["Salsa", "Alex… co to jest?"], ["Alex (X)", "Nie dotykaj. Idźmy po pomoc."], ["Alex (X)", "Kurwa, on żyje!"], ["Salsa", "Musimy mu pomóc!"], ["Aleks", "Uciekajcie…"], ["Alex (X)", "Co?"], ["Aleks", "My też… myśleliśmy, że jesteśmy pierwsi…"], ["Aleks", "Umieram!"]], "hospital": [["Gołębie", "ZAMIAUCZ! ZAMIAUCZ!"], ["Sandra", "Za późno! One są wszędzie!"], ["Aleks", "Sandra…? To szpital?"], ["Sandra", "Pamiętam samochód. Wyszliśmy z imprezy… potem światła."], ["Aleks", "A cmentarz? Żółwie? Gołębie?"], ["Sandra", "Śniło mi się dokładnie to samo."], ["Aleks", "To czemu oboje pamiętamy Toma?"]], "e3": [["Tom", "Sandro. Przez całą noc mnie nosiłaś. Nawet kiedy Aleks cię zawiódł."], ["Sandra", "To tylko pluszak."], ["Tom", "A jednak nie oddałaś go ani razu."], ["Tom", "Pamiętasz ziemię? Kto ją na ciebie zasypał?"], ["Tom", "Sama powiedziałaś, że mu nie ufasz."], ["Aleks", "Nie słuchaj go. To jest dokładnie to, czego chce."], ["Tom", "Wybierz: partner, który może cię poświęcić, czy ktoś, kto nigdy nie udawał, że jest dobry."], ["Tom", "Aleks, cały czas mówisz, że mnie uratujesz. A za każdym razem najpierw muszę ratować siebie."], ["Aleks", "Sandra, co ty odpierdalasz?"], ["Sandra", "Wybieram Toma."], ["Aleks", "Przecież przed chwilą byliśmy razem!"], ["Tom", "To nie ja cię zdradziłem, Aleks."], ["Sandra", "To ja. W końcu coś wybrałam sama."], ["Tom", "Od teraz jesteś panią tej nocy."], ["Sandra", "To otwieraj bramę. Chcę zobaczyć, co jest za nią."], ["Dynia", "Jak miło. Znowu ktoś myśli, że awans oznacza wolność."], ["Sandra", "Co…?"], ["Dynia", "Koniec obsady. Następny obieg."]], "e4": [["Sandra", "Tom. Po co dalej walczyć? Przecież masz wszystko, czego chciałeś."], ["Tom", "Nareszcie ktoś rozsądny."], ["Aleks", "Ty na serio?"], ["Sandra", "Zaufaj mi. Pierwszy raz bez gadania."], ["Tom", "Jak widzicie, władza wymaga nie tylko siły, ale także wizji, cierpliwości i fantastycznej skorupy…"], ["Aleks", "O kurwa, on ma prezentację."], ["Sandra", "Ciii."], ["Sandra", "Teraz albo nigdy."], ["Aleks", "Za całe to zoo, ty żółwiu."], ["Tom", "To było niegrzeczne."], ["Sandra", "Witaj w klubie."], ["Aleks", "Dobra, teraz to już chyba definitywnie."], ["Dynia", "Zabiłeś rolę, nie reżysera."], ["Sandra", "Ty też się zaraz doczekasz."], ["Dynia", "Nie w tej wersji historii."]], "e5": [["Tom", "Lila! Wróć do mnie."], ["Lila", "Nie."], ["Aleks", "Okej. Pies mówi. Zaznaczam w dzienniku."], ["Sandra", "Ona wybrała nas."], ["Tom", "Sprzedałaś mnie za jedzenie."], ["Lila", "Za to, że ktoś nie traktował mnie jak narzędzia."], ["Lila", "Potrafię je utrzymać. Ale kiedy przejdziecie, ktoś musi zostać."], ["Sandra", "To chodź z nami."], ["Lila", "Nie mogę. Ale wy możecie."], ["Aleks", "Nie po to cię karmiliśmy, żeby cię tutaj zostawić."], ["Lila", "Właśnie dlatego was wypuszczę."], ["Sandra", "Lila!"], ["Lila", "Idźcie. Nie pozwólcie, żeby wasza noc zaczęła się od nowa."], ["Aleks", "Nie ma cmentarza."], ["Sandra", "Nie ma dyni."], ["Aleks", "A jej nie ma z nami."], ["Sandra", "Ale jesteśmy tutaj. Dzięki niej."]], "e6": [["Dynia", "Wystarczy, że jedno z was wyjdzie. Drugie zostaje."], ["Aleks", "A czemu mamy ci wierzyć?"], ["Dynia", "Nie musicie. Przecież i tak sobie nie wierzycie."], ["Sandra", "To nie jest takie proste."], ["Dynia", "Kto trzymał łopatę? A kto leżał pod ziemią?"], ["Sandra", "Cały czas mam być tą, która czeka. Tym razem wybieram siebie."], ["Aleks", "Sandra, proszę. Nie rób mi tego."], ["Sandra", "Ty też miałeś kiedyś wybór."], ["Aleks", "Nie musimy tego kończyć w ten sposób."], ["Sandra", "A jednak."], ["Aleks", "Sandra? Gdzie jest ktokolwiek?"], ["Sandra", "Aleks? …Nie. Przecież sama tego chciałam."], ["Dynia", "Wolność to też cena. Miłej ciszy."]], "e6aleks": [["Dynia", "Wystarczy, że jedno z was wyjdzie. Drugie zostaje."], ["Aleks", "A czemu mamy ci wierzyć?"], ["Dynia", "Nie musicie. Przecież i tak sobie nie wierzycie."], ["Sandra", "To nie jest takie proste."], ["Dynia", "Kto trzymał łopatę? A kto leżał pod ziemią?"], ["Aleks", "Przepraszam. Nie dam rady jeszcze raz przez to przejść."], ["Sandra", "Aha. Czyli teraz już nawet nie udajesz, że mnie uratujesz?"], ["Aleks", "Ja… nie mam już siły."], ["Sandra", "Idź. Ale nie mów potem, że zrobiłeś to dla mnie."], ["Aleks", "Sandra? Gdzie jest ktokolwiek?"], ["Dynia", "Wolność to też cena. Miłej ciszy."]], "e6sandra": [["Dynia", "Wystarczy, że jedno z was wyjdzie. Drugie zostaje."], ["Aleks", "A czemu mamy ci wierzyć?"], ["Dynia", "Nie musicie. Przecież i tak sobie nie wierzycie."], ["Sandra", "To nie jest takie proste."], ["Dynia", "Kto trzymał łopatę? A kto leżał pod ziemią?"], ["Sandra", "Cały czas mam być tą, która czeka. Tym razem wybieram siebie."], ["Aleks", "Sandra, proszę. Nie rób mi tego."], ["Sandra", "Ty też miałeś kiedyś wybór."], ["Aleks", "Nie musimy tego kończyć w ten sposób."], ["Sandra", "A jednak."], ["Sandra", "Aleks? …Nie. Przecież sama tego chciałam."], ["Dynia", "Wolność to też cena. Miłej ciszy."]], "e7": [["Sandra", "Aleks. Teraz. Razem."], ["Aleks", "Razem."], ["Dynia", "Aleks! Sandra! Za póź… Nie. Nie! To tak nie miało działać!"], ["Lila", "Nie tym razem."], ["Aleks", "Sandro. Patrz."], ["Sandra", "Słońce?"], ["Aleks", "Pierwszy raz w tej grze wygląda legalnie."], ["Lila", "Możemy iść?"], ["Sandra", "Tym razem wszyscy."]]};
 // Geometry rasterizer: retain the established meshes, projection and art; draw triangles with depth on WebGL2.
 let geometryGPU=null,geometryGPUFailed=false,geometryGPUEnabled=true,geometryFrame=0,geometrySeen=-1,geometryVertices=new Float32Array(16384),geometryDraws=0,geometryDeferred=false;
 function geometryBegin(){geometryFrame++;geometryDraws=0;}
 function geometryInit(){
  if(!geometryGPUEnabled||geometryGPUFailed)return null;if(geometryGPU)return geometryGPU;
  try{
   const canvas=document.createElement('canvas'),gl=canvas.getContext('webgl2',{alpha:true,antialias:false,depth:true,stencil:false,premultipliedAlpha:true,preserveDrawingBuffer:true});if(!gl)throw Error('WebGL2 unavailable');
   const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
   const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,`#version 300 es
    precision highp float;layout(location=0) in vec3 position;layout(location=1) in vec4 color;uniform vec2 size;out vec4 rgba;
    void main(){float z=position.z;float near=.16;float far=240.;vec2 xy=vec2(position.x/size.x*2.-1.,1.-position.y/size.y*2.);gl_Position=vec4(xy*z,((far+near)/(far-near))*z-(2.*far*near/(far-near)),z);rgba=color;}`));
   gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`#version 300 es
    precision mediump float;in vec4 rgba;out vec4 outputColor;void main(){outputColor=vec4(rgba.rgb*rgba.a,rgba.a);}`));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
   gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,28,0);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,4,gl.FLOAT,false,28,12);gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.depthFunc(gl.LEQUAL);gl.clearColor(0,0,0,0);
   canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();geometryGPUFailed=true;});canvas.addEventListener('webglcontextrestored',()=>{geometryGPU=null;geometryGPUFailed=false;geometrySeen=-1;});
   geometryGPU={canvas,gl,buffer,program,size:gl.getUniformLocation(program,'size'),capacity:0};return geometryGPU;
  }catch{geometryGPUFailed=true;return null;}
 }
 function geometryFlush(faces){
  const gpu=geometryInit();if(!gpu)return false;if(!faces.length)return true;const {canvas,gl}=gpu;
  let count=0;for(const f of faces)count+=Math.max(0,f.points.length-2)*21;if(count>geometryVertices.length){let capacity=geometryVertices.length;while(capacity<count)capacity*=2;geometryVertices=new Float32Array(capacity);}
  let cursor=0;for(const f of faces)for(let i=1;i<f.points.length-1;i++)for(const p of [f.points[0],f.points[i],f.points[i+1]]){geometryVertices[cursor++]=p.x;geometryVertices[cursor++]=p.y;geometryVertices[cursor++]=p.z;geometryVertices[cursor++]=f.color[0]/255;geometryVertices[cursor++]=f.color[1]/255;geometryVertices[cursor++]=f.color[2]/255;geometryVertices[cursor++]=f.alpha??1;}
  const resized=canvas.width!==W||canvas.height!==H;if(resized){canvas.width=W;canvas.height=H;gl.viewport(0,0,W,H);}gl.useProgram(gpu.program);gl.uniform2f(gpu.size,W,H);gl.clear(gl.COLOR_BUFFER_BIT|(resized||geometrySeen!==geometryFrame?gl.DEPTH_BUFFER_BIT:0));geometrySeen=geometryFrame;
  gl.bindBuffer(gl.ARRAY_BUFFER,gpu.buffer);if(gpu.capacity<geometryVertices.byteLength){gpu.capacity=geometryVertices.byteLength;gl.bufferData(gl.ARRAY_BUFFER,gpu.capacity,gl.DYNAMIC_DRAW);}gl.bufferSubData(gl.ARRAY_BUFFER,0,geometryVertices.subarray(0,cursor));gl.drawArrays(gl.TRIANGLES,0,cursor/7);g.drawImage(canvas,0,0);geometryDraws++;return true;
 }
 const geometryColors=new Map();
 function geometryColor(fill){let color=geometryColors.get(fill);if(color)return color;if(/^#[0-9a-f]{6}$/i.test(fill))color={rgb:[parseInt(fill.slice(1,3),16),parseInt(fill.slice(3,5),16),parseInt(fill.slice(5,7),16)],alpha:1};else if(/^#[0-9a-f]{3}$/i.test(fill))color={rgb:[...fill.slice(1)].map(x=>parseInt(x+x,16)),alpha:1};else{const m=String(fill).match(/^rgba?\(([^)]+)\)$/);if(m){const v=m[1].split(',').map(Number);if(v.every(Number.isFinite))color={rgb:v.slice(0,3),alpha:v[3]??1};}}if(color)geometryColors.set(fill,color);return color;}
 function geometryFace(points,color,unlit=false){const n=meshFaces.length;meshFace(points,color.rgb);if(meshFaces.length>n){const face=meshFaces.at(-1);face.alpha=color.alpha*g.globalAlpha;if(unlit)face.color=color.rgb;return face;}return null;}
 function geometryLineProjected(a,b,width,color){const length=Math.hypot(b.x-a.x,b.y-a.y);if(length<.05)return;const dx=-(b.y-a.y)/length*width/2,dy=(b.x-a.x)/length*width/2;meshFaces.push({points:[{x:a.x+dx,y:a.y+dy,z:a.z-.0002},{x:b.x+dx,y:b.y+dy,z:b.z-.0002},{x:b.x-dx,y:b.y-dy,z:b.z-.0002},{x:a.x-dx,y:a.y-dy,z:a.z-.0002}],depth:(a.z+b.z)/2,color:color.rgb,alpha:color.alpha*g.globalAlpha});}
 function geometryGround(points,fill,stroke){
  // Ground colors are authored values: a second moon-light factor erased the cobbles.
  // Keep their outlines/cracks in the same batch; raster art is composited after explicit drains.
  if(!geometryInit())return false;const color=geometryColor(fill);if(!color){geometryDrain();return false;}const face=geometryFace(points,color,true);if(face&&stroke){const edge=geometryColor(stroke),ps=face.points;if(edge){let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;for(const p of ps){minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}if(maxX-minX>6||maxY-minY>6)for(let i=0;i<ps.length;i++)geometryLineProjected(ps[i],ps[(i+1)%ps.length],.8,edge);}}return true;
 }
 function geometryStroke(a,b,width,fill){if(!geometryInit())return false;const color=geometryColor(fill);if(!color){geometryDrain();return false;}const pa=proj(a),pb=proj(b);if(!pa||!pb)return true;geometryLineProjected(pa,pb,Math.max(.65,(pa.s+pb.s)*width*.5),color);return true;}
 function geometryDrain(){if(!meshFaces.length)return;const deferred=geometryDeferred;geometryDeferred=false;flushMesh();geometryDeferred=deferred;}

 // V12 campaign extension: the original world/renderer and both local players stay in use.
 const JCONFIG={endingPriority:[3,6,4,7,5,1],bossHP:1200,arenaEvery:300,arenaWindow:60,zooSeconds:60,marketSeconds:90,marketGoal:4e9,duelHits:3,proposal:'Reversible v10 collision priority; E6 empty-world interpretation is provisional.'};
 function jInitial(){return {zone:null,mode:'walk',clock:0,at:0,hp:[100,100],maxHP:[100,100],attackAt:[-10,-10],dodgeAt:[-10,-10],invul:[0,0],specialAt:[-20,-20],weapon:['fists','fists'],armor:['none','none'],mobs:[],hazards:[],projectiles:[],pickups:[],feathers:[],collected:[],debt:false,paid:false,buried:null,sandraSacrificed:false,grudge:false,graveTone:null,insult:null,candle:false,animal:null,lilaTamed:false,lilaDemon:false,chrupek:false,inkDebuff:[false,false],echoes:[],echoRuns:[],echoesRescued:0,ghost:null,zoo:null,seal:false,sealHits:0,phoneClip:0,arenaElapsed:0,arenaChallenge:null,mini:null,boss:null,ritual:null,ending:null,endingShot:0,finished:false,flags:{},used:{}};}
 let journey=jInitial();
 const jHeld=new Set();let jGhostKeys=new Set(),jUIStamp='',jHUDStamp='',jMic=null,jCheckpointAt=0,jScale=1,jFrameCost=0;
 let jSettings={quality:'auto',easy:true,pressure:true,showFPS:false,muted:false,bindings:{KeyW:'KeyW',KeyA:'KeyA',KeyS:'KeyS',KeyD:'KeyD',ArrowUp:'ArrowUp',ArrowDown:'ArrowDown',ArrowLeft:'ArrowLeft',ArrowRight:'ArrowRight',Space:'Space',ShiftRight:'ShiftRight',ShiftLeft:'ShiftLeft',ControlRight:'ControlRight',KeyX:'KeyX',Period:'Period',KeyE:'KeyE',Enter:'Enter'}};
 const jDefaultBindings={...jSettings.bindings};
 function jValidBinding(code){return typeof code==='string'&&/^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Space|Shift(Left|Right)|ControlRight|Period|Comma|Semicolon|Quote|BracketLeft|BracketRight|Numpad[0-9])$/.test(code)&&!['KeyR','KeyF','KeyL','KeyG','KeyK','KeyQ','KeyC','KeyV'].includes(code);}
 function jKeyName(canonical){const code=jSettings.bindings[canonical]||canonical;return {Space:'Spacja',ShiftLeft:'Lewy Shift',ShiftRight:'Prawy Shift',ControlRight:'Prawy Ctrl',ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',Period:'.',Comma:',',Semicolon:';',Quote:"'",BracketLeft:'[',BracketRight:']'}[code]||code.replace(/^Key|^Digit/,'');}
 try{const saved=JSON.parse(localStorage.getItem('halloween.settings.v1'));if(saved&&['auto','low','balanced','high'].includes(saved.quality)){jSettings.quality=saved.quality;for(const key of ['easy','pressure','showFPS','muted'])if(typeof saved[key]==='boolean')jSettings[key]=saved[key];const bindings=Object.fromEntries(Object.entries(jDefaultBindings).map(([key,value])=>[key,saved.bindings?.[key]??value]));if(Object.values(bindings).every(jValidBinding)&&new Set(Object.values(bindings)).size===Object.keys(bindings).length)jSettings.bindings=bindings;}}catch{}

 const jHUD=document.createElement('aside');jHUD.id='campaign-hud';jHUD.hidden=true;jHUD.setAttribute('aria-label','Stan obu postaci');document.body.append(jHUD);
 const jPanel=document.createElement('section');jPanel.id='campaign-panel';jPanel.hidden=true;jPanel.setAttribute('role','dialog');jPanel.setAttribute('aria-label','Zadanie');document.body.append(jPanel);
 const jPause=document.createElement('section');jPause.id='campaign-pause';jPause.hidden=true;jPause.setAttribute('role','dialog');jPause.setAttribute('aria-modal','true');document.body.append(jPause);
 const J_ARMORS={none:'brak pancerza',scarf:'szal',coat:'płaszcz',shell:'skorupa',stone:'kamienny pancerz'};
 const jCSS=document.createElement('style');jCSS.textContent=`#campaign-hud[hidden],#campaign-panel[hidden],#campaign-pause[hidden]{display:none}#campaign-hud{position:fixed;bottom:12px;left:20px;right:20px;display:flex;justify-content:space-between;gap:20px;pointer-events:none;color:#c8d5cf;font:12px/1.5 Consolas,monospace}#campaign-hud>div{padding:8px 12px;background:#080f17e8;border-bottom:1px solid #627e79;max-width:47%}#campaign-hud progress{width:140px;accent-color:#88b7aa;height:8px;margin-right:8px}#campaign-panel{position:fixed;left:50%;bottom:12vh;transform:translateX(-50%);width:min(780px,94vw);max-height:76vh;overflow:auto;background:#09131dee;color:#cbd5ce;padding:20px;border:1px dashed #758a7f;font:15px/1.6 Consolas,monospace;z-index:36}#campaign-panel[data-scene=ritual]{top:20px;bottom:auto;left:20px;transform:none;width:min(540px,70vw);padding:12px 15px}#campaign-panel[data-scene=ritual] pre{font-size:12px;line-height:1.45;margin:5px 0}#campaign-panel[data-scene=ritual] button{font-size:12px;padding:6px;margin:3px}#campaign-panel h2{font:18px Consolas,monospace;margin:0 0 12px;color:#d5d7ba}#campaign-panel button,#campaign-pause button,#campaign-pause select{font:inherit;background:#112420;color:#d6decf;border:1px solid #527267;padding:10px;margin:5px;cursor:pointer}#campaign-panel button:focus-visible,#campaign-pause button:focus-visible{outline:2px solid #e5dbb3}#campaign-panel button[aria-pressed=true]{background:#345345}#campaign-panel button:disabled{opacity:.45;cursor:default}#campaign-panel pre{white-space:pre-wrap;font:inherit;color:#b8d2dc}#campaign-pause{position:fixed;inset:5vh max(20px,calc((100vw - 900px)/2));background:#081119fa;color:#cfdbd5;border:1px solid #65817c;padding:24px;overflow:auto;z-index:60;font:14px/1.6 Consolas,monospace}#campaign-pause .bindings{display:grid;grid-template-columns:1fr 1fr}#campaign-pause label{display:block;padding:4px}#interaction{bottom:88px}#ending-card{position:fixed;inset:0;display:grid;place-content:center;gap:20px;text-align:center;color:#dce3d6;background:#050a10f5;z-index:42;padding:10vw;font:18px/1.8 Consolas,monospace}#ending-card[hidden]{display:none}#ending-card button{font:inherit;background:#13241f;color:#dce3d6;padding:12px;border:1px dashed #82988a;cursor:pointer}`;document.head.append(jCSS);
 const jCredits=document.createElement('section');jCredits.id='ending-card';jCredits.hidden=true;document.body.append(jCredits);
 const jClone=x=>JSON.parse(JSON.stringify(x));
 function jReset(){jStopMic();if(jRecording?.recorder.state==='recording')jRecording.recorder.stop();journey=jInitial();jHeld.clear();jPanel.hidden=true;jPause.hidden=true;jCredits.hidden=true;jHUD.hidden=true;jUIStamp='';jHUDStamp='';jScale=1;}
 function jLocks(){return (journey.mode==='ritual'&&journey.ritual?.phase!==2)||['epitaph','karaoke','market','loan','iga','clones','retry','ending-talk','pigeon-fall','credits','aftercredits'].includes(journey.mode);}
 function jLeash(){return journey.zone?20:7.5;}
 function jBlocked(x,z,p){if(Math.abs(x)>10.5||z>4||z<-25)return true;if(journey.mode==='last-escape')for(let k=0;k<4;k++)if(Math.abs(z+5+k*5)<.65&&Math.abs(x-(k%2?4:-4))>1.7)return true;if(journey.zone==='arena'&&['boss','prepare'].includes(journey.mode)&&Math.hypot(x,z+16)<1.5)return true;if(journey.zone==='zoo'&&journey.mode==='zoo'&&p){if(p.id==='aleks'&&x>-.45||p.id==='sandra'&&x<.45)return true;}return false;}
 function jStable(){return !dialogue.active&&!act.busy&&!journey.finished;}
 function jSave(){if(jStable())saveCheckpoint();}
 function jTalk(lines,done=null,options=null){jPanel.hidden=true;clearMovement();actConversation(lines,options,done);}
 function jMode(mode,persist=true){journey.mode=mode;journey.at=journey.clock;jPanel.hidden=!['epitaph','karaoke','market','loan','iga','clones','ritual','retry'].includes(mode);clearMovement();jUIStamp='';jUI();if(persist)jSave();}
 function jZone(zone,mode='walk'){
  closeDialogue();jStopMic();journey.zone=zone;journey.mobs=[];journey.hazards=[];journey.projectiles=[];journey.pickups=[];journey.echoRuns=[];journey.ghost=null;
  act.ending=null;act.pending=null;act.busy=false;chapter.seated={aleks:false,sandra:false};chapter.quiz.open=false;quizPanel.hidden=true;
  play.space=zone==='room'?'catacombs':'journey';act.scene=zone==='room'?'catacombs':'journey';play.camera=null;play.npcs=[];play.avenger=null;play.stage='explore';play.objective='journey';play.active=true;game.phase='explore';orbit.yaw=0;orbit.pitch=.22;orbit.zoom=1;
  play.players.forEach((p,i)=>{p.x=i?.8:-.8;p.z=1.5;p.heading=Math.PI;p.moving=false;});
  jMode(mode,false);size();updateInteraction();
 }
 function jBootRoom(mode){chapter.active=true;chapter.phase='room';enterCatacombs();closeDialogue();jZone('room','walk');if(mode==='karaoke'){play.players[0].x=0;play.players[0].z=-3;play.players[1].x=2;play.players[1].z=-6.4;chapter.seated.sandra=true;}}
 function jResurrectionBranch(victim){
  act.victim=victim;
  if(victim==='self'){jTalk([['Aleks','Wybieram siebie. Zostaw ich.'],['Sandra','Ty szmato! Nie pozwolę na to.'],['Aleks','Nie patrz się, kurwa!'],['Sandra','Nie będziesz podejmował za mnie decyzji!'],['Tom','Zatem niech zdecyduje pojedynek.']],()=>{jZone('court','duel');journey.mini={hits:[0,0],winner:null};play.players[0].x=-1.8;play.players[1].x=1.8;jSave();});}
  else {journey.sandraSacrificed=true;jTalk([['Aleks','Wybieram Sandrę.'],['Sandra','A wiesz co, Aleks? I tak nie chciałam być z tobą w związku.'],['Aleks','To mogłaś powiedzieć pięć minut wcześniej!'],['Mściciel','Twój wybór. Mój strzał.']],()=>{cutscene('cemetery',2.5,()=>{jBootRoom('karaoke');journey.ghost='sandra';journey.mini={attempt:0,hits:[],start:journey.clock+2.5};jTalk([['Tom','Za to, że zabiłeś swoją dziewczynę, idź teraz cierpieć dalej.'],['Aleks','To jest gorsze niż zwykła kara.'],['Tom','Chcesz ją odzyskać? Powiedz: Gabryś jest spoko.'],['Sandra','Jak nie powiesz, to cię będę straszyć do końca życia.']],()=>jMode('karaoke'));});});}
 }
 function jDuelEnd(winner){
  journey.mini.winner=winner;journey.buried=winner===0?'sandra':'aleks';journey.grudge=true;
  jTalk(winner===0?[['Aleks','Nie chciałem, żeby tak wyszło.'],['Sandra','A mimo to wyszło, dziwko.']]:[['Sandra','Ja ci pokażę poświęcanie się na siłę.'],['Aleks','Przynajmniej wykop grób prosto.']],()=>{jMode('burial');cutscene('journey',3,()=>{jBootRoom('epitaph');journey.ghost=journey.buried;journey.mini={row:0,words:[],started:journey.clock};jTalk([['Tom','Trzy wersy epitafium. Wtedy może dostaniecie drugą szansę.']],()=>jMode('epitaph'));});});
 }
 function jEpitaphWord(index){
  const m=journey.mini,expected=[1,2,0][m.words.length];if(index!==expected){m.words=[];m.error='Nie pasuje. Spróbuj ponownie.';}else{m.words.push(index);m.error='';if(m.words.length===3){m.row++;m.words=[];}}
  if(m.row===3){journey.ghost=null;jTalk([['Tom','To nie poezja. To jest przestępstwo przeciw literaturze.'],[journey.buried==='aleks'?'Aleks':'Sandra',journey.buried==='aleks'?'Z martwych wstałem jak Jezus Chrystus, szmato.':'Dzięki za pogrzeb. Za wesele nie dziękuję.'],['Sandra','To może teraz chociaż podziękuj?']],jSeats);return;}jUIStamp='';jUI();
 }
 function jKaraokeHit(){const m=journey.mini,t=journey.clock-m.start,beat=Math.floor(t);if(beat<0||beat>4||m.hits.includes(beat))return;const window=m.attempt>=3?.46:.32;if(Math.abs(t-beat-.5)<window){m.hits.push(beat);comicSound();jUIStamp='';}}
 async function jStartMic(){
  try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});if(journey.mode!=='karaoke'){stream.getTracks().forEach(t=>t.stop());return;}const Context=window.AudioContext||window.webkitAudioContext,ctx=new Context();await ctx.resume();const analyser=ctx.createAnalyser();analyser.fftSize=512;ctx.createMediaStreamSource(stream).connect(analyser);jMic={stream,ctx,analyser,data:new Uint8Array(512),floor:.02};}catch{journey.mini.micMessage='Mikrofon niedostępny — klawisze działają tak samo.';jUIStamp='';jUI();}
 }
 function jStopMic(){if(jMic){jMic.stream.getTracks().forEach(t=>t.stop());jMic.ctx.close();jMic=null;}}
 function jSeats(){journey.mode='walk';journey.zone=null;journey.ghost=null;jPanel.hidden=true;chapter.active=true;chapter.phase='room';play.objective='seats';play.stage='explore';game.phase='explore';play.space='catacombs';act.scene='catacombs';chapter.seated={aleks:false,sandra:false};journey.hp=[...journey.maxHP];jSave();}
 function jAfterQuiz(){
  const q=chapter.quiz;journey.animal=q.animal;journey.inkDebuff=['aleks','sandra'].map(w=>q.ink[w]!=='pen');chapter.seated={aleks:false,sandra:false};q.open=false;quizPanel.hidden=true;jZone('room');
  if(journey.animal==='chrupek'){journey.flags.chrupekDropAt=ambientTime;jMode('chrupek');jTalk([['Sandra','Czy… to jest Chrupek?'],['Aleks','Gra naprawdę nie zna granic.']],()=>jMode('chrupek'));}
  else if(journey.animal==='lila')jTalk([['Sandra','Ale ładny piesek!'],['Aleks','Czemu on się na nas tak patrzy?']],jIga);
  else if(journey.animal==='etf'){journey.mini={money:0,cash:1000,shares:0,price:100,clicks:0,boost:1,deadline:journey.clock+JCONFIG.marketSeconds};jTalk([['Aleks','Borys by się tu odnalazł.'],['Sandra','Byle tylko nie pożyczał od gołębia.']],()=>jMode('market'));}
  else jTalk([['Tom','Kto nie miauczy, ten nie wychodzi.'],['Aleks','Miałem w życiu różne poniżenia. Tego nie przewidziałem.']],jIga);
 }
 function jIga(){journey.mini={removed:[]};jTalk([['Tom','Ostatnie pytanie. Jak skończy się historia Igi?']],()=>jMode('iga'));}
 function jIgaChoose(index){if(index!==2){if(!journey.mini.removed.includes(index))journey.mini.removed.push(index);jUIStamp='';jUI();return;}journey.flags.igaDark=true;jTalk([['Iga','O nie!'],['Sandra','Aleks, to nie jest quiz. To jest szantaż.'],['Aleks','Nie ma tu nawet opcji reklamacji.'],['Sandra','Tego nie będę wpisywać do CV.']],()=>{journey.flags.roomComplete=true;jMode('door');jSave();});}
 function jMarket(action){const m=journey.mini;if(action==='buy'&&m.cash>=m.price){const n=Math.floor(m.cash/m.price);m.shares+=n;m.cash-=n*m.price;}if(action==='sell'){m.cash+=m.shares*m.price;m.shares=0;}if(action==='click'){m.clicks++;if(m.clicks%10===0)m.boost=Math.min(16,m.boost*2);m.money+=1e7*m.boost;comicSound();}jUIStamp='';}
 function jMarketEnd(){const m=journey.mini;if(m.money>=JCONFIG.marketGoal&&m.cash+m.shares*m.price>=1100)jTalk([['Borys','To była inwestycja!']],jIga);else{journey.debt=true;jTalk([['Gołąb Szaman','Pożyczka zatwierdzona. RRSO: nie pytaj. Dług: dziesięć piór.'],['Aleks','Czy to w ogóle legalne?'],['Gołąb Szaman','Jestem ptakiem. Jak mnie pozwiesz?'],['Sandra','Dziesięć piór i znikasz?']],()=>{journey.feathers=[{id:0,x:-5,z:-10},{id:1,x:0,z:-4},{id:2,x:5,z:-10}];jMode('loan');});}}
 function jSpawnMob(type,x,z,hp=30,owner=null){journey.mobs.push({id:type+'-'+journey.mobs.length,type,x,z,hp,maxHP:hp,owner,next:journey.clock+2,windup:null,hit:false});}
 function jTraining(){jZone('training');journey.flags.trainingWave=0;jSpawnMob('Cień korzeni',0,-6,25);jTalk([['Sandra','Coś wychodzi z korzeni. Aleks, spacja — atak.'],['Aleks','A ty: prawy Shift — atak, prawy Ctrl — unik.']],()=>jMode('training'));}
 function jTrainingNext(){const wave=++journey.flags.trainingWave;if(wave===1)jSpawnMob('Opętana wrona',0,-7,25);if(wave===2){jSpawnMob('Mogiłowy cień',-2,-7,30);jSpawnMob('Kościana ręka',2,-7,20);}if(wave===3){jSpawnMob('Żółw marionetka',-2,-7,25);jSpawnMob('Echo pętli',2,-7,25);}if(wave>=4){journey.flags.trainingDone=true;journey.hp=[...journey.maxHP];jTalk([['Sandra','Dobra. Teraz zoo. Co może pójść źle?']],jZoo);}}
 function jZoo(){jZone('zoo','zoo-ready');journey.zoo={count:5,greeted:[],aleksWon:false,sandraWon:false,deadline:null};play.players[0].x=-4;play.players[1].x=4;journey.feathers=journey.debt?[{id:3,x:-6,z:-2},{id:4,x:0,z:-8},{id:5,x:6,z:-14}]:[];journey.pickups=[{id:'zoo-a',x:-8,z:1,weapon:'sign',owner:0},{id:'zoo-s',x:8,z:1,armor:'shell',owner:1}];jTalk([['Drzwi','Aleks w lewo. Sandra w prawo. Uśmiech obowiązkowy.'],['Aleks','A może ja chcę w prawo?'],['Drzwi','Nie.'],['Sandra','Aleks, widzisz te żółwie?'],['Aleks','A ty widzisz te foki? One mnie otaczają.']],()=>jMode('zoo-ready'));}
 function jZooStart(){
  if(!play.players.every((p,i)=>Math.hypot(p.x-(i?4:-4),p.z-1)<2))return;
  journey.zoo.deadline=journey.clock+JCONFIG.zooSeconds;journey.mobs=[];for(let i=0;i<journey.zoo.count;i++)jSpawnMob('Foka',-4+(i%2)*-2,-4-i*2,22,0);jMode('zoo');
 }
 function jZooEnd(){const z=journey.zoo;z.aleksWon=!journey.mobs.some(m=>m.hp>0);z.sandraWon=z.greeted.length===5;journey.seal=!z.aleksWon;journey.hp=[...journey.maxHP];journey.mobs=[];if(!z.sandraWon){jMode('phone');journey.at=journey.clock;jTalk([['Sandra','Muszę tu zostać do końca dnia.'],['Aleks','Dobra, to sobie poscrolluję.']],()=>jMode('phone'));}else jAfterPhone();}
 function jAfterPhone(){if(journey.seal){jTalk([['Sandra','Aleks? Ty… jesteś foką?'],['Aleks','Arf. Kurwa, arf.'],['Sandra','Tabliczka: klątwę zdejmie tylko Sandra. Trzy trafienia. Nie dramatyzować.']],()=>jMode('unseal'));}else jReturnRoad();}
 function jReturnRoad(){jZone('road');journey.feathers=journey.debt?[{id:6,x:-1.5,z:-5},{id:7,x:1.5,z:-10},{id:8,x:-1.5,z:-15},{id:9,x:1.5,z:-20}]:[];jSpawnMob('Echo pętli',-3,-10,30);jSpawnMob('Echo pętli',3,-17,30);journey.pickups=[{id:'road-a',x:-6,z:-21,weapon:'stone',armor:'stone',owner:0},{id:'road-s',x:6,z:-21,weapon:'stone',armor:'stone',owner:1}];jTalk([['Sandra','Aleks, czekaj. To nie jest ta sama droga?'],['Aleks','No chyba tak, kurwa. Jeszcze tylko tego brakowało.'],['Sandra','Gdzie jest ten człowiek na krzyżu?'],['Aleks','Może poszedł do domu.'],['Sandra','ALEKS, ON NIE ŻYŁ.'],['Aleks','No to chyba jednak nie poszedł.'],['Sandra','Nie ma już ani krwi, ani ciała. Cofnęliśmy się w czasie.']],()=>jMode('return'));}
 function jPrepare(){if(journey.debt&&!journey.paid){jZone('antechamber');jSpawnMob('Dłużny gołąb',0,-7,75);jTalk([['Gołąb Szaman','Dziesięć piór albo walcz o anulowanie odsetek.']],()=>jMode('debt-fight'));return;}jReveal();}
 function jReveal(){jZone('antechamber');jTalk([['Tom','Dzięki wam pętla się znowu zacznie powtarzać.'],['Aleks','Co ty pierdolisz? Ty wiesz, kurwa, przez co przeszliśmy?'],['Sandra','Aleks, nie przeklinaj.'],['Aleks','Kurwa, kurwa, kurwa!'],['Sandra','Masz nauczkę, suko.'],['Tom','Na cmentarzu widzieliście moją kopię. Ja istniałem, zanim przyszliście.'],['Tom','Ja jestem Tom! Wołanie pozwoliło mi was znaleźć.'],['Sandra','Tom, Tom, Tom…'],['Aleks','Sandra, proszę, wróć!']],()=>{journey.mini={selected:0,correct:1,deadline:journey.clock+12};jMode('clones');});}
 function jChooseClone(index){journey.flags.cloneWrong=index!==journey.mini.correct;jStartTrance();}
 function jStartTrance(){jZone('arena','trance');journey.mini={sequence:['ArrowUp','ArrowLeft','ArrowRight','ArrowDown','ArrowUp','ArrowRight','ArrowLeft','ArrowDown','ArrowUp','ArrowLeft','ArrowDown','ArrowRight'],progress:0};journey.flags.nextTranceWave=journey.clock+2;jTalk([['Tom','Aleks, możesz zostać. Wystarczy, że oddasz mi Sandrę.'],['Aleks','Oddam ci co najwyżej paragon.'],['Sandra','Tom… nie… Tom…'],['Aleks','Sandra, patrz na mnie. Nie na tę pierdoloną skorupę!']],()=>jMode('trance'));}
 function jBeforeBoss(){journey.hazards=[];journey.lilaDemon=journey.animal==='lila';jMode('prepare');const lines=journey.lilaDemon?[['Tom','Lila. Do nogi.'],['Sandra','To… to był jego pies?!'],['Aleks','Mówiłem, że coś za długo na nas patrzy.']]:[['Sandra','Zabierz ode mnie to imię!'],['Tom','To dopiero pierwszy akt.']];jTalk(lines,jGhostConsequences);}
 function jBoss(){journey.hp=[...journey.maxHP];if(journey.flags.witchCurse)journey.flags.curseUntil=journey.clock+30;if(journey.flags.mathShield)journey.invul=[journey.clock+4,journey.clock+4];journey.boss={hp:JCONFIG.bossHP,maxHP:JCONFIG.bossHP,index:0,next:journey.clock+2,shielded:false,graveUsed:false};journey.echoes=[{id:0,x:-7,z:-12},{id:1,x:7,z:-12},{id:2,x:-7,z:-5},{id:3,x:7,z:-5}];journey.echoesRescued=0;journey.hazards=[];jMode('boss');if(journey.flags.cloneWrong)jHazard('Przemarsz klonów');jSave();}
 function jEndingState(){return {aleksItem:selection.bag.aleks?.id,sandraItem:selection.bag.sandra?.id,animal:journey.animal,arenaFailed:journey.flags.arenaFailed,aleksTrustsSandra:chapter.quiz.answers[0].aleks===0,sandraTrustsAleks:chapter.quiz.answers[0].sandra===0,sandraBuriedByAleks:journey.buried==='sandra',unresolvedBurialGrudge:journey.grudge,lilaTamed:journey.lilaTamed,scissorsKept:act.tool,echoesRescued:journey.echoesRescued,truceProposed:journey.flags.truceProposed,aleksBackedTruce:journey.flags.aleksBackedTruce};}
 function jResolve(s,moment='tom-defeated'){
  if(moment==='arena-failed')return s.animal==='arena'&&s.arenaFailed?2:null;
  if(moment!=='tom-defeated')return null;
  const conditions={3:s.sandraItem==='tom'&&(!s.sandraTrustsAleks||s.sandraBuriedByAleks),6:(!s.aleksTrustsSandra&&!s.sandraTrustsAleks)||s.unresolvedBurialGrudge,4:s.sandraItem==='tom'&&s.truceProposed&&s.aleksBackedTruce,7:s.aleksItem==='food'&&s.sandraItem==='tom'&&s.aleksTrustsSandra&&s.sandraTrustsAleks&&s.animal==='lila'&&s.lilaTamed&&s.scissorsKept&&s.echoesRescued>=2,5:s.animal==='lila'&&s.lilaTamed,1:true};return JCONFIG.endingPriority.find(id=>conditions[id]);
 }
 function jBossWon(){journey.hazards=[];jTalk([['Aleks','I co, kurwa? Kto teraz jest żółwiem?'],['Sandra','Aleks… chyba naprawdę wygraliśmy.'],['Tom','Wygraliście… ze mną.']],()=>{const id=jResolve(jEndingState());if(id===7)jRitual();else jEnding(id);});}
 function jRitual(){journey.ritual={phase:0,marker:0,ring:0,ready:[null,null]};jTalk([['Lila','To nie Tom trzymał nas w nocy. On tylko pilnował drzwi.'],['Aleks','Mówiłem, że nie ufam owocom.'],['Dynia','Nie dotykajcie tego.']],()=>jMode('ritual'));}
 function jRitualConfirm(i){const r=journey.ritual;if(r.phase===2&&journey.clock<(r.waveReadyAt||0)){r.error='Utrzymajcie układ i uniknijcie pierwszej fali.';return;}r.error='';if(r.marker!==r.phase||r.ring!==[1,3,2][r.phase]){r.ready=[null,null];return;}r.ready[i]=journey.clock;if(r.ready.every(x=>x!==null)&&Math.abs(r.ready[0]-r.ready[1])<=3){r.phase++;r.ready=[null,null];r.marker=0;r.ring=0;if(r.phase===2){r.waveReadyAt=journey.clock+5;journey.flags.nextRitualWave=journey.clock+.2;}if(r.phase===3){jEnding(7);return;}}jUIStamp='';}
 const J_END_NAMES={1:'NIESKOŃCZONA NOC',2:'IMPREZA HALLOWEEN',3:'SANDRA TOMA',4:'NÓŻ W PLECY',5:'LILA PRZECIW PANU',6:'DWA CIENIE',7:'OSTATNI ŚWIT'};
 function jEnding(id){journey.ending=id;journey.mobs=[];journey.hazards=[];jPanel.hidden=true;
  if(id===1){jZone('road','ending-talk');journey.ending=1;journey.endingShot=0;jTalk(J_DIALOGUE.e1_intro,()=>{jMode('last-escape');journey.at=journey.clock;});return;}
  if(id===2){jZone('road','ending-talk');journey.ending=2;jTalk(J_DIALOGUE.hospital.slice(0,2),()=>jMode('pigeon-fall'));return;}
  jZone(id===5||id===7?'dawn':'arena','ending-talk');journey.ending=id;journey.endingShot=0;if([3,4,5,6,7].includes(id))for(const p of play.players)p.z=-7;
  let lines=id===2?J_DIALOGUE.hospital:J_DIALOGUE['e'+id];if(id===6){journey.flags.betrayer=journey.buried||(chapter.quiz.answers[0].sandra===1?'sandra':'aleks');lines=J_DIALOGUE[journey.flags.betrayer==='aleks'?'e6aleks':'e6sandra'];}if(id===3){const split=lines.findIndex(l=>l[1]==='Wybieram Toma.')+1;jTalk(lines.slice(0,split),()=>{journey.flags.betrayalLines=lines.slice(split);journey.flags.waveX=0;jMode('betrayal-run');});return;}jEndingLines(lines,()=>jCreditsShow(id));
 }
 function jEndingLines(lines,done){journey.endingShot=0;jTalk(lines,done);}
 function jE1Tragedy(){jMode('ending-talk');journey.endingShot=1;jTalk(J_DIALOGUE.e1_tragedy,()=>{journey.endingShot=2;jTalk(J_DIALOGUE.e1_newPair,()=>jCreditsShow(1));});}
 function jCreditsShow(id){journey.finished=true;journey.mode='credits';clearMovement();closeDialogue();jHUD.hidden=true;jCredits.hidden=false;let meta=[];try{meta=JSON.parse(localStorage.getItem('halloween.endings.v1'))||[];if(!Array.isArray(meta))meta=[];if(!meta.includes(id))meta.push(id);localStorage.setItem('halloween.endings.v1',JSON.stringify(meta));}catch{}
  jCredits.replaceChildren();const title=document.createElement('h1');title.textContent=`ENDING ${id} — ${J_END_NAMES[id]}`;jCredits.append(title);const ep=document.createElement('p');ep.textContent={1:'Możesz wybrać każdą drogę. Ale nie możesz wybrać, dokąd prowadzi.',2:'Oboje pamiętają ten sam sen. Za oknem szpitala leży jedno pióro.',3:'Korona nie oznacza wolności. Pamięć bohaterów znika w kolejnym obiegu.',4:'Zabiliście rolę. Reżyser pozostał.',5:'Para jest wolna. W pustym zoo siedzą dwie Lile; jedna ma czerwone oczy.',6:'Dwa cienie i jedna zamknięta brama. Cisza idzie za tobą.',7:'Aleks, Sandra i Lila wychodzą razem. Nie ma ukrytego resetu.'}[id];jCredits.append(ep);const credits=document.createElement('p');credits.textContent='HALLOWEEN · Aleks i Sandra · Świat 3D ASCII · Koniec';jCredits.append(credits);
  const restart=document.createElement('button');restart.textContent='[ Nowa noc ]';restart.onclick=()=>replay.click();jCredits.append(restart);
  if(id===5){const post=document.createElement('button');post.textContent='[ Scena po napisach ]';post.onclick=()=>{post.remove();jCredits.hidden=true;journey.finished=false;journey.zone='zoo';journey.mode='aftercredits';journey.at=journey.clock;play.space='journey';act.scene='journey';play.camera=null;};jCredits.append(post);}
  if(id===2){const back=document.createElement('button');back.textContent='[ Wróć przed wybór zwierzęcia ]';back.onclick=()=>{jBackBeforeAnimal();return;journey.finished=false;journey.ending=null;journey.animal=null;journey.arenaChallenge=null;journey.arenaElapsed=0;journey.flags.arenaFailed=false;jCredits.hidden=true;jBootRoom('walk');journey.zone=null;chapter.quiz.round=1;chapter.quiz.answers[1]={aleks:null,sandra:null};chapter.quiz.complete=false;chapter.quiz.animal=null;chapter.quiz.cursor={aleks:0,sandra:0};chapter.seated={aleks:true,sandra:true};openQuiz();};jCredits.append(back);}
  restart.focus();try{localStorage.removeItem(checkpointKey);}catch{}refreshCheckpointButton();
 }
 const J_WEAPONS={fists:{name:'pięści',damage:12,cd:.45,range:1.8},branch:{name:'sucha gałąź',damage:14,cd:.55,range:2.2},stake:{name:'kołek',damage:16,cd:.5,range:2},shovel:{name:'łopata',damage:21,cd:.9,range:2.5},hook:{name:'hak',damage:18,cd:.7,range:2.2},sign:{name:'trzonek',damage:15,cd:.5,range:2.2},stone:{name:'odłamek',damage:24,cd:1,range:2.5}};
 function jInFront(p,x,z){const dx=x-p.x,dz=z-p.z,d=Math.hypot(dx,dz);return d<.3||(dx*Math.sin(p.heading)+dz*Math.cos(p.heading))/d>=Math.cos(Math.PI*50/180);}
 function jCombo(i,target){const key='combo-'+target,r=journey.flags[key]||{last:[-10,-10],bonus:-10};r.last[i]=journey.clock;journey.flags[key]=r;if(journey.clock-r.last[1-i]<=.6&&journey.clock-r.bonus>=5){r.bonus=journey.clock;return 18;}return 0;}
 function jDamage(i,amount){if(journey.hp[i]<=0||journey.clock<journey.invul[i])return;const armor={none:0,scarf:.05,coat:.1,shell:.15,stone:.12}[journey.armor[i]]||0;journey.hp[i]=Math.max(0,journey.hp[i]-amount*(1-armor)*(jSettings.easy?.7:1));journey.invul[i]=journey.clock+.55;play.players[i].reactionAt=ambientTime;}
 function jAttack(i,special=false){
  if(journey.hp[i]<=0||dialogue.active||act.busy||journey.finished)return;const p=play.players[i],weapon=J_WEAPONS[journey.weapon[i]]||J_WEAPONS.fists;
  if(journey.clock-journey.attackAt[i]<weapon.cd)return;journey.attackAt[i]=journey.clock;p.gesture={at:ambientTime,self:false};comicSound();
  const other=play.players[1-i];if(journey.mode==='duel'&&Math.hypot(p.x-other.x,p.z-other.z)<2&&journey.clock>=journey.invul[1-i]){journey.mini.hits[i]++;journey.invul[1-i]=journey.clock+.7;if(journey.mini.hits[i]>=JCONFIG.duelHits)jDuelEnd(i);return;}
  if(journey.mode==='unseal'&&i===1&&Math.hypot(p.x-other.x,p.z-other.z)<2.3){journey.sealHits++;if(journey.sealHits>=3){journey.seal=false;journey.flags.sealSkin={x:other.x,z:other.z};journey.flags.sealJumpUntil=ambientTime+1;jTalk([['Aleks','Dziękuję, że mnie pobiłaś.'],['Sandra','Pierwszy raz powiedziałeś to z wdzięcznością.']],jReturnRoad);}return;}
  const candidates=journey.mobs.filter(m=>m.hp>0&&(m.owner===null||m.owner===i)&&Math.hypot(m.x-p.x,m.z-p.z)<weapon.range+.5&&jInFront(p,m.x,m.z)).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z));
  let damage=weapon.damage*(journey.inkDebuff[i]?.97:1)*(journey.chrupek?1.5:1)*(special?2.3:1);
  if(candidates.length){const m=candidates[0];damage+=jCombo(i,m.id);const facing=Math.atan2(m.x-p.x,m.z-p.z);p.heading=facing;m.hp=Math.max(m.type==='Dłużny gołąb'&&(m.salvos||0)<3?1:0,m.hp-damage);if(m.type!=='Dłużny gołąb')m.next=journey.clock+.8;return;}
  if(journey.mode==='boss'&&journey.boss.hp>0&&Math.hypot(p.x,p.z+16)<weapon.range+1.5&&!journey.hazards.length){p.heading=Math.atan2(-p.x,-16-p.z);journey.boss.hp=Math.max(0,journey.boss.hp-damage-jCombo(i,'tom'));}
 }
 function jDodge(i){if(journey.hp[i]<=0||journey.clock-journey.dodgeAt[i]<1.8||jLocks())return;journey.dodgeAt[i]=journey.clock;journey.invul[i]=journey.clock+.24;}
 function jAbility(i){
  const who=i?'sandra':'aleks',id=selection.bag[who]?.id,p=play.players[i];if(!p||journey.hp[i]<=0)return;
  if(journey.mode==='zoo-ready'&&['fork','gouda'].includes(id)&&!journey.used[who+'-zoo']){journey.zoo.count=Math.max(1,journey.zoo.count-(id==='fork'?1:3));journey.used[who+'-zoo']=true;comicSound();return;}
  if(journey.mode==='prepare'&&journey.lilaDemon&&id==='food'&&!journey.lilaTamed&&Math.hypot(p.x-4,p.z+8)<3){journey.lilaTamed=true;jTalk([[who==='sandra'?'Sandra':'Aleks','Lila. Chodź tutaj. Masz.'],['Tom','Zdradziłaś mnie za karmę?!'],['Sandra','Nie za karmę. Za normalne traktowanie.']],()=>{jSave();});return;}
  if(journey.mode==='clones'&&id==='paper'){journey.flags.cloneHint=true;journey.mini.deadline=journey.clock+20;jUIStamp='';return;}
  if(journey.clock-journey.specialAt[i]<10)return;journey.specialAt[i]=journey.clock;
  if(id==='rem'){jRemSound();journey.hazards=journey.hazards.filter(h=>h.type!=='Rząd żółwi');if(journey.mode==='boss')journey.boss.hp=Math.max(0,journey.boss.hp-35);comicSound();}
  else if(i===1||id==='tom'){journey.invul[i]=journey.clock+1.2;}
  else{journey.attackAt[i]=-10;jAttack(i,true);}
 }
 function jMobTick(dt){
  for(const m of journey.mobs){if(m.hp<=0)continue;const targets=play.players.map((p,i)=>({p,i})).filter(({i})=>journey.hp[i]>0&&(m.owner===null||m.owner===i));if(!targets.length)continue;targets.sort((a,b)=>Math.hypot(m.x-a.p.x,m.z-a.p.z)-Math.hypot(m.x-b.p.x,m.z-b.p.z));const {p,i}=targets[0],dist=Math.hypot(p.x-m.x,p.z-m.z);
   if(m.windup){if(journey.clock>=m.windup.at+1.2){if(m.type==='Dłużny gołąb'){m.salvos=(m.salvos||0)+1;for(let shot=0;shot<3;shot++){const angle=Math.atan2(m.windup.x-m.x,m.windup.z-m.z)+(shot-1)*.22;let q=journey.projectiles.find(q=>!q.active);if(!q){q={};journey.projectiles.push(q);}Object.assign(q,{active:true,x:m.x,z:m.z,vx:Math.sin(angle)*2.8,vz:Math.cos(angle)*2.8,until:journey.clock+4});}}else if(Math.hypot(p.x-m.windup.x,p.z-m.windup.z)<1.8)jDamage(i,12);m.windup=null;m.next=journey.clock+2.2;}}
   else if(dist<2.3&&journey.clock>=m.next)m.windup={at:journey.clock,x:p.x,z:p.z};
   else if(dist>1.4&&dist<13){const speed=m.type==='Kościana ręka'?0:m.type==='Opętana wrona'?1.6:.95,n=Math.max(dist,.1),nx=m.x+(p.x-m.x)/n*dt*speed,nz=m.z+(p.z-m.z)/n*dt*speed;if(!jBlocked(nx,nz))m.x=journey.zone==='zoo'?Math.min(-.7,nx):nx;m.z=nz;}
  }
 }
 function jHazard(type){
  const h={type,at:journey.clock,warn:type==='Pentagram'?2.3:1.8,duration:['Rząd żółwi','Przemarsz klonów'].includes(type)?7:['Pentagram','Fala dyni'].includes(type)?3:type==='Szarpnięcie czasu'?3:.6,hit:[],zones:[]};
  if(['Łapa gniewu','Deszcz dyni','Klątwa Wiedźmy'].includes(type)){h.zones=play.players.map(p=>({kind:'circle',x:p.x,z:p.z,r:type==='Łapa gniewu'?1.6:1.8}));if(type!=='Łapa gniewu')h.zones.push({kind:'circle',x:-4,z:-8,r:2});}
  else if(['Rząd żółwi','Przemarsz klonów','Krypto Krach'].includes(type)){h.gap=(journey.boss?.index||0)%3-1;for(let x=-8;x<=8;x+=2)if(Math.abs(x-h.gap*4)>2)h.zones.push({kind:'rect',x,z:-8,w:1.5,d:26});}
  else if(type==='Krzyżowy promień'||type==='Meimei Apokalipsa')h.zones=[{kind:'rect',x:0,z:-8,w:1.6,d:24},{kind:'rect',x:0,z:-9,w:20,d:1.5},...(type==='Meimei Apokalipsa'?[{kind:'rect',x:5,z:-8,w:1.5,d:24}]:[])];
  else h.zones=[{kind:'circle',x:type==='Szarża Lili'?4:0,z:-8,r:3}];journey.hazards.push(h);
 }
 function jHazardTick(dt=0){
  journey.hazards=journey.hazards.filter(h=>journey.clock<h.at+h.warn+h.duration);
  for(const h of journey.hazards){const elapsed=journey.clock-h.at-h.warn;if(elapsed<0)continue;
   if(journey.lilaTamed&&h.type==='Łapa gniewu'&&!h.blocked){h.blocked=true;h.hit=[0,1];}
   for(let i=0;i<2;i++){if(h.hit.includes(i))continue;const p=play.players[i];let hit=false;
     if(h.type==='Pentagram'||h.type==='Fala dyni'){const dx=p.x,dz=p.z+8,r=Math.hypot(dx,dz);hit=Math.abs(r-elapsed*(h.type==='Fala dyni'?2.4:4))<.5&&Math.abs(Math.atan2(dx,dz))>.65;}
    else if(h.type==='Rząd żółwi'||h.type==='Przemarsz klonów')hit=h.zones.some(z=>Math.abs(p.x-z.x)<z.w/2+.2)&&Math.abs(p.z-(-22+elapsed*4))<.8;
     else if(h.type==='Szarpnięcie czasu'){const d=Math.max(.1,Math.hypot(p.x,p.z+8));if(elapsed<2.5&&d<8)movePlayer(p,-p.x/d*dt*1.3,(-8-p.z)/d*dt*1.3,play.players[1-i]);hit=elapsed>2.5&&d<3;}
    else hit=h.zones.some(z=>z.kind==='circle'?Math.hypot(p.x-z.x,p.z-z.z)<z.r:Math.abs(p.x-z.x)<z.w/2+.15&&Math.abs(p.z-z.z)<z.d/2+.15);
    if(hit){jDamage(i,18);h.hit.push(i);}
   }
  }
 }
 const J_ATTACKS=['Rząd żółwi','Łapa gniewu','Krzyżowy promień','Pentagram','Szarpnięcie czasu','Deszcz dyni','Przemarsz klonów'];
 function jTick(dt){
  if(!play.active||selection.active||journey.finished)return;
  jPressureTick();if(dialogue.active||act.busy){jHUDUpdate();return;}if(journey.arenaChallenge){const c=journey.arenaChallenge;c.elapsed=(c.elapsed||0)+dt;if(c.counts.every(n=>n>=3))journey.arenaChallenge=null;else if(c.elapsed>=60){journey.flags.arenaFailed=true;journey.arenaChallenge=null;jEnding(jResolve(jEndingState(),'arena-failed'));}jHUDUpdate();return;}journey.clock+=dt;if(journey.flags.witchCurse&&journey.flags.curseUntil&&journey.clock>journey.flags.curseUntil){journey.flags.witchCurse=false;journey.maxHP=journey.maxHP.map(x=>x+20);journey.hp=journey.hp.map((x,i)=>Math.min(journey.maxHP[i],x+20));}
  for(let i=0;i<2;i++){const p=play.players[i];if(journey.hp[i]>0&&journey.clock-journey.dodgeAt[i]<.22){const dx=Math.sin(p.heading)*8*dt,dz=Math.cos(p.heading)*8*dt;movePlayer(p,dx,dz,play.players[1-i]);}
   if(jHeld.has(i?'ShiftRight':'Space')&&!jLocks())jAttack(i);
   const other=1-i;if(journey.hp[other]<=0&&journey.hp[i]>0&&Math.hypot(p.x-play.players[other].x,p.z-play.players[other].z)<2.3&&(jHeld.has(i?'Enter':'KeyE')||jHeld.has(i?'Enter':'KeyF'))){journey.flags['revive'+i]=(journey.flags['revive'+i]||0)+dt;if(journey.flags['revive'+i]>=2){journey.hp[other]=30;journey.invul[other]=journey.clock+1.2;journey.flags['revive'+i]=0;}}else journey.flags['revive'+i]=0;
  }
  const mode=journey.mode;if(mode==='boss'&&act.tool)jEchoTick(dt);
  if(['training','zoo','return','debt-fight','boss','trance'].includes(mode)||mode==='ritual'&&journey.ritual?.phase===2){jMobTick(dt);jHazardTick(dt);for(const q of journey.projectiles){if(!q.active)continue;q.x+=q.vx*dt;q.z+=q.vz*dt;if(journey.clock>q.until){q.active=false;continue;}for(let i=0;i<2;i++)if(Math.hypot(play.players[i].x-q.x,play.players[i].z-q.z)<.45){jDamage(i,8);q.active=false;break;}}if(journey.hp.every(h=>h<=0)){journey.flags.retryMode=mode;jMode('retry');return;}}
  if(mode==='training'&&!journey.mobs.some(m=>m.hp>0))jTrainingNext();
  if(mode==='debt-fight'&&!journey.mobs.some(m=>m.hp>0)){journey.paid=true;jTalk([['Gołąb Szaman','Dług anulowany. Nie polecajcie mnie znajomym.']],jReveal);}
  if(mode==='karaoke'){
   const m=journey.mini;if(jMic){jMic.analyser.getByteTimeDomainData(jMic.data);let n=0;for(const a of jMic.data)n+=Math.pow((a-128)/128,2);n=Math.sqrt(n/jMic.data.length);if(journey.clock<m.start)jMic.floor=Math.max(.01,jMic.floor*.95+n*.05);else if(n>Math.max(.04,jMic.floor*2))jKaraokeHit();}
   if(journey.clock-m.start>5){if(m.hits.length>=3){jStopMic();journey.ghost=null;jTalk([['Sandra','Wróciłam. I niczego ci nie zapomniałam.'],['Aleks','To może zacznij od tego, że cię wskrzesiłem?']],jSeats);}else{m.attempt++;m.hits=[];m.start=journey.clock+2.5;}}
  }
  if(mode==='market'){const m=journey.mini;m.money+=dt*1e7;m.price=100+Math.sin(journey.clock*1.5)*30+Math.sin(journey.clock*.31)*20;if(journey.clock>=m.deadline||m.money>=JCONFIG.marketGoal&&m.cash+m.shares*m.price>=1100)jMarketEnd();}
  if(mode==='zoo'){journey.zoo.aleksWon=!journey.mobs.some(m=>m.hp>0);journey.zoo.sandraWon=journey.zoo.greeted.length===5;if(journey.clock>=journey.zoo.deadline||journey.zoo.aleksWon&&journey.zoo.sandraWon)jZooEnd();}
  if(mode==='phone'&&journey.clock-journey.at>=60)jAfterPhone();
  if(mode==='ritual'&&journey.ritual.phase===2&&journey.clock>=(journey.flags.nextRitualWave||0)){jHazard('Fala dyni');journey.flags.nextRitualWave=journey.clock+5;}
  if(mode==='clones'&&journey.clock>=journey.mini.deadline)jChooseClone(0);
  if(mode==='trance'&&journey.clock>=journey.flags.nextTranceWave){jHazard('Rząd żółwi');journey.flags.nextTranceWave=journey.clock+9;}
  if(mode==='boss'){
   const b=journey.boss;if(b.hp<=0){jBossWon();return;}
   if(!journey.hazards.length&&journey.clock>=b.next){let type;if(b.index%8===7){type={gabrys:'Meimei Apokalipsa',weronika:'Klątwa Wiedźmy',boris:'Krypto Krach'}[game.target]||'Meimei Apokalipsa';if(journey.candle&&!b.graveUsed){b.graveUsed=true;journey.invul=[journey.clock+5,journey.clock+5];}}else type=J_ATTACKS[b.index%8];jHazard(type);b.index++;b.next=journey.clock+7+(type==='Rząd żółwi'||type==='Przemarsz klonów'?4:0);}
   if(journey.animal==='lila'&&!journey.lilaTamed&&!journey.hazards.length&&journey.clock>(journey.flags.lilaAttackAt||0)){journey.flags.lilaAttackAt=journey.clock+14;jHazard('Szarża Lili');b.next=Math.max(b.next,journey.clock+4);}
  }
  if(mode==='betrayal-run'){journey.flags.waveX=clamp((journey.flags.waveX||0)+(Number(jHeld.has('ArrowRight'))-Number(jHeld.has('ArrowLeft')))*dt*4,-7,7);if(journey.clock-journey.at>=12)jTalk(journey.flags.betrayalLines,()=>jCreditsShow(3));}
  if(mode==='aftercredits'&&journey.clock-journey.at>6){journey.finished=true;jCredits.hidden=false;}
  if(mode==='pigeon-fall'&&journey.clock-journey.at>=3){jZone('hospital','ending-talk');jEndingLines(J_DIALOGUE.hospital.slice(2),()=>jCreditsShow(2));}
  if(mode==='last-escape'){if(play.players.every(p=>p.z<-22)){for(const p of play.players)p.z=1;journey.flags.escapeLoops=(journey.flags.escapeLoops||0)+1;journey.flags.escapeFlash=ambientTime;}if(journey.clock-journey.at>=45)jE1Tragedy();}
  if(journey.animal==='arena'&&journey.zone&&['walk','door','return','prepare'].includes(mode)&&!jLocks()){
   if(!journey.arenaChallenge){journey.arenaElapsed+=dt;if(journey.arenaElapsed>=JCONFIG.arenaEvery){journey.arenaElapsed=0;journey.arenaChallenge={until:journey.clock+60,counts:[0,0]};}}
   const c=journey.arenaChallenge;if(c&&c.counts.every(n=>n>=3))journey.arenaChallenge=null;else if(c&&journey.clock>=c.until){journey.flags.arenaFailed=true;journey.arenaChallenge=null;jEnding(jResolve(jEndingState(),'arena-failed'));return;}
  }
  if(journey.chrupek&&journey.clock-(journey.flags.lastBark||0)>23){journey.flags.lastBark=journey.clock;speak('Hau.',false,'Aleks');for(const m of journey.mobs)if(m.hp>0)m.next=Math.min(m.next,journey.clock+1.2);}
  if(journey.mode==='boss'&&!journey.hazards.length&&journey.clock>journey.boss.next-2&&journey.clock-(journey.flags.lastGhost||0)>23){journey.flags.lastGhost=journey.clock;const id=act.victim;if(id==='boris')jTalk([['Borys','To nie jest śmierć. To korekta rynku.']]);else if(id==='gabrys'&&!journey.flags.gabrysPeace)jTalk([['Gabryś','Chrupek jest lepszy. Wciąż czekam na przyznanie mi racji.']]);}
  if(journey.zone&&jStable()&&journey.clock-jCheckpointAt>15&&['walk','door','return','prepare','zoo-ready'].includes(mode)){jCheckpointAt=journey.clock;jSave();}
  jUI();jHUDUpdate();
 }
 function jCollect(who){
  const candidates=play.players.map((p,i)=>({p,i})).filter(({i})=>who===null||who===undefined||i===(who==='sandra'?1:0));
  for(const {p,i} of candidates){const feather=journey.feathers.find(f=>!journey.collected.includes(f.id)&&Math.hypot(p.x-f.x,p.z-f.z)<1.8);if(feather){journey.collected.push(feather.id);comicSound();if(journey.collected.length>=10){journey.paid=true;jTalk([['Gołąb Szaman','Dług uregulowany.'],['Aleks','Nareszcie ptak zniknął z moich finansów.']],jSave);}else jSave();return true;}
   const pickup=journey.pickups.find(f=>!journey.used[f.id]&&f.owner===i&&Math.hypot(p.x-f.x,p.z-f.z)<1.8);if(pickup){journey.used[pickup.id]=true;if(pickup.weapon)journey.weapon[i]=pickup.weapon;if(pickup.armor)journey.armor[i]=pickup.armor;journey.hp[i]=journey.maxHP[i];comicSound();jSave();return true;}
  }return false;
 }
 function jEchoTick(dt){for(const e of journey.echoes){if(e.freed)continue;const holding=play.players.some((p,i)=>journey.hp[i]>0&&Math.hypot(p.x-e.x,p.z-e.z)<1.8&&(jHeld.has(i?'Enter':'KeyE')||jHeld.has(i?'Enter':'KeyF')));e.hold=holding?(e.hold||0)+dt:0;if(e.hold>=1){e.freed=true;journey.echoesRescued++;journey.echoRuns.push({...e,at:journey.clock});journey.boss.hp=Math.max(0,journey.boss.hp-80);comicSound();}}}
 function jInteract(who=null){
  if(!journey.zone)return jWorldCollect(who);if(jLocks()||dialogue.active)return true;if(jCollect(who))return true;
  const mode=journey.mode;
  if(mode==='training'&&!journey.flags.mathDone&&play.players.some(p=>Math.hypot(p.x-6,p.z+5)<2)){jTalk([['Sandra','Weronika nawet po śmierci nie może skończyć studiów.'],['Aleks','Jest pytanie. Dwa plus dwa.']],null,[{id:'math-four',label:'Zaznacz 4',run:()=>jTalk([['Tablica','NIEZALICZONE. PROSZĘ UZASADNIĆ.'],['Aleks','No to ja już nie mam pytań.'],['Sandra','Kliknij odwołanie do dziekanatu.']],null,[{id:'math-appeal',label:'Odwołaj się',run:()=>{journey.flags.mathDone=true;journey.flags.mathShield=true;jTalk([['Tablica','POPRAWKA ZALICZONA. GRATULACJE.'],['Weronika',journey.graveTone==='kind'?'Dziękuję. Przynajmniej wy nie poprawiacie mi średniej.':'Oby cię też kiedyś z tego odpytywali.']],jSave);}}])},{id:'math-leave',label:'Odejdź od tablicy',run:()=>closeDialogue()}]);return true;}
  if(mode==='chrupek'&&play.players.some(p=>Math.hypot(p.x,p.z+4)<2.5)){jTalk([['Sandra','Zostawiamy go czy bierzesz tego absurdalnego buffa?']],null,[{id:'leave-chrupek',label:'Zostaw',run:()=>jIga()},{id:'eat-chrupek',label:'Zjedz — więcej HP i obrażeń, ale szczekanie',run:()=>{journey.chrupek=true;journey.maxHP=[150,150];journey.hp=[150,150];jTalk([['Aleks','Dobra, mamy buffa.'],['Sandra','Nigdy więcej nie idziemy razem do restauracji.']],jIga);}}]);return true;}
  if(mode==='door'&&partyNear({x:0,z:-11},2.8)){jTalk([['Drzwi','Co, już chcecie iść? Najpierw chodźcie zobaczyć moje zoo!'],['Aleks','Drzwi. Mówią do mnie drzwi.'],['Sandra','Po tym quizie to akurat najmniejszy problem.']],jTraining);return true;}
  if(mode==='zoo-ready'){jZooStart();return true;}
  if(mode==='zoo'){if(who==='aleks')return true;const p=play.players[1];for(let i=0;i<5;i++)if(!journey.zoo.greeted.includes(i)&&Math.hypot(p.x-(i%2?7:3),p.z-(-4-i*2))<1.9){journey.zoo.greeted.push(i);comicSound();break;}return true;}
  if(mode==='return'&&partyNear({x:0,z:-23},2.8)){jPrepare();return true;}
  if(mode==='prepare'){
   if(selection.bag.sandra?.id==='tom'&&!journey.flags.truceAsked&&partyNear({x:0,z:-7},3)){journey.flags.truceAsked=true;jTalk([['Sandra','Tom. Po co dalej walczyć? Możemy udać rozejm. Aleks, poprzesz mnie?']],null,[{id:'truce-yes',label:'Sandra proponuje podstęp',run:()=>{journey.flags.truceProposed=true;jTalk([['Aleks','Ty na serio?'],['Sandra','Zaufaj mi. Pierwszy raz bez gadania.']],null,[{id:'back-truce',label:'Aleks: popieram plan',run:()=>{journey.flags.aleksBackedTruce=true;closeDialogue();jSave();}},{id:'no-truce',label:'Aleks: walczmy uczciwie',run:()=>{closeDialogue();jSave();}}]);}},{id:'truce-no',label:'Sandra: bez układów z Tomem',run:()=>{closeDialogue();jSave();}}]);return true;}
   if(partyNear({x:0,z:-14},3)){jBoss();return true;}return true;
  }
  if(mode==='boss'&&act.tool)return true;
  return true;
 }
 function jPrompt(){
  if(journey.finished)return '';const p=play.players;if(journey.mode==='training'&&!journey.flags.mathDone&&p.some(p=>Math.hypot(p.x-6,p.z+5)<2))return '[E / ENTER] Sesja poprawkowa — tablica Weroniki';
  for(const f of journey.feathers)if(!journey.collected.includes(f.id)&&p.some(a=>Math.hypot(a.x-f.x,a.z-f.z)<2))return '[E / ENTER] Podnieś świecące pióro';
  for(const f of journey.pickups)if(!journey.used[f.id]&&Math.hypot(p[f.owner].x-f.x,p[f.owner].z-f.z)<2)return `[${f.owner?'ENTER':'E'}] ${f.weapon?'Broń':'Pancerz'} i leczenie — własny slot`;
  return {duel:'POJEDYNEK · 3 trafienia · Aleks: SPACJA / LEWY SHIFT · Sandra: PRAWY SHIFT / PRAWY CTRL',chrupek:'Podejdź do Chrupka pod biurkami i użyj E.',door:'Podejdźcie oboje do mówiących drzwi za biurkami. [E]',training:'Atak: SPACJA / PRAWY SHIFT · Unik: LEWY SHIFT / PRAWY CTRL · Powalony partner: przytrzymaj E / ENTER 2 s.', 'zoo-ready':`Aleks na lewym polu, Sandra na prawym. [X / .] widelec lub gouda · [E] Start · Foki: ${journey.zoo?.count}`,zoo:`Aleks: pokonaj foki. Sandra: podejdź do każdego Toma i naciśnij ENTER. ${journey.zoo?.greeted.length}/5`,phone:`Dzień z Tomami: ${Math.max(0,Math.ceil(60-(journey.clock-journey.at)))} s. Aleks: W/S przewijaj ASCII TikTok.`,unseal:'Sandra: trzy trafienia PRAWYM SHIFTEM w foczą formę Aleksa. Aleks może się poruszać.',return:'Wróćcie kamienną drogą do przejścia na końcu. [E / ENTER]', 'debt-fight':'Pokonaj Dłużnego Gołębia — dług zostanie anulowany.',prepare:'Lila przy prawej kolumnie: właściciel karmy używa X / . · [E] rozmowa przy środku · oboje do bramy areny.',trance:`Sandra: ${journey.mini?.sequence?.slice(journey.mini.progress,journey.mini.progress+4).map(x=>({ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→'}[x])).join(' ')} · Aleks: unikaj rzędów żółwi.`,boss:'Atakuj Toma w przerwie między atakami. Przytrzymaj E / ENTER 1 s przy echu — nożyce. [X / .] zdolność.', 'betrayal-run':'Sandra: strzałkami kieruj żółwie · Aleks: WASD unikaj · brama zostanie zamknięta.', 'last-escape':`Dynia zamyka drogę. Biegnijcie razem! ${Math.max(0,Math.ceil(45-(journey.clock-journey.at)))} s.`}[journey.mode]||'';
 }
 function jGraveVisit(skipIntro=false){
  if(game.visited||!game.target)return;const d=destinations[game.target],session=++play.session;
  const valid=()=>session===play.session&&!game.visited;
  function candle(){if(!valid())return;jTalk([['Sandra','Zapalmy znicz… albo zostawmy grób tak, jak jest.']],null,[{id:'candle-yes',label:'Zapal znicz',run:()=>finish(true)},{id:'candle-no',label:'Zostaw bez znicza',run:()=>finish(false)}]);}
  function tone(kind,insult=null){if(!valid())return;journey.graveTone=kind;journey.insult=insult;
   const lines=game.target==='gabrys'?(kind==='kind'?[['Aleks','Głupi napis. Nawet po śmierci umiesz mnie wkurzyć. Ale pamiętam o tobie.'],['Sandra','Okej. Nie wiedziałam, że potrafisz.']]:[['Aleks',`I co, Gabryś? Przeżyłem dłużej od ciebie, a ja o tobie, ${insult}, nie zapomniałem.`],['Sandra','Czy ty właśnie wyzywasz nagrobek?'],['Aleks','On zaczął.']]):game.target==='weronika'?(kind==='kind'?[['Aleks','Szkoda, że nie doczekała końca studiów.'],['Sandra','Przynajmniej nie musi już oglądać prowadzącego od matematyki.']]:[['Aleks','Kurwa, i tak by tego roku nie zdała. Ha, ha, ha!'],['Sandra','No, rel.']]):kind==='kind'?[['Sandra','Milion czy nie milion, szkoda chłopa.'],['Aleks','No. Tego nie da się odkupić.']]:[['Sandra','Milionowa renta. Chociaż coś po nim zostało.'],['Aleks','Co kurwa?'],['Sandra','Nic. Nie pytaj.']];jTalk(lines,candle);
  }
  function finish(lit){if(!valid())return;game.visited=true;journey.candle=lit;jTalk([['Sandra',lit?'Znicz zostaje tutaj.':'Pamiętamy. Nawet bez znicza.'],['Aleks',act.rescueAttempted?'Czekaj. Ktoś stoi za nami.':'Teraz pomóżmy człowiekowi na krzyżu.']],()=>{if(act.rescueAttempted)startAvenger();else if(act.houseVisited)setObjective('rescue');else enterHouse();});}
  function menu(){if(!valid())return;jTalk([['Sandra','Możesz przynajmniej raz powiedzieć coś normalnego.']],null,[{id:'grave-kind',label:'Powiedz coś miłego',run:()=>tone('kind')},{id:'grave-mean',label:'Powiedz coś niemiłego',run:()=>{if(game.target!=='gabrys'){tone('mean');return;}jTalk([['Aleks','I co, Gabryś…']],null,['dziwko','szmato','suko'].map(word=>({id:'insult-'+word,label:word,run:()=>tone('mean',word)})));}},{id:'grave-inspect',label:'Przyjrzyj się nagrobkowi',run:()=>{inspectGrave();}}]);}
  if(skipIntro)menu();else jTalk([['Sandra',d.description],['Aleks',d.quote]],menu);
 }
 function jGraveReply(){const mean=journey.graveTone==='mean';return [game.target==='gabrys'?'Gabryś':game.target==='boris'?'Borys':'Weronika',game.target==='gabrys'?(mean?`Trzy sekundy minęły, ${journey.insult||'szmato'}, a dalej tu stoisz.`:'Ty serio mnie pamiętasz? Dobra, to trochę mi głupio.'):game.target==='boris'?(mean?'To nie renta, tylko inwestycja. Wy nawet po mojej śmierci nie rozumiecie rynku.':'Dzięki. Sprawdźcie mi tylko portfel po wyjściu.'):(mean?'Aleks, jeszcze jedno słowo, a wpiszę ci poprawkę z matematyki na wieczność.':'Dzięki. Ale nawet śmierć nie zwolniła mnie z zaliczenia.')];}
 function jGhostConsequences(){
  if(act.victim==='weronika'&&!journey.flags.witchDone){journey.flags.witchDone=true;journey.flags.witchCurse=true;journey.maxHP=journey.maxHP.map(x=>x-20);journey.hp=journey.hp.map((x,i)=>Math.min(x,journey.maxHP[i]));jTalk([['Weronika','Oblałeś unik. Zobaczymy, jak poradzisz sobie z mniejszą liczbą punktów.'],['Sandra','Aleks, wiedźma. Mówiłam ci.']],()=>jMode('prepare'));return;}
  if(act.victim==='gabrys'&&!journey.flags.gabrysAsked){journey.flags.gabrysAsked=true;jTalk([['Gabryś','Nadal mam wam za złe ten wybór. Chrupek jest lepszy od Lili i Areny. Przyznacie?']],null,[{id:'gabrys-agree',label:'Aleks: Chrupek jest lepszy od Lili i Areny',run:()=>jTalk([['Sandra','Ja też mam to powiedzieć?']],null,[{id:'sandra-gabrys-yes',label:'Sandra: potwierdzam',run:()=>{journey.flags.gabrysPeace=true;jTalk([['Gabryś','Dobra, dobra. Mamy pokój.']],()=>jMode('prepare'));}},{id:'sandra-gabrys-no',label:'Sandra: odmawiam',run:()=>{closeDialogue();jMode('prepare');}}])},{id:'gabrys-refuse',label:'Aleks: nie będę się z tobą licytował',run:()=>{closeDialogue();jMode('prepare');}}]);return;}
  jMode('prepare');
 }
 const jPressure=document.createElement('p');jPressure.style.cssText='margin:10px 0 0;color:#d2bba5;font:13px Consolas,monospace';jPressure.hidden=true;panel.append(jPressure);
 function jPressureTick(){
  const active=jSettings.pressure&&play.stage==='verdict'&&dialogue.active&&next.hidden&&!journey.flags.pendingVictim;if(!active){jPressure.hidden=true;journey.flags.pressureAt=null;return;}
  if(journey.flags.pressureAt===null||journey.flags.pressureAt===undefined)journey.flags.pressureAt=ambientTime;
  let elapsed=ambientTime-journey.flags.pressureAt;if(elapsed>=12){journey.flags.pressureAt=ambientTime;journey.flags.pressureRepeated=true;elapsed=0;speak('Sądzisz, że milczenie jest decyzją? Wybierz świadomie.',false,'Mściciel');}
  jPressure.hidden=false;jPressure.textContent=(journey.flags.pressureRepeated?'Milczenie nie wybiera ofiary. ':'')+`Decyzja: ${Math.max(0,Math.ceil(12-elapsed))} s`;
 }
 function jConfirmVictim(id){if(play.stage!=='verdict'||act.ending)return;journey.flags.pendingVictim=id;const name={self:'samego siebie',sandra:'Sandrę',gabrys:'Gabrysia',boris:'Borysa',weronika:'Weronikę'}[id];jTalk([['Sandra',`Wybierasz ${name}. Jesteś pewien?`]],null,[{id:'confirm-victim',label:'Potwierdź wybór',run:()=>{if(journey.flags.pendingVictim!==id||act.ending)return;journey.flags.pendingVictim=null;finishAct(id);}},{id:'cancel-victim',label:'Wróć do wyboru',run:()=>{journey.flags.pendingVictim=null;jTalk([['Mściciel','Wybierz świadomie.']],null,finalChoices());}}]);}
 function jPumpkin(x,z,scale=1){for(let i=0;i<9;i++){const a=i/9*Math.PI*2;meshEllipsoid(v(x+Math.cos(a)*.40*scale,-.55+scale*.25,z+Math.sin(a)*.30*scale),.52*scale,.72*scale,.40*scale,[167+Math.sin(a)*22,105,57]);}meshLimb(v(x,.45*scale,z),v(x+.12*scale,.87*scale,z-.08*scale),.12*scale,.08*scale,[113,133,101],6);for(const side of [-1,1])meshEllipsoid(v(x+side*.25*scale,-.2+scale*.25,z+.64*scale),.16*scale,.08*scale,.03*scale,[18,24,30]);meshPrism(x,-.8+scale*.25,z+.64*scale,[[-.47*scale,0],[0,-.14*scale],[.47*scale,0],[.32*scale,-.25*scale],[-.35*scale,-.25*scale]],.04,[23,29,33]);}
 let jCine={key:'',at:0};function jShotProgress(){const key=journey.ending+':'+journey.endingShot+':'+dialogue.index;if(jCine.key!==key)jCine={key,at:ambientTime};return smooth(0,1.4,ambientTime-jCine.at);}
 function jCinePlayer(p,i){const id=journey.ending,n=dialogue.index,t=jShotProgress();if(id===4&&n>=7)return {...p,x:i?.8:-.65,z:mix(-7,-13.8,n===7?t:1),moving:n===7&&t<1,walk:ambientTime*5};if(id===5&&n>=11||id===7&&n>=7){const start=id===5?11:7;return {...p,z:mix(-7,-14,n===start?t:1),moving:n===start&&t<1,walk:ambientTime*5}};if(id===6&&n>=5&&p.id===journey.flags.betrayer)return {...p,x:mix(p.x,2,n===5?t:1),z:mix(-7,-13,n===5?t:1),moving:n===5&&t<1,walk:ambientTime*5};return p;}
 function jCinematicDecor(){
  const id=journey.ending,index=dialogue.index||0,t=jShotProgress();
  if(id===1&&journey.mode!=='last-escape'||journey.mode==='ritual')jPumpkin(0,-11,journey.mode==='ritual'?1.3:1.8);
  if(id===3&&(journey.mode==='betrayal-run'||journey.flags.betrayalLines)){const p=play.players[1];for(let i=0;i<5;i++)meshEllipsoid(v(p.x+Math.cos(i/5*Math.PI*2)*.22,.17+Math.sin(i)*.025,p.z+Math.sin(i/5*Math.PI*2)*.15),.07,.09,.07,[161,193,151]);}
  if(id===4&&index>7){const p=jCinePlayer(play.players[0],0);meshLimb(v(p.x+.2,-.45,p.z),v(p.x+.25,-.15,p.z+.5),.035,.02,[208,218,219],5);}
  if(id===5||id===7){meshBox(-2,-1.5,-11,.35,3.5,.5,[151,182,181]);meshBox(2,-1.5,-11,.35,3.5,.5,[151,182,181]);meshBox(0,1.9,-11,4.4,.3,.5,[169,197,191]);}
  if(id===6&&index>=9){jRect(1.6,-12,1,2.8,'#090c12');jRect(2.4,-12,.9,2.6,'#090c12');}
  if(id===4)for(let i=0;i<3;i++)if(index<10)jTomInstance('e4-ghost-'+i,(i-1)*3,-1.4-(index>=9?t*4:0),-19,.8);
  if(journey.mode==='last-escape'){for(let k=0;k<4;k++)for(let x=-9;x<=9;x+=1.5)if(Math.abs(x-(k%2?4:-4))>2)graveMesh(x,-5-k*5,.8,.9,1,[121,139,150]);const c=partyCenter();const size=Math.floor((2+smooth(0,45,journey.clock-journey.at)*2)*2)/2;jTomInstance('chase-pumpkin-'+size,c.x+7,0,c.z-7,size,()=>jPumpkin(0,0,size));}
  if(journey.mode==='pigeon-fall'){for(let i=0;i<(jSettings.quality==='low'?18:35);i++){const x=Math.sin(i*3.1+journey.clock)*8,z=-3-Math.abs(Math.cos(i*2.1))*11,y=-.3+(i%5)*.55;meshEllipsoid(v(x,y,z),.23,.25,.36,[141,163,175]);for(const side of [-1,1])meshLimb(v(x,y,z),v(x+side*.65,y+.2*Math.sin(journey.clock*9+i),z-.2),.10,.02,[95,124,147],4);}g.fillStyle=`rgba(0,0,0,${smooth(1.8,3,journey.clock-journey.at)})`;}
  flushMesh();
 }
 const J_WORLD_LOOT=[{id:'branch-a',space:'world',x:-3,z:-19,owner:0,weapon:'branch'},{id:'branch-s',space:'world',x:3,z:-19,owner:1,weapon:'branch'},{id:'scarf-a',space:'world',x:-3,z:-45,owner:0,armor:'scarf'},{id:'scarf-s',space:'world',x:3,z:-45,owner:1,armor:'scarf'},{id:'stake-a',space:'world',x:-3,z:-53,owner:0,weapon:'stake'},{id:'shovel-s',space:'world',x:3,z:-53,owner:1,weapon:'shovel'},{id:'hook-a',space:'house',x:-2.8,z:-2,owner:0,weapon:'hook'},{id:'coat-s',space:'house',x:3,z:-2,owner:1,armor:'coat'}];
 function jWorldCollect(who){if(!play.active||journey.zone)return false;for(const f of J_WORLD_LOOT){if(journey.used[f.id]||f.space!==play.space||who&&who!==(f.owner?'sandra':'aleks'))continue;const p=play.players[f.owner];if(Math.hypot(p.x-f.x,p.z-f.z)<1.8){journey.used[f.id]=true;if(f.weapon)journey.weapon[f.owner]=f.weapon;if(f.armor)journey.armor[f.owner]=f.armor;journey.hp[f.owner]=journey.maxHP[f.owner];comicSound();jTalk([[f.owner?'Sandra':'Aleks',f.weapon?'To się przyda. '+J_WEAPONS[f.weapon].name+'.':'Pancerz i trochę oddechu. Artefakt zostaje mój.']],jSave);return true;}}return false;}
 function jLootDraw(f){meshBox(f.x,-1.5,f.z,.5,.35,.55,[92,118,132]);if(f.weapon)meshLimb(v(f.x,-1.14,f.z),v(f.x+.3,-.42,f.z+.2),.055,.035,[175,185,175],5);else meshEllipsoid(v(f.x,-.94,f.z),.25,.3,.16,[130,170,182]);flushMesh();}
 function jWorldSolids(solids){for(const f of J_WORLD_LOOT)if(f.space==='world'&&!journey.used[f.id])solids.push({x:f.x,z:f.z,draw:()=>jLootDraw(f)});}
 function jHouseLoot(){for(const f of J_WORLD_LOOT)if(f.space==='house'&&!journey.used[f.id])jLootDraw(f);}
 function jLootPrompt(){for(const f of J_WORLD_LOOT)if(!journey.used[f.id]&&f.space===play.space&&Math.hypot(play.players[f.owner].x-f.x,play.players[f.owner].z-f.z)<1.8)return `[${f.owner?'ENTER':'E'}] ${f.weapon?J_WEAPONS[f.weapon].name:f.armor} — osobny slot`;return null;}
 function jHouseHint(){if(journey.flags.paperHouse||!Object.values(selection.bag).some(s=>s?.id==='paper'))return;journey.flags.paperHouse=true;jTalk([['Sandra','Miała być kartka o gaźniku. Litery się przestawiają.'],['Aleks','KLON NIE JEST ORYGINAŁEM.'],['Sandra','Co to znaczy?'],['Aleks','Że mechanik nas oszukał.']],jSave);}
 let jRemClip=null,jRecording=null;
 try{const data=localStorage.getItem('halloween.remVoice.v1');if(data?.startsWith('data:audio/')&&data.length<3000000)jRemClip=new Audio(data);}catch{}
 function jRemSound(){if(!audioEnabled||jSettings.muted)return;if(jRemClip){jRemClip.currentTime=0;jRemClip.play().catch(()=>comicSound());}else{comicSound();speak('Rem, Rem!',false,'Rem');}}
 function jVoiceControls(){const box=document.createElement('div'),label=document.createElement('p');label.textContent='Rem: opcjonalny własny dźwięk. Plik lub 3 sekundy nagrania, tylko lokalnie. Bez niego działa dźwięk domyślny.';box.append(label);
  const input=document.createElement('input');input.type='file';input.accept='audio/*';input.setAttribute('aria-label','Lokalny plik dźwięku Rema');input.onchange=()=>{const file=input.files[0];if(!file)return;if(file.size>2000000){label.textContent='Wybierz krótsze nagranie, do 2 MB.';return;}const reader=new FileReader();reader.onload=()=>jStoreVoice(reader.result,label);reader.readAsDataURL(file);};box.append(input);
  box.append(jButton('Nagraj własny dźwięk (3 s)',async()=>{jStopMic();try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});if(jPause.hidden){stream.getTracks().forEach(t=>t.stop());return;}const recorder=new MediaRecorder(stream),chunks=[];jRecording={recorder,stream};recorder.ondataavailable=e=>chunks.push(e.data);recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());jRecording=null;const file=new Blob(chunks,{type:recorder.mimeType||'audio/webm'}),reader=new FileReader();reader.onload=()=>jStoreVoice(reader.result,label);reader.readAsDataURL(file);};recorder.start();label.textContent='Nagrywanie… maksymalnie 3 sekundy. Nic nie jest wysyłane.';setTimeout(()=>{if(recorder.state==='recording')recorder.stop();},3000);}catch{label.textContent='Nagrywanie niedostępne. Wybierz plik albo dźwięk domyślny.';}},'record-rem'),jButton('Odsłuchaj',()=>{if(jSettings.muted){label.textContent='Dźwięk jest wyciszony w ustawieniach.';return;}if(jRemClip)jRemClip.play().catch(()=>{});else comicSound();},'preview-rem'),jButton('Usuń moje nagranie',()=>{jRemClip?.pause();jRemClip=null;try{localStorage.removeItem('halloween.remVoice.v1');}catch{}label.textContent='Usunięto. Rem korzysta z dźwięku domyślnego.';},'delete-rem'));return box;
 }
 function jStoreVoice(data,label){if(typeof data!=='string'||!data.startsWith('data:audio/')){label.textContent='Nieobsługiwany format dźwięku.';return;}jRemClip?.pause();jRemClip=new Audio(data);try{localStorage.setItem('halloween.remVoice.v1',data);label.textContent='Dźwięk Rema zapisany wyłącznie w tej przeglądarce.';}catch{label.textContent='Dźwięk działa w tej sesji; lokalny zapis jest niedostępny.';}}
 function jCaptureAnimalCheckpoint(){
  if(chapter.quiz.round!==1||journey.animal||journey.preAnimal)return;const state=jSnapshot();state.preAnimal=null;journey.preAnimal={journey:state,players:jClone(play.players),chapter:chapterSnapshot()};
 }
 function jBackBeforeAnimal(){
  const pre=journey.preAnimal;jCredits.hidden=true;jBootRoom('walk');
  if(pre){jRestore(pre.journey);journey.preAnimal=pre;play.players=jClone(pre.players);for(const key of ['active','phase','victim','seated','used','quiz'])if(Object.hasOwn(pre.chapter,key))chapter[key]=jClone(pre.chapter[key]);}
  journey.finished=false;journey.ending=null;journey.animal=null;journey.arenaChallenge=null;journey.arenaElapsed=0;journey.flags.arenaFailed=false;journey.zone=null;
  chapter.quiz.round=1;chapter.quiz.answers[1]={aleks:null,sandra:null};chapter.quiz.complete=false;chapter.quiz.animal=null;chapter.quiz.cursor={aleks:0,sandra:0};chapter.seated={aleks:true,sandra:true};openQuiz();
 }
 function jValidateSave(s){
  if(!s||typeof s!=='object'||![null,'room','court','training','zoo','road','antechamber','arena','dawn','hospital'].includes(s.zone))return false;
  if(!['walk','duel','burial','epitaph','karaoke','chrupek','market','loan','iga','door','training','zoo-ready','zoo','phone','unseal','return','debt-fight','clones','trance','prepare','boss','retry','ritual','ending-talk','last-escape','pigeon-fall','betrayal-run','aftercredits','credits'].includes(s.mode))return false;
  if(!Number.isFinite(s.clock)||s.clock<0||!Number.isFinite(s.at)||!s.flags||typeof s.flags!=='object'||!s.used||typeof s.used!=='object')return false;
  for(const name of ['hp','maxHP','attackAt','dodgeAt','invul','specialAt'])if(!Array.isArray(s[name])||s[name].length!==2||s[name].some(x=>!Number.isFinite(x)))return false;
  if(s.maxHP.some(x=>x<=0)||s.hp.some((x,i)=>x<0||x>s.maxHP[i]))return false;
  if(!Array.isArray(s.mobs)||s.mobs.length>80||!Array.isArray(s.hazards)||s.hazards.length>12||!Array.isArray(s.pickups)||!Array.isArray(s.feathers)||!Array.isArray(s.collected))return false;
  for(const m of s.mobs)if(!m||!['x','z','hp','maxHP','next'].every(k=>Number.isFinite(m[k]))||Math.abs(m.x)>30||Math.abs(m.z)>100)return false;
  if(['karaoke','epitaph','market','iga','clones','trance'].includes(s.mode)&&!s.mini)return false;if(s.mode==='boss'&&(!s.boss||!Number.isFinite(s.boss.hp)))return false;if(s.mode==='ritual'&&(!s.ritual||![0,1,2].includes(s.ritual.phase)))return false;
  return true;
 }
 function jButton(label,fn,id,owner){const generation=journey,mode=journey.mode;const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.jaction=id;if(owner)b.dataset.owner=owner;b.onclick=()=>{if(b.isConnected&&generation===journey&&mode===journey.mode)fn();};return b;}
 function jUI(){
  const mode=journey.mode,m=journey.mini,r=journey.ritual;jPanel.dataset.scene=mode;if(!['epitaph','karaoke','market','loan','iga','clones','ritual','retry'].includes(mode)){if(!jPanel.hidden)jPanel.hidden=true;return;}
  if(dialogue.active){jPanel.hidden=true;return;}
  const stamp=JSON.stringify([mode,m?.row,m?.words,m?.cursor,m?.error,m?.attempt,m?.hits,m?.removed,m?.micMessage,Math.floor(mode==='karaoke'?(journey.clock-m.start)*4:0),mode==='market'?Math.floor(journey.clock):0,mode==='market'?m?.clicks:0,r]);if(stamp===jUIStamp)return;jUIStamp=stamp;
  const focused=document.activeElement?.dataset?.jaction;jPanel.hidden=false;jPanel.replaceChildren();const h=document.createElement('h2'),body=document.createElement('pre');jPanel.append(h,body);
  if(mode==='epitaph'){
   h.textContent='EPITAFIUM · trzy wersy';const name=journey.buried==='sandra'?'Sandra':'Aleks',lines=[[`Tu leży ${name},`,'bo los','się pomylił.'],['W grobie było ciemno,','ale Wi-Fi','działało.'],['Proszę nie budzić,','chyba że','na quiz.']],words=lines[m.row],order=[words[2],words[0],words[1]];
   body.textContent=`Wers ${m.row+1}/3\n${m.words.map(i=>order[i]).join(' ')}\n${m.error||''}`;
   order.forEach((word,i)=>{const button=jButton(`${i+1}. ${word}`,()=>jEpitaphWord(i),'word-'+i);button.setAttribute('aria-pressed',String(i===(m.cursor||0)));jPanel.append(button);});
   if(journey.clock-m.started>30||selection.bag[journey.buried==='aleks'?'sandra':'aleks']?.id==='pen'){const hint=document.createElement('p');hint.textContent='Podpowiedź: '+words.join(' ');jPanel.append(hint);}
  }
  if(mode==='karaoke'){
   h.textContent='KARAOKE TOMA · GA-BRYŚ-JEST-SPO-KO';const t=journey.clock-m.start,beat=Math.floor(t),phase=t-beat,valid=t>=0&&beat<5&&Math.abs(phase-.5)<(m.attempt>=3?.46:.32);
   body.textContent=`${t<0?'Kalibracja…':valid?'>>> TERAZ <<<':'… poczekaj na impuls …'}\n${['GA','BRYŚ','JEST','SPO','KO'].map((s,i)=>i===beat?'['+s+']':s).join(' ')}\nTrafienia ${m.hits.length}/3 · próba ${m.attempt+1}\nF / ENTER: rytm. Mikrofon mierzy głośność, nie słowa.\n${m.micMessage||''}`;
   jPanel.append(jButton('Gabryś jest spoko — impuls',jKaraokeHit,'karaoke-hit'),jButton('Włącz mikrofon (opcjonalnie)',jStartMic,'karaoke-mic'),jButton('Graj bez mikrofonu',()=>{jStopMic();m.micMessage='Tryb klawiatury — pełna punktacja.';jUIStamp='';jUI();},'karaoke-key'));
  }
  if(mode==='market'){
   h.textContent='ETF / TOM CLICKER · dwa stanowiska';body.textContent=`ALEKS: W kup / S sprzedaj  |  SANDRA: PRAWY SHIFT klik\nKurs: ${m.price.toFixed(1)} · gotówka: ${m.cash.toFixed(0)}\nAkcje: ${m.shares} · kliknięcia: ${m.clicks} · boost ×${m.boost}\nClicker: ${(m.money/1e9).toFixed(2)} / 4 mld · Portfel: ${(m.cash+m.shares*m.price).toFixed(0)} / 1100\nCzas: ${Math.ceil(m.deadline-journey.clock)} s`;
   jPanel.append(jButton('Aleks: kup',()=>jMarket('buy'),'market-buy','aleks'),jButton('Aleks: sprzedaj',()=>jMarket('sell'),'market-sell','aleks'),jButton('Sandra: kliknij Toma',()=>jMarket('click'),'market-click','sandra'));
  }
  if(mode==='loan'){h.textContent='PRZEGLĄDARKA ASCII / GOŁĄB SZAMAN';body.textContent='+------------------------------------------+\n| POŻYCZKA ZATWIERDZONA                    |\n| RRSO: nie pytaj. Dług: 10 świecących piór.|\n| Spłata: 3 Goon Room + 3 zoo + 4 droga.    |\n+------------------------------------------+';jPanel.append(jButton('Przyjmij umowę — 10 piór',jIga,'loan-accept'));}
  if(mode==='iga'){
   h.textContent='OSTATNIE PYTANIE · IGA';body.textContent='Jak skończy się historia Igi?\n'+(m.removed.length?'NIEPOPRAWNE — ODPOWIEDŹ USUNIĘTA.':'');
   ['Wychować ją na przykładnego człowieka.','Wychować ją na biznesmena.','Zabić Igę.','Zapewnić jej szczęśliwe życie.'].forEach((s,i)=>{if(!m.removed.includes(i))jPanel.append(jButton(`${i+1}. ${s}`,()=>jIgaChoose(i),'iga-'+i));});
  }
  if(mode==='clones'){
   h.textContent='ODNAJDŹ ORYGINAŁ';body.textContent=`Prawdziwy ma złote oczy i okrągłe źrenice O O.\nKopie: czerwone oczy X X.\n${journey.flags.cloneHint?'Kartka mówi: GAŹNIK. ZŁOTE OCZY. O O.':''}\n${Math.max(0,Math.ceil(m.deadline-journey.clock))} s · 1 / 2 / 3 lub przyciski`;
   for(let i=0;i<3;i++)jPanel.append(jButton(`Tom ${i+1} · ${i===1?'O O':'X X'}`,()=>jChooseClone(i),'clone-'+i));
  }
  if(mode==='ritual'){
   h.textContent=`MECHANIZM DYNI · ${['KSIĘŻYC','KRZYŻ','DYNIA'][r.phase]}`;body.textContent=`Cel: ${['KSIĘŻYC','KRZYŻ','DYNIA'][r.phase]} / pierścień ${[1,3,2][r.phase]}\nUstawiono: ${['KSIĘŻYC','KRZYŻ','DYNIA'][r.marker]} / ${r.ring} · Gotowi: ${r.ready[0]!==null?'ALEKS':'…'} / ${r.ready[1]!==null?'SANDRA':'…'}\nA/D: symbol · ←/→: pierścień · F + L: potwierdź do 3 s.${r.phase===2?'\nW/S i ↑/↓: unikajcie fal.':''} ${r.error||''}`;
   jPanel.append(jButton('Aleks: następny symbol',()=>{r.marker=(r.marker+1)%3;jUIStamp='';},'ritual-symbol','aleks'),jButton('Sandra: obróć',()=>{r.ring=(r.ring+1)%4;jUIStamp='';},'ritual-ring','sandra'),jButton('Aleks: potwierdź',()=>jRitualConfirm(0),'ritual-a','aleks'),jButton('Sandra: potwierdź',()=>jRitualConfirm(1),'ritual-s','sandra'));
  }
  if(mode==='retry'){h.textContent='OBOJE POWALENI';body.textContent='Wracacie do początku tej próby. Ekwipunek i historia zostają.';jPanel.append(jButton('Ponów etap',jRetry,'retry'));}
  (focused?jPanel.querySelector(`[data-jaction="${focused}"]`):null)?.focus({preventScroll:true});
 }
 function jRetry(){const mode=journey.flags.retryMode;journey.hp=[...journey.maxHP];journey.invul=[journey.clock+3,journey.clock+3];if(mode==='ritual'){journey.hazards=[];journey.ritual.ready=[null,null];journey.ritual.waveReadyAt=journey.clock+5;journey.flags.nextRitualWave=journey.clock+.2;jMode('ritual');return;}if(mode==='boss'){jBoss();return;}if(mode==='trance'){jStartTrance();return;}if(mode==='debt-fight'){journey.mobs=[];jSpawnMob('Dłużny gołąb',0,-7,75);jMode(mode);return;}if(mode==='zoo'){jZoo();return;}if(mode==='training'){jTraining();return;}jReturnRoad();}
 function jHUDUpdate(){
  if(!play.active||selection.active||journey.finished||journey.mode==='aftercredits'){jHUD.hidden=true;return;}jHUD.hidden=false;
  const status=journey.mode==='boss'?`TOM ${Math.ceil(journey.boss.hp)} / ${journey.boss.maxHP}`:journey.mode==='zoo'?`ZOO ${Math.max(0,Math.ceil(journey.zoo.deadline-journey.clock))} s`:journey.debt&&!journey.paid?`PIÓRA ${journey.collected.length}/10`:journey.mode==='duel'?`TRAFIENIA ${journey.mini.hits.join(' : ')}`:'';
  const stamp=[journey.hp.map(Math.ceil),journey.weapon,journey.armor,status,journey.arenaChallenge?.counts,Math.floor(journey.clock*3),jSettings.showFPS].join('|');if(stamp===jHUDStamp)return;jHUDStamp=stamp;
  jHUD.replaceChildren();for(let i=0;i<2;i++){const div=document.createElement('div'),bar=document.createElement('progress');bar.max=journey.maxHP[i];bar.value=journey.hp[i];div.append(bar,document.createTextNode(`${i?'SANDRA':'ALEKS'} ${Math.ceil(journey.hp[i])} HP · ${J_WEAPONS[journey.weapon[i]]?.name||'pięści'} / ${J_ARMORS[journey.armor[i]]||'brak pancerza'}\n${jKeyName(i?'ShiftRight':'Space')}: atak · ${jKeyName(i?'ControlRight':'ShiftLeft')}: unik · ${status} · Unik: ${Math.max(0,1.8-(journey.clock-journey.dodgeAt[i])).toFixed(1)} s · Zdolność: ${Math.max(0,10-(journey.clock-journey.specialAt[i])).toFixed(0)} s`));if(journey.arenaChallenge)div.append(document.createElement('br'),document.createTextNode(`ZAMIAUCZ: ${journey.arenaChallenge.counts[i]}/3 · ${Math.max(0,Math.ceil(60-(journey.arenaChallenge.elapsed||0)))} s · ${i?'L':'F'}`));jHUD.append(div);}
  if(jSettings.showFPS){const a=frameIntervals.slice(-40),fps=a.length?1000/(a.reduce((x,y)=>x+y,0)/a.length):0;jHUD.lastChild.append(document.createElement('br'),document.createTextNode(`${fps.toFixed(1)} FPS · raster ${W}×${H}`));}
 }
 function jSaveSettings(){if(jSettings.muted){window.speechSynthesis?.cancel();audio?.suspend();jRemClip?.pause();}else if(audioEnabled&&!paused){audio?.resume();}try{localStorage.setItem('halloween.settings.v1',JSON.stringify(jSettings));}catch{}size();}
 let jCapture=null;
 function jPauseToggle(){
  if(!detail.hidden)return;const open=jPause.hidden;jPause.hidden=!open;paused=open;if(open)audio?.suspend();else if(audioEnabled&&!jSettings.muted)audio?.resume();if(!open&&jRecording?.recorder.state==='recording')jRecording.recorder.stop();clearMovement();jHeld.clear();lastTick=performance.now();if('speechSynthesis' in window){if(open)speechSynthesis.pause();else if(!jSettings.muted)speechSynthesis.resume();}if(open){jPauseRender();jPause.querySelector('button')?.focus();}else view.focus({preventScroll:true});
 }
 function jPauseRender(){
  jPause.replaceChildren();const title=document.createElement('h2');title.textContent='PAUZA / STEROWANIE';jPause.append(title,jButton('Wróć do gry',jPauseToggle,'resume'));
  const quality=document.createElement('select');quality.setAttribute('aria-label','Jakość');for(const id of ['auto','low','balanced','high']){const o=document.createElement('option');o.value=id;o.textContent=id.toUpperCase();quality.append(o);}quality.value=jSettings.quality;quality.onchange=()=>{jSettings.quality=quality.value;jSaveSettings();};jPause.append(quality);
  for(const [key,label] of [['easy','Łatwiejsza walka'],['pressure','Presja czasu wyboru'],['showFPS','Pokaż rzeczywiste FPS'],['muted','Wycisz dźwięki i głosy']]){const l=document.createElement('label'),c=document.createElement('input');c.type='checkbox';c.checked=jSettings[key];c.onchange=()=>{jSettings[key]=c.checked;jSaveSettings();};l.append(c,document.createTextNode(label));jPause.append(l);}
  const instruction=document.createElement('p');instruction.textContent='Kliknij przypisanie i naciśnij nowy klawisz. Artefakty pozostają prywatne. Liście F/L i facepalmy G/K nie wpływają na historię.';jPause.append(instruction);
  const list=document.createElement('div');list.className='bindings';for(const [canonical,physical] of Object.entries(jSettings.bindings))list.append(jButton(`${canonical} → ${physical}`,()=>{jCapture=canonical;instruction.textContent='Naciśnij nowy klawisz dla '+canonical+'. Escape anuluje.';},'bind-'+canonical));jPause.append(list,jButton('Przywróć domyślne klawisze',()=>{jSettings.bindings={...jDefaultBindings};jSaveSettings();jPauseRender();},'bindings-reset'));
  const test=document.createElement('pre');test.id='ghosting-result';test.textContent='Test wieloklawiszowości: trzymaj W+D+Spację oraz ↑+←+Prawy Shift.\nWidać tylko zdarzenia otrzymane od sprzętu — nie da się programowo udowodnić, że brakujący klawisz został fizycznie wciśnięty.';jPause.append(test,jVoiceControls());
 }
 function jKey(e){
  if(e.code==='Escape'&&!e.repeat&&detail.hidden){e.preventDefault();e.stopImmediatePropagation();if(jCapture){jCapture=null;jPauseRender();}else jPauseToggle();return true;}
  if(!jPause.hidden){e.stopImmediatePropagation();if(jCapture&&!['MetaLeft','MetaRight'].includes(e.code)){if(!jValidBinding(e.code)){jPause.querySelector('h2').textContent='Ten klawisz jest zarezerwowany. Wybierz inną literę lub cyfrę.';return true;}if(Object.values(jSettings.bindings).includes(e.code)&&jSettings.bindings[jCapture]!==e.code){jPause.querySelector('h2').textContent='KONFLIKT — klawisz ma już inne działanie';}else{jSettings.bindings[jCapture]=e.code;jCapture=null;jSaveSettings();jPauseRender();}e.preventDefault();}else{jGhostKeys.add(e.code);const d=jPause.querySelector('#ghosting-result');if(d)d.textContent='Odebrane: '+[...jGhostKeys].join(' + ');}return true;}
  if(e.code==='KeyR'&&!e.repeat&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&detail.hidden){e.preventDefault();e.stopImmediatePropagation();replay.click();return true;}
  if(!play.active||selection.active||dialogue.active||act.busy||chapter.quiz.open||!detail.hidden||journey.finished)return false;
  if(e.metaKey||e.altKey||e.ctrlKey&&e.code!=='ControlRight'&&!jHeld.has('ControlRight'))return false;
  const mapped=Object.keys(jSettings.bindings).find(k=>jSettings.bindings[k]===e.code),code=mapped||e.code;
  if(!mapped&&Object.hasOwn(jSettings.bindings,e.code)){e.preventDefault();e.stopImmediatePropagation();return true;}jHeld.add(code);
  const consume=()=>{e.preventDefault();e.stopImmediatePropagation();return true;};
  if(journey.arenaChallenge&&!e.repeat&&['KeyF','KeyL'].includes(code)){const i=code==='KeyF'?0:1;journey.arenaChallenge.counts[i]++;speak('Miau',false,i?'Sandra':'Aleks');return consume();}
  if(e.code==='Tab'&&jLocks()){const buttons=[...jPanel.querySelectorAll('button:not(:disabled)')],index=buttons.indexOf(document.activeElement);buttons[(index+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();return consume();}
  if(journey.mode==='epitaph'&&!e.repeat){if(['Digit1','Digit2','Digit3'].includes(code))jEpitaphWord(Number(code.slice(-1))-1);else if(['KeyF','Enter','KeyL'].includes(code))jEpitaphWord(journey.mini.cursor||0);else if(['KeyW','ArrowUp','KeyA'].includes(code))journey.mini.cursor=((journey.mini.cursor||0)+2)%3;else if(['KeyS','ArrowDown','KeyD'].includes(code))journey.mini.cursor=((journey.mini.cursor||0)+1)%3;jUIStamp='';return consume();}
  if(journey.mode==='karaoke'){if(!e.repeat&&['KeyF','Enter','Space'].includes(code))jKaraokeHit();return consume();}
  if(journey.mode==='market'){if(!e.repeat){if(code==='KeyW')jMarket('buy');if(code==='KeyS')jMarket('sell');if(['ShiftRight','KeyL'].includes(code))jMarket('click');}return consume();}
  if(journey.mode==='loan'){if(!e.repeat&&['Enter','KeyF','KeyL'].includes(code))jIga();return consume();}
  if(journey.mode==='iga'){if(!e.repeat&&/^Digit[1-4]$/.test(code))jIgaChoose(Number(code.slice(-1))-1);return consume();}
  if(journey.mode==='clones'){if(!e.repeat&&/^Digit[1-3]$/.test(code))jChooseClone(Number(code.slice(-1))-1);if(!e.repeat&&['KeyX','Period'].includes(code))jAbility(code==='KeyX'?0:1);return consume();}
  if(journey.mode==='ritual'){if(!e.repeat){const r=journey.ritual;if(r.phase===2&&['KeyW','KeyS','ArrowUp','ArrowDown'].includes(code))play.keys.add(code);if(['KeyA','KeyD',...(r.phase===2?[]:['KeyW','KeyS'])].includes(code))r.marker=(r.marker+(code==='KeyA'||code==='KeyW'?2:1))%3;if(['ArrowLeft','ArrowRight',...(r.phase===2?[]:['ArrowUp','ArrowDown'])].includes(code))r.ring=(r.ring+(code==='ArrowLeft'||code==='ArrowUp'?3:1))%4;if(code==='KeyF')jRitualConfirm(0);if(['KeyL','Enter'].includes(code))jRitualConfirm(1);jUIStamp='';}return consume();}
  if(journey.mode==='retry'){if(!e.repeat&&code==='Enter')jRetry();return consume();}
  if(journey.mode==='phone'&&['KeyW','KeyS'].includes(code)){if(!e.repeat){journey.phoneClip=(journey.phoneClip+1)%3;jUIStamp='';}return consume();}
  if(journey.mode==='betrayal-run'&&code.startsWith('Arrow'))return consume();
  if(journey.mode==='trance'&&code.startsWith('Arrow')){if(!e.repeat){const m=journey.mini;if(code===m.sequence[m.progress])m.progress++;else m.progress=Math.max(0,m.progress-1);if(m.progress===m.sequence.length)jBeforeBoss();}return consume();}
  if(jLocks())return consume();
  if(['Space','ShiftRight'].includes(code)){if(!e.repeat)jAttack(code==='Space'?0:1);return consume();}
  if(['ShiftLeft','ControlRight'].includes(code)){if(!e.repeat)jDodge(code==='ShiftLeft'?0:1);return consume();}
  if(journey.zone&&['KeyX','Period'].includes(code)){if(!e.repeat)jAbility(code==='KeyX'?0:1);return consume();}
  if(movementCodes.has(code)){if(!journey.arenaChallenge&&!(journey.mode==='trance'&&code.startsWith('Arrow')))play.keys.add(code);return consume();}
  if(code!==e.code&&['KeyX','Period'].includes(code)){if(!e.repeat)useItem(code==='KeyX'?'aleks':'sandra');return consume();}
  if(code!==e.code&&['KeyE','Enter'].includes(code)){if(!e.repeat)requestInteraction(code==='Enter'?'sandra':'aleks');return consume();}
  return false;
 }
 function jKeyUp(e){const code=Object.keys(jSettings.bindings).find(k=>jSettings.bindings[k]===e.code)||e.code;jHeld.delete(code);jGhostKeys.delete(e.code);play.keys.delete(code);}
 const jTerrain=new Map(),jGeometry=new Map(),jInstances=new Map();let jViews=[];
 function jStatic(key,draw){let faces=jGeometry.get(key);if(!faces){const previous=meshCapture;meshCapture=[];draw();faces=meshCapture;meshCapture=previous;jGeometry.set(key,faces);}for(const f of faces)meshFace(f.points,f.color);}
 function jTomInstance(key,x,y,z,scale,draw=null){
  let instance=jInstances.get(key);if(!instance){const previous=meshCapture;meshCapture=[];if(draw)draw();else drawTom(0,0,0,scale);const captured=meshCapture;meshCapture=previous;const vertices=new Map();const point=p=>{let q=vertices.get(p);if(!q){q={x:p.x,y:p.y,z:p.z,localX:p.x,localY:p.y,localZ:p.z};vertices.set(p,q);}return q;};instance={faces:captured.map(f=>({points:f.points.map(point),color:f.color})),vertices:[...vertices.values()],position:null};jInstances.set(key,instance);}
  if(!instance.position||instance.position.x!==x||instance.position.y!==y||instance.position.z!==z){for(const p of instance.vertices){p.x=p.localX+x;p.y=p.localY+y;p.z=p.localZ+z;}instance.position={x,y,z};}
  for(const f of instance.faces){if(f.points.moonShade===undefined)f.points.moonShade=.45+.55*Math.max(0,dot(norm(cross(sub(f.points[1],f.points[0]),sub(f.points[2],f.points[0]))),moonDirection));meshFace(f.points,f.color);}
 }
 function jFloor(zone){
  let tiles=jTerrain.get(zone);if(!tiles){tiles=[];for(let row=0;row<19;row++)for(let col=0;col<10;col++){const id=row*10+col,x=-11+col*2.2+(row%2)*.3,z=4-row*1.6,w=2.0+hash(id)*.15,d=1.32+hash(id+44)*.18;tiles.push([v(x,-1.5,z),v(x+w,-1.5,z-.08),v(x+w-.09,-1.5,z-d),v(x+.12,-1.5,z-d-.05)]);}jTerrain.set(zone,tiles);}for(let i=0;i<tiles.length;i++)groundPolygon(tiles[i],zone==='road'?(i%5?'#29323b':'#39434a'):(i%4?'#202b34':'#35414a'),'#0d1720');
 }
 function jCircle(x,z,r,color,steps=30){const points=[];for(let i=0;i<steps;i++){const a=i/steps*Math.PI*2;points.push(v(x+Math.cos(a)*r,-1.47,z+Math.sin(a)*r));}groundPolygon(points,color);}
 function jRect(x,z,w,d,color){groundPolygon([v(x-w/2,-1.47,z-d/2),v(x+w/2,-1.47,z-d/2),v(x+w/2,-1.47,z+d/2),v(x-w/2,-1.47,z+d/2)],color);}
 function jSeal(x,z,scale=1){meshEllipsoid(v(x,-1.09,z),.42*scale,.36*scale,.82*scale,[139,161,175]);meshEllipsoid(v(x,-.78,z+.49*scale),.31*scale,.31*scale,.30*scale,[171,190,200]);for(const side of [-1,1]){meshLimb(v(x+side*.32*scale,-1.13,z),v(x+side*.70*scale,-1.37,z+.30),.11,.045,[110,137,154],5);meshEllipsoid(v(x+side*.11*scale,-.72,z+.76*scale),.035,.04,.025,[25,34,44]);}meshEllipsoid(v(x,-.84,z+.80*scale),.07,.04,.04,[43,52,59]);}
 function jClonePosition(i){const a=journey.clock*(journey.flags.cloneHint?.13:.55)+i*Math.PI*2/3;return {x:Math.sin(a)*4.8,z:-9+Math.cos(a)*2.2};}
 function jRing(x,y,z,r,angle,color){for(let i=0;i<24;i++){const a=i/24*Math.PI*2,b=(i+1)/24*Math.PI*2;meshLimb(v(x+Math.cos(a)*r,y,z+Math.sin(a)*r),v(x+Math.cos(b)*r,y,z+Math.sin(b)*r),.035,.035,color,4);}meshLimb(v(x+Math.sin(angle)*r*.68,y+.03,z+Math.cos(angle)*r*.68),v(x+Math.sin(angle)*r,y+.03,z+Math.cos(angle)*r),.09,.06,[213,223,199],4);}
 function jRitualGeometry(){const r=journey.ritual;for(let i=0;i<3;i++){const x=(i-1)*4,selected=i===r.marker,c=selected?[196,214,194]:[125,154,165];jCircle(x,-7,1.5,selected?'#617e76':'#2e404e');meshBox(x,-1.45,-7,1.8,.23,1.8,[113,139,151]);jRing(x,-1.16,-7,1.18,r.ring*Math.PI/2,c);if(i===0){for(let k=0;k<12;k++){const a=-Math.PI*.65+k/11*Math.PI*1.3,b=a+.14;meshLimb(v(x+Math.cos(a)*.54,-1.12,-7+Math.sin(a)*.54),v(x+Math.cos(b)*.54,-1.12,-7+Math.sin(b)*.54),.075,.075,c,4);}}else if(i===1){meshBox(x,-1.12,-7,.13,.10,1,c);meshBox(x,-1.12,-7.15,.75,.10,.13,c);}else{for(let k=0;k<5;k++){const a=k/5*Math.PI*2;meshEllipsoid(v(x+Math.cos(a)*.22,-1,-7+Math.sin(a)*.22),.30,.18,.30,c);}meshLimb(v(x,-.9,-7),v(x+.1,-.66,-7),.07,.04,[141,164,117],4);}}if(r.phase>=1)for(const side of [-1,1])actHuman(side*5,-11,[142,192,203],Math.sin(journey.clock)*.05,false,false,side>0?'sandra':'person');flushMesh();}
 function jHazardGeometry(h){const elapsed=journey.clock-h.at-h.warn,active=elapsed>=0,color=[179,190,181];
  if(h.type==='Łapa gniewu'){for(const z of h.zones){const y=active?-1.1+Math.min(.6,elapsed)*2:2.4;meshEllipsoid(v(z.x,y,z.z),.65,.22,.65,h.blocked?[144,205,182]:[135,162,145]);for(let k=0;k<4;k++)meshLimb(v(z.x+(k-1.5)*.33,y,z.z),v(z.x+(k-1.5)*.37,y-.13,z.z+.9),.17,.08,[172,190,163],5);}}
  if(h.type==='Deszcz dyni')for(const z of h.zones){const fall=active?0:Math.max(0,(1-(journey.clock-h.at)/h.warn))*7;jTomInstance('rain-pumpkin-'+h.zones.indexOf(z),z.x,fall-.7,z.z,.5,()=>jPumpkin(0,0,.5));}
  if(h.type==='Krzyżowy promień'&&active)for(const z of h.zones)meshBox(z.x,-1.4,z.z,z.w,.7,z.d,[181,209,210]);
  if(h.type==='Krypto Krach')for(let i=0;i<h.zones.length;i++){const z=h.zones[i],y=active?-1.4:1.7+(i%3)*.4,height=1+(i%3)*.7;meshBox(z.x,y,-9,z.w*.72,height,.6,[116+i%2*48,96,113]);meshLimb(v(z.x,y-.6,-9),v(z.x,y+height+.6,-9),.035,.035,color,4);}
  if(h.type==='Meimei Apokalipsa'){jStatic('meimei-boss',()=>{meshEllipsoid(v(0,1.3,-19),2.2,1.6,.8,[190,194,180]);for(const side of [-1,1]){meshPrism(side*1.3,2.4,-19,[[-.6,0],[.5,0],[side*.3,1.2]],.5,[162,172,166]);meshEllipsoid(v(side*.7,1.6,-18.3),.38,.25,.13,[183,205,132]);meshEllipsoid(v(side*.7,1.6,-18.16),.07,.20,.03,[17,26,30]);for(let k=0;k<3;k++)meshLimb(v(side*.5,.7,-18.1),v(side*(1.3+k*.2),.6+k*.16,-18),.018,.012,color,4);}meshPrism(0,1,-18.1,[[-.2,0],[.2,0],[0,-.22]],.05,[87,93,91]);});if(active)for(let i=0;i<3;i++)meshLimb(v(-7+i*5,2,-16),v(-6+i*5,-1.4,1),.09,.02,[213,220,208],5);}
  if(h.type==='Klątwa Wiedźmy'){for(const z of h.zones)for(let i=0;i<5;i++){const a=journey.clock+i/5*Math.PI*2;meshLimb(v(z.x+Math.cos(a)*z.r,-1.4,z.z+Math.sin(a)*z.r),v(z.x+Math.cos(a)*z.r,-.9,z.z+Math.sin(a)*z.r),.05,.015,[139,153,181],4);}}
  if(h.type==='Szarpnięcie czasu')jRing(0,-1.1,-8,2.5,journey.clock*2,[155,176,199]);
 }
 function jDog(x,z,demon=false,red=false){if(demon){actHuman(x,z,[138,168,169],0,false,false,'weronika');meshEllipsoid(v(x,-.01,z+.13),.05,.03,.03,[151,39,48]);return;}meshEllipsoid(v(x,-1.06,z),.32,.27,.57,[133,155,162]);meshEllipsoid(v(x,-.80,z+.43),.23,.24,.24,[171,181,182]);for(const side of [-1,1]){meshLimb(v(x+side*.20,-1.08,z+.24),v(x+side*.23,-1.47,z+.25),.07,.04,[124,144,157],5);meshLimb(v(x+side*.20,-1.08,z-.3),v(x+side*.23,-1.47,z-.35),.07,.04,[124,144,157],5);meshLimb(v(x+side*.16,-.67,z+.4),v(x+side*.26,-.45,z+.33),.07,.02,[105,124,137],5);meshEllipsoid(v(x+side*.08,-.75,z+.63),.025,.025,.02,red?[166,39,46]:[33,41,45]);}meshLimb(v(x,-1,z-.5),v(x+Math.sin(journey.clock*3)*.2,-.68,z-.85),.07,.02,[111,134,144],5);}
 function jDrawMob(m){if(m.hp<=0)return;if(m.type==='Foka'){jSeal(m.x,m.z);return;}if(m.type==='Żółw marionetka'){drawTom(m.x,-1.4,m.z,.45);return;}if(m.type.includes('wrona')||m.type.includes('gołąb')){meshEllipsoid(v(m.x,-.4+Math.sin(journey.clock*3)*.1,m.z),.3,.30,.4,[137,153,165]);for(const side of [-1,1])meshLimb(v(m.x,-.3,m.z),v(m.x+side*(.6+Math.sin(journey.clock*6)*.2),0,m.z-.3),.16,.03,[88,108,126],5);return;}if(m.type==='Kościana ręka'){for(let i=0;i<5;i++)meshLimb(v(m.x+(i-2)*.08,-1.4,m.z),v(m.x+(i-2)*.13,-.5+Math.sin(i)*.12,m.z),.06,.025,[154,168,173],5);return;}actHuman(m.x,m.z,m.type==='Cień korzeni'?[83,116,119]:[131,151,169],0,false,false);}
 function jDrawPlayer(p,i){p=jCinePlayer(p,i);if(journey.ending===6&&dialogue.index>=9&&p.id!==journey.flags.betrayer)return;
  if(journey.mode==='burial'&&p.id===journey.buried){actHuman(p.x,p.z,[144,162,181],-smooth(0,3,ambientTime-act.started)*1.8,true);return;}
  if(journey.zone==='hospital'){actHuman(i?2:-2,-4,[174,191,196],.65,true,false,i?'sandra':'person');return;}
  if(journey.ending===1&&journey.endingShot>=1){if(i===1)actHuman(3.8,-14,[173,146,124],0,true,false,'sandra');return;}
  if(i===0&&journey.seal){jSeal(p.x,p.z);return;}
  if(journey.hp[i]<=0){actHuman(p.x,p.z,i?[173,146,124]:[144,162,181],0,true);return;}
  drawPlayPerson(p,false,false);
  if(journey.armor[i]!=='none')meshEllipsoid(v(p.x,-.43,p.z-.06),.27,.35,.20,[147,174,180]);
  if(journey.weapon[i]!=='fists')meshLimb(v(p.x+.23,-.53,p.z),v(p.x+.36,-.32,p.z+.75),.035,.035,[171,184,178],5);
  if(journey.ghost===p.id)for(const side of [-1,1])meshLimb(v(p.x+side*.30,-1.2,p.z),v(p.x+side*.35,.2,p.z),.022,.01,[160,195,217],4);
 }
 function jRoomProps(){
  if(journey.zone!=='room')return;
  if(['iga','door'].includes(journey.mode)){meshBox(0,-1.48,-10,1.4,.35,1.3,[112,140,155]);for(const side of [-1,1])meshLimb(v(side*.65,-1.1,-10),v(side*.65,1.2,-10),.035,.035,[148,181,195],5);meshEllipsoid(v(0,-.65,-10),.30,.35,.25,journey.flags.igaDark?[32,42,50]:[164,192,191]);meshBox(0,1.15,-10,1.4,.12,1.3,[135,164,180]);}
  if(journey.mode==='chrupek'){const drop=(1-smooth(0,1.5,ambientTime-(journey.flags.chrupekDropAt||0)))*7;meshEllipsoid(v(0,-1.23+drop,-4),.34,.20,.65,[125,145,151]);meshEllipsoid(v(0,-1.20+drop,-3.3),.23,.16,.24,[150,163,169]);}
  if(journey.animal==='lila')jDog(4,-4);
  if(journey.mode==='market')for(const x of [-2,2]){meshBox(x,-.5,-8,.95,.75,.12,[104,147,162]);meshBox(x,-.45,-7.91,.80,.6,.03,[28,55,70]);}
  if(journey.mode==='epitaph')graveMesh(0,-10,1.8,1.7,1,[137,153,163]);
  if(journey.mode==='karaoke'){meshLimb(v(0,-1.5,-4),v(0,.1,-4),.025,.025,[153,173,183],6);meshEllipsoid(v(0,.13,-4),.08,.16,.08,[187,200,197]);}
  for(const f of journey.feathers)if(!journey.collected.includes(f.id))meshLimb(v(f.x,-1.25,f.z),v(f.x+.18,-.72,f.z+.1),.045,.015,[191,222,226],5);flushMesh();
 }
 function jRender(){
  const fullW=W;windStrength=.6;windPhase=journey.clock*.8;jViews=[];
  const split=journey.zone==='zoo'&&['zoo-ready','zoo','phone','unseal'].includes(journey.mode);
  for(let pane=0;pane<(split?2:1);pane++){
   g.save();geometryBegin();if(split){W=Math.floor(fullW/2);g.translate(pane*W,0);g.beginPath();g.rect(0,0,W,H);g.clip();}
   let c=split?play.players[pane]:partyCenter(),distance=split?10:(9.3+Math.abs(play.players[0].x-play.players[1].x)*.35)*orbit.zoom;
   if(journey.mode==='ritual'){c={x:0,z:-4};distance=12;}if(journey.ending===1&&journey.endingShot===2)c={x:0,z:-Math.min(15,dialogue.index*1.2)};
   const look=v(c.x,-.25,c.z-2),yaw=orbit.yaw,pitch=journey.mode==='ritual'?.62:Math.max(split?.40:.30,orbit.pitch);cam=v(look.x+Math.sin(yaw)*distance,look.y+Math.sin(pitch)*distance,look.z+Math.cos(yaw)*distance);forward=norm(sub(look,cam));right=norm(cross(forward,v(0,1,0)));up=norm(cross(right,forward));focal=Math.min(H*1.17,W*1.02);
   jViews.push({cam:{...cam},forward:{...forward},right:{...right},up:{...up},focal,w:W,offset:split?pane*W:0});
   g.fillStyle=journey.zone==='dawn'?'#2a3a47':'#040910';g.fillRect(0,0,W,H);
   if(!['hospital','dawn'].includes(journey.zone)){drawStars(journey.clock);drawMoon(68);}
   jFloor(journey.zone);if(journey.zone==='training'){meshBox(6,-.6,-5,2,1.3,.15,[63,97,112]);for(const side of [-1,1])meshBox(6+side*.75,-1.5,-5,.08,1,.1,[132,156,165]);flushMesh();}
   if(['road','training','antechamber','court'].includes(journey.zone))for(const t of actForest)drawTree(t,journey.clock,false);
   if(['arena','court','antechamber'].includes(journey.zone)&&!(journey.ending===6&&dialogue.index>=9)){
    for(let i=0;i<5;i++)for(const side of [-1,1]){meshBox(side*9.7,-1.5,-i*5,.18,3,.18,[95,117,135]);meshBox(side*9.7,.5,-i*5,.18,.15,1.2,[121,139,154]);}
    if(journey.zone==='arena'){const star=[];for(let i=0;i<5;i++){const a=(i*2/5)*Math.PI*2;star.push(v(Math.sin(a)*7,-1.46,-10+Math.cos(a)*7));}for(let i=0;i<5;i++)natureStroke(star[i],star[(i+1)%5],.06,'#6a2c3e');}
   }
   if(journey.zone==='zoo'){
    jStatic('zoo-architecture',()=>{meshBox(0,-1.5,-18.8,22,3,.3,[58,83,102]);for(const side of [-1,1])for(let k=0;k<5;k++)meshBox(side*9.5,-1.5,-k*4,.5,2.8,.6,[105,130,145]);for(const x of [-10,0,10])for(let k=0;k<12;k++){meshBox(x,-1.5,3-k*2,.07,1.6,.07,[98,126,143]);if(k<11)meshLimb(v(x,-.20,3-k*2),v(x,-.20,1-k*2),.035,.035,[117,141,157],4);}});for(const side of [-1,1])for(let k=0;k<5;k++)drawDeadNature({type:'grass',x:side*8.7,z:-k*4,size:.6,id:310+k});
    for(let i=0;i<5;i++)if(journey.mode!=='aftercredits'&&!journey.zoo?.greeted.includes(i))jTomInstance('zoo-'+i,i%2?7:3,-1.4,-4-i*2,.45);
    jCircle(-4,1,1.2,'#3d5555');jCircle(4,1,1.2,'#3d5555');
   }
   if(journey.zone==='hospital'){for(const x of [-2,2]){meshBox(x,-1.5,-4,1.4,.65,3,[125,160,178]);meshBox(x,-.85,-4,1.5,.18,3,[199,214,215]);meshBox(x+.9,-1.5,-5.5,.5,1.5,.4,[99,147,164]);}meshBox(0,-1.5,-10,20,5,.2,[107,153,171]);meshBox(0,.2,-9.84,1.7,.35,.08,[204,218,215]);meshBox(0,-.45,-9.82,.35,1.7,.08,[204,218,215]);}
   if(journey.zone==='dawn')meshEllipsoid(v(-7,5,-25),2,2,.4,[222,228,202]);if(journey.mode==='aftercredits'){jDog(-2,-6);jDog(2,-6,false,true);}
   for(const h of journey.hazards){jHazardGeometry(h);const active=journey.clock>=h.at+h.warn;for(const z of h.zones){const color=active?'#b44b52':'#6f3043';if(z.kind==='circle')jCircle(z.x,z.z,z.r,color);else jRect(z.x,z.z,z.w,z.d,color);}if(['Pentagram','Fala dyni'].includes(h.type)&&active){const r=(journey.clock-h.at-h.warn)*(h.type==='Fala dyni'?2.4:4);for(let i=2;i<28;i++){const a=i/30*Math.PI*2;natureStroke(v(Math.sin(a)*r,-1.4,-8+Math.cos(a)*r),v(Math.sin(a+.12)*r,-1.4,-8+Math.cos(a+.12)*r),.08,'#c95b67');}}
    if(active&&(h.type==='Rząd żółwi'||h.type==='Przemarsz klonów'))h.zones.forEach((z,i)=>jTomInstance('row-'+i,z.x,-1.4,-22+(journey.clock-h.at-h.warn)*4,.4));
   }
   flushMesh();jCinematicDecor();
   if(journey.mode==='betrayal-run'){const z=-22+((journey.clock-journey.at)%4)*6;for(let i=0;i<3;i++)jTomInstance('betrayal-'+i,(journey.flags.waveX||0)+(i-1)*1.4,-1.4,z,.5);flushMesh();}
   for(const q of journey.projectiles)if(q.active)meshLimb(v(q.x,-.4,q.z),v(q.x+.14,-.1,q.z+.08),.035,.01,[205,221,220],4);flushMesh();
   const solids=journey.mobs.filter(m=>m.hp>0).map(m=>({x:m.x,z:m.z,draw:()=>jDrawMob(m)}));
   if(['arena','antechamber'].includes(journey.zone)&&journey.mode!=='ritual'&&!(journey.ending===6&&dialogue.index>=9))solids.push({x:0,z:-16,draw:()=>jTomInstance('boss',0,-1.4-(journey.ending===4&&dialogue.index>=9?4*(dialogue.index===9?jShotProgress():1):0),-16,2.0)});
   if(journey.mode==='clones')for(let i=0;i<3;i++){const p=jClonePosition(i);solids.push({x:p.x,z:p.z,draw:()=>{jTomInstance('clone-'+i,p.x,-1.4,p.z,1);for(const side of [-1,1])meshEllipsoid(v(p.x+side*.19,.36,p.z+.64),.09,.08,.04,i===1?[224,201,126]:[181,43,52]);}});}
   if(journey.animal==='lila'&&!(journey.ending===5&&dialogue.index>=13)){const exit=journey.ending===7&&dialogue.index>=7,t=dialogue.index===7?jShotProgress():1,lx=journey.ending===5?0:exit?mix(4,0,t):4,lz=journey.ending===5?-10:exit?mix(-8,-14,t):-8;solids.push({x:lx,z:lz,draw:()=>jDog(lx,lz,journey.lilaDemon)});}
   for(const e of journey.echoes)if(journey.mode==='boss'&&!e.freed)solids.push({x:e.x,z:e.z,draw:()=>{meshBox(e.x,-1.5,e.z,.15,2.7,.15,[141,163,178]);meshBox(e.x,.55,e.z,1.3,.15,.2,[141,163,178]);actHuman(e.x,e.z,[115,148,172],.25,false,false,e.id%2?'sandra':'person');}});
   for(const e of journey.echoRuns){const progress=clamp((journey.clock-e.at)/1.5);if(progress<1)actHuman(mix(e.x,0,progress),mix(e.z,-16,progress),[184,218,220],0,false,false);}
   for(let i=0;i<2;i++)if(journey.mode!=='aftercredits'&&(!split||pane===i))solids.push({x:play.players[i].x,z:play.players[i].z,draw:()=>jDrawPlayer(play.players[i],i)});
   if(journey.ending===1&&journey.endingShot>=1){solids.push({x:0,z:-18,draw:()=>{meshBox(0,-1.5,-18,.24,3.7,.24,[118,138,151]);meshBox(0,1.4,-18,2,.2,.25,[118,138,151]);actHuman(0,-17.8,[144,162,181],1.1,false,false);}});if(journey.endingShot===2){const z=-Math.min(15,dialogue.index*1.2);solids.push({x:-.7,z,draw:()=>actHuman(-.7,z,[122,149,170],0,false,false)},{x:.7,z,draw:()=>actHuman(.7,z,[171,147,140],0,false,false,'sandra')});}}
   solids.sort((a,b)=>dot(sub(v(b.x,0,b.z),cam),forward)-dot(sub(v(a.x,0,a.z),cam),forward));for(const s of solids){s.draw();flushMesh();}
   for(const f of journey.feathers)if(!journey.collected.includes(f.id))meshLimb(v(f.x,-1.28,f.z),v(f.x+.2,-.65,f.z+.1),.055,.015,[186,219,225],5);
   for(const p of journey.pickups)if(!journey.used[p.id]){meshBox(p.x,-1.5,p.z,.7,.5,.6,[111,147,157]);meshLimb(v(p.x,-.9,p.z),v(p.x+.25,-.3,p.z),.07,.025,[202,216,202],5);}flushMesh();
   if(journey.mode==='unseal'&&journey.flags.sealSkin){const p=journey.flags.sealSkin;meshEllipsoid(v(p.x,-1.45,p.z),.55,.03,.85,[77,109,128]);flushMesh();}
   if(journey.mode==='burial'){const p=play.players.find(p=>p.id===journey.buried);graveMesh(p.x,p.z-.6,1.3,1.2,1,[144,162,176]);flushMesh();}
   if(journey.mode==='ritual')jRitualGeometry();
   if(journey.mode==='last-escape'&&journey.clock-journey.at>32){g.fillStyle=`rgba(0,0,0,${clamp((journey.clock-journey.at-32)/16)})`;g.fillRect(0,0,W,H);}if(journey.flags.escapeFlash&&ambientTime-journey.flags.escapeFlash<.7){g.fillStyle='rgba(190,206,213,'+(.7-(ambientTime-journey.flags.escapeFlash))+')';g.fillRect(0,0,W,H);}g.restore();
  }W=fullW;
 }
 function jSharp(){
  if(!journey.zone||journey.zone==='room')return;for(const camera of jViews){const project=p=>{const dx=p.x-camera.cam.x,dy=p.y-camera.cam.y,dz=p.z-camera.cam.z,z=dx*camera.forward.x+dy*camera.forward.y+dz*camera.forward.z;if(z<.16)return null;const k=camera.focal/z;return {x:(camera.offset+camera.w/2+(dx*camera.right.x+dy*camera.right.y+dz*camera.right.z)*k)*view.width/W,y:(H/2-(dx*camera.up.x+dy*camera.up.y+dz*camera.up.z)*k)*view.height/H};};
   out.save();out.beginPath();out.rect(camera.offset*view.width/W,0,camera.w*view.width/W,view.height);out.clip();out.strokeStyle='#e2767e';out.fillStyle='#f3b6b2';out.lineWidth=1.4*dpr;out.font=`${Math.round(12*dpr)}px Consolas,monospace`;
   const warnings=[...journey.hazards,...journey.mobs.filter(m=>m.windup&&m.hp>0).map(m=>({type:m.type,at:m.windup.at,warn:1.2,zones:[{kind:'circle',x:m.windup.x,z:m.windup.z,r:1.8}]}))];
   for(const h of warnings){for(const z of h.zones){const points=[];if(z.kind==='circle'){for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;points.push(project(v(z.x+Math.cos(a)*z.r,-1.43,z.z+Math.sin(a)*z.r)));}}else points.push(...[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]].map(([x,k])=>project(v(z.x+x*z.w/2,-1.43,z.z+k*z.d/2))));if(points.some(p=>!p))continue;out.beginPath();points.forEach((p,i)=>i?out.lineTo(p.x,p.y):out.moveTo(p.x,p.y));out.stroke();const center=project(v(z.x,-.8,z.z));if(center)out.fillText(`! ${h.type} ${Math.max(0,h.warn-(journey.clock-h.at)).toFixed(1)}`,center.x-30*dpr,center.y);}}
   if(journey.zone==='training'){const q=project(v(6,.25,-4.88));if(q){out.fillStyle='#c7d7c4';out.fillText('2 + 2 = ?',q.x-35*dpr,q.y);}}if(journey.mode==='clones')for(let i=0;i<3;i++){const p=jClonePosition(i),q=project(v(p.x,1.35,p.z));if(q){out.fillStyle=i===1?'#e7d598':'#d87985';out.fillText((i+1)+'  '+(i===1?'OO':'XX'),q.x-12*dpr,q.y);}}out.restore();
  }
  if(journey.zone==='zoo'&&journey.mode==='phone'){out.save();out.fillStyle='#081119f4';out.fillRect(15*dpr,view.height*.15,view.width*.44,view.height*.53);out.fillStyle='#bccbc5';out.font=`${14*dpr}px Consolas,monospace`;const titles=['5 SPOSOBÓW NA UCIECZKĘ Z CMENTARZA','POV: DZIEWCZYNA UTKNĘŁA Z ŻÓŁWIAMI','BORYS WYJAŚNIA ETF W 12 SEKUND'];[titles[journey.phoneClip],'','   /\\_/\\','  ( o.o )','   > ^ <','','W / S — przewiń','Żaden poradnik nie pomógł.'].forEach((line,i)=>out.fillText(line,30*dpr,view.height*.2+i*24*dpr));out.restore();}
 }
 function jSnapshot(){return jClone(journey);}
 function jRestore(data){if(!data||typeof data!=='object')return;journey={...jInitial(),...jClone(data)};jHeld.clear();jUIStamp='';jHUDStamp='';jCredits.hidden=true;if(journey.mode==='retry')jMode('retry');else jUI();jHUDUpdate();}
 function jResolution(intro=false){return jSettings.quality==='low'?600:jSettings.quality==='balanced'?800:jSettings.quality==='high'?(intro?1120:1000):Math.round((intro?1120:960)*jScale);}
 let jBudgetSince=0,jBudgetDirection=0,jBudgetLast=0;function jBudget(ms){jFrameCost=jFrameCost*.95+ms*.05;if(jSettings.quality!=='auto')return;const now=performance.now(),direction=jFrameCost>26?-1:jFrameCost<12?1:0;if(direction!==jBudgetDirection){jBudgetDirection=direction;jBudgetSince=now;}if(direction&&now-jBudgetSince>2500&&now-jBudgetLast>6000){const next=direction<0?.7:1;if(next!==jScale){jScale=next;jBudgetLast=now;size();}}}
 Object.assign(window.__NOCTURNE,{geometryState:()=>({backend:geometryGPU&&!geometryGPUFailed&&geometryGPUEnabled?'webgl2-triangles':'cpu-fallback',draws:geometryDraws,capacity:geometryVertices.length}),setGeometryBackend:id=>{geometryGPUEnabled=id!=='cpu';geometrySeen=-1;},campaignState:jSnapshot,resolveEnding:jResolve,campaignConfig:()=>jClone(JCONFIG),settingsState:()=>jClone(jSettings),campaignCheckpoint:(mode='zoo',items={aleks:'food',sandra:'tom'},state={})=>{
  window.__NOCTURNE.startPlay(items);closeDialogue();game.target='gabrys';game.visited=true;act.tool=true;act.victim='gabrys';chapter.quiz.answers=[{aleks:0,sandra:0},{aleks:1,sandra:1}];chapter.quiz.animal='lila';chapter.quiz.complete=true;
  Object.assign(journey,jClone(state));if(state.selectedGrave&&Object.hasOwn(destinations,state.selectedGrave))game.target=state.selectedGrave;if(state.trust)chapter.quiz.answers[0]={aleks:state.trust[0]?0:1,sandra:state.trust[1]?0:1};
  if(mode==='duel'||mode==='karaoke')jResurrectionBranch(mode==='duel'?'self':'sandra');
  else if(mode==='room'){jBootRoom('walk');jSeats();}
  else if(mode==='animal'){jBootRoom('walk');chapter.quiz.animal=state.animal||'lila';jAfterQuiz();}
  else if(mode==='zoo')jZoo();else if(mode==='road')jReturnRoad();else if(mode==='training')jTraining();else if(mode==='prepare'){jZone('arena');journey.lilaDemon=true;jMode('prepare');}
  else if(mode==='boss'){jZone('arena');jBoss();}else if(mode==='trance')jStartTrance();else if(mode==='ritual'){jZone('arena');jRitual();}else if(mode==='ending')jEnding(state.ending||1);
 }});

 // Only stable exploration/quiz states are persisted; callbacks and cutscenes are not saves.
 const checkpointKey='halloween.checkpoint.v1';
 const resumeCheckpointButton=document.createElement('button');
 resumeCheckpointButton.id='resume-checkpoint';resumeCheckpointButton.type='button';resumeCheckpointButton.textContent='[ WZNÓW OSTATNI CHECKPOINT ]';
 resumeCheckpointButton.style.cssText='grid-column:1/-1;justify-self:center;margin:16px;padding:12px 24px;background:#14231e;color:#d6dfcc;border:1px dashed #718e7d;font:14px Consolas,monospace;cursor:pointer';
 loadout.prepend(resumeCheckpointButton);
 const checkpointCopy=x=>JSON.parse(JSON.stringify(x));
 function readCheckpoint(){
  try{
   const raw=localStorage.getItem(checkpointKey);if(!raw||raw.length>200000)return null;
   const s=JSON.parse(raw),q=s.chapter?.quiz;if(s.game&&['Boris','Borys','borys'].includes(s.game.target))s.game.target='boris';if(s.act&&['Boris','Borys','borys'].includes(s.act.victim))s.act.victim='boris';if(s.version===2&&!jValidateSave(s.journey))return null;
   if(![1,2].includes(s.version)||!['world','house','catacombs','journey'].includes(s.play?.space)||!['explore','quiz'].includes(s.play?.stage))return null;
   if(!Number.isFinite(s.time)||!Number.isFinite(s.ambientTime)||!Array.isArray(s.play.players)||s.play.players.length!==2)return null;
   for(const [i,who] of ['aleks','sandra'].entries()){
    const p=s.play.players[i];if(p.id!==who||!['x','z','heading','walk'].every(k=>Number.isFinite(p[k]))||Math.abs(p.x)>30||Math.abs(p.z)>150)return null;
    if(!choicesFor(who).includes(s.selection?.bag?.[who]?.id))return null;
   }
   if(s.game?.target!==null&&!Object.hasOwn(destinations,s.game?.target))return null;
   if(!q||![0,1].includes(q.round)||!Array.isArray(q.answers)||q.answers.length!==2)return null;
   if(!s.chapter.seated||!Array.isArray(s.chapter.used)||!q.cursor||!q.ink)return null;
   for(const who of ['aleks','sandra'])if(typeof s.chapter.seated[who]!=='boolean'||!Number.isInteger(q.cursor[who])||q.cursor[who]<0||q.cursor[who]>3||![null,'pen','red'].includes(q.ink[who]))return null;
   for(let i=0;i<2;i++)for(const who of ['aleks','sandra'])if(q.answers[i][who]!==null&&(!Number.isInteger(q.answers[i][who])||q.answers[i][who]<0||q.answers[i][who]>(i?3:1)))return null;
   if(q.complete&&(q.answers[1].aleks===null||q.answers[1].aleks!==q.answers[1].sandra))return null;
   if(!s.act||!s.orbit||!['yaw','pitch','zoom'].every(k=>Number.isFinite(s.orbit[k])))return null;
   return s;
  }catch{return null;}
 }
 function refreshCheckpointButton(){resumeCheckpointButton.hidden=!readCheckpoint();}
 function clearCheckpoint(){try{localStorage.removeItem(checkpointKey);}catch{}refreshCheckpointButton();}
 function saveCheckpoint(){
  if(!play.active||selection.active||dialogue.active||act.busy||act.pending||!['explore','quiz'].includes(play.stage))return false;
  const scalarAct={};for(const key of Object.keys(act))if(!['pending','busy'].includes(key))scalarAct[key]=act[key];
  const snapshot={version:2,journey:jSnapshot(),savedAt:Date.now(),time,ambientTime,game:checkpointCopy(game),act:scalarAct,
   play:{space:play.space,stage:play.stage,objective:play.objective,players:play.players.map(p=>({id:p.id,x:p.x,z:p.z,heading:p.heading,walk:p.walk,moving:false})),glimpseAt:play.glimpseAt},
   selection:checkpointCopy(selection),chapter:chapterSnapshot(),orbit:{yaw:orbit.yaw,pitch:orbit.pitch,zoom:orbit.zoom}};
  try{localStorage.setItem(checkpointKey,JSON.stringify(snapshot));refreshCheckpointButton();return true;}catch{return false;}
 }
 function resumeCheckpoint(){
  const s=readCheckpoint();if(!s){refreshCheckpointButton();return false;}
  jReset();resetPlay();resetChapter();resetAct();closeDialogue();detail.hidden=true;
  for(const key of Object.keys(game))if(Object.hasOwn(s.game,key))game[key]=s.game[key];
  for(const key of Object.keys(act))if(Object.hasOwn(s.act,key)&&!['pending','busy'].includes(key))act[key]=s.act[key];
  selection.active=false;selection.bag=checkpointCopy(s.selection.bag);selection.confirmed={aleks:true,sandra:true};loadout.hidden=true;
  for(const key of ['active','phase','victim','at','avengerDown','seated','used','quiz'])if(Object.hasOwn(s.chapter,key))chapter[key]=checkpointCopy(s.chapter[key]);
  Object.assign(orbit,s.orbit,{drag:null});Object.assign(play,s.play,{active:true,players:checkpointCopy(s.play.players),camera:null});
  play.graves=makeWorldGraves();play.obstacles=worldObstacles();movementGuide.hidden=true;
  time=s.time;ambientTime=s.ambientTime;paused=false;lastTick=performance.now();frameIntervals.length=0;previousPresented=0;
  act.pending=null;act.busy=false;clearMovement();jRestore(s.journey||jInitial());size();updateInteraction();
  if(chapter.quiz.open)openQuiz();else{quizPanel.hidden=true;view.focus({preventScroll:true});}
  replay.classList.toggle('visible',!!chapter.quiz.complete);replay.tabIndex=chapter.quiz.complete?0:-1;
  return true;
 }
 resumeCheckpointButton.onclick=()=>{if(resumeCheckpoint())enableAudio(false);};
 window.addEventListener('pagehide',()=>saveCheckpoint());
 refreshCheckpointButton();
 Object.assign(window.__NOCTURNE,{saveCheckpoint,resumeCheckpoint,checkpointState:()=>readCheckpoint()});

 resetWorld();size();requestAnimationFrame(frame);
})();
