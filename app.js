(() => {
  const config = window.portfolio;
  const make = (tag, cls, text) => { const e = document.createElement(tag); if(cls) e.className=cls; if(text) e.textContent=text; return e; };
  let viewerReady;
  function loadViewer() {
    if (!viewerReady) viewerReady = new Promise((resolve,reject) => {
      const script = document.createElement('script'); script.type='module';
      script.src='https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      script.onload=() => customElements.whenDefined('model-viewer').then(resolve);
      script.onerror=() => reject(new Error('Viewer unavailable')); document.head.append(script);
    });
    return viewerReady;
  }
  config.projects.forEach(p => {
    const article=make('article','project'); article.id=p.id;
    const media=make('div'); const viewport=make('div','viewport');
    viewport.append(make('span','viewport-label',p.number+' / '+p.tool.toUpperCase()));
    const placeholder=make('div','placeholder');
    const plus=make('div','plus','+'); plus.setAttribute('aria-hidden','true');
    placeholder.append(plus,make('strong','',p.model?'Interactive model':'Model preview coming soon'),make('p','',p.model?'Load the model to explore it in 3D.':'The actual project export will appear here.'));
    if(p.image){const img=make('img');img.src=p.image;img.alt=p.imageAlt||p.title+' project image';img.loading='lazy';img.addEventListener('error',()=>{img.remove();viewport.append(placeholder);});viewport.append(img);}else viewport.append(placeholder);
    const status=make('p','model-status',p.model?'3D available · Load on demand':'Awaiting project assets'); status.setAttribute('role','status');
    media.append(viewport,status);
    if(p.model){
      const actions=make('div','model-actions');const load=make('button','','Load 3D model');load.type='button';actions.append(load);media.append(actions);
      load.addEventListener('click',async()=>{
        load.disabled=true;status.textContent='Loading 3D viewer…';
        try{
          await loadViewer();const viewer=make('model-viewer');viewer.setAttribute('alt','Interactive 3D model of '+p.title);viewer.setAttribute('camera-controls','');viewer.setAttribute('touch-action','pan-y');viewer.setAttribute('shadow-intensity','1');viewer.setAttribute('camera-orbit','35deg 65deg auto');viewer.setAttribute('loading','eager');
          const timeout=setTimeout(()=>{status.textContent='The model is taking longer than expected. Check your connection or reload to retry.';},30000);
          viewer.addEventListener('load',()=>{
            clearTimeout(timeout);viewport.replaceChildren(viewer);status.textContent='Drag or use arrow keys to orbit · Pinch or scroll to zoom';actions.replaceChildren();
            const reset=make('button','','Reset view');reset.type='button';reset.onclick=()=>{viewer.cameraOrbit='35deg 65deg auto';viewer.cameraTarget='auto auto auto';viewer.fieldOfView='auto';};
            const rotate=make('button','','Auto-rotate');rotate.type='button';rotate.setAttribute('aria-pressed','false');rotate.onclick=()=>{viewer.autoRotate=!viewer.autoRotate;rotate.setAttribute('aria-pressed',String(viewer.autoRotate));};actions.append(reset,rotate);
          },{once:true});
          viewer.addEventListener('error',()=>{clearTimeout(timeout);viewer.remove();status.textContent='Model could not load. Please try again later.';load.disabled=false;},{once:true});
          viewer.src=p.model;viewport.append(viewer);status.textContent='Loading model…';
        }catch{status.textContent='The 3D viewer is unavailable. Check your connection and reload to retry.';load.disabled=false;viewerReady=null;}
      });
    }
    const copy=make('div','project-copy');const meta=make('div','project-meta');meta.append(make('span','',p.number+' /'),make('span','',p.category));
    const title=make('h3','',p.title);title.id=p.id+'-title';article.setAttribute('aria-labelledby',title.id);
    copy.append(meta,title,make('p','',p.description),make('span','tag',p.tool));
    const details=make('details');details.append(make('summary','','Project notes'));const dl=make('dl');
    [['Role & scope',p.role||'Personal contributions and project scope to be added.'],['Design approach',p.approach||'Design decisions, constraints, and iterations to be documented.'],['Evidence & reflection',p.evidence||'Drawings, verified results, and lessons learned to be added.']].forEach(([k,v])=>dl.append(make('dt','',k),make('dd','',v)));
    details.append(dl);copy.append(details);article.append(media,copy);document.querySelector('#project-list').append(article);
  });
  if(config.resume){const a=make('a','button','View resume (PDF) ↗');a.href=config.resume;a.target='_blank';a.rel='noopener noreferrer';document.querySelector('#resume-link').replaceChildren(a);}
  if(config.email){const a=make('a','',config.email+' ↗');a.href='mailto:'+config.email;document.querySelector('#email-link').append(a);document.querySelector('.contact>p:not(.eyebrow)').textContent='Connect on GitHub or send me an email.';}
})();
