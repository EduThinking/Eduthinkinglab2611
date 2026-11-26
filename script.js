/* ==========================================================================
   에듀씽킹연구소 — EDUTHINKING LAB
   Header state · mobile nav · section highlight · reveal · email copy · to-top
   ========================================================================== */

/* --------------------------------------------------------------------------
   연락처 설정 — 공식 채널이 생기면 channels에 추가하면 푸터/문의 영역에 반영됩니다.
     { label: '인스타그램', url: 'https://instagram.com/eduthinking' }
   -------------------------------------------------------------------------- */
const SITE_CONTACT = {
  email: 'joeun0926@gmail.com',
  channels: []
};

const SITE = (() => {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('primaryNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const floatTop = document.getElementById('floatTop');
  const toast = document.getElementById('toast');

  /* ---------- Mobile navigation ---------- */
  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
    document.body.classList.remove('nav-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', '메뉴 닫기');
    document.body.classList.add('nav-open');
  };

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) closeNav();
    });
  }

  /* ---------- Header state + section highlight + to-top ---------- */
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      return el ? { el, link } : null;
    })
    .filter(Boolean);

  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || 0;

    if (header) header.classList.toggle('is-scrolled', y > 8);

    // 현재 보고 있는 섹션 표시
    let currentId = '';
    sections.forEach(({ el }) => {
      if (el.getBoundingClientRect().top <= 160) currentId = el.id;
    });

    sections.forEach(({ el, link }) => {
      const isActive = el.id === currentId;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (floatTop) {
      const show = y > 640;
      if (show && floatTop.hidden) {
        floatTop.hidden = false;
        window.requestAnimationFrame(() => floatTop.classList.add('is-visible'));
      } else if (!show && !floatTop.hidden) {
        floatTop.classList.remove('is-visible');
        window.setTimeout(() => {
          if (window.scrollY <= 640) floatTop.hidden = true;
        }, 320);
      }
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  if (floatTop) {
    floatTop.addEventListener('click', () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = Array.from(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.children).filter((child) =>
        child.classList.contains('reveal')
      );
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = Math.min(index, 3) * 90 + 'ms';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contact: config -> page ---------- */
  document.querySelectorAll('[data-contact-email]').forEach((el) => {
    el.setAttribute('href', 'mailto:' + SITE_CONTACT.email);
    const textEl = el.querySelector('[data-contact-email-text]');
    if (textEl) {
      textEl.textContent = SITE_CONTACT.email;
    } else if (el.tagName !== 'A') {
      el.textContent = SITE_CONTACT.email;
    }
  });

  /* ---------- Copy email ---------- */
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };

  const copyEmailButton = document.getElementById('copyEmail');

  if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
      const email = SITE_CONTACT.email;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const helper = document.createElement('textarea');
          helper.value = email;
          helper.setAttribute('readonly', '');
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();
          document.execCommand('copy');
          document.body.removeChild(helper);
        }
        showToast('메일 주소를 복사했습니다');
      } catch (error) {
        showToast('메일 주소를 직접 복사해 주세요: ' + email);
      }
    });
  }

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  return { closeNav, showToast };
})();
