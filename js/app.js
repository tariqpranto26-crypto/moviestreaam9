/* MovieStream shared chrome + components */
const BRAND1="Movie", BRAND2="Stream";
document.documentElement.setAttribute("lang", document.documentElement.lang||"en");

const ICONS={
search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></svg>',
film:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4"/></svg>',
tv:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 21h6"/></svg>',
spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2"/></svg>',
flame:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3c1 3-2 4.5-2 7a4 4 0 0 0 8 .5C18.5 7 14 6 12 3Z"/><path d="M12 21a6.5 6.5 0 0 1-6.5-6.5c0-1 .3-2 .8-2.8C8 13.5 10 15 12 15s4-1.5 5.7-3.3c.5.8.8 1.8.8 2.8A6.5 6.5 0 0 1 12 21Z"/></svg>',
heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.5A4.5 4.5 0 0 1 8 5c1.6 0 3.1.9 4 2.3A4.5 4.5 0 0 1 16 5a4.5 4.5 0 0 1 4.5 4.5c0 3.8-3.5 7-8.5 11Z"/></svg>',
x:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11.1 14.3Z"/></svg>',
fb:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.5 1.6-1.5h1.5V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H7.8v3h2.6v7h3.1Z"/></svg>',
reddit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="14" r="6"/><circle cx="9.5" cy="13.5" r=".8" fill="currentColor"/><circle cx="14.5" cy="13.5" r=".8" fill="currentColor"/><path d="M10 16.2c.7.4 1.3.6 2 .6s1.3-.2 2-.6M18.5 9.5c.8-.3 1.5-1 1.8-1.9M5.5 9.5C4.7 9.2 4 8.5 3.7 7.6M15 5.5c2 0 3.8.7 5 1.9M9 5.5C7 5.5 5.2 6.2 4 7.4"/></svg>',
send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z"/></svg>'
};

function headerHTML(active){
  const nav=[["index.html","Home"],["movies.html","Movies"],["tv.html","TV Shows"],["anime.html","Anime"],["trending.html","Trending"],["my-reelix.html","My Reelix"]];
  const links=nav.map(([h,l])=>`<a href="${h}" ${active===l?'aria-current="page"':""}>${l}</a>`).join("");
  return `<a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header"><div class="bar">
    <a class="wordmark" href="index.html" aria-label="MovieStream home"><span class="w1">${BRAND1}</span><span class="w2">${BRAND2}</span></a>
    <nav class="main-nav" aria-label="Primary">${links}</nav>
    <div class="header-right">
      <button class="icon-btn" id="hdr-search" aria-label="Search">${ICONS.search}</button>
      <button class="lang-btn" id="lang-btn" aria-label="Language menu">EN</button>
      <button class="btn btn-secondary btn-sm" id="signin-btn">Sign in</button>
    </div>
  </div></header>`;
}
function tabbarHTML(active){
  const items=[["index.html","Home",ICONS.home],["movies.html","Movies",ICONS.film],["tv.html","TV",ICONS.tv],["anime.html","Anime",ICONS.spark],["trending.html","Trending",ICONS.flame],["my-reelix.html","My List",ICONS.heart]];
  return `<nav class="tabbar" aria-label="Mobile">${items.map(([h,l,i])=>`<a href="${h}" ${active===l||(active==="My Reelix"&&l==="My List")?'aria-current="page"':""}><span class="ico" aria-hidden="true">${i}</span><span>${l}</span></a>`).join("")}</nav>`;
}
function footerHTML(){
  return `<footer class="site"><div class="container"><nav aria-label="Footer">
    <a href="about.html">About</a><a href="dmca.html">DMCA</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms of use</a><a href="settings.html">Settings</a>
    </nav><p class="attrib">This product uses the TMDB API but is not endorsed or certified by TMDB. Artwork shown for discovery. Video sources must be ones you have the right to show.</p></div></footer>`;
}
function mountChrome(active){
  document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  document.body.insertAdjacentHTML("beforeend", tabbarHTML(active)+footerHTML()+signinModalHTML()+`<div class="modal-back" id="lang-modal" hidden><div class="modal" role="dialog" aria-modal="true" aria-label="Language"><h2>Language</h2><p class="lead">How the interface talks to you.</p><select id="lang-select" aria-label="Interface language"><option>English</option><option>Espa\u00f1ol</option><option>Fran\u00e7ais</option><option>\u0627\u0644\u0639\u0631\u0628\u064a\u0629</option></select><p><button class="btn btn-primary" id="lang-close">Done</button></p></div></div>`);
  const mc=document.querySelector("main"); if(mc&&!mc.id) mc.id="main-content";
  document.getElementById("signin-btn").onclick=()=>{const u=store("user");location.href=u?"my-reelix.html":"login.html?next="+encodeURIComponent(location.pathname+location.search);};
  document.getElementById("modal-close").onclick=()=>showModal(false);
  document.getElementById("modal-back").addEventListener("click",e=>{if(e.target.id==="modal-back")showModal(false);});
  document.getElementById("lang-btn").onclick=()=>{document.getElementById("lang-modal").hidden=false;};
  document.getElementById("lang-close").onclick=()=>{document.getElementById("lang-modal").hidden=true;};
  document.getElementById("hdr-search").onclick=()=>{location.href="index.html#search";};
  const form=document.getElementById("signin-form");
  if(form)form.addEventListener("submit",e=>{e.preventDefault();store("user",{email:document.getElementById("signin-email").value});showModal(false);renderSignin();alert("Signed in. List, history and username now sync to this email.");});
  renderSignin();
  wireRails();
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){showModal(false);const lm=document.getElementById("lang-modal");if(lm)lm.hidden=true;}});
}
function renderSignin(){const u=store("user");const b=document.getElementById("signin-btn");if(b)b.textContent=u?"Account":"Sign in";}
function showModal(on){document.getElementById("modal-back").hidden=!on;if(on)document.getElementById("signin-email").focus();}
function signinModalHTML(){
  return `<div class="modal-back" id="modal-back" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="si-h"><h2 id="si-h">Sign in</h2><p class="lead">Watchlist, history and username load on any device when you sign in with this email.</p><form id="signin-form"><div class="field"><label for="signin-email">Email</label><input id="signin-email" type="email" required placeholder="you@example.com" autocomplete="email"></div><p style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" type="submit">Send code</button><button class="btn btn-secondary" type="button" id="modal-close">Close</button></p></form><p class="auth-switch" style="text-align:left">Prefer the full page? <a href="login.html">Log in</a> · <a href="signup.html">Sign up</a></p></div></div>`;
}
function cardHTML(t,eager){
  const m=metaLine(t);
  return `<a class="card" href="detail.html?id=${t.id}" aria-label="${t.title}, ${t.year}, ${t.type}"><span class="imgwrap"><img src="${poster(t)}" alt="${t.title} poster" loading="${eager?"eager":"lazy"}" width="300" height="450" onerror="this.outerHTML='<span class=\\'fallback\\'>${t.title}</span>'"></span><span class="t">${t.title}</span><span class="m"><span class="star" aria-hidden="true">\u2605</span> ${m.r} &bull; ${m.y} &bull; ${m.ty}</span></a>`;
}
function railHTML(id,title,moreHref,items,sub){
  return `<section class="block" aria-labelledby="${id}"><div class="rail-head"><div><h2 id="${id}">${title}</h2>${sub?`<p class="sub">${sub}</p>`:""}</div><a class="link-more" href="${moreHref}">View more</a></div>
  <div class="rail"><button class="rail-arrow left" aria-label="Scroll ${title} back" data-rail="${id}" data-dir="-1">‹</button><div class="rail-scroller" id="rail-${id}" tabindex="0" aria-label="${title} titles">${items.map((t,i)=>cardHTML(t,i<4)).join("")}</div><button class="rail-arrow right" aria-label="Scroll ${title} forward" data-rail="${id}" data-dir="1">›</button></div></section>`;
}
function wireRails(scope=document){
  scope.querySelectorAll(".rail-arrow").forEach(b=>{
    if(b.dataset.wired)return;b.dataset.wired="1";
    b.onclick=()=>{
      const sc=document.getElementById("rail-"+b.dataset.rail);
      if(!sc)return;
      sc.scrollBy({left:Number(b.dataset.dir)*sc.clientWidth*.85,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    };
  });
}
function shareHTML(count){
  return `<div class="share" aria-label="Share"><span>Friends need MovieStream too?</span>
  <button class="icon-btn sm" aria-label="Share on X" onclick="bumpShare(this)">${ICONS.x}</button>
  <button class="icon-btn sm" aria-label="Share on Facebook" onclick="bumpShare(this)">${ICONS.fb}</button>
  <button class="icon-btn sm" aria-label="Share on Reddit" onclick="bumpShare(this)">${ICONS.reddit}</button>
  <button class="icon-btn sm" aria-label="Share on Telegram" onclick="bumpShare(this)">${ICONS.send}</button>
  <span class="count"><b id="share-n">${count||1282}</b> shares</span></div>`;
}
function bumpShare(){const el=document.getElementById("share-n");if(el)el.textContent=Number(el.textContent.replace(/\D/g,""))+1;}
function skeletons(n=8){return Array.from({length:n},()=>'<div class="skel" aria-hidden="true"></div>').join("");}
function emptyBox(msg,href,label){return `<div class="empty"><p>${msg}</p><p><a class="btn btn-secondary" href="${href}">${label}</a></p></div>`;}

/* Listing helper: filter/sort/paginate 32 per page, cap 10 */
function runListing(cfg){
  const qs=new URLSearchParams(location.search);
  const sort=qs.get("sort")||"popular", genre=qs.get("genre")||"All", page=Math.min(10,Math.max(1,Number(qs.get("page")||1)));
  const grid=document.getElementById("grid");
  grid.innerHTML=skeletons(16);
  requestAnimationFrame(()=>{
  let items=CATALOG.filter(cfg.filter);
  if(genre!=="All")items=items.filter(t=>t.genres.includes(genre));
  const sorts={popular:(a,b)=>b.pop-a.pop,newest:(a,b)=>b.year-a.year,oldest:(a,b)=>a.year-b.year,rating:(a,b)=>(b.rating||0)-(a.rating||0)};
  items=[...items].sort(sorts[sort]||sorts.popular);
  const per=32,total=Math.min(10,Math.max(1,Math.ceil(items.length/per)));
  const cur=Math.min(page,total),slice=items.slice((cur-1)*per,cur*per);
  grid.innerHTML=slice.length?slice.map((t,i)=>cardHTML(t,i<8)).join(""):emptyBox("Nothing here yet. Try another genre.","trending.html","Browse trending");
  const pg=document.getElementById("pager");
  const link=p=>{const q=new URLSearchParams({sort,genre,page:p});return location.pathname+"?"+q.toString();};
  let nums="";for(let p=1;p<=total;p++){if(total>6&&(p>3&&p<total&&Math.abs(p-cur)>1)){if(!nums.endsWith("\u2026"))nums+='<span>\u2026</span>';continue;}nums+=p===cur?`<span aria-current="page">${p}</span>`:`<a href="${link(p)}">${p}</a>`;}
  pg.innerHTML=(cur>1?`<a href="${link(cur-1)}" aria-label="Previous page">\u2039</a>`:"")+nums+(cur<total?`<a href="${link(cur+1)}" aria-label="Next page">\u203a</a>`:"");
  document.querySelectorAll("[data-sort]").forEach(a=>{const s=a.dataset.sort;a.href=location.pathname+"?"+new URLSearchParams({sort:s,genre,page:1}).toString();if(s===sort)a.setAttribute("aria-selected","true");});
  document.querySelectorAll("[data-genre]").forEach(c=>{const g=c.dataset.genre;c.href=location.pathname+"?"+new URLSearchParams({sort,genre:g,page:1}).toString();if(g===genre)c.setAttribute("aria-pressed","true");});
  });
}
/* Watchlist helpers */
function getList(){return store("watchlist")||[];}
function inList(id){return getList().includes(Number(id));}
function toggleList(id){let l=getList();id=Number(id);l=l.includes(id)?l.filter(x=>x!==id):[...l,id];store("watchlist",l);return l.includes(id);}
