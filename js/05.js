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
function estimateRange(set){const p=aiSetPower(set),noise=rand(-3,3),center=clamp(p+noise,35,105);return {label:estimateLabel(center),lo:Math.max(1,center-rand(2,4)),hi:center+rand(2,4)};}

function notify(cat,text){if(!S)return;S.notifications[cat].unshift({id:id(),text,week:S.cal.globalWeek,read:false});}
function unread(){return Object.values(S?.notifications||{}).flat().filter(n=>!n.read).length;}
function addNews(text){S.news.unshift({id:id(),week:S.cal.globalWeek,text});S.news=S.news.slice(0,100);}
function favoriteKind(kind,entityId){return S.favorites[kind].includes(entityId);}
function toggleFavorite(kind,entityId){const a=S.favorites[kind],i=a.indexOf(entityId);if(i>=0)a.splice(i,1);else a.push(entityId);queueSave();render();}