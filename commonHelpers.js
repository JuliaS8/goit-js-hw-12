import{S as c,i as l}from"./assets/vendor-0fc460d7.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const d="44431480-fc282bb92f0a21d0f4ab058ec";async function f(n){const s=`https://pixabay.com/api/?key=${d}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const o=await fetch(s);if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return(await o.json()).hits}catch(o){throw console.error("Fetch error:",o),new Error(`Failed to fetch images: ${o.message}`)}}function u(n,s){s.innerHTML="";const o=n.map(t=>`
    <a href="${t.largeImageURL}" class="gallery-item">
      <img src="${t.webformatURL}" alt="${t.tags}" />
      <figcaption class="image-info">
        <div class="info-container">
          <div class="info-block">
            <strong>Likes</strong>
            <span>${t.likes}</span>
          </div>
          <div class="info-block">
            <strong>Views</strong>
            <span>${t.views}</span>
          </div>
          <div class="info-block">
            <strong>Comments</strong>
            <span>${t.comments}</span>
          </div>
          <div class="info-block">
            <strong>Downloads</strong>
            <span>${t.downloads}</span>
          </div>
        </div>
      </figcaption>
    </a>
  `).join("");s.innerHTML=o}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("search-form"),s=document.getElementById("gallery"),o=document.getElementById("loader");let t;n?n.addEventListener("submit",async r=>{r.preventDefault();const a=document.getElementById("search-query").value.trim();if(!a){e("Please enter a search query");return}try{o.classList.add("loader-show"),s.innerHTML="";const i=await f(a);i.length===0?e("Sorry, there are no images matching your search query. Please try again!"):(u(i,s),t?t.refresh():t=new c(".gallery a",{captions:!1,closeText:"×",history:!1}))}catch{e("Failed to fetch images. Please try again later.")}finally{o.classList.remove("loader-show")}}):console.error("Search form not found");function e(r){l.error({message:r,position:"topRight",timeout:5e3,messageColor:"#fff",backgroundColor:"#EF4040",theme:"dark",icon:"none"})}});
//# sourceMappingURL=commonHelpers.js.map
