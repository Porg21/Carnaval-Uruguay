async function cloudSave(){
  if(!session||!S)return;
  cloudState='Guardando…';
  updateCloudLabel();
  const result=await sb.from('game_saves').upsert({user_id:session.user.id,version:'0.2',state:S},{onConflict:'user_id'});
  cloudState=result.error?'Error al guardar':'Guardado';
  updateCloudLabel();
}
function queueSave(){
  clearTimeout(saveTimer);
  cloudState='Cambios pendientes';
  updateCloudLabel();
  saveTimer=setTimeout(cloudSave,450);
}
function updateCloudLabel(){
  const el=document.getElementById('cloudState');
  if(el)el.textContent=cloudState;
}