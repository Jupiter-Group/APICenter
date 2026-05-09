import{n as e,r as t}from"./media-attach-mixin-C2wz0Qbd.js";import{n,t as r}from"./pick-CERGq1No.js";function i(e,t){let n={};for(let r in e)t.includes(r)||(n[r]=e[r]);return n}const a={borderRadius:`--media-video-border-radius`,objectFit:`--media-object-fit`,objectPosition:`--media-object-position`,captionTrackDuration:`--media-caption-track-duration`,captionTrackDelay:`--media-caption-track-delay`,captionTrackY:`--media-caption-track-y`};function o(e){return`
    <style>
      :host {
        display: contents;
      }

      video {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: var(${a.borderRadius});
        object-fit: var(${a.objectFit}, contain);
        object-position: var(${a.objectPosition}, center);
      }

      video::-webkit-media-text-track-container {
        transition: translate var(${a.captionTrackDuration}, 0) ease-out;
        transition-delay: var(${a.captionTrackDelay}, 0);
        translate: 0 var(${a.captionTrackY}, 0);
        scale: 0.98;
        z-index: 1;
        font-family: inherit;
      }
    </style>
    <slot name="media">
      <video${t(e)}></video>
    </slot>
    <slot></slot>
  `}function s(e){return n=>`
      <style>
        :host {
          display: inline-flex;
          line-height: 0;
          flex-direction: column;
          justify-content: end;
        }

        ${e} {
          width: 100%;
        }
      </style>
      <slot name="media">
        <${e}${t(n)}></${e}>
      </slot>
      <slot></slot>
    `}const c=[`attach`,`detach`,`destroy`];function l(t,a){let l=new Map,d=!1;class f extends (globalThis.HTMLElement??class{}){static getTemplateHTML=t.endsWith(`video`)?o:s(t);static shadowRootOptions={mode:`open`};static properties={autoPictureInPicture:{type:Boolean},autoplay:{type:Boolean},controls:{type:Boolean},controlsList:{type:String},crossOrigin:{type:String},defaultMuted:{type:Boolean,attribute:`muted`},disablePictureInPicture:{type:Boolean},disableRemotePlayback:{type:Boolean},loading:{type:String},loop:{type:Boolean},playsInline:{type:Boolean},poster:{type:String},preload:{type:String},src:{type:String}};static get observedAttributes(){return f.#define(this),[...u(this.properties)]}static#define(e){if(d)return;d=!0;for(let t=a.prototype;t&&t!==Object.prototype;t=Object.getPrototypeOf(t))for(let r of Object.getOwnPropertyNames(t)){if(r in f.prototype||c.includes(r))continue;let i=Object.getOwnPropertyDescriptor(t,r);if(!i)continue;let a={enumerable:!0,configurable:!0};if(typeof i.value==`function`)a.value=function(...e){return this.#mediaHost[r](...e)};else if(i.get&&(a.get=function(){return this.#mediaHost[r]},i.set)){let t=n(r);e.observedAttributes.includes(t)?(l.set(t,r),a.set=function(e){e===!0||e===!1||e==null?this.toggleAttribute(t,!!e):this.setAttribute(t,String(e))}):a.set=function(e){this.#mediaHost[r]=e}}Object.defineProperty(f.prototype,r,a)}let t=e.properties;for(let[e,{type:n,attribute:r}]of Object.entries(t)){if(e in f.prototype)continue;let t=r??e.toLowerCase();Object.defineProperty(f.prototype,e,{get:function(){return n===Boolean?this.hasAttribute(t):this.getAttribute(t)},set:function(e){n===Boolean?this.toggleAttribute(t,!!e):this.setAttribute(t,e)},enumerable:!0,configurable:!0})}}#mediaHost;#bridgedEventTypes=new Set;#childMap=new Map;#childObserver;constructor(){if(super(),!this.shadowRoot){let n=this.constructor;this.attachShadow(n.shadowRootOptions);let a=u(n.properties),o=[...l.keys()],s=i(r(e(this.attributes),a),o);t&&!s.part&&(s.part=t),this.shadowRoot.innerHTML=n.getTemplateHTML(s)}this.#mediaHost=new a,this.#attachToTarget(),this.#childObserver=new MutationObserver(this.#syncMediaChildAttribute.bind(this)),this.shadowRoot.addEventListener(`slotchange`,()=>{this.#attachToTarget(),this.#syncMediaChildren()}),this.#syncMediaChildren()}#attachToTarget(){let e=this.target;e!==this.#mediaHost.target&&(this.#mediaHost.target&&this.#mediaHost.detach(),this.#mediaHost.attach(e))}get target(){return this.querySelector(`:scope > [slot=media]`)??this.querySelector(t)??this.shadowRoot?.querySelector(t)??null}disconnectedCallback(){this.hasAttribute(`keep-alive`)||this.#mediaHost.destroy()}addEventListener(e,t,n){super.addEventListener(e,t,n),this.#bridgedEventTypes.has(e)||(this.#bridgedEventTypes.add(e),this.#mediaHost.addEventListener(e,this.#bridgeEvent))}removeEventListener(e,t,n){super.removeEventListener(e,t,n)}#bridgeEvent=e=>{e.composed||this.dispatchEvent(new e.constructor(e.type,e))};attributeChangedCallback(e,t,n){let r=l.get(e);if(r){if(t!==n){let e=typeof this.#mediaHost[r];this.#mediaHost[r]=e===`boolean`?n!==null:e===`number`?Number(n):n??``}return}!f.observedAttributes.includes(e)&&this.constructor.observedAttributes.includes(e)||(n===null?this.target?.removeAttribute(e):this.target?.getAttribute(e)!==n&&this.target?.setAttribute(e,n))}#syncMediaChildren(){let e=this.shadowRoot?.querySelector(`slot:not([name])`),t=new Set(e?.assignedElements({flatten:!0}).filter(e=>e.localName===`track`||e.localName===`source`));for(let[e,n]of this.#childMap)t.has(e)||(n.remove(),this.#childMap.delete(e));for(let e of t){let t=this.#childMap.get(e);t||(t=e.cloneNode(),this.#childMap.set(e,t),this.#childObserver?.observe(e,{attributes:!0})),this.target?.append(t),this.#enableDefaultTrack(t)}}#syncMediaChildAttribute(e){for(let t of e)if(t.type===`attributes`){let{target:e,attributeName:n}=t,r=this.#childMap.get(e);r&&n&&(r.setAttribute(n,e.getAttribute(n)??``),this.#enableDefaultTrack(r))}}#enableDefaultTrack(e){e&&e.localName===`track`&&e.default&&(e.kind===`chapters`||e.kind===`metadata`)&&e.track.mode===`disabled`&&(e.track.mode=`hidden`)}}return f}function u(e){return Object.keys(e).map(t=>e[t]?.attribute??t.toLowerCase())}const d=Object.freeze({length:0,start(){return 0},end(){return 0}});var f=class extends EventTarget{#e=null;#t=new Set;get target(){return this.#e}attach(e){if(!(!e||this.#e===e)){this.#e=e;for(let t of this.#t)e.addEventListener(t,this.#n)}}detach(){if(this.#e){for(let e of this.#t)this.#e.removeEventListener(e,this.#n);this.#e=null}}querySelectorAll(e){return this.target?.querySelectorAll(e)??[]}querySelector(e){return this.target?.querySelector(e)??null}addEventListener(e,t,n){this.#t.has(e)||(this.#t.add(e),this.target?.addEventListener(e,this.#n)),super.addEventListener(e,t,n)}removeEventListener(e,t,n){super.removeEventListener(e,t,n)}#n=e=>{this.dispatchEvent(new e.constructor(e.type,e))};get title(){return this.target?.title??``}set title(e){this.target&&(this.target.title=e)}get paused(){return this.target?.paused??!0}get ended(){return this.target?.ended??!1}get loop(){return this.target?.loop??!1}set loop(e){this.target&&(this.target.loop=e)}play(){return this.target?.play()??Promise.reject()}pause(){this.target?.pause()}get currentTime(){return this.target?.currentTime??0}set currentTime(e){this.target&&(this.target.currentTime=e)}get duration(){return this.target?.duration??NaN}get seeking(){return this.target?.seeking??!1}get src(){return this.target?.src??``}set src(e){this.target&&(this.target.src=e)}get currentSrc(){return this.target?.currentSrc??``}get readyState(){return this.target?.readyState??0}load(){this.target?.load()}get volume(){return this.target?.volume??1}set volume(e){this.target&&(this.target.volume=e)}get muted(){return this.target?.muted??!1}set muted(e){this.target&&(this.target.muted=e)}get playbackRate(){return this.target?.playbackRate??1}set playbackRate(e){this.target&&(this.target.playbackRate=e)}get buffered(){return this.target?.buffered??d}get seekable(){return this.target?.seekable??d}get error(){return this.target?.error??null}get textTracks(){return this.target?.textTracks??[]}get remote(){return this.target?.remote}get disableRemotePlayback(){return this.target?.disableRemotePlayback??!1}set disableRemotePlayback(e){this.target&&(this.target.disableRemotePlayback=e)}},p=class extends f{get poster(){return this.target?.poster??``}set poster(e){this.target&&(this.target.poster=e)}get webkitDisplayingFullscreen(){return this.target?.webkitDisplayingFullscreen??!1}get webkitPresentationMode(){return this.target?.webkitPresentationMode??`inline`}requestPictureInPicture(){return this.target?.requestPictureInPicture()??Promise.reject()}requestFullscreen(){return this.target?.requestFullscreen()??Promise.reject()}webkitEnterFullscreen(){return this.target?.webkitEnterFullscreen?.()}webkitExitFullscreen(){return this.target?.webkitExitFullscreen?.()}webkitSetPresentationMode(e){return this.target?.webkitSetPresentationMode?.(e)}};export{l as n,p as t};
//# sourceMappingURL=video-host-LeB1FKfO.js.map