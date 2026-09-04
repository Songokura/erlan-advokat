/* ══════════════════════════════════════════════════════════════════════
   Адвокат Ерлан Т. Ванильный JS, без библиотек.

   Всё движение на странице продолжает одну метафору - дело сшивают:
   номер дела печатается, заголовок набирается пословно, печать
   прикладывается с ударом, нить прошивки идёт за прокруткой,
   этапы загораются по шву, печати на выигранных делах бьют по очереди.
   ══════════════════════════════════════════════════════════════════════ */

/* Номер для заявки из формы. Тот же, что в шапке и в липкой панели,
   но без плюса и пробелов. Меняется вместе с ними. */
var WA_NUMBER = '77000000000';

(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* номер дела печатается */
  var no = document.getElementById('caseno');
  var target = String(1000 + Math.floor(Math.random()*8999));
  if(reduce){
    no.textContent = target;
  }else{
    var i = 0;
    (function type(){
      if(i <= target.length){ no.textContent = target.slice(0,i); i++; setTimeout(type, 140); }
    })();
  }

  /* заголовок пословно, затем печать */
  var title = document.getElementById('title');
  var stampEl = document.getElementById('herostamp');
  var text = title.childNodes[0].textContent.trim().split(' ');
  title.childNodes[0].textContent = '';
  text.forEach(function(w,k){
    var s = document.createElement('span'); s.className='word'; s.textContent = w;
    s.style.animationDelay = (0.15 + k*0.07) + 's';
    title.insertBefore(s, stampEl);
  });
  setTimeout(function(){ hit(stampEl, true); }, reduce ? 0 : 900 + text.length*70);

  function hit(el, shake){
    if(reduce){ el.classList.remove('pending'); return; }
    el.classList.remove('pending'); el.classList.add('hit');
    if(shake){ setTimeout(function(){ document.body.classList.add('shake'); setTimeout(function(){document.body.classList.remove('shake')},400); }, 300); }
    if(navigator.vibrate) navigator.vibrate(30);
  }

  /* нить прогресса */
  var thread = document.querySelector('#thread i');

  /* активная вкладка. Ленту вкладок двигаем сами, через scrollLeft:
     scrollIntoView прокручивает и сам документ, из-за чего страница
     дёргается на каждом кадре прокрутки. */
  var navBox = document.querySelector('nav.tabs');
  var links = [].slice.call(document.querySelectorAll('nav.tabs a'));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  var curTab = -1;
  function navUpdate(){
    var y = scrollY + innerHeight*0.4, cur = -1;
    secs.forEach(function(s,k){ if(s && s.offsetTop <= y) cur = k; });
    if(cur === curTab) return;
    curTab = cur;
    links.forEach(function(a,k){ a.classList.toggle('on', k===cur); });
    if(cur < 0) return;
    var a = links[cur];
    var want = a.offsetLeft - (navBox.clientWidth - a.offsetWidth)/2;
    navBox.scrollTo({left: Math.max(0, want), behavior: reduce ? 'auto' : 'smooth'});
  }

  /* шов по этапам */
  var steps = [].slice.call(document.querySelectorAll('.step'));
  var seam = document.getElementById('seam'), stepsBox = document.getElementById('steps');
  function seamUpdate(){
    var r = stepsBox.getBoundingClientRect();
    var done = Math.min(Math.max((innerHeight*0.7 - r.top) / r.height, 0), 1);
    seam.style.height = (done*100)+'%';
    steps.forEach(function(s){
      var sr = s.getBoundingClientRect();
      s.classList.toggle('lit', sr.top < innerHeight*0.7);
    });
  }

  var ticking = false;
  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      var h = document.documentElement;
      var span = h.scrollHeight - h.clientHeight;
      thread.style.height = (span > 0 ? h.scrollTop / span * 100 : 0) + '%';
      seamUpdate();
      navUpdate();
    });
  }
  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onScroll, {passive:true});

  /* расчёт: моя работа по делу берётся как 7 % от суммы спора */
  var debt = document.getElementById('debt');
  var f = function(n){ return n.toLocaleString('ru-RU').replace(/ /g,' ') + ' ₸'; };
  function calc(){
    var d = +debt.value * 1e6, fee = Math.round(d*0.07/1e4)*1e4;
    document.getElementById('debtOut').textContent = f(d);
    document.getElementById('l1').textContent = f(d);
    document.getElementById('l2').textContent = f(fee);
    document.getElementById('l3').textContent = f(d+fee);
  }
  debt.addEventListener('input', calc); calc();

  /* появление: монеты, счётчик, печати */
  function count(el){
    var to = +el.dataset.to, t0 = performance.now(), dur = 1800;
    (function tick(t){
      var p = Math.min((t-t0)/dur,1), e = 1 - Math.pow(1-p,3);
      el.textContent = Math.round(to*e).toLocaleString('ru-RU').replace(/ /g,' ');
      if(p<1) requestAnimationFrame(tick);
    })(t0);
  }
  var bigsum = document.getElementById('bigsum');
  /* в разметке уже стоит итоговая сумма - она нужна без JS. Обнуляем
     только перед тем, как счётчик её отсчитает. */
  if(!reduce) bigsum.textContent = '0';

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      if(el.id==='flow') el.classList.add('go');
      if(el.id==='bigsum' && !reduce) count(el);
      if(el.hasAttribute('data-stamp')) setTimeout(function(){ hit(el,false); }, 150 + Math.random()*400);
      io.unobserve(el);
    });
  }, {threshold:.5});
  io.observe(document.getElementById('flow'));
  io.observe(bigsum);
  document.querySelectorAll('[data-stamp]').forEach(function(s){ io.observe(s); });

  /* форма. Своего приёмника заявок у страницы пока нет, поэтому ответы
     собираются в текст и уходят адвокату в WhatsApp - ни одна заявка
     не теряется. Появится обработчик на домене клиента, отправка
     подставится сюда, разметку менять не придётся. */
  var form = document.getElementById('form');
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    if(!form.reportValidity()) return;
    var d = new FormData(form);
    var msg = 'Заявка с сайта.\nИмя: ' + (d.get('name')||'') +
              '\nТелефон: ' + (d.get('phone')||'') +
              '\nСуть спора: ' + (d.get('case')||'не указана');
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    form.style.display='none';
    var sent = document.getElementById('sent'); sent.style.display='block';
    hit(document.getElementById('sentstamp'), false);
  });

  /* прямая ссылка на том: раскрыть и подсветить.
     Нужно для рекламы - объявление ведёт на #zastroyshchik,
     и человек сразу видит открытым нужный том. */
  function openHash(){
    var el = location.hash && document.querySelector(location.hash);
    if(!el) return;
    var vol = el.closest('details.vol');
    if(vol) vol.open = true;
  }
  addEventListener('hashchange', openHash); openHash();
  onScroll();
})();
