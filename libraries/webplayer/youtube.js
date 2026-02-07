const e = /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

function t(e) {
    return `\n    <style>\n      :host {\n        display: inline-block;\n        line-height: 0;\n        position: relative;\n        min-width: 300px;\n        min-height: 150px;\n      }\n      iframe {\n        position: absolute;\n        top: 0;\n        left: 0;\n      }\n    </style>\n    <iframe${function(e){let t="";for(const s in e){const i=e[s];t+=""===i?` ${s}`:` ${s}="${i}"`}return t}({src:s(e),frameborder:0,width:"100%",height:"100%",allow:"accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"})}></iframe>\n  `
}

function s(t) {
    if (!t.src) return;
    const s = t.src.match(e),
        i = s && s[1],
        a = {
            controls: "" === t.controls ? null : 0,
            autoplay: t.autoplay,
            loop: t.loop,
            mute: t.muted,
            playsinline: t.playsinline,
            preload: t.preload ?? "metadata",
            enablejsapi: 1,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1
        };
    return `https://www.youtube.com/embed/${i}?${n=a,String(new URLSearchParams(function(e){let t={};for(let s in e){let i=e[s];!0===i||""===i?t[s]=1:!1===i?t[s]=0:null!=i&&(t[s]=i)}return t}(n)))}`;
    var n
}
class i extends(globalThis.HTMLElement ?? class {}) {
    static getTemplateHTML = t;
    static shadowRootOptions = {
        mode: "open"
    };
    static observedAttributes = ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src"];
    loadComplete = new o;
    #e;
    #t;
    #s = 0;
    #i = !1;
    #a;
    isLoaded = !1;
    async load() {
        if (this.#e) return;
        this.shadowRoot || this.attachShadow({
            mode: "open"
        }), this.#t && (this.loadComplete = new o, this.isLoaded = !1), this.#t = !0, await (this.#e = Promise.resolve()), this.#e = null, this.#s = 0, this.dispatchEvent(new Event("emptied"));
        let e = this.api;
        if (this.api = null, !this.src) return void e?.destroy();
        this.dispatchEvent(new Event("loadstart"));
        let i = this.shadowRoot.querySelector("iframe"),
            r = function(e) {
                let t = {};
                for (let s of e) t[s.name] = s.value;
                return t
            }(this.attributes);
        i?.src && i.src === s(r) || (this.shadowRoot.innerHTML = t(r), i = this.shadowRoot.querySelector("iframe"));
        const l = await async function(e, t, s) {
            if (a[e]) return a[e];
            if (t && self[t]) return await n(0), self[t];
            return a[e] = new Promise((function(i, a) {
                const n = document.createElement("script");
                n.src = e;
                const o = () => i(self[t]);
                s && (self[s] = o), n.onload = () => !s && o(), n.onerror = a, document.head.append(n)
            }))
        }("https://www.youtube.com/iframe_api", "YT", "onYouTubeIframeAPIReady");
        this.api = new l.Player(i, {
            events: {
                onReady: () => {
                    this.#s = 1, this.dispatchEvent(new Event("loadedmetadata")), this.dispatchEvent(new Event("durationchange")), this.dispatchEvent(new Event("volumechange")), this.dispatchEvent(new Event("loadcomplete")), this.isLoaded = !0, this.loadComplete.resolve()
                },
                onError: e => console.error(e)
            }
        });
        let h = !1;
        this.api.addEventListener("onStateChange", (e => {
            const t = e.data;
            if (t !== l.PlayerState.PLAYING && t !== l.PlayerState.BUFFERING || h || (h = !0, this.dispatchEvent(new Event("play"))), t === l.PlayerState.PLAYING) this.seeking && (this.#i = !1, this.#a?.resolve(), this.dispatchEvent(new Event("seeked"))), this.#s = 3, this.dispatchEvent(new Event("playing"));
            else if (t === l.PlayerState.PAUSED) {
                const e = Math.abs(this.currentTime - u);
                !this.seeking && e > .1 && (this.#i = !0, this.dispatchEvent(new Event("seeking"))), h = !1, this.dispatchEvent(new Event("pause"))
            }
            t === l.PlayerState.ENDED && (h = !1, this.dispatchEvent(new Event("pause")), this.dispatchEvent(new Event("ended")), this.loop && this.play())
        })), this.api.addEventListener("onPlaybackRateChange", (() => {
            this.dispatchEvent(new Event("ratechange"))
        })), this.api.addEventListener("onVolumeChange", (() => {
            this.dispatchEvent(new Event("volumechange"))
        })), this.api.addEventListener("onVideoProgress", (() => {
            this.dispatchEvent(new Event("timeupdate"))
        })), await this.loadComplete;
        let d, u = 0;
        setInterval((() => {
            const e = Math.abs(this.currentTime - u),
                t = this.buffered.end(this.buffered.length - 1);
            this.seeking && t > .1 ? (this.#i = !1, this.#a?.resolve(), this.dispatchEvent(new Event("seeked"))) : !this.seeking && e > .1 && (this.#i = !0, this.dispatchEvent(new Event("seeking"))), u = this.currentTime
        }), 50);
        const p = setInterval((() => {
            const e = this.buffered.end(this.buffered.length - 1);
            e >= this.duration && (clearInterval(p), this.#s = 4), d != e && (d = e, this.dispatchEvent(new Event("progress")))
        }), 100)
    }
    async attributeChangedCallback(e, t, s) {
        if (t !== s) switch (e) {
            case "src":
            case "autoplay":
            case "controls":
            case "loop":
            case "playsinline":
                this.load()
        }
    }
    async play() {
        return this.#a = null, await this.loadComplete, this.api?.playVideo(), e = this, (t = (t, s) => {
            let i;
            e.addEventListener(t, i = () => {
                e.removeEventListener(t, i), s()
            })
        }, (...e) => new Promise((s => {
            t(...e, ((...e) => {
                e.length > 1 ? s(e) : s(e[0])
            }))
        })))("playing");
        var e, t
    }
    async pause() {
        return await this.loadComplete, this.api?.pauseVideo()
    }
    get seeking() {
        return this.#i
    }
    get readyState() {
        return this.#s
    }
    get src() {
        return this.getAttribute("src")
    }
    set src(e) {
        this.src != e && this.setAttribute("src", e)
    }
    get paused() {
        return this.isLoaded ? [-1, 0, 2, 5].includes(this.api?.getPlayerState?.()) : !this.autoplay
    }
    get duration() {
        return this.api?.getDuration?.() ?? NaN
    }
    get autoplay() {
        return this.hasAttribute("autoplay")
    }
    set autoplay(e) {
        this.autoplay != e && this.toggleAttribute("autoplay", Boolean(e))
    }
    get buffered() {
        if (!this.isLoaded) return r();
        const e = this.api?.getVideoLoadedFraction() * this.api?.getDuration();
        return e > 0 ? r(0, e) : r()
    }
    get controls() {
        return this.hasAttribute("controls")
    }
    set controls(e) {
        this.controls != e && this.toggleAttribute("controls", Boolean(e))
    }
    get currentTime() {
        return this.api?.getCurrentTime?.() ?? 0
    }
    set currentTime(e) {
        this.currentTime != e && (this.#a = new o, this.loadComplete.then((() => {
            this.api?.seekTo(e, !0), this.paused && this.#a?.then((() => {
                this.#a && this.api?.pauseVideo()
            }))
        })))
    }
    set defaultMuted(e) {
        this.defaultMuted != e && this.toggleAttribute("muted", Boolean(e))
    }
    get defaultMuted() {
        return this.hasAttribute("muted")
    }
    get loop() {
        return this.hasAttribute("loop")
    }
    set loop(e) {
        this.loop != e && this.toggleAttribute("loop", Boolean(e))
    }
    set muted(e) {
        this.muted != e && this.loadComplete.then((() => {
            e ? this.api?.mute() : this.api?.unMute()
        }))
    }
    get muted() {
        return this.isLoaded ? this.api?.isMuted?.() : this.defaultMuted
    }
    get playbackRate() {
        return this.api?.getPlaybackRate?.() ?? 1
    }
    set playbackRate(e) {
        this.playbackRate != e && this.loadComplete.then((() => {
            this.api?.setPlaybackRate(e)
        }))
    }
    get playsInline() {
        return this.hasAttribute("playsinline")
    }
    set playsInline(e) {
        this.playsInline != e && this.toggleAttribute("playsinline", Boolean(e))
    }
    get poster() {
        return this.getAttribute("poster")
    }
    set poster(e) {
        this.poster != e && this.setAttribute("poster", `${e}`)
    }
    set volume(e) {
        this.volume != e && this.loadComplete.then((() => {
            this.api?.setVolume(100 * e)
        }))
    }
    get volume() {
        return this.isLoaded ? this.api?.getVolume() / 100 : 1
    }
}
const a = {};
const n = e => new Promise((t => setTimeout(t, e)));
class o extends Promise {
    constructor(e = () => {}) {
        let t, s;
        super(((i, a) => {
            e(i, a), t = i, s = a
        })), this.resolve = t, this.reject = s
    }
}

function r(e, t) {
    return Array.isArray(e) ? l(e) : l(null == e || null == t || 0 === e && 0 === t ? [
        [0, 0]
    ] : [
        [e, t]
    ])
}

function l(e) {
    return Object.defineProperties(e, {
        start: {
            value: t => e[t][0]
        },
        end: {
            value: t => e[t][1]
        }
    }), e
}
globalThis.customElements && !globalThis.customElements.get("youtube-video") && globalThis.customElements.define("youtube-video", i);
export {
    i as
    default
};
