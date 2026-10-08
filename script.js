const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));

const g=document.querySelector('.cursor-glow');
if(g && matchMedia('(pointer:fine)').matches){
  addEventListener('pointermove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
}

const menu=document.querySelector('.menu'),nav=document.querySelector('.nav'),panel=document.querySelector('.menu-panel');
if(menu){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',open?'true':'false');
  });
}
document.querySelectorAll('.menu-panel a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false');
}));
document.addEventListener('click',e=>{
  if(nav.classList.contains('open') && !nav.contains(e.target)){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}
});
