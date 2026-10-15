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