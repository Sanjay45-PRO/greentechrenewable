var _dv=0;function demoUpdate(kw,yr){const s=$('#dsave');$('#dkw').textContent=kw+' kW';$('.demo').style.setProperty('--k',kw);const from=_dv,t0=performance.now();_dv=yr;(function st(t){const p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);s.textContent='₹'+Math.round(from+(yr-from)*e).toLocaleString('en-IN');if(p<1)requestAnimationFrame(st)})(t0)}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const hd=$('header'),hero=$('.hero');
function tick(){hd.classList.toggle('solid',scrollY>40);
 if(hero){const p=Math.min(1,scrollY/(innerHeight*1.1));hero.style.setProperty('--p',p);hero.style.setProperty('--lift',Math.sin(Math.PI*p)*38)}}
addEventListener('scroll',tick,{passive:true});tick();
$('.burger').onclick=e=>{const o=$('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$$('nav a').forEach(a=>a.addEventListener('click',()=>{if(!a.parentElement.classList.contains('has-sub'))$('nav').classList.remove('open')}));
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear()-2015);
$$('.yr').forEach(e=>e.textContent=new Date().getFullYear());
// savings calculator
const bill=$('#bill');if(bill){const f=n=>'₹'+Math.round(n).toLocaleString('en-IN');
 const run=()=>{const b=+bill.value,units=b/7,kw=Math.max(1,Math.ceil(units/120*2)/2),yr=b*12*.9;
  $('#billv').textContent=f(b);if($('#b1')){$('#b1').style.width='100%';$('#b2').style.width='10%';$('#b1v').textContent=f(b);$('#b2v').textContent=f(b*.1)}$('#kw').textContent=kw+' kW';$('#yr').textContent=f(yr);$('#cut').textContent='up to 90%';if($('#dkw'))demoUpdate(kw,yr);$('#roof').textContent=Math.round(kw*10)+' m²';
  $('#calcwa').href='https://wa.me/918280000080?text='+encodeURIComponent(`Hello, my monthly electricity bill is ${f(b)}. Please share a solar quote (approx ${kw} kW).`)};
 bill.oninput=run;run()}
// contact form
if(/sent=1/.test(location.search)&&$('.ok'))$('.ok').style.display='block';

const qf=$('#qf');if(qf)qf.onsubmit=e=>{e.preventDefault();const d=new FormData(qf);
 open('https://wa.me/918280000080?text='+encodeURIComponent(`Hello, I'm ${d.get('n')} (${d.get('p')}). Interested in solar for: ${d.get('t')}. Monthly bill: ${d.get('b')?'₹'+d.get('b'):'not shared'}. Please share a quote.`),'_blank')};

const sz=$$('.sizer .chip');if(sz.length){const fm=n=>Math.round(n).toLocaleString('en-IN'),go=b=>{sz.forEach(x=>x.classList.toggle('on',x===b));const k=+b.dataset.kw,u=k*1400;
 $('#z1').textContent=fm(k*100)+' sq ft';$('#z2').textContent=fm(u);$('#z3').textContent=fm(u/12)+' units/month';$('#z4').textContent=fm(u*25*.7/1000)+' tonnes'};
 sz.forEach(b=>b.onclick=()=>go(b));go(sz[2])}
$$('.filt .chip').forEach(b=>b.onclick=()=>{$$('.filt .chip').forEach(x=>x.classList.toggle('on',x===b));$$('.tile[data-seg]').forEach(t=>t.hidden=b.dataset.f!=='all'&&t.dataset.seg!==b.dataset.f)});

const hs=$('.has-sub>a');if(hs){hs.addEventListener('click',e=>{e.preventDefault();const o=hs.parentElement.classList.toggle('open');hs.setAttribute('aria-expanded',o)});
 document.addEventListener('click',e=>{if(!hs.parentElement.contains(e.target))hs.parentElement.classList.remove('open')})}

addEventListener('keydown',e=>{if(e.key==='Escape'&&hs){hs.parentElement.classList.remove('open');hs.setAttribute('aria-expanded','false')}});

const pmx=$('.pm');if(pmx){const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){pmx.classList.add('in');io.disconnect()}},{threshold:.35});io.observe(pmx)}

// scroll reveal
{const r=$$('.rv');if(r.length){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});r.forEach(x=>io.observe(x))}}

// certificate viewer
(function(){const lb=$('.lb');if(!lb)return;const im=$('.lb-st img'),cap=$('.lb-c'),pv=$('.lb-p'),nx=$('.lb-n');let cur=null,i=1,op=null,sx=null;
const show=()=>{const u=`images/certificates/${cur.k}-${i}.jpg`;im.src=u;im.alt=`${cur.t}, page ${i} of ${cur.n}`;cap.innerHTML=`${cur.t}${cur.n>1?` · Page ${i} of ${cur.n}`:''} <a href="${u}" target="_blank" rel="noopener">Open full size ↗</a>`;pv.hidden=nx.hidden=cur.n<2};
const open=b=>{cur={k:b.dataset.key,n:+b.dataset.n,t:b.dataset.t};i=1;op=b;lb.hidden=false;document.body.style.overflow='hidden';show();$('.lb-x').focus()};
const close=()=>{lb.hidden=true;document.body.style.overflow='';im.removeAttribute('src');op&&op.focus()};
const go=d=>{i=(i-1+d+cur.n)%cur.n+1;show()};
$$('.cc').forEach(b=>b.addEventListener('click',()=>open(b)));$('.lb-x').onclick=close;pv.onclick=()=>go(-1);nx.onclick=()=>go(1);
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-st'))close()});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(cur.n>1&&e.key==='ArrowLeft')go(-1);if(cur.n>1&&e.key==='ArrowRight')go(1)});
lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',e=>{if(sx===null||cur.n<2)return;const d=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(d)>50)go(d<0?1:-1)});})();
