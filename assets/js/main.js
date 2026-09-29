// 株式会社あかがね工業（サンプルサイト）— 画面のふるまい
// 1. ヘッダーの色（スクロールで白に）
// 2. スマホのメニュー開閉
// 3. スクロールで各ブロックをふわっと表示
// 4. 数字のカウントアップ
// 5. お問い合わせフォーム（サンプルなので送信しない）

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. ヘッダー
  var header = document.getElementById('header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. メニュー
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var closeMenu = function () {
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'メニューを開く');
  };
  menuBtn.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // 3. ふわっと表示
  //    画面に入る少し手前（下 160px）で出し始める。何かの理由で観測が働かなくても、
  //    5秒たったら全部出す（投影中に白いまま残らないための保険）。
  var reveals = document.querySelectorAll('.reveal');
  var showAll = function () {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  };
  if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px 160px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(function () { showAll(); io.disconnect(); }, 5000);
  }

  // 4. 数字のカウントアップ
  var counters = document.querySelectorAll('[data-count]');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) { el.textContent = target.toLocaleString('ja-JP'); return; }
    var duration = 1400;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ja-JP');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  // 5. フォーム（サンプル）
  var form = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  var toastTimer;
  var showToast = function (msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 3600);
  };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var missing = Array.prototype.filter.call(form.querySelectorAll('[required]'), function (f) {
      return !f.value.trim();
    });
    if (missing.length) {
      missing[0].focus();
      showToast('必須の項目が空いています。ご入力ください。');
      return;
    }
    showToast('サンプルサイトのため、送信はされません。ご入力ありがとうございました。');
    form.reset();
  });
})();
