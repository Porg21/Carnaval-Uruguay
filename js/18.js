APP.addEventListener('submit',e=>{if(e.target.id==='authForm'){e.preventDefault();submitAuth(e.target);}});
APP.addEventListener('change',e=>{
  const f=e.target.dataset?.filter;if(f){U.filters[f]=e.target.type==='checkbox'?e.target.checked:e.target.value;render();}
});
APP.addEventListener('click',async e=>{
  const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='auth-tab'){U.authMode=b.dataset.mode;U.authError='';render();return;}
  if(a==='logout'){await sb.auth.signOut();return;}
  if(a==='setup-back'){U.setupStep=Math.max(0,U.setupStep-1);render();return;}
  if(a==='setup-next'){await nextSetup();return;}
  if(a==='setup-cat'){U.setup.cat=b.dataset.val;render();return;}if(a==='setup-dif'){U.setup.dif=b.dataset.val;render();return;}if(a==='setup-first'){U.setup.first=b.dataset.val;render();return;}
  if(a==='view'){U.view=b.dataset.view;U.setCategory=null;render();return;}
  if(a==='favorite'){toggleFavorite(b.dataset.kind,b.dataset.id);return;}
  if(a==='toggle-starter'){toggleStarter(b.dataset.id);return;}
  if(a==='market-type'){U.marketType=b.dataset.val;U.filters.role='Todos';render();return;}
  if(a==='set-cat'){U.setCategory=b.dataset.val;render();return;}if(a==='set-back'){U.setCategory=null;render();return;}
  if(a==='open-set'){U.selectedSet=b.dataset.id;U.modal='set';render();return;}
  if(a==='artist'){U.selectedSet=b.dataset.id;U.modal='artist';render();return;}if(a==='pro'){U.selectedSet=b.dataset.id;U.modal='pro';render();return;}
  if(a==='close-modal'){U.modal=null;U.negotiation=null;render();return;}
  if(a==='plan-rehearsal'){U.rehearsal={day:Number(b.dataset.day),parts:[]};U.modal='rehearsal';render();return;}
  if(a==='add-part'){const p=b.dataset.val,cost=U.rehearsal.parts.reduce((n,x)=>n+(x==='Ensayo completo'?2:1),0)+(p==='Ensayo completo'?2:1);if(cost<=3)U.rehearsal.parts.push(p);render();return;}
  if(a==='remove-part'){U.rehearsal.parts.splice(Number(b.dataset.index),1);render();return;}
  if(a==='save-rehearsal'){saveRehearsal();return;}
  if(a==='advance-week'){b.disabled=true;await advanceWeek();return;}
  if(a==='notif-tab'){U.notifTab=b.dataset.val;render();return;}
  if(a==='negotiate'){openNegotiation(b.dataset.kind,b.dataset.id);return;}
  if(a==='send-offer'){await sendOffer();return;}
  if(a==='accept-counter'){const n=U.negotiation,e=n.kind==='artists'?artistById(n.entityId):proById(n.entityId);completeHire(e,n.kind,n.counter);U.modal=null;U.negotiation=null;await cloudSave();render();return;}
  if(a==='reject-negotiation'){const n=U.negotiation,e=n.kind==='artists'?artistById(n.entityId):proById(n.entityId);notify('Mercado',`La negociación con ${e.name} terminó sin acuerdo.`);U.modal=null;U.negotiation=null;queueSave();render();return;}
});
init();