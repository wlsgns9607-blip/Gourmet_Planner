/* ============================================================
   미식플레너 SPA — 라우터 & 인터랙션
   ============================================================ */

// ============================================================
// 미식플레너 SPA — 라우터 & 인터랙션
// ============================================================


// 로그인 상태 (데모용 — Firebase 연결 시 onAuthStateChanged로 교체)
let isLoggedIn = false;
let selectedMode = 'quiet'; // 'quiet' = 고독한채팅, 'talk' = 미식대화

// 로그인 필요 화면 목록
const authRequired = ['rooms', 'matching', 'ai', 'record', 'passport', 'enter-room', 'create-room', 'chat', 'admin'];

// 로그인 체크 후 이동
function goAuth(name) {
  if (authRequired.includes(name) && !isLoggedIn) {
    go('login');
    return;
  }
  go(name);
}

let navHistory = ['splash'];
let curScreen = 'splash';

function go(name) {
  const prev = document.getElementById('screen-' + curScreen);
  const next = document.getElementById('screen-' + name);
  if (!next) return;
  if (prev) prev.classList.remove('active');
  next.classList.add('active');
  // 스크롤 맨 위로
  const sc = next.querySelector('[style*="overflow-y"]');
  if (sc) sc.scrollTop = 0;
  navHistory.push(name);
  curScreen = name;
  onEnter(name);
}

function back() {
  if (navHistory.length > 1) {
    navHistory.pop();
    const prev = navHistory[navHistory.length - 1];
    const curr = document.getElementById('screen-' + curScreen);
    const prevEl = document.getElementById('screen-' + prev);
    if (curr) curr.classList.remove('active');
    if (prevEl) prevEl.classList.add('active');
    curScreen = prev;
  }
}

// 로그인 처리
function doLogin() {
  const emailInput = document.getElementById('loginEmail');
  const pwInput = document.getElementById('loginPw');
  
  if (emailInput && pwInput && emailInput.value === 'wlsgns1996@naver.com' && pwInput.value === 'jinhun0364') {
    isLoggedIn = true;
    go('admin');
  } else {
    isLoggedIn = true;
    go('login-success');
  }
}
function doLogout() {
  isLoggedIn = false;
  go('logout-alert');
}

function onEnter(name) {
  if (name === 'matching') startMatching();
  if (name === 'passport') drawRadar();
  if (name === 'chat') setTimeout(() => { const cb = document.getElementById('chatBody'); if (cb) cb.scrollTop = cb.scrollHeight; }, 60);
}

// 토스트
let toastT;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 2200);
}

// 바텀시트
function showSheet(n) { const el = document.getElementById('sw-' + n); if (el) el.classList.add('show'); }
function closeSheet(n) { const el = document.getElementById('sw-' + n); if (el) el.classList.remove('show'); }

// 토글
document.addEventListener('click', e => { if (e.target.classList.contains('toggle')) e.target.classList.toggle('on'); });

// 필터 핍
document.addEventListener('click', e => { if (e.target.classList.contains('pill')) e.target.classList.toggle('active'); });

// 최대 인원
document.addEventListener('click', e => {
  const opt = e.target.closest('.seat-opt');
  if (opt) {
    opt.closest('.seat-select').querySelectorAll('.seat-opt').forEach(o => o.classList.remove('sel'));
    opt.classList.add('sel');
  }
});

// 매칭 모드
document.querySelectorAll('.pref-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pref-opt').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    const msg = document.getElementById('pref-msg');
    selectedMode = btn.dataset.mode;
    if (msg) msg.innerHTML = btn.dataset.mode === 'quiet'
      ? '<strong>박지윤님</strong>은 고독한 채팅을 선호하시네요.'
      : '<strong>박지윤님</strong>은 미식 대화를 선호하시네요.';
    // 방 리스트 제목 변경
    const rt = document.getElementById('rooms-title-text');
    const rs = document.getElementById('rooms-sub-text');
    if (rt) rt.textContent = btn.dataset.mode === 'quiet' ? '고독한 오픈채팅방' : '미식 대화 오픈채팅방';
    if (rs) rs.textContent = btn.dataset.mode === 'quiet' ? 'SILENT TABLES' : 'GOURMET TALK';
  });
});

// 미각 선택
document.addEventListener('click', e => {
  if (e.target.classList.contains('taste-opt')) {
    const t = e.target.dataset.t;
    document.querySelectorAll(`.taste-opt[data-t="${t}"]`).forEach(o => o.classList.remove('sel'));
    e.target.classList.add('sel');
  }
});

// 별점
document.addEventListener('click', e => {
  if (e.target.classList.contains('rstar')) {
    const r = parseInt(e.target.dataset.r);
    document.querySelectorAll('.rstar').forEach((s, i) => s.classList.toggle('sel', i < r));
  }
});

// 채팅
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.getElementById('chatBody');
function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const row = document.createElement('div');
  row.className = 'msg-row mine';
  row.style.animation = 'fadeIn 0.3s';
  row.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${time}</div>`;
  chatBody.appendChild(row);
  chatBody.scrollTop = chatBody.scrollHeight;
  msgInput.value = '';
}
if (sendBtn) sendBtn.addEventListener('click', sendMsg);
if (msgInput) msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });

// 미식 기록 — 3단계
let curStep = 1;
function nextStep() {
  if (curStep < 3) goStep(curStep + 1);
  else { toast('미식 기록이 저장되었습니다 ✓'); go('passport'); }
}
function prevStep() { if (curStep > 1) goStep(curStep - 1); }
function goStep(s) {
  document.querySelectorAll('.step-page').forEach(p => p.classList.remove('active'));
  const sp = document.getElementById('step' + s);
  if (sp) sp.classList.add('active');
  for (let i = 1; i <= 3; i++) {
    const d = document.getElementById('dot' + i);
    if (!d) continue;
    d.classList.remove('active', 'done');
    if (i < s) d.classList.add('done');
    else if (i === s) d.classList.add('active');
    if (i < 3) { const l = document.getElementById('line' + i); if (l) l.classList.toggle('done', i < s); }
  }
  const bb = document.getElementById('backBtn');
  const nb = document.getElementById('nextBtn');
  if (bb) bb.style.display = s > 1 ? 'flex' : 'none';
  if (nb) nb.innerHTML = s === 3 ? '미식 기록 저장 ✓' : '다음 단계로 →';
  curStep = s;
}

// 음성 시뮬레이션
let recording = false;
const sampleText = '오늘 밍글스에서 한식 코스를 먹었어요. 감칠맛이 정말 깊었고, 짭조름함과 부드러운 식감이 인상적이었습니다.';
const micBtn = document.getElementById('micBtn');
if (micBtn) {
  micBtn.addEventListener('click', () => {
    const vs = document.getElementById('voiceStatus');
    const wf = document.getElementById('waveform');
    const tr = document.getElementById('transcript');
    const ap = document.getElementById('aiPreview');
    if (!recording) {
      recording = true;
      micBtn.classList.add('recording');
      if (wf) wf.classList.add('recording');
      if (vs) vs.textContent = '녹음 중... (다시 누르면 종료)';
      if (tr) tr.textContent = '';
      let i = 0;
      const ti = setInterval(() => {
        if (i < sampleText.length && recording) { if (tr) tr.textContent += sampleText[i]; i++; }
        else clearInterval(ti);
      }, 80);
    } else {
      recording = false;
      micBtn.classList.remove('recording');
      if (wf) wf.classList.remove('recording');
      if (vs) vs.textContent = '녹음이 완료되었습니다 ✓';
      if (ap) ap.classList.add('show');
    }
  });
}

// 매칭 게이지
function startMatching() {
  let pct = 55;
  const pe = document.getElementById('pr-pct');
  const arc = document.getElementById('pr-arc');
  if (!arc) return;
  const total = 2 * Math.PI * 88;
  function upd() {
    if (pe) pe.textContent = Math.round(pct) + '%';
    arc.style.strokeDashoffset = total - (total * pct / 100);
  }
  upd();
  const iv = setInterval(() => { pct = Math.min(pct + Math.random() * 3, 92); upd(); if (pct >= 92) clearInterval(iv); }, 1200);
}

// 슬라이더
const michelin = [
  {name:'밍글스',grade:'★★★',loc:'청담',en:'MINGLES',img:'img/img_005.jpg'},
  {name:'모수',grade:'★★',loc:'한남',en:'MOSU',img:'img/img_002.jpg'},
  {name:'정식당',grade:'★★',loc:'청담',en:'JUNGSIK',img:'img/img_007.jpg'},
  {name:'스와니예',grade:'★★',loc:'서초',en:'SOIGNÉ',img:'img/img_001.jpg'},
  {name:'소수헌',grade:'★★',loc:'종로',en:'SOSUHEON',img:'img/img_008.jpg'},
  {name:'라연',grade:'★★',loc:'신라호텔',en:'LA YEON',img:'img/img_004.jpg'},
  {name:'온지음',grade:'★',loc:'가회동',en:'ONJIUM',img:'img/img_003.png'},
  {name:'이타닉가든',grade:'★',loc:'종로',en:'EATANIC GARDEN',img:'img/img_006.jpg'},
  {name:'솔밤',grade:'★',loc:'신사동',en:'SOLBAM',img:'img/img_002.jpg'},
  {name:'소울',grade:'★',loc:'청담',en:'SOUL',img:'img/img_005.jpg'},
];
const omakase = [
  {name:'스시 코지마',grade:'오마카세',loc:'1인 카운터',en:'KOJIMA',img:'img/susi_001.jpg'},
  {name:'스시 마츠모토',grade:'오마카세 ★',loc:'한남동',en:'MATSUMOTO',img:'img/susi_002.jpg'},
  {name:'하네',grade:'오마카세',loc:'청담',en:'HANE',img:'img/img_001.jpg'},
  {name:'스시 죠',grade:'오마카세',loc:'압구정',en:'SUSHI JO',img:'img/susi_003.jpg'},
  {name:'긴자 오노데라',grade:'오마카세',loc:'청담',en:'ONODERA',img:'img/img_002.jpg'},
];
const sliders = {};

function initSlider(id, data) {
  sliders[id] = { cur: 0, data, timer: null };
  renderSlider(id);
  autoSlide(id);
}

function renderSlider(id) {
  const s = sliders[id];
  const ss = document.getElementById('ss-' + id);
  const sd = document.getElementById('sd-' + id);
  if (!ss || !sd) return;
  ss.innerHTML = s.data.map(d => `
    <div class="hero-slide">
      ${d.img ? `<img class="slide-bg-img" src="${d.img}" alt="${d.name}">` : ''}
      <div class="slide-placeholder">${d.en}</div>
      <div class="slide-overlay"></div>
      <div class="slide-info"><div class="slide-grade">${d.grade} · ${d.loc}</div><div class="slide-name">${d.name}</div></div>
    </div>`).join('');
  sd.innerHTML = s.data.map((_,i) => `<div class="slider-dot ${i===s.cur?'active':''}" onclick="gSlide('${id}',${i})"></div>`).join('');
  ss.style.transform = `translateX(-${s.cur * 100}%)`;
}

function gSlide(id, idx) {
  const s = sliders[id];
  if (!s) return;
  s.cur = idx;
  const ss = document.getElementById('ss-' + id);
  if (ss) ss.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll(`#sd-${id} .slider-dot`).forEach((d, i) => d.classList.toggle('active', i === idx));
  clearInterval(s.timer);
  autoSlide(id);
}

function sMv(id, dir) {
  const s = sliders[id];
  if (!s) return;
  gSlide(id, (s.cur + dir + s.data.length) % s.data.length);
}

function autoSlide(id) {
  const s = sliders[id];
  if (!s) return;
  s.timer = setInterval(() => sMv(id, 1), 3500);
}

// 여권 색상
function setPC(el, grad) {
  document.querySelectorAll('.color-opt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  const c = document.getElementById('passportCover');
  if (c) c.style.background = grad;
}

// 레이더 차트
function drawRadar() {
  const tastes = [
    {n:'단맛', v: tasteValues['단맛']},
    {n:'짠맛', v: tasteValues['짠맛']},
    {n:'매운맛', v: tasteValues['매운맛']},
    {n:'감칠맛', v: tasteValues['감칠맛']},
    {n:'산미', v: tasteValues['산미']},
    {n:'쓴맛', v: tasteValues['쓴맛']}
  ];
  const R = 100, max = 5;
  function pt(angle, dist) { const r = angle * Math.PI / 180; return { x: Math.sin(r)*dist, y: -Math.cos(r)*dist }; }
  function poly(dist) { return tastes.map((_,i)=>{ const p=pt(i*60,dist); return p.x+','+p.y; }).join(' '); }
  ['g20','g40','g60','g80','g100'].forEach((id,i) => { const el=document.getElementById(id); if(el) el.setAttribute('points', poly(R*(i+1)*0.2)); });
  const ax = document.getElementById('rAxes');
  if (ax) { ax.innerHTML=''; tastes.forEach((_,i) => { const p=pt(i*60,R); const l=document.createElementNS('http://www.w3.org/2000/svg','line'); l.setAttribute('class','ra'); l.setAttribute('x1',0); l.setAttribute('y1',0); l.setAttribute('x2',p.x); l.setAttribute('y2',p.y); ax.appendChild(l); }); }
  const dp = document.getElementById('rData');
  if (dp) dp.setAttribute('points', tastes.map((t,i)=>{ const p=pt(i*60,(t.v/max)*R); return p.x+','+p.y; }).join(' '));
  const dg = document.getElementById('rDots');
  if (dg) { dg.innerHTML=''; tastes.forEach((t,i)=>{ const p=pt(i*60,(t.v/max)*R); const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('class','rd'); c.setAttribute('cx',p.x); c.setAttribute('cy',p.y); c.setAttribute('r',3.5); dg.appendChild(c); }); }
  const lg = document.getElementById('rLabels');
  if (lg) { lg.innerHTML=''; tastes.forEach((t,i)=>{ const p=pt(i*60,R+18); const tx=document.createElementNS('http://www.w3.org/2000/svg','text'); tx.setAttribute('class','radar-label'); tx.setAttribute('x',p.x); tx.setAttribute('y',p.y); tx.setAttribute('text-anchor','middle'); tx.setAttribute('dominant-baseline','middle'); tx.setAttribute('style','font-family:var(--font-display);font-size:11px;font-weight:600;fill:var(--ink);'); tx.textContent=t.n; lg.appendChild(tx); const tv=document.createElementNS('http://www.w3.org/2000/svg','text'); tv.setAttribute('x',p.x); tv.setAttribute('y',p.y+13); tv.setAttribute('text-anchor','middle'); tv.setAttribute('dominant-baseline','middle'); tv.setAttribute('style','font-family:var(--font-en);font-size:10px;font-weight:600;fill:var(--terracotta);'); tv.textContent=t.v; lg.appendChild(tv); }); }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  go('splash');
  initSlider('mh', michelin);
  initSlider('oh', omakase);
  initSlider('mm', michelin);
  initSlider('om', omakase);
  setTimeout(() => go('home'), 2000);
});
// 채팅방별 메시지 전송
function sendChatMsg(room) {
  const input = document.querySelector(`.chat-msg-input[data-room="${room}"]`);
  const body = document.getElementById('chatBody-' + room);
  if (!input || !body) return;
  const text = input.value.trim();
  if (!text) return;
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const row = document.createElement('div');
  row.className = 'msg-row mine';
  row.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${time}</div>`;
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
  input.value = '';
}

// 미식 기록 타이핑 전송 → 여권으로 이동
function submitTyping() {
  const ta = document.getElementById('recordTyping');
  if (!ta || !ta.value.trim()) { toast('내용을 입력해주세요'); return; }
  toast('미식 기록이 저장되었습니다 ✓');
  setTimeout(() => go('passport'), 800);
}

// ============================================================
// 미각 슬라이더 → 여권 레이더 차트 실시간 연동
// ============================================================

// 현재 미각 값 저장
const tasteValues = {
  '단맛': 2, '짠맛': 3, '매운맛': 1, '감칠맛': 4, '산미': 3, '쓴맛': 2
};

// 슬라이더 이벤트 등록
document.addEventListener('input', e => {
  if (e.target.classList.contains('taste-range')) {
    const taste = e.target.dataset.t;
    const val = parseInt(e.target.value);
    tasteValues[taste] = val;

    // 값 표시 업데이트
    const valEl = document.getElementById('val-' + taste);
    if (valEl) valEl.textContent = val;

    // 채우기 바 업데이트
    const fillEl = document.getElementById('fill-' + taste);
    if (fillEl) fillEl.style.width = (val / 5 * 100) + '%';

    // 여권 레이더 차트 실시간 업데이트
    updateRadarChart();
  }
});

// 레이더 차트 업데이트 (tasteValues 기반)
function updateRadarChart() {
  const order = ['단맛', '짠맛', '매운맛', '감칠맛', '산미', '쓴맛'];
  const R = 100, max = 5;

  function pt(angle, dist) {
    const r = angle * Math.PI / 180;
    return { x: Math.sin(r)*dist, y: -Math.cos(r)*dist };
  }

  const dp = document.getElementById('rData');
  if (dp) {
    dp.setAttribute('points', order.map((t, i) => {
      const p = pt(i * 60, (tasteValues[t] / max) * R);
      return p.x + ',' + p.y;
    }).join(' '));
  }

  const dg = document.getElementById('rDots');
  if (dg) {
    dg.innerHTML = '';
    order.forEach((t, i) => {
      const dist = (tasteValues[t] / max) * R;
      const p = pt(i * 60, dist);
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('class', 'rd');
      c.setAttribute('cx', p.x);
      c.setAttribute('cy', p.y);
      c.setAttribute('r', 3.5);
      dg.appendChild(c);
    });
  }
}

// 미식 기록 저장 → 여권으로 이동
function saveRecord() {
  // 슬라이더 값 여권 차트에 반영
  updateRadarChart();
  toast('미식 기록이 저장되었습니다 ✓');
  setTimeout(() => go('passport'), 800);
}
