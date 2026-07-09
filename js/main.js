/* ── 3. 카테고리 버튼 (전역) ── */
function scrollToSection(name) {
	var el = document.getElementById('section-' + name);
	if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
/* ── 1. 헤더 스크롤 ── */
var logo   = document.querySelector('.logo-wrap');
var bg     = document.querySelector('.header-bg');
var navBox = document.querySelector('.nav-box');
window.addEventListener('scroll', function() {
	var s = window.scrollY;
	logo.classList.toggle('shrink', s > 100);   bg.classList.toggle('shrink', s > 100);
	navBox.classList.toggle('show', s > 700);
	logo.classList.toggle('hide', s > 1200);    bg.classList.toggle('hide', s > 1200);
});

/* ── 2. 이력서 접기/펼치기 ── */
var toggleBar   = document.getElementById('toggleBar');
var resumeBlock = document.getElementById('resumeBlock');
function toggleResume() { resumeBlock.classList.toggle('collapsed'); toggleBar.classList.toggle('up'); }
toggleBar.addEventListener('click', toggleResume);
toggleBar.addEventListener('keydown', function(e) {
	if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleResume(); }
});

/* ── 4. 툴 아이콘 ── */
var TOOL_MAP = {
	'Illustrator':'Illustrator', 'Photoshop':'Photoshop', 'Figma':'Figma',
	'Code':'HTML / CSS / JS', 'ChatGPT':'ChatGPT', 'GSAP':'GSAP', 'XD':'Adobe XD'
};
function renderTools(id, str) {
	var box = document.getElementById(id);
	if (!box || !str) return;
	box.classList.add('fade-out');
	setTimeout(function() {
		var html = '';
		str.split(',').forEach(function(t) {
			var label = TOOL_MAP[t.trim()];
			if (label) html += '<div class="tool-icon">' + label + '</div>';
		});
		box.innerHTML = html;
		box.classList.remove('fade-out');
	}, 150);
}
renderTools('tools-W', 'Illustrator,Code,ChatGPT');
var initCard = document.querySelector('#list-W .project-card.active');
if (initCard) { var wb = document.getElementById('btnWebsite-W'); if (wb) { var hasCode = (initCard.getAttribute('data-tools') || '').indexOf('Code') !== -1; wb.classList.toggle('is-hidden', !hasCode); } }

/* ── 5. 텍스트 페이드 교체 ── */
function fadeText(ids, vals) {
	ids.forEach(function(id) { var el = document.getElementById(id); if (el) el.classList.add('fade-out'); });
	setTimeout(function() {
		ids.forEach(function(id, i) {
			var el = document.getElementById(id);
			if (!el) return;
			el.textContent = vals[i] || '';
			el.classList.remove('fade-out');
		});
	}, 200);
}

/* ── 6. 섹션 W — iframe ── */
var PC_W = 1750, MOB_W = 390;
var currentCardW = document.querySelector('#list-W .project-card');
function setScreenMode(mode, url) {
	var pcScr = document.getElementById('pcScreen-W'),   mobScr = document.getElementById('mobileScreen-W');
	var pcLdr = document.getElementById('pcLoader-W'),   mobLdr = document.getElementById('mobileLoader-W');
	var pcImg = document.getElementById('pcImg-W'),      mobImg = document.getElementById('mobileImg-W');
	var old1 = pcScr ? pcScr.querySelector('iframe') : null;
	var old2 = mobScr ? mobScr.querySelector('iframe') : null;
	if (old1) old1.remove();  if (old2) old2.remove();
	if (mode === 'iframe-web' && url) {
		if (pcImg) pcImg.classList.add('is-hidden');
		if (pcLdr) pcLdr.classList.remove('hidden');
		var scale = pcScr.offsetWidth / PC_W;
		var f = document.createElement('iframe');
		f.src = url; f.style.width = PC_W + 'px'; f.style.height = Math.ceil(pcScr.offsetHeight / scale) + 'px';
		f.style.transform = 'scale(' + scale + ')'; f.setAttribute('allowfullscreen','');
		f.onload = function() { if (pcLdr) pcLdr.classList.add('hidden'); };
		pcScr.appendChild(f);
	} else if (mode === 'iframe-mobile' && url) {
		if (mobImg) mobImg.classList.add('is-hidden');
		if (mobLdr) mobLdr.classList.remove('hidden');
		var s2 = mobScr.offsetWidth / MOB_W;
		var f2 = document.createElement('iframe');
		f2.src = url; f2.style.width = MOB_W + 'px'; f2.style.height = Math.ceil(mobScr.offsetHeight / s2) + 'px';
		f2.style.transform = 'scale(' + s2 + ')'; f2.setAttribute('allowfullscreen','');
		f2.onload = function() { if (mobLdr) mobLdr.classList.add('hidden'); };
		mobScr.appendChild(f2);
	} else {
		if (pcLdr) pcLdr.classList.add('hidden');    if (mobLdr) mobLdr.classList.add('hidden');
		if (pcImg) pcImg.classList.remove('is-hidden'); if (mobImg) mobImg.classList.remove('is-hidden');
	}
}

/* ── 7. 섹션 W — 카드 선택 ── */
function changeScreenW(card) {
	currentCardW = card;
	var mobileOnly = card.getAttribute('data-mobile-only') === 'true';
	var pc = document.getElementById('pc-W'), mob = document.getElementById('mobile-W');
	var toggle = document.getElementById('viewToggle-W');
	var pcImgEl = document.getElementById('pcImg-W'), mobImgEl = document.getElementById('mobileImg-W');
	var btns = toggle ? toggle.querySelectorAll('.view-btn') : [];
	var planBtn = toggle ? toggle.querySelector('.btn-plan') : null;
	var websiteBtn = document.getElementById('btnWebsite-W');
	var liveUrl = card.getAttribute('data-live-url');
	var isTeam = card.getAttribute('data-team') === 'true';
	setScreenMode('img');
	renderTools('tools-W', card.getAttribute('data-tools'));
	var planPath = card.getAttribute('data-plan');
	if (planBtn) { planBtn.classList.toggle('is-hidden', !planPath); planBtn.setAttribute('data-plan', planPath || ''); }
	var hasCode = (card.getAttribute('data-tools') || '').indexOf('Code') !== -1;
	if (websiteBtn) {
		websiteBtn.classList.toggle('is-hidden', !hasCode);
		websiteBtn.onclick = function() { if (liveUrl) window.open(liveUrl, '_blank'); };
	}
	if (mobileOnly) {
		pc.classList.add('is-hidden');  mob.classList.add('visible');
		btns.forEach(function(b) {
			if (b.getAttribute('data-view') === 'app') { b.classList.remove('is-hidden'); b.classList.add('active'); }
			else if (!b.classList.contains('btn-plan') && !b.classList.contains('btn-website')) { b.classList.add('is-hidden'); b.classList.remove('active'); }
		});
		if (mobImgEl) mobImgEl.src = card.getAttribute('data-mobile-img');
	} else {
		pc.classList.remove('is-hidden');  mob.classList.remove('visible');
		btns.forEach(function(b) { if (!b.classList.contains('btn-plan') && !b.classList.contains('btn-website')) b.classList.remove('is-hidden','active'); });
		var webBtn = toggle ? toggle.querySelector('[data-view="web"]') : null;
		if (webBtn) webBtn.classList.add('active');
		if (pcImgEl)  pcImgEl.src  = card.getAttribute('data-pc-img');
		if (mobImgEl) mobImgEl.src = card.getAttribute('data-mobile-img');
		if (liveUrl) setTimeout(function() { setScreenMode('iframe-web', liveUrl); }, 50);
	}
	var titleText = card.getAttribute('data-title');
	if (isTeam) titleText += '<span class="team-badge">팀 프로젝트</span>';
	fadeText(['desc-W','period-W'],
		[card.getAttribute('data-desc'), card.getAttribute('data-period')]);
	var titleEl = document.getElementById('title-W');
	if (titleEl) { titleEl.classList.add('fade-out'); setTimeout(function() { titleEl.innerHTML = titleText; titleEl.classList.remove('fade-out'); }, 200); }
}

/* ── 8. 카드 목록 — 휠 & 클릭 ── */
var CARD_STEP = 210;
(function() {
	var list = document.getElementById('list-W');
	if (!list) return;
	var cards = list.querySelectorAll('.project-card'), total = cards.length, idx = 0, busy = false;
	function pick(i) {
		if (i < 0) i = 0;  if (i > total - 1) i = total - 1;
		idx = i;
		list.scrollTo({ top: idx * CARD_STEP, behavior: 'smooth' });
		cards.forEach(function(c, j) { c.classList.toggle('active', j === idx); if (j === idx) changeScreenW(c); });
	}
	list.addEventListener('wheel', function(e) {
		e.preventDefault();
		if (busy) return; busy = true;
		pick(idx + (e.deltaY > 0 ? 1 : -1));
		setTimeout(function() { busy = false; }, 400);
	}, { passive: false });
	cards.forEach(function(card, i) { card.addEventListener('click', function() { pick(i); }); });
})();

/* ── 9. View Web / View App / 기획서 ── */
document.querySelectorAll('.view-btn').forEach(function(btn) {
	btn.addEventListener('click', function() {
		var section = btn.getAttribute('data-section'), view = btn.getAttribute('data-view'), plan = btn.getAttribute('data-plan');
		if (plan) { window.open(plan, '_blank'); return; }
		if (!view || !section) return;
		document.querySelectorAll('.view-btn[data-section="' + section + '"][data-view]')
			.forEach(function(b) { b.classList.remove('active'); });
		btn.classList.add('active');
		var pc = document.getElementById('pc-' + section), mob = document.getElementById('mobile-' + section);
		var liveUrl = currentCardW ? currentCardW.getAttribute('data-live-url') : null;
		if (view === 'app') {
			setScreenMode('img'); pc.classList.add('is-hidden'); mob.classList.add('visible');
			if (liveUrl) setScreenMode('iframe-mobile', liveUrl);
		} else {
			pc.classList.remove('is-hidden'); mob.classList.remove('visible');
			if (liveUrl) setScreenMode('iframe-web', liveUrl); else setScreenMode('img');
		}
	});
});

/* ── 10. 섹션 A — 앱 캐러셀 ── */
var APP_DATA = [
	{	screens: ['images/onbom- (1).png','images/onbom- (2).png','images/onbom- (3).png','images/onbom- (4).png','images/onbom- (5).png','images/onbom- (7).png','images/onbom- (8).png','images/onbom- (9).png','images/onbom- (10).png','images/onbom- (11).png','images/onbom- (12).png','images/onbom- (13).png'],
		tools:'Illustrator,Figma', title:'온봄', tagline:'세상의 모든 온기를 당신의 아이에게',
		desc:'산책 경로 추적, 동반 가능 장소 탐색, 건강 기록 등 반려동물을 위한 종합 케어 앱 "온봄"의 UI/UX 기획 프로젝트입니다. 체계적인 알림과 맞춤형 케어 다이어리를 통해 보호자의 관리 부담을 줄이고, 보다 세심한 돌봄을 지원하는 직관적인 경험을 설계했습니다.',
		period:'2026.03 — 2026.03 · 9일 · 기여도100%', plan:'pdf/plan-onbom.pdf',
		figma:'https://www.figma.com/proto/u0AMR61Ko2Cpsy7vVJsPDY/%EC%98%A8%EB%B4%84-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98?node-id=1-2059&p=f&t=bVCk7MR28El86Ipa-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2059'
	},
	{	screens: ['images/yakssok_ (1).png','images/yakssok_ (2).png','images/yakssok_ (3).png','images/yakssok_ (4).png','images/yakssok_ (5).png','images/yakssok_ (6).png','images/yakssok_ (7).png','images/yakssok_ (8).png','images/yakssok_ (9).png','images/yakssok_ (10).png','images/yakssok_ (11).png','images/yakssok_ (12).png','images/yakssok_ (13).png','images/yakssok_ (14).png','images/yakssok_ (15).png','images/yakssok_ (16).png','images/yakssok_ (17).png','images/yakssok_ (18).png','images/yakssok_ (19).png','images/yakssok_ (20).png','images/yakssok_ (21).png','images/yakssok_ (22).png','images/yakssok_ (23).png','images/yakssok_ (24).png'],
		tools:'Illustrator,Figma', title:'약쏙', tagline:'건강과 함께하는 작은 기적의 약속', team:true,
		desc:'가족의 복약 일정을 공유하고 약품 간 상성을 안전하게 검사할 수 있는 맞춤형 복약 관리 앱 "약쏙"의 UI/UX 프로젝트입니다. 맞춤형 알람 설정부터 주변 약국 픽업 및 온라인 구매까지 약품 이용의 전 과정을 하나의 앱으로 통합하여 사용자의 편의성을 극대화했습니다.',
		period:'2026.05 — 2026.05 · 12일 · 기여도70%', plan:'pdf/plan-yakssok.pdf',
		figma:'https://www.figma.com/proto/UdYnXE2Iz0YXGDkzLbGUIR/%EC%95%BD%EC%8F%99?node-id=12-7&viewport=877%2C-35%2C0.06&t=x4dbVwg6b7qWcgey-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=12%3A7&show-proto-sidebar=1&page-id=0%3A1'
	},
	{	screens: ['images/latte_ (1).png','images/latte_ (2).png','images/latte_ (3).png','images/latte_ (4).png','images/latte_ (5).png','images/latte_ (6).png','images/latte_ (7).png','images/latte_ (8).png','images/latte_ (9).png','images/latte_ (10).png','images/latte_ (11).png','images/latte_ (12).png','images/latte_ (13).png','images/latte_ (14).png','images/latte_ (15).png','images/latte_ (16).png','images/latte_ (17).png','images/latte_ (18).png'],
		tools:'Illustrator,Figma', title:'라떼는 말이야', tagline:'',
		desc:'아재개그를 즐기고 공유할 수 있는 커뮤니티 및 퀴즈 앱 "라떼는 말이야"의 UI/UX 기획 프로젝트입니다. 공감대 형성, 타임어택 퀴즈, 1:1 개그 배틀, 6각형 능력치 시스템 등 재치 있는 기능들로 설계했습니다.',
		period:'2026.05 — 2026.06 · 17일 · 기여도100%', plan:'pdf/plan-latte.pdf',
		figma:'https://www.figma.com/proto/ZUNzA2gbaiW066J0bJMhkF/%EB%9D%BC%EB%96%BC%EB%8A%94%EB%A7%90%EC%9D%B4%EB%8B%A4--%EB%B3%B5%EC%82%AC-?node-id=236-3013&viewport=-350%2C-4%2C0.14&t=dj1XclRVsANKWTVW-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=236%3A3013&show-proto-sidebar=1&page-id=0%3A1'
	}
];
var appIdx = 0, screenIdx = 0;
var appScreenImg = document.getElementById('appScreenImg');
var phoneCounter = document.getElementById('phoneCounter');
var appDots      = document.getElementById('appDots').querySelectorAll('.app-dot');
var appPlanBtn   = document.getElementById('appPlanBtn');
var appViewBtn   = document.getElementById('appViewBtn');
function showPhoneScreen(idx) {
	var data = APP_DATA[appIdx], len = data.screens.length;
	if (idx < 0) idx = len - 1;  if (idx >= len) idx = 0;
	screenIdx = idx;
	appScreenImg.classList.add('fade-out');
	setTimeout(function() { appScreenImg.src = data.screens[screenIdx]; appScreenImg.classList.remove('fade-out'); }, 150);
	phoneCounter.classList.toggle('is-hidden', len <= 1);
	phoneCounter.textContent = (screenIdx + 1) + ' / ' + len;
}
document.getElementById('phoneTapLeft').addEventListener('click', function() { showPhoneScreen(screenIdx - 1); });
document.getElementById('phoneTapRight').addEventListener('click', function() { showPhoneScreen(screenIdx + 1); });
function showApp(i) {
	if (i < 0) i = APP_DATA.length - 1;
	if (i >= APP_DATA.length) i = 0;
	appIdx = i; screenIdx = 0;
	var data = APP_DATA[i];
	showPhoneScreen(0);
	appDots.forEach(function(dot, j) { dot.classList.toggle('active', j === i); });
	renderTools('tools-A', data.tools);
	if (appPlanBtn) appPlanBtn.onclick = function() { window.open(data.plan, '_blank'); };
	if (appViewBtn) appViewBtn.onclick = function() { window.open(data.figma, '_blank'); };
	var tl = document.getElementById('tagline-A');
	if (tl) tl.style.visibility = data.tagline ? 'visible' : 'hidden';
	var appTitleText = data.title;
	var titleLeftEl = document.getElementById('titleLeftA');
	if (titleLeftEl) titleLeftEl.innerHTML = data.team ? '<span class="team-badge">팀 프로젝트</span>' : '';
	fadeText(['tagline-A','desc-A','period-A'], [data.tagline, data.desc, data.period]);
	var titleAEl = document.getElementById('title-A');
	if (titleAEl) { titleAEl.classList.add('fade-out'); setTimeout(function() { titleAEl.innerHTML = appTitleText; titleAEl.classList.remove('fade-out'); }, 200); }
}
document.getElementById('appPrev').addEventListener('click', function() { showApp(appIdx - 1); });
document.getElementById('appNext').addEventListener('click', function() { showApp(appIdx + 1); });
appDots.forEach(function(dot, i) { dot.addEventListener('click', function() { showApp(i); }); });
showApp(0);


/* ══════════════════════════════════════
   11. 모달 — 갤러리 카드 클릭 시 상세 보기
       mode="flip" : 좌우 넘기기 (동화책 등)
       mode="all"  : 이미지 전부 한번에 표시
══════════════════════════════════════ */
var modal       = document.getElementById('modal');
var modalFlip   = document.getElementById('modalFlipImg');
var modalAll    = document.getElementById('modalAllWrap');
var modalScroll = document.getElementById('modalScrollWrap');
var modalClose  = document.getElementById('modalClose');
var modalPrev   = document.getElementById('modalPrev');
var modalNext   = document.getElementById('modalNext');
var modalCnt    = document.getElementById('modalCounter');
var mImages = [], mIdx = 0, mMode = 'flip', mPages = [], mGroup = 1;

function hideAllModalPanels() {
	modalFlip.classList.add('is-hidden');
	modalAll.classList.add('is-hidden');
	modalScroll.classList.add('is-hidden');
}

/* 모달 열기 */
function openModal(images, mode, group) {
	mImages = images;  mMode = mode;  mIdx = 0;  mGroup = group || 1;
	hideAllModalPanels();

	if (mMode === 'scroll') {
		/* scroll 모드: 큰 이미지 스크롤 */
		modalScroll.classList.remove('is-hidden');
		modalPrev.classList.add('is-hidden');
		modalNext.classList.add('is-hidden');
		modalCnt.classList.add('is-hidden');
		modalScroll.innerHTML = '<img src="' + mImages[0] + '" alt="">';
		modalScroll.scrollTop = 0;

	} else if (mMode === 'flip-all') {
		/* flip-all 모드: N장씩 묶어서 페이지 넘기기 */
		mPages = [];
		for (var i = 0; i < mImages.length; i += mGroup) {
			mPages.push(mImages.slice(i, i + mGroup));
		}
		modalAll.classList.remove('is-hidden');
		modalPrev.classList.toggle('is-hidden', mPages.length <= 1);
		modalNext.classList.toggle('is-hidden', mPages.length <= 1);
		modalCnt.classList.toggle('is-hidden', mPages.length <= 1);
		showModalPage(0);

	} else if (mMode === 'all') {
		/* all 모드: 이미지 전부 가로 한 줄 */
		modalAll.classList.remove('is-hidden');
		modalPrev.classList.add('is-hidden');
		modalNext.classList.add('is-hidden');
		modalCnt.classList.add('is-hidden');
		modalAll.className = 'modal-all-wrap';
		var html = '';
		mImages.forEach(function(src) { html += '<img src="' + src + '" alt="">'; });
		modalAll.innerHTML = html;

	} else {
		/* flip 모드: 1장씩 넘기기 */
		modalFlip.classList.remove('is-hidden');
		modalPrev.classList.toggle('is-hidden', mImages.length <= 1);
		modalNext.classList.toggle('is-hidden', mImages.length <= 1);
		modalCnt.classList.toggle('is-hidden', mImages.length <= 1);
		showModalImg(0);
	}
	modal.classList.remove('is-hidden');
	requestAnimationFrame(function() { modal.classList.add('show'); });
	document.body.style.overflow = 'hidden';
}

/* 모달 닫기 */
function closeModal() {
	modal.classList.remove('show');
	setTimeout(function() { modal.classList.add('is-hidden'); }, 300);
	document.body.style.overflow = '';
}

/* flip 모드 이미지 표시 */
function showModalImg(idx) {
	if (idx < 0) idx = mImages.length - 1;
	if (idx >= mImages.length) idx = 0;
	mIdx = idx;
	modalFlip.style.opacity = '0';
	setTimeout(function() {
		modalFlip.src = mImages[mIdx];
		modalFlip.style.opacity = '1';
	}, 120);
	modalCnt.textContent = (mIdx + 1) + ' / ' + mImages.length;
}

/* flip-all 모드 페이지 표시 */
function showModalPage(idx) {
	if (idx < 0) idx = mPages.length - 1;
	if (idx >= mPages.length) idx = 0;
	mIdx = idx;
	modalAll.className = 'modal-all-wrap';
	modalAll.style.opacity = '0';
	setTimeout(function() {
		var html = '';
		mPages[mIdx].forEach(function(src) { html += '<img src="' + src + '" alt="">'; });
		modalAll.innerHTML = html;
		modalAll.style.opacity = '1';
	}, 120);
	modalCnt.textContent = (mIdx + 1) + ' / ' + mPages.length;
}

/* 모달 이벤트 */
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
modalPrev.addEventListener('click', function() {
	if (mMode === 'flip-all') showModalPage(mIdx - 1);
	else showModalImg(mIdx - 1);
});
modalNext.addEventListener('click', function() {
	if (mMode === 'flip-all') showModalPage(mIdx + 1);
	else showModalImg(mIdx + 1);
});

/* 키보드: ← → ESC */
document.addEventListener('keydown', function(e) {
	if (modal.classList.contains('is-hidden')) return;
	if (e.key === 'Escape') closeModal();
	if (mMode === 'flip') {
		if (e.key === 'ArrowLeft')  showModalImg(mIdx - 1);
		if (e.key === 'ArrowRight') showModalImg(mIdx + 1);
	} else if (mMode === 'flip-all') {
		if (e.key === 'ArrowLeft')  showModalPage(mIdx - 1);
		if (e.key === 'ArrowRight') showModalPage(mIdx + 1);
	}
});

/* 갤러리 카드 클릭 → 모달 열기 */
document.querySelectorAll('.gallery-card[data-images]').forEach(function(card) {
	card.addEventListener('click', function() {
		var raw = card.getAttribute('data-images');
		if (!raw) return;
		var images = raw.split(',').map(function(s) { return s.trim(); }).filter(function(s) { return s; });
		if (images.length === 0) return;
		var mode = card.getAttribute('data-mode') || 'flip';
		var group = parseInt(card.getAttribute('data-group')) || 1;
		openModal(images, mode, group);
	});
});
/* ── 12. 이메일 클립보드 복사 ── */
var copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
	var toast = document.createElement('span');
	toast.className = 'copy-toast';
	toast.textContent = '복사됨!';
	copyBtn.appendChild(toast);
	copyBtn.addEventListener('click', function() {
		navigator.clipboard.writeText('a_3108@naver.com').then(function() {
			toast.classList.add('show');
			setTimeout(function() { toast.classList.remove('show'); }, 1500);
		});
	});
}
}); /* end DOMContentLoaded */