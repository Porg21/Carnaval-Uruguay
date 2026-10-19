
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
 return block+v2RenderRoster();
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
