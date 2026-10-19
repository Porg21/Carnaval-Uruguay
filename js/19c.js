
/* Carnaval Uruguay v0.3: Prueba de Admisión, permanencia del mundo y decisiones */
function v3Shuffle(a){var out=a.slice();for(var i=out.length-1;i>0;i--){var j=rand(0,i),v=out[i];out[i]=out[j];out[j]=v;}return out;}
function v3EnsureAdmissions(){
 Object.keys(V3_ADMIT_MIN).forEach(function(cat){
  var needed=V3_ADMIT_MIN[cat]+V3_DIRECT[cat]-S.sets.filter(function(s){return s.category===cat;}).length;
  for(var i=0;i<needed;i++){var n='La Nueva '+CAT[cat].label+' '+(S.year%100)+'-'+i;S.sets.push(v3NewAISet(cat,n));}
 });
}
function v3PrepareAdmission(){
 v3EnsureAdmissions();
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
