
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
