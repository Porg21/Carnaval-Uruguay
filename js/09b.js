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