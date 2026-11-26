/* ==========================================================================
   에듀씽킹연구소 — EDUTHINKING LAB
   Interactions: mobile nav, scroll state, reveal, copy email, contact config
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. 연락처 설정
   공식 연락처·채널이 생기면 이 객체만 수정하면 페이지 전체에 반영됩니다.
   channels 예시:
     { label: '인스타그램', url: 'https://instagram.com/eduthinking' }
   -------------------------------------------------------------------------- */
const SITE_CONTACT = {
  email: 'joeun0926@gmail.com',
  channels: []
};

const SITE = (() => {
  const html = document.documentElement;
  html.classList.add('js');

  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('primaryNav');
  const navToggle = document.getElementById('navToggle');
  const progress = document.getElementById('scrollProgress');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const toast = document.getElementById('toast');

  /* ---------- Mobile navigation ---------- */
  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    nav.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', '메뉴 닫기');
    document.body.style.overflow = 'hidden';
  };

  if (navToggle && nav) {
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

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) closeNav();
    });
  }

  /* ---------- Header state + scroll progress ---------- */
  const sections = [
    { id: 'philosophy', link: navLinks[0] },
    { id: 'services', link: navLinks[1] },
    { id: 'difference', link: navLinks[2] },
    { id: 'audience', link: navLinks[3] },
    { id: 'contact', link: null }
  ];

  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || 0;

    if (header) {
      header.classList.toggle('is-scrolled', y > 12);
    }

    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(y / docHeight, 1) : 0;
      progress.style.width = (ratio * 100).toFixed(2) + '%';
    }

    let currentId = '';
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) currentId = id;
    });

    sections.forEach(({ id, link }) => {
      if (!link) return;
      const isActive = id === currentId;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

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

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = Array.from(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window && revealTargets.length) {
    // 같은 그룹 안에서는 순차적으로 나타나도록 지연을 준다.
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contact: config -> page ---------- */
  document.querySelectorAll('[data-contact-email]').forEach((el) => {
    el.setAttribute('href', 'mailto:' + SITE_CONTACT.email);
    if (el.hasAttribute('data-contact-email-text') || el.tagName !== 'A') {
      el.textContent = SITE_CONTACT.email;
    }
  });

  const channelList = document.querySelector('[data-contact-channels]');
  if (channelList && Array.isArray(SITE_CONTACT.channels) && SITE_CONTACT.channels.length) {
    channelList.innerHTML = '';
    SITE_CONTACT.channels.forEach(({ label, url }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.textContent = label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      channelList.appendChild(li);
    });
    channelList.hidden = false;
  }

  /* ---------- Copy email ---------- */
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
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
