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