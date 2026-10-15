function authView(){
  const reg=U.authMode==='register';
  APP.innerHTML=`<div class="authwrap"><div class="auth"><div class="logo">🎭</div><h1>Carnaval Uruguay</h1><p class="muted">Simulador de gestión del Carnaval uruguayo · v0.2</p>
  <div class="seg"><button data-act="auth-tab" data-mode="login" class="${!reg?'on':''}">Ingresar</button><button data-act="auth-tab" data-mode="register" class="${reg?'on':''}">Crear cuenta</button></div>
  ${U.authError?`<div class="note danger">${esc(U.authError)}</div>`:''}
  <form id="authForm">
    <div class="field"><label>Usuario</label><input name="username" minlength="3" maxlength="24" autocomplete="username" required placeholder="Porg21"></div>
    ${reg?`<div class="field"><label>Email privado</label><input name="email" type="email" autocomplete="email" required placeholder="tu@email.com"><small>Se guarda asociado a tu cuenta y no se muestra públicamente.</small></div>`:''}
    <div class="field"><label>Contraseña</label><input name="password" type="password" minlength="6" autocomplete="${reg?'new-password':'current-password'}" required></div>
    <button class="btn" style="width:100%;margin-top:8px" ${U.authBusy?'disabled':''}>${U.authBusy?'Procesando…':reg?'Crear cuenta':'Ingresar'}</button>
  </form>
  <div class="note" style="margin-top:12px">Tu partida de v0.2 se guarda online y queda vinculada a esta cuenta. Las partidas locales de v0.1 no se importan.</div></div></div>`;
}
async function submitAuth(form){
  const fd=new FormData(form),username=String(fd.get('username')||'').trim(),password=String(fd.get('password')||''),email=String(fd.get('email')||'').trim();
  U.authBusy=true;U.authError='';render();
  try{
    const res=await fetch(AUTH_URL,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify({action:U.authMode==='register'?'register':'login',username,password,email})});
    const data=await res.json();if(!res.ok)throw new Error(data.error||'No se pudo iniciar sesión.');
    const {error}=await sb.auth.setSession({access_token:data.session.access_token,refresh_token:data.session.refresh_token});if(error)throw error;
    session=(await sb.auth.getSession()).data.session;profile={username:data.profile?.username||username};S=null;await loadUserData();
  }catch(e){U.authError=e.message||'Ocurrió un error.';}
  U.authBusy=false;render();
}