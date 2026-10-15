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
const id=()=>crypto.randomUUID();
const money=n=>new Intl.NumberFormat('es-UY',{style:'currency',currency:'UYU',maximumFractionDigits:0}).format(Math.round(Number(n)||0));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const one=n=>Math.round(n*10)/10;
const chemistryForYears=y=>Math.min(30,Math.max(0,(y||1)-1));
const concentrationFor=p=>Math.max(60,100-(Math.max(1,p.assignments?.length||0)-1)*10);
const economicLabel=n=>n>900000?'Muy sólida':n>600000?'Estable':n>340000?'Ajustada':'Complicada';
const monthNow=()=>MONTHS[S?.cal?.m||0];
const isJanuary=()=>S?.cal?.m>=9;
