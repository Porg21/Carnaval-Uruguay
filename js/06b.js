async function loadUserData(){
  if(!session)return;
  const profileResult=await sb.from('profiles').select('id,username,created_at').eq('id',session.user.id).maybeSingle();
  const gameResult=await sb.from('game_saves').select('state,version,updated_at').eq('user_id',session.user.id).maybeSingle();
  profile=profileResult.data||{username:session.user.user_metadata?.username||'Jugador'};
  S=gameResult.data?.version==='0.3'&&gameResult.data?.state?.version==='0.3'?gameResult.data.state:null;
  cloudState=S?'Guardado':'Sin partida';
  render();
}
async function init(){
  APP.innerHTML='<div class="authwrap"><div class="auth"><div class="empty">Cargando Carnaval Uruguay…</div></div></div>';
  const sessionResult=await sb.auth.getSession();
  session=sessionResult.data.session;
  if(session)await loadUserData();else render();
  sb.auth.onAuthStateChange(async(_event,newSession)=>{
    session=newSession;
    if(!session){profile=null;S=null;render();}
  });
}