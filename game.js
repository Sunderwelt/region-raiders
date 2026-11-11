'use strict';
const KEY='region-raiders-v1';
const landmarks=[{name:'Michigan City Lighthouse',icon:'🌊',base:120},{name:'Washington Park',icon:'🎡',base:180},{name:'Blue Chip District',icon:'🏙️',base:250},{name:'Franklin Street',icon:'🏪',base:320},{name:'Lakefront Pier',icon:'⚓',base:400}];
const symbols=['🪙','🪙','🪙','💎','⭐','🛡️','🎟️'];
const fresh=()=>({coins:500,spins:30,levels:[0,0,0,0,0],lastRegen:Date.now()});
let selectedBuilding=0;
let previewLevel=-1;
let state;
try{const saved=JSON.parse(localStorage.getItem(KEY));state=saved&&Number.isFinite(saved.coins)&&Number.isInteger(saved.spins)&&Array.isArray(saved.levels)&&saved.levels.length===5&&Number.isFinite(saved.lastRegen)?saved:fresh();}catch{state=fresh();}
const $=id=>document.getElementById(id);
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}};
const format=n=>Math.floor(n).toLocaleString('en-US');
const cost=(i)=>Math.floor(landmarks[i].base*Math.pow(1.8,state.levels[i]));
function regen(){const now=Date.now();if(now<state.lastRegen)state.lastRegen=now;const elapsed=Math.floor((now-state.lastRegen)/60000);if(elapsed>0){state.spins=Math.min(50,state.spins+elapsed);state.lastRegen+=elapsed*60000;save();}}
function render(){regen();$('coins').textContent=format(state.coins);$('spins').textContent=format(state.spins);$('stars').textContent=format(state.levels.reduce((a,b)=>a+b,0));$('spinButton').disabled=state.spins<1||busy;const count=state.levels.reduce((a,b)=>a+b,0);$('progressFill').style.width=(count/25*100)+'%';$('progressText').textContent=count+' / 25 upgrades completed';$('buildings').innerHTML='';landmarks.forEach((b,i)=>{const level=state.levels[i],done=level>=5;const card=document.createElement('div');card.className='building'+(i===selectedBuilding?' selected':'');const icon=document.createElement('span');icon.className='emoji';icon.textContent=b.icon;const info=document.createElement('div');info.className='info';const title=document.createElement('strong');title.textContent=b.name;const desc=document.createElement('small');desc.textContent='Level '+level+' / 5';info.append(title,desc);const button=document.createElement('button');button.textContent=done?'✓ MAX':'🪙 '+format(cost(i));button.disabled=done||state.coins<cost(i);button.addEventListener('click',()=>upgrade(i));card.append(icon,info,button);if(i===selectedBuilding)$('buildings').append(card);});renderMap();if(count===25){$('progressText').textContent='🏆 Michigan City complete! More cities coming soon.';}const seconds=60-Math.floor((Date.now()-state.lastRegen)/1000)%60;$('timer').textContent=state.spins>=50?'Spin bank full':'Next free spin in '+seconds+'s';}

// Original SVG landmark art: five visible construction stages plus an empty lot.
function landmarkArt(i,level){
 const n=Math.max(0,Math.min(5,level));
 const base='<ellipse cx="72" cy="107" rx="59" ry="14" fill="#244f40" opacity=".25"/><path d="M15 93 L73 61 L132 91 L73 124 Z" fill="#b5c8a0" stroke="#f5efc9" stroke-width="3"/>';
 const box=(x,y,w,h,color='#fff0d0')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="3" fill="'+color+'" stroke="#31546c" stroke-width="2"/>';
 const roof=(y,color='#da624a')=>'<path d="M35 '+y+' L73 '+(y-21)+' L112 '+y+' Z" fill="'+color+'" stroke="#773c42" stroke-width="3"/>';
 const windows=(y,count)=>Array.from({length:count},(_,k)=>box(48+(k%3)*18,y+Math.floor(k/3)*18,10,12,'#75d9fa')).join('');
 let art='';
 if(n===0){art='<path d="M39 89 L73 72 L105 89 L73 106 Z" fill="#e9c99a" stroke="#9c8066" stroke-width="3"/><path d="M45 92 L100 92 M73 76 L73 106" stroke="#bd9975" stroke-width="3"/>';}
 else if(i===0){ // Lighthouse
  art=box(51,90-n*11,42,18+n*11,'#fff7e5')+'<path d="M51 '+(90-n*11)+' L93 '+(90-n*11)+' L88 '+(82-n*11)+' L56 '+(82-n*11)+' Z" fill="#dd5346"/>';
  if(n>=2)art+=box(58,93-n*11,28,9,'#dc4d43');
  if(n>=3)art+='<path d="M58 '+(81-n*11)+' L86 '+(81-n*11)+'" stroke="#e44e47" stroke-width="7"/>';
  if(n>=4)art+=box(57,72-n*11,30,12,'#71d8f4');
  if(n>=5)art+='<path d="M53 16 L72 4 L91 16 Z" fill="#df3f42"/><circle cx="73" cy="26" r="7" fill="#ffe36a"/><path d="M81 26 L132 7 L132 46 Z" fill="#fff3a3" opacity=".55"/>';
 }else if(i===1){ // Washington Park wheel
  art='<path d="M50 103 L74 '+(98-n*13)+' L98 103" stroke="#47598b" stroke-width="7" fill="none"/>';
  const cy=90-n*11,r=10+n*8;
  art+='<circle cx="74" cy="'+cy+'" r="'+r+'" fill="none" stroke="#f9e4ff" stroke-width="6"/>';
  for(let k=0;k<8;k++){const a=k*Math.PI/4;const x=74+Math.cos(a)*r,y=cy+Math.sin(a)*r;art+='<path d="M74 '+cy+' L'+x+' '+y+'" stroke="#8652b8" stroke-width="2"/>';if(n>=3)art+='<circle cx="'+x+'" cy="'+y+'" r="5" fill="'+(['#ffd75b','#ff76a1','#66d6ef'][k%3])+'"/>';}
  if(n>=4)art+='<path d="M16 92 L34 76 L48 92 Z" fill="#ff9e64"/>';
  if(n>=5)art+='<path d="M108 94 L121 77 L134 94 Z" fill="#ffda6a"/>';
 }else if(i===2){ // Downtown towers
  const height=19+n*12;art=box(43,103-height,32,height,'#7bbbd5')+box(77,105-height*.8,29,height*.8,'#a7b6d9');
  if(n>=2)art+=windows(111-height,Math.min(9,n*2));
  if(n>=3)art+=box(84,109-height*.8,10,12,'#ffe9a0');
  if(n>=4)art+='<path d="M60 '+(103-height)+' L60 '+(92-height)+'" stroke="#f5dd6a" stroke-width="4"/>';
  if(n>=5)art+='<path d="M89 '+(105-height*.8)+' L89 '+(93-height*.8)+'" stroke="#f5dd6a" stroke-width="3"/>';
 }else if(i===3){ // Franklin Street shops
  const height=14+n*7;art=box(34,104-height,79,height,'#ffe7b1')+box(44,90,19,14,'#7bd9ed')+box(80,90,22,14,'#7bd9ed');
  if(n>=2)art+='<path d="M33 '+(104-height)+' L113 '+(104-height)+'" stroke="#ec7061" stroke-width="8"/>';
  if(n>=3)art+='<path d="M38 '+(108-height)+' L108 '+(108-height)+'" stroke="#fff2ba" stroke-width="6" stroke-dasharray="10 7"/>';
  if(n>=4)art+=box(57,85-height,37,15,'#e95656')+'<text x="75" y="'+(96-height)+'" font-size="10" text-anchor="middle" fill="white" font-weight="bold">MAIN ST</text>';
  if(n>=5)art+='<path d="M34 '+(100-height)+' L73 '+(80-height)+' L113 '+(100-height)+'" fill="none" stroke="#ffd26b" stroke-width="5"/>';
 }else{ // Pier
  art='<path d="M24 106 L116 106" stroke="#4e94c1" stroke-width="12"/>';
  for(let k=0;k<n+1;k++){const x=34+k*15;art+='<path d="M'+x+' 98 L'+x+' '+(78-n*5)+'" stroke="#a36b42" stroke-width="7"/>';}
  if(n>=2)art+='<path d="M32 '+(78-n*5)+' L'+(35+n*15)+' '+(78-n*5)+'" stroke="#f1c58c" stroke-width="10"/>';
  if(n>=4)art+='<path d="M99 61 L99 30" stroke="#405d77" stroke-width="5"/><path d="M99 32 L115 44 L99 44 Z" fill="#ffeb8a"/>';
  if(n>=5)art+='<path d="M41 62 Q50 43 59 62" fill="none" stroke="#f3f7fa" stroke-width="4"/>';
 }
 return '<svg class="landmark-svg" viewBox="0 0 148 132" xmlns="http://www.w3.org/2000" aria-hidden="true">'+base+art+'</svg>';
}

function renderMap(){const positions=[[12,16],[55,14],[28,46],[64,48],[8,72]];const map=$('mapBuildings');map.innerHTML='';landmarks.forEach((b,i)=>{const level=previewLevel<0?state.levels[i]:previewLevel;const tile=document.createElement('button');tile.type='button';tile.className='map-building'+(selectedBuilding===i?' picked':'')+(level?' upgraded':'');tile.style.left=positions[i][0]+'%';tile.style.top=positions[i][1]+'%';tile.setAttribute('aria-label',b.name+', '+(previewLevel<0?'level ':'preview level ')+level);tile.innerHTML=landmarkArt(i,level)+'<span class="map-level">'+level+'/5</span>';tile.addEventListener('click',()=>{selectedBuilding=i;render();});map.append(tile);});}
function upgrade(i){if(state.levels[i]>=5)return;const price=cost(i);if(state.coins<price)return;state.coins-=price;state.levels[i]++;save();render();const tile=$('mapBuildings').children[i];if(tile){tile.classList.add('build-pop');setTimeout(()=>tile.classList.remove('build-pop'),650);}}
let busy=false;
function randomSymbol(){return symbols[Math.floor(Math.random()*symbols.length)];}
function spin(){regen();if(busy||state.spins<1)return;busy=true;$('reels').classList.add('rolling');state.spins--;save();$('result').textContent='Spinning...';render();let ticks=0;const interval=setInterval(()=>{for(let i=0;i<3;i++)$('r'+i).textContent=randomSymbol();ticks++;if(ticks<12)return;clearInterval(interval);$('reels').classList.remove('rolling');const outcome=[randomSymbol(),randomSymbol(),randomSymbol()];outcome.forEach((s,i)=>$('r'+i).textContent=s);let coins=0,bonus=0;const triples=outcome.every(s=>s===outcome[0]);if(triples){coins=outcome[0]==='💎'?2500:outcome[0]==='🪙'?1500:900;bonus=outcome[0]==='🎟️'?10:0;}else{coins=outcome.filter(s=>s==='🪙').length*120+outcome.filter(s=>s==='💎').length*200+outcome.filter(s=>s==='⭐').length*80;bonus=outcome.filter(s=>s==='🎟️').length*2;}coins+=50;state.coins+=coins;state.spins+=bonus;$('result').textContent='+'+format(coins)+' coins'+(bonus?' • +'+bonus+' spins':'')+(triples?' 🎉 JACKPOT!':'');busy=false;save();render();},85);}
$('spinButton').addEventListener('click',spin);
function tab(which){$('spinPanel').classList.toggle('hidden',which!=='spin');$('cityPanel').classList.toggle('hidden',which!=='city');$('spinTab').classList.toggle('active',which==='spin');$('cityTab').classList.toggle('active',which==='city');render();}
$('spinTab').addEventListener('click',()=>tab('spin'));
$('cityTab').addEventListener('click',()=>tab('city'));
$('previewLevel').addEventListener('input',event=>{const v=Number(event.target.value);previewLevel=v===0?-1:v-1;$('previewLabel').textContent=previewLevel<0?'Off':'Level '+previewLevel;renderMap();});
setInterval(render,1000);render();