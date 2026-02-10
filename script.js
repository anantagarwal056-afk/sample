// script.js - controls reveal animations, active nav links, smooth behavior & form send
document.addEventListener('DOMContentLoaded',function(){

  // 1) IntersectionObserver for reveal animations
  const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('show');
      obs.unobserve(e.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -80px 0px"
});

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


  // 2) Active nav link by current location
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname === '/' && a.getAttribute('href') === 'index.html')){
      a.classList.add('active');
    }
  });

  // 3) Mobile nav - optional simple toggle (if you want to add later)
  // 4) Contact form: open mail client with prefilled data (no backend)
  const contactForm = document.querySelector('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = encodeURIComponent(this.querySelector('input[name="name"]').value.trim());
      const phone = encodeURIComponent(this.querySelector('input[name="phone"]').value.trim());
      const msg = encodeURIComponent(this.querySelector('textarea[name="message"]').value.trim());
      const emailTo = this.getAttribute('data-email') || 'your@email.com';

      if(!name || !phone || !msg){
        alert('Please fill Name, Phone and Message.');
        return;
      }

      const subject = encodeURIComponent('Inquiry from Website - ' + name);
      const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}%0APhone: ${decodeURIComponent(phone)}%0A%0AMessage:%0A${decodeURIComponent(msg)}`);
      // open mail client
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    });
  }
// Fallback in case IntersectionObserver misses elements
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal:not(.show)").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

});
