import * as T from './vendor/three.module.js';
const $=id=>document.getElementById(id), canvas=$('game');
const renderer=new T.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.setClearColor(0xa8d9e5);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
const scene=new T.Scene();scene.fog=new T.Fog(0xc9e3e9,90,280);const camera=new T.PerspectiveCamera(57,innerWidth/innerHeight,.1,650);
scene.add(new T.HemisphereLight(0xe6f7ff,0x7c9b9c,2.5));const sun=new T.DirectionalLight(0xffedcf,3.1);sun.position.set(-35,65,25);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-65,right:65,top:75,bottom:-75,near:1,far:180});sun.shadow.bias=-.0005;scene.add(sun);scene.add(sun.target);
const mat=(c,roughness=.8)=>new T.MeshStandardMaterial({color:c,roughness});const snow=mat(0xf5faf9),teal=mat(0x327f79),wood=mat(0x9b7251),dark=mat(0x35464e),gold=mat(0xffc444,.3),orange=mat(0xec7949),helmet=mat(0x41aeb8,.3),navy=mat(0x263f54),glass=mat(0x18394b,.17),white=mat(0xe9eee1),pink=mat(0xee727b),stone=mat(0x93b1bd);
function mesh(g,m,parent,x=0,y=0,z=0){const a=new T.Mesh(g,m);a.position.set(x,y,z);a.castShadow=true;a.receiveShadow=true;parent.add(a);return a;}
function box(p,m,x,y,z,w,h,d){return mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z);}
function ball(p,m,x,y,z,r,sx=1,sy=1,sz=1){const o=mesh(new T.SphereGeometry(r,16,12),m,p,x,y,z);o.scale.set(sx,sy,sz);return o;}
function cylinder(p,m,x,y,z,r,h){return mesh(new T.CylinderGeometry(r,r,h,8),m,p,x,y,z);}
let seed=893;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const ground=mesh(new T.PlaneGeometry(2000,4000),snow,scene,0,-.08,-1400);ground.rotation.x=-Math.PI/2;ground.castShadow=false;
const scenery=new T.Group();scene.add(scenery);
function tree(x,z,scale=1){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(scale);scenery.add(g);cylinder(g,wood,0,1,0,.22,2);for(let j=0;j<3;j++){const y=1.7+j*1.1,r=1.6-j*.36;mesh(new T.ConeGeometry(r,2.2,9),teal,g,0,y,0);mesh(new T.ConeGeometry(r*.94,1.8,9),snow,g,0,y+.35,0);}return g;}
function chalet(x,z,s=1){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(s);scenery.add(g);const wall=mat([0xe2c7a3,0x70a6a6,0xc8d6c5,0xd4a389][Math.floor(rand()*4)]);box(g,stone,0,.35,0,6,.7,5);box(g,wall,0,3,0,5.6,5.3,4.7);for(const xx of [-2.7,0,2.7])box(g,wood,xx,3.1,2.4,.15,5.6,.16);for(const yy of [1,3,5.5])box(g,wood,0,yy,2.4,5.7,.15,.16);for(const yy of [2,4.3])for(const xx of [-1.65,1.65]){box(g,dark,xx,yy,2.44,1.18,1.52,.15);box(g,mat(0xffe6a0),xx,yy,2.54,.94,1.27,.08);box(g,wood,xx,yy,2.62,.07,1.3,.07);box(g,wood,xx,yy,2.62,1,.08,.07);}box(g,wood,0,1.2,2.5,1,1.9,.2);const roof=mesh(new T.CylinderGeometry(0,4.65,2.6,4),snow,g,0,6.4,0);roof.rotation.y=Math.PI/4;roof.scale.z=.92;box(g,wood,1.5,6.7,-.7,.7,2,.7);box(g,snow,1.5,7.8,-.7,1,.25,1);}
for(let z=15;z>-2000;z-=14){for(const side of [-1,1]){const x=side*(15+rand()*22);tree(x,z,1+rand()*.8);if(rand()>.5)tree(side*(40+rand()*35),z-5,1.5+rand());}if(Math.abs(z)%140<14){chalet(-24,z,1.5);chalet(25,z-30,1.2);}for(const side of [-1,1]){cylinder(scenery,wood,side*13,.8,z,.14,1.6);box(scenery,wood,side*13,.55,z-7,.13,.16,14);box(scenery,wood,side*13,1.2,z-7,.13,.16,14);}}
const mountains=new T.Group();scene.add(mountains);for(let i=0;i<18;i++){const x=(i-8.5)*29,z=-190-rand()*110,h=25+rand()*45;const mountain=mesh(new T.ConeGeometry(24+rand()*20,h,6),mat(0xa4bdc9),mountains,x,h/2-8,z);mesh(new T.ConeGeometry(17,h*.62,6),snow,mountains,x,h*.69-6,z);mountain.rotation.y=rand()*5;}
for(let i=0;i<12;i++){const cloud=new T.Group();scene.add(cloud);cloud.position.set((rand()-.5)*400,65+rand()*35,-100-rand()*300);for(let j=0;j<4;j++)ball(cloud,snow,j*5,rand()*2,0,5,1.6,.5,.8);}
const skier=new T.Group();scene.add(skier);const body=new T.Group();skier.add(body);ball(body,orange,0,1.15,0,.46,1,1.1,.75);ball(body,white,-.24,.64,0,.25,.7,1.2,.8);ball(body,white,.24,.64,0,.25,.7,1.2,.8);box(body,navy,-.23,.35,0,.29,.25,.5);box(body,navy,.23,.35,0,.29,.25,.5);
const skis=[];for(const x of [-.25,.25]){const ski=box(body,pink,x,.17,-.25,.22,.09,2.2);ball(body,pink,x,.22,-1.31,.11,1,.5,1);skis.push(ski);}ball(body,helmet,0,1.95,0,.58,1,1,.94);ball(body,glass,0,2,-.4,.49,1,.4,.43);box(body,navy,0,2,.44,1.04,.13,.12);const scarf=box(body,gold,0,1.51,0,.78,.15,.74);box(body,gold,.35,1.42,.53,.2,.6,.08).rotation.x=-.5;ball(body,navy,0,1.12,.38,.35,.85,1,.4);box(body,gold,0,1.16,.54,.09,.3,.07);
for(const s of [-1,1]){const arm=ball(body,orange,s*.49,1.2,0,.23,1,1.4,1);arm.rotation.z=s*.65;ball(body,navy,s*.64,1.04,0,.16);const pole=cylinder(body,dark,s*.72,.61,.25,.025,1.15);pole.rotation.x=-.5;mesh(new T.TorusGeometry(.1,.015,4,10),dark,body,s*.72,.12,.53).rotation.x=Math.PI/2;}
const shadow=mesh(new T.CircleGeometry(.85,24),new T.MeshBasicMaterial({color:0x537d92,transparent:true,opacity:.17,depthWrite:false}),scene);shadow.rotation.x=-Math.PI/2;shadow.position.y=.015;shadow.castShadow=false;
const entities=[];function starGeometry(){const sh=new T.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,r=i%2?.3:.66;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?sh.lineTo(x,y):sh.moveTo(x,y);}sh.closePath();return new T.ExtrudeGeometry(sh,{depth:.18,bevelEnabled:true,bevelThickness:.08,bevelSize:.05,bevelSegments:2,steps:1});}const sg=starGeometry();
for(let i=0;i<90;i++){const z=-30-i*19,x=Math.sin(i*.63)*8;const g=mesh(sg,gold,scene,x,1.2,z);entities.push({g,x,z,type:'star',used:false});}
for(let i=0;i<23;i++){const z=-65-i*72,x=(rand()-.5)*18;if(i%3===0){const g=new T.Group();g.position.set(x,0,z);scene.add(g);box(g,teal,0,.35,0,3,.7,3);const top=box(g,snow,0,.8,0,3.2,.16,3.6);top.rotation.x=.28;box(g,gold,0,.82,1.2,2.5,.1,.3);entities.push({g,x,z,type:'ramp',used:false});}else{const g=ball(scene,stone,x,.45,z,.7,1.5,.8,1);ball(g,snow,0,.26,0,.55,1.2,.5,1);entities.push({g,x,z,type:'rock',used:false});}}
// Chunky, faceted stones are deliberately easy to distinguish from the snow.
const rockMaterial=mat(0x637884);
function addRock(x,z){const g=new T.Group();g.position.set(x,0,z);scene.add(g);const b=mesh(new T.DodecahedronGeometry(1,0),rockMaterial,g,0,.58,0);b.scale.set(1.25,.8,1);b.rotation.y=.45;ball(g,snow,-.12,1.14,0,.65,1.3,.18,1);entities.push({g,x,z,type:'rock',used:false});}
addRock(0,-44);
for(let i=0;i<18;i++)addRock(Math.sin(i*2.4)*8,-110-i*91);
const finishGate=new T.Group();finishGate.position.z=-1800;scene.add(finishGate);for(const x of [-10,10])cylinder(finishGate,teal,x,4,0,.3,8);box(finishGate,teal,0,7.7,0,20,1.3,.4);for(let x=-9;x<10;x+=1)box(finishGate,x%2?white:dark,x,7.7,.23,.9,.9,.04);
const particles=[];const particleGeo=new T.SphereGeometry(.055,5,4);for(let i=0;i<70;i++){const p=mesh(particleGeo,snow,scene);p.visible=false;p.castShadow=false;particles.push({g:p,life:0,v:new T.Vector3()});}let pi=0;function puff(x,y,z,n=2,celebrate=false){for(let i=0;i<n;i++){const p=particles[pi++%particles.length];p.g.material=celebrate?gold:snow;p.g.visible=true;p.g.position.set(x,y,z);p.life=.5+rand()*.5;p.v.set((rand()-.5)*5,rand()*3+1,2+rand()*3);}}
let state='menu',demo=false,d=0,x=0,v=0,vy=0,y=0,energy=100,score=0,stars=0,tricks=0,spin=0,spinDir=0,turn=0,inv=0,time=0,toastTime=0,muted=false,audio;
const CRASH_DURATION=2.2;
let crash=0,crashSide=1;
function fall(){
  crash=CRASH_DURATION;crashSide=turn<0?-1:1;v=0;vy=0;y=0;spin=0;spinDir=0;turn=0;keys.clear();
  score=Math.max(0,score-50);toast('WIPEOUT!');toastTime=CRASH_DURATION;
  $('mode').textContent='GETTING BACK UP…';beep(100,.25);puff(x,.5,-d,28);
}
const music=$('music');
music.volume=.3;
function syncMusic(){
  $('sound').textContent=muted?'Sound off':'Sound on';
  $('sound').setAttribute('aria-pressed',String(!muted));
  if(muted||state!=='play'){music.pause();return;}
  music.play().catch(()=>{
    if(!muted&&state==='play'){
      muted=true;
      $('sound').textContent='Enable sound';
      $('sound').setAttribute('aria-pressed','false');
    }
  });
}
const keys=new Set();function beep(freq,duration=.1){if(muted)return;audio??=new AudioContext();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audio.currentTime);o.frequency.exponentialRampToValueAtTime(freq*.65,audio.currentTime+duration);g.gain.setValueAtTime(.06,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+duration);}
function toast(text){$('toast').textContent=text;toastTime=1.6;}
function start(isDemo=false){state='play';demo=isDemo;crash=0;d=0;x=0;v=0;vy=0;y=0;energy=100;score=0;stars=0;tricks=0;spin=0;spinDir=0;inv=0;time=0;turn=0;keys.clear();for(const e of entities){e.used=false;e.g.visible=true;}$('menu').classList.add('hidden');$('finish').classList.add('hidden');$('pauseMenu').classList.add('hidden');$('hud').style.display='block';$('pause').textContent='Pause';$('task').innerHTML='Land a trick<br><small>Q / E to jump and spin</small>';toast(isDemo?'DEMO RUN':'LET’S RIDE!');syncMusic();}
function pause(){if(state==='play'){state='paused';keys.clear();$('pauseMenu').classList.remove('hidden');$('pause').textContent='Resume';}else if(state==='paused'){state='play';$('pauseMenu').classList.add('hidden');$('pause').textContent='Pause';}syncMusic();}
function jump(){if(y<=.01&&state==='play'&&crash===0){vy=7;beep(440);}}
function trick(dir){
  if(state!=='play'||crash>0||spinDir!==0)return;
  // Start a jump on snow, and accept spins immediately after Space too.
  if(y<=.01&&vy<=0)jump();
  spinDir=dir;spin=0;
}
function end(){state='finish';syncMusic();$('finish').classList.remove('hidden');$('results').textContent=`${score.toLocaleString()} points · ${stars} stars · ${tricks} tricks · ${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,'0')}${demo?' · Demo complete':''}`;keys.clear();}
$('start').onclick=()=>start();$('demo').onclick=()=>start(true);$('again').onclick=()=>start();$('restart').onclick=()=>start(demo);$('resume').onclick=pause;$('pause').onclick=pause;$('home').onclick=()=>{state='menu';syncMusic();$('finish').classList.add('hidden');$('hud').style.display='none';$('menu').classList.remove('hidden');};$('sound').onclick=()=>{muted=!muted;syncMusic();if(!muted)beep(650);};
addEventListener('keydown',e=>{if(['Space','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();keys.add(e.code);if(!e.repeat){if(e.code==='Space')jump();if(e.code==='KeyQ'||e.key?.toLowerCase()==='q')trick(-1);if(e.code==='KeyE'||e.key?.toLowerCase()==='e')trick(1);if(e.code==='KeyP'||e.code==='Escape')pause();}});addEventListener('keyup',e=>keys.delete(e.code));addEventListener('blur',()=>{keys.clear();if(state==='play')pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='play')pause();});
document.querySelectorAll('[data-key]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.key);if(b.dataset.key==='Space')jump();if(b.dataset.key==='KeyE')trick(1);};b.onpointerup=b.onpointercancel=()=>keys.delete(b.dataset.key);});
function update(dt){
if(state==='play'&&crash>0){
  time+=dt;crash=Math.max(0,crash-dt);
  if(crash===0){inv=2.5;v=0;keys.clear();toast('BACK ON YOUR SKIS!');}
}
if(state==='play'&&crash===0){time+=dt;inv=Math.max(0,inv-dt);let steer=(keys.has('ArrowRight')||keys.has('KeyD')?1:0)-(keys.has('ArrowLeft')||keys.has('KeyA')?1:0);let boost=keys.has('ShiftLeft')||keys.has('ShiftRight')||keys.has('KeyW');if(demo){const next=entities.find(e=>e.type==='star'&&!e.used&&-e.z>d+5);let target=next?next.x:0;const obstacle=entities.find(e=>e.type==='rock'&&-e.z>d&&-e.z<d+22&&Math.abs(e.x-x)<2);if(obstacle&&y===0)jump();steer=T.MathUtils.clamp((target-x)*.7,-1,1);boost=energy>35;if(Math.floor(time)%5===2&&y===0)jump();if(y>.4&&vy>1&&!spinDir)trick(1);}
turn=T.MathUtils.damp(turn,steer,8,dt);x=T.MathUtils.clamp(x+turn*(6+v*.12)*dt,-11.8,11.8);const boosting=boost&&energy>1&&inv<=0;energy=T.MathUtils.clamp(energy+(boosting?-28:17)*dt,0,100);v=T.MathUtils.damp(v,inv>0?7:boosting?31:20,inv>0?5:1.6,dt);d+=v*dt;
if(y>0||vy>0){y+=vy*dt;vy-=15*dt;if(spinDir){spin+=dt*10;if(spin>=Math.PI*2){spinDir=0;spin=0;tricks++;score+=300;toast('360° • NICE AIR!');beep(880,.2);puff(x,y+1,-d,18,true);$('task').innerHTML='Trick landed!<br><small>+300 points · Keep it flowing</small>';}}if(y<=0){y=0;vy=0;if(spinDir){spinDir=0;spin=0;toast('STICK THE NEXT ONE');}puff(x,.2,-d,12);}}
for(const e of entities){if(e.used||Math.abs(e.z+d)>2)continue;if(Math.abs(e.x-x)<(e.type==='ramp'?2:1.15)){if(e.type==='star'&&y<2.8){e.used=true;e.g.visible=false;stars++;score+=100;energy=Math.min(100,energy+5);beep(600+stars%5*90);puff(e.x,1,-d,8,true);}else if(e.type==='ramp'&&y<.4){e.used=true;vy=10;toast('SEND IT!');beep(500);}else if(e.type==='rock'&&y<.8&&inv===0){fall();break;}}}
if(y===0&&v>4)puff(x,.18,-d+.5,boosting?3:1);$('speed').textContent=Math.round(v*3.6);$('stars').textContent=stars;$('score').textContent=score.toLocaleString();$('energy').value=energy;$('distance').value=d;$('meters').textContent=`${Math.min(1800,Math.floor(d)).toLocaleString()} / 1,800 m`;$('mode').textContent=crash>0?'GETTING BACK UP…':demo?'AUTOPILOT • DEMO':boosting?'FULL SEND!':'CARVE YOUR OWN LINE';if(d>=1800)end();}
if(state==='menu'){d=50;x=3;y=0;turn=Math.sin(performance.now()*.0007)*.2;}
skier.position.set(x,y,-d);body.rotation.z=-turn*.18;body.rotation.y=spinDir?spin*spinDir:-turn*.22;body.rotation.x=y>0?-.1:0;skis[0].rotation.y=y>0?.22:0;skis[1].rotation.y=y>0?-.22:0;skier.visible=inv===0||Math.floor(inv*12)%2===0;if(crash>0){
  const elapsed=CRASH_DURATION-crash;
  const fallIn=T.MathUtils.smoothstep(elapsed,0,.4);
  const standUp=T.MathUtils.smoothstep(elapsed,1.45,CRASH_DURATION);
  const lean=fallIn*(1-standUp);
  body.rotation.set(-.35*lean,.25*lean,crashSide*1.45*lean);
  body.position.y=.35*lean;
  skier.visible=true;
}else{body.position.y=0;}
shadow.position.set(x,.015,-d);shadow.scale.setScalar(1+y*.15);mountains.position.z=-d;sun.position.set(x-35,65,-d+25);sun.target.position.set(x,0,-d-25);
const menu=state==='menu';const desired=new T.Vector3(menu?x+7:x*.6,menu?6:4.8+y*.2,-d+(menu?12:10));camera.position.lerp(desired,1-Math.exp(-dt*6));camera.lookAt(menu?x-4:x*.75,menu?1.2:1.3+y*.25,-d-(menu?8:11));camera.fov=T.MathUtils.damp(camera.fov,v>25?64:57,3,dt);camera.updateProjectionMatrix();
if(state!=='paused'){for(const e of entities){if(e.type==='star'&&!e.used&&Math.abs(e.z+d)<180){e.g.rotation.y+=dt*1.5;e.g.position.y=1.3+Math.sin(performance.now()*.003+e.z)*.18;}}for(const p of particles){if(p.life<=0)continue;p.life-=dt;p.g.visible=p.life>0;p.g.position.addScaledVector(p.v,dt);p.v.y-=4*dt;}toastTime-=dt;if(toastTime<=0)$('toast').textContent='';}}
camera.position.set(10,6,-38);let last=performance.now();function frame(now){const dt=Math.min((now-last)/1000,.04);last=now;update(dt);renderer.render(scene,camera);requestAnimationFrame(frame);}requestAnimationFrame(frame);addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});


