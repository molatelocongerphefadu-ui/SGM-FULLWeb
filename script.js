/* Stylco Group Manufacturing: all site behaviour. Edit the CONFIG block below to change content. */
/* ============ EDITABLE CONFIG ============
 CONTACT: replace the "[Add …]" values with real details.
 Images, product text and partner logos are edited directly in index.html. */
var CONTACT={Email:"micheles@stylco.tv",Phone:"+27 11 314 1431",Address:"133 Eloff Street | Selby Extension | Johannesburg | South Africa",WhatsApp:"+27 82 950 2136"};
/* FORM: paste the address from your form service here, between the quotes (e.g. "https://formspree.io/f/abc123").
   Web3Forms also needs its access key in FORM_KEY. Leave FORM_KEY empty for Formspree. */
var FORM_ENDPOINT="https://formspree.io/f/xyekaoey";
var FORM_KEY="";
var STEPS=[["Design","Concepts shaped around practical everyday use."],["Material Selection","Materials chosen to suit each product."],["Manufacturing","Components made and assembled with consistency."],["Finishing","Surfaces and finishes applied with care."],["Quality Control","Each piece checked before it leaves."],["Delivery","Finished furniture prepared and delivered."]];
/* ========================================= */
/* ---------- Helpers ---------- */
/* Returns a harmless dummy element when a page does not contain the selector, so one script can serve every page. */
var $=function(s){return document.querySelector(s)||document.createElement("div")};
/* ---------- Category list (used for the footer links and enquiry dropdown) ---------- */
var PRODUCTS=[{id: "bedroom-suites", name: "Bedroom Suites"}, {id: "living-lifestyle", name: "Living Lifestyle"}, {id: "desks", name: "Desks"}, {id: "wardrobes", name: "Wardrobes"}, {id: "kitchen-units", name: "Kitchen Units"}, {id: "bookshelves", name: "Bookcases & Bookshelves"}, {id: "kists", name: "Kists"}];
/* ---------- Render the remaining generated content ---------- */
var pad=function(i){return String(i+1).padStart(2,"0")};
$("#steps").innerHTML=STEPS.map(function(s,i){return '<li class="rv"><b>'+pad(i)+'</b><h3>'+s[0]+'</h3><p>'+s[1]+'</p></li>'}).join("");
var ci=Object.keys(CONTACT);
$("#info").innerHTML=ci.map(function(k){return '<li><span>'+k+'</span><span>'+CONTACT[k]+'</span></li>'}).join("");
$("#fcontact").innerHTML=ci.map(function(k){return '<li>'+CONTACT[k]+'</li>'}).join("");
$("#fprod").innerHTML=PRODUCTS.map(function(p){return '<li><a href="'+p.id+'.html">'+p.name.replace("Bookcases & ","")+'</a></li>'}).join("");
$("#type").innerHTML+=PRODUCTS.map(function(p){return '<option>'+p.name+'</option>'}).join("")+"<option>Manufacturing partnership</option><option>General enquiry</option>";
/* ---------- Close the mobile menu after choosing a link ---------- */
document.addEventListener("click",function(e){if(e.target.closest(".links a"))setMenu(false)});
/* ---------- Pre-fill the enquiry form when arriving from a product page (?category=...&product=...) ---------- */
var qs=new URLSearchParams(location.search);
if(qs.get("product")){$("#type").value=qs.get("category")||"";$("#message").value="I would like a quote for: "+qs.get("product")+" ("+(qs.get("category")||"")+")."}
/* ---------- Navigation: mobile menu, sticky header, active link ---------- */
var hdr=$("#hdr"),links=$("#links"),bg=$("#burger");
function setMenu(o){links.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":""}
bg.onclick=function(){setMenu(!links.classList.contains("open"))};
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
function onS(){hdr.classList.toggle("solid",scrollY>40)}onS();addEventListener("scroll",onS,{passive:true});
var map={};document.querySelectorAll(".links a[href^='#']").forEach(function(a){map[a.hash.slice(1)]=a});
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var k=e.target.id==="mission"?"about":e.target.id==="capabilities"?"manufacturing":e.target.id;
 Object.keys(map).forEach(function(x){map[x].classList.toggle("active",x===k)})}})},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section").forEach(function(s){io2.observe(s)});
/* ---------- Scroll reveal animations ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(function(el,i){el.style.transitionDelay=(i%3)*80+"ms";io.observe(el)});
/* ---------- Contact form validation ---------- */
var form=$("#form");
form.addEventListener("submit",function(e){e.preventDefault();var bad=false;
 form.querySelectorAll("[required]").forEach(function(f){var f0=f.closest(".f"),m=f0.querySelector(".msg"),v=f.value.trim(),err="";
  if(!v)err="This field is required.";else if(f.type==="email"&&!/^\S+@\S+\.\S+$/.test(v))err="Enter a valid email address.";
  f0.classList.toggle("err",!!err);m.textContent=err;f.setAttribute("aria-invalid",!!err);if(err)bad=true});
 if(bad){form.querySelector(".err input,.err select,.err textarea").focus();return}
 var b=$("#send"),ok=$("#ok");
 function show(good,t){ok.textContent=t;ok.classList.toggle("bad",!good);ok.style.display="block"}
 if(!FORM_ENDPOINT){show(false,"The form is not connected yet. Please contact us directly.");return}
 b.disabled=true;b.textContent="Sending…";
 var data={};new FormData(form).forEach(function(v,k){data[k]=v});
 if(FORM_KEY)data.access_key=FORM_KEY;
 fetch(FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
  .then(function(r){if(!r.ok)throw new Error(r.status);form.reset();show(true,"Thank you. Your enquiry has been sent. We will be in touch.")})
  .catch(function(){show(false,"Sorry, your enquiry could not be sent. Please try again or contact us directly.")})
  .finally(function(){b.disabled=false;b.textContent="Send Enquiry"})});


/* ---------- Search ---------- */
/* To make a new product findable, add its name to the "k" keywords of its category. */
var SEARCH_INDEX=[
 {t:"Bedroom Suites",u:"bedroom-suites.html",k:"bedroom headboard headboards pedestal pedestals bedside table dresser dressers chest chests mirror mirrors"},
 {t:"Living Lifestyle",u:"living-lifestyle.html",k:"living lounge tv stand stands coffee table tables"},
 {t:"Desks",u:"desks.html",k:"desk desks office workspace study"},
 {t:"Wardrobes",u:"wardrobes.html",k:"wardrobe wardrobes closet storage"},
 {t:"Kitchen Units",u:"kitchen-units.html",k:"kitchen units cupboard cupboards"},
 {t:"Bookcases & Bookshelves",u:"bookshelves.html",k:"bookcase bookcases bookshelf bookshelves books shelf shelves"},
 {t:"Kists",u:"kists.html",k:"kist kists trunk storage box"}];
(function(){
 var links=document.querySelector(".links");if(!links)return;
 var f=document.createElement("form");f.className="search";f.setAttribute("role","search");f.setAttribute("autocomplete","off");
 f.innerHTML='<button class="search-btn" type="button" aria-label="Search products" aria-expanded="false"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button><label class="sr" for="searchInput">Search products</label><input id="searchInput" type="search" placeholder="Search products…"><ul class="results" hidden></ul>';
 links.insertBefore(f,links.querySelector(".btn"));
 var btn=f.querySelector(".search-btn"),inp=f.querySelector("input"),ul=f.querySelector(".results");
 function toggle(o){f.classList.toggle("open",o);btn.setAttribute("aria-expanded",o);if(o)inp.focus();else{inp.value="";ul.hidden=true}}
 function show(){var q=inp.value.trim().toLowerCase();if(!q){ul.hidden=true;return}
  var hits=SEARCH_INDEX.filter(function(p){return(p.t+" "+p.k).toLowerCase().indexOf(q)>-1});
  ul.innerHTML=hits.length?hits.map(function(p){return'<li><a href="'+p.u+'">'+p.t.replace(/&/g,"&amp;")+'</a></li>'}).join(""):'<li class="none">No products found</li>';ul.hidden=false}
 btn.addEventListener("click",function(){toggle(!f.classList.contains("open"))});
 inp.addEventListener("input",show);
 f.addEventListener("submit",function(e){e.preventDefault();var a=ul.querySelector("a");if(a)location.href=a.getAttribute("href")});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")toggle(false)});
 document.addEventListener("click",function(e){if(!f.contains(e.target))toggle(false)});
})();
