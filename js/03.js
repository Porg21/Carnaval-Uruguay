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