import { animate } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

export const initMegaNav = () => {
  const menuTriggers = document.querySelectorAll('[data-menu-trigger]');
  const dropdownGroups = document.querySelectorAll('[data-menu]');
  const dropdownWrapper = document.querySelector('.navigation-dropdown-wrapper');
  const navigationParent = document.querySelector('.navigation-parent');
  const navigationMenuWrapper = document.querySelector('.navigation-menu-wrapper:not(.mobile)');
  const navigationLogo = document.querySelector('.navigation-logo');
  const navigationCta = document.querySelector('.navigation-cta');
  const navLinkWrappers = document.querySelectorAll('.navigation-link-wrapper');

  let activeTrigger = null;
  let closeTimeout = null;
  let isOpen = false;
  let previousDropdown = null;
  const CLOSE_DELAY = 25;

  function isCtaWrapper(wrapper) {
    return navigationCta && wrapper.contains(navigationCta);
  }

  function applyHoverStyles(el) {
    if (!el) return;
    el.style.backgroundColor = '#fad201';
    el.style.opacity = '1';
    const text = el.querySelector('.nav-item-text');
    if (text) text.style.color = '#1b1b1b';
  }

  function removeHoverStyles(el) {
    if (!el) return;
    el.style.backgroundColor = '';
    el.style.opacity = '';
    const text = el.querySelector('.nav-item-text');
    if (text) text.style.color = '';
  }

  function muteInactiveNavItems(activeWrapper) {
    navLinkWrappers.forEach(wrapper => {
      const keep = wrapper === activeWrapper || isCtaWrapper(wrapper);
      wrapper.style.opacity = keep ? '1' : '0.2';
    });
  }

  function unmuteAllNavItems() {
    navLinkWrappers.forEach(wrapper => { wrapper.style.opacity = '1'; });
    if (navigationCta) navigationCta.style.opacity = '1';
  }

  function removeAllHoverStyles() {
    document.querySelectorAll('.navigation-menu-item').forEach(item => removeHoverStyles(item));
    unmuteAllNavItems();
  }

  function clearCloseTimeout() {
    if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
  }

  function scheduleClose(checkEls = []) {
    if (window.isHamburgerMenuOpen || !isOpen) return;
    if (closeTimeout) return;
    closeTimeout = setTimeout(() => {
      const hovering = checkEls.some(el => el?.matches(':hover'));
      if (!hovering) hideDropdowns();
    }, CLOSE_DELAY);
  }

  function showDropdown(menuName, trigger) {
    const dropdown = document.querySelector(`[data-menu="${menuName}"]`);
    if (!dropdown) return;

    if (dropdownWrapper && !isOpen) {
      dropdownWrapper.style.display = 'block';
      isOpen = true;
    }

    dropdownGroups.forEach(g => { g.style.display = g === dropdown ? 'block' : 'none'; });

    const slideFrom = (() => {
      if (!previousDropdown || previousDropdown === dropdown) return -20;
      const prevIdx = Array.from(dropdownGroups).indexOf(previousDropdown);
      const curIdx = Array.from(dropdownGroups).indexOf(dropdown);
      return prevIdx < curIdx ? -20 : 20;
    })();

    dropdown.querySelectorAll('.navigation-dropdown-link').forEach(section => {
      animate(section, { x: [slideFrom, 0], opacity: [0, 1] }, { duration: 0.2, easing: 'ease-out' });
    });

    activeTrigger = trigger;
    previousDropdown = dropdown;
  }

  function hideDropdowns(force = false) {
    if (window.isHamburgerMenuOpen && !force) return;
    dropdownGroups.forEach(g => { g.style.display = 'none'; });
    if (dropdownWrapper && (force || isOpen)) {
      dropdownWrapper.style.display = 'none';
      isOpen = false;
    }
    activeTrigger = null;
    previousDropdown = null;
    removeAllHoverStyles();
  }

  // Trigger hover → open dropdown
  menuTriggers.forEach(trigger => {
    const menuName = trigger.getAttribute('data-menu-trigger');
    const wrapper = trigger.closest('.navigation-link-wrapper');
    const menuItem = wrapper?.querySelector('.navigation-menu-item') || trigger;
    menuItem.addEventListener('mouseenter', () => {
      clearCloseTimeout();
      removeAllHoverStyles();
      showDropdown(menuName, trigger);
      applyHoverStyles(menuItem);
      muteInactiveNavItems(wrapper);
    });
  });

  // Non-trigger nav items
  document.querySelectorAll('.navigation-link-wrapper').forEach(wrapper => {
    if (wrapper.querySelector('[data-menu-trigger]')) return;
    const menuItem = wrapper.querySelector('.navigation-menu-item');
    if (!menuItem) return;
    menuItem.addEventListener('mouseenter', () => {
      clearCloseTimeout();
      if (!window.isHamburgerMenuOpen) hideDropdowns();
      applyHoverStyles(menuItem);
      muteInactiveNavItems(wrapper);
    });
    menuItem.addEventListener('mouseleave', () => { removeHoverStyles(menuItem); unmuteAllNavItems(); });
  });

  if (navigationMenuWrapper) {
    navigationMenuWrapper.addEventListener('mouseenter', clearCloseTimeout);
    navigationMenuWrapper.addEventListener('mouseleave', () => scheduleClose([dropdownWrapper]));
  }

  if (dropdownWrapper) {
    dropdownWrapper.addEventListener('mouseenter', () => {
      clearCloseTimeout();
      if (activeTrigger) {
        const aw = activeTrigger.closest('.navigation-link-wrapper');
        applyHoverStyles(aw?.querySelector('.navigation-menu-item') || activeTrigger);
        muteInactiveNavItems(aw);
      }
    });
    dropdownWrapper.addEventListener('mouseleave', () => scheduleClose([navigationMenuWrapper, dropdownWrapper]));
  }

  [navigationLogo, navigationCta].forEach(el => {
    el?.addEventListener('mouseenter', () => { if (!window.isHamburgerMenuOpen) hideDropdowns(); });
  });

  document.addEventListener('click', e => {
    if (!isOpen || window.isHamburgerMenuOpen) return;
    if (!navigationMenuWrapper?.contains(e.target) && !dropdownWrapper?.contains(e.target)) {
      clearCloseTimeout(); hideDropdowns();
    }
  });

  navigationParent?.addEventListener('mouseleave', () => {
    if (!window.isHamburgerMenuOpen) scheduleClose([navigationMenuWrapper, dropdownWrapper]);
  });

  // Dropdown link hover color coding
  const dropdownSections = document.querySelectorAll('.navigation-dropdown-link');
  const colorConfig = [
    { hover: '#FFF8D6', press: '#F0E8A0' },
    { hover: '#EBF5FF', press: '#D0E8F5' },
    { hover: '#F0EBFF', press: '#DDD5F0' },
    { hover: '#EBFFF4', press: '#CCF0DC' },
  ];
  let opacityTimeout = null;
  let colorTimeout = null;
  const DEADZONE = 100;

  dropdownSections.forEach(s => {
    s.style.transition = 'opacity 0.12s ease-out, background-color 0.12s ease-out';
  });

  dropdownSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      if (opacityTimeout) { clearTimeout(opacityTimeout); opacityTimeout = null; }
      dropdownSections.forEach(s => { s.style.opacity = s === section ? '1' : '0.5'; });
    });
    section.addEventListener('mouseleave', () => {
      if (opacityTimeout) clearTimeout(opacityTimeout);
      opacityTimeout = setTimeout(() => {
        dropdownSections.forEach(s => { s.style.opacity = '1'; });
      }, DEADZONE);
    });
  });

  dropdownSections.forEach((section, index) => {
    const color = colorConfig[index % colorConfig.length].hover;
    const pressColor = colorConfig[index % colorConfig.length].press;
    const links = section.querySelectorAll('.dropdown-link');
    const sectionTitle = section.querySelector('.navigation-dropdown-link-title');

    links.forEach(l => { l.style.transition = 'background-color 0.12s ease-out, opacity 0.12s ease-out'; });
    if (sectionTitle) sectionTitle.style.transition = 'opacity 0.12s ease-out';

    section.addEventListener('mouseenter', () => {
      if (colorTimeout) { clearTimeout(colorTimeout); colorTimeout = null; }
      dropdownSections.forEach(s => s.querySelectorAll('.dropdown-link').forEach(l => l.style.backgroundColor = ''));
      links.forEach(l => { l.style.backgroundColor = color; });
    });
    section.addEventListener('mouseleave', () => {
      if (colorTimeout) clearTimeout(colorTimeout);
      colorTimeout = setTimeout(() => {
        dropdownSections.forEach(s => s.querySelectorAll('.dropdown-link').forEach(l => l.style.backgroundColor = ''));
      }, DEADZONE);
    });

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        links.forEach(l => { l.style.backgroundColor = ''; l.style.opacity = l === link ? '1' : '0.5'; });
        link.style.backgroundColor = color;
        if (sectionTitle) sectionTitle.style.opacity = '0.5';
      });
      link.addEventListener('mouseleave', () => {
        links.forEach(l => { l.style.backgroundColor = color; l.style.opacity = '1'; });
        if (sectionTitle) sectionTitle.style.opacity = '1';
      });
      link.addEventListener('mousedown', () => { link.style.backgroundColor = pressColor; });
      link.addEventListener('mouseup', () => { link.style.backgroundColor = color; });
    });
  });

  // Services CTA dimming
  const servicesCta = document.querySelector('.services-cta');
  const dropdownServiceWrappers = document.querySelectorAll('.navigation-dropdown-link');
  let svcCtaTimeout = null;

  if (servicesCta) {
    servicesCta.style.transition = 'opacity 0.12s ease-out';
    servicesCta.addEventListener('mouseenter', () => {
      if (svcCtaTimeout) { clearTimeout(svcCtaTimeout); svcCtaTimeout = null; }
      dropdownServiceWrappers.forEach(w => { w.style.opacity = '0.5'; });
    });
    servicesCta.addEventListener('mouseleave', () => {
      if (svcCtaTimeout) clearTimeout(svcCtaTimeout);
      svcCtaTimeout = setTimeout(() => {
        dropdownServiceWrappers.forEach(w => { w.style.opacity = '1'; });
      }, 100);
    });
  }

  // Mobile hamburger
  const mobileOpenBtn = document.querySelector('.mobile-menu-trigger .open');
  const mobileCloseBtn = document.querySelector('.mobile-menu-trigger .close');
  const mobileMenuWrapper = document.querySelector('.navigation-menu-wrapper.mobile');
  const mobileCta = document.querySelector('.navigation-mobile-cta');

  function openMobileMenu() {
    window.isHamburgerMenuOpen = true;
    if (mobileOpenBtn) mobileOpenBtn.style.display = 'none';
    if (mobileCloseBtn) mobileCloseBtn.style.display = '';
    if (mobileMenuWrapper) mobileMenuWrapper.style.display = 'flex';
    if (mobileCta) mobileCta.style.display = 'flex';
    if (dropdownWrapper) dropdownWrapper.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    window.isHamburgerMenuOpen = false;
    if (mobileOpenBtn) mobileOpenBtn.style.display = '';
    if (mobileCloseBtn) mobileCloseBtn.style.display = 'none';
    if (mobileMenuWrapper) mobileMenuWrapper.style.display = '';
    if (mobileCta) mobileCta.style.display = '';
    if (!isOpen) dropdownWrapper?.style.setProperty('display', 'none');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-mobile-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.isHamburgerMenuOpen) closeMobileMenu();
      else openMobileMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && window.isHamburgerMenuOpen) closeMobileMenu();
  });

  // Init styles
  navLinkWrappers.forEach(w => { w.style.transition = 'opacity 0.12s ease-out'; });
  if (navigationCta) navigationCta.style.transition = 'opacity 0.12s ease-out';
  if (dropdownWrapper) dropdownWrapper.style.display = 'none';
};
