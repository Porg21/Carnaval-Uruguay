function renderModal(){
  if(!U.modal)return '';
  let inside='';
  if(U.modal==='set')inside=renderSetModal(setById(U.selectedSet));
  if(U.modal==='artist')inside=renderArtistModal(artistById(U.selectedSet));
  if(U.modal==='pro')inside=renderProModal(proById(U.selectedSet));
  if(U.modal==='rehearsal')inside=renderRehearsalModal();
  if(U.modal==='negotiation')inside=renderNegotiation();
  return `<div class="modalbg">${inside}</div>`;
}