
/* ---------- Estado ---------- */
let candidatos = [];
const ROLES = [
  {code:'VM', label:'Muy Ven∴ Maest∴'},
  {code:'P1V', label:'Primer Vigilante'},
  {code:'P2V', label:'Segundo Vigilante'},
  {code:'GT', label:'Guarda Templo'},
  {code:'EXP', label:'Experto(s)'},
  {code:'MC', label:'Maestro de Ceremonias'},
  {code:'OR', label:'Orador'},
  {code:'PTE', label:'Presidente de Comisión'},
  {code:'CAND', label:'Candidato(s)'},
  {code:'TODOS', label:'Todos los HH∴'}
];
let activeRoles = new Set();

/* ---------- Setup panel: candidatos ---------- */
function renderCandList(){
  const wrap = document.getElementById('candList');
  wrap.innerHTML = '';
  if(candidatos.length===0) candidatos=[''];
  candidatos.forEach((v,i)=>{
    const row = document.createElement('div');
    row.className='cand-row';
    row.innerHTML = `<input type="text" placeholder="Nombre del candidato ${i+1}" value="${v.replace(/"/g,'&quot;')}" data-idx="${i}">`;
    if(candidatos.length>1){
      const rm = document.createElement('button');
      rm.className='btn secondary'; rm.type='button'; rm.textContent='✕';
      rm.onclick=()=>{candidatos.splice(i,1); renderCandList();};
      row.appendChild(rm);
    }
    wrap.appendChild(row);
  });
  wrap.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('input', e=>{
      candidatos[+e.target.dataset.idx] = e.target.value;
    });
  });
}
document.getElementById('addCand').addEventListener('click', ()=>{
  candidatos.push(''); renderCandList();
});
document.getElementById('startBtn').addEventListener('click', ()=>{
  candidatos = candidatos.map(c=>c.trim()).filter(c=>c.length>0);
  if(candidatos.length===0) candidatos=['(candidato sin nombre)'];
  document.getElementById('setupPanel').style.display='none';
  buildRitual();
  window.scrollTo({top:0});
});
renderCandList();

/* ---------- Plantillas de nombres ---------- */
function nombresTexto(){
  if(candidatos.length===1) return candidatos[0];
  if(candidatos.length===2) return candidatos[0]+' y '+candidatos[1];
  return candidatos.slice(0,-1).join(', ')+' y '+candidatos[candidatos.length-1];
}
function tpl(str){
  str = str.replace(/\{\{NOMBRES\}\}/g, ()=>nombresTexto());
  str = str.replace(/\{\{S:([^|]*)\|([^}]*)\}\}/g, (m,s,p)=> candidatos.length>1 ? p : s);
  return str;
}
/* Marca de alternancia literal candidato/candidatos ya presente en el texto original */
function marcaAlt(str){
  // envuelve "candidato" seguido de "(o candidatos)" con spans que se resaltan según conteo, sin alterar ni una palabra
  return str.replace(/\b(candidato)(\s*\(o candidatos\))?/gi, (m,a,b)=>{
    if(!b) return m;
    const single = candidatos.length<=1;
    return `<span class="${single?'alt-active':'alt-dim'}">${a}</span><span class="${single?'alt-dim':'alt-active'}">${b}</span>`;
  });
}

/* ---------- Construcción del ritual ---------- */
function buildRitual(){
  const container = document.getElementById('ritualContainer');
  container.innerHTML = '';
  RITUAL.forEach(phase=>{
    const h = document.createElement('div');
    h.className='phase-heading';
    h.id = 'phase-'+phase.id;
    h.innerHTML = phase.title + (phase.subtitle? `<small>${phase.subtitle}</small>`:'');
    container.appendChild(h);
    phase.entries.forEach(entry=>{
      const div = document.createElement('div');
      div.className = 'entry ' + entry.type;
      div.dataset.roles = (entry.roles||[]).join(',');
      div.dataset.phase = phase.id;
      let inner = '';
      if(entry.loc){
        inner += `<span class="loc-tag ${entry.inferred?'inferred':''}">📍 ${tpl(entry.loc)}</span><br>`;
      }
      if(entry.speakerLabel){
        inner += `<span class="speaker">${entry.speakerLabel}</span>`;
      }
      let txt = tpl(entry.text);
      txt = marcaAlt(txt);
      inner += txt;
      div.innerHTML = inner;
      container.appendChild(div);
    });
  });
  attachScrollObserver();
  updateHighlights();
}

/* ---------- Chips de puestos ---------- */
function renderChips(){
  const wrap = document.getElementById('chips');
  wrap.innerHTML='';
  ROLES.forEach(r=>{
    const chip = document.createElement('button');
    chip.className='chip'+(r.code==='TODOS'?' chip-todos':'');
    chip.textContent = r.label;
    chip.dataset.code = r.code;
    chip.addEventListener('click', ()=>{
      if(activeRoles.has(r.code)) activeRoles.delete(r.code); else activeRoles.add(r.code);
      chip.classList.toggle('active');
      updateHighlights();
    });
    wrap.appendChild(chip);
  });
}
renderChips();

function updateHighlights(){
  document.querySelectorAll('.entry').forEach(div=>{
    const roles = (div.dataset.roles||'').split(',').filter(Boolean);
    const on = roles.some(r=>activeRoles.has(r));
    div.classList.toggle('highlight', on);
  });
}

/* ---------- Barra superior: ocultar al bajar, mostrar al subir ---------- */
let lastScroll = 0;
const topbar = document.getElementById('topbar');
const progressWrap = document.getElementById('progressWrap');
window.addEventListener('scroll', ()=>{
  const cur = window.scrollY;
  if(cur > lastScroll && cur > 80){
    topbar.classList.add('hidden');
    progressWrap.style.top = '0px';
  } else {
    topbar.classList.remove('hidden');
    progressWrap.style.top = topbar.offsetHeight+'px';
  }
  lastScroll = cur <= 0 ? 0 : cur;
  updateProgress();
}, {passive:true});

function updateProgress(){
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable>0 ? Math.min(100, Math.round((window.scrollY/scrollable)*100)) : 0;
  document.getElementById('progressFill').style.width = pct+'%';
  document.getElementById('progressPct').textContent = pct+'%';
}

/* ---------- Fase actual visible (IntersectionObserver) ---------- */
let currentPhaseTitle = 'Inicio';
function attachScrollObserver(){
  const headings = document.querySelectorAll('.phase-heading');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        currentPhaseTitle = e.target.textContent.replace(/\s+/g,' ').trim();
        document.getElementById('progressLabel').textContent = currentPhaseTitle;
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px'});
  headings.forEach(h=>obs.observe(h));
}

/* Ajusta posicion inicial de la barra de progreso bajo el topbar */
window.addEventListener('load', ()=>{
  progressWrap.style.top = topbar.offsetHeight+'px';
});

/* ---------- Service worker ---------- */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
