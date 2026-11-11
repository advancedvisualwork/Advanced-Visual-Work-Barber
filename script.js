/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const CONFIG = {
  whatsapp: "5511900000000",            // NÚMERO FICTÍCIO: troque pelo real (DDI+DDD+número)
  openHour: 9, closeHour: 19,           // horários de 1h: 09:00 até 18:00
  closedWeekdays: [0],                  // 0 = domingo fechado
  daysAhead: 14,
  // PREÇOS FICTÍCIOS: troque pelos valores reais
  services: [
    { id: "low-taper", name: "Degradê baixo",    price: 45, img: "images/low-taper.jpg", pos: "50% 40%", alt: "Perfil com degradê baixo e topo texturizado", desc: "Laterais e nuca em degradê suave, topo texturizado." },
    { id: "skin-fade", name: "Degradê navalhado",price: 50, img: "images/skin-fade.jpg", pos: "50% 40%", alt: "Perfil com degradê até a pele e topo cacheado", desc: "Degradê até a pele, transição marcada e acabamento limpo." },
    { id: "fade-risca",name: "Degradê com risca",price: 55, img: "images/fade-risca.jpg",pos: "50% 40%", alt: "Vista de costas com degradê e risca desenhada", desc: "Degradê com risca desenhada na lateral e nuca alinhada." },
    { id: "maquina",   name: "Corte na máquina", price: 30, img: "images/maquina.jpg",   pos: "50% 40%", alt: "Vista de costas com corte baixo na máquina", desc: "Comprimento uniforme e nuca limpa. Rápido e fácil de manter." },
    { id: "barba",     name: "Barba",            price: 35, img: "images/barba.jpg",     pos: "55% 50%", alt: "Barba modelada com contorno definido", desc: "Modelagem e acabamento da barba, com contorno definido." },
    { id: "penteado",  name: "Penteado",         price: 60, img: "images/penteado.jpg",  pos: "52% 40%", alt: "Perfil com penteado pompadour e laterais baixas", desc: "Pompadour e penteados para o dia a dia ou eventos." },
  ],
};

/* ===== CAMADA DE DADOS =====
   Hoje salva no navegador (localStorage). Para bloquear horários entre
   clientes de verdade, troque estas funções por chamadas a uma API/banco. */
const Store = {
  KEY: "avw_barber_bookings",
  all() { try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { return {}; } },
  isBooked(date, time) { return !!(this.all()[date] || {})[time]; },
  book(date, time, data) {
    const all = this.all();
    if ((all[date] || {})[time]) return false;          // já reservado
    (all[date] = all[date] || {})[time] = data;
    try { localStorage.setItem(this.KEY, JSON.stringify(all)); } catch { return false; }
    return true;
  },
};

/* ===== ESTADO ===== */
const state = { service: null, date: null, time: null };
const $ = (s) => document.querySelector(s);
const brl = (n) => "R$ " + n.toLocaleString("pt-BR");
const pad = (n) => String(n).padStart(2, "0");
const dKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtLong = (d) => new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(d);
const parseKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };

function days() {
  const out = []; const t = new Date();
  for (let i = 0; i < CONFIG.daysAhead; i++) out.push(new Date(t.getFullYear(), t.getMonth(), t.getDate() + i));
  return out;
}
const isClosed = (d) => CONFIG.closedWeekdays.includes(d.getDay());
function timesFor(dateKey) {
  const now = new Date(), isToday = dateKey === dKey(now), out = [];
  for (let h = CONFIG.openHour; h < CONFIG.closeHour; h++) {
    const past = isToday && h <= now.getHours();
    out.push({ time: `${pad(h)}:00`, past });
  }
  return out;
}

/* ===== RENDER ===== */
function renderServices() {
  $("#serviceList").innerHTML = CONFIG.services.map(s => `<li><a class="gcard" href="#agendar" data-service="${s.id}" aria-label="Agendar ${s.name}, ${brl(s.price)}">
    <img src="${s.img}" alt="${s.alt}" loading="lazy" style="object-position:${s.pos}">
    <span class="gcard__info"><span class="display gcard__n">${s.name}</span><span class="gcard__d">${s.desc}</span>
    <span class="gcard__row"><b class="display">${brl(s.price)}</b><em>Agendar ↗</em></span></span></a></li>`).join("");
  $("#serviceOpts").innerHTML = CONFIG.services.map(s =>
    `<button type="button" class="opt" role="radio" aria-checked="false" data-id="${s.id}">${s.name} · ${brl(s.price)}</button>`).join("");
  $("#hours").textContent = `Seg a Sáb, ${pad(CONFIG.openHour)}h às ${pad(CONFIG.closeHour)}h (horário de exemplo)`;
}
function renderDays() {
  $("#days").innerHTML = days().map(d => {
    const k = dKey(d), closed = isClosed(d);
    const wd = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(d).replace(".", "");
    const mo = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(d).replace(".", "");
    return `<button type="button" class="day" data-date="${k}" aria-pressed="${state.date === k}" ${closed ? "disabled aria-label=\"Fechado\"" : ""}><small>${wd}</small><b>${d.getDate()}</b><small>${mo}</small></button>`;
  }).join("");
}
function renderSlots() {
  const box = $("#slots");
  if (!state.date) { box.innerHTML = `<p class="slots__empty">Escolha um dia para ver os horários.</p>`; return; }
  const list = timesFor(state.date);
  box.innerHTML = list.map(({ time, past }) => {
    const booked = Store.isBooked(state.date, time);
    const label = booked ? `${time}, reservado` : past ? `${time}, já passou` : time;
    return `<button type="button" class="slot ${booked ? "is-booked" : ""}" data-time="${time}" aria-label="${label}" aria-pressed="${state.time === time}" ${booked || past ? "disabled" : ""}>${time}</button>`;
  }).join("");
  if (state.time && Store.isBooked(state.date, state.time)) state.time = null;
}
function renderSummary() {
  const s = CONFIG.services.find(x => x.id === state.service);
  const parts = [s && `${s.name} (${brl(s.price)})`, state.date && fmtLong(parseKey(state.date)), state.time && `às ${state.time}`].filter(Boolean);
  $("#summary").textContent = parts.length ? parts.join(", ") : "Escolha serviço, dia e horário.";
}
const renderAll = () => { renderDays(); renderSlots(); renderSummary(); };

/* ===== EVENTOS ===== */
function selectService(id) {
  state.service = id;
  document.querySelectorAll(".opt").forEach(o => o.setAttribute("aria-checked", o.dataset.id === id));
  renderSummary();
}
$("#serviceOpts").addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (b) selectService(b.dataset.id); });
$("#serviceList").addEventListener("click", (e) => { const a = e.target.closest("[data-service]"); if (a) selectService(a.dataset.service); });
$("#days").addEventListener("click", (e) => {
  const b = e.target.closest(".day"); if (!b || b.disabled) return;
  state.date = b.dataset.date; state.time = null; renderAll();
});
$("#slots").addEventListener("click", (e) => {
  const b = e.target.closest(".slot"); if (!b || b.disabled) return;
  state.time = b.dataset.time; renderSlots(); renderSummary();
});
window.addEventListener("storage", (e) => { if (e.key === Store.KEY) { renderSlots(); renderSummary(); } }); // outra aba

function say(html, err) { const m = $("#msg"); m.className = "msg" + (err ? " err" : ""); m.innerHTML = html; }

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const svc = CONFIG.services.find(x => x.id === state.service);
  if (!svc) return say("Escolha o serviço.", true);
  if (!state.date) return say("Escolha o dia.", true);
  if (!state.time) return say("Escolha um horário livre.", true);
  if (name.length < 2) return say("Informe seu nome.", true);

  const { date, time } = state;
  if (!Store.book(date, time, { service: svc.name, name, at: Date.now() })) {
    state.time = null; renderSlots(); renderSummary();
    return say("Esse horário acabou de ser reservado. Escolha outro.", true);
  }
  const text = `Olá, AVW Barber! Quero agendar: ${svc.name} (${brl(svc.price)}), ${fmtLong(parseKey(date))} às ${time}. Meu nome é ${name}.`;
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  state.time = null; renderSlots(); renderSummary();
  say(`Horário reservado! Envie a mensagem no WhatsApp para confirmar. <a href="${url}" target="_blank" rel="noopener">Abrir WhatsApp</a>`);
  window.open(url, "_blank", "noopener");
});

renderServices(); renderAll();
