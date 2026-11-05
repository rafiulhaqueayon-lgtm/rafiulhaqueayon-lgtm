const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
function menu(open) { links.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); }
toggle.addEventListener('click', () => menu(toggle.getAttribute('aria-expanded') !== 'true'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu(false)));
document.addEventListener('keydown', e => { if(e.key === 'Escape') { menu(false); } });
// Accessible experience and education tabs.
const tabs = [...document.querySelectorAll('.tab-btn')];
document.querySelector('.timeline-tabs').setAttribute('role', 'tablist');
function select(index) { tabs.forEach((t,i) => { const on=i===index; t.classList.toggle('active',on); t.setAttribute('aria-selected',String(on)); t.tabIndex=on?0:-1; document.getElementById(t.dataset.tab+'-panel').classList.toggle('active',on); }); }
tabs.forEach((t,i) => { t.id=t.dataset.tab+'-tab'; t.setAttribute('role','tab'); t.setAttribute('aria-controls',t.dataset.tab+'-panel'); const p=document.getElementById(t.dataset.tab+'-panel'); p.setAttribute('role','tabpanel'); p.setAttribute('aria-labelledby',t.id); p.tabIndex=0; t.addEventListener('click',()=>select(i)); t.addEventListener('keydown',e=>{let n=e.key==='ArrowRight'?(i+1)%tabs.length:e.key==='ArrowLeft'?(i+tabs.length-1)%tabs.length:e.key==='Home'?0:e.key==='End'?tabs.length-1:null; if(n!==null){e.preventDefault();select(n);tabs[n].focus();}}); });
select(0);
// Subtle animation; content remains visible if JavaScript is unavailable.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(e.target.animate)e.target.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:400});observer.unobserve(e.target);}})); document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el)); }
// Prepare an email draft. The visitor sends it using their email application.
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const name=String(d.get('name')).trim(),email=String(d.get('email')).trim(),message=String(d.get('message')).trim(); if(!name||!email||!message)return; const subject=String(d.get('subject')).trim()||'Portfolio contact from '+name; location.href='mailto:rafiulhaqueayon@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message+'\n\n'+name+' ('+email+')');document.getElementById('formNote').textContent='Review and send the draft in your email app.';});
