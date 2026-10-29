from pathlib import Path
import re,json
root=Path(__file__).resolve().parents[1];source=root/'index.html';base=root/'src/base.html'
if not base.exists():base.write_bytes(source.read_bytes())
s=base.read_text(encoding='utf-8')
scenario=(root/'docs/spec-v12/SCENARIUSZ/HALLOWEEN_SCENARIUSZ_V8.md').read_text(encoding='utf-8')
def section(a,b):
 start=scenario.index(a);end=scenario.index(b,start) if b else len(scenario)
 return scenario[start:end]
def lines(text):
 rows=[]
 for m in re.finditer(r'^\*\*([^\n]+?)\*\*\s*„([^”]+)”',text,re.M):
  names=re.findall(r'Aleks|Sandra|Alex \(X\)|Salsa|Dynia|Tom|Lila|Gołębie|Gabryś|Borys|Weronika',m[1])
  if names:rows.append([names[-1],m[2]])
 return rows
data={
 'e1_intro':lines(section('### E1-1.','### E1-3.')),
 'e1_tragedy':lines(section('### E1-4.','### E1-5.')),
 'e1_newPair':lines(section('### E1-5.','### E1-6.')),
 'hospital':[['Gołębie','ZAMIAUCZ! ZAMIAUCZ!'],['Sandra','Za późno! One są wszędzie!'],['Aleks','Sandra…? To szpital?'],['Sandra','Pamiętam samochód. Wyszliśmy z imprezy… potem światła.'],['Aleks','A cmentarz? Żółwie? Gołębie?'],['Sandra','Śniło mi się dokładnie to samo.'],['Aleks','To czemu oboje pamiętamy Toma?']],
 'e3':lines(section('## ENDING 3','## ENDING 4')),
 'e4':lines(section('## ENDING 4','## ENDING 5')),
 'e5':lines(section('## ENDING 5','## ENDING 6')),
 'e6':lines(section('### E6-1.','### E6-2A.'))+lines(section('### E6-2B.','### E6-3.'))+lines(section('### E6-3.','### E6-4.')),
 'e6aleks':lines(section('### E6-1.','### E6-2A.'))+lines(section('### E6-2A.','### E6-2B.'))+[x for x in lines(section('### E6-3.','### E6-4.')) if x[0]!='Sandra'],
 'e6sandra':lines(section('### E6-1.','### E6-2A.'))+lines(section('### E6-2B.','### E6-3.'))+[x for x in lines(section('### E6-3.','### E6-4.')) if x[0]!='Aleks'],
 'e7':lines(section('### E7-3.','---\n\n# DODATKOWE'))}
assert all(data.values()),[(k,len(v)) for k,v in data.items()]
(root/'assets/campaign-dialogue.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
module=(root/'src/geometry-gpu.js').read_text(encoding='utf-8')+'\n'+(root/'src/journey-v12.js').read_text(encoding='utf-8')
marker=' // Only stable exploration/quiz states are persisted;'
assert s.count(marker)==1
s=s.replace(marker,' const J_DIALOGUE='+json.dumps(data,ensure_ascii=False)+';\n'+module+'\n'+marker)
def patch(a,b):
 global s
 assert a in s,a[:150]
 s=s.replace(a,b)
patch('<meta charset="UTF-8">','<meta charset="UTF-8"><link rel="icon" href="data:,">')
patch("const glyphs=' .,:;-=+*x%#@';","const glyphs=' .,:;-=+*oO0%@';")
patch("source.getContext('2d',{willReadFrequently:true,alpha:false})","source.getContext('2d',{alpha:false})")
patch('function flushMesh(){','function flushMesh(){if(geometryDeferred&&geometryInit())return;if(geometryFlush(meshFaces)){meshFaces=[];return;}')
patch('meshFaces.push({points:projected,depth,color:','meshFaces.push({points:projected,depth,alpha:g.globalAlpha,color:')
patch('v(x-width,-1.52,z),v(x+width,-1.52,z),v(x+dx+width*1.1,-1.52,z+dz),v(x+dx-width*1.1,-1.52,z+dz)',"v(x-width,journey.zone||play.space==='catacombs'?-1.485:-1.52,z),v(x+width,journey.zone||play.space==='catacombs'?-1.485:-1.52,z),v(x+dx+width*1.1,journey.zone||play.space==='catacombs'?-1.485:-1.52,z+dz),v(x+dx-width*1.1,journey.zone||play.space==='catacombs'?-1.485:-1.52,z+dz)")
patch('function natureStroke(a,b,width,color){','function natureStroke(a,b,width,color){if(geometryStroke(a,b,width,color))return;')
patch('function drawStorm(){','function drawStorm(){geometryDrain();')
patch('function groundPolygon(points,fill,stroke){','function groundPolygon(points,fill,stroke){if(geometryGround(points,fill,stroke))return;')
patch('function drawPumpkin(t,flash){','function drawPumpkin(t,flash){if(t<=33)geometryDrain();')
patch('for(let i=0;i<390;i++){','geometryDrain();for(let i=0;i<390;i++){')
patch('sky(.08,.40,.29,.075,.38,.013,-23);','geometryDrain();sky(.08,.40,.29,.075,.38,.013,-23);')
patch("if(a&&m&&b){g.strokeStyle='#111a24';g.lineWidth=clamp(a.s*.018,.8,2);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(m.x,m.y);g.lineTo(b.x,b.y);g.stroke();}","if(a&&m&&b){if(geometryInit()){const color=geometryColor('#111a24'),width=clamp(a.s*.018,.8,2);geometryLineProjected(a,m,width,color);geometryLineProjected(m,b,width,color);}else{g.strokeStyle='#111a24';g.lineWidth=clamp(a.s*.018,.8,2);g.beginPath();g.moveTo(a.x,a.y);g.lineTo(m.x,m.y);g.lineTo(b.x,b.y);g.stroke();}}")
patch('function rasterScene(t){','function rasterScene(t){geometryBegin();')
patch("detailClose.onclick=()=>{detail.hidden=true;panel.hidden=false;","detailClose.onclick=()=>{detail.hidden=true;if(game.target&&!game.visited&&play.objective==='grave'){jGraveVisit(true);return;}panel.hidden=false;")
patch("if(e.key==='Escape'){e.preventDefault();detailClose.click()}","if(e.key==='Escape'){e.preventDefault();e.stopPropagation();detailClose.click()}")
patch("function offerMemorial(){","function offerMemorial(){jGraveVisit();return;")
patch("if(game.visited&&game.target===key)","if(game.visited&&journey.candle&&game.target===key)")
patch("['Borys','Ahh… dobra drzemka.'],['Mściciel'","['Borys','Ahh… dobra drzemka.'],jGraveReply(),['Mściciel'")
patch("Jakby Aleks umarł, to bym zapomniał po 3 sekundach.","Jakbyś umarł, Aleks zapomniałby o tobie po trzech sekundach.")
patch("Ummmm… O kurwa, naucz się kurwa grać wreszcie.","Męczyła się na studiach i nawet nie zdążyła ich skończyć. Beka XD.")
patch("Jednak Gabryś to był zajebisty ziom.","Młody, piękny milioner. Niestety milion go nie uratował przed śmiercią.")
patch("function rasterScene(t){geometryBegin();\n", "function rasterScene(t){geometryBegin();\n  if(journey.zone&&journey.zone!=='room'){jRender();return;}\n")
patch("if(!play.active)return;play.steps++;", "if(!play.active)return;play.steps++;")
patch("const free=!dialogue.active&&detail.hidden&&!act.busy&&!chapter.quiz.open&&!selection.active&&game.phase!=='complete';", "const free=!dialogue.active&&detail.hidden&&!act.busy&&!chapter.quiz.open&&!selection.active&&!jLocks()&&!journey.finished&&!journey.arenaChallenge&&game.phase!=='complete';")
patch("if(chapter.seated[p.id]){p.moving=false;return;}","if(chapter.seated[p.id]||journey.hp[i]<=0||journey.mode==='trance'&&i===1){p.moving=false;return;}")
patch("if(free)playEvents();updateInteraction();", "if(free)playEvents();jTick(dt);updateInteraction();")
patch("function blocked(x,z,space=play.space,r=.23){", "function blocked(x,z,space=play.space,r=.23){\n  if(space==='journey')return jBlocked(x,z);")
patch("if(distance>7.5&&distance>", "if(distance>jLeash()&&distance>")
patch("if(blocked(x,z)||distance<.48)continue;", "if(blocked(x,z)||journey.zone==='zoo'&&journey.mode==='zoo'&&jBlocked(x,z,p)||distance<.48)continue;")
patch("function updateInteraction(){", "function updateInteraction(){\n  if(journey.zone){const text=!dialogue.active&&!act.busy&&!jLocks()?jPrompt():'';interaction.textContent=text;interaction.hidden=!text;return;}")
patch("function requestInteraction(){", "function requestInteraction(who=null){\n  if(jInteract(who))return;")
patch("window.addEventListener('keydown',e=>{\n  if(!play.active||selection.active", "window.addEventListener('keydown',e=>{\n  if(jKey(e))return;\n  if(!play.active||selection.active")
patch("e.preventDefault();requestInteraction();", "e.preventDefault();requestInteraction(e.code==='Enter'?'sandra':'aleks');")
patch("window.addEventListener('keyup',e=>play.keys.delete(e.code));", "window.addEventListener('keyup',e=>{play.keys.delete(e.code);jKeyUp(e);});")
patch("function clearMovement(){orbit.drag=null;", "function clearMovement(){jHeld.clear();orbit.drag=null;")
patch("function finishAct(victim){\n  if(play.stage!=='verdict'||act.ending)return;act.victim=victim;", "function finishAct(victim){\n  if(play.stage!=='verdict'||act.ending)return;if(['self','sandra'].includes(victim)){act.ending='resurrection';jResurrectionBranch(victim);return;}act.victim=victim;")
patch("leaveQuiz.onclick=()=>{chapter.quiz.open=false;", "leaveQuiz.onclick=()=>{if(chapter.quiz.complete){jAfterQuiz();return;}chapter.quiz.open=false;")
patch("for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();\n }\n function tableGlyph", "jRoomProps();for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();\n }\n function tableGlyph")
patch("W=Math.round(Math.min(play.active?960:1120,", "W=Math.round(Math.min(jResolution(!play.active),")
patch("if(!paused&&now-last>=1000/30){try{", "if(!paused&&now-last>=1000/(jSettings.quality==='low'?30:60)){const renderStart=performance.now();try{")
patch("asciiFrame(time);drawWorldTypography(time);if(previousPresented)", "asciiFrame(time);drawWorldTypography(time);jSharp();jBudget(performance.now()-renderStart);if(previousPresented)")
patch("last=now-((now-last)%(1000/30));", "last=now-((now-last)%(1000/(jSettings.quality==='low'?30:60)));")
patch("replay.onclick=()=>{clearCheckpoint();", "replay.onclick=()=>{jReset();clearCheckpoint();")
patch("if(s.version!==1||!['world','house','catacombs'].includes", "if(![1,2].includes(s.version)||!['world','house','catacombs','journey'].includes")
patch("const snapshot={version:1,savedAt:", "const snapshot={version:2,journey:jSnapshot(),savedAt:")
patch("act.pending=null;act.busy=false;clearMovement();size();updateInteraction();", "act.pending=null;act.busy=false;clearMovement();jRestore(s.journey||jInitial());size();updateInteraction();")
patch("space==='catacombs'?-12:-78","space==='catacombs'?-12:space==='journey'?-25:-78")
patch("space==='catacombs'?-8:-16","space==='catacombs'?-8:space==='journey'?-10:-16")
patch("space==='catacombs'?33:65","space==='catacombs'?33:space==='journey'?41:65")
patch("space==='catacombs'?31:146","space==='catacombs'?31:space==='journey'?59:146")
patch("if(act.scene==='resurrection'||play.stage==='resurrection'){","if(act.scene==='resurrection'||play.stage==='resurrection'||journey.mode==='burial'){")
patch("if(play.active)addPlaySolids(solids);","if(play.active){addPlaySolids(solids);jWorldSolids(solids);}")
patch("function updateInteraction(){\n","function updateInteraction(){\n  if(play.active&&!dialogue.active&&!act.busy&&!journey.zone){const loot=jLootPrompt();if(loot){interaction.textContent=loot;interaction.hidden=false;return;}}\n")
patch("for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();\n }\n const destinations","jHouseLoot();for(const p of play.players)drawPlayPerson(p,false,false);flushMesh();\n }\n const destinations")
patch("act.pending=null;saveCheckpoint();}","act.pending=null;if(id==='house-table')jHouseHint();saveCheckpoint();}")
patch("run:()=>finishAct(id)","run:()=>jConfirmVictim(id)")
patch("journey.mode==='trance'&&i===1","['trance','betrayal-run'].includes(journey.mode)&&i===1")
patch("for(const who of ['aleks','sandra'])chapter.quiz.ink[who]=","jCaptureAnimalCheckpoint();for(const who of ['aleks','sandra'])chapter.quiz.ink[who]=")
patch("color=p.id==='avenger'?","color=journey.ghost===p.id?[143,189,218]:p.id==='avenger'?")
patch("/length*2.8*dt","/length*(journey.seal&&i===0?1.65:2.8)*dt")
patch("resetPlay();resetChapter();resetAct();closeDialogue();detail.hidden=true;","jReset();resetPlay();resetChapter();resetAct();closeDialogue();detail.hidden=true;")
patch("const s=JSON.parse(raw),q=s.chapter?.quiz;","const s=JSON.parse(raw),q=s.chapter?.quiz;if(s.game&&['Boris','Borys','borys'].includes(s.game.target))s.game.target='boris';if(s.act&&['Boris','Borys','borys'].includes(s.act.victim))s.act.victim='boris';if(s.version===2&&!jValidateSave(s.journey))return null;")
patch("if(!audioEnabled||!('speechSynthesis' in window))return;","if(!audioEnabled||jSettings.muted||!('speechSynthesis' in window))return;")
patch("async function enableAudio(resetIntro=true){","async function enableAudio(resetIntro=true){if(jSettings.muted)return;")
patch("if(audio)audio.resume();","if(audio&&!paused&&!jSettings.muted)audio.resume();")
patch("if('speechSynthesis' in window)speechSynthesis.resume();","if('speechSynthesis' in window&&!paused&&!jSettings.muted)speechSynthesis.resume();")
s=s.replace('function rasterScene(t){geometryBegin();','function rasterScene(t){geometryDeferred=!journey.zone||journey.zone===\"room\";try{rasterSceneBase(t);}finally{geometryDeferred=false;flushMesh();}}\n function rasterSceneBase(t){geometryBegin();',1)
# Keep the underlying save identity stable for v1 migration, and preserve all old debug APIs.
source.write_text(s,encoding='utf-8')
(root/'diagnostics/compiled-script.js').write_text(s.split('<script>')[1].split('</script>')[0],encoding='utf-8')
print('Integrated campaign extension and dialogue bank:',len(source.read_bytes()),'bytes')
