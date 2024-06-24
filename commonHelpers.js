import{a as y,S as p,i as L}from"./assets/vendor-6682361c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const v="44431480-fc282bb92f0a21d0f4ab058ec",b="https://pixabay.com/api/";async function w(i,o=1,a=15){const r=`${b}?key=${v}&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${a}`;try{return(await y.get(r)).data}catch(e){throw console.error("Fetch error:",e),new Error(`Failed to fetch images: ${e.message}`)}}function E(i,o,a){a&&(o.innerHTML="");const r=i.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" />
      <figcaption class="image-info">
        <div class="info-container">
          <div class="info-block">
            <strong>Likes</strong>
            <span>${e.likes}</span>
          </div>
          <div class="info-block">
            <strong>Views</strong>
            <span>${e.views}</span>
          </div>
          <div class="info-block">
            <strong>Comments</strong>
            <span>${e.comments}</span>
          </div>
          <div class="info-block">
            <strong>Downloads</strong>
            <span>${e.downloads}</span>
          </div>
        </div>
      </figcaption>
    </a>
  `).join("");o.insertAdjacentHTML("beforeend",r)}document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("search-form"),o=document.getElementById("gallery"),a=document.getElementById("loader"),r=document.getElementById("load-more"),e=document.getElementById("load-more-loader");let t,s=1,d="",f=!1;function g(){const n=o.children[0];if(n){const c=n.getBoundingClientRect().height;scrollBy({top:c*3,behavior:"smooth"})}}i?i.addEventListener("submit",async n=>{if(n.preventDefault(),d=document.getElementById("search-query").value.trim(),s=1,!d){l("Please enter a search query");return}await m(!0)}):console.error("Search form not found"),r?r.addEventListener("click",async()=>{s+=1,e.classList.add("load-more-loader-show"),await m(!1)}):console.error("Load more button not found");async function m(n){try{n&&(a.classList.add("loader-show"),o.innerHTML="",r.style.display="none",f=!1);const c=await w(d,s),{hits:u,totalHits:h}=c;u.length===0&&s===1?l("Sorry, there are no images matching your search query. Please try again!"):(E(u,o,n),t?t.refresh():t=new p(".gallery a",{captions:!1,closeText:"×",history:!1}),s*9>=h?(r.style.display="none",l("We're sorry, but you've reached the end of search results.")):r.style.display="block",f?g():f=!0)}catch{l("Failed to fetch images. Please try again later.")}finally{a.classList.remove("loader-show"),e.classList.remove("load-more-loader-show")}}function l(n){L.error({message:n,position:"topRight",timeout:5e3,messageColor:"#fff",backgroundColor:"#EF4040",theme:"dark",icon:"none"})}});
//# sourceMappingURL=commonHelpers.js.map
