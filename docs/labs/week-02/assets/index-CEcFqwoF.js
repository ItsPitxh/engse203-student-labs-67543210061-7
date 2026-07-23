(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e({simulateError:e=!1}={}){if(e)throw Error(`Simulated error: data source is unavailable`);let t=await fetch(`./data/learning-tasks.json`);if(!t.ok)throw Error(`Unable to load tasks (HTTP ${t.status})`);let n=await t.json();if(!Array.isArray(n))throw Error(`The data source returned an invalid task collection`);return n}var t={todo:`To do`,doing:`In progress`,done:`Done`};function n(e){return t[e]??`Unknown`}function r(e,{query:t=``,status:n=`all`}={}){let r=t.trim().toLowerCase();return e.filter(e=>n===`all`||e.status===n).filter(({title:e,topic:t,tags:n=[]})=>[e,t,...n].join(` `).toLowerCase().includes(r)).sort((e,t)=>e.week-t.week)}function i(e){return e.reduce((e,{status:t})=>({...e,total:e.total+1,[t]:(e[t]??0)+1}),{total:0,todo:0,doing:0,done:0})}function a(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e])}function o(e,t,n){e.className=`message ${t}`,e.textContent=n}function s(e,t){e.innerHTML=[[`Total`,t.total],[`To do`,t.todo],[`In progress`,t.doing],[`Done`,t.done]].map(([e,t])=>`
        <article class="stat-card">
          <span>${e}</span>
          <strong>${t}</strong>
        </article>
      `).join(``)}function c(e,t){if(t.length===0){e.innerHTML=`
      <article class="empty-state">
        <h2>ไม่พบรายการที่ตรงกับเงื่อนไข</h2>
        <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
      </article>
    `;return}e.innerHTML=t.map(({week:e,title:t,topic:r,status:i,tags:o=[]})=>`
        <article class="task-card">
          <div class="task-meta">
            <span class="badge">Week ${e}</span>
            <span class="badge status-${a(i)}">${n(i)}</span>
          </div>
          <h2>${a(t)}</h2>
          <p>${a(r)}</p>
          <div class="tags">
            ${o.map(e=>`<span class="tag">${a(e)}</span>`).join(``)}
          </div>
        </article>
      `).join(``)}var l={message:document.querySelector(`#app-message`),stats:document.querySelector(`#stats`),taskList:document.querySelector(`#task-list`),search:document.querySelector(`#search`),status:document.querySelector(`#status-filter`)},u={tasks:[],query:``,status:`all`};function d(){let e=r(u.tasks,{query:u.query,status:u.status});s(l.stats,i(u.tasks)),c(l.taskList,e)}async function f(){try{o(l.message,`loading`,`กำลังโหลดข้อมูล...`),u.tasks=await e({simulateError:new URLSearchParams(window.location.search).get(`simulateError`)===`1`}),d(),o(l.message,`success`,`โหลดข้อมูล ${u.tasks.length} รายการแล้ว`)}catch(e){console.error(`Unable to load dashboard:`,e),l.stats.innerHTML=``,l.taskList.innerHTML=``,o(l.message,`error`,`ไม่สามารถโหลดข้อมูลได้: ${e.message}`)}finally{console.info(`Learning Dashboard load attempt finished.`)}}l.search.addEventListener(`input`,e=>{u.query=e.target.value,d()}),l.status.addEventListener(`change`,e=>{u.status=e.target.value,d()}),f();