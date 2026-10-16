/* Shared email-code auth (local demo, no backend). Any 6-digit code verifies. */
function authNext(){const q=new URLSearchParams(location.search).get("next");return q&&q.startsWith("/")?q:"my-reelix.html";}
function authEmailOk(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v||"").trim());}
function authWire(opts){
  // opts: {mode:"login"|"signup", emailId, userId?, codeId, step1, step2, err1, err2, sendBtn, verifyBtn, resendBtn, backBtn, codeHint, switchNext}
  const $=id=>document.getElementById(id);
  const step1=$(opts.step1), step2=$(opts.step2);
  const emailEl=$(opts.emailId), codeEl=$(opts.codeId);
  const err1=$(opts.err1), err2=$(opts.err2);
  let cooldown=0, timer=null;
  function showStep(n){step1.hidden=n!==1;step2.hidden=n!==2;if(n===2)codeEl.focus();else emailEl.focus();}
  function setErr(el,msg){el.textContent=msg||"";}
  function startCooldown(){
    cooldown=30;const rb=$(opts.resendBtn);
    clearInterval(timer);
    timer=setInterval(()=>{
      cooldown-=1;
      if(cooldown<=0){clearInterval(timer);rb.disabled=false;rb.textContent="Resend code";}
      else{rb.disabled=true;rb.textContent="Resend in "+cooldown+"s";}
    },1000);
    rb.disabled=true;rb.textContent="Resend in 30s";
  }
  $(opts.sendBtn).onclick=()=>{
    const email=emailEl.value.trim();
    if(opts.mode==="signup"){
      const u=$(opts.userId).value.trim();
      if(u.length<2){setErr(err1,"Enter a username with at least 2 characters.");return;}
      if(!authEmailOk(email)){setErr(err1,"Enter a valid email address.");return;}
    }else if(!authEmailOk(email)){setErr(err1,"Enter a valid email address.");return;}
    setErr(err1,"");
    try{sessionStorage.setItem("ms-pending-email",email);
      if(opts.mode==="signup")sessionStorage.setItem("ms-pending-user",$(opts.userId).value.trim());
    }catch(e){}
    $(opts.codeHint).textContent="Code sent to "+email+". Demo build: enter any 6 digits.";
    showStep(2);startCooldown();
  };
  $(opts.resendBtn).onclick=()=>{$(opts.codeHint).textContent="New code sent. Demo build: enter any 6 digits.";startCooldown();};
  if($(opts.backBtn))$(opts.backBtn).onclick=()=>showStep(1);
  $(opts.verifyBtn).onclick=()=>{
    const code=(codeEl.value||"").replace(/\D/g,"");
    if(code.length!==6){setErr(err2,"Enter the 6-digit code.");return;}
    setErr(err2,"");
    let email="";try{email=sessionStorage.getItem("ms-pending-email")||emailEl.value.trim();}catch(e){email=emailEl.value.trim();}
    let username="";
    try{username=sessionStorage.getItem("ms-pending-user")||"";}catch(e){}
    if(!username)username=email.split("@")[0]||"viewer";
    const prev=store("user")||{};
    store("user",{email,username,at:Date.now(),isNew:opts.mode==="signup"||prev.email!==email});
    try{sessionStorage.removeItem("ms-pending-email");sessionStorage.removeItem("ms-pending-user");}catch(e){}
    renderSignin();
    location.href=authNext();
  };
  codeEl.addEventListener("input",()=>{codeEl.value=codeEl.value.replace(/\D/g,"").slice(0,6);});
  emailEl.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$(opts.sendBtn).click();}});
  codeEl.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$(opts.verifyBtn).click();}});
  showStep(1);
}
function authSignedInBox(elId){
  const u=store("user");const el=document.getElementById(elId);
  if(!u||!el)return false;
  el.innerHTML=`<span class="badge">Signed in</span><h1>You're in, ${String(u.username||u.email.split("@")[0]).replace(/</g,"&lt;")}.</h1>
  <p class="lead">Watchlist, history and username load on any device when you sign in with this email.</p>
  <p style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-primary" href="${authNext()}">Continue browsing</a><button class="btn btn-secondary" id="auth-logout">Log out</button></p>`;
  document.getElementById("auth-logout").onclick=()=>{store("user",null);renderSignin();location.reload();};
  return true;
}
