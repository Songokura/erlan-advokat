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

/* ══════════════════════════════════════════════════════════════════════
   Языки. Русская версия лежит прямо в разметке, казахская - в словаре
   ниже. Порядок выбора: ?lang= в адресе → выбор в localStorage → русский.

   Параметр в адресе стоит ПЕРВЫМ намеренно: объявление Google Ads на
   русском обязано открывать русскую страницу, даже если человек когда-то
   переключился на казахский. Иначе объявление и посадочная расходятся
   по языку, и Google снимает его как «неподдерживаемый язык».
   ══════════════════════════════════════════════════════════════════════ */
var I18N = {
  kk: {
    'meta.title':'Адвокат Ерлан Т., Астана: қарыз өндіру, мүлікті бөлу, құрылыс салушымен дау',
    'meta.desc':'10 млн теңгеден жоғары ірі даулар: қарыз өндіру, мүлікті бөлу, құрылыс салушылар, жол апаттары, салық және экономикалық істер. 2001 жылдан бері тәжірибе, 2,03 млрд теңгеге іс жеңіп алынған.',

    'brand.sub':'адвокат, 2001 жылдан бері',
    'nav.case':'Сіздің ісіңіз','nav.order':'Іс қалай жүреді','nav.pay':'Кім төлейді',
    'nav.wins':'Менің істерім','nav.result':'Нәтиже','nav.faq':'Сұрақтар','nav.form':'Өтінім',

    'hero.caseno':'ІС №',
    'hero.title':'Ісіңізді сот шешіміне және оның орындалуына дейін жүргіземін',
    'hero.stamp':'Өндірілді',
    'hero.sub':'Сотта жеңу аз. Ақша сізге жетуі керек.',
    'btn.form':'Өтінім қалдыру','btn.cases':'Маған қандай істермен келеді',
    'f1.v':'25 жыл','f1.l':'адвокатурада, 2001 жылдан бері тәжірибе',
    'f2.v':'2,03 млрд ₸','f2.l':'сенім білдірушілер істері бойынша жеңіп алынды',
    'f3.v':'10 млн ₸-ден','f3.l':'тек ірі даулармен жұмыс істеймін',
    'portrait.alt':'Адвокат Ерлан Т.',

    'dela.ask':'Менің ісім сізге қатысты ма?',
    'dela.h':'Маған қандай істермен келеді',
    'dela.lead':'Ақша мен мүлік туралы ірі даулар. Төменде жиі кездесетіндері. Тізімді көру үшін томды ашыңыз.',
    'vol1':'1-том','vol2':'2-том','vol3':'3-том',
    'v1.h':'Сізге ақша қарыз','v1.p':'Құжаттар бар, сотқа баруға негіз бар.',
    'v1.a':'Шарт бойынша төлемейді','v1.b':'Жұмысты тапсырдым, ақша жоқ',
    'v1.c':'Бизнес серіктесімен дау','v1.d':'Банкпен немесе ірі компаниямен дау',
    'v1.e':'Жол апатында төлем жетпеді',
    'v2.h':'Мүлік туралы дау','v2.p':'Дау құны нысанның құнына тең.',
    'v2.a':'Ажырасқанда мүлікті бөлу','v2.b':'Құрылыс салушы үй-жайды бермейді',
    'v2.c':'Жер учаскесін тартып алуда',
    'v3.h':'Мемлекет сізге қарсы','v3.p':'Мұнда міндет керісінше: алу емес, бермеу.',
    'v3.a':'Салық органы қосымша төлеуді талап етеді','v3.b':'Бизнес бойынша қылмыстық іс',
    'other.1':'Сіздің ісіңіз мұнда жоқ па?','other.2':'Дауды өтінімде сипаттаңыз',
    'other.3':' - жауап беремін, аламын ба, жоқ па.',

    'por.ask':'Мүмкіндігім бар-жоғын қашан білемін?',
    'por.h':'Жауапты сол күні аласыз',
    'por.lead':'Әрі қарай істі өзім жүргізіп, шешім орындалғанға дейін жеткіземін.',
    'por.ph1':'Бірінші күні','por.ph2':'Әрі қарай өзім жүргіземін',
    's1.h':'Қоңырау','s1.p':'Жағдай туралы қысқаша. Әрі қарай жүрудің мәні бар-жоғын айтамын және құжаттарыңызбен шақырамын.',
    's2.h':'Құжаттармен жарты сағат','s2.p':'Қағаздарды дауыстап талдаймын: не сіздің пайдаңызға жұмыс істейді, әлсіз тұсы қайда, мүмкіндік қандай. Дәлел аз болса, тура айтамын және іске кіріспеймін.',
    's3.h':'Баға мен жоспар','s3.p':'Сома мен кезеңдерді айтамын. Ұқсас істерді және олардың немен аяқталғанын көрсетемін.',
    's4.h':'Іс бойынша жұмыс','s4.p':'Наразылық пен талап арыз жазамын, отырыстарға қатысамын, қажет болса шағым беремін. Барлығын бір адам істейді - сіз құжаттарды бірге қараған сол адам.',
    's5.h':'Ақшаға дейін жеткіземін','s5.p':'Атқарушы парақ. Борышкер өзі төлейді немесе оның шоттары мен мүлкіне сот орындаушысы тыйым салады.',
    'court.alt':'Соттың бос дәлізі',

    'ras.ask':'Бұл қанша тұрады?',
    'ras.h':'Менің жұмысымды ұтылған тарап төлейді',
    'ras.lead':'Менің жұмысымның құны талап арызға жеке жолмен енеді. Ұтсақ, оны жауапкерден өндіреді. Сондықтан мен тек жеңіс көретін істерді ғана аламын.',
    'ras.label':'Сізге қанша қарыз','ras.slider':'Қарыз сомасы, миллион теңгемен',
    'ras.l1':'Сіздің қарызыңыз','ras.l2':'Іс бойынша менің жұмысым','ras.l3':'Жауапкерден өндіреміз',
    'ras.def':'ЖАУАПКЕР','ras.you':'СІЗ',
    'ras.note':'Есептеу үлгісі. Нақты соманы жұмыс көлемін көргенде, алғашқы кездесуде айтамын. Одан қаншасы қайтатыны соттың бәрін толық шешуіне байланысты.',

    'op.ask':'Ұтатыныңызды немен дәлелдейсіз?',
    'op.h':'Мен жеңіп алған істер',
    'op.total':'жеңіспен аяқталған істердің жалпы сомасы',
    'c1.h':'Ұлттық компания мен банкпен дау','c1.p':'іс сенім білдірушінің пайдасына шешілді',
    'c2.h':'Құрылыс салушының үй-жайы','c2.p':'екі қабатты үй-жай',
    'c3.h':'Жеткізу шарты бойынша қарыз','c3.p':'екі компания',
    'c4.h':'Жұбайлардың мүлкін бөлу','c4.p':'төрт нысан',
    'st.won':'Жеңіс','st.got':'Өндірілді','st.kept':'Қорғалды',
    'op.note':'Осы және ұқсас істер бойынша шешімдердің көшірмелерін кездесуде көрсетемін.',

    'it.ask':'Мұның бәрі немен аяқталады?',
    'it.h':'Соңында не аласыз',
    'it.lead':'Іс сот шешім шығарғанда емес, ақша келгенде аяқталады.',
    'r1.h':'Сот шешімі','r1.p':'Оған дау айту мүмкін емес: шағым беру мерзімі өтті.',
    'r2.h':'Атқарушы парақ','r2.p':'Онымен сот орындаушысы жұмыс істейді: борышкердің шоттары мен мүлкіне тыйым салады.',
    'r3.h':'Өндірілген шығындар','r3.p':'Менің жұмысымның құны қарызбен бірге жауапкерге қойылады.',

    'faq.ask':'Менде сұрақтар қалды',
    'faq.h':'Шартқа дейін не сұрайды',
    'faq.lead':'Бұл сұрақтарды барлығы дерлік қояды. Қысқаша жауап беремін.',
    'faq_shansy.q':'Алғашқы қоңырауда ұтатынымды айта аласыз ба?',
    'faq_shansy.a':'Иә. Мүмкіндікті бірден бағалап, іске кірісуге тұрарлық-тұрарлықсызын айтамын. Құжаттарды көргенде нақты талдаймын: не сіздің пайдаңызға жұмыс істейді, әлсіз тұсы қайда.',
    'faq_dengi.q':'Ұтсақ, ақшаны аламын ба?',
    'faq_dengi.a':'Жауапкерде ақша немесе мүлік болса, сот орындаушысы оны алады: шоттарға тыйым салады, көлігін алады. Төлейтін ештеңесі болмаса, атқарушы парақ күшінде қалады және ақша пайда болғанда іске қосылады. Мен бұл туралы шартқа дейін айтамын, кейін емес.',
    'faq_cena.q':'Жұмысыңыз қанша тұрады?',
    'faq_cena.a':'Жұмыс көлемін көргенде, алғашқы кездесуде айтамын. Мүліктік даулар бойынша бұл сома ұтылған тараптан өндіру үшін талап арызға енеді. Қаншасы қайтатыны соттың бәрін толық шешуіне байланысты. Екі санды да кездесуде есептейміз.',
    'faq_dokumenty.q':'Алғашқы кездесуге не әкелу керек?',
    'faq_dokumenty.a':'Шарт, актілер, төлем құжаттары, хат алмасу. Жол апаты болса, оған қоса хаттама, қаулы және полис. Топтама неғұрлым толық болса, жауап соғұрлым нақты.',
    'faq_srok.q':'Іс қанша уақыт алады?',
    'faq_srok.a':'Сатыларға және жауапкердің шағымдануына байланысты. Дауыңыз бойынша мерзімді құжаттарды көргенде, кездесуде айтамын, іс созылатын болса, алдын ала ескертемін.',
    'faq_vedet.q':'Істі кім жүргізеді - сіз бе, көмекші ме?',
    'faq_vedet.a':'Мен. Сіз құжаттарды бірге қараған сол адам отырыстарға барады және істі атқарушы параққа дейін жеткізеді.',
    'faq_otkaz.q':'Ал ісімді алмасаңыз ше?',
    'faq_otkaz.a':'Неліктен олай екенін кездесуде түсіндіремін.',

    'za.ask':'Неден бастаймын?',
    'za.h':'Құжаттарыңызбен келіңіз',
    'za.lead':'Нөміріңізді және даудың мәнін бір жолмен қалдырыңыз. Қайта қоңырау шалып, кездесу белгілейміз.',
    'za.name':'Сізге қалай жүгінейін','za.phone':'Телефон','za.case':'Даудың мәні және сомасы',
    'za.casePh':'Мысалы: жеткізуші шарт бойынша 40 млн төлемеді, актілер бар',
    'za.agree':'Дербес деректерді өңдеуге келісемін',
    'za.send':'Өтінім жіберу','za.wa':'WhatsApp-қа жазу',
    'za.nojs':'Бұл браузерде JavaScript өшірілген, форма жіберілмейді. Жоғарыдағы нөмірге қоңырау шалыңыз немесе WhatsApp-қа жазыңыз.',
    'za.sentStamp':'Қабылданды',
    'za.sent':'Өтінім менде. Жұмыс уақытында қоңырау шаламын. Шартты, актілерді, төлем құжаттарын, хат алмасуды дайындап қойыңыз.',
    'za.note':'Шартты, актілерді, төлем құжаттарын, хат алмасуды әкеліңіз: қолда бары түгел.',
    'foot':'Ерлан Т., адвокат. Астана.','bar.call':'Қоңырау шалу',

    'form.msg':'Сайттан өтінім.','form.name':'Аты','form.phone':'Телефон',
    'form.case':'Даудың мәні','form.none':'көрсетілмеген'
  }
};

/* Русские значения снимаем с самой разметки при первом запуске -
   держать их вторым словарём значило бы править текст в двух местах. */
var RU = {};
function langInit(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){ RU[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){ RU[el.dataset.i18nPh] = el.placeholder; });
  document.querySelectorAll('[data-i18n-al]').forEach(function(el){ RU[el.dataset.i18nAl] = el.getAttribute('aria-label'); });
  document.querySelectorAll('[data-i18n-alt]').forEach(function(el){ RU[el.dataset.i18nAlt] = el.alt; });
  RU['meta.title'] = document.title;
  var d = document.querySelector('meta[name=description]');
  RU['meta.desc'] = d ? d.content : '';
  RU['form.msg']='Заявка с сайта.'; RU['form.name']='Имя'; RU['form.phone']='Телефон';
  RU['form.case']='Суть спора'; RU['form.none']='не указана';
}
function t(key){
  var d = (LANG === 'ru') ? RU : I18N[LANG];
  var v = d && d[key];
  return (v == null) ? RU[key] : v;
}
var LANG = 'ru';
var buildTitle = function(){};
function applyLang(lang, remember){
  LANG = (lang === 'kk') ? 'kk' : 'ru';
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(function(el){ el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){ el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-al]').forEach(function(el){ el.setAttribute('aria-label', t(el.dataset.i18nAl)); });
  document.querySelectorAll('[data-i18n-alt]').forEach(function(el){ el.alt = t(el.dataset.i18nAlt); });
  document.title = t('meta.title');
  var d = document.querySelector('meta[name=description]'); if(d) d.content = t('meta.desc');
  var og = document.querySelector('meta[property="og:locale"]'); if(og) og.content = (LANG==='kk') ? 'kk_KZ' : 'ru_RU';
  document.querySelectorAll('.lang button').forEach(function(b){
    b.setAttribute('aria-pressed', String(b.dataset.lang === LANG));
  });
  if(remember){ try{ localStorage.setItem('ea-lang', LANG); }catch(e){} }
  buildTitle();
}


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

  /* Заголовок героя набирается пословно. Слова пересобираются заново после
     каждой смены языка: у казахской строки другое количество слов, и без
     пересборки на экране осталась бы русская. */
  var stampEl = document.getElementById('herostamp');
  buildTitle = function(){
    var box = document.querySelector('.ht');
    if(!box) return;
    var words = t('hero.title').split(' ');
    box.textContent = '';
    words.forEach(function(w,k){
      var sp = document.createElement('span'); sp.className='word'; sp.textContent = w;
      sp.style.animationDelay = (0.15 + k*0.07) + 's';
      if(reduce){ sp.style.opacity = 1; sp.style.transform = 'none'; }
      box.appendChild(sp);
    });
    return words.length;
  };

  /* язык: ?lang= в адресе → выбор в localStorage → русский */
  langInit();
  var urlLang = new URLSearchParams(location.search).get('lang');
  var saved = null; try{ saved = localStorage.getItem('ea-lang'); }catch(e){}
  applyLang((urlLang === 'ru' || urlLang === 'kk') ? urlLang : (saved || 'ru'), false);
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.dataset.lang, true); });
  });

  setTimeout(function(){ hit(stampEl, true); }, reduce ? 0 : 900 + t('hero.title').split(' ').length*70);

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
    var msg = t('form.msg') + '\n' + t('form.name') + ': ' + (d.get('name')||'') +
              '\n' + t('form.phone') + ': ' + (d.get('phone')||'') +
              '\n' + t('form.case') + ': ' + (d.get('case')||t('form.none'));
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
