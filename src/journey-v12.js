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
