(() => {
  'use strict';
  const cafes = window.CAFES.map(c => ({...c, tags:[...c.tags, ...(c.rating >= 4.5 ? ['評分高'] : []), ...(c.reviews >= 1000 ? ['評論多'] : [])]}));
  const $ = id => document.getElementById(id);
  const chosen = new Set(['評分高']);
  let selected = null;
  const tags = ['評分高','環境好','手沖推薦','評論多','綠意空間','河景','泰國咖啡豆','創意特調','甜點搭配','藝文空間','老屋風格','街區散步'];
  function el(tag, text, className) { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if(className) node.className = className; return node; }
  function external(text, url) { const a = el('a',text); a.href = url; a.target='_blank'; a.rel='noopener noreferrer'; return a; }
  const mapQuery = c => c.name + ', ' + c.address;
  const mapURL = c => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapQuery(c));
  function selectCafe(c, scroll = false) {
    selected = c.id;
    $('map-panel').hidden = false;
    $('map-title').textContent = c.name;
    $('map-address').textContent = c.address;
    const src = 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery(c)) + '&output=embed&hl=zh-TW';
    if ($('map').getAttribute('src') !== src) $('map').src = src;
    $('map').title = c.name + ' 的 Google 地圖';
    $('map-link').href = mapURL(c);
    document.querySelectorAll('.card').forEach(card => {
      const active = card.dataset.id === c.id;
      card.classList.toggle('selected',active);
      const button = card.querySelector('button');
      button.setAttribute('aria-pressed',String(active));
      button.textContent = active ? '正在地圖上顯示' : '在地圖上查看';
    });
    if(scroll && matchMedia('(max-width: 650px)').matches) $('map-panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  function card(c) {
    const article = el('article',undefined,'card'); article.dataset.id=c.id;
    const top=el('div',undefined,'card-top'), heading=el('div');
    heading.append(el('span',c.area,'area'),el('h3',c.name));
    const score=el('div','★ ' + c.rating.toFixed(1),'score'); score.append(el('small',c.reviews.toLocaleString('zh-TW') + ' 則評論')); top.append(heading,score);
    const chips=el('div',undefined,'tags'); c.tags.forEach(t=>chips.append(el('span',t)));
    const actions=el('div',undefined,'card-actions'), button=el('button','在地圖上查看'); button.type='button'; button.setAttribute('aria-pressed','false'); button.setAttribute('aria-label','在地圖上查看 ' + c.name); button.addEventListener('click',()=>selectCafe(c,true)); actions.append(button,external('Google Maps ↗',mapURL(c)));
    const details=el('details'); details.append(el('summary','評分來源與標籤依據'),el('p',c.evidence)); const sources=el('ul'); c.sources.forEach(s=>{const li=el('li');li.append(external(s.label,s.url));sources.append(li);}); details.append(sources,el('p','2026-09-19 查閱來源頁面 · Google 評分由第三方轉載，非即時數據。'));
    article.append(top,chips,el('p',c.description,'description'),actions,details); return article;
  }
  function render() {
    const query=$('search').value.trim().toLocaleLowerCase();
    const found=cafes.filter(c=>(!$('area').value || c.area===$('area').value) && [...chosen].every(t=>c.tags.includes(t)) && [c.name,c.area,c.description,...c.tags].join(' ').toLocaleLowerCase().includes(query));
    found.sort((a,b)=>$('sort').value==='reviews'?b.reviews-a.reviews:$('sort').value==='name'?a.name.localeCompare(b.name):b.rating-a.rating || b.reviews-a.reviews);
    $('cards').replaceChildren(...found.map(card));
    $('result-count').textContent='找到 ' + found.length + ' 間咖啡廳 / 共收錄 ' + cafes.length + ' 間';
    $('empty').hidden=found.length>0;
    $('tags').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(chosen.has(b.dataset.tag))));
    if(found.length) selectCafe(found.find(c=>c.id===selected)||found[0]);
    else { selected=null; $('map-panel').hidden=true; $('map').removeAttribute('src'); }
  }
  tags.forEach(t=>{const b=el('button',t==='評分高'?'★ 評分高 · 4.5+':t); b.type='button';b.dataset.tag=t;b.addEventListener('click',()=>{chosen.has(t)?chosen.delete(t):chosen.add(t);render();});$('tags').append(b);});
  [...new Set(cafes.map(c=>c.area))].sort().forEach(area=>{const option=el('option',area);option.value=area;$('area').append(option);});
  function reset(){chosen.clear();$('search').value='';$('area').value='';$('sort').value='rating';render();}
  $('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
  $('search').addEventListener('input',render);$('area').addEventListener('change',render);$('sort').addEventListener('change',render);
  render();
})();
