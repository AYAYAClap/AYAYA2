document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const navi = document.getElementById('navi');
  const navLinks = document.querySelectorAll('#navi a');
  const logo = document.querySelector('.logo');
  const sideBtn = document.getElementById('side-btn');
  const bg = document.querySelector('.bg');
  const mainImages = document.querySelectorAll('#mainvisual img');
  const gallery = document.getElementById('gallery');
  const access = document.getElementById('access');
  const contact = document.getElementById('contact');
  
  
  // ハンバーガーメニュー
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navi.classList.toggle('active');
  }; 
  
  hamburger.addEventListener('click', toggleMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });


  const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
  if (anchorLinks.length === 0) return;
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
  
      const href = link.getAttribute('href');
  
      const target = (href === '#' || href === '')
      ? document.documentElement
      : document.querySelector(href);
  
      target?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });


  const observerOptions = {
    root: null,
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  }, observerOptions);
  
  document.querySelectorAll('.inview').forEach(el => {
    observer.observe(el);
  });


 
  // スクロールイベント
  let ticking = false;
  
  const handleScroll = () => {
  
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
  
    //
    if (windowWidth > 900) {
      const width = 100 / 3 + scroll / 10;
      mainImages.forEach(img => img.style.width = `${width}%`);
    } else {
      const width = 100 - scroll / 10;
      mainImages.forEach(img => img.style.width = `${width}%`);
    }
  
    //
    if (scroll > 520) {
      logo.classList.add('is-show');
      hamburger.classList.add('is-show');
    } else {
      logo.classList.remove('is-show');
      hamburger.classList.remove('is-show');
    }
  
    //
    const accessPos = access.offsetTop - windowHeight;
  
    if (windowWidth > 900) {
  
      const galleryPos = gallery.offsetTop - windowHeight;
  
      if (scroll > galleryPos && scroll < accessPos) {
        sideBtn.style.transform = 'rotate(-90deg) translateY(0)';
      } else {
        sideBtn.style.transform = 'rotate(-90deg) translateY(60px)';
      }
    }
  
    //
    const contactPos = contact.offsetTop - windowHeight;
  
    if (scroll > accessPos && scroll < contactPos) {
      bg.classList.add('is-show');
    } else {
      bg.classList.remove('is-show');
    }
  
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
  
  window.addEventListener('resize', () => {
    requestAnimationFrame(handleScroll);
  });
});

  