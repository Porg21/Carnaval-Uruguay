function createWorld(setup){
  const sets=[];
  Object.entries(NAMES).forEach(([cat,names])=>names.forEach(name=>sets.push({id:id(),name,category:cat,prestige:rand(25,92),popularity:rand(20,92),budget:rand(180000,1250000),style:pick(['Apuesta por jóvenes','Busca figuras','Austero','Equilibrado','Gastador']),roster:[],professionalIds:[],history:randomHistory(cat),awards:[],spectacleSeed:rand(55,94),isPlayer:false})));
  const candidates=sets.filter(x=>x.category===setup.cat).sort((a,b)=>a.prestige-b.prestige).slice(0,4);
  const replaced=pick(candidates), playerSetId=replaced.id, replacedName=replaced.name;
  replaced.name=setup.name; replaced.isPlayer=true; replaced.prestige=18; replaced.popularity=14; replaced.budget=DIF[setup.dif]; replaced.style='Jugador'; replaced.history=[]; replaced.awards=[];

  sets.forEach(set=>{
    const weak=set.isPlayer;
    const n=rosterSize(set.category);
    set.roster=Array.from({length:n},()=>makeArtist(set.category,{weak,tenure:weak?rand(1,3):rand(1,9)}));
    set.roster.forEach((a,i)=>{a.setId=set.id;a.status='Plantel';a.starter=set.isPlayer?i<starterTarget(set.category):false;a.history=[{year:2026,set:set.name,category:set.category}];});
    set.awards=deriveAwards(set.history);
  });

  const professionals=[];
  const ordered=[...sets].sort(()=>Math.random()-.5);
  ordered.forEach(set=>{
    PRO_TYPES.forEach(type=>{
      const eligible=professionals.filter(p=>p.type===type && p.assignments.length<5 && !p.assignments.some(a=>a.category===set.category));
      let p=(!set.isPlayer && eligible.length && Math.random()<.42)?pick(eligible):makeProfessional(type,{weak:set.isPlayer});
      if(!professionals.some(x=>x.id===p.id))professionals.push(p);
      const tenure=set.isPlayer?rand(1,3):rand(1,10), chemistry=chemistryForYears(tenure);
      p.assignments.push({setId:set.id,category:set.category,tenure,chemistry,contract:makeDemands(p.rating)});
      p.history.push({set:set.name,category:set.category,fromYear:2027-tenure+1});
      set.professionalIds.push(p.id);
    });
  });
  PRO_TYPES.forEach(type=>{for(let i=0;i<4;i++)professionals.push(makeProfessional(type));});

  const freeArtists=[];
  Object.keys(CAT).forEach(cat=>{for(let i=0;i<12;i++)freeArtists.push(makeArtist(cat,{free:true,young:i<2}));});

  const initialRub={}; RUBRICS.forEach((r,i)=>initialRub[r]=[42,40,38,36,39,31][i]);
  const works={'Voces / Musicalidad':39,'Textos / Interpretación':38,'Puesta en escena':36,'Coreografía / Bailes':35,'Vestuario / Maquillaje':38};
  return {
    version:'0.2',year:2027,cal:{m:0,w:1,globalWeek:1},playerSetId,replacedName,
    settings:{difficulty:setup.dif,firstSeason:setup.first},
    player:{money:DIF[setup.dif],rubrics:initialRub,works,plan:{},contracts:{},lastReports:[],lastFinance:null},
    sets,professionals,freeArtists,favorites:{artists:[],professionals:[]},news:[{id:id(),week:1,year:2027,text:`${setup.name} inicia su proyecto en ${setup.cat}.`}],
    notifications:{Mercado:[],Plantel:[],Competición:[],Administración:[]}
  };
}