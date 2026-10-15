function marketArtists(){return allArtists().filter(a=>a.setId!==S.playerSetId);}
function entityStatus(a){if(a.kind==='artist')return a.setId?`En ${setById(a.setId)?.name||'otro conjunto'}`:'Libre';return a.assignments?.length?`${a.assignments.length} conjunto${a.assignments.length>1?'s':''}`:'Libre';}
function renderMarket(){
  const isA=U.marketType==='artists',f=U.filters;
  let items=isA?marketArtists():S.professionals.filter(p=>!p.assignments.some(a=>a.setId===S.playerSetId));
  items=items.filter(x=>{
    const name=x.name.toLowerCase().includes(f.q.toLowerCase());if(!name)return false;
    if(isA&&f.cat!=='Todas'&&x.category!==f.cat)return false;
    const role=isA?x.role:x.type;if(f.role!=='Todos'&&role!==f.role)return false;
    if(f.minRating&&x.rating<Number(f.minRating))return false;
    if(isA&&f.maxAge&&x.age>Number(f.maxAge))return false;
    if(f.minExp&&x.experience<Number(f.minExp))return false;
    const free=isA?!x.setId:!x.assignments.length;if(f.status==='Libre'&&!free)return false;if(f.status==='En conjunto'&&free)return false;
    if(f.maxSalary&&x.demands.salary>Number(f.maxSalary))return false;
    if(f.favorites&&!favoriteKind(isA?'artists':'professionals',x.id))return false;
    return true;
  }).sort((a,b)=>b.rating-a.rating);
  const roles=isA?[...new Set(marketArtists().map(a=>a.role))].sort():PRO_TYPES;
  return `<div class="card"><div class="sectiontitle"><div><div class="kicker">Mercado</div><h2>Artistas y profesionales</h2></div></div><div class="tabs"><button data-act="market-type" data-val="artists" class="${isA?'on':''}">Artistas</button><button data-act="market-type" data-val="professionals" class="${!isA?'on':''}">Profesionales</button></div>
  <div class="filters"><div class="field"><label>Buscar</label><input data-filter="q" value="${esc(f.q)}" placeholder="Nombre"></div>${isA?`<div class="field"><label>Categoría</label><select data-filter="cat"><option>Todas</option>${Object.keys(CAT).map(c=>`<option ${f.cat===c?'selected':''}>${c}</option>`).join('')}</select></div>`:''}<div class="field"><label>${isA?'Rol':'Especialidad'}</label><select data-filter="role"><option>Todos</option>${roles.map(r=>`<option ${f.role===r?'selected':''}>${esc(r)}</option>`).join('')}</select></div><div class="field"><label>Valoración mínima</label><input data-filter="minRating" type="number" min="0" max="130" value="${esc(f.minRating)}"></div>${isA?`<div class="field"><label>Edad máxima</label><input data-filter="maxAge" type="number" min="18" value="${esc(f.maxAge)}"></div>`:''}<div class="field"><label>Experiencia mínima</label><input data-filter="minExp" type="number" min="0" max="100" value="${esc(f.minExp)}"></div><div class="field"><label>Situación</label><select data-filter="status"><option ${f.status==='Todos'?'selected':''}>Todos</option><option ${f.status==='Libre'?'selected':''}>Libre</option><option ${f.status==='En conjunto'?'selected':''}>En conjunto</option></select></div><div class="field"><label>Pretensión mensual máxima</label><input data-filter="maxSalary" type="number" min="0" value="${esc(f.maxSalary)}" placeholder="$"></div></div>
  <label class="pill gold"><input type="checkbox" data-filter="favorites" ${f.favorites?'checked':''}> Solo favoritos</label>
  <div class="scroll" style="margin-top:10px"><table><thead><tr><th></th><th>Nombre</th><th>${isA?'Categoría / Rol':'Especialidad'}</th><th>Valoración</th><th>Experiencia</th><th>Situación</th><th>Pretensión</th><th></th></tr></thead><tbody>${items.slice(0,120).map(x=>{const kind=isA?'artists':'professionals', blocked=!isA&&x.assignments.some(a=>a.category===playerSet().category);return `<tr><td><button class="star ${favoriteKind(kind,x.id)?'on':''}" data-act="favorite" data-kind="${kind}" data-id="${x.id}">★</button></td><td><button class="btn alt small" data-act="${isA?'artist':'pro'}" data-id="${x.id}">${esc(x.name)}</button></td><td>${isA?`${x.category} · ${esc(x.role)}`:esc(x.type)}</td><td><b>${x.rating}</b></td><td>${x.experience}</td><td>${esc(entityStatus(x))}</td><td>${money(x.demands.salary)}/mes</td><td><button class="btn small" data-act="negotiate" data-kind="${kind}" data-id="${x.id}" ${blocked?'disabled':''}>${blocked?'Ya trabaja en esta categoría':'Negociar'}</button></td></tr>`}).join('')}</tbody></table></div>${!items.length?'<div class="empty">No hay resultados con esos filtros.</div>':''}</div>`;
}