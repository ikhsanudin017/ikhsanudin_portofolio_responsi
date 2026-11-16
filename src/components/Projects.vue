<template>
  <section id="projects" class="projects-section" aria-labelledby="projects-title">
    <div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div>
    <div class="projects-shell">
      <header v-reveal class="projects-heading">
        <div><span class="kicker"><i></i> Selected work / 2024—2026</span><h2 id="projects-title">Proyek <em>unggulan.</em></h2></div>
        <p>Eksplorasi produk digital yang memadukan desain, teknologi, dan pengalaman pengguna.</p>
      </header>

      <div v-if="projects.length" class="carousel" role="region" aria-roledescription="carousel" aria-label="Proyek unggulan" tabindex="0"
        @keydown.left.prevent="previous" @keydown.right.prevent="next" @mouseenter="paused = true" @mouseleave="paused = false"
        @focusin="paused = true" @focusout="paused = false" @pointerdown="startSwipe" @pointerup="finishSwipe" @pointercancel="swipeStart = null">
        <div class="viewport">
          <div class="track" :style="{ transform: `translate3d(-${active * 100}%,0,0)` }">
            <article v-for="(project, index) in projects" :key="project.id" class="slide" :class="{ active: index === active }"
              :aria-hidden="index !== active" :inert="index !== active" :aria-label="`${index + 1} dari ${projects.length}: ${project.title}`">
              <div class="visual" @pointermove="moveSpotlight" @pointerleave="resetSpotlight">
                <img :src="project.image" alt="" class="image-backdrop" aria-hidden="true">
                <div class="visual-grid"></div>
                <div class="motion-lines" aria-hidden="true"><i></i><i></i><i></i></div>
                <div class="media-frame"><img :src="project.image" :alt="`Tampilan lengkap ${project.title}`" class="project-image"><span class="scan-beam"></span></div>
                <div class="shade"></div><div class="spotlight"></div>
                <div class="visual-top"><span>PROJECT_{{ pad(index + 1) }}</span><span class="signal"><i></i> FEATURED</span></div>
                <div class="corners"><i></i><i></i><i></i><i></i></div><div class="coordinate">06°12'18.0"S<br>106°49'45.0"E</div>
              </div>
              <div class="project-copy">
                <div class="index"><span>{{ pad(index + 1) }}</span><i></i><small>{{ pad(projects.length) }}</small></div>
                <div class="copy-body">
                  <p class="label">Case study</p><h3>{{ project.title }}</h3><p class="description">{{ project.description }}</p>
                  <ul class="tech" :aria-label="`Teknologi ${project.title}`"><li v-for="item in techList(project.tech)" :key="item">{{ item }}</li></ul>
                  <div class="actions">
                    <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="link primary">Lihat proyek <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                    <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="link ghost" aria-label="Buka kode sumber di GitHub"><svg viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 .7A11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"/></svg> Source</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <footer class="carousel-footer">
          <div class="controls"><button @click="previous" aria-label="Proyek sebelumnya"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button><button @click="next" aria-label="Proyek berikutnya"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button></div>
          <div class="pagination" aria-label="Pilih proyek"><button v-for="(project,index) in projects" :key="`dot-${project.id}`" :class="{active:index===active}" :aria-label="`Tampilkan ${project.title}`" :aria-current="index===active?'true':undefined" @click="goTo(index)"><span></span></button></div>
          <p class="hint"><span>SWIPE</span> / gunakan tombol panah</p>
        </footer>
      </div>
      <div v-else class="loading" role="status"><span></span><span></span><span></span><p>Menyiapkan proyek terbaik...</p></div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motionEnabled } from '../composables/useMotion'
import { mergeProjects } from '../data/projects'

const projects = ref(mergeProjects()), active = ref(0), paused = ref(false), swipeStart = ref(null)
let timer
const pad = value => String(value).padStart(2, '0')
function techList(tech) { if (Array.isArray(tech)) return tech; if (typeof tech !== 'string') return []; try { const value = JSON.parse(tech); return Array.isArray(value) ? value : [tech] } catch { return tech.split(',').map(v => v.trim()).filter(Boolean) } }
function goTo(index) { if (projects.value.length) active.value = (index + projects.value.length) % projects.value.length }
const next = () => goTo(active.value + 1), previous = () => goTo(active.value - 1)
function startSwipe(e) { if (e.pointerType !== 'mouse' || e.button === 0) swipeStart.value = { x:e.clientX, y:e.clientY } }
function finishSwipe(e) { if (!swipeStart.value) return; const x=e.clientX-swipeStart.value.x, y=e.clientY-swipeStart.value.y; if (Math.abs(x)>50 && Math.abs(x)>Math.abs(y)) x<0?next():previous(); swipeStart.value=null }
function moveSpotlight(e) { const r=e.currentTarget.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height; e.currentTarget.style.setProperty('--x',`${px*100}%`); e.currentTarget.style.setProperty('--y',`${py*100}%`); e.currentTarget.style.setProperty('--tilt-x',`${(0.5-py)*4}deg`); e.currentTarget.style.setProperty('--tilt-y',`${(px-0.5)*5}deg`) }
function resetSpotlight(e) { e.currentTarget.style.setProperty('--x','50%'); e.currentTarget.style.setProperty('--y','50%'); e.currentTarget.style.setProperty('--tilt-x','0deg'); e.currentTarget.style.setProperty('--tilt-y','0deg') }
function autoplay() { clearTimeout(timer); if (motionEnabled.value && !paused.value && projects.value.length>1 && !document.hidden) timer=setTimeout(next,6500) }
watch([active,paused,motionEnabled],autoplay)
onMounted(async()=>{ document.addEventListener('visibilitychange',autoplay); autoplay(); try { const response=await fetch('/api/projects'); if(!response.ok) throw new Error(`HTTP ${response.status}`); projects.value=mergeProjects(await response.json()) } catch(error) { console.error('Gagal mengambil data projects:',error) } })
onBeforeUnmount(()=>{ clearTimeout(timer); document.removeEventListener('visibilitychange',autoplay) })
</script>

<style scoped>
.projects-section{position:relative;overflow:hidden;padding:8rem 0;background:linear-gradient(180deg,transparent,rgba(3,12,25,.28) 45%,transparent);color:#eaf6ff;isolation:isolate}.projects-section:before{content:'';position:absolute;inset:12% -10% auto;height:520px;z-index:-2;background:radial-gradient(circle at 50% 45%,rgba(17,211,202,.09),transparent 57%)}
.projects-shell{width:min(1240px,calc(100% - 48px));margin:auto}.projects-heading{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.65fr);align-items:end;gap:3rem;margin-bottom:3.5rem}.kicker{display:flex;align-items:center;gap:.75rem;margin-bottom:1.15rem;color:#5eead4;font:700 .69rem/1.2 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}.kicker i{width:28px;height:1px;background:currentColor;box-shadow:0 0 12px currentColor}.projects-heading h2{margin:0;color:#e8f5ff;font-size:clamp(2.9rem,6vw,6rem);font-weight:700;line-height:.92;letter-spacing:-.065em}.projects-heading h2 em{color:transparent;font-style:normal;-webkit-text-stroke:1px rgba(148,224,234,.72)}.projects-heading>p{max-width:420px;margin:0 0 .4rem;padding-left:1.3rem;border-left:1px solid rgba(94,234,212,.35);color:#8da4b8;font-size:.98rem;line-height:1.75}
.orbit{position:absolute;z-index:-1;top:38%;left:50%;border:1px solid rgba(34,211,238,.08);border-radius:50%;pointer-events:none}.orbit-one{width:880px;height:280px;transform:translate(-50%,-50%) rotate(9deg)}.orbit-two{width:1080px;height:390px;transform:translate(-50%,-50%) rotate(-7deg)}.orbit:after{content:'';position:absolute;top:50%;left:-3px;width:6px;height:6px;border-radius:50%;background:#5eead4;box-shadow:0 0 18px 5px rgba(94,234,212,.55);animation:pulse 2.4s ease-in-out infinite}
.carousel{outline:none;user-select:none}.carousel:focus-visible .viewport{outline:2px solid #67e8f9;outline-offset:6px}.viewport{overflow:hidden;border-radius:2px 30px 2px 2px}.track{display:flex;transition:transform .9s cubic-bezier(.22,.75,.18,1);will-change:transform}.slide{display:grid;flex:0 0 100%;grid-template-columns:minmax(0,1.52fr) minmax(340px,.82fr);min-height:560px;opacity:.28;transition:opacity .55s}.slide.active{opacity:1}
.visual{--x:50%;--y:50%;--tilt-x:0deg;--tilt-y:0deg;position:relative;height:560px;min-width:0;overflow:hidden;background:#06111e;perspective:1200px}.image-backdrop{position:absolute;inset:-8%;width:116%;height:116%;object-fit:cover;filter:blur(28px) saturate(.8) brightness(.32);transform:scale(1.08);opacity:.9}.media-frame{position:absolute;z-index:2;inset:54px 34px 50px;display:grid;place-items:center;overflow:hidden;background:rgba(4,14,25,.62);border:1px solid rgba(134,226,235,.2);box-shadow:0 30px 70px rgba(0,0,0,.4),inset 0 0 45px rgba(1,8,16,.5);transform:rotateX(var(--tilt-x)) rotateY(var(--tilt-y));transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s}.visual:hover .media-frame{border-color:rgba(94,234,212,.52)}.project-image{display:block;width:100%;height:100%;object-fit:contain;filter:saturate(.88) contrast(1.02) brightness(.92);transition:filter .8s}.slide.active .media-frame{animation:frame-arrive 1.05s cubic-bezier(.16,.8,.25,1) both}.slide.active .project-image{animation:image-reveal 1.15s cubic-bezier(.16,.8,.25,1) both}.visual:hover .project-image{filter:saturate(1) contrast(1.01) brightness(.98)}.scan-beam{position:absolute;inset:0 auto 0 -35%;width:24%;background:linear-gradient(90deg,transparent,rgba(116,244,232,.16),transparent);transform:skewX(-14deg);pointer-events:none}.slide.active .scan-beam{animation:scan 3.8s 1s ease-in-out infinite}.motion-lines{position:absolute;z-index:1;inset:0;overflow:hidden;pointer-events:none}.motion-lines i{position:absolute;right:-30%;width:70%;height:1px;background:linear-gradient(90deg,transparent,rgba(94,234,212,.46),transparent);transform:rotate(-14deg)}.motion-lines i:nth-child(1){top:24%;animation:line-travel 5s linear infinite}.motion-lines i:nth-child(2){top:55%;animation:line-travel 6.5s 1.2s linear infinite}.motion-lines i:nth-child(3){top:78%;animation:line-travel 4.4s 2.1s linear infinite}.visual-grid{position:absolute;inset:0;z-index:1;opacity:.18;background-image:linear-gradient(rgba(103,232,249,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(103,232,249,.12) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(to bottom right,#000,transparent 75%)}.shade{position:absolute;inset:0;z-index:3;background:linear-gradient(90deg,rgba(2,10,21,.28),transparent 32%,transparent 70%,rgba(2,10,21,.2)),linear-gradient(0deg,rgba(2,10,21,.65),transparent 35%);pointer-events:none}.spotlight{position:absolute;inset:0;z-index:4;opacity:0;background:radial-gradient(300px circle at var(--x) var(--y),rgba(94,234,212,.15),transparent 70%);transition:opacity .3s;pointer-events:none}.visual:hover .spotlight{opacity:1}.visual-top{position:absolute;z-index:5;top:28px;left:30px;right:30px;display:flex;justify-content:space-between;color:rgba(225,245,249,.78);font:600 .62rem ui-monospace,monospace;letter-spacing:.15em}.signal{display:flex;align-items:center;gap:.55rem}.signal i{width:6px;height:6px;border-radius:50%;background:#5eead4;box-shadow:0 0 11px #5eead4;animation:signal 1.8s infinite}.coordinate{position:absolute;z-index:5;left:30px;bottom:28px;color:rgba(218,244,246,.58);font:500 .58rem/1.55 ui-monospace,monospace;letter-spacing:.12em}.corners{position:absolute;inset:18px;z-index:5;pointer-events:none}.corners i{position:absolute;width:19px;height:19px;border-color:rgba(94,234,212,.78)}.corners i:nth-child(1){border-top:1px solid;border-left:1px solid}.corners i:nth-child(2){right:0;border-top:1px solid;border-right:1px solid}.corners i:nth-child(3){right:0;bottom:0;border-bottom:1px solid;border-right:1px solid}.corners i:nth-child(4){bottom:0;border-bottom:1px solid;border-left:1px solid}
.project-copy{position:relative;display:flex;flex-direction:column;overflow:hidden;padding:34px 42px 42px;background:linear-gradient(145deg,rgba(15,31,50,.98),rgba(7,19,34,.98));border:1px solid rgba(96,184,203,.18);border-left:0}.project-copy:after{content:'';position:absolute;right:-90px;bottom:-110px;width:260px;height:260px;border:1px solid rgba(45,212,191,.14);border-radius:50%;box-shadow:0 0 0 32px rgba(45,212,191,.025),0 0 0 64px rgba(45,212,191,.018)}.index{display:flex;align-items:center;width:100%;color:#ebfaff;font:300 1.5rem ui-monospace,monospace}.index i{flex:1;height:1px;margin:0 14px;background:linear-gradient(90deg,rgba(94,234,212,.45),rgba(94,234,212,.05))}.index small{color:#607689;font-size:.7rem}.copy-body{position:relative;z-index:2;display:flex;flex:1;flex-direction:column;justify-content:center;padding-top:36px}.label{margin:0 0 13px;color:#5eead4;font:700 .65rem ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase}.project-copy h3{margin:0;color:#effaff;font-size:clamp(2rem,3.2vw,3.35rem);font-weight:650;line-height:1.03;letter-spacing:-.045em;text-wrap:balance}.description{min-height:78px;margin:22px 0 24px;color:#9aafc1;font-size:.96rem;line-height:1.7}.tech{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 36px;padding:0;list-style:none}.tech li{padding:8px 11px;border:1px solid rgba(101,180,197,.22);color:#aac4d0;background:rgba(25,61,76,.18);font:650 .61rem ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase}.actions{display:flex;gap:12px}.link{display:inline-flex;align-items:center;justify-content:center;gap:11px;height:48px;padding:0 19px;border:1px solid rgba(94,234,212,.35);color:#dffbf7;font:700 .67rem ui-monospace,monospace;letter-spacing:.12em;text-decoration:none;text-transform:uppercase;transition:.3s}.link svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7}.primary{color:#05201f;background:#5eead4;border-color:#5eead4}.primary:hover{background:#a7f3e9;border-color:#a7f3e9;transform:translateY(-3px)}.ghost:hover{color:#5eead4;border-color:#5eead4;transform:translateY(-3px)}
.carousel-footer{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding-top:22px}.controls{display:flex;gap:8px}.controls button{display:grid;width:44px;height:44px;place-items:center;border:1px solid rgba(107,171,190,.28);color:#b8ccd5;background:rgba(7,24,39,.72);cursor:pointer;transition:.25s}.controls button:hover{color:#061818;background:#5eead4;border-color:#5eead4;transform:translateY(-2px)}.controls svg{width:20px;fill:none;stroke:currentColor;stroke-width:1.6}.pagination{display:flex;gap:8px}.pagination button{position:relative;width:38px;height:18px;padding:0;overflow:hidden;border:0;background:transparent;cursor:pointer}.pagination button:before{content:'';position:absolute;top:8px;left:0;width:100%;height:2px;background:rgba(119,158,172,.26)}.pagination span{position:absolute;top:8px;left:0;width:0;height:2px;background:#5eead4;box-shadow:0 0 8px rgba(94,234,212,.5)}.pagination button.active span{width:100%;animation:progress 6.5s linear both}.carousel:hover .pagination button.active span,.carousel:focus-within .pagination button.active span{animation-play-state:paused}.hint{justify-self:end;margin:0;color:#607789;font:600 .59rem ui-monospace,monospace;letter-spacing:.11em;text-transform:uppercase}.hint span{color:#94b5c0}.loading{display:flex;min-height:350px;align-items:center;justify-content:center;gap:7px;color:#87a0b2}.loading span{width:7px;height:7px;border-radius:50%;background:#5eead4;animation:loading 1s ease-in-out infinite alternate}.loading span:nth-child(2){animation-delay:.2s}.loading span:nth-child(3){animation-delay:.4s}.loading p{margin-left:10px;font:600 .65rem ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}
@keyframes frame-arrive{from{opacity:0;transform:translate3d(8%,0,-80px) rotateY(-5deg)}to{opacity:1;transform:translate3d(0,0,0) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))}}@keyframes image-reveal{from{opacity:.25;clip-path:inset(0 100% 0 0);transform:scale(1.035)}to{opacity:1;clip-path:inset(0);transform:scale(1)}}@keyframes scan{0%,18%{left:-35%}55%,100%{left:125%}}@keyframes line-travel{from{transform:translateX(0) rotate(-14deg)}to{transform:translateX(-180%) rotate(-14deg)}}@keyframes progress{from{width:0}to{width:100%}}@keyframes signal{50%{opacity:.35;transform:scale(.7)}}@keyframes pulse{50%{opacity:.3;transform:scale(.7)}}@keyframes loading{to{opacity:.25;transform:translateY(-5px)}}
@media(max-width:900px){.projects-section{padding:6.5rem 0}.projects-heading{grid-template-columns:1fr;gap:1.4rem}.projects-heading>p{max-width:570px}.slide{grid-template-columns:1fr;min-height:0}.visual{height:clamp(350px,58vw,500px)}.media-frame{inset:48px 32px 44px}.project-copy{min-height:400px;border-top:0;border-left:1px solid rgba(96,184,203,.18)}.description{min-height:auto}}
@media(max-width:640px){.projects-section{padding:5.5rem 0}.projects-shell{width:calc(100% - 28px)}.projects-heading{margin-bottom:2.25rem}.projects-heading h2{font-size:clamp(2.7rem,15vw,4.4rem)}.projects-heading>p{padding-left:1rem;font-size:.88rem}.kicker{font-size:.57rem;letter-spacing:.12em}.viewport{border-radius:2px 20px 2px 2px}.visual{height:clamp(250px,68vw,370px)}.media-frame{inset:39px 17px 37px}.visual-top{top:18px;left:18px;right:18px}.coordinate{left:18px;bottom:16px;font-size:.5rem}.corners{inset:10px}.project-copy{min-height:400px;padding:27px 24px 32px}.copy-body{padding-top:30px}.project-copy h3{font-size:clamp(2rem,11vw,3rem)}.description{margin:18px 0 22px;font-size:.9rem}.tech{margin-bottom:29px}.actions{flex-direction:column}.link{width:100%}.carousel-footer{grid-template-columns:1fr auto}.pagination{justify-self:end;gap:4px}.pagination button{width:18px}.hint{display:none}}
@media(prefers-reduced-motion:reduce){.track{transition:none}.slide.active .media-frame,.slide.active .project-image,.slide.active .scan-beam,.motion-lines i,.pagination button.active span{animation:none}.pagination button.active span{width:100%}}
</style>

<style>
/* Light mode lives outside the scoped block so the document theme can target this component reliably. */
:root[data-theme='light'] #projects.projects-section {
  color: #15365b;
  background:
    radial-gradient(circle at 12% 42%, rgba(118, 183, 255, .16), transparent 31%),
    radial-gradient(circle at 88% 68%, rgba(0, 104, 219, .09), transparent 30%),
    linear-gradient(180deg, transparent, rgba(242, 247, 255, .86) 42%, transparent);
}
:root[data-theme='light'] #projects.projects-section::before { background: radial-gradient(circle at 50% 45%, rgba(0, 123, 255, .1), transparent 58%); }
:root[data-theme='light'] #projects .projects-heading h2 { color: #15365b; }
:root[data-theme='light'] #projects .projects-heading h2 em { -webkit-text-stroke-color: #4f8bc9; }
:root[data-theme='light'] #projects .projects-heading > p { color: #536b85; border-color: #95bde6; }
:root[data-theme='light'] #projects .kicker { color: #0068db; }
:root[data-theme='light'] #projects .orbit { border-color: rgba(0, 104, 219, .11); }
:root[data-theme='light'] #projects .orbit::after { background: #007bff; box-shadow: 0 0 16px 3px rgba(0, 123, 255, .3); }

:root[data-theme='light'] #projects .viewport {
  border: 1px solid #cfe0f2;
  background: #fff;
  box-shadow: 0 28px 70px rgba(32, 78, 128, .14), 0 4px 14px rgba(32, 78, 128, .07);
}
:root[data-theme='light'] #projects .visual { background: linear-gradient(145deg, #e8f2ff, #f9fcff 60%, #dfedfc); }
:root[data-theme='light'] #projects .image-backdrop { filter: blur(34px) saturate(.7) brightness(1.25); opacity: .16; }
:root[data-theme='light'] #projects .media-frame {
  background: rgba(255, 255, 255, .92);
  border-color: rgba(0, 104, 219, .2);
  box-shadow: 0 22px 48px rgba(40, 87, 137, .17), inset 0 0 0 1px rgba(255, 255, 255, .9);
}
:root[data-theme='light'] #projects .visual:hover .media-frame { border-color: rgba(0, 104, 219, .52); box-shadow: 0 27px 60px rgba(40, 87, 137, .21), inset 0 0 0 1px #fff; }
:root[data-theme='light'] #projects .project-image { filter: saturate(.93) contrast(1.01); }
:root[data-theme='light'] #projects .visual:hover .project-image { filter: saturate(1) contrast(1.01); }
:root[data-theme='light'] #projects .visual-grid { opacity: .31; background-image: linear-gradient(rgba(0, 104, 219, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 104, 219, .1) 1px, transparent 1px); }
:root[data-theme='light'] #projects .motion-lines i { background: linear-gradient(90deg, transparent, rgba(0, 104, 219, .34), transparent); }
:root[data-theme='light'] #projects .scan-beam { background: linear-gradient(90deg, transparent, rgba(0, 123, 255, .14), transparent); }
:root[data-theme='light'] #projects .shade { background: linear-gradient(90deg, rgba(217, 235, 255, .5), transparent 24%, transparent 76%, rgba(217, 235, 255, .34)), linear-gradient(0deg, rgba(228, 241, 255, .52), transparent 28%); }
:root[data-theme='light'] #projects .spotlight { background: radial-gradient(300px circle at var(--x) var(--y), rgba(0, 123, 255, .13), transparent 70%); }
:root[data-theme='light'] #projects .visual-top { color: #345778; }
:root[data-theme='light'] #projects .visual-top > span {
  padding: 7px 10px;
  border: 1px solid rgba(149, 189, 230, .62);
  background: rgba(255, 255, 255, .82);
  box-shadow: 0 4px 14px rgba(33, 80, 131, .08);
  backdrop-filter: blur(8px);
}
:root[data-theme='light'] #projects .signal i { background: #007bff; box-shadow: 0 0 10px rgba(0, 123, 255, .5); }
:root[data-theme='light'] #projects .coordinate { padding: 6px 9px; color: #536b85; background: rgba(255, 255, 255, .76); border-left: 2px solid #007bff; backdrop-filter: blur(7px); }
:root[data-theme='light'] #projects .corners i { border-color: rgba(0, 104, 219, .72); }

:root[data-theme='light'] #projects .project-copy { background: linear-gradient(145deg, #fff, #f8fbff); border-color: #cfe0f2; }
:root[data-theme='light'] #projects .project-copy::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg, rgba(0, 123, 255, .055), transparent 38%); }
:root[data-theme='light'] #projects .project-copy::after { border-color: rgba(0, 104, 219, .14); box-shadow: 0 0 0 32px rgba(0, 104, 219, .025), 0 0 0 64px rgba(0, 104, 219, .018); }
:root[data-theme='light'] #projects .index { color: #15365b; }
:root[data-theme='light'] #projects .index i { background: linear-gradient(90deg, rgba(0, 104, 219, .48), rgba(0, 104, 219, .07)); }
:root[data-theme='light'] #projects .index small { color: #71869d; }
:root[data-theme='light'] #projects .label { color: #0068db; }
:root[data-theme='light'] #projects .project-copy h3 { color: #15365b; }
:root[data-theme='light'] #projects .description { color: #536b85; }
:root[data-theme='light'] #projects .tech li { color: #345778; background: #eaf3ff; border-color: #d5e5f7; }
:root[data-theme='light'] #projects .primary { color: #fff; background: #0068db; border-color: #0068db; box-shadow: 0 8px 20px rgba(0, 104, 219, .17); }
:root[data-theme='light'] #projects .primary:hover { color: #fff; background: #0054b5; border-color: #0054b5; box-shadow: 0 12px 24px rgba(0, 84, 181, .23); }
:root[data-theme='light'] #projects .ghost { color: #345778; background: #fff; border-color: #b9d1e9; }
:root[data-theme='light'] #projects .ghost:hover { color: #0068db; background: #eef6ff; border-color: #0068db; }

:root[data-theme='light'] #projects .controls button { color: #345778; background: #fff; border-color: #c9dcef; box-shadow: 0 5px 15px rgba(38, 81, 127, .08); }
:root[data-theme='light'] #projects .controls button:hover { color: #fff; background: #0068db; border-color: #0068db; box-shadow: 0 9px 19px rgba(0, 104, 219, .2); }
:root[data-theme='light'] #projects .pagination button::before { background: #cfdeed; }
:root[data-theme='light'] #projects .pagination span { background: #0068db; box-shadow: 0 0 8px rgba(0, 104, 219, .22); }
:root[data-theme='light'] #projects .hint { color: #71869d; }
:root[data-theme='light'] #projects .hint span { color: #345778; }
</style>
