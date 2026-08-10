/* ==========================================================================
   James Teeling — portfolio catalogue behaviour
   Vanilla, no build step. Data comes from data/portfolio-data.js.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HERO_INTERVAL = 8000;

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var byId = {};
  PROJECTS.forEach(function (p) { byId[p.id] = p; });

  var featured = FEATURED.map(function (id) { return byId[id]; }).filter(Boolean);

  var state = { filter: 'all', featIdx: 0, currentId: null };
  var heroTimer = null;
  var lastFocused = null;

  function icon(name, size) {
    return '<svg width="' + size + '" height="' + size + '" aria-hidden="true"><use href="#icon-' + name + '"/></svg>';
  }


  /* Poster art. Line art (SVG / transparent PNG) sits ON TOP of the project
     gradient; photographs sit UNDER a tinted version of it. Projects with no
     art fall back to the gradient alone. */
  function artBg(p) {
    if (!p.art) return p.bg;
    /* single quotes inside url(): these strings are also injected into a
       double-quoted style attribute on the poster markup */
    if (p.artType === 'photo') return (p.overlay || p.bg) + ", url('" + p.art + "')";
    return "url('" + p.art + "'), " + p.bg;
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------------ hero */

  var heroEl      = $('#hero');
  var heroArt     = $('#heroArt');
  var heroGlyph   = $('#heroGlyph');
  var heroKicker  = $('#heroKicker');
  var heroTitle   = $('#heroTitle');
  var heroBlurb   = $('#heroBlurb');
  var heroMetric  = $('#heroMetric');
  var heroRead    = $('#heroRead');
  var heroTicks   = $('#heroTicks');

  function renderHero() {
    var p = featured[state.featIdx];
    if (!p) return;
    heroArt.style.backgroundImage = artBg(p);
    heroArt.className = 'hero__art art-' + (p.artType || 'none');
    heroGlyph.textContent = p.artType === 'photo' ? '' : p.initial;
    heroKicker.textContent = p.kicker;
    heroTitle.textContent = p.title;
    heroBlurb.textContent = p.blurb;
    heroMetric.textContent = p.metric;
    heroRead.setAttribute('data-id', p.id);
    updateTicks();
  }

  function buildTicks() {
    heroTicks.innerHTML = featured.map(function (p, i) {
      return '<button type="button" class="tick" data-idx="' + i + '" role="tab"' +
             ' aria-selected="false" aria-label="Show ' + esc(p.title) + '">' +
             '<span class="tick__fill"></span></button>';
    }).join('');
  }

  /* Mutate the existing tick nodes rather than re-writing them: re-rendering
     would drop keyboard focus off whichever tick the user just activated. */
  function updateTicks() {
    $$('.tick', heroTicks).forEach(function (btn, i) {
      btn.classList.remove('is-active');
      btn.classList.toggle('is-done', i < state.featIdx);
      btn.setAttribute('aria-selected', String(i === state.featIdx));
    });
    var active = heroTicks.children[state.featIdx];
    if (active) {
      void active.offsetWidth;          /* force reflow so `fill` restarts */
      active.classList.add('is-active');
    }
  }

  function startHero() {
    stopHero();
    if (reduceMotion || featured.length < 2) return;
    heroTimer = setInterval(function () {
      state.featIdx = (state.featIdx + 1) % featured.length;
      renderHero();
    }, HERO_INTERVAL);
  }
  function stopHero() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }

  heroTicks.addEventListener('click', function (e) {
    var btn = e.target.closest('.tick');
    if (!btn) return;
    state.featIdx = Number(btn.getAttribute('data-idx'));
    renderHero();
    startHero();
  });

  heroRead.addEventListener('click', function () { openModal(heroRead.getAttribute('data-id')); });

  ['mouseenter', 'focusin'].forEach(function (ev) {
    heroEl.addEventListener(ev, function () { heroEl.classList.add('is-paused'); stopHero(); });
  });
  ['mouseleave', 'focusout'].forEach(function (ev) {
    heroEl.addEventListener(ev, function () {
      if (heroEl.contains(document.activeElement)) return;
      heroEl.classList.remove('is-paused');
      startHero();
    });
  });

  /* ---------------------------------------------------------------- shelves */

  var filtersEl = $('#filters');
  var shelvesEl = $('#shelves');

  function renderFilters() {
    var all = [{ key: 'all', label: 'All' }].concat(CATEGORIES);
    filtersEl.innerHTML = all.map(function (c) {
      return '<button type="button" class="filter" data-cat="' + c.key + '"' +
             ' aria-pressed="' + (state.filter === c.key) + '">' + esc(c.label) + '</button>';
    }).join('');
  }

  function cardMarkup(p) {
    return '' +
      '<button type="button" class="card" data-id="' + p.id + '" aria-label="Open case study: ' + esc(p.title) + '">' +
        '<span class="poster" style="background-image:' + artBg(p) + '">' +
          (p.artType === 'photo' ? '' :
            '<span class="poster__glyph' + (p.art ? ' is-behind-art' : '') + '" aria-hidden="true">' +
            esc(p.initial) + '</span>') +
          '<span class="poster__badge">' + esc(p.badge) + '</span>' +
          '<span class="poster__foot">' +
            '<span class="poster__title">' + esc(p.title) + '</span>' +
            '<span class="poster__kicker">' + esc(p.kicker) + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="card__preview">' +
          '<span class="card__blurb">' + esc(p.blurb) + '</span>' +
          '<span class="card__meta">' +
            '<span class="card__read">' + icon('play', 11) + ' Read</span>' +
            '<span class="card__metric">' + esc(p.metric) + '</span>' +
          '</span>' +
        '</span>' +
      '</button>';
  }

  function renderShelves() {
    var cats = CATEGORIES.filter(function (c) { return state.filter === 'all' || c.key === state.filter; });

    shelvesEl.innerHTML = cats.map(function (c) {
      var items = PROJECTS.filter(function (p) { return p.cat === c.key; });
      if (!items.length) return '';
      return '' +
        '<section class="shelf" aria-labelledby="shelf-' + c.key + '">' +
          '<div class="shelf__head">' +
            '<h3 class="shelf__title" id="shelf-' + c.key + '">' + esc(c.title) + '</h3>' +
            '<span class="shelf__count">' + items.length + (items.length === 1 ? ' build' : ' builds') + '</span>' +
            '<span class="shelf__spacer"></span>' +
            '<button type="button" class="scrub" data-dir="-1" data-track="track-' + c.key + '" aria-label="Scroll ' + esc(c.title) + ' left">' + icon('chevron-left', 15) + '</button>' +
            '<button type="button" class="scrub" data-dir="1" data-track="track-' + c.key + '" aria-label="Scroll ' + esc(c.title) + ' right">' + icon('chevron-right', 15) + '</button>' +
          '</div>' +
          '<div class="track" id="track-' + c.key + '">' + items.map(cardMarkup).join('') + '</div>' +
        '</section>';
    }).join('') || '<p class="shelf-empty">Nothing in that category yet.</p>';

    $$('.track').forEach(function (t) {
      updateScrubs(t);
      t.addEventListener('scroll', function () { updateScrubs(t); }, { passive: true });
    });
  }

  function updateScrubs(track) {
    var head = track.previousElementSibling;
    if (!head) return;
    var btns = $$('.scrub', head);
    var max = track.scrollWidth - track.clientWidth;
    var overflows = max > 1;
    /* A row that fits has nothing to scrub — hide the arrows rather than
       showing a permanently dead pair. */
    btns.forEach(function (b) { b.hidden = !overflows; });
    if (!overflows) return;
    if (btns[0]) btns[0].disabled = track.scrollLeft <= 1;
    if (btns[1]) btns[1].disabled = track.scrollLeft >= max - 1;
  }

  filtersEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter');
    if (!btn) return;
    state.filter = btn.getAttribute('data-cat');
    $$('.filter', filtersEl).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === state.filter));
    });
    renderShelves();
  });

  shelvesEl.addEventListener('click', function (e) {
    var scrub = e.target.closest('.scrub');
    if (scrub) {
      var track = document.getElementById(scrub.getAttribute('data-track'));
      if (track) {
        track.scrollBy({
          left: Number(scrub.getAttribute('data-dir')) * Math.round(track.clientWidth * 0.8),
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      }
      return;
    }
    var card = e.target.closest('.card');
    if (card) openModal(card.getAttribute('data-id'));
  });

  /* Keep a focused card in view when tabbing through a shelf. */
  shelvesEl.addEventListener('focusin', function (e) {
    var card = e.target.closest('.card');
    if (card && card.scrollIntoView) {
      card.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });

  /* ------------------------------------------------------------------ modal */

  var modal    = $('#modal');
  var panel    = $('#modalPanel');
  var mArt     = $('#modalArt');
  var mGlyph   = $('#modalGlyph');
  var mKicker  = $('#modalKicker');
  var mTitle   = $('#modalTitle');
  var mTags    = $('#modalTags');
  var mMetrics = $('#modalMetrics');
  var mGist    = $('#modalGist');
  var mSecs    = $('#modalSections');
  var mLinks   = $('#modalLinks');
  var upnext   = $('#upnext');

  function renderModal(p) {
    mArt.style.backgroundImage = artBg(p);
    mArt.className = 'modal__art art-' + (p.artType || 'none');
    mGlyph.textContent = p.artType === 'photo' ? '' : p.initial;
    mKicker.textContent = p.kicker;
    mTitle.textContent = p.title;

    mTags.innerHTML = p.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');

    mMetrics.innerHTML = p.metrics.map(function (m) {
      return '<div class="tile"><div class="tile__value">' + esc(m.value) + '</div>' +
             '<div class="tile__label">' + esc(m.label) + '</div></div>';
    }).join('');

    mGist.textContent = p.gist;

    mSecs.innerHTML = p.sections.map(function (s) {
      return '<div>' +
        '<p class="section-kicker">' + esc(s.kicker) + '</p>' +
        '<h3 class="section-head">' + esc(s.head) + '</h3>' +
        '<p class="section-body">' + esc(s.body) + '</p>' +
        (s.pull ? '<p class="pull">' + esc(s.pull) + '</p>' : '') +
      '</div>';
    }).join('');

    var links = '';
    if (p.href) {
      links += '<a class="btn-play" href="' + p.href + '">' + icon('play', 14) + ' Read the full case study</a>';
    }
    if (p.extra) {
      links += '<a class="btn-ghost" href="' + p.extra.url + '" target="_blank" rel="noopener noreferrer">' +
               esc(p.extra.label) + ' ' + icon('arrow-up-right', 14) + '</a>';
    }
    mLinks.innerHTML = links;

    var i = PROJECTS.indexOf(p);
    var nx = PROJECTS[(i + 1) % PROJECTS.length];
    $('#upnextPoster').style.backgroundImage = artBg(nx);
    $('#upnextPoster').className = 'upnext__poster art-' + (nx.artType || 'none');
    $('#upnextGlyph').textContent = nx.artType === 'photo' ? '' : nx.initial;
    $('#upnextTitle').textContent = nx.title;
    $('#upnextBlurb').textContent = nx.blurb;
    upnext.setAttribute('data-id', nx.id);
  }

  function openModal(id) {
    var p = byId[id];
    if (!p) return;
    if (!state.currentId) lastFocused = document.activeElement;
    state.currentId = id;
    renderModal(p);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
    stopHero();
    history.replaceState(null, '', '#/work/' + id);
    $('#modalClose').focus();
  }

  function closeModal() {
    if (!state.currentId) return;
    state.currentId = null;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    history.replaceState(null, '', location.pathname + location.search);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    if (!heroEl.matches(':hover')) startHero();
  }

  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  panel.addEventListener('click', function (e) { e.stopPropagation(); });

  upnext.addEventListener('click', function () {
    openModal(upnext.getAttribute('data-id'));
    modal.scrollTop = 0;
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key !== 'Tab') return;

    /* focus trap */
    var focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', panel)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------------------------------------------------- toolbelt / about / contact */

  function renderLists() {
    $('#skills').innerHTML = SKILLS.map(function (s) {
      return '<div class="skill">' +
        '<div class="skill__head"><span class="skill__name">' + esc(s.name) + '</span>' +
        '<span class="skill__note">' + esc(s.note) + '</span></div>' +
        '<div class="skill__track"><div class="skill__bar" data-pct="' + s.pct + '"></div></div>' +
      '</div>';
    }).join('');

    $('#tools').innerHTML = TOOLS.map(function (t) {
      return '<span class="tool-chip">' + esc(t) + '</span>';
    }).join('');

    $('#timeline').innerHTML = TIMELINE.map(function (e) {
      return '<div class="timeline__item">' +
        '<div class="timeline__dot"></div>' +
        '<div class="timeline__when">' + esc(e.when) + '</div>' +
        '<div class="timeline__what">' + esc(e.what) + '</div>' +
        '<div class="timeline__detail">' + esc(e.detail) + '</div>' +
      '</div>';
    }).join('');

    $('#facts').innerHTML = FACTS.map(function (f) {
      return '<span class="fact">' + esc(f) + '</span>';
    }).join('');
  }

  function animateSkills() {
    var bars = $$('.skill__bar');
    var fill = function () { bars.forEach(function (b) { b.style.width = b.getAttribute('data-pct') + '%'; }); };
    if (reduceMotion || !('IntersectionObserver' in window)) { fill(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { fill(); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe($('#toolbelt'));
  }

  /* ------------------------------------------------------------------- nav */

  var navToggle = $('#navToggle');
  var navLinks  = $('#navLinks');

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  function scrollSpy() {
    var sections = ['work', 'toolbelt', 'about', 'contact'];
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$('#navLinks a').forEach(function (a) {
          a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id));
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ------------------------------------------------------------------- boot */

  renderFilters();
  buildTicks();
  renderHero();
  renderShelves();
  renderLists();
  animateSkills();
  scrollSpy();
  startHero();

  var m = /^#\/work\/(.+)$/.exec(location.hash);
  if (m && byId[m[1]]) openModal(m[1]);

  window.addEventListener('resize', function () { $$('.track').forEach(updateScrubs); });
})();
