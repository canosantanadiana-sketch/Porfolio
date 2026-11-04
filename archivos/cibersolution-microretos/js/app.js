/* ============================================================
   CiberSolution · Microretos — Beta
   Demo 100% front-end. Los datos se guardan en localStorage.
   ============================================================ */

const STORAGE_KEY = "microretos_db_v1";

const seedRetos = [
  { id:1, cat:"diseño", titulo:"Rediseña la carta digital de una cafetería de Málaga", desc:"Una cafetería del centro necesita una carta QR clara y con estilo. Entrega un PDF o enlace de Figma.", horas:"5–10 h", recompensa:"80 €", empresa:"Café del Centro", entregas:12, rating:4.8 },
  { id:2, cat:"marketing", titulo:"Crea 5 posts de Instagram para una tienda de ropa local", desc:"Propón 5 publicaciones (copy + descripción visual) para lanzar la colección de primavera.", horas:"4–6 h", recompensa:"60 €", empresa:"Moda Sur", entregas:9, rating:4.6 },
  { id:3, cat:"código", titulo:"Arregla el formulario de contacto de una web de hostelería", desc:"El formulario no envía los correos. Revisa el código (HTML/JS o PHP) y propón la solución funcionando.", horas:"6–8 h", recompensa:"120 €", empresa:"Restaurante El Muelle", entregas:7, rating:4.9 },
  { id:4, cat:"vídeo", titulo:"Edita un reel de 30 s para un gimnasio de barrio", desc:"Material bruto facilitado por la empresa. Ritmo dinámico, subtítulos y música libre de derechos.", horas:"3–5 h", recompensa:"50 €", empresa:"FitZone Málaga", entregas:15, rating:4.7 },
  { id:5, cat:"datos", titulo:"Analiza las ventas de una tienda online (CSV)", desc:"Limpia el CSV, calcula métricas clave y presenta 3 conclusiones accionables con gráficos simples.", horas:"6–10 h", recompensa:"100 €", empresa:"TechStore ES", entregas:5, rating:4.9 },
  { id:6, cat:"diseño", titulo:"Diseña el logo y portada de TikTok para una startup", desc:"Startup en fase inicial busca identidad mínima viable: logo, paleta y plantilla de portada.", horas:"8–12 h", recompensa:"150 €", empresa:"NovaStart", entregas:11, rating:4.5 },
];

function loadDB(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){ return JSON.parse(raw); }
  }catch(e){}
  const db = { retos: seedRetos, entregas: [], users: [] };
  saveDB(db);
  return db;
}
function saveDB(db){ localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }
let db = loadDB();
let currentUser = JSON.parse(sessionStorage.getItem("microretos_session") || "null");
let activeCat = "todos";

/* ---------- TOAST ---------- */
function toast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2800);
}

/* ---------- NAV ---------- */
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", ()=> document.getElementById("navLinks").classList.toggle("open"));

function renderNav(){
  const box = document.getElementById("navActions");
  if(currentUser){
    box.classList.add("user");
    box.innerHTML = `<span>👤 ${currentUser.nombre} (${currentUser.rol === "joven" ? "Joven" : "Empresa"})</span>
      <button class="btn btn-ghost" onclick="logout()">Salir</button>`;
  } else {
    box.classList.remove("user");
    box.innerHTML = `<button class="btn btn-ghost" onclick="openAuth('joven')">Soy joven</button>
      <button class="btn btn-primary" onclick="openAuth('empresa')">Soy empresa</button>`;
  }
  document.getElementById("publishBtn").style.display = (currentUser && currentUser.rol === "empresa") ? "" : "";
}
function logout(){ sessionStorage.removeItem("microretos_session"); currentUser = null; renderNav(); toast("Sesión cerrada"); }

/* ---------- MODAL ---------- */
function openModal(html){ document.getElementById("modalBox").innerHTML = html; document.getElementById("modalOverlay").classList.add("open"); }
function closeModal(e){ if(e.target.id === "modalOverlay") e.target.classList.remove("open"); }
function closeModalBtn(){ document.getElementById("modalOverlay").classList.remove("open"); }

/* ---------- AUTH ---------- */
let pickedRole = "joven";
function openAuth(role){
  pickedRole = role;
  openModal(`
    <h2>Crear cuenta</h2>
    <p class="msub">Gratis para jóvenes. Las empresas prueban 30 días.</p>
    <div class="role-pick">
      <button class="${role==='joven'?'active':''}" onclick="openAuth('joven')">🚀 Joven<br><small>hasta 30 años</small></button>
      <button class="${role==='empresa'?'active':''}" onclick="openAuth('empresa')">🏢 Empresa</button>
    </div>
    <label>Nombre ${role==='empresa' ? 'de la empresa' : ''}</label>
    <input id="authName" placeholder="${role==='empresa' ? 'Ej: Café del Centro' : 'Tu nombre'}">
    <label>Email</label>
    <input id="authEmail" type="email" placeholder="tu@email.com">
    <label>Contraseña</label>
    <input id="authPass" type="password" placeholder="••••••••">
    <button class="btn btn-primary" onclick="register()">Crear cuenta gratis</button>
    <p class="switch">Demo local: la cuenta se guarda en tu navegador.</p>
  `);
}
function register(){
  const nombre = document.getElementById("authName").value.trim();
  const email = document.getElementById("authEmail").value.trim();
  const pass = document.getElementById("authPass").value;
  if(!nombre || !email.includes("@") || pass.length < 4){ toast("Completa nombre, email y contraseña (mín. 4)"); return; }
  if(db.users.some(u => u.email === email)){ toast("Ya existe una cuenta con ese email"); return; }
  const user = { id: Date.now(), nombre, email, rol: pickedRole };
  db.users.push(user);
  saveDB(db);
  currentUser = user;
  sessionStorage.setItem("microretos_session", JSON.stringify(user));
  closeModalBtn(); renderNav(); renderRetos();
  toast(`¡Bienvenido/a, ${nombre}!`);
}

/* ---------- RETOS ---------- */
function renderRetos(){
  const grid = document.getElementById("retosGrid");
  const list = db.retos.filter(r => activeCat === "todos" || r.cat === activeCat);
  if(!list.length){ grid.innerHTML = `<div class="empty">No hay retos en esta categoría todavía.</div>`; return; }
  grid.innerHTML = list.map(r => `
    <article class="reto">
      <span class="reto-tag">${r.cat}</span>
      <h3>${r.titulo}</h3>
      <p class="desc">${r.desc}</p>
      <div class="reto-meta"><span>⏱ ${r.horas}</span><b>💶 ${r.recompensa}</b></div>
      <div class="reto-meta"><span>🏢 ${r.empresa}</span><span>⭐ ${r.rating} · ${r.entregas} entregas</span></div>
      ${currentUser && currentUser.rol === "joven"
        ? `<button class="btn btn-primary" onclick="openEntrega(${r.id})">Entregar mi solución</button>`
        : `<button class="btn btn-outline" onclick="openAuth('joven')">Inicia sesión para participar</button>`}
    </article>`).join("");
}

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".chip"); if(!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  activeCat = btn.dataset.cat;
  renderRetos();
});

/* ---------- ENTREGA (joven) ---------- */
function openEntrega(retoId){
  const r = db.retos.find(x => x.id === retoId);
  openModal(`
    <h2>Entregar solución</h2>
    <p class="msub"><b>${r.titulo}</b><br>${r.empresa} · ${r.horas} · ${r.recompensa}</p>
    <label>Enlace a tu trabajo (Drive, GitHub, Figma, Behance…)</label>
    <input id="entLink" placeholder="https://…">
    <label>Mensaje para la empresa</label>
    <textarea id="entMsg" placeholder="Explica en 2–3 líneas tu propuesta…"></textarea>
    <button class="btn btn-primary" onclick="submitEntrega(${r.id})">Enviar entrega</button>
  `);
}
function submitEntrega(retoId){
  const link = document.getElementById("entLink").value.trim();
  const msg = document.getElementById("entMsg").value.trim();
  if(!link){ toast("Pega el enlace a tu trabajo"); return; }
  db.entregas.push({ id: Date.now(), retoId, joven: currentUser.nombre, link, msg, fecha: new Date().toLocaleDateString("es-ES"), valoracion: null });
  saveDB(db);
  closeModalBtn();
  toast("¡Entrega enviada! Recibirás una valoración verificada 🎉");
}

/* ---------- PUBLICAR RETO (empresa) ---------- */
function tryPublish(){
  if(!currentUser){ openAuth("empresa"); toast("Crea tu cuenta de empresa para publicar"); return; }
  if(currentUser.rol !== "empresa"){ toast("Solo las cuentas de empresa pueden publicar retos"); return; }
  openModal(`
    <h2>Publicar un reto</h2>
    <p class="msub">Una tarea pequeña y real. Los jóvenes entregan trabajo, no currículos.</p>
    <label>Título del reto</label>
    <input id="pTitulo" placeholder="Ej: Diseña el menú QR de mi restaurante">
    <label>Categoría</label>
    <select id="pCat">
      <option>diseño</option><option>marketing</option><option>código</option><option>vídeo</option><option>datos</option>
    </select>
    <label>Descripción</label>
    <textarea id="pDesc" placeholder="Contexto, entregable esperado, materiales disponibles…"></textarea>
    <label>Duración estimada</label>
    <input id="pHoras" placeholder="Ej: 5–8 h">
    <label>Recompensa</label>
    <input id="pRew" placeholder="Ej: 80 €">
    <button class="btn btn-primary" onclick="publishReto()">Publicar reto</button>
  `);
}
function publishReto(){
  const titulo = document.getElementById("pTitulo").value.trim();
  const desc = document.getElementById("pDesc").value.trim();
  if(!titulo || !desc){ toast("Título y descripción son obligatorios"); return; }
  db.retos.unshift({
    id: Date.now(),
    cat: document.getElementById("pCat").value,
    titulo, desc,
    horas: document.getElementById("pHoras").value.trim() || "A convenir",
    recompensa: document.getElementById("pRew").value.trim() || "Valoración",
    empresa: currentUser.nombre, entregas: 0, rating: "Nuevo"
  });
  saveDB(db); closeModalBtn(); renderRetos();
  toast("¡Reto publicado! Ya es visible para los jóvenes 🚀");
  document.getElementById("retos").scrollIntoView({behavior:"smooth"});
}

/* ---------- TABS ---------- */
function switchTab(tab){
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + tab));
}

/* ---------- CONTADORES HERO ---------- */
document.querySelectorAll("[data-count]").forEach(el => {
  const target = +el.dataset.count;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const tick = () => {
    cur = Math.min(target, cur + step);
    el.textContent = cur + (target === 87 ? "%" : "+");
    if(cur < target) requestAnimationFrame(tick);
  };
  tick();
});

/* ---------- INIT ---------- */
renderNav();
renderRetos();
