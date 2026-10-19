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