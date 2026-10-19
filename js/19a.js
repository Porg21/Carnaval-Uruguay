
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
  if(weak&&a.contract)a.contract.salary=Math.round(a.contract.salary*.65);
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
 if(n>26){s.player.money=Math.round(s.player.money*Math.pow(n/17,1.55));playerSet().budget=s.player.money;}
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
