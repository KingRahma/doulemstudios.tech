// Move translations to top to ensure availability
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_works: "My Works",
    nav_contact: "Contact",
    badge_problem: "The Problem",
    badge_solution: "Our Solution",
    hero_title: "We turn ideas into standout visuals & websites.",
    hero_sub: "Trusted creative partner for brands that want to grow.",
    cta_talk: "Let’s Talk",
    cta_hire: "Hire Me",
    about_title: "About Rahman Creatives",
    about_p1: "We’re a multidisciplinary studio offering graphics design, video editing, and web development. We help startups and established brands communicate clearly and look incredible.",
    about_p2: "Our process blends strategy and craft: understand your problem, craft a tailored solution, and ship fast—without compromising quality.",
    services_title: "Services",
    services_problem: "Your brand looks inconsistent, your videos don’t convert, and your website isn’t winning trust.",
    services_solution: "We design stunning visuals, craft compelling edits, and build fast, responsive websites that drive action.",
    works_title: "Recent Work",
    works_caption: "A peek at what we build for clients.",
    contact_title: "Contact",
    contact_sub: "Ready to level up your brand? Let’s build.",
    contact_cta: "Send Message",
    footer_copy: "© 2025 Rahman Creatives. All rights reserved."
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "الخدمات",
    nav_works: "أعمالنا",
    nav_contact: "تواصل",
    badge_problem: "المشكلة",
    badge_solution: "الحل",
    hero_title: "نحوّل الأفكار إلى تصاميم ومواقع مميزة.",
    hero_sub: "شريكك الإبداعي لبناء علامة تنمو بثقة.",
    cta_talk: "لنتحدث",
    cta_hire: "وظّفني",
    about_title: "عن رحمن كرياتيفز",
    about_p1: "نحن أستوديو متعدد التخصصات في التصميم الجرافيكي والمونتاج وتطوير الويب. نساعد الشركات الناشئة والعلامات الراسخة على التواصل بوضوح والظهور بشكل احترافي.",
    about_p2: "طريقتنا تجمع بين الاستراتيجية والإتقان: نفهم المشكلة، نصنع الحل المناسب، ونطلق بسرعة دون التضحية بالجودة.",
    services_title: "الخدمات",
    services_problem: "هويتك غير متناسقة، فيديوهاتك لا تحوّل، وموقعك لا يبني الثقة.",
    services_solution: "نصمم هوية جذابة، وننتج مونتاجًا مؤثرًا، ونبني مواقع سريعة ومتجاوبة تدفع الزوار لاتخاذ الإجراء.",
    works_title: "أحدث الأعمال",
    works_caption: "نظرة على ما نقدمه لعملائنا.",
    contact_title: "تواصل معنا",
    contact_sub: "جاهز للارتقاء بعلامتك؟ لنبدأ.",
    contact_cta: "إرسال",
    footer_copy: "© 2025 رحمن كرياتيفز. جميع الحقوق محفوظة."
  }
};

// Theme + Language persistence
const $root = document.documentElement;
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('rc_theme');
$root.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));

const savedLang = localStorage.getItem('rc_lang') || 'en';
setLanguage(savedLang);

function toggleTheme(){
  const next = $root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  $root.setAttribute('data-theme', next);
  localStorage.setItem('rc_theme', next);
}

function setLanguage(code){
  const isArabic = code === 'ar';
  document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
  localStorage.setItem('rc_lang', code);
  // Apply text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(translations[code] && translations[code][key]){
      el.innerText = translations[code][key];
    }
  });
  // Update nav labels and aria
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if(translations[code] && translations[code][key]){
      el.innerHTML = translations[code][key];
    }
  });
}

function toggleLanguage(){
  const current = localStorage.getItem('rc_lang') || 'en';
  setLanguage(current === 'en' ? 'ar' : 'en');
}

window.addEventListener('DOMContentLoaded', () => {
  // Bind controls present on any page
  const themeBtn = document.querySelector('[data-action="theme"]');
  if(themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const langBtn = document.querySelector('[data-action="lang"]');
  if(langBtn) langBtn.addEventListener('click', toggleLanguage);

  // Typing effect (Home only if exists)
  const typedTarget = document.querySelector('[data-typed]');
  if(typedTarget){
    const words = ['Graphics Design', 'Video Editing', 'Web Development'];
    let i=0, j=0, del=false;
    const tick = () => {
      const w = words[i];
      typedTarget.textContent = del ? w.slice(0, j--) : w.slice(0, j++);
      if(!del && j === w.length + 1){ del = true; setTimeout(tick, 1200); return; }
      if(del && j < 0){ del = false; i = (i+1)%words.length; }
      setTimeout(tick, del ? 60 : 120);
    };
    tick();
  }

  // Slider (Services page)
  const slider = document.querySelector('.slider');
  if(slider){
    const track = slider.querySelector('.slides');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    const dotsC = slider.querySelector('.dots');
    let index = 0, auto;

    const setIndex = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsC.querySelectorAll('.dot').forEach((d, di)=> d.classList.toggle('active', di===index));
    };

    slides.forEach((_, i)=>{
      const b = document.createElement('button');
      b.className = 'dot';
      b.addEventListener('click', ()=>{ setIndex(i); restart(); });
      dotsC.appendChild(b);
    });

    prev.addEventListener('click', ()=>{ setIndex(index-1); restart(); });
    next.addEventListener('click', ()=>{ setIndex(index+1); restart(); });

    function autoplay(){
      auto = setInterval(()=> setIndex(index+1), 3500);
    }
    function restart(){
      clearInterval(auto); autoplay();
    }
    setIndex(0); autoplay();
  }
});