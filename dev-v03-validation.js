'use strict';

const APP = document.getElementById('app');
const SUPA_URL = 'https://afgfbxfalvsjtvflmjzy.supabase.co';
const SUPA_KEY = 'sb_publishable_rLV9T45TyuRYHY_A-7HNnQ_atzOzroL';
const AUTH_URL = `${SUPA_URL}/functions/v1/auth-username`;
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const CAT = {
  Murga:{icon:'🎭',count:22,liguilla:10,label:'Murgas'},
  Parodistas:{icon:'🎬',count:6,liguilla:4,label:'Parodistas'},
  Humoristas:{icon:'😂',count:5,liguilla:3,label:'Humoristas'},
  Revista:{icon:'💃',count:5,liguilla:3,label:'Revistas'},
  Lubolos:{icon:'🥁',count:6,liguilla:4,label:'Negros y Lubolos'}
};
const DIF = {'Desde abajo':220000,'Equilibrado':480000,'Libre':1100000};
const MONTHS = ['Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Enero'];
const DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const RUBRICS = ['Voces / Musicalidad','Textos / Interpretación','Puesta en escena','Coreografía / Bailes','Vestuario / Maquillaje','Rodaje general'];
const REHEARSAL_PARTS = ['Voces / Musicalidad','Textos / Interpretación','Puesta en escena','Coreografía / Bailes','Ensayo completo'];
const PRO_TYPES = ['Arreglador coral','Letrista','Puestista','Coreógrafo','Vestuarista','Maquillador'];
const PRIMARY_AREA = {
  'Arreglador coral':'Voces / Musicalidad','Letrista':'Textos / Interpretación','Puestista':'Puesta en escena',
  'Coreógrafo':'Coreografía / Bailes','Vestuarista':'Vestuario / Maquillaje','Maquillador':'Vestuario / Maquillaje'
};
const ROLES = {
  Murga:['Segundo','Primo','Sobreprimo','Bombo','Platillos','Redoblante'],
  Parodistas:['Actor-cantante','Actor','Cantante','Bailarín / Actor'],
  Humoristas:['Humorista / Actor','Actor-cantante','Cantante'],
  Revista:['Bailarín','Cantante','Actor','Bailarín / Cantante'],
  Lubolos:['Tamborilero','Bailarina','Vedette','Escobero','Gramillero','Mama Vieja','Portabandera','Portaestandarte','Portaestrella','Portamedialuna']
};
const NAMES = {
  Murga:['La Contracara','Los Desvelados','Falta Una Noche','La Farola','Los del Andén','La Vuelta Entera','Contramano Sur','La Madrugada','Salpicón','Los Vecinos','La Bohemia','La Esquina','A Contraluz','Los Inquietos','La Banda Nueva','De Rebote','La Compañera','La Penúltima','Calle Adentro','La Resaca','Los del Fondo','La Trasnochada'],
  Parodistas:['Los Galantes','Cabaret Oriental','Los del Telón','Parodia Sur','Los Viajeros','La Compañía'],
  Humoristas:['Los Reidores','La Otra Mitad','Los Improvisados','Humor de Barrio','Los de Siempre'],
  Revista:['Brillo Oriental','Fantasía Sur','Nueva Estrella','Magnolia','Luz de Carnaval'],
  Lubolos:['Raíz Morena','Candombe Sur','La Estirpe','Barrio Tambor','Alma Negra','Herencia']
};
const FN = ['Agustín','Valentina','Martín','Lucía','Bruno','Camila','Santiago','Florencia','Nicolás','Sofía','Mateo','Martina','Joaquín','Micaela','Facundo','Julieta','Emiliano','Clara','Thiago','Renata','Franco','Agustina','Sebastián','Victoria','Gonzalo','Malena','Federico','Paula','Ignacio','Belén','Rodrigo','Antonella'];
const LN = ['Silva','Pereira','Rodríguez','Gómez','Fernández','Suárez','Acosta','Sosa','Cabrera','Martínez','Viera','Méndez','López','Ramos','Cardozo','Olivera','Techera','González','Díaz','Núñez'];
;
const PATCHES = [
  {v:'0.3',title:'Club, finanzas, formaciones fijas y Prueba de Admisión',items:[
    'Partidas nuevas: se conserva la cuenta de usuario pero las partidas anteriores de v0.2 no se cargan.',
    'Formaciones titulares fijas por categoría: Murga 17, Parodistas 21, Humoristas 18, Revistas 26 y Lubolos 57.',
    'Suplentes limitados por categoría y control obligatorio de puestos antes de comenzar diciembre.',
    'Músicos y batería de murga se valoran con la media de sus instrumentos principales; personajes artísticos mantienen especialidad y aportes secundarios.',
    'Nuevo Club: aforo, ampliaciones, cantina, precios, stock de merchandising y utileros honoríficos.',
    'Nueva página Finanzas con desglose semanal de ingresos, gastos y proyección de costos.',
    'Negociaciones de artistas muestran costo garantizado y costo anual estimado con hipótesis explícitas.',
    'Avanzar semana desde Inicio, con aviso de ensayos pendientes y confirmación de cierre.',
    'Festivales limitados a dos por semana de abril a noviembre y siete de diciembre a enero; pueden compartir día con ensayos.',
    'Nombre del espectáculo editable hasta diciembre; obligatorio para comenzar enero.',
    'Prueba de Admisión con mínimo de 45 inscriptos, sorteo equilibrado en octubre, jornadas en noviembre y veinte clasificados.',
    'Actuaciones con comentarios sin puntuaciones y resultados revelados uno por uno en orden alfabético.',
    'Tras quedar eliminado podés seguir actuando con menos ingresos o pausar hasta abril sin ingresos ni gastos; hay riesgo de perder artistas y profesionales.',
    'Se amplía el calendario a febrero y marzo para permitir avanzar a la siguiente temporada; el Concurso Oficial completo se desarrollará en una próxima versión.'
  ]},
  {v:'0.2',title:'Cuentas, mundo vivo y gestión profunda',items:[
    'Cuentas reales con nombre de usuario, email privado y contraseña; guardado de partida en la nube.',
    'Nueva sección Conjuntos, dividida por las cinco categorías del Carnaval.',
    'Plantillas completas de los demás conjuntos con artistas, profesionales, valoraciones, prestigio y popularidad.',
    'Ficha de cada conjunto con situación económica aproximada, historial de resultados, Liguillas y premios.',
    'Desde enero aparece una estimación del espectáculo rival en forma de etiqueta y rango aproximado.',
    'Titulares y suplentes fijos en tu conjunto. Solo los titulares cuentan para la valoración del espectáculo.',
    'Cambiar titulares afecta el rodaje según la cantidad de cambios y la experiencia de quienes ingresan.',
    'Negociaciones con varias rondas y contraofertas concretas de artistas y profesionales.',
    'Mercado con buscador, filtros completos y favoritos.',
    'Los favoritos generan avisos cuando quedan libres, fichan o cambian de situación.',
    'Nueva sección Actualidad con fichajes, salidas e intentos de negociación fallidos, sin revelar montos de terceros.',
    'Bandeja privada dividida en Mercado, Plantel, Competición y Administración.',
    'Profesionales con atributos, experiencia, prestigio, historial y premios.',
    'Un profesional puede trabajar para varios conjuntos, pero como máximo uno por categoría.',
    'Nueva estadística Concentración: 100% con 1 conjunto, 90% con 2, 80% con 3, 70% con 4 y 60% con 5.',
    'La concentración afecta la calidad del trabajo creado por los profesionales, no su valoración base.',
    'El trabajo de los profesionales evoluciona durante la temporada y mejora especialmente con ensayos relacionados.',
    'Los profesionales pueden superar su nivel habitual en una gran temporada; el límite es flexible.',
    'Cada ensayo mantiene tres partes; Ensayo completo ocupa dos y se enfoca en coordinación y rodaje.',
    'Los informes de ensayo muestran mejoras numéricas exactas y una explicación breve de por qué se produjeron.',
    'Nueva Química con el conjunto: 0% el primer año, +1% por temporada desde el segundo, máximo 30%.',
    'La Química bonifica todas las estadísticas y permite un rendimiento efectivo superior a 100.',
    'Si alguien vuelve a un conjunto, recupera el 50% de la Química que tenía al irse y luego vuelve a progresar.',
    'La plantilla muestra valoración base, Química y rendimiento efectivo por separado.',
    'Nueva pestaña Actualizaciones con las notas de cada versión dentro del propio juego.'
  ]},
  {v:'0.1',title:'Primer prototipo jugable',items:[
    'Creación del conjunto, categoría, economía inicial y elección entre Prueba de Admisión o entrada directa el primer año.',
    'Calendario semanal de abril a enero.',
    'Plantel inicial deliberadamente flojo y mercado básico.',
    'Ensayos divididos en tres partes y valoración inicial del espectáculo.',
    'Prototipo publicado en GitHub Pages.'
  ]}
];
;
let session = null;
let profile = null;
let S = null;
let saveTimer = null;
let cloudState = 'Sin cambios';
let U = {
  authMode:'login', authError:'', authBusy:false,
  view:'Inicio', setupStep:0, setup:{name:'',cat:'',dif:'',first:''},
  setCategory:null, selectedSet:null, modal:null, marketType:'artists', notifTab:'Mercado',
  filters:{q:'',cat:'Todas',role:'Todos',minRating:'',maxAge:'',minExp:'',status:'Todos',maxSalary:'',favorites:false},
  rehearsal:{day:0,parts:[]}, negotiation:null
};

const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const id=()=>globalThis.crypto?.randomUUID?.()||`id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
const money=n=>new Intl.NumberFormat('es-UY',{style:'currency',currency:'UYU',maximumFractionDigits:0}).format(Math.round(Number(n)||0));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const one=n=>Math.round(n*10)/10;
const chemistryForYears=y=>Math.min(30,Math.max(0,(y||1)-1));
const concentrationFor=p=>Math.max(60,100-(Math.max(1,p.assignments?.length||0)-1)*10);
const economicLabel=n=>n>900000?'Muy sólida':n>600000?'Estable':n>340000?'Ajustada':'Complicada';
const monthNow=()=>MONTHS[S?.cal?.m||0];
const isJanuary=()=>S?.cal?.m>=9;
;
function baseAttributes(base, role){
  const a={Canto:clamp(base+rand(-14,14),15,100),Actuación:clamp(base+rand(-13,15),15,100),Presencia:clamp(base+rand(-10,15),20,100),Profesionalismo:clamp(base+rand(-7,18),20,100),Popularidad:clamp(base+rand(-18,12),8,100)};
  if(/Bombo|Platillos|Redoblante|Tambor/.test(role)) a.Percusión=clamp(base+rand(2,18),20,100);
  if(/Bail|Vedette|Escobero|Mama|Gramillero/.test(role)) a.Baile=clamp(base+rand(0,18),20,100);
  if(/Humor/.test(role)) a.Comicidad=clamp(base+rand(1,18),20,100);
  return a;
}
function makeArtist(cat,{weak=false,young=false,free=false,tenure=null}={}){
  const role=pick(ROLES[cat]), age=young?18:rand(19,55), base=weak?rand(38,57):rand(50,88), attrs=baseAttributes(base,role);
  const exp=young?0:clamp((age-18)*2+rand(-8,18),2,96);
  let rating=Math.round(avg(Object.values(attrs))*.87+exp*.13);
  if(weak) rating=clamp(rand(38,58),30,65);
  const years=free?0:(tenure??rand(1,7));
  return {id:id(),kind:'artist',name:`${pick(FN)} ${pick(LN)}`,age,category:cat,role,attrs,experience:exp,rating,potential:rand(Math.max(58,Math.min(95,rating+4)),100),known:!young,status:free?'Libre':'Plantel',setId:null,starter:false,tenure:years,chemistry:free?0:chemistryForYears(years),pastChemistry:{},history:[],awards:[],demands:makeDemands(rating),contract:null};
}
function makeDemands(rating){
  const f=clamp((rating-35)/65,0,1);
  return {salary:Math.round(4500+f*26000+rand(-1500,2500)),tablado:Math.round(150+f*1200),teatro:Math.round(1200+f*9000),bonus:Math.round(2500+f*22000),febPct:rand(0,8)};
}
function makeProfessional(type,{weak=false}={}){
  const base=weak?rand(42,61):rand(54,91);
  const attrs={Creatividad:clamp(base+rand(-12,14),20,100),Técnica:clamp(base+rand(-10,15),20,100),Comunicación:clamp(base+rand(-12,14),20,100),Adaptación:clamp(base+rand(-14,14),20,100),Disciplina:clamp(base+rand(-10,16),20,100)};
  if(type==='Letrista') attrs.Escritura=clamp(base+rand(3,17),20,100);
  if(type==='Arreglador coral') attrs.Musicalidad=clamp(base+rand(3,17),20,100);
  if(type==='Puestista') attrs.Escena=clamp(base+rand(3,17),20,100);
  if(type==='Coreógrafo') attrs.Movimiento=clamp(base+rand(3,17),20,100);
  if(type==='Vestuarista'||type==='Maquillador') attrs.Estética=clamp(base+rand(3,17),20,100);
  const experience=rand(8,95), rating=clamp(Math.round(avg(Object.values(attrs))*.86+experience*.14),35,100);
  return {id:id(),kind:'professional',name:`${pick(FN)} ${pick(LN)}`,type,rating,attrs,experience,prestige:clamp(rating+rand(-12,12),20,100),assignments:[],pastChemistry:{},history:[],awards:randomPersonalAwards(rating),demands:makeDemands(rating)};
}
function randomPersonalAwards(r){
  const a=[]; if(r>82&&Math.random()<.45)a.push(pick(['Mejor Puesta','Mejor Arreglo','Mejor Letra','Mejor Vestuario','Mención especial'])); return a;
}
function rosterSize(cat){return cat==='Murga'?16:cat==='Parodistas'?18:cat==='Humoristas'?15:cat==='Revista'?22:28;}
function starterTarget(cat){return cat==='Murga'?14:cat==='Parodistas'?16:cat==='Humoristas'?13:cat==='Revista'?20:25;}
function randomHistory(cat){
  const max=CAT[cat].count,q=CAT[cat].liguilla; return [2024,2025,2026].map(year=>{const pos=rand(1,max), lig=pos<=q, awards=[]; if(pos===1)awards.push('1.er Premio'); if(pos===2)awards.push('2.º Premio'); if(Math.random()<.22)awards.push(pick(['Mejor Espectáculo','Mejor Letra','Mejor Puesta en Escena','Mejor Vestuario','Mejor Maquillaje'])); return {year,position:pos,liguilla:lig,awards};});
}
function deriveAwards(history){return [...new Set(history.flatMap(x=>x.awards||[]))];}
;
function createWorld(setup){
  const sets=[];
  Object.entries(NAMES).forEach(([cat,names])=>names.forEach(name=>sets.push({id:id(),name,category:cat,prestige:rand(25,92),popularity:rand(20,92),budget:rand(180000,1250000),style:pick(['Apuesta por jóvenes','Busca figuras','Austero','Equilibrado','Gastador']),roster:[],professionalIds:[],history:randomHistory(cat),awards:[],spectacleSeed:rand(55,94),isPlayer:false})));
  const candidates=sets.filter(x=>x.category===setup.cat).sort((a,b)=>a.prestige-b.prestige).slice(0,4);
  const replaced=pick(candidates), playerSetId=replaced.id, replacedName=replaced.name;
  replaced.name=setup.name; replaced.isPlayer=true; replaced.prestige=18; replaced.popularity=14; replaced.budget=DIF[setup.dif]; replaced.style='Jugador'; replaced.history=[]; replaced.awards=[];

  sets.forEach(set=>{
    const weak=set.isPlayer;
    const n=rosterSize(set.category);
    set.roster=Array.from({length:n},()=>makeArtist(set.category,{weak,tenure:weak?1:rand(1,9)}));
    set.roster.forEach((a,i)=>{a.setId=set.id;a.status='Plantel';a.starter=set.isPlayer?i<starterTarget(set.category):false;a.contract=makeDemands(a.rating);a.history=[{year:set.isPlayer?2027:2026,set:set.name,category:set.category}];});
    set.awards=deriveAwards(set.history);
  });

  const professionals=[];
  const ordered=[...sets].sort(()=>Math.random()-.5);
  ordered.forEach(set=>{
    PRO_TYPES.forEach(type=>{
      const eligible=professionals.filter(p=>p.type===type && p.assignments.length<5 && !p.assignments.some(a=>a.category===set.category));
      let p=(!set.isPlayer && eligible.length && Math.random()<.42)?pick(eligible):makeProfessional(type,{weak:set.isPlayer});
      if(!professionals.some(x=>x.id===p.id))professionals.push(p);
      const tenure=set.isPlayer?1:rand(1,10), chemistry=chemistryForYears(tenure);
      p.assignments.push({setId:set.id,category:set.category,tenure,chemistry,contract:makeDemands(p.rating)});
      p.history.push({set:set.name,category:set.category,fromYear:2027-tenure+1});
      set.professionalIds.push(p.id);
    });
  });
  PRO_TYPES.forEach(type=>{for(let i=0;i<4;i++)professionals.push(makeProfessional(type));});

  const freeArtists=[];
  Object.keys(CAT).forEach(cat=>{for(let i=0;i<12;i++)freeArtists.push(makeArtist(cat,{free:true,young:i<2}));});

  const initialRub={}; RUBRICS.forEach((r,i)=>initialRub[r]=[42,40,38,36,39,31][i]);
  const works={'Voces / Musicalidad':39,'Textos / Interpretación':38,'Puesta en escena':36,'Coreografía / Bailes':35,'Vestuario / Maquillaje':38};
  return {
    version:'0.2',year:2027,cal:{m:0,w:1,globalWeek:1},playerSetId,replacedName,
    settings:{difficulty:setup.dif,firstSeason:setup.first},
    player:{money:DIF[setup.dif],rubrics:initialRub,works,plan:{},contracts:{},lastReports:[],lastFinance:null},
    sets,professionals,freeArtists,favorites:{artists:[],professionals:[]},news:[{id:id(),week:1,year:2027,text:`${setup.name} inicia su proyecto en ${setup.cat}.`}],
    notifications:{Mercado:[],Plantel:[],Competición:[],Administración:[]}
  };
}
;
function playerSet(){return S?.sets.find(x=>x.id===S.playerSetId);}
function setById(sid){return S?.sets.find(x=>x.id===sid);}
function proById(pid){return S?.professionals.find(x=>x.id===pid);}
function allArtists(){return [...(S?.freeArtists||[]),...(S?.sets||[]).flatMap(s=>s.roster)];}
function artistById(aid){return allArtists().find(x=>x.id===aid);}
function artistEffective(a){return one(a.rating*(1+(a.chemistry||0)/100));}
function assignmentFor(p,setId){return p.assignments?.find(a=>a.setId===setId);}
function proEffective(p,setId){const a=assignmentFor(p,setId);return one(p.rating*(1+((a?.chemistry)||0)/100));}
function proOutput(p,setId){return proEffective(p,setId)*(concentrationFor(p)/100);}
function setProfessionals(set){return set.professionalIds.map(proById).filter(Boolean);}
function catWeights(cat){
  const w=Object.fromEntries(RUBRICS.map(r=>[r,1]));
  if(cat==='Murga'){w['Textos / Interpretación']=4;w['Voces / Musicalidad']=2;}
  if(cat==='Humoristas'){w['Textos / Interpretación']=4;w['Vestuario / Maquillaje']=2;}
  if(cat==='Parodistas'){w['Voces / Musicalidad']=3;w['Puesta en escena']=2;w['Vestuario / Maquillaje']=2;}
  if(cat==='Revista'){w['Coreografía / Bailes']=3;w['Voces / Musicalidad']=2;}
  if(cat==='Lubolos'){w['Textos / Interpretación']=3;w['Voces / Musicalidad']=2;}
  return w;
}
function weighted(obj,cat,keys=RUBRICS){const w=catWeights(cat);let a=0,b=0;keys.forEach(k=>{a+=(obj[k]||0)*(w[k]||1);b+=(w[k]||1)});return b?a/b:0;}
function playerSpectacleRating(){
  if(!S)return 0; const set=playerSet(),starters=set.roster.filter(a=>a.starter); if(!starters.length)return 0;
  const roster=avg(starters.map(artistEffective));
  const rub=weighted(S.player.rubrics,set.category);
  const work=weighted(S.player.works,set.category,Object.keys(S.player.works));
  const pros=avg(setProfessionals(set).map(p=>proOutput(p,set.id)));
  return Math.round(roster*.35+rub*.35+work*.18+pros*.12);
}
function aiSetPower(set){
  const top=[...set.roster].sort((a,b)=>artistEffective(b)-artistEffective(a)).slice(0,starterTarget(set.category));
  const roster=avg(top.map(artistEffective)), pros=avg(setProfessionals(set).map(p=>proOutput(p,set.id)));
  return clamp(Math.round(roster*.62+pros*.18+set.spectacleSeed*.2),35,110);
}
function estimateLabel(v){return v>=90?'Candidato':v>=82?'Muy fuerte':v>=74?'Competitivo':v>=64?'Irregular':'Flojo';}
function stableHash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function estimateRange(set){const p=aiSetPower(set),h=stableHash(`${set.id}:${S.cal.globalWeek}`),noise=(h%7)-3,center=clamp(p+noise,35,105),loSpread=2+((h>>>3)%3),hiSpread=2+((h>>>6)%3);return {label:estimateLabel(center),lo:Math.max(1,center-loSpread),hi:center+hiSpread};}
function notify(cat,text){if(!S)return;S.notifications[cat].unshift({id:id(),text,week:S.cal.globalWeek,year:S.year,read:false});}
function unread(){return Object.values(S?.notifications||{}).flat().filter(n=>!n.read).length;}
function addNews(text){S.news.unshift({id:id(),week:S.cal.globalWeek,year:S.year,text});S.news=S.news.slice(0,100);}
function favoriteKind(kind,entityId){return S.favorites[kind].includes(entityId);}
function toggleFavorite(kind,entityId){const a=S.favorites[kind],i=a.indexOf(entityId);if(i>=0)a.splice(i,1);else a.push(entityId);queueSave();render();}
;
async function cloudSave(){
  if(!session||!S)return;
  cloudState='Guardando…';
  updateCloudLabel();
  const result=await sb.from('game_saves').upsert({user_id:session.user.id,version:'0.3',state:S},{onConflict:'user_id'});
  cloudState=result.error?'Error al guardar':'Guardado';
  updateCloudLabel();
}
function queueSave(){
  clearTimeout(saveTimer);
  cloudState='Cambios pendientes';
  updateCloudLabel();
  saveTimer=setTimeout(cloudSave,450);
}
function updateCloudLabel(){
  const el=document.getElementById('cloudState');
  if(el)el.textContent=cloudState;
}
;
async function loadUserData(){
  if(!session)return;
  const profileResult=await sb.from('profiles').select('id,username,created_at').eq('id',session.user.id).maybeSingle();
  const gameResult=await sb.from('game_saves').select('state,version,updated_at').eq('user_id',session.user.id).maybeSingle();
  profile=profileResult.data||{username:session.user.user_metadata?.username||'Jugador'};
  S=gameResult.data?.version==='0.3'&&gameResult.data?.state?.version==='0.3'?gameResult.data.state:null;
  cloudState=S?'Guardado':'Sin partida';
  render();
}
async function init(){
  APP.innerHTML='<div class="authwrap"><div class="auth"><div class="empty">Cargando Carnaval Uruguay…</div></div></div>';
  const sessionResult=await sb.auth.getSession();
  session=sessionResult.data.session;
  if(session)await loadUserData();else render();
  sb.auth.onAuthStateChange(async(_event,newSession)=>{
    session=newSession;
    if(!session){profile=null;S=null;render();}
  });
}
;
function authView(){
  const reg=U.authMode==='register';
  APP.innerHTML=`<div class="authwrap"><div class="auth"><div class="logo">🎭</div><h1>Carnaval Uruguay</h1><p class="muted">Simulador de gestión del Carnaval uruguayo · v0.2</p>
  <div class="seg"><button data-act="auth-tab" data-mode="login" class="${!reg?'on':''}">Ingresar</button><button data-act="auth-tab" data-mode="register" class="${reg?'on':''}">Crear cuenta</button></div>
  ${U.authError?`<div class="note danger">${esc(U.authError)}</div>`:''}
  <form id="authForm">
    <div class="field"><label>Usuario</label><input name="username" minlength="3" maxlength="24" autocomplete="username" required placeholder="Porg21"></div>
    ${reg?`<div class="field"><label>Email privado</label><input name="email" type="email" autocomplete="email" required placeholder="tu@email.com"><small>Se guarda asociado a tu cuenta y no se muestra públicamente.</small></div>`:''}
    <div class="field"><label>Contraseña</label><input name="password" type="password" minlength="6" autocomplete="${reg?'new-password':'current-password'}" required></div>
    <button class="btn" style="width:100%;margin-top:8px" ${U.authBusy?'disabled':''}>${U.authBusy?'Procesando…':reg?'Crear cuenta':'Ingresar'}</button>
  </form>
  <div class="note" style="margin-top:12px">Tu partida de v0.2 se guarda online y queda vinculada a esta cuenta. Las partidas locales de v0.1 no se importan.</div></div></div>`;
}
async function submitAuth(form){
  const fd=new FormData(form),username=String(fd.get('username')||'').trim(),password=String(fd.get('password')||''),email=String(fd.get('email')||'').trim();
  U.authBusy=true;U.authError='';render();
  try{
    const res=await fetch(AUTH_URL,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify({action:U.authMode==='register'?'register':'login',username,password,email})});
    const data=await res.json();if(!res.ok)throw new Error(data.error||'No se pudo iniciar sesión.');
    const {error}=await sb.auth.setSession({access_token:data.session.access_token,refresh_token:data.session.refresh_token});if(error)throw error;
    session=(await sb.auth.getSession()).data.session;profile={username:data.profile?.username||username};S=null;await loadUserData();
  }catch(e){U.authError=e.message||'Ocurrió un error.';}
  U.authBusy=false;render();
}
;
function setupView(){
  const s=U.setup;let body='';
  if(U.setupStep===0)body=`<h2>Creá tu conjunto</h2><div class="field"><label>Nombre del conjunto</label><input id="setupName" value="${esc(s.name)}" placeholder="Ej.: La Nueva Noche"></div>`;
  if(U.setupStep===1)body=`<h2>Elegí categoría</h2><div class="choices">${Object.entries(CAT).map(([k,c])=>`<button class="choice ${s.cat===k?'on':''}" data-act="setup-cat" data-val="${k}"><b>${c.icon} ${c.label}</b><small>${c.count} conjuntos · ${c.liguilla} pasan a Liguilla.</small></button>`).join('')}</div>`;
  if(U.setupStep===2)body=`<h2>Economía inicial</h2><div class="choices">${Object.entries(DIF).map(([k,v])=>`<button class="choice ${s.dif===k?'on':''}" data-act="setup-dif" data-val="${k}"><b>${k}</b><small>${money(v)}. El plantel siempre empieza flojo.</small></button>`).join('')}</div>`;
  if(U.setupStep===3)body=`<h2>Primera temporada</h2><div class="choices">${['Dar Prueba de Admisión','Directo al Carnaval'].map(k=>`<button class="choice ${s.first===k?'on':''}" data-act="setup-first" data-val="${k}"><b>${k}</b><small>${k.startsWith('Dar')?'En noviembre disputarás la Prueba de Admisión.':'Tenés lugar asegurado en febrero solamente el primer año.'}</small></button>`).join('')}</div>`;
  APP.innerHTML=`<div class="wrap setup"><div class="hero"><div class="kicker">Nueva partida · v0.3</div><h1 style="margin-top:5px">Carnaval Uruguay</h1><p class="muted">Hola, ${esc(profile?.username||'Jugador')}. Esta partida se guardará en la nube.</p>${body}<div class="split" style="margin-top:16px"><button class="btn alt" data-act="setup-back" ${U.setupStep===0?'disabled':''}>Atrás</button><span class="muted">Paso ${U.setupStep+1} de 4</span><button class="btn" data-act="setup-next">${U.setupStep===3?'Empezar temporada':'Siguiente'}</button></div></div></div>`;
}
function canNextSetup(){if(U.setupStep===0)return U.setup.name.trim().length>=2;if(U.setupStep===1)return !!U.setup.cat;if(U.setupStep===2)return !!U.setup.dif;if(U.setupStep===3)return !!U.setup.first;return false;}
async function nextSetup(){if(U.setupStep===0){const el=document.getElementById('setupName');U.setup.name=el?.value.trim()||'';}if(!canNextSetup())return alert('Completá esta opción antes de continuar.');if(U.setupStep<3){U.setupStep++;render();return;}S=createWorld(U.setup);notify('Administración','Partida v0.3 creada y vinculada a tu cuenta.');cloudState='Guardando…';render();await cloudSave();}

function topBar(){const set=playerSet();return `<div class="top"><div class="topin"><div class="brand"><div class="brandlogo">🎭</div><div><b>Carnaval Uruguay</b><small>${set?esc(set.name):'v0.3'}</small></div></div><div class="topright"><span class="cloud" id="cloudState">${cloudState}</span><span class="username muted">@${esc(profile?.username||'')}</span><button class="btn alt small" data-act="logout">Salir</button></div></div></div>`;}
function nav(){const items=['Inicio','Plantilla','Mercado','Conjuntos','Calendario','Espectáculo','Actualidad','Bandeja','Actualizaciones'];return `<div class="nav">${items.map(v=>`<button data-act="view" data-view="${v}" class="${U.view===v?'on':''}">${v}${v==='Bandeja'&&unread()?`<span class="badge">${unread()}</span>`:''}</button>`).join('')}</div>`;}
function gameView(){
  const set=playerSet();
  let body='';
  if(U.view==='Inicio')body=renderHome();if(U.view==='Plantilla')body=renderRoster();if(U.view==='Mercado')body=renderMarket();if(U.view==='Conjuntos')body=renderSets();if(U.view==='Calendario')body=renderCalendar();if(U.view==='Espectáculo')body=renderSpectacle();if(U.view==='Actualidad')body=renderNews();if(U.view==='Bandeja')body=renderInbox();if(U.view==='Actualizaciones')body=renderUpdates();
  APP.innerHTML=`${topBar()}<div class="wrap">${nav()}${body}</div>${renderModal()}`;
}
function render(){if(!session)return authView();if(!S)return setupView();gameView();}
;
function renderHome(){
  const set=playerSet(),reports=S.player.lastReports||[],fin=S.player.lastFinance;
  return `<div class="hero"><div class="kicker">Temporada ${S.year}</div><div class="split"><div><h1>${esc(set.name)}</h1><p class="muted">${CAT[set.category].label} · ${monthNow()} · Semana ${S.cal.w}</p></div><div class="rating ${playerSpectacleRating()<60?'low':playerSpectacleRating()<75?'mid':''}">${playerSpectacleRating()}</div></div>
  <div class="stats"><div class="stat"><span>Dinero</span><b>${money(S.player.money)}</b></div><div class="stat"><span>Prestigio</span><b>${set.prestige}</b></div><div class="stat"><span>Popularidad</span><b>${set.popularity}</b></div><div class="stat"><span>Titulares</span><b>${set.roster.filter(a=>a.starter).length}</b></div><div class="stat"><span>Rodaje</span><b>${one(S.player.rubrics['Rodaje general'])}</b></div><div class="stat"><span>Espectáculo</span><b>${playerSpectacleRating()}</b></div></div></div>
  <div class="grid"><div class="card"><div class="sectiontitle"><div><div class="kicker">Última semana</div><h3>Informes de ensayo</h3></div></div>${fin?`<div class="note ${fin.net>=0?'success':'warn'}">Economía semanal: ingresos ${money(fin.income)} · gastos ${money(fin.expenses)} · <b>${fin.net>=0?'+':''}${money(fin.net)}</b></div>`:''}${reports.length?reports.map(r=>`<div class="report"><b>${esc(r.title)}</b><div class="subtle">${esc(r.explanation)}</div>${r.lines.map(x=>`<div class="mini" style="margin-top:4px">${esc(x)}</div>`).join('')}</div>`).join(''):'<div class="empty">Todavía no hay informes de ensayo.</div>'}</div>
  <div class="card"><div class="sectiontitle"><div><div class="kicker">Mundo</div><h3>Últimas noticias</h3></div><button class="btn alt small" data-act="view" data-view="Actualidad">Ver todas</button></div>${S.news.slice(0,5).map(n=>`<div class="row"><div><b>${esc(n.text)}</b><small>Semana ${n.week} · ${n.year||S.year}</small></div></div>`).join('')}</div></div>`;
}
function ratingClass(v){return v<60?'low':v<75?'mid':'';}
function renderRoster(){const set=playerSet();return `<div class="card"><div class="sectiontitle"><div><div class="kicker">Tu conjunto</div><h2>Plantilla</h2><p class="muted">Solo los titulares influyen en la valoración del espectáculo. Cambiar la formación reduce temporalmente el rodaje.</p></div></div><div class="scroll"><table><thead><tr><th>Artista</th><th>Rol</th><th>Edad</th><th>Base</th><th>Química</th><th>Efectivo</th><th>Experiencia</th><th>Condición</th><th></th></tr></thead><tbody>${set.roster.slice().sort((a,b)=>Number(b.starter)-Number(a.starter)||artistEffective(b)-artistEffective(a)).map(a=>`<tr><td><button class="star ${favoriteKind('artists',a.id)?'on':''}" data-act="favorite" data-kind="artists" data-id="${a.id}">★</button><button class="btn alt small" data-act="artist" data-id="${a.id}">${esc(a.name)}</button></td><td>${esc(a.role)}</td><td>${a.age}</td><td>${a.rating}</td><td>+${a.chemistry}%</td><td><b>${artistEffective(a)}</b></td><td>${a.experience}</td><td><span class="pill ${a.starter?'green':''}">${a.starter?'Titular':'Suplente'}</span></td><td><div class="actions"><button class="btn small ${a.starter?'alt':'green'}" data-act="toggle-starter" data-id="${a.id}">${a.starter?'Pasar a suplente':'Hacer titular'}</button><button class="btn red small" data-act="release-artist" data-id="${a.id}">Dejar libre</button></div></td></tr>`).join('')}</tbody></table></div></div>
  <div class="card" style="margin-top:12px"><div class="sectiontitle"><div><div class="kicker">Cuerpo creativo</div><h2>Profesionales</h2></div></div>${setProfessionals(set).map(p=>{const as=assignmentFor(p,set.id);return `<div class="row"><div><b><button class="btn alt small" data-act="pro" data-id="${p.id}">${esc(p.name)}</button> · ${esc(p.type)}</b><small>Base ${p.rating} · Química +${as?.chemistry||0}% · Efectivo ${proEffective(p,set.id)} · Concentración ${concentrationFor(p)}%</small></div><div class="actions"><div class="rating ${ratingClass(p.rating)}">${p.rating}</div><button class="btn red small" data-act="release-pro" data-id="${p.id}">Desvincular</button></div></div>`}).join('')}</div>`;}
function toggleStarter(aid){const a=artistById(aid);if(!a||a.setId!==S.playerSetId)return;const entering=!a.starter;const expFactor=1-clamp(a.experience/120,0,.65);const penalty=one((entering?0.7:0.5)*(0.7+expFactor));a.starter=entering;S.player.rubrics['Rodaje general']=clamp(one(S.player.rubrics['Rodaje general']-penalty),0,120);notify('Plantel',`${a.name} pasó a ser ${entering?'titular':'suplente'}. Rodaje -${penalty}.`);queueSave();render();}
;
function releaseArtist(aid){
  const set=playerSet(),a=set.roster.find(x=>x.id===aid);if(!a)return;
  a.pastChemistry[set.id]=a.chemistry||0;set.roster=set.roster.filter(x=>x.id!==aid);a.setId=null;a.status='Libre';a.starter=false;a.tenure=0;a.chemistry=0;S.freeArtists.push(a);
  addNews(`${a.name} dejó ${set.name} y quedó libre.`);notify('Plantel',`${a.name} fue dejado libre. Si vuelve en el futuro recuperará el 50% de la Química que tenía.`);queueSave();render();
}
function releaseProfessional(pid){
  const set=playerSet(),p=proById(pid),as=p&&assignmentFor(p,set.id);if(!p||!as)return;
  p.pastChemistry[set.id]=as.chemistry||0;p.assignments=p.assignments.filter(a=>a.setId!==set.id);set.professionalIds=set.professionalIds.filter(x=>x!==pid);
  addNews(`${p.name} dejó de trabajar con ${set.name}.`);notify('Plantel',`${p.name} fue desvinculado del conjunto.`);queueSave();render();
}
;
function marketArtists(){return allArtists().filter(a=>a.setId!==S.playerSetId);}
function entityStatus(a){if(a.kind==='artist')return a.setId?`En ${setById(a.setId)?.name||'otro conjunto'}`:'Libre';return a.assignments?.length?`${a.assignments.length} conjunto${a.assignments.length>1?'s':''}`:'Libre';}
function renderMarket(){
  const isA=U.marketType==='artists',f=U.filters;
  let items=isA?marketArtists():S.professionals.filter(p=>!p.assignments.some(a=>a.setId===S.playerSetId));
  items=items.filter(x=>{
    const name=x.name.toLowerCase().includes(f.q.toLowerCase());if(!name)return false;
    if(isA&&f.cat!=='Todas'&&x.category!==f.cat)return false;
    const role=isA?x.role:x.type;if(f.role!=='Todos'&&role!==f.role)return false;
    if(f.minRating&&x.rating<Number(f.minRating))return false;
    if(isA&&f.maxAge&&x.age>Number(f.maxAge))return false;
    if(f.minExp&&x.experience<Number(f.minExp))return false;
    const free=isA?!x.setId:!x.assignments.length;if(f.status==='Libre'&&!free)return false;if(f.status==='En conjunto'&&free)return false;
    if(f.maxSalary&&x.demands.salary>Number(f.maxSalary))return false;
    if(f.favorites&&!favoriteKind(isA?'artists':'professionals',x.id))return false;
    return true;
  }).sort((a,b)=>b.rating-a.rating);
  const roles=isA?[...new Set(marketArtists().map(a=>a.role))].sort():PRO_TYPES;
  return `<div class="card"><div class="sectiontitle"><div><div class="kicker">Mercado</div><h2>Artistas y profesionales</h2></div></div><div class="tabs"><button data-act="market-type" data-val="artists" class="${isA?'on':''}">Artistas</button><button data-act="market-type" data-val="professionals" class="${!isA?'on':''}">Profesionales</button></div>
  <div class="filters"><div class="field"><label>Buscar</label><input data-filter="q" value="${esc(f.q)}" placeholder="Nombre"></div>${isA?`<div class="field"><label>Categoría</label><select data-filter="cat"><option>Todas</option>${Object.keys(CAT).map(c=>`<option ${f.cat===c?'selected':''}>${c}</option>`).join('')}</select></div>`:''}<div class="field"><label>${isA?'Rol':'Especialidad'}</label><select data-filter="role"><option>Todos</option>${roles.map(r=>`<option ${f.role===r?'selected':''}>${esc(r)}</option>`).join('')}</select></div><div class="field"><label>Valoración mínima</label><input data-filter="minRating" type="number" min="0" max="130" value="${esc(f.minRating)}"></div>${isA?`<div class="field"><label>Edad máxima</label><input data-filter="maxAge" type="number" min="18" value="${esc(f.maxAge)}"></div>`:''}<div class="field"><label>Experiencia mínima</label><input data-filter="minExp" type="number" min="0" max="100" value="${esc(f.minExp)}"></div><div class="field"><label>Situación</label><select data-filter="status"><option ${f.status==='Todos'?'selected':''}>Todos</option><option ${f.status==='Libre'?'selected':''}>Libre</option><option ${f.status==='En conjunto'?'selected':''}>En conjunto</option></select></div><div class="field"><label>Pretensión mensual máxima</label><input data-filter="maxSalary" type="number" min="0" value="${esc(f.maxSalary)}" placeholder="$"></div></div>
  <label class="pill gold"><input type="checkbox" data-filter="favorites" ${f.favorites?'checked':''}> Solo favoritos</label>
  <div class="scroll" style="margin-top:10px"><table><thead><tr><th></th><th>Nombre</th><th>${isA?'Categoría / Rol':'Especialidad'}</th><th>Valoración</th><th>Experiencia</th><th>Situación</th><th>Pretensión</th><th></th></tr></thead><tbody>${items.slice(0,120).map(x=>{const kind=isA?'artists':'professionals', blocked=!isA&&x.assignments.some(a=>a.category===playerSet().category);return `<tr><td><button class="star ${favoriteKind(kind,x.id)?'on':''}" data-act="favorite" data-kind="${kind}" data-id="${x.id}">★</button></td><td><button class="btn alt small" data-act="${isA?'artist':'pro'}" data-id="${x.id}">${esc(x.name)}</button></td><td>${isA?`${x.category} · ${esc(x.role)}`:esc(x.type)}</td><td><b>${x.rating}</b></td><td>${x.experience}</td><td>${esc(entityStatus(x))}</td><td>${money(x.demands.salary)}/mes</td><td><button class="btn small" data-act="negotiate" data-kind="${kind}" data-id="${x.id}" ${blocked?'disabled':''}>${blocked?'Ya trabaja en esta categoría':'Negociar'}</button></td></tr>`}).join('')}</tbody></table></div>${!items.length?'<div class="empty">No hay resultados con esos filtros.</div>':''}</div>`;
}
;
function renderSets(){
  if(!U.setCategory)return `<div class="hero"><div class="kicker">Directorio</div><h1>Conjuntos</h1><p class="muted">Elegí una categoría para ver todos sus conjuntos, plantillas, profesionales, historia y premios.</p></div><div class="categoryCards" style="margin-top:12px">${Object.entries(CAT).map(([k,c])=>`<button class="catcard" data-act="set-cat" data-val="${k}"><span>${c.icon}</span><strong>${c.label}</strong><small>${S.sets.filter(s=>s.category===k).length} conjuntos</small></button>`).join('')}</div>`;
  const sets=S.sets.filter(s=>s.category===U.setCategory).sort((a,b)=>b.prestige-a.prestige);
  return `<div class="card"><div class="split"><div><button class="btn alt small" data-act="set-back">← Categorías</button><h2 style="margin-top:10px">${CAT[U.setCategory].icon} ${CAT[U.setCategory].label}</h2></div></div>${sets.map(set=>{const est=isJanuary()&&!set.isPlayer?estimateRange(set):null;return `<div class="row"><div><b>${esc(set.name)} ${set.isPlayer?'<span class="pill gold">Tu conjunto</span>':''}</b><small>Prestigio ${set.prestige} · Popularidad ${set.popularity} · Economía ${economicLabel(set.budget)}${est?` · ${est.label} ${est.lo}–${est.hi}`:''}</small></div><div class="actions"><button class="btn alt small" data-act="open-set" data-id="${set.id}">Ver ficha</button></div></div>`}).join('')}</div>`;
}
function renderSetModal(set){
  const est=isJanuary()&&!set.isPlayer?estimateRange(set):null;
  return `<div class="modal wide"><div class="modalhead"><div><div class="kicker">${CAT[set.category].label}</div><h2>${esc(set.name)}</h2></div><button class="x" data-act="close-modal">×</button></div>
  <div class="stats"><div class="stat"><span>Prestigio</span><b>${set.prestige}</b></div><div class="stat"><span>Popularidad</span><b>${set.popularity}</b></div><div class="stat"><span>Economía</span><b>${economicLabel(set.budget)}</b></div><div class="stat"><span>Plantilla</span><b>${set.roster.length}</b></div><div class="stat"><span>Profesionales</span><b>${set.professionalIds.length}</b></div><div class="stat"><span>Espectáculo</span><b>${set.isPlayer?playerSpectacleRating():est?`${est.label} ${est.lo}–${est.hi}`:'Disponible desde enero'}</b></div></div>
  <div class="grid"><div class="card"><h3>Artistas</h3>${set.roster.sort((a,b)=>artistEffective(b)-artistEffective(a)).map(a=>`<div class="row"><div><button class="btn alt small" data-act="artist" data-id="${a.id}">${esc(a.name)}</button><small>${esc(a.role)} · Base ${a.rating} · Química +${a.chemistry}% · Efectivo ${artistEffective(a)}</small></div><div class="rating ${ratingClass(a.rating)}">${a.rating}</div></div>`).join('')}</div><div class="card"><h3>Profesionales</h3>${setProfessionals(set).map(p=>{const as=assignmentFor(p,set.id);return `<div class="row"><div><button class="btn alt small" data-act="pro" data-id="${p.id}">${esc(p.name)}</button><small>${esc(p.type)} · Base ${p.rating} · Química +${as?.chemistry||0}% · Concentración ${concentrationFor(p)}%</small></div><div class="rating ${ratingClass(p.rating)}">${p.rating}</div></div>`}).join('')}</div>
  <div class="card"><h3>Historial de Carnaval</h3>${set.history.length?set.history.slice().sort((a,b)=>b.year-a.year).map(h=>`<div class="row"><div><b>${h.year} · ${h.position}.º puesto</b><small>${h.liguilla?'Clasificó a Liguilla':'No clasificó a Liguilla'}${h.awards?.length?` · ${h.awards.join(', ')}`:''}</small></div></div>`).join(''):'<div class="empty">Sin participaciones anteriores registradas.</div>'}</div><div class="card"><h3>Premios</h3>${set.awards.length?set.awards.map(a=>`<span class="pill gold">${esc(a)}</span>`).join(''):'<div class="empty">Sin premios registrados.</div>'}</div></div>`;
}
;
function currentWeekEvents(){return S.player.plan[S.cal.globalWeek]||[];}
function maxRehearsals(){return S.cal.m<7?2:5;}
function renderCalendar(){
  const ev=currentWeekEvents(),count=ev.filter(x=>x.type==='ensayo').length,recommend=S.cal.m<7?'1–2 ensayos':'4–5 ensayos';
  return `<div class="hero"><div class="split"><div><div class="kicker">Planificación semanal</div><h1>${monthNow()} · Semana ${S.cal.w}</h1><p class="muted">Para esta etapa: ${recommend}. Cada ensayo tiene 3 partes.${S.cal.m>=7?' Los ensayos abiertos pueden generar ingresos por comida y merchandising.':''}</p></div><button class="btn" data-act="advance-week">Avanzar semana</button></div><div><span class="pill gold">Ensayos ${count}/${maxRehearsals()}</span><span class="pill">Festivales ${ev.filter(x=>x.type==='festival').length}</span></div></div>
  <div class="week" style="margin-top:12px">${DAYS.map((d,i)=>{const event=ev.find(x=>x.day===i);return `<div class="day"><b>${d}</b>${event?`<div class="chip">${event.type==='ensayo'?`Ensayo<br>${event.parts.map(x=>esc(x)).join(' · ')}`:`Festival<br>${esc(event.host)}<br>${money(event.pay)}`}</div><button class="btn red small" data-act="remove-event" data-id="${event.id}" style="margin-top:8px">Quitar</button>`:`<div style="display:grid;gap:6px;margin-top:8px"><button class="btn alt small" data-act="plan-rehearsal" data-day="${i}" ${count>=maxRehearsals()?'disabled':''}>+ Ensayo</button><button class="btn alt small" data-act="plan-festival" data-day="${i}">+ Festival</button></div>`}</div>`}).join('')}</div>`;
}
function renderRehearsalModal(){const parts=U.rehearsal.parts,cost=parts.reduce((n,p)=>n+(p==='Ensayo completo'?2:1),0);return `<div class="modal"><div class="modalhead"><div><div class="kicker">${DAYS[U.rehearsal.day]}</div><h2>Planificar ensayo</h2></div><button class="x" data-act="close-modal">×</button></div><p class="muted">Elegí 3 partes. Podés repetir un foco. Ensayo completo ocupa 2 partes y trabaja principalmente coordinación y rodaje.</p><div class="note">Espacio usado: <b>${cost}/3</b></div><div class="parts">${REHEARSAL_PARTS.map(p=>`<button data-act="add-part" data-val="${esc(p)}" ${(cost+(p==='Ensayo completo'?2:1)>3)?'disabled':''}>${esc(p)}</button>`).join('')}</div><div style="margin-top:12px">${parts.map((p,i)=>`<span class="pill gold">${esc(p)} <button data-act="remove-part" data-index="${i}" style="border:0;background:transparent;color:inherit">×</button></span>`).join('')}</div><div class="split" style="margin-top:16px"><button class="btn alt" data-act="close-modal">Cancelar</button><button class="btn" data-act="save-rehearsal" ${cost!==3?'disabled':''}>Guardar ensayo</button></div></div>`;}
function saveRehearsal(){const cost=U.rehearsal.parts.reduce((n,p)=>n+(p==='Ensayo completo'?2:1),0),ev=currentWeekEvents();if(cost!==3)return;if(ev.some(x=>x.day===U.rehearsal.day))return alert('Ese día ya tiene una actividad.');if(ev.filter(x=>x.type==='ensayo').length>=maxRehearsals())return alert('Ya alcanzaste el máximo de ensayos para esta etapa.');ev.push({id:id(),type:'ensayo',day:U.rehearsal.day,parts:[...U.rehearsal.parts]});S.player.plan[S.cal.globalWeek]=ev;U.modal=null;queueSave();render();}
function planFestival(day){const ev=currentWeekEvents();if(ev.some(x=>x.day===day))return;const hosts=S.sets.filter(s=>!s.isPlayer&&s.category===playerSet().category),host=pick(hosts);ev.push({id:id(),type:'festival',day,host:host?.name||'Festival de Carnaval',pay:rand(9000,26000),pop:rand(1,3)});S.player.plan[S.cal.globalWeek]=ev;queueSave();render();}
function removePlanned(eventId){const wk=S.cal.globalWeek;S.player.plan[wk]=currentWeekEvents().filter(x=>x.id!==eventId);queueSave();render();}
function areaPros(area){return setProfessionals(playerSet()).filter(p=>PRIMARY_AREA[p.type]===area);}
function secondaryAreaScore(p,area){const a=p.attrs||{},vals=area==='Voces / Musicalidad'?[a.Musicalidad,a.Técnica,a.Comunicación]:area==='Textos / Interpretación'?[a.Escritura,a.Creatividad,a.Comunicación]:area==='Puesta en escena'?[a.Escena,a.Creatividad,a.Adaptación]:area==='Coreografía / Bailes'?[a.Movimiento,a.Técnica,a.Adaptación]:[a.Estética,a.Creatividad,a.Técnica];return avg(vals.filter(Number.isFinite));}
function areaProfessionalPower(area){
  const prim=areaPros(area),values=prim.map(p=>proOutput(p,S.playerSetId));
  setProfessionals(playerSet()).forEach(p=>{if(PRIMARY_AREA[p.type]===area)return;const fit=secondaryAreaScore(p,area);if(fit>=72)values.push(proOutput(p,S.playerSetId)*clamp((fit-55)/100,.12,.35));});
  return values.length?avg(values):40;
}
;
function processRehearsal(ev){
  const improvements={},workImp={},counts={},explanations=[];
  ev.parts.forEach(part=>{
    counts[part]=(counts[part]||0)+1;const repeat=counts[part],diminish=repeat===1?1:repeat===2?.78:.62;
    if(part==='Ensayo completo'){
      const d=one((Math.random()*.45+.65)*diminish);improvements['Rodaje general']=(improvements['Rodaje general']||0)+d;
      Object.keys(S.player.works).forEach(a=>{const z=one((Math.random()*.08+.06)*diminish);improvements[a]=(improvements[a]||0)+z;});
      explanations.push('El ensayo completo mejoró especialmente la coordinación y el rodaje general.');
    }else{
      const power=areaProfessionalPower(part),mult=.8+clamp(power/100,0,.45),d=one((Math.random()*.38+.38)*mult*diminish),wd=one((Math.random()*.22+.12)*clamp(power/75,.65,1.45)*diminish);
      improvements[part]=(improvements[part]||0)+d;workImp[part]=(workImp[part]||0)+wd;
      const pro=areaPros(part)[0];explanations.push(pro?`${pro.name} aprovechó el trabajo de ${part.toLowerCase()} para ajustar su aporte al espectáculo.`:`El plantel mejoró ${part.toLowerCase()} a partir de la repetición y la práctica.`);
    }
  });
  Object.entries(improvements).forEach(([k,v])=>S.player.rubrics[k]=clamp(one((S.player.rubrics[k]||0)+v),0,130));
  Object.entries(workImp).forEach(([k,v])=>S.player.works[k]=clamp(one((S.player.works[k]||0)+v),0,130));
  const lines=[...Object.entries(improvements).map(([k,v])=>`${k} +${one(v)}`),...Object.entries(workImp).map(([k,v])=>`Trabajo creativo — ${k} +${one(v)}`)];
  return {title:`Ensayo del ${DAYS[ev.day]}`,lines,explanation:[...new Set(explanations)].join(' ')};
}
function passiveProfessionalProgress(){const set=playerSet();setProfessionals(set).forEach(p=>{const area=PRIMARY_AREA[p.type],power=proOutput(p,set.id),inc=one((Math.random()*.08+.03)*clamp(power/75,.55,1.35));S.player.works[area]=clamp(one((S.player.works[area]||0)+inc),0,130);});}
function annualChemistry(){
  S.sets.forEach(set=>set.roster.forEach(a=>{a.tenure=(a.tenure||1)+1;a.chemistry=Math.min(30,(a.chemistry||0)+1);}));
  S.professionals.forEach(p=>p.assignments.forEach(a=>{a.tenure=(a.tenure||1)+1;a.chemistry=Math.min(30,(a.chemistry||0)+1);}));
}
function simulateWorld(){
  const aiSets=S.sets.filter(s=>!s.isPlayer);
  if(Math.random()<.6&&S.freeArtists.length){const a=pick(S.freeArtists),set=pick(aiSets.filter(s=>s.category===a.category));if(set){S.freeArtists=S.freeArtists.filter(x=>x.id!==a.id);a.setId=set.id;a.status='Plantel';a.tenure=1;a.chemistry=0;a.history.push({year:S.year,set:set.name,category:set.category});set.roster.push(a);addNews(`${set.name} incorporó a ${a.name}.`);if(favoriteKind('artists',a.id))notify('Mercado',`${a.name}, uno de tus favoritos, fichó por ${set.name}.`);}}
  if(Math.random()<.35){const sets=aiSets.filter(s=>s.roster.length>rosterSize(s.category)-2);if(sets.length){const set=pick(sets),a=pick(set.roster);set.roster=set.roster.filter(x=>x.id!==a.id);a.pastChemistry[set.id]=a.chemistry||0;a.setId=null;a.status='Libre';a.tenure=0;a.chemistry=0;S.freeArtists.push(a);addNews(`${a.name} dejó ${set.name} y quedó libre.`);if(favoriteKind('artists',a.id))notify('Mercado',`${a.name}, uno de tus favoritos, quedó libre.`);}}
  if(Math.random()<.38){const set=pick(aiSets),p=pick(S.professionals.filter(p=>!p.assignments.some(a=>a.category===set.category)&&p.assignments.length<5));if(set&&p){p.assignments.push({setId:set.id,category:set.category,tenure:1,chemistry:0,contract:makeDemands(p.rating)});p.history.push({set:set.name,category:set.category,fromYear:S.year});set.professionalIds.push(p.id);addNews(`${set.name} incorporó a ${p.name} como ${p.type}.`);if(favoriteKind('professionals',p.id))notify('Mercado',`${p.name}, uno de tus profesionales favoritos, comenzó a trabajar con ${set.name}.`);}}
  if(Math.random()<.2){const set=pick(aiSets.filter(s=>s.professionalIds.length>2));if(set){const p=proById(pick(set.professionalIds)),as=p&&assignmentFor(p,set.id);if(p&&as){p.pastChemistry[set.id]=as.chemistry||0;p.assignments=p.assignments.filter(a=>a.setId!==set.id);set.professionalIds=set.professionalIds.filter(x=>x!==p.id);addNews(`${p.name} dejó de trabajar con ${set.name}.`);if(favoriteKind('professionals',p.id))notify('Mercado',`${p.name}, uno de tus profesionales favoritos, dejó ${set.name}.`);}}}
  if(Math.random()<.32){const set=pick(aiSets),a=pick(marketArtists());if(set&&a)addNews(`${set.name} intentó negociar con ${a.name}, pero no llegó a un acuerdo.`);}
}
;
async function advanceWeek(){
  const events=currentWeekEvents();if(!events.length&&!confirm('Semana sin actividades. ¿Querés avanzar igual?')){render();return;}
  const rehearsals=events.filter(x=>x.type==='ensayo'),festivals=events.filter(x=>x.type==='festival');S.player.lastReports=rehearsals.map(processRehearsal);
  const focused=new Set(rehearsals.flatMap(r=>r.parts.filter(x=>x!=='Ensayo completo')));Object.keys(S.player.works).forEach(a=>{if(!focused.has(a))S.player.rubrics[a]=clamp(one(S.player.rubrics[a]-.08),0,130);});if(!rehearsals.some(r=>r.parts.includes('Ensayo completo')))S.player.rubrics['Rodaje general']=clamp(one(S.player.rubrics['Rodaje general']-.05),0,130);
  let income=festivals.reduce((n,e)=>n+(e.pay||0),0);festivals.forEach(e=>playerSet().popularity=clamp(playerSet().popularity+(e.pop||0),0,100));if(S.cal.m>=7)income+=rehearsals.reduce(n=>n+rand(2500,11000),0);
  const artistExpenses=playerSet().roster.reduce((n,a)=>n+((a.contract?.salary||0)/4.33),0),proExpenses=setProfessionals(playerSet()).reduce((n,p)=>n+((assignmentFor(p,S.playerSetId)?.contract?.salary||0)/4.33),0),expenses=Math.round(artistExpenses+proExpenses),net=Math.round(income-expenses);
  S.player.money+=net;playerSet().budget=S.player.money;S.player.lastFinance={income:Math.round(income),expenses,net};addNews(`Semana cerrada: ${net>=0?'+':''}${money(net)} · espectáculo ${playerSpectacleRating()}.`);
  passiveProfessionalProgress();simulateWorld();
  S.cal.globalWeek++;S.cal.w++;if(S.cal.w>4){S.cal.w=1;S.cal.m++;if(S.cal.m>9){S.cal.m=0;S.year++;annualChemistry();notify('Administración',`Comienza la temporada ${S.year}. La Química aumentó para quienes continúan en sus conjuntos.`);}else if(S.cal.m===7)notify('Competición','Comenzó noviembre. Se acerca la Prueba de Admisión.');else if(S.cal.m===9)notify('Competición','Comenzó enero. Ya podés ver estimaciones de los espectáculos de los demás conjuntos.');}
  await cloudSave();U.view='Inicio';render();
}
function renderSpectacle(){return `<div class="hero"><div class="split"><div><div class="kicker">Estado del espectáculo</div><h1>Valoración ${playerSpectacleRating()}</h1><p class="muted">La valoración combina titulares, rubros, material creativo y aporte de profesionales.</p></div><div class="rating ${ratingClass(playerSpectacleRating())}">${playerSpectacleRating()}</div></div></div><div class="grid"><div class="card"><h3>Rubros y ejecución</h3>${RUBRICS.map(r=>`<div class="progressline"><span>${esc(r)}</span><div class="bar"><i style="width:${Math.min(100,S.player.rubrics[r])}%"></i></div><b>${one(S.player.rubrics[r])}</b></div>`).join('')}</div><div class="card"><h3>Trabajo creativo en evolución</h3>${Object.entries(S.player.works).map(([r,v])=>`<div class="progressline"><span>${esc(r)}</span><div class="bar"><i style="width:${Math.min(100,v)}%"></i></div><b>${one(v)}</b></div>`).join('')}<div class="note" style="margin-top:10px">El trabajo creado puede superar lo esperable para el profesional si la temporada y los ensayos acompañan. La Concentración modifica cuánto puede aportar a cada conjunto.</div></div></div>`;}
function renderNews(){return `<div class="card"><div class="sectiontitle"><div><div class="kicker">Mundo del juego</div><h2>Actualidad</h2><p class="muted">Se muestran resultados de movimientos e intentos fallidos, pero nunca montos de negociaciones ajenas.</p></div></div>${S.news.map(n=>`<div class="row"><div><b>${esc(n.text)}</b><small>Semana ${n.week} · Temporada ${n.year||S.year}</small></div></div>`).join('')}</div>`;}
function renderInbox(){const cats=['Mercado','Plantel','Competición','Administración'],items=S.notifications[U.notifTab]||[];items.forEach(n=>n.read=true);queueSave();return `<div class="card"><div class="sectiontitle"><div><div class="kicker">Privado</div><h2>Bandeja</h2></div></div><div class="tabs">${cats.map(c=>`<button data-act="notif-tab" data-val="${c}" class="${U.notifTab===c?'on':''}">${c}</button>`).join('')}</div>${items.length?items.map(n=>`<div class="row notif ${n.read?'read':''}"><div><b>${esc(n.text)}</b><small>Semana ${n.week} · ${n.year||S.year}</small></div></div>`).join(''):'<div class="empty">No hay avisos en esta categoría.</div>'}</div>`;}
function renderUpdates(){return `<div class="hero"><div class="kicker">Historial de versiones</div><h1>Actualizaciones</h1><p class="muted">Notas de actualización del juego, en español.</p></div>${PATCHES.map(p=>`<div class="card patch" style="margin-top:12px"><div class="kicker">Versión ${p.v}</div><h2>${esc(p.title)}</h2><ul>${p.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}`;}
;
function renderArtistModal(a){const set=a.setId?setById(a.setId):null;return `<div class="modal"><div class="modalhead"><div><div class="kicker">Artista</div><h2>${esc(a.name)}</h2><p class="muted">${a.category} · ${esc(a.role)} · ${a.age} años</p></div><button class="x" data-act="close-modal">×</button></div><div class="stats"><div class="stat"><span>Valoración base</span><b>${a.rating}</b></div><div class="stat"><span>Química</span><b>+${a.chemistry||0}%</b></div><div class="stat"><span>Rendimiento efectivo</span><b>${artistEffective(a)}</b></div><div class="stat"><span>Experiencia</span><b>${a.experience}</b></div><div class="stat"><span>Años en conjunto</span><b>${a.tenure||0}</b></div><div class="stat"><span>Situación</span><b>${set?esc(set.name):'Libre'}</b></div></div><div class="card" style="margin-top:12px"><h3>Estadísticas</h3>${Object.entries(a.attrs).map(([k,v])=>{const eff=one(v*(1+(a.chemistry||0)/100));return `<div class="progressline"><span>${esc(k)}</span><div class="bar"><i style="width:${Math.min(100,v)}%"></i></div><b>${v} → ${eff}</b></div>`}).join('')}</div>${a.history?.length?`<div class="card" style="margin-top:12px"><h3>Trayectoria</h3>${a.history.map(h=>`<div class="row"><div><b>${esc(h.set)}</b><small>${h.year} · ${h.category}</small></div></div>`).join('')}</div>`:''}</div>`;}
function renderProModal(p){return `<div class="modal"><div class="modalhead"><div><div class="kicker">Profesional</div><h2>${esc(p.name)}</h2><p class="muted">${esc(p.type)}</p></div><button class="x" data-act="close-modal">×</button></div><div class="stats"><div class="stat"><span>Valoración</span><b>${p.rating}</b></div><div class="stat"><span>Experiencia</span><b>${p.experience}</b></div><div class="stat"><span>Prestigio</span><b>${p.prestige}</b></div><div class="stat"><span>Concentración</span><b>${concentrationFor(p)}%</b></div><div class="stat"><span>Conjuntos</span><b>${p.assignments.length}</b></div><div class="stat"><span>Área principal</span><b>${PRIMARY_AREA[p.type]}</b></div></div><div class="card" style="margin-top:12px"><h3>Estadísticas</h3>${Object.entries(p.attrs).map(([k,v])=>`<div class="progressline"><span>${esc(k)}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('')}</div><div class="card" style="margin-top:12px"><h3>Trabajos actuales</h3>${p.assignments.length?p.assignments.map(a=>{const set=setById(a.setId);return `<div class="row"><div><b>${esc(set?.name||'Conjunto')}</b><small>${a.category} · ${a.tenure} año(s) · Química +${a.chemistry}% · Efectivo ${proEffective(p,a.setId)}</small></div></div>`}).join(''):'<div class="empty">Actualmente libre.</div>'}<div class="note" style="margin-top:10px">Con ${p.assignments.length||0} conjunto(s), su Concentración es ${concentrationFor(p)}%. Esta cifra afecta la calidad de lo que crea, no su valoración base.</div></div>${p.history?.length?`<div class="card" style="margin-top:12px"><h3>Trayectoria</h3>${p.history.slice().reverse().map(h=>`<div class="row"><div><b>${esc(h.set)}</b><small>${h.category} · desde ${h.fromYear}</small></div></div>`).join('')}</div>`:''}${p.awards?.length?`<div class="card" style="margin-top:12px"><h3>Premios</h3>${p.awards.map(a=>`<span class="pill gold">${esc(a)}</span>`).join('')}</div>`:''}</div>`;}
;
function openNegotiation(kind,entityId){const e=kind==='artists'?artistById(entityId):proById(entityId);if(!e)return;const d=e.demands;U.negotiation={kind,entityId,round:1,offer:{salary:Math.round(d.salary*.72),tablado:Math.round(d.tablado*.7),teatro:Math.round(d.teatro*.7),bonus:Math.round(d.bonus*.7),febPct:Math.max(0,d.febPct-2)},counter:null,message:''};U.modal='negotiation';render();}
function offerScore(o,d){const ratios=['salary','tablado','teatro','bonus'].map(k=>Math.min(1.2,(Number(o[k])||0)/Math.max(1,d[k])));const pct=d.febPct?Math.min(1.2,(Number(o.febPct)||0)/d.febPct):1;return avg([...ratios,pct]);}
function suggestedCounter(e,round){const d=e.demands,disc=Math.min(.1,(round-1)*.02);return {salary:Math.round(d.salary*(1-disc)),tablado:Math.round(d.tablado*(1-disc)),teatro:Math.round(d.teatro*(1-disc)),bonus:Math.round(d.bonus*(1-disc)),febPct:Math.max(0,Math.round(d.febPct*(1-disc)))};}
function readOffer(){const q=k=>Number(document.getElementById(`offer-${k}`)?.value||0);return {salary:q('salary'),tablado:q('tablado'),teatro:q('teatro'),bonus:q('bonus'),febPct:q('febPct')};}
async function sendOffer(){const n=U.negotiation,e=n.kind==='artists'?artistById(n.entityId):proById(n.entityId);n.offer=readOffer();if(offerScore(n.offer,e.demands)>=.94){completeHire(e,n.kind,n.offer);U.modal=null;U.negotiation=null;await cloudSave();render();return;}n.counter=suggestedCounter(e,n.round);n.message=`${e.name} no acepta. Te propone estas condiciones para continuar.`;n.round++;render();}
function renderNegotiation(){const n=U.negotiation,e=n.kind==='artists'?artistById(n.entityId):proById(n.entityId),o=n.offer,c=n.counter;const replace=n.kind==='professionals'&&playerSet().professionalIds.map(proById).some(p=>p?.type===e.type);return `<div class="modal"><div class="modalhead"><div><div class="kicker">Negociación · ronda ${n.round}</div><h2>${esc(e.name)}</h2><p class="muted">${n.kind==='artists'?`${e.category} · ${esc(e.role)}`:esc(e.type)}</p></div><button class="x" data-act="close-modal">×</button></div>${replace?`<div class="note warn">Ya tenés un profesional de ${esc(e.type)}. Si llegás a un acuerdo, reemplazará al actual en tu conjunto.</div>`:''}${n.message?`<div class="note warn" style="margin-top:8px">${esc(n.message)}</div>`:''}<div class="grid"><div class="field"><label>Sueldo mensual</label><input id="offer-salary" type="number" value="${o.salary}"></div><div class="field"><label>Por tablado / evento</label><input id="offer-tablado" type="number" value="${o.tablado}"></div><div class="field"><label>Por Teatro de Verano</label><input id="offer-teatro" type="number" value="${o.teatro}"></div><div class="field"><label>Bono por objetivos</label><input id="offer-bonus" type="number" value="${o.bonus}"></div><div class="field"><label>% ingresos de febrero</label><input id="offer-febPct" type="number" min="0" max="100" value="${o.febPct}"></div></div>${c?`<div class="card" style="margin-top:10px"><h3>Contraoferta solicitada</h3><p class="muted">${money(c.salary)}/mes · ${money(c.tablado)} por tablado · ${money(c.teatro)} por Teatro · bono ${money(c.bonus)} · ${c.febPct}% de febrero.</p><button class="btn green" data-act="accept-counter">Aceptar contraoferta</button></div>`:''}<div class="split" style="margin-top:15px"><button class="btn red" data-act="reject-negotiation">Terminar negociación</button><button class="btn" data-act="send-offer">Enviar ${c?'nueva contraoferta':'oferta'}</button></div></div>`;}
;
function completeHire(e,kind,contract){
  const set=playerSet();
  if(kind==='artists'){
    if(e.setId){const old=setById(e.setId);if(old){old.roster=old.roster.filter(a=>a.id!==e.id);e.pastChemistry[old.id]=e.chemistry||0;addNews(`${e.name} dejó ${old.name} y se incorporó a ${set.name}.`);}}
    else{S.freeArtists=S.freeArtists.filter(a=>a.id!==e.id);addNews(`${set.name} incorporó a ${e.name}.`);}
    const recovered=Math.floor((e.pastChemistry[set.id]||0)*.5);e.setId=set.id;e.status='Plantel';e.starter=false;e.tenure=1;e.chemistry=recovered;e.contract=contract;e.history.push({year:S.year,set:set.name,category:set.category});set.roster.push(e);notify('Mercado',`Acuerdo cerrado con ${e.name}. Se incorpora como suplente${recovered?` y recupera ${recovered}% de Química`:''}.`);
  }else{
    const current=setProfessionals(set).find(p=>p.type===e.type);if(current){const as=assignmentFor(current,set.id);if(as)current.pastChemistry[set.id]=as.chemistry||0;current.assignments=current.assignments.filter(a=>a.setId!==set.id);set.professionalIds=set.professionalIds.filter(pid=>pid!==current.id);}
    const recovered=Math.floor((e.pastChemistry[set.id]||0)*.5);e.assignments.push({setId:set.id,category:set.category,tenure:1,chemistry:recovered,contract});e.history.push({set:set.name,category:set.category,fromYear:S.year});set.professionalIds.push(e.id);addNews(`${set.name} incorporó a ${e.name} como ${e.type}.`);notify('Mercado',`Acuerdo cerrado con ${e.name}. Concentración actual: ${concentrationFor(e)}%.`);
  }
  queueSave();
}
;
function renderModal(){
  if(!U.modal)return '';
  let inside='';
  if(U.modal==='set')inside=renderSetModal(setById(U.selectedSet));
  if(U.modal==='artist')inside=renderArtistModal(artistById(U.selectedSet));
  if(U.modal==='pro')inside=renderProModal(proById(U.selectedSet));
  if(U.modal==='rehearsal')inside=renderRehearsalModal();
  if(U.modal==='negotiation')inside=renderNegotiation();
  return `<div class="modalbg">${inside}</div>`;
}
;

/* Carnaval Uruguay v0.3: formaciones y mundo persistente */
const V3_FORMATIONS={
 Murga:[['Director escénico',1],['Platillos',1],['Bombo',1],['Redoblante',1],['Sobreprimo',2],['Primo',6],['Segundo',5]],
 Parodistas:[['Bailarín',10],['Actor',4],['Cantante',6],['Tecladista',1]],
 Humoristas:[['Bailarín',6],['Actor',5],['Cantante',3],['Guitarrista',1],['Bajista',1],['Baterista',1],['Tecladista',1]],
 Revista:[['Bailarín',5],['Bailarina',5],['Actor',3],['Cantante',6],['Guitarrista',1],['Bajista',1],['Baterista',1],['Tecladista',1],['Saxofonista',1],['Trombonista',1],['Trompetista',1]],
 Lubolos:[['Tambor chico',6],['Tambor piano',4],['Tambor repique',2],['Bailarina',12],['Bailarín',2],['Portabandera',4],['Gramillero',2],['Mama Vieja',2],['Compañero de Mama Vieja',2],['Vedette',3],['Escobero',1],['Portaestandarte',1],['Actor',4],['Cantante',6],['Guitarrista',1],['Bajista',1],['Tecladista',1],['Saxofonista',1],['Trombonista',1],['Trompetista',1]]
};
const V3_SUBS={Murga:4,Parodistas:6,Humoristas:5,Revista:6,Lubolos:18};
const V3_DIRECT={Murga:10,Parodistas:4,Humoristas:3,Revista:3,Lubolos:4};
const V3_ADMIT_MIN={Murga:22,Parodistas:6,Humoristas:6,Revista:6,Lubolos:5};
const V3_QUALIFY={Murga:12,Parodistas:2,Humoristas:2,Revista:2,Lubolos:2};
const V3_MORE_NAMES={
 Murga:['La Revuelta','Todo Vuelve','La Peatonal','Los Rebeldes','La Noche Larga','A Media Voz','Los Impropios','Falta y Resto Sur','La Carambola','De Madrugada'],
 Parodistas:['Los del Ruedo','El Reparto','Los Narradores','Los Imperdibles'],
 Humoristas:['Los del Chiste','Punto y Aparte','La Risa Sigue','Humor del Puerto'],
 Revista:['Estrellas del Sur','Sueños de Revista','Marea de Colores','La Pasarela'],
 Lubolos:['Tambor del Pueblo','Ritmo Sur','Candela Morena']
};
Object.keys(V3_FORMATIONS).forEach(function(cat){ROLES[cat]=V3_FORMATIONS[cat].map(function(x){return x[0];});});
if(MONTHS.length===10){MONTHS.push('Febrero','Marzo');}
function v3Slots(cat){return V3_FORMATIONS[cat].flatMap(function(e){return Array.from({length:e[1]},function(){return e[0];});});}
function v3RoleMax(cat,role){return (V3_FORMATIONS[cat].find(function(x){return x[0]===role;})||[role,0])[1];}
function v3IsMusic(role){return /guitarrista|bajista|baterista|tecladista|saxofonista|trombonista|trompetista|bombo|platillos|redoblante|tambor /i.test(role);}
function v3Artist(cat,role,weak,tenure){
 var a=makeArtist(cat,{weak:!!weak,tenure:tenure||1});
 a.role=role;
 if(v3IsMusic(role)){a.attrs.Musicalidad=clamp(Math.round(a.rating+rand(-7,13)),10,100);}
 if(/Bail|Vedette|Escobero/i.test(role)){a.attrs.Baile=clamp(Math.round(a.rating+rand(-5,17)),10,100);}
 if(/Actor|Director escénico|Gramillero|Mama Vieja/i.test(role)){a.attrs.Actuación=clamp(Math.round(a.rating+rand(-4,16)),10,100);}
 if(/Cantante|Primo|Segundo/i.test(role)){a.attrs.Canto=clamp(Math.round(a.rating+rand(-4,17)),10,100);}
 if(/Tambor|Bombo|Platillos|Redoblante/i.test(role)){a.attrs.Percusión=clamp(Math.round(a.rating+rand(-5,15)),10,100);}
 if(role.startsWith('Tambor ')){['Tambor chico','Tambor piano','Tambor repique'].forEach(function(t){a.attrs[t]=clamp(a.rating+rand(-15,17),10,100);});}
 return a;
}
function v3SetRoster(set,weak){
 var list=v3Slots(set.category), prior=set.roster||[], skipped=weak?Math.max(2,Math.round(list.length*.11)):0, keep=list.length-skipped;
 set.roster=[];
 for(var i=0;i<keep;i++){
  var a=prior[i]||v3Artist(set.category,list[i],weak,weak?1:rand(1,7));
  a.role=list[i];a.category=set.category;
  a.setId=set.id;a.status='Plantel';a.starter=true;
  if(weak){a.tenure=1;a.chemistry=0;}
  if(v3IsMusic(a.role))a.attrs.Musicalidad=clamp(a.attrs.Musicalidad||a.rating,1,100);
  if(/Bail|Vedette/i.test(a.role))a.attrs.Baile=clamp(a.attrs.Baile||a.rating,1,100);
  if(/Tambor/.test(a.role)){a.attrs.Percusión=clamp(a.attrs.Percusión||a.rating,1,100);['Tambor chico','Tambor piano','Tambor repique'].forEach(function(t){a.attrs[t]=a.attrs[t]||clamp(a.rating+rand(-16,16),10,100);});}
  if(!a.contract)a.contract=makeDemands(a.rating);
  set.roster.push(a);
 }
 if(!set.utileros)set.utileros=set.isPlayer?[]:Array.from({length:rand(1,5)},function(){return {id:id(),name:pick(FN)+' '+pick(LN),since:rand(2015,2027)};});
}
function v3NewAISet(cat,name){
 var set={id:id(),name:name,category:cat,prestige:rand(18,67),popularity:rand(12,64),budget:rand(250000,1050000),style:pick(['Austero','Equilibrado','Apuesta por jóvenes']),roster:[],professionalIds:[],history:[],awards:[],spectacleSeed:rand(48,85),isPlayer:false,restUntil:0};
 v3SetRoster(set,false);
 PRO_TYPES.forEach(function(type){
  var p=makeProfessional(type);
  p.assignments.push({setId:set.id,category:cat,tenure:1,chemistry:0,contract:makeDemands(p.rating)});
  p.history.push({set:name,category:cat,fromYear:S?S.year:2027});
  S.professionals.push(p);set.professionalIds.push(p.id);
 });
 return set;
}
function v3InitWorld(s){
 S=s;s.version='0.3';s.player.financeHistory=[];s.player.club={name:'Club de '+playerSet().name,capacity:30,level:1,cantina:1,foodPrice:160,merchPrice:390,stock:60,construction:0,utileros:[]};
 playerSet().utileros=s.player.club.utileros;
 s.player.spectacles={};s.player.spectacles[String(s.year)]='';
 s.player.admissionChoice=null;s.player.paused=false;
 s.admission=null;
 s.sets.forEach(function(set){v3SetRoster(set,set.isPlayer);set.restUntil=0;set.qualifiedDirect=false;});
 Object.entries(V3_MORE_NAMES).forEach(function(entry){entry[1].forEach(function(name){s.sets.push(v3NewAISet(entry[0],name));});});
 Object.keys(CAT).forEach(function(cat){
  var freeRoles=v3Slots(cat);
  [...new Set(freeRoles)].forEach(function(role){for(var i=0;i<2;i++){var a=v3Artist(cat,role,false,0);a.setId=null;a.status='Libre';a.starter=false;a.contract=null;s.freeArtists.push(a);}});
 });
 // Se mantienen los tres modos económicos, ajustando el fondo inicial al costo de los planteles grandes.
 var n=v3Slots(playerSet().category).length;
 if(n>26){s.player.money=Math.round(s.player.money*n/22);playerSet().budget=s.player.money;}
 return s;
}
const v2CreateWorld=createWorld;
createWorld=function(setup){return v3InitWorld(v2CreateWorld(setup));};
rosterSize=function(cat){return v3Slots(cat).length+V3_SUBS[cat];};
starterTarget=function(cat){return v3Slots(cat).length;};
function v3Filled(set){
 var missing=[];
 V3_FORMATIONS[set.category].forEach(function(row){
  var have=set.roster.filter(function(a){return a.starter&&a.role===row[0];}).length;
  if(have<row[1])missing.push({role:row[0],need:row[1]-have});
 });
 return missing;
}
function v3Music(set){
 var musicians=set.roster.filter(function(a){return a.starter&&v3IsMusic(a.role)&&(set.category!=='Lubolos'||!a.role.startsWith('Tambor '));});
 var score=avg(musicians.map(function(a){return (a.attrs.Musicalidad||a.attrs.Percusión||a.rating)*(1+(a.chemistry||0)/100);}));
 return musicians.length?one(score):0;
}
function v3DrumScore(set){var list=set.roster.filter(function(a){return a.starter&&a.role.startsWith('Tambor ');});return list.length?one(avg(list.map(function(a){return (a.attrs[a.role]||a.attrs.Percusión||a.rating)*(1+(a.chemistry||0)/100);}))):0;}
function v3Art(set,role){
 var artists=set.roster.filter(function(a){return a.starter&&!v3IsMusic(a.role);});
 var field=role==='Bailarín'?'Baile':role==='Actor'?'Actuación':'Canto';
 var total=0,main=0;
 artists.forEach(function(a){
  var mainRole=role==='Bailarín'?/Bailarín|Bailarina/.test(a.role):a.role===role;
  var value=(a.attrs[field]||a.rating)*(1+(a.chemistry||0)/100);
  total+=value*(mainRole?1:((set.category==='Parodistas'||set.category==='Humoristas')?0.10:0));if(mainRole)main++;
 });
 return main?one(total/main):0;
}
const v2SpectacleRating=playerSpectacleRating;
playerSpectacleRating=function(){
 if(!S)return 0;
 var base=v2SpectacleRating(),set=playerSet(),music=v3Music(set);
 var special=avg([v3Art(set,'Bailarín'),v3Art(set,'Actor'),v3Art(set,'Cantante'),music,set.category==='Lubolos'?v3DrumScore(set):0].filter(function(n){return n>0;}));
 return Math.round(base*.78+special*.22);
};
const v2ToggleStarter=toggleStarter;
toggleStarter=function(aid){
 var a=artistById(aid),set=playerSet();if(!a||a.setId!==set.id)return;
 if(!a.starter){
  var same=set.roster.filter(function(x){return x.starter&&x.role===a.role;});
  var allowed=v3RoleMax(set.category,a.role);if(!allowed)return alert('Ese rol no existe en la formación titular.');
  if(same.length>=allowed){var other=same[same.length-1];other.starter=false;notify('Plantel',other.name+' pasó a suplente para dejar lugar a '+a.name+'.');}
 }
 v2ToggleStarter(aid);
};
const v2CompleteHire=completeHire;
completeHire=function(e,kind,contract){
 if(kind==='artists'){
  if(e.category!==playerSet().category)return alert('Solo podés incorporar artistas de la categoría de tu conjunto.');
  if(playerSet().roster.length>=rosterSize(e.category))return alert('Plantilla completa. Liberá un suplente para incorporar a otro artista.');
  if(!v3RoleMax(e.category,e.role))return alert('Este artista no tiene un puesto compatible con la formación.');
 }
 return v2CompleteHire(e,kind,contract);
};

;

/* Carnaval Uruguay v0.3: club, finanzas, calendario y contratos */
function v3FinanceTotals(){
 var set=playerSet();
 var artists=Math.round(set.roster.reduce(function(n,a){return n+(Number(a.contract?.salary)||0)/4.33;},0));
 var pros=Math.round(setProfessionals(set).reduce(function(n,p){return n+(Number(assignmentFor(p,set.id)?.contract?.salary)||0)/4.33;},0));
 return {artists:artists,pros:pros,total:artists+pros};
}
function v3ClubEventRevenue(rehearsals){
 var club=S.player.club;
 var income=0,cost=0,attendees=0,food=0,merch=0;
 rehearsals.forEach(function(){
  var draw=clamp(Math.round(playerSet().popularity*.9+rand(0,18)),5,Math.max(5,club.capacity));
  if(S.player.admissionChoice==='continue'&&S.admission?.eliminated)draw=Math.round(draw*.5);
  var crowd=Math.min(club.capacity,draw);
  var foodSales=Math.round(crowd*clamp(1.2-club.foodPrice/430,.08,.88)*clamp(.6+club.cantina*.15,.2,1));
  var merchSales=Math.min(club.stock,Math.round(crowd*clamp(.38-club.merchPrice/1700,.015,.28)));
  attendees+=crowd;food+=foodSales*club.foodPrice;merch+=merchSales*club.merchPrice;
  cost+=Math.round(foodSales*club.foodPrice*.42);club.stock-=merchSales;
 });
 income=food+merch;
 return {income:income,cost:cost,attendees:attendees,food:food,merch:merch};
}
function renderFinances(){
 var rows=S.player.financeHistory||[],f=v3FinanceTotals(),club=S.player.club;
 return '<div class="hero"><div class="kicker">Gestión económica</div><h1>Finanzas</h1><p class="muted">Historial real de ingresos y gastos. Los importes de cada semana quedan registrados al cerrarla.</p><div class="stats"><div class="stat"><span>Saldo disponible</span><b>'+money(S.player.money)+'</b></div><div class="stat"><span>Sueldos de artistas / semana</span><b>'+money(f.artists)+'</b></div><div class="stat"><span>Profesionales / semana</span><b>'+money(f.pros)+'</b></div><div class="stat"><span>Gasto fijo mensual aprox.</span><b>'+money(f.total*4.33)+'</b></div></div></div>'
 +'<div class="card"><h2>Proyección de caja</h2><p class="muted">Estimación solo con los sueldos actuales, sin contar futuros eventos ni ventas.</p><div class="stats">'+[1,2,3].map(function(n){return '<div class="stat"><span>En '+n+' mes'+(n>1?'es':'')+'</span><b>'+money(S.player.money-n*f.total*4.33)+'</b></div>';}).join('')+'</div></div>'
 +'<div class="card" style="margin-top:12px"><h2>Historial semanal</h2>'+(!rows.length?'<div class="empty">Todavía no cerraste ninguna semana en esta versión.</div>':rows.slice().reverse().map(function(r){
 return '<details class="row" style="display:block"><summary style="cursor:pointer"><b>'+esc(r.month)+' · semana '+r.week+' · '+r.year+'</b><span class="pill '+(r.net>=0?'green':'')+'" style="margin-left:10px">'+(r.net>=0?'+':'')+money(r.net)+'</span><small>Ingresos '+money(r.income)+' · Gastos '+money(r.expenses)+' · Saldo '+money(r.closing)+'</small></summary><div style="padding:12px"><div>Festivales / tablados: '+money(r.festivals)+'</div><div>Cantina: '+money(r.food)+'</div><div>Merchandising: '+money(r.merch)+'</div><div>Sueldos de artistas: −'+money(r.artists)+'</div><div>Profesionales: −'+money(r.pros)+'</div><div>Insumos del club / alquiler: −'+money(r.other)+'</div></div></details>';
 }).join(''))+'</div>';
}
function renderClub(){
 var c=S.player.club;
 return '<div class="hero"><div class="kicker">Patrimonio del conjunto</div><h1>'+esc(c.name)+'</h1><p class="muted">Tu club empieza con capacidad para 30 espectadores. Los integrantes del conjunto no consumen estos cupos. Administrá la cantina y el merchandising.</p><div class="stats"><div class="stat"><span>Aforo de público</span><b>'+c.capacity+'</b></div><div class="stat"><span>Cantina · nivel</span><b>'+c.cantina+'</b></div><div class="stat"><span>Stock de merchandising</span><b>'+c.stock+'</b></div><div class="stat"><span>Ampliación</span><b>'+(c.construction?c.construction+' semanas':'Disponible')+'</b></div></div></div>'
 +'<div class="grid"><div class="card"><h2>Instalaciones</h2><p class="muted">Ampliar aumenta la capacidad para asistentes a los ensayos abiertos. La obra demora 4 semanas.</p><div class="note">Capacidad actual: '+c.capacity+' · próximo nivel: '+(c.capacity+30)+' · costo '+money(v3UpgradeCost())+'</div><button class="btn" data-act="club-expand" '+(c.construction?'disabled':'')+'>Ampliar club</button><div class="split" style="margin-top:12px"><div><b>Cantina nivel '+c.cantina+'</b><p class="muted">Aumenta la capacidad de atención.</p></div><button class="btn alt small" data-act="club-cantina" '+(c.cantina>=6?'disabled':'')+'>Mejorar '+money(18000*c.cantina)+'</button></div></div>'
 +'<div class="card"><h2>Precios y ventas</h2><div class="field"><label>Nombre del club</label><input id="club-name" maxlength="60" value="'+esc(c.name)+'"></div><div class="field"><label>Precio promedio comida y bebida ($)</label><input id="club-food" type="number" min="20" max="5000" value="'+c.foodPrice+'"></div><div class="field"><label>Precio merchandising ($)</label><input id="club-merch" type="number" min="40" max="9000" value="'+c.merchPrice+'"></div><button class="btn" data-act="club-save">Guardar configuración</button><div class="split" style="margin-top:15px"><div><b>Stock: '+c.stock+' productos</b><p class="muted">Comprar 30 unidades cuesta '+money(30*150)+'.</p></div><button class="btn alt small" data-act="club-stock">Comprar stock</button></div><p class="muted" style="margin-top:10px">Precios muy altos pueden reducir las ventas. Cada ensayo abierto registra lo recaudado en Finanzas.</p></div></div>'
 +'<div class="card" style="margin-top:12px"><h2>Utileros honoríficos</h2><p class="muted">No reciben sueldo ni ocupan lugares de la plantilla. Podés incorporar tantos como quieras.</p><div class="split"><input id="utilero-name" maxlength="70" placeholder="Nombre y apellido"><button class="btn" data-act="utilero-add">Agregar</button></div>'+(c.utileros.length?c.utileros.map(function(u){return '<div class="row"><b>'+esc(u.name)+'</b><button class="btn red small" data-act="utilero-remove" data-id="'+esc(u.id)+'">Quitar</button></div>';}).join(''):'<div class="empty">Todavía no hay utileros registrados.</div>')+'</div>';
}
function v3UpgradeCost(){return 35000*S.player.club.level;}
function v3ClubAction(action,elem){
 var c=S.player.club,v=Number;
 if(action==='club-save'){var name=document.getElementById('club-name').value.trim();if(!name)return alert('El club necesita un nombre.');c.name=name.slice(0,60);c.foodPrice=clamp(v(document.getElementById('club-food').value)||160,20,5000);c.merchPrice=clamp(v(document.getElementById('club-merch').value)||390,40,9000);}
 if(action==='club-expand'){var amount=v3UpgradeCost();if(c.construction)return;if(S.player.money<amount)return alert('No alcanza el dinero para esta obra.');if(!confirm('¿Invertir '+money(amount)+' en ampliar el club? La obra tardará 4 semanas.'))return;S.player.money-=amount;c.construction=4;c.level++;notify('Administración','Comenzaron las obras de ampliación del club.');}
 if(action==='club-cantina'){var cost=18000*c.cantina;if(c.cantina>=6)return;if(S.player.money<cost)return alert('Dinero insuficiente.');S.player.money-=cost;c.cantina++;}
 if(action==='club-stock'){if(S.player.money<4500)return alert('Dinero insuficiente.');S.player.money-=4500;c.stock+=30;}
 if(action==='utilero-add'){var input=document.getElementById('utilero-name'),name=input.value.trim();if(name.length<2)return alert('Ingresá el nombre del utilero.');c.utileros.push({id:id(),name:name.slice(0,70),since:S.year});}
 if(action==='utilero-remove')c.utileros=c.utileros.filter(function(u){return u.id!==elem.dataset.id;});
 playerSet().budget=S.player.money;queueSave();render();
}
function v3FestivalMax(){return S.cal.m<8?2:7;}
function renderCalendar(){
 var events=currentWeekEvents(),ens=events.filter(function(x){return x.type==='ensayo';}),fest=events.filter(function(x){return x.type==='festival'||x.type==='tablado';});
 var rest=S.cal.m>=10?'Actividades de cierre de temporada':S.cal.m<7?'1–2 ensayos recomendados':'4–5 ensayos recomendados';
 return '<div class="hero"><div class="split"><div><div class="kicker">Planificación semanal</div><h1>'+monthNow()+' · semana '+S.cal.w+'</h1><p class="muted">'+rest+'. Podés programar un ensayo y un festival el mismo día.</p></div><button class="btn" data-act="advance-week">Avanzar semana</button></div><span class="pill gold">Ensayos '+ens.length+'/'+maxRehearsals()+'</span> <span class="pill">Festivales / tablados '+fest.length+'/'+v3FestivalMax()+'</span></div>'
 +'<div class="week" style="margin-top:12px">'+DAYS.map(function(day,i){var today=events.filter(function(x){return x.day===i;}),hasEns=today.some(function(x){return x.type==='ensayo';}),hasFest=today.some(function(x){return x.type==='festival'||x.type==='tablado';});
 return '<div class="day"><b>'+day+'</b>'+today.map(function(e){return '<div class="chip">'+(e.type==='ensayo'?'Ensayo · '+e.parts.map(esc).join(' / '):(e.type==='tablado'?'Tablado: ':'Festival: ')+esc(e.host)+' · '+money(e.pay))+'</div><button class="btn red small" style="margin-top:6px" data-act="remove-event" data-id="'+e.id+'">Quitar</button>';}).join('')+'<div style="display:grid;gap:6px;margin-top:8px"><button class="btn alt small" data-act="plan-rehearsal" data-day="'+i+'" '+(hasEns||ens.length>=maxRehearsals()?'disabled':'')+'>+ Ensayo</button><button class="btn alt small" data-act="plan-festival" data-day="'+i+'" '+(hasFest||fest.length>=v3FestivalMax()?'disabled':'')+'>+ '+(S.cal.m>=10?'Tablado':'Festival')+'</button></div></div>';
 }).join('')+'</div>';
}
saveRehearsal=function(){
 var parts=U.rehearsal.parts,cost=parts.reduce(function(n,p){return n+(p==='Ensayo completo'?2:1);},0),ev=currentWeekEvents();
 if(cost!==3)return;
 if(ev.some(function(x){return x.day===U.rehearsal.day&&x.type==='ensayo';}))return alert('Ya hay un ensayo ese día.');
 if(ev.filter(function(x){return x.type==='ensayo';}).length>=maxRehearsals())return alert('Máximo de ensayos alcanzado.');
 ev.push({id:id(),type:'ensayo',day:U.rehearsal.day,parts:parts.slice()});S.player.plan[S.cal.globalWeek]=ev;U.modal=null;queueSave();render();
};
planFestival=function(day){
 var ev=currentWeekEvents(),count=ev.filter(function(x){return x.type==='festival'||x.type==='tablado';}).length;
 if(count>=v3FestivalMax())return alert('Alcanzaste el máximo de '+v3FestivalMax()+' festivales/tablados de esta semana.');
 if(ev.some(function(x){return x.day===day&&(x.type==='festival'||x.type==='tablado');}))return alert('Ese día ya hay un festival o tablado.');
 var hosts=S.sets.filter(function(s){return !s.isPlayer&&s.category===playerSet().category;});
 var low=S.admission?.eliminated;
 ev.push({id:id(),type:S.cal.m>=10?'tablado':'festival',day:day,host:pick(hosts)?.name||'Evento de Carnaval',pay:Math.round(rand(9000,26000)*(low?.55:1)),pop:rand(1,3),rent:Math.round(rand(1000,3500)*(S.cal.m>=8?1.4:1))});
 S.player.plan[S.cal.globalWeek]=ev;queueSave();render();
};
function v3ContractEstimate(o){
 // Supuestos visibles, no obligaciones: 12 eventos, 2 actuaciones de Teatro, 50% bono y $100.000 de ingresos de febrero.
 var guaranteed=12*(Number(o.salary)||0);
 var variable=12*(Number(o.tablado)||0)+2*(Number(o.teatro)||0)+.5*(Number(o.bonus)||0)+100000*(Number(o.febPct)||0)/100;
 return {guaranteed:Math.round(guaranteed),estimated:Math.round(guaranteed+variable)};
}
const v2RenderNegotiation=renderNegotiation;
renderNegotiation=function(){
 var html=v2RenderNegotiation();
 if(!U.negotiation||U.negotiation.kind!=='artists')return html;
 var cost=v3ContractEstimate(U.negotiation.offer);
 var block='<div class="card" style="margin-top:12px"><h3>Costo anual del contrato</h3><div class="stats"><div class="stat"><span>Costo garantizado</span><b id="contract-guaranteed">'+money(cost.guaranteed)+'</b></div><div class="stat"><span>Costo anual estimado</span><b id="contract-estimated">'+money(cost.estimated)+'</b></div></div><p class="muted">Proyección anual: 12 sueldos, 12 tablados/eventos, 2 actuaciones de Teatro, 50% del bono y base hipotética de $100.000 de ingresos en febrero. Los importes variables no están garantizados.</p></div>';
 return html.replace('<div class="split" style="margin-top:15px">',block+'<div class="split" style="margin-top:15px">');
};
APP.addEventListener('input',function(e){
 if(!e.target.id||!e.target.id.startsWith('offer-')||!U.negotiation||U.negotiation.kind!=='artists')return;
 var o={};['salary','tablado','teatro','bonus','febPct'].forEach(function(k){o[k]=Number(document.getElementById('offer-'+k)?.value||0);});
 var x=v3ContractEstimate(o),g=document.getElementById('contract-guaranteed'),t=document.getElementById('contract-estimated');
 if(g)g.textContent=money(x.guaranteed);if(t)t.textContent=money(x.estimated);
});
const v2RenderRoster=renderRoster;
renderRoster=function(){
 var set=playerSet(),missing=v3Filled(set),max=rosterSize(set.category);
 var block='<div class="card" style="margin-bottom:12px"><h3>Formación titular obligatoria</h3><p class="muted">Titulares '+set.roster.filter(function(a){return a.starter;}).length+'/'+starterTarget(set.category)+' · Plantel '+set.roster.length+'/'+max+' · Suplentes máximos '+V3_SUBS[set.category]+'</p><div class="stats">'+V3_FORMATIONS[set.category].map(function(row){var have=set.roster.filter(function(a){return a.starter&&a.role===row[0];}).length;return '<div class="stat"><span>'+esc(row[0])+'</span><b style="'+(have<row[1]?'color:#e8a763':'')+'">'+have+' / '+row[1]+'</b></div>';}).join('')+'</div>'+(missing.length?'<div class="note warn">Faltan '+missing.map(function(x){return x.need+' '+x.role;}).join(', ')+'. Debés completar la formación antes de comenzar diciembre.</div>':'<div class="note success">Formación completa.</div>')+'</div>';
 var drums='';
 if(set.category==='Lubolos'){
  var roles=['Tambor chico','Tambor piano','Tambor repique'];
  drums='<div class="card" style="margin-bottom:12px"><h3>Cuerda de tambores · '+v3DrumScore(set)+' puntos</h3><p class="muted">12 tamborileros: 6 chicos, 4 pianos y 2 repiques. Si cambiás un tambor, se intercambia con otro titular para conservar las proporciones.</p><div class="grid">'+set.roster.filter(function(a){return a.starter&&a.role.startsWith('Tambor ');}).map(function(a){
   return '<div class="field"><label>'+esc(a.name)+'</label><select data-v3-drum="'+a.id+'">'+roles.map(function(role){return '<option value="'+role+'" '+(a.role===role?'selected':'')+'>'+role+' · '+(a.attrs[role]||a.rating)+'</option>';}).join('')+'</select></div>';
  }).join('')+'</div></div>';
 }
 return block+drums+v2RenderRoster();
};
const v2RenderHome=renderHome;
renderHome=function(){
 var block='<div class="card" style="margin-top:12px;margin-bottom:12px"><div class="split"><div><h3>Semana actual</h3><p class="muted">Ensayos programados: '+currentWeekEvents().filter(function(e){return e.type==='ensayo';}).length+'. Antes de avanzar, revisá el calendario.</p></div><div class="actions"><button class="btn alt" data-act="view" data-view="Calendario">Calendario</button><button class="btn" data-act="advance-week">Avanzar semana</button></div></div></div>';
 return v2RenderHome().replace('<div class="grid">',block+'<div class="grid">');
};
const v2RenderSpectacle=renderSpectacle;
renderSpectacle=function(){
 var name=S.player.spectacles[String(S.year)]||'',locked=S.cal.m>=9;
 var edit='<div class="card" style="margin-bottom:12px"><h3>Espectáculo de '+S.year+'</h3><p class="muted">'+(locked?'El nombre quedó fijado al comenzar enero.':'Podés cambiar el nombre del espectáculo hasta el final de diciembre.')+'</p><div class="split"><input id="spectacle-name" maxlength="90" value="'+esc(name)+'" placeholder="Nombre del espectáculo" '+(locked?'disabled':'')+'><button class="btn" data-act="spectacle-save" '+(locked?'disabled':'')+'>Guardar nombre</button></div></div>';
 return edit+v2RenderSpectacle();
};

;

/* Carnaval Uruguay v0.3: Prueba de Admisión, permanencia del mundo y decisiones */
function v3Shuffle(a){var out=a.slice();for(var i=out.length-1;i>0;i--){var j=rand(0,i),v=out[i];out[i]=out[j];out[j]=v;}return out;}
function v3EnsureAdmissions(){
 Object.keys(V3_ADMIT_MIN).forEach(function(cat){
  var needed=V3_ADMIT_MIN[cat]+V3_DIRECT[cat]-S.sets.filter(function(s){return s.category===cat;}).length;
  for(var i=0;i<needed;i++){var n='La Nueva '+CAT[cat].label+' '+(S.year%100)+'-'+i;S.sets.push(v3NewAISet(cat,n));}
 });
}

function v3RepairAI(){
 S.sets.filter(function(set){return !set.isPlayer;}).forEach(function(set){
  v3Filled(set).forEach(function(need){
   for(var i=0;i<need.need;i++){
    var bench=set.roster.find(function(a){return !a.starter&&a.role===need.role;});
    if(bench){bench.starter=true;continue;}
    var a=v3Artist(set.category,need.role,false,1);
    a.setId=set.id;a.status='Plantel';a.starter=true;a.contract=makeDemands(a.rating);a.history=[{year:S.year,set:set.name,category:set.category}];
    set.roster.push(a);
   }
  });
  while(set.roster.length>rosterSize(set.category)){
   var bench=set.roster.find(function(a){return !a.starter;});if(!bench)break;
   set.roster=set.roster.filter(function(a){return a.id!==bench.id;});
   bench.setId=null;bench.status='Libre';bench.contract=null;S.freeArtists.push(bench);
  }
 });
}

function v3PrepareAdmission(){
 v3EnsureAdmissions();v3RepairAI();
 var directIds=[],entries=[];
 Object.keys(V3_ADMIT_MIN).forEach(function(cat){
  var group=S.sets.filter(function(s){return s.category===cat;});
  var direct=group.slice().sort(function(a,b){
   var ap=a.qualifiedDirect?250:0,bp=b.qualifiedDirect?250:0;
   if(a.isPlayer&&S.year===2027&&S.settings.firstSeason==='Directo al Carnaval')ap=1000;
   if(b.isPlayer&&S.year===2027&&S.settings.firstSeason==='Directo al Carnaval')bp=1000;
   return bp+aiSetPower(b)-ap-aiSetPower(a);
  }).slice(0,V3_DIRECT[cat]);
  direct.forEach(function(x){directIds.push(x.id);});
  var pool=v3Shuffle(group.filter(function(x){return !directIds.includes(x.id);}));
  var active=pool.filter(function(x){return x.isPlayer||!x.restUntil||x.restUntil<=S.year;});
  var extras=Math.min(active.length-V3_ADMIT_MIN[cat],S.year===2027?0:rand(0,6));
  var chosen=active.slice(0,V3_ADMIT_MIN[cat]+Math.max(0,extras));
  if(chosen.length<V3_ADMIT_MIN[cat]){
   pool.forEach(function(x){if(chosen.length<V3_ADMIT_MIN[cat]&&!chosen.includes(x))chosen.push(x);});
  }
  if(playerSet().category===cat&&!direct.some(function(x){return x.isPlayer;})&&!chosen.some(function(x){return x.isPlayer;})){
   if(chosen.length)chosen[chosen.length-1]=playerSet();else chosen.push(playerSet());
  }
  chosen.forEach(function(set){entries.push({setId:set.id,category:cat,name:set.name,day:0,order:0,score:null,feedback:'',performed:false,qualified:false});});
 });
 var number=entries.length,nights=Math.ceil(number/5);
 var lengths=Array.from({length:nights},function(_,i){return i<number-4*nights?5:4;});
 var groups={};Object.keys(V3_ADMIT_MIN).forEach(function(cat){groups[cat]=v3Shuffle(entries.filter(function(e){return e.category===cat;}));});
 var arranged=[],nightCats={};
 for(var d=0;d<nights;d++){
  var used={},target=lengths[d];
  for(var pos=0;pos<target;pos++){
   var options=Object.keys(groups).filter(function(k){return groups[k].length>0;}).sort(function(a,b){
    var pa=used[a]||0,pb=used[b]||0;
    return pa-pb||groups[b].length-groups[a].length;
   });
   var key=options[0];if(!key)continue;
   var item=groups[key].pop();item.day=d+1;item.order=pos+1;used[key]=(used[key]||0)+1;arranged.push(item);
  }
  nightCats[d+1]=used;
 }
 S.admission={year:S.year,entries:arranged,nights:nights,directIds:directIds,finished:false,reveal:0,eliminated:false,qualified:false,results:[],choice:null};
 notify('Competición','Sorteo de la Prueba de Admisión: '+number+' conjuntos distribuidos en '+nights+' jornadas. Consultá la pestaña Admisión.');
 addNews('Se realizó en octubre el sorteo de la Prueba de Admisión '+S.year+'. '+number+' conjuntos buscan 20 cupos.');
}
function v3AdmissionComment(score){
 if(score>=87)return 'Gran actuación: el público destacó la solidez del espectáculo y la respuesta fue muy entusiasta.';
 if(score>=76)return 'Buena presentación, con momentos destacados en el escenario y una recepción favorable del público.';
 if(score>=64)return 'Actuación irregular: algunos pasajes convencieron, pero quedaron aspectos por pulir.';
 if(score>=52)return 'Hubo momentos interesantes, aunque se notaron problemas de ejecución y coordinación.';
 return 'Una presentación difícil, con escasa respuesta del público y varias dificultades sobre el escenario.';
}
function v3PerformAdmission(){
 var adm=S.admission;if(!adm||adm.finished||S.cal.m!==7)return;
 var lastDay=Math.ceil(adm.nights*S.cal.w/4);
 adm.entries.forEach(function(e){
  if(e.performed||e.day>lastDay)return;
  var set=setById(e.setId);if(!set)return;
  e.score=clamp(Math.round((set.isPlayer?playerSpectacleRating():aiSetPower(set))+rand(-9,9)),10,120);
  e.performed=true;e.feedback=v3AdmissionComment(e.score);
 });
 if(S.cal.w===4){
  var qualified=[];
  Object.keys(V3_QUALIFY).forEach(function(cat){
   var group=adm.entries.filter(function(x){return x.category===cat;}).sort(function(a,b){return b.score-a.score;});
   group.slice(0,V3_QUALIFY[cat]).forEach(function(e){e.qualified=true;qualified.push(e);});
  });
  adm.results=qualified.sort(function(a,b){return a.category.localeCompare(b.category,'es')||a.name.localeCompare(b.name,'es');}).map(function(e){return {id:e.setId,name:e.name,category:e.category};});
  adm.finished=true;
  var participant=adm.entries.find(function(e){return e.setId===S.playerSetId;});
  adm.qualified=!!participant?.qualified||adm.directIds.includes(S.playerSetId);
  adm.eliminated=!!participant&&!participant.qualified;
  addNews('Terminó la Prueba de Admisión. Se conocerán los 20 clasificados en la Noche de Resultados.');
  U.modal='admission-results';
 }
}
function v3RenderAdmission(){
 var adm=S.admission;if(!adm)return '<div class="card"><h2>Prueba de Admisión</h2><p class="muted">El sorteo se realiza en octubre. Las actuaciones son en noviembre.</p></div>';
 var items=adm.entries;
 var body='<div class="hero"><div class="kicker">Prueba de Admisión '+adm.year+'</div><h1>'+items.length+' conjuntos · '+adm.nights+' jornadas</h1><p class="muted">El sorteo reparte las categorías. Cada jornada tiene cuatro o cinco actuaciones. Se anuncian los clasificados recién después de la última noche.</p></div>';
 if(adm.finished)body+='<div class="card" style="margin-top:12px"><h3>Noche de Resultados</h3><button class="btn" data-act="admission-results-open">Ver clasificados uno por uno</button></div>';
 for(var day=1;day<=adm.nights;day++){
  body+='<div class="card" style="margin-top:12px"><h3>Jornada '+day+'</h3>'+items.filter(function(e){return e.day===day;}).sort(function(a,b){return a.order-b.order;}).map(function(e){
   return '<div class="row"><div><b>'+e.order+'. '+esc(e.name)+(e.setId===S.playerSetId?' · Tu conjunto':'')+'</b><small>'+CAT[e.category].label+' · '+(e.performed?'Actuación realizada':'Pendiente')+'</small>'+(e.performed?'<p class="muted">'+esc(e.feedback)+'</p>':'')+'</div></div>';
  }).join('')+'</div>';
 }
 return body;
}
function v3AdmissionModal(){
 var adm=S.admission;if(!adm)return '';
 var total=adm.results.length,shown=adm.reveal;
 var visible=adm.results.slice(0,shown);
 var body='<div class="modal wide"><div class="modalhead"><div><div class="kicker">Noviembre · '+adm.year+'</div><h2>Noche de Resultados de Admisión</h2><p class="muted">Clasificados en orden alfabético, sin puntajes ni posiciones.</p></div><button class="x" data-act="admission-close">×</button></div><div class="note">Anunciados '+shown+' de '+total+' clasificados</div>'
 +'<div style="max-height:45vh;overflow:auto">'+visible.map(function(e,i){return '<div class="row"><b>'+(i+1)+'. '+esc(e.name)+'</b><span class="pill gold">'+CAT[e.category].label+'</span></div>';}).join('')+'</div>';
 if(shown<total)body+='<button class="btn" style="margin-top:14px" data-act="admission-reveal">Anunciar siguiente conjunto</button>';
 else{
  body+='<div class="note '+(adm.eliminated?'warn':'success')+'" style="margin-top:12px">'+(adm.eliminated?'Tu conjunto no clasificó al Concurso Oficial. Podés continuar actuando con menos invitaciones o pausar hasta abril.':'¡Resultado completado! '+(adm.qualified?'Tu conjunto tiene lugar en el Carnaval.':'Ya están definidos los 20 conjuntos clasificados.'))+'</div>';
  if(adm.eliminated&&!adm.choice)body+='<div class="split" style="margin-top:14px"><button class="btn alt" data-act="admission-continue">Continuar temporada</button><button class="btn" data-act="admission-pause">Pausar sin ingresos ni gastos hasta abril</button></div>';
  else body+='<button class="btn" style="margin-top:14px" data-act="admission-close">Cerrar resultados</button>';
 }
 return body+'</div>';
}
function v3FindReceiver(cat){
 var targets=S.sets.filter(function(s){return !s.isPlayer&&s.category===cat&&s.roster.length<rosterSize(cat);});
 if(S.admission)targets=targets.filter(function(s){return S.admission.directIds.includes(s.id)||S.admission.results.some(function(r){return r.id===s.id;});});
 return targets.length?pick(targets):null;
}
function v3MoveArtist(a){
 var set=playerSet(),target=v3FindReceiver(set.category);
 set.roster=set.roster.filter(function(x){return x.id!==a.id;});
 a.pastChemistry[set.id]=a.chemistry||0;a.chemistry=0;a.tenure=0;a.starter=false;
 if(target){target.roster.push(a);a.setId=target.id;a.status='Plantel';a.contract=makeDemands(a.rating);a.history.push({year:S.year,set:target.name,category:target.category});}
 else{a.setId=null;a.status='Libre';a.contract=null;S.freeArtists.push(a);}
 return target?.name||'el mercado de libres';
}
function v3MoveProfessional(p){
 var set=playerSet(),as=assignmentFor(p,set.id);
 if(!as)return '';
 p.pastChemistry[set.id]=as.chemistry||0;
 p.assignments=p.assignments.filter(function(x){return x.setId!==set.id;});
 set.professionalIds=set.professionalIds.filter(function(x){return x!==p.id;});
 var target=S.sets.find(function(s){return !s.isPlayer&&s.category===set.category&&S.admission?.results.some(function(r){return r.id===s.id;})&&!s.professionalIds.some(function(i){return proById(i)?.type===p.type;});});
 if(target&&p.assignments.length<5&&!p.assignments.some(function(x){return x.category===target.category;})){
  p.assignments.push({setId:target.id,category:target.category,tenure:1,chemistry:0,contract:makeDemands(p.rating)});
  target.professionalIds.push(p.id);p.history.push({year:S.year,set:target.name,category:target.category});
 }
 return target?.name||'el mercado de profesionales';
}
function v3ContinueDepartures(){
 if(!S.admission?.eliminated||S.admission.choice!=='continue'||S.cal.m<8)return;
 var set=playerSet();
 if(Math.random()<.14&&set.roster.length){
  var a=pick(set.roster),offer=Math.round((a.contract?.salary||a.demands.salary)*1.24);
  var stay=confirm(a.name+' recibió una propuesta de un conjunto clasificado. ¿Querés intentar retenerlo ofreciendo '+money(offer)+'/mes?');
  if(stay&&Math.random()<.52){a.contract={...(a.contract||a.demands),salary:offer};notify('Mercado',a.name+' aceptó tu mejora salarial y seguirá en el conjunto.');}
  else{var dest=v3MoveArtist(a);notify('Plantel',a.name+' se marchó a '+dest+'.');}
 }
 if(Math.random()<.025&&set.professionalIds.length){var p=pick(setProfessionals(set));if(p){var destino=v3MoveProfessional(p);notify('Plantel',p.name+' dejó el cuerpo creativo por '+destino+'.');}}
}
function v3SkipToApril(){
 if(!S.admission?.eliminated)return;
 var departed=[],set=playerSet();
 set.roster.slice().forEach(function(a){
  var loyalty=clamp((a.tenure||1)*.025,0,.24);
  if(Math.random()<.34-loyalty)departed.push(a.name+' → '+v3MoveArtist(a));
 });
 setProfessionals(set).slice().forEach(function(p){if(Math.random()<.22)departed.push(p.name+' → '+v3MoveProfessional(p));});
 S.player.admissionChoice='pause';S.admission.choice='pause';
 var lastMoney=S.player.money;
 S.cal.m=0;S.cal.w=1;S.cal.globalWeek+=Math.max(1,16);
 S.year++;annualChemistry();v3NewSeason();
 S.player.money=lastMoney;playerSet().budget=lastMoney;
 notify('Administración','Pausa hasta abril completada: sin ingresos ni gastos. Salieron '+departed.length+' integrantes.'+(departed.length?' '+departed.join('; '):''));
 U.modal=null;U.view='Inicio';queueSave();render();
}
function v3NewSeason(){
 if(S.player.club.construction){S.player.club.capacity+=30;S.player.club.construction=0;}
 S.player.spectacles[String(S.year)]='';
 S.player.admissionChoice=null;S.admission=null;
 // Conjuntos nuevos pueden entrar al mundo; los anteriores nunca se eliminan.
 var count=rand(2,6);
 for(var i=0;i<count;i++){var cat=pick(Object.keys(CAT)),name='Nueva '+CAT[cat].label+' '+S.year+' · '+(i+1);S.sets.push(v3NewAISet(cat,name));}
 S.sets.forEach(function(set){
  if(set.isPlayer)return;
  if(Math.random()<.055)set.restUntil=S.year+rand(1,5);
  // La condición de clasificación directa se recalcula según evolución deportiva.
  set.qualifiedDirect=false;
 });
 notify('Administración','Comienza la temporada '+S.year+'. Los conjuntos inactivos pueden regresar y aparecen nuevos proyectos.');
}

;

/* Carnaval Uruguay v0.3: avance temporal e integración de pantallas */
const v2ClubAction=v3ClubAction;
v3ClubAction=function(action,button){
 var before=S.player.money;
 v2ClubAction(action,button);
 S.player.pendingCosts=(S.player.pendingCosts||0)+Math.max(0,before-S.player.money);
 queueSave();
};
advanceWeek=async function(){
 var events=currentWeekEvents(),rehearsals=events.filter(function(x){return x.type==='ensayo';});
 var festivals=events.filter(function(x){return x.type==='festival'||x.type==='tablado';});
 if(S.admission?.eliminated&&!S.admission.choice&&S.cal.m>=8){
  U.modal='admission-results';render();return;
 }
 if(S.cal.m===8&&S.cal.w===4&&!(S.player.spectacles[String(S.year)]||'').trim()){
  alert('No podés comenzar enero sin ponerle nombre al espectáculo. Andá a Espectáculo, elegí el nombre y guardalo.');
  U.view='Espectáculo';render();return;
 }
 if(S.cal.m===7&&S.cal.w===4){
  var missing=v3Filled(playerSet());
  if(missing.length){alert('No podés comenzar diciembre: faltan puestos titulares. '+missing.map(function(x){return x.need+' '+x.role;}).join(', '));U.view='Plantilla';render();return;}
 }
 if(!rehearsals.length){
  if(!confirm('No programaste ensayos esta semana. ¿Querés avanzar igual? Podés ir a Calendario para organizarlos.')){U.view='Calendario';render();return;}
 }
 var ledger=v3FinanceTotals(),estimatedIncome=festivals.reduce(function(n,e){return n+e.pay;},0);
 if(!confirm('Resumen semanal: '+rehearsals.length+' ensayo(s), '+festivals.length+' festival(es)/tablado(s), pagos por '+money(estimatedIncome)+', sueldos aproximados de '+money(ledger.total)+'. ¿Cerrar semana?'))return;
 var year=S.year,month=monthNow(),week=S.cal.w;
 S.player.lastReports=rehearsals.map(processRehearsal);
 var focused=new Set(rehearsals.flatMap(function(r){return r.parts.filter(function(p){return p!=='Ensayo completo';});}));
 Object.keys(S.player.works).forEach(function(area){if(!focused.has(area))S.player.rubrics[area]=clamp(one(S.player.rubrics[area]-.08),0,130);});
 if(!rehearsals.some(function(r){return r.parts.includes('Ensayo completo');}))S.player.rubrics['Rodaje general']=clamp(one(S.player.rubrics['Rodaje general']-.05),0,130);
 var activity=festivals.reduce(function(n,e){return n+(Number(e.pay)||0);},0);
 festivals.forEach(function(e){playerSet().popularity=clamp(playerSet().popularity+(e.pop||0),0,100);});
 var sales=S.cal.m>=7?v3ClubEventRevenue(rehearsals):{income:0,cost:0,attendees:0,food:0,merch:0};
 var rent=festivals.reduce(function(n,e){return n+(Number(e.rent)||0);},0);
 var pending=S.player.pendingCosts||0;
 var paidCosts=ledger.total+sales.cost+rent;
 var income=activity+sales.income,expense=paidCosts+pending,net=income-expense;
 S.player.money+=income-paidCosts;playerSet().budget=S.player.money;
 S.player.lastFinance={income:Math.round(income),expenses:Math.round(expense),net:Math.round(net)};
 S.player.financeHistory.push({year:year,month:month,week:week,opening:Math.round(S.player.money-net),closing:Math.round(S.player.money),festivals:Math.round(activity),food:Math.round(sales.food),merch:Math.round(sales.merch),artists:ledger.artists,pros:ledger.pros,other:Math.round(sales.cost+rent+pending),income:Math.round(income),expenses:Math.round(expense),net:Math.round(net)});
 S.player.pendingCosts=0;
 addNews('Semana cerrada: '+(net>=0?'+':'')+money(net)+' · '+rehearsals.length+' ensayos · '+festivals.length+' eventos.');
 passiveProfessionalProgress();
 if(S.cal.m===7)v3PerformAdmission();
 v3ContinueDepartures();
 simulateWorld();
 if(S.player.club.construction>0){
  S.player.club.construction--;
  if(!S.player.club.construction){S.player.club.capacity+=30;notify('Administración','Terminó la ampliación del club. Nueva capacidad: '+S.player.club.capacity+' espectadores.');}
 }
 S.cal.globalWeek++;S.cal.w++;
 if(S.cal.w>4){
  S.cal.w=1;S.cal.m++;
  if(S.cal.m>=12){S.cal.m=0;S.year++;annualChemistry();v3NewSeason();}
  else if(S.cal.m===6){v3PrepareAdmission();}
  else if(S.cal.m===7)notify('Competición','Comenzó noviembre. Se están disputando las jornadas de Admisión.');
  else if(S.cal.m===8)notify('Competición','Comenzó diciembre. Revisá el resultado de la Prueba de Admisión.');
  else if(S.cal.m===9)notify('Competición','Comenzó enero. El nombre del espectáculo quedó fijado y ya podés ver estimaciones de rivales.');
  else if(S.cal.m===10)notify('Competición','Comenzó febrero. En esta versión los eventos son un prototipo; la simulación completa del Concurso Oficial llegará en una actualización posterior.');
 }
 U.view='Inicio';
 await cloudSave();render();
};
const v2GameView=gameView;
const v2Nav=nav;
nav=function(){
 var result=v2Nav();
 return result.replace('</div>', '<button data-act="view" data-view="Finanzas" class="'+(U.view==='Finanzas'?'on':'')+'">Finanzas</button><button data-act="view" data-view="Club" class="'+(U.view==='Club'?'on':'')+'">Club</button><button data-act="view" data-view="Admisión" class="'+(U.view==='Admisión'?'on':'')+'">Admisión</button></div>');
};
gameView=function(){
 if(['Finanzas','Club','Admisión'].includes(U.view)){
  var body=U.view==='Finanzas'?renderFinances():U.view==='Club'?renderClub():v3RenderAdmission();
  APP.innerHTML=topBar()+'<div class="wrap">'+nav()+body+'</div>'+renderModal();
  return;
 }
 return v2GameView();
};
const v2RenderModal=renderModal;
renderModal=function(){return U.modal==='admission-results'?'<div class="modalbg">'+v3AdmissionModal()+'</div>':v2RenderModal();};
const v2RenderSetModal=renderSetModal;
renderSetModal=function(set){
 var h=v2RenderSetModal(set);
 if(set.utileros?.length){h=h.replace('<div class="grid">','<div class="note">Utileros honoríficos: '+set.utileros.map(function(x){return esc(x.name);}).join(', ')+'</div><div class="grid">');}
 if(set.isPlayer){
  var name=S.player.spectacles[String(S.year)]||'Todavía sin nombre';
  h=h.replace('<div class="grid">','<div class="note">Espectáculo '+S.year+': <b>'+esc(name)+'</b> · Club: '+esc(S.player.club.name)+'</div><div class="grid">');
 }
 return h;
};

APP.addEventListener('change',function(ev){
 var aid=ev.target.dataset?.v3Drum;if(!aid)return;
 var a=artistById(aid),newRole=ev.target.value,set=playerSet();
 if(!a||a.setId!==set.id||!a.starter||!a.role.startsWith('Tambor '))return;
 if(a.role===newRole)return;
 var other=set.roster.find(function(x){return x.starter&&x.role===newRole&&x.id!==a.id;});
 if(!other){alert('No hay un tamborilero de ese instrumento con quien intercambiar.');render();return;}
 var previous=a.role;a.role=other.role;other.role=previous;
 notify('Plantel','Se intercambiaron los tambores de '+a.name+' y '+other.name+'.');
 queueSave();render();
});
APP.addEventListener('click',function(ev){
 var b=ev.target.closest('[data-act]');if(!b)return;
 var a=b.dataset.act;
 if(['club-save','club-expand','club-cantina','club-stock','utilero-add','utilero-remove'].includes(a)){v3ClubAction(a,b);return;}
 if(a==='spectacle-save'){var el=document.getElementById('spectacle-name');if(S.cal.m>=9)return;var name=el?.value.trim()||'';if(name.length<2)return alert('Elegí un nombre de al menos dos caracteres.');S.player.spectacles[String(S.year)]=name.slice(0,90);queueSave();render();return;}
 if(a==='admission-results-open'){S.admission.reveal=0;U.modal='admission-results';render();return;}
 if(a==='admission-reveal'){S.admission.reveal=Math.min(20,S.admission.reveal+1);render();return;}
 if(a==='admission-close'){U.modal=null;render();return;}
 if(a==='admission-continue'){S.admission.choice='continue';S.player.admissionChoice='continue';U.modal=null;notify('Administración','Continuarás la temporada sin disputar el Concurso Oficial. Menor público e invitaciones.');queueSave();render();return;}
 if(a==='admission-pause'){if(confirm('¿Pausar hasta abril? No habrá ingresos ni gastos, pero varios componentes y profesionales pueden marcharse.'))v3SkipToApril();return;}
});
