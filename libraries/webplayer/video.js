const e = {
    MEDIA_PLAY_REQUEST: "mediaplayrequest",
    MEDIA_PAUSE_REQUEST: "mediapauserequest",
    MEDIA_MUTE_REQUEST: "mediamuterequest",
    MEDIA_UNMUTE_REQUEST: "mediaunmuterequest",
    MEDIA_VOLUME_REQUEST: "mediavolumerequest",
    MEDIA_SEEK_REQUEST: "mediaseekrequest",
    MEDIA_AIRPLAY_REQUEST: "mediaairplayrequest",
    MEDIA_ENTER_FULLSCREEN_REQUEST: "mediaenterfullscreenrequest",
    MEDIA_EXIT_FULLSCREEN_REQUEST: "mediaexitfullscreenrequest",
    MEDIA_PREVIEW_REQUEST: "mediapreviewrequest",
    MEDIA_ENTER_PIP_REQUEST: "mediaenterpiprequest",
    MEDIA_EXIT_PIP_REQUEST: "mediaexitpiprequest",
    MEDIA_ENTER_CAST_REQUEST: "mediaentercastrequest",
    MEDIA_EXIT_CAST_REQUEST: "mediaexitcastrequest",
    MEDIA_SHOW_TEXT_TRACKS_REQUEST: "mediashowtexttracksrequest",
    MEDIA_HIDE_TEXT_TRACKS_REQUEST: "mediahidetexttracksrequest",
    MEDIA_SHOW_SUBTITLES_REQUEST: "mediashowsubtitlesrequest",
    MEDIA_DISABLE_SUBTITLES_REQUEST: "mediadisablesubtitlesrequest",
    MEDIA_TOGGLE_SUBTITLES_REQUEST: "mediatogglesubtitlesrequest",
    MEDIA_PLAYBACK_RATE_REQUEST: "mediaplaybackraterequest",
    MEDIA_RENDITION_REQUEST: "mediarenditionrequest",
    MEDIA_AUDIO_TRACK_REQUEST: "mediaaudiotrackrequest",
    MEDIA_SEEK_TO_LIVE_REQUEST: "mediaseektoliverequest",
    REGISTER_MEDIA_STATE_RECEIVER: "registermediastatereceiver",
    UNREGISTER_MEDIA_STATE_RECEIVER: "unregistermediastatereceiver"
},
t = {
    MEDIA_CHROME_ATTRIBUTES: "mediachromeattributes",
    MEDIA_CONTROLLER: "mediacontroller"
},
i = {
    MEDIA_AIRPLAY_UNAVAILABLE: "mediaAirplayUnavailable",
    MEDIA_AUDIO_TRACK_ENABLED: "mediaAudioTrackEnabled",
    MEDIA_AUDIO_TRACK_LIST: "mediaAudioTrackList",
    MEDIA_AUDIO_TRACK_UNAVAILABLE: "mediaAudioTrackUnavailable",
    MEDIA_BUFFERED: "mediaBuffered",
    MEDIA_CAST_UNAVAILABLE: "mediaCastUnavailable",
    MEDIA_CHAPTERS_CUES: "mediaChaptersCues",
    MEDIA_CURRENT_TIME: "mediaCurrentTime",
    MEDIA_DURATION: "mediaDuration",
    MEDIA_ENDED: "mediaEnded",
    MEDIA_ERROR: "mediaError",
    MEDIA_ERROR_CODE: "mediaErrorCode",
    MEDIA_ERROR_MESSAGE: "mediaErrorMessage",
    MEDIA_FULLSCREEN_UNAVAILABLE: "mediaFullscreenUnavailable",
    MEDIA_HAS_PLAYED: "mediaHasPlayed",
    MEDIA_HEIGHT: "mediaHeight",
    MEDIA_IS_AIRPLAYING: "mediaIsAirplaying",
    MEDIA_IS_CASTING: "mediaIsCasting",
    MEDIA_IS_FULLSCREEN: "mediaIsFullscreen",
    MEDIA_IS_PIP: "mediaIsPip",
    MEDIA_LOADING: "mediaLoading",
    MEDIA_MUTED: "mediaMuted",
    MEDIA_PAUSED: "mediaPaused",
    MEDIA_PIP_UNAVAILABLE: "mediaPipUnavailable",
    MEDIA_PLAYBACK_RATE: "mediaPlaybackRate",
    MEDIA_PREVIEW_CHAPTER: "mediaPreviewChapter",
    MEDIA_PREVIEW_COORDS: "mediaPreviewCoords",
    MEDIA_PREVIEW_IMAGE: "mediaPreviewImage",
    MEDIA_PREVIEW_TIME: "mediaPreviewTime",
    MEDIA_RENDITION_LIST: "mediaRenditionList",
    MEDIA_RENDITION_SELECTED: "mediaRenditionSelected",
    MEDIA_RENDITION_UNAVAILABLE: "mediaRenditionUnavailable",
    MEDIA_SEEKABLE: "mediaSeekable",
    MEDIA_STREAM_TYPE: "mediaStreamType",
    MEDIA_SUBTITLES_LIST: "mediaSubtitlesList",
    MEDIA_SUBTITLES_SHOWING: "mediaSubtitlesShowing",
    MEDIA_TARGET_LIVE_WINDOW: "mediaTargetLiveWindow",
    MEDIA_TIME_IS_LIVE: "mediaTimeIsLive",
    MEDIA_VOLUME: "mediaVolume",
    MEDIA_VOLUME_LEVEL: "mediaVolumeLevel",
    MEDIA_VOLUME_UNAVAILABLE: "mediaVolumeUnavailable",
    MEDIA_WIDTH: "mediaWidth"
},
n = Object.entries(i),
a = n.reduce(((e, [t, i]) => (e[t] = i.toLowerCase(), e)), {}),
s = n.reduce(((e, [t, i]) => (e[t] = i.toLowerCase(), e)), {
    USER_INACTIVE_CHANGE: "userinactivechange",
    BREAKPOINTS_CHANGE: "breakpointchange",
    BREAKPOINTS_COMPUTED: "breakpointscomputed"
}),
r = Object.entries(s).reduce(((e, [t, i]) => {
    const n = a[t];
    return n && (e[i] = n), e
}), {
    userinactivechange: "userinactive"
}),
o = Object.entries(a).reduce(((e, [t, i]) => {
    const n = s[t];
    return n && (e[i] = n), e
}), {
    userinactive: "userinactivechange"
}),
l = {
    SUBTITLES: "subtitles",
    CAPTIONS: "captions",
    DESCRIPTIONS: "descriptions",
    CHAPTERS: "chapters",
    METADATA: "metadata"
},
d = {
    DISABLED: "disabled",
    HIDDEN: "hidden",
    SHOWING: "showing"
},
c = {
    MOUSE: "mouse",
    PEN: "pen",
    TOUCH: "touch"
},
u = {
    UNAVAILABLE: "unavailable",
    UNSUPPORTED: "unsupported"
},
h = {
    LIVE: "live",
    ON_DEMAND: "on-demand",
    UNKNOWN: "unknown"
},
m = {
    INLINE: "inline",
    FULLSCREEN: "fullscreen",
    PICTURE_IN_PICTURE: "picture-in-picture"
};
var p = Object.freeze({
__proto__: null,
AttributeToStateChangeEventMap: o,
AvailabilityStates: u,
MediaStateChangeEvents: s,
MediaStateReceiverAttributes: t,
MediaUIAttributes: a,
MediaUIEvents: e,
MediaUIProps: i,
PointerTypes: c,
ReadyStates: {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
},
StateChangeEventToAttributeMap: r,
StreamTypes: h,
TextTrackKinds: l,
TextTrackModes: d,
VolumeLevels: {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
    OFF: "off"
},
WebkitPresentationModes: m
});

function E(e) {
if (e) {
    const {
        id: t,
        width: i,
        height: n
    } = e;
    return [t, i, n].filter((e => null != e)).join(":")
}
}

function v(e) {
if (e) {
    const {
        id: t,
        kind: i,
        language: n,
        label: a
    } = e;
    return [t, i, n, a].filter((e => null != e)).join(":")
}
}

function b(e) {
return "number" == typeof e && !Number.isNaN(e) && Number.isFinite(e)
}
const g = e => new Promise((t => setTimeout(t, e))),
A = [{
    singular: "hour",
    plural: "hours"
}, {
    singular: "minute",
    plural: "minutes"
}, {
    singular: "second",
    plural: "seconds"
}],
f = e => {
    if (!b(e)) return "";
    const t = Math.abs(e),
        i = t !== e,
        n = new Date(0, 0, 0, 0, 0, t, 0);
    return `${[n.getHours(),n.getMinutes(),n.getSeconds()].map(((e,t)=>e&&((e,t)=>`${e} ${1===e?A[t].singular:A[t].plural}`)(e,t))).filter((e=>e)).join(", ")}${i?" remaining":""}`
};

function I(e, t) {
let i = !1;
e < 0 && (i = !0, e = 0 - e), e = e < 0 ? 0 : e;
let n = Math.floor(e % 60),
    a = Math.floor(e / 60 % 60),
    s = Math.floor(e / 3600);
const r = Math.floor(t / 60 % 60),
    o = Math.floor(t / 3600);
return (isNaN(e) || e === 1 / 0) && (s = a = n = "0"), s = s > 0 || o > 0 ? s + ":" : "", a = ((s || r >= 10) && a < 10 ? "0" + a : a) + ":", n = n < 10 ? "0" + n : n, (i ? "-" : "") + s + a + n
}
const y = Object.freeze({
length: 0,
start(e) {
    const t = e >>> 0;
    if (t >= this.length) throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);
    return 0
},
end(e) {
    const t = e >>> 0;
    if (t >= this.length) throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);
    return 0
}
});
var _ = Object.freeze({
__proto__: null,
emptyTimeRanges: y,
formatAsTimePhrase: f,
formatTime: I,
serializeTimeRanges: function(e = y) {
    return Array.from(e).map(((t, i) => [Number(e.start(i).toFixed(3)), Number(e.end(i).toFixed(3))].join(":"))).join(" ")
}
});
const w = {
"Start AirPlay": "Start AirPlay",
"Stop AirPlay": "Stop AirPlay",
Audio: "Audio",
Captions: "Captions",
"Enable captions": "Enable captions",
"Disable captions": "Disable captions",
"Start casting": "Start casting",
"Stop casting": "Stop casting",
"Enter fullscreen mode": "Go Fullscreen",
"Exit fullscreen mode": "Exit Fullscreen",
Mute: "Mute",
Unmute: "Unmute",
"Enter picture in picture mode": "Enter picture in picture mode",
"Exit picture in picture mode": "Exit picture in picture mode",
Play: "Play",
Pause: "Pause",
"Playback rate": "Playback rate",
"Playback rate {playbackRate}": "Playback rate {playbackRate}",
Quality: "Quality",
"Seek backward": "Rewind 30s",
"Seek forward": "Forward 30s",
Settings: "Settings",
"audio player": "audio player",
"video player": "video player",
volume: "volume",
seek: "seek",
"closed captions": "closed captions",
"current playback rate": "current playback rate",
"playback time": "playback time",
"media loading": "media loading",
settings: "settings",
"audio tracks": "audio tracks",
quality: "quality",
play: "play",
pause: "pause",
mute: "mute",
unmute: "unmute",
live: "live",
"start airplay": "start airplay",
"stop airplay": "stop airplay",
"start casting": "start casting",
"stop casting": "stop casting",
"enter fullscreen mode": "enter fullscreen mode",
"exit fullscreen mode": "exit fullscreen mode",
"enter picture in picture mode": "enter picture in picture mode",
"exit picture in picture mode": "exit picture in picture mode",
"seek to live": "seek to live",
"playing live": "playing live",
"seek back {seekOffset} seconds": "seek back {seekOffset} seconds",
"seek forward {seekOffset} seconds": "seek forward {seekOffset} seconds",
"Network Error": "Network Error",
"Decode Error": "Decode Error",
"Source Not Supported": "Source Not Supported",
"Encryption Error": "Encryption Error",
"A network error caused the media download to fail.": "A network error caused the media download to fail.",
"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.": "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",
"An unsupported error occurred. The server or network failed, or your browser does not support this format.": "An unsupported error occurred. The server or network failed, or your browser does not support this format.",
"The media is encrypted and there are no keys to decrypt it.": "The media is encrypted and there are no keys to decrypt it."
};
var k;
const T = {
en: w
};
let M = (null == (k = globalThis.navigator) ? void 0 : k.language.split("-")[0]) || "en";
const S = (e, t = {}) => {
var i;
return ((null == (i = T[M]) ? void 0 : i[e]) || w[e]).replace(/\{(\w+)\}/g, ((e, i) => void 0 !== t[i] ? String(t[i]) : `{${i}}`))
};
class R {
addEventListener() {}
removeEventListener() {}
dispatchEvent() {
    return !0
}
}
class D extends R {}
class C extends D {
constructor() {
    super(...arguments), this.role = null
}
}
const L = {
    createElement: function() {
        return new x.HTMLElement
    },
    createElementNS: function() {
        return new x.HTMLElement
    },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: e => !1
},
x = {
    ResizeObserver: class {
        observe() {}
        unobserve() {}
        disconnect() {}
    },
    document: L,
    Node: D,
    Element: C,
    HTMLElement: class extends C {
        constructor() {
            super(...arguments), this.innerHTML = ""
        }
        get content() {
            return new x.DocumentFragment
        }
    },
    DocumentFragment: class extends R {},
    customElements: {
        get: function() {},
        define: function() {},
        whenDefined: function() {}
    },
    localStorage: {
        getItem: e => null,
        setItem(e, t) {},
        removeItem(e) {}
    },
    CustomEvent: function() {},
    getComputedStyle: function() {},
    navigator: {
        languages: [],
        get userAgent() {
            return ""
        }
    },
    matchMedia: e => ({
        matches: !1,
        media: e
    })
},
N = "undefined" == typeof window || void 0 === window.customElements,
U = Object.keys(x).every((e => e in globalThis)),
P = N && !U ? x : globalThis,
O = N && !U ? L : globalThis.document,
W = new WeakMap,
V = e => {
    let t = W.get(e);
    return t || W.set(e, t = new Set), t
},
B = new P.ResizeObserver((e => {
    for (const t of e)
        for (const e of V(t.target)) e(t)
}));

function $(e, t) {
V(e).add(t), B.observe(e)
}

function H(e, t) {
const i = V(e);
i.delete(t), i.size || B.unobserve(e)
}

function F(e) {
var i;
return null != (i = function(e) {
    var i;
    const {
        MEDIA_CONTROLLER: n
    } = t, a = e.getAttribute(n);
    if (a) return null == (i = function(e) {
        var t;
        const i = null == (t = null == e ? void 0 : e.getRootNode) ? void 0 : t.call(e);
        if (i instanceof ShadowRoot || i instanceof Document) return i;
        return null
    }(e)) ? void 0 : i.getElementById(a)
}(e)) ? i : K(e, "neptune-controller")
}
const G = (e, t, i = ".value") => {
    const n = e.querySelector(i);
    n && (n.textContent = t)
},
q = (e, t) => ((e, t) => {
    const i = `slot[name="${t}"]`,
        n = e.shadowRoot.querySelector(i);
    return n ? n.children : []
})(e, t)[0],
Q = (e, t) => !(!e || !t) && (!!(null == e ? void 0 : e.contains(t)) || Q(e, t.getRootNode().host)),
K = (e, t) => {
    if (!e) return null;
    const i = e.closest(t);
    return i || K(e.getRootNode().host, t)
};

function j(e = document) {
var t;
const i = null == e ? void 0 : e.activeElement;
return i ? null != (t = j(i.shadowRoot)) ? t : i : null
}

function Y(e, {
depth: t = 3,
checkOpacity: i = !0,
checkVisibilityCSS: n = !0
} = {}) {
if (e.checkVisibility) return e.checkVisibility({
    checkOpacity: i,
    checkVisibilityCSS: n
});
let a = e;
for (; a && t > 0;) {
    const e = getComputedStyle(a);
    if (i && "0" === e.opacity || n && "hidden" === e.visibility || "none" === e.display) return !1;
    a = a.parentElement, t--
}
return !0
}

function Z(e, t) {
const i = function(e, t) {
    var i, n;
    let a;
    for (a of null != (i = e.querySelectorAll("style:not([media])")) ? i : []) {
        let e;
        try {
            e = null == (n = a.sheet) ? void 0 : n.cssRules
        } catch {
            continue
        }
        for (const i of null != e ? e : [])
            if (t(i.selectorText)) return i
    }
}(e, (e => e === t));
return i || function(e, t) {
    var i, n;
    const a = null != (i = e.querySelectorAll("style:not([media])")) ? i : [],
        s = null == a ? void 0 : a[a.length - 1];
    if (!(null == s ? void 0 : s.sheet)) return console.warn("Media Chrome: No style sheet found on style tag of", e), {
        style: {
            setProperty: () => {},
            removeProperty: () => "",
            getPropertyValue: () => ""
        }
    };
    return null == s || s.sheet.insertRule(`${t}{}`, s.sheet.cssRules.length), null == (n = s.sheet.cssRules) ? void 0 : n[s.sheet.cssRules.length - 1]
}(e, t)
}

function z(e, t, i = Number.NaN) {
const n = e.getAttribute(t);
return null != n ? +n : i
}

function X(e, t, i) {
const n = +i;
null == i || Number.isNaN(n) ? e.hasAttribute(t) && e.removeAttribute(t) : z(e, t, void 0) !== n && e.setAttribute(t, `${n}`)
}

function J(e, t) {
return e.hasAttribute(t)
}

function ee(e, t, i) {
null != i ? J(e, t) != i && e.toggleAttribute(t, i) : e.hasAttribute(t) && e.removeAttribute(t)
}

function te(e, t, i = null) {
var n;
return null != (n = e.getAttribute(t)) ? n : i
}

function ie(e, t, i) {
if (null == i) return void(e.hasAttribute(t) && e.removeAttribute(t));
const n = `${i}`;
te(e, t, void 0) !== n && e.setAttribute(t, n)
}
var ne, ae = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
se = (e, t, i) => (ae(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
re = (e, t, i, n) => (ae(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const oe = O.createElement("template");
oe.innerHTML = "\n<style>\n  :host {\n    display: var(--neptune-control-display, var(--neptune-gesture-receiver-display, inline-block));\n    box-sizing: border-box;\n  }\n</style>\n";
class le extends P.HTMLElement {
constructor(e = {}) {
    if (super(), ((e, t, i) => {
            if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
            t instanceof WeakSet ? t.add(e) : t.set(e, i)
        })(this, ne, void 0), !this.shadowRoot) {
        const t = this.attachShadow({
                mode: "open"
            }),
            i = oe.content.cloneNode(!0);
        this.nativeEl = i;
        let n = e.slotTemplate;
        n || (n = O.createElement("template"), n.innerHTML = `<slot>${e.defaultContent||""}</slot>`), this.nativeEl.appendChild(n.content.cloneNode(!0)), t.appendChild(i)
    }
}
static get observedAttributes() {
    return [t.MEDIA_CONTROLLER, a.MEDIA_PAUSED]
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === t.MEDIA_CONTROLLER && (i && (null == (s = null == (a = se(this, ne)) ? void 0 : a.unassociateElement) || s.call(a, this), re(this, ne, null)), n && this.isConnected && (re(this, ne, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = se(this, ne)) ? void 0 : o.associateElement) || l.call(o, this)))
}
connectedCallback() {
    var e, i, n, a;
    this.tabIndex = -1, this.setAttribute("aria-hidden", "true"), re(this, ne, function(e) {
        var i;
        const n = e.getAttribute(t.MEDIA_CONTROLLER);
        if (n) return null == (i = e.getRootNode()) ? void 0 : i.getElementById(n);
        return K(e, "neptune-controller")
    }(this)), this.getAttribute(t.MEDIA_CONTROLLER) && (null == (i = null == (e = se(this, ne)) ? void 0 : e.associateElement) || i.call(e, this)), null == (n = se(this, ne)) || n.addEventListener("pointerdown", this), null == (a = se(this, ne)) || a.addEventListener("click", this)
}
disconnectedCallback() {
    var e, i, n, a;
    this.getAttribute(t.MEDIA_CONTROLLER) && (null == (i = null == (e = se(this, ne)) ? void 0 : e.unassociateElement) || i.call(e, this)), null == (n = se(this, ne)) || n.removeEventListener("pointerdown", this), null == (a = se(this, ne)) || a.removeEventListener("click", this), re(this, ne, null)
}
handleEvent(e) {
    var t;
    const i = null == (t = e.composedPath()) ? void 0 : t[0];
    if (["video", "neptune-controller"].includes(null == i ? void 0 : i.localName))
        if ("pointerdown" === e.type) this._pointerType = e.pointerType;
        else if ("click" === e.type) {
        const {
            clientX: t,
            clientY: i
        } = e, {
            left: n,
            top: a,
            width: s,
            height: r
        } = this.getBoundingClientRect(), o = t - n, l = i - a;
        if (o < 0 || l < 0 || o > s || l > r || 0 === s && 0 === r) return;
        const {
            pointerType: d = this._pointerType
        } = e;
        if (this._pointerType = void 0, d === c.TOUCH) return void this.handleTap(e);
        if (d === c.MOUSE) return void this.handleMouseClick(e)
    }
}
get mediaPaused() {
    return J(this, a.MEDIA_PAUSED)
}
set mediaPaused(e) {
    ee(this, a.MEDIA_PAUSED, e)
}
handleTap(e) {}
handleMouseClick(t) {
    const i = this.mediaPaused ? e.MEDIA_PLAY_REQUEST : e.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(new P.CustomEvent(i, {
        composed: !0,
        bubbles: !0
    }))
}
}
ne = new WeakMap, P.customElements.get("neptune-gesture-receiver") || P.customElements.define("neptune-gesture-receiver", le);
var de, ce, ue, he, me, pe, Ee, ve, be, ge, Ae, fe, Ie, ye, _e, we, ke, Te, Me, Se = le,
Re = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
De = (e, t, i) => (Re(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
Ce = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Le = (e, t, i, n) => (Re(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i),
xe = (e, t, i) => (Re(e, t, "access private method"), i);
const Ne = {
    AUDIO: "audio",
    AUTOHIDE: "autohide",
    BREAKPOINTS: "breakpoints",
    GESTURES_DISABLED: "gesturesdisabled",
    KEYBOARD_CONTROL: "keyboardcontrol",
    NO_AUTOHIDE: "noautohide",
    USER_INACTIVE: "userinactive",
    AUTOHIDE_OVER_CONTROLS: "autohideovercontrols"
},
Ue = O.createElement("template");
Ue.innerHTML = `\n  <style>\n    \n    :host([${a.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {\n      outline: none;\n    }\n\n    :host {\n      box-sizing: border-box;\n      position: relative;\n      display: inline-block;\n      line-height: 0;\n      background-color: var(--neptune-background-color, #000);\n    }\n\n    :host(:not([${Ne.AUDIO}])) [part~=layer]:not([part~=neptune-layer]) {\n      position: absolute;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      right: 0;\n      display: flex;\n      flex-flow: column nowrap;\n      align-items: start;\n      pointer-events: none;\n      background: none;\n    }\n\n    slot[name=media] {\n      display: var(--neptune-slot-display, contents);\n    }\n\n    \n    :host([${Ne.AUDIO}]) slot[name=media] {\n      display: var(--neptune-slot-display, none);\n    }\n\n    \n    :host([${Ne.AUDIO}]) [part~=layer][part~=gesture-layer] {\n      height: 0;\n      display: block;\n    }\n\n    \n    :host(:not([${Ne.AUDIO}])[${Ne.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),\n    :host(:not([${Ne.AUDIO}])[${Ne.GESTURES_DISABLED}]) neptune-gesture-receiver[slot=gestures-chrome] {\n      display: none;\n    }\n\n    \n    ::slotted(:not([slot=media]):not([slot=poster]):not(neptune-loading-indicator):not([role=dialog]):not([hidden])) {\n      pointer-events: auto;\n    }\n\n    :host(:not([${Ne.AUDIO}])) *[part~=layer][part~=centered-layer] {\n      align-items: center;\n      justify-content: center;\n    }\n\n    :host(:not([${Ne.AUDIO}])) ::slotted(neptune-gesture-receiver[slot=gestures-chrome]),\n    :host(:not([${Ne.AUDIO}])) neptune-gesture-receiver[slot=gestures-chrome] {\n      align-self: stretch;\n      flex-grow: 1;\n    }\n\n    slot[name=middle-chrome] {\n      display: inline;\n      flex-grow: 1;\n      pointer-events: none;\n      background: none;\n    }\n\n    \n    ::slotted([slot=media]),\n    ::slotted([slot=poster]) {\n      width: 100%;\n      height: 100%;\n    }\n\n    \n    :host(:not([${Ne.AUDIO}])) .spacer {\n      flex-grow: 1;\n    }\n\n    \n    :host(:-webkit-full-screen) {\n      \n      width: 100% !important;\n      height: 100% !important;\n    }\n\n    \n    ::slotted(:not([slot=media]):not([slot=poster]):not([${Ne.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {\n      opacity: 1;\n      transition: var(--neptune-control-transition-in, opacity 0.25s);\n    }\n\n    \n    :host([${Ne.USER_INACTIVE}]:not([${a.MEDIA_PAUSED}]):not([${a.MEDIA_IS_AIRPLAYING}]):not([${a.MEDIA_IS_CASTING}]):not([${Ne.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${Ne.NO_AUTOHIDE}]):not([role=dialog])) {\n      opacity: 0;\n      transition: var(--neptune-control-transition-out, opacity 1s);\n    }\n\n    :host([${Ne.USER_INACTIVE}]:not([${Ne.NO_AUTOHIDE}]):not([${a.MEDIA_PAUSED}]):not([${a.MEDIA_IS_CASTING}]):not([${Ne.AUDIO}])) ::slotted([slot=media]) {\n      cursor: none;\n    }\n\n    :host([${Ne.USER_INACTIVE}][${Ne.AUTOHIDE_OVER_CONTROLS}]:not([${Ne.NO_AUTOHIDE}]):not([${a.MEDIA_PAUSED}]):not([${a.MEDIA_IS_CASTING}]):not([${Ne.AUDIO}])) * {\n     --neptune-cursor: none;\n     cursor: none;\n    }\n\n\n    ::slotted(neptune-control-bar)  {\n      align-self: stretch;\n    }\n\n    \n    :host(:not([${Ne.AUDIO}])[${a.MEDIA_HAS_PLAYED}]) slot[name=poster] {\n      display: none;\n    }\n\n    ::slotted([role=dialog]) {\n      width: 100%;\n      height: 100%;\n      align-self: center;\n    }\n\n    ::slotted([role=menu]) {\n      align-self: end;\n    }\n  </style>\n\n  <slot name="media" part="layer neptune-layer"></slot>\n  <slot name="poster" part="layer poster-layer"></slot>\n  <slot name="gestures-chrome" part="layer gesture-layer">\n    <neptune-gesture-receiver slot="gestures-chrome"></neptune-gesture-receiver>\n  </slot>\n  <span part="layer vertical-layer">\n    <slot name="top-chrome" part="top chrome"></slot>\n    <slot name="middle-chrome" part="middle chrome"></slot>\n    <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>\n    \n    <slot part="bottom chrome"></slot>\n  </span>\n  <slot name="dialog" part="layer dialog-layer"></slot>\n`;
const Pe = Object.values(a);

function Oe(e, t) {
var i;
if (!e.isConnected) return;
const n = function(e) {
        const t = e.split(/\s+/);
        return Object.fromEntries(t.map((e => e.split(":"))))
    }(null != (i = e.getAttribute(Ne.BREAKPOINTS)) ? i : "sm:384 md:576 lg:768 xl:960"),
    a = function(e, t) {
        return Object.keys(e).filter((i => t >= parseInt(e[i])))
    }(n, t);
let r = !1;
if (Object.keys(n).forEach((t => {
        a.includes(t) ? e.hasAttribute(`breakpoint${t}`) || (e.setAttribute(`breakpoint${t}`, ""), r = !0) : e.hasAttribute(`breakpoint${t}`) && (e.removeAttribute(`breakpoint${t}`), r = !0)
    })), r) {
    const t = new CustomEvent(s.BREAKPOINTS_CHANGE, {
        detail: a
    });
    e.dispatchEvent(t)
}
e.breakpointsComputed || (e.breakpointsComputed = !0, e.dispatchEvent(new CustomEvent(s.BREAKPOINTS_COMPUTED, {
    bubbles: !0,
    composed: !0
})))
}
class We extends P.HTMLElement {
constructor() {
    super(), Ce(this, pe), Ce(this, ge), Ce(this, fe), Ce(this, ye), Ce(this, we), Ce(this, Te), Ce(this, de, 0), Ce(this, ce, null), Ce(this, ue, null), Ce(this, he, void 0), this.breakpointsComputed = !1, Ce(this, me, new MutationObserver(xe(this, pe, Ee).bind(this))), Ce(this, ve, !1), Ce(this, be, (e => {
        De(this, ve) || (setTimeout((() => {
            ! function(e) {
                Oe(e.target, e.contentRect.width)
            }(e), Le(this, ve, !1)
        }), 0), Le(this, ve, !0))
    })), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(Ue.content.cloneNode(!0)));
    const e = this.querySelector(":scope > slot[slot=media]");
    e && e.addEventListener("slotchange", (() => {
        e.assignedElements({
            flatten: !0
        }).length ? this.handleMediaUpdated(this.media) : De(this, ce) && this.mediaUnsetCallback(De(this, ce))
    }))
}
static get observedAttributes() {
    return [Ne.AUTOHIDE, Ne.GESTURES_DISABLED].concat(Pe).filter((e => ![a.MEDIA_RENDITION_LIST, a.MEDIA_AUDIO_TRACK_LIST, a.MEDIA_CHAPTERS_CUES, a.MEDIA_WIDTH, a.MEDIA_HEIGHT, a.MEDIA_ERROR, a.MEDIA_ERROR_MESSAGE].includes(e)))
}
attributeChangedCallback(e, t, i) {
    e.toLowerCase() == Ne.AUTOHIDE && (this.autohide = i)
}
get media() {
    let e = this.querySelector(":scope > [slot=media]");
    return "SLOT" == (null == e ? void 0 : e.nodeName) && (e = e.assignedElements({
        flatten: !0
    })[0]), e
}
async handleMediaUpdated(e) {
    e && (Le(this, ce, e), e.localName.includes("-") && await P.customElements.whenDefined(e.localName), this.mediaSetCallback(e))
}
connectedCallback() {
    var e;
    De(this, me).observe(this, {
        childList: !0,
        subtree: !0
    }), $(this, De(this, be));
    const t = null != this.getAttribute(Ne.AUDIO),
        i = S(t ? "audio player" : "video player");
    this.setAttribute("role", "region"), this.setAttribute("aria-label", i), this.handleMediaUpdated(this.media), this.setAttribute(Ne.USER_INACTIVE, ""), Oe(this, this.getBoundingClientRect().width), this.addEventListener("pointerdown", this), this.addEventListener("pointermove", this), this.addEventListener("pointerup", this), this.addEventListener("mouseleave", this), this.addEventListener("keyup", this), null == (e = P.window) || e.addEventListener("mouseup", this)
}
disconnectedCallback() {
    var e;
    De(this, me).disconnect(), H(this, De(this, be)), this.media && this.mediaUnsetCallback(this.media), null == (e = P.window) || e.removeEventListener("mouseup", this)
}
mediaSetCallback(e) {}
mediaUnsetCallback(e) {
    Le(this, ce, null)
}
handleEvent(e) {
    switch (e.type) {
        case "pointerdown":
            Le(this, de, e.timeStamp);
            break;
        case "pointermove":
            xe(this, ge, Ae).call(this, e);
            break;
        case "pointerup":
            xe(this, fe, Ie).call(this, e);
            break;
        case "mouseleave":
            xe(this, ye, _e).call(this);
            break;
        case "mouseup":
            this.removeAttribute(Ne.KEYBOARD_CONTROL);
            break;
        case "keyup":
            xe(this, Te, Me).call(this), this.setAttribute(Ne.KEYBOARD_CONTROL, "")
    }
}
set autohide(e) {
    const t = Number(e);
    Le(this, he, isNaN(t) ? 0 : t)
}
get autohide() {
    return (void 0 === De(this, he) ? 2 : De(this, he)).toString()
}
get breakpoints() {
    return te(this, Ne.BREAKPOINTS)
}
set breakpoints(e) {
    ie(this, Ne.BREAKPOINTS, e)
}
get audio() {
    return J(this, Ne.AUDIO)
}
set audio(e) {
    ee(this, Ne.AUDIO, e)
}
get gesturesDisabled() {
    return J(this, Ne.GESTURES_DISABLED)
}
set gesturesDisabled(e) {
    ee(this, Ne.GESTURES_DISABLED, e)
}
get keyboardControl() {
    return J(this, Ne.KEYBOARD_CONTROL)
}
set keyboardControl(e) {
    ee(this, Ne.KEYBOARD_CONTROL, e)
}
get noAutohide() {
    return J(this, Ne.NO_AUTOHIDE)
}
set noAutohide(e) {
    ee(this, Ne.NO_AUTOHIDE, e)
}
get autohideOverControls() {
    return J(this, Ne.AUTOHIDE_OVER_CONTROLS)
}
set autohideOverControls(e) {
    ee(this, Ne.AUTOHIDE_OVER_CONTROLS, e)
}
get userInteractive() {
    return J(this, Ne.USER_INACTIVE)
}
set userInteractive(e) {
    ee(this, Ne.USER_INACTIVE, e)
}
}
de = new WeakMap, ce = new WeakMap, ue = new WeakMap, he = new WeakMap, me = new WeakMap, pe = new WeakSet, Ee = function(e) {
const t = this.media;
for (const i of e) {
    if ("childList" !== i.type) continue;
    const e = i.removedNodes;
    for (const n of e) {
        if ("media" != n.slot || i.target != this) continue;
        let e = i.previousSibling && i.previousSibling.previousElementSibling;
        if (e && t) {
            let t = "media" !== e.slot;
            for (; null !== (e = e.previousSibling);) "media" == e.slot && (t = !1);
            t && this.mediaUnsetCallback(n)
        } else this.mediaUnsetCallback(n)
    }
    if (t)
        for (const e of i.addedNodes) e === t && this.handleMediaUpdated(t)
}
}, ve = new WeakMap, be = new WeakMap, ge = new WeakSet, Ae = function(e) {
if ("mouse" !== e.pointerType) {
    const t = 250;
    if (e.timeStamp - De(this, de) < t) return
}
xe(this, we, ke).call(this), clearTimeout(De(this, ue));
const t = this.hasAttribute(Ne.AUTOHIDE_OVER_CONTROLS);
([this, this.media].includes(e.target) || t) && xe(this, Te, Me).call(this)
}, fe = new WeakSet, Ie = function(e) {
if ("touch" === e.pointerType) {
    const t = !this.hasAttribute(Ne.USER_INACTIVE);
    [this, this.media].includes(e.target) && t ? xe(this, ye, _e).call(this) : xe(this, Te, Me).call(this)
} else e.composedPath().some((e => ["neptune-play-button", "neptune-fullscreen-button"].includes(null == e ? void 0 : e.localName))) && xe(this, Te, Me).call(this)
}, ye = new WeakSet, _e = function() {
if (De(this, he) < 0) return;
if (this.hasAttribute(Ne.USER_INACTIVE)) return;
this.setAttribute(Ne.USER_INACTIVE, "");
const e = new P.CustomEvent(s.USER_INACTIVE_CHANGE, {
    composed: !0,
    bubbles: !0,
    detail: !0
});
this.dispatchEvent(e)
}, we = new WeakSet, ke = function() {
if (!this.hasAttribute(Ne.USER_INACTIVE)) return;
this.removeAttribute(Ne.USER_INACTIVE);
const e = new P.CustomEvent(s.USER_INACTIVE_CHANGE, {
    composed: !0,
    bubbles: !0,
    detail: !1
});
this.dispatchEvent(e)
}, Te = new WeakSet, Me = function() {
xe(this, we, ke).call(this), clearTimeout(De(this, ue));
const e = parseInt(this.autohide);
e < 0 || Le(this, ue, setTimeout((() => {
    xe(this, ye, _e).call(this)
}), 1e3 * e))
}, P.customElements.get("neptune-container") || P.customElements.define("neptune-container", We);
var Ve, Be, $e, He, Fe, Ge, qe = We,
Qe = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
Ke = (e, t, i) => (Qe(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
je = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Ye = (e, t, i, n) => (Qe(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
class Ze {
constructor(e, t, {
    defaultValue: i
} = {
    defaultValue: void 0
}) {
    je(this, Fe), je(this, Ve, void 0), je(this, Be, void 0), je(this, $e, void 0), je(this, He, new Set), Ye(this, Ve, e), Ye(this, Be, t), Ye(this, $e, new Set(i))
} [Symbol.iterator]() {
    return Ke(this, Fe, Ge).values()
}
get length() {
    return Ke(this, Fe, Ge).size
}
get value() {
    var e;
    return null != (e = [...Ke(this, Fe, Ge)].join(" ")) ? e : ""
}
set value(e) {
    var t;
    e !== this.value && (Ye(this, He, new Set), this.add(...null != (t = null == e ? void 0 : e.split(" ")) ? t : []))
}
toString() {
    return this.value
}
item(e) {
    return [...Ke(this, Fe, Ge)][e]
}
values() {
    return Ke(this, Fe, Ge).values()
}
forEach(e, t) {
    Ke(this, Fe, Ge).forEach(e, t)
}
add(...e) {
    var t, i;
    e.forEach((e => Ke(this, He).add(e))), ("" !== this.value || (null == (t = Ke(this, Ve)) ? void 0 : t.hasAttribute(`${Ke(this,Be)}`))) && (null == (i = Ke(this, Ve)) || i.setAttribute(`${Ke(this,Be)}`, `${this.value}`))
}
remove(...e) {
    var t;
    e.forEach((e => Ke(this, He).delete(e))), null == (t = Ke(this, Ve)) || t.setAttribute(`${Ke(this,Be)}`, `${this.value}`)
}
contains(e) {
    return Ke(this, Fe, Ge).has(e)
}
toggle(e, t) {
    return void 0 !== t ? t ? (this.add(e), !0) : (this.remove(e), !1) : this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0)
}
replace(e, t) {
    return this.remove(e), this.add(t), e === t
}
}
Ve = new WeakMap, Be = new WeakMap, $e = new WeakMap, He = new WeakMap, Fe = new WeakSet, Ge = function() {
return Ke(this, He).size ? Ke(this, He) : Ke(this, $e)
};
const ze = (e = "") => {
    const [t, i, n] = e.split(":"), a = n ? decodeURIComponent(n) : void 0;
    return {
        kind: "cc" === t ? l.CAPTIONS : l.SUBTITLES,
        language: i,
        label: a
    }
},
Xe = (e = "", t = {}) => ((e = "") => e.split(/\s+/))(e).map((e => {
    const i = ze(e);
    return {
        ...t,
        ...i
    }
})),
Je = e => e ? Array.isArray(e) ? e.map((e => "string" == typeof e ? ze(e) : e)) : "string" == typeof e ? Xe(e) : [e] : [],
et = ({
    kind: e,
    label: t,
    language: i
} = {
    kind: "subtitles"
}) => t ? `${"captions"===e?"cc":"sb"}:${i}:${encodeURIComponent(t)}` : i,
tt = (e = []) => Array.prototype.map.call(e, et).join(" "),
it = e => {
    const t = Object.entries(e).map((([e, t]) => ((e, t) => i => i[e] === t)(e, t)));
    return e => t.every((t => t(e)))
},
nt = (e, t = [], i = []) => {
    const n = Je(i).map(it);
    Array.from(t).filter((e => n.some((t => t(e))))).forEach((t => {
        t.mode = e
    }))
},
at = (e, t = () => !0) => {
    if (!(null == e ? void 0 : e.textTracks)) return [];
    const i = "function" == typeof t ? t : it(t);
    return Array.from(e.textTracks).filter(i)
},
st = "exitFullscreen" in O ? "exitFullscreen" : "webkitExitFullscreen" in O ? "webkitExitFullscreen" : "webkitCancelFullScreen" in O ? "webkitCancelFullScreen" : void 0,
rt = "fullscreenElement" in O ? "fullscreenElement" : "webkitFullscreenElement" in O ? "webkitFullscreenElement" : void 0,
ot = e => {
    var t;
    const {
        media: i,
        documentElement: n,
        fullscreenElement: a = i
    } = e;
    if (!i || !n) return !1;
    const s = (e => {
        const {
            documentElement: t,
            media: i
        } = e, n = null == t ? void 0 : t[rt];
        return !n && "webkitDisplayingFullscreen" in i && "webkitPresentationMode" in i && i.webkitDisplayingFullscreen && i.webkitPresentationMode === m.FULLSCREEN ? i : n
    })(e);
    if (!s) return !1;
    if (s === a || s === i) return !0;
    if (s.localName.includes("-")) {
        let e = s.shadowRoot;
        if (!(rt in e)) return Q(s, a);
        for (; null == e ? void 0 : e[rt];) {
            if (e[rt] === a) return !0;
            e = null == (t = e[rt]) ? void 0 : t.shadowRoot
        }
    }
    return !1
},
lt = "fullscreenEnabled" in O ? "fullscreenEnabled" : "webkitFullscreenEnabled" in O ? "webkitFullscreenEnabled" : void 0;
let dt;
const ct = () => {
    var e, t;
    return dt || (dt = null == (t = null == (e = O) ? void 0 : e.createElement) ? void 0 : t.call(e, "video"), dt)
},
ut = (e, t) => new Promise((i => {
    e.addEventListener("volumechange", (() => i(!0)), {
        signal: t
    })
})),
ht = async (e, t) => {
    for (let i = 0; i < 10; i++) {
        if (e.volume === t) return !1;
        await g(10)
    }
    return e.volume !== t
}, mt = /.*Version\/.*Safari\/.*/.test(P.navigator.userAgent), pt = (e = ct()) => (!P.matchMedia("(display-mode: standalone)").matches || !mt) && "function" == typeof(null == e ? void 0 : e.requestPictureInPicture), Et = (e = ct()) => (e => {
    const {
        documentElement: t,
        media: i
    } = e;
    return !!(null == t ? void 0 : t[lt]) || i && "webkitSupportsFullscreen" in i
})({
    documentElement: O,
    media: e
}), vt = Et(), bt = pt(), gt = !!P.WebKitPlaybackTargetAvailabilityEvent, At = !!P.chrome, ft = e => at(e.media, (e => [l.SUBTITLES, l.CAPTIONS].includes(e.kind))).sort(((e, t) => e.kind >= t.kind ? 1 : -1)), It = e => at(e.media, (e => e.mode === d.SHOWING && [l.SUBTITLES, l.CAPTIONS].includes(e.kind))), yt = (e, t) => {
    const i = ft(e),
        n = It(e),
        a = !!n.length;
    if (i.length)
        if (!1 === t || a && !0 !== t) nt(d.DISABLED, i, n);
        else if (!0 === t || !a && !1 !== t) {
        let t = i[0];
        const {
            options: a
        } = e;
        if (!(null == a ? void 0 : a.noSubtitlesLangPref)) {
            const e = globalThis.localStorage.getItem("neptune-chrome-pref-subtitles-lang"),
                n = e ? [e, ...globalThis.navigator.languages] : globalThis.navigator.languages,
                a = i.filter((e => n.some((t => e.language.toLowerCase().startsWith(t.split("-")[0]))))).sort(((e, t) => n.findIndex((t => e.language.toLowerCase().startsWith(t.split("-")[0]))) - n.findIndex((e => t.language.toLowerCase().startsWith(e.split("-")[0])))));
            a[0] && (t = a[0])
        }
        const {
            language: s,
            label: r,
            kind: o
        } = t;
        nt(d.DISABLED, i, n), nt(d.SHOWING, i, [{
            language: s,
            label: r,
            kind: o
        }])
    }
}, _t = (e, t) => e === t || null != e && null != t && (typeof e == typeof t && (!("number" != typeof e || !Number.isNaN(e) || !Number.isNaN(t)) || "object" == typeof e && (Array.isArray(e) ? wt(e, t) : Object.entries(e).every((([e, i]) => e in t && _t(i, t[e])))))), wt = (e, t) => {
    const i = Array.isArray(e),
        n = Array.isArray(t);
    return i === n && (!i && !n || e.length === t.length && e.every(((e, i) => _t(e, t[i]))))
}, kt = Object.values(h);
let Tt;
const Mt = (async (e = ct()) => {
    if (!e) return !1;
    const t = e.volume;
    e.volume = t / 2 + .1;
    const i = new AbortController,
        n = await Promise.race([ut(e, i.signal), ht(e, t)]);
    return i.abort(), n
})().then((e => (Tt = e, Tt))),
St = {
    mediaError: {
        get(e, t) {
            const {
                media: i
            } = e;
            if ("playing" !== (null == t ? void 0 : t.type)) return null == i ? void 0 : i.error
        },
        mediaEvents: ["emptied", "error", "playing"]
    },
    mediaErrorCode: {
        get(e, t) {
            var i;
            const {
                media: n
            } = e;
            if ("playing" !== (null == t ? void 0 : t.type)) return null == (i = null == n ? void 0 : n.error) ? void 0 : i.code
        },
        mediaEvents: ["emptied", "error", "playing"]
    },
    mediaErrorMessage: {
        get(e, t) {
            var i, n;
            const {
                media: a
            } = e;
            if ("playing" !== (null == t ? void 0 : t.type)) return null != (n = null == (i = null == a ? void 0 : a.error) ? void 0 : i.message) ? n : ""
        },
        mediaEvents: ["emptied", "error", "playing"]
    },
    mediaWidth: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.videoWidth) ? t : 0
        },
        mediaEvents: ["resize"]
    },
    mediaHeight: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.videoHeight) ? t : 0
        },
        mediaEvents: ["resize"]
    },
    mediaPaused: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null == (t = null == i ? void 0 : i.paused) || t
        },
        set(e, t) {
            var i;
            const {
                media: n
            } = t;
            n && (e ? n.pause() : null == (i = n.play()) || i.catch((() => {})))
        },
        mediaEvents: ["play", "playing", "pause", "emptied"]
    },
    mediaHasPlayed: {
        get(e, t) {
            const {
                media: i
            } = e;
            return !!i && (t ? "playing" === t.type : !i.paused)
        },
        mediaEvents: ["playing", "emptied"]
    },
    mediaEnded: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.ended) && t
        },
        mediaEvents: ["seeked", "ended", "emptied"]
    },
    mediaPlaybackRate: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.playbackRate) ? t : 1
        },
        set(e, t) {
            const {
                media: i
            } = t;
            i && Number.isFinite(+e) && (i.playbackRate = +e)
        },
        mediaEvents: ["ratechange", "loadstart"]
    },
    mediaMuted: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.muted) && t
        },
        set(e, t) {
            const {
                media: i
            } = t;
            if (i) {
                try {
                    P.localStorage.setItem("neptune-chrome-pref-muted", e ? "true" : "false")
                } catch (e) {
                    console.debug("Error setting muted pref", e)
                }
                i.muted = e
            }
        },
        mediaEvents: ["volumechange"],
        stateOwnersUpdateHandlers: [(e, t) => {
            const {
                options: {
                    noMutedPref: i
                }
            } = t, {
                media: n
            } = t;
            if (n && !n.muted && !i) try {
                const i = "true" === P.localStorage.getItem("neptune-chrome-pref-muted");
                St.mediaMuted.set(i, t), e(i)
            } catch (e) {
                console.debug("Error getting muted pref", e)
            }
        }]
    },
    mediaVolume: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.volume) ? t : 1
        },
        set(e, t) {
            const {
                media: i
            } = t;
            if (i) {
                try {
                    null == e ? P.localStorage.removeItem("neptune-chrome-pref-volume") : P.localStorage.setItem("neptune-chrome-pref-volume", e.toString())
                } catch (e) {
                    console.debug("Error setting volume pref", e)
                }
                Number.isFinite(+e) && (i.volume = +e)
            }
        },
        mediaEvents: ["volumechange"],
        stateOwnersUpdateHandlers: [(e, t) => {
            const {
                options: {
                    noVolumePref: i
                }
            } = t;
            if (!i) try {
                const {
                    media: i
                } = t;
                if (!i) return;
                const n = P.localStorage.getItem("neptune-chrome-pref-volume");
                if (null == n) return;
                St.mediaVolume.set(+n, t), e(+n)
            } catch (e) {
                console.debug("Error getting volume pref", e)
            }
        }]
    },
    mediaVolumeLevel: {
        get(e) {
            const {
                media: t
            } = e;
            return void 0 === (null == t ? void 0 : t.volume) ? "high" : t.muted || 0 === t.volume ? "off" : t.volume < .5 ? "low" : t.volume < .75 ? "medium" : "high"
        },
        mediaEvents: ["volumechange"]
    },
    mediaCurrentTime: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return null != (t = null == i ? void 0 : i.currentTime) ? t : 0
        },
        set(e, t) {
            const {
                media: i
            } = t;
            i && b(e) && (i.currentTime = e)
        },
        mediaEvents: ["timeupdate", "loadedmetadata"]
    },
    mediaDuration: {
        get(e) {
            const {
                media: t,
                options: {
                    defaultDuration: i
                } = {}
            } = e;
            return !i || t && t.duration && !Number.isNaN(t.duration) && Number.isFinite(t.duration) ? Number.isFinite(null == t ? void 0 : t.duration) ? t.duration : Number.NaN : i
        },
        mediaEvents: ["durationchange", "loadedmetadata", "emptied"]
    },
    mediaLoading: {
        get(e) {
            const {
                media: t
            } = e;
            return (null == t ? void 0 : t.readyState) < 3
        },
        mediaEvents: ["waiting", "playing", "emptied"]
    },
    mediaSeekable: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            if (!(null == (t = null == i ? void 0 : i.seekable) ? void 0 : t.length)) return;
            const n = i.seekable.start(0),
                a = i.seekable.end(i.seekable.length - 1);
            return n || a ? [Number(n.toFixed(3)), Number(a.toFixed(3))] : void 0
        },
        mediaEvents: ["loadedmetadata", "emptied", "progress", "seekablechange"]
    },
    mediaBuffered: {
        get(e) {
            var t;
            const {
                media: i
            } = e, n = null != (t = null == i ? void 0 : i.buffered) ? t : [];
            return Array.from(n).map(((e, t) => [Number(n.start(t).toFixed(3)), Number(n.end(t).toFixed(3))]))
        },
        mediaEvents: ["progress", "emptied"]
    },
    mediaStreamType: {
        get(e) {
            const {
                media: t,
                options: {
                    defaultStreamType: i
                } = {}
            } = e, n = [h.LIVE, h.ON_DEMAND].includes(i) ? i : void 0;
            if (!t) return n;
            const {
                streamType: a
            } = t;
            if (kt.includes(a)) return a === h.UNKNOWN ? n : a;
            const s = t.duration;
            return s === 1 / 0 ? h.LIVE : Number.isFinite(s) ? h.ON_DEMAND : n
        },
        mediaEvents: ["emptied", "durationchange", "loadedmetadata", "streamtypechange"]
    },
    mediaTargetLiveWindow: {
        get(e) {
            const {
                media: t
            } = e;
            if (!t) return Number.NaN;
            const {
                targetLiveWindow: i
            } = t, n = St.mediaStreamType.get(e);
            return null != i && !Number.isNaN(i) || n !== h.LIVE ? i : 0
        },
        mediaEvents: ["emptied", "durationchange", "loadedmetadata", "streamtypechange", "targetlivewindowchange"]
    },
    mediaTimeIsLive: {
        get(e) {
            const {
                media: t,
                options: {
                    liveEdgeOffset: i = 10
                } = {}
            } = e;
            if (!t) return !1;
            if ("number" == typeof t.liveEdgeStart) return !Number.isNaN(t.liveEdgeStart) && t.currentTime >= t.liveEdgeStart;
            if (!(St.mediaStreamType.get(e) === h.LIVE)) return !1;
            const n = t.seekable;
            if (!n) return !0;
            if (!n.length) return !1;
            const a = n.end(n.length - 1) - i;
            return t.currentTime >= a
        },
        mediaEvents: ["playing", "timeupdate", "progress", "waiting", "emptied"]
    },
    mediaSubtitlesList: {
        get: e => ft(e).map((({
            kind: e,
            label: t,
            language: i
        }) => ({
            kind: e,
            label: t,
            language: i
        }))),
        mediaEvents: ["loadstart"],
        textTracksEvents: ["addtrack", "removetrack"]
    },
    mediaSubtitlesShowing: {
        get: e => It(e).map((({
            kind: e,
            label: t,
            language: i
        }) => ({
            kind: e,
            label: t,
            language: i
        }))),
        mediaEvents: ["loadstart"],
        textTracksEvents: ["addtrack", "removetrack", "change"],
        stateOwnersUpdateHandlers: [(e, t) => {
            var i, n;
            const {
                media: a,
                options: s
            } = t;
            if (!a) return;
            const r = e => {
                var i;
                if (!s.defaultSubtitles) return;
                e && ![l.CAPTIONS, l.SUBTITLES].includes(null == (i = null == e ? void 0 : e.track) ? void 0 : i.kind) || yt(t, !0)
            };
            return a.addEventListener("loadstart", r), null == (i = a.textTracks) || i.addEventListener("addtrack", r), null == (n = a.textTracks) || n.addEventListener("removetrack", r), () => {
                var e, t;
                a.removeEventListener("loadstart", r), null == (e = a.textTracks) || e.removeEventListener("addtrack", r), null == (t = a.textTracks) || t.removeEventListener("removetrack", r)
            }
        }]
    },
    mediaChaptersCues: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            if (!i) return [];
            const [n] = at(i, {
                kind: l.CHAPTERS
            });
            return Array.from(null != (t = null == n ? void 0 : n.cues) ? t : []).map((({
                text: e,
                startTime: t,
                endTime: i
            }) => ({
                text: e,
                startTime: t,
                endTime: i
            })))
        },
        mediaEvents: ["loadstart", "loadedmetadata"],
        textTracksEvents: ["addtrack", "removetrack", "change"],
        stateOwnersUpdateHandlers: [(e, t) => {
            var i;
            const {
                media: n
            } = t;
            if (!n) return;
            const a = n.querySelector('track[kind="chapters"][default][src]'),
                s = null == (i = n.shadowRoot) ? void 0 : i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');
            return null == a || a.addEventListener("load", e), null == s || s.addEventListener("load", e), () => {
                null == a || a.removeEventListener("load", e), null == s || s.removeEventListener("load", e)
            }
        }]
    },
    mediaIsPip: {
        get(e) {
            var t, i;
            const {
                media: n,
                documentElement: a
            } = e;
            if (!n || !a) return !1;
            if (!a.pictureInPictureElement) return !1;
            if (a.pictureInPictureElement === n) return !0;
            if (a.pictureInPictureElement instanceof HTMLMediaElement) return !!(null == (t = n.localName) ? void 0 : t.includes("-")) && Q(n, a.pictureInPictureElement);
            if (a.pictureInPictureElement.localName.includes("-")) {
                let e = a.pictureInPictureElement.shadowRoot;
                for (; null == e ? void 0 : e.pictureInPictureElement;) {
                    if (e.pictureInPictureElement === n) return !0;
                    e = null == (i = e.pictureInPictureElement) ? void 0 : i.shadowRoot
                }
            }
            return !1
        },
        set(e, t) {
            const {
                media: i
            } = t;
            if (i)
                if (e) {
                    if (!O.pictureInPictureEnabled) return void console.warn("MediaChrome: Picture-in-picture is not enabled");
                    if (!i.requestPictureInPicture) return void console.warn("MediaChrome: The current media does not support picture-in-picture");
                    const e = () => {
                        console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")
                    };
                    i.requestPictureInPicture().catch((t => {
                        if (11 !== t.code) throw t;
                        if (i.src) {
                            if (0 !== i.readyState || "none" !== i.preload) throw t;
                            {
                                const t = () => {
                                        i.removeEventListener("loadedmetadata", n), i.preload = "none"
                                    },
                                    n = () => {
                                        i.requestPictureInPicture().catch(e), t()
                                    };
                                i.addEventListener("loadedmetadata", n), i.preload = "metadata", setTimeout((() => {
                                    0 === i.readyState && e(), t()
                                }), 1e3)
                            }
                        } else console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.")
                    }))
                } else O.pictureInPictureElement && O.exitPictureInPicture()
        },
        mediaEvents: ["enterpictureinpicture", "leavepictureinpicture"]
    },
    mediaRenditionList: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return [...null != (t = null == i ? void 0 : i.videoRenditions) ? t : []].map((e => ({
                ...e
            })))
        },
        mediaEvents: ["emptied", "loadstart"],
        videoRenditionsEvents: ["addrendition", "removerendition"]
    },
    mediaRenditionSelected: {
        get(e) {
            var t, i, n;
            const {
                media: a
            } = e;
            return null == (n = null == (i = null == a ? void 0 : a.videoRenditions) ? void 0 : i[null == (t = a.videoRenditions) ? void 0 : t.selectedIndex]) ? void 0 : n.id
        },
        set(e, t) {
            const {
                media: i
            } = t;
            if (!(null == i ? void 0 : i.videoRenditions)) return void console.warn("MediaController: Rendition selection not supported by this media.");
            const n = e,
                a = Array.prototype.findIndex.call(i.videoRenditions, (e => e.id == n));
            i.videoRenditions.selectedIndex != a && (i.videoRenditions.selectedIndex = a)
        },
        mediaEvents: ["emptied"],
        videoRenditionsEvents: ["addrendition", "removerendition", "change"]
    },
    mediaAudioTrackList: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return [...null != (t = null == i ? void 0 : i.audioTracks) ? t : []]
        },
        mediaEvents: ["emptied", "loadstart"],
        audioTracksEvents: ["addtrack", "removetrack"]
    },
    mediaAudioTrackEnabled: {
        get(e) {
            var t, i;
            const {
                media: n
            } = e;
            return null == (i = [...null != (t = null == n ? void 0 : n.audioTracks) ? t : []].find((e => e.enabled))) ? void 0 : i.id
        },
        set(e, t) {
            const {
                media: i
            } = t;
            if (!(null == i ? void 0 : i.audioTracks)) return void console.warn("MediaChrome: Audio track selection not supported by this media.");
            const n = e;
            for (const e of i.audioTracks) e.enabled = n == e.id
        },
        mediaEvents: ["emptied"],
        audioTracksEvents: ["addtrack", "removetrack", "change"]
    },
    mediaIsFullscreen: {
        get: e => ot(e),
        set(e, t) {
            e ? (e => {
                var t;
                const {
                    media: i,
                    fullscreenElement: n
                } = e, a = n && "requestFullscreen" in n ? "requestFullscreen" : n && "webkitRequestFullScreen" in n ? "webkitRequestFullScreen" : void 0;
                if (a) {
                    const e = null == (t = n[a]) ? void 0 : t.call(n);
                    if (e instanceof Promise) e.catch((() => {}))
                } else(null == i ? void 0 : i.webkitEnterFullscreen) ? i.webkitEnterFullscreen() : (null == i ? void 0 : i.requestFullscreen) && i.requestFullscreen()
            })(t) : (e => {
                var t;
                const {
                    documentElement: i
                } = e;
                if (st) {
                    const e = null == (t = null == i ? void 0 : i[st]) ? void 0 : t.call(i);
                    if (e instanceof Promise) e.catch((() => {}))
                }
            })(t)
        },
        rootEvents: ["fullscreenchange", "webkitfullscreenchange"],
        mediaEvents: ["webkitbeginfullscreen", "webkitendfullscreen", "webkitpresentationmodechanged"]
    },
    mediaIsCasting: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return !(!(null == i ? void 0 : i.remote) || "disconnected" === (null == (t = i.remote) ? void 0 : t.state)) && !!i.remote.state
        },
        set(e, t) {
            var i, n;
            const {
                media: a
            } = t;
            a && (e && "disconnected" !== (null == (i = a.remote) ? void 0 : i.state) || (e || "connected" === (null == (n = a.remote) ? void 0 : n.state)) && ("function" == typeof a.remote.prompt ? a.remote.prompt().catch((() => {})) : console.warn("MediaChrome: Casting is not supported in this environment")))
        },
        remoteEvents: ["connect", "connecting", "disconnect"]
    },
    mediaIsAirplaying: {
        get: () => !1,
        set(e, t) {
            const {
                media: i
            } = t;
            i && (i.webkitShowPlaybackTargetPicker && P.WebKitPlaybackTargetAvailabilityEvent ? i.webkitShowPlaybackTargetPicker() : console.warn("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment"))
        },
        mediaEvents: ["webkitcurrentplaybacktargetiswirelesschanged"]
    },
    mediaFullscreenUnavailable: {
        get(e) {
            const {
                media: t
            } = e;
            if (!vt || !Et(t)) return u.UNSUPPORTED
        }
    },
    mediaPipUnavailable: {
        get(e) {
            const {
                media: t
            } = e;
            if (!bt || !pt(t)) return u.UNSUPPORTED
        }
    },
    mediaVolumeUnavailable: {
        get(e) {
            const {
                media: t
            } = e;
            if (!1 === Tt || null == (null == t ? void 0 : t.volume)) return u.UNSUPPORTED
        },
        stateOwnersUpdateHandlers: [e => {
            null == Tt && Mt.then((t => e(t ? void 0 : u.UNSUPPORTED)))
        }]
    },
    mediaCastUnavailable: {
        get(e, {
            availability: t = "not-available"
        } = {}) {
            var i;
            const {
                media: n
            } = e;
            return At && (null == (i = null == n ? void 0 : n.remote) ? void 0 : i.state) ? null != t && "available" !== t ? u.UNAVAILABLE : void 0 : u.UNSUPPORTED
        },
        stateOwnersUpdateHandlers: [(e, t) => {
            var i;
            const {
                media: n
            } = t;
            if (!n) return;
            return n.disableRemotePlayback || n.hasAttribute("disableremoteplayback") || null == (i = null == n ? void 0 : n.remote) || i.watchAvailability((t => {
                e({
                    availability: t ? "available" : "not-available"
                })
            })).catch((t => {
                "NotSupportedError" === t.name ? e({
                    availability: null
                }) : e({
                    availability: "not-available"
                })
            })), () => {
                var e;
                null == (e = null == n ? void 0 : n.remote) || e.cancelWatchAvailability().catch((() => {}))
            }
        }]
    },
    mediaAirplayUnavailable: {
        get: (e, t) => gt ? "not-available" === (null == t ? void 0 : t.availability) ? u.UNAVAILABLE : void 0 : u.UNSUPPORTED,
        mediaEvents: ["webkitplaybacktargetavailabilitychanged"],
        stateOwnersUpdateHandlers: [(e, t) => {
            var i;
            const {
                media: n
            } = t;
            if (!n) return;
            return n.disableRemotePlayback || n.hasAttribute("disableremoteplayback") || null == (i = null == n ? void 0 : n.remote) || i.watchAvailability((t => {
                e({
                    availability: t ? "available" : "not-available"
                })
            })).catch((t => {
                "NotSupportedError" === t.name ? e({
                    availability: null
                }) : e({
                    availability: "not-available"
                })
            })), () => {
                var e;
                null == (e = null == n ? void 0 : n.remote) || e.cancelWatchAvailability().catch((() => {}))
            }
        }]
    },
    mediaRenditionUnavailable: {
        get(e) {
            var t;
            const {
                media: i
            } = e;
            return (null == i ? void 0 : i.videoRenditions) ? (null == (t = i.videoRenditions) ? void 0 : t.length) ? void 0 : u.UNAVAILABLE : u.UNSUPPORTED
        },
        mediaEvents: ["emptied", "loadstart"],
        videoRenditionsEvents: ["addrendition", "removerendition"]
    },
    mediaAudioTrackUnavailable: {
        get(e) {
            var t, i;
            const {
                media: n
            } = e;
            return (null == n ? void 0 : n.audioTracks) ? (null != (i = null == (t = n.audioTracks) ? void 0 : t.length) ? i : 0) <= 1 ? u.UNAVAILABLE : void 0 : u.UNSUPPORTED
        },
        mediaEvents: ["emptied", "loadstart"],
        audioTracksEvents: ["addtrack", "removetrack"]
    }
},
Rt = {
    [e.MEDIA_PREVIEW_REQUEST](e, t, {
        detail: i
    }) {
        var n, a, s;
        const {
            media: r
        } = t, o = null != i ? i : void 0;
        let d, c;
        if (r && null != o) {
            const [e] = at(r, {
                kind: l.METADATA,
                label: "thumbnails"
            }), t = Array.prototype.find.call(null != (n = null == e ? void 0 : e.cues) ? n : [], ((e, t, i) => 0 === t ? e.endTime > o : t === i.length - 1 ? e.startTime <= o : e.startTime <= o && e.endTime > o));
            if (t) {
                const e = /'^(?:[a-z]+:)?\/\//i.test(t.text) || null == (a = null == r ? void 0 : r.querySelector('track[label="thumbnails"]')) ? void 0 : a.src,
                    i = new URL(t.text, e);
                c = new URLSearchParams(i.hash).get("#xywh").split(",").map((e => +e)), d = i.href
            }
        }
        const u = e.mediaDuration.get(t);
        let h = null == (s = e.mediaChaptersCues.get(t).find(((e, t, i) => t === i.length - 1 && u === e.endTime ? e.startTime <= o && e.endTime >= o : e.startTime <= o && e.endTime > o))) ? void 0 : s.text;
        return null != i && null == h && (h = ""), {
            mediaPreviewTime: o,
            mediaPreviewImage: d,
            mediaPreviewCoords: c,
            mediaPreviewChapter: h
        }
    },
    [e.MEDIA_PAUSE_REQUEST](e, t) {
        e.mediaPaused.set(!0, t)
    },
    [e.MEDIA_PLAY_REQUEST](e, t) {
        var i, n, a, s;
        const r = e.mediaStreamType.get(t) === h.LIVE,
            o = !(null == (i = t.options) ? void 0 : i.noAutoSeekToLive),
            l = e.mediaTargetLiveWindow.get(t) > 0;
        if (r && o && !l) {
            const i = null == (n = e.mediaSeekable.get(t)) ? void 0 : n[1];
            if (i) {
                const n = i - (null != (s = null == (a = t.options) ? void 0 : a.seekToLiveOffset) ? s : 0);
                e.mediaCurrentTime.set(n, t)
            }
        }
        e.mediaPaused.set(!1, t)
    },
    [e.MEDIA_PLAYBACK_RATE_REQUEST](e, t, {
        detail: i
    }) {
        const n = i;
        e.mediaPlaybackRate.set(n, t)
    },
    [e.MEDIA_MUTE_REQUEST](e, t) {
        e.mediaMuted.set(!0, t)
    },
    [e.MEDIA_UNMUTE_REQUEST](e, t) {
        e.mediaVolume.get(t) || e.mediaVolume.set(.25, t), e.mediaMuted.set(!1, t)
    },
    [e.MEDIA_VOLUME_REQUEST](e, t, {
        detail: i
    }) {
        const n = i;
        n && e.mediaMuted.get(t) && e.mediaMuted.set(!1, t), e.mediaVolume.set(n, t)
    },
    [e.MEDIA_SEEK_REQUEST](e, t, {
        detail: i
    }) {
        const n = i;
        e.mediaCurrentTime.set(n, t)
    },
    [e.MEDIA_SEEK_TO_LIVE_REQUEST](e, t) {
        var i, n, a;
        const s = null == (i = e.mediaSeekable.get(t)) ? void 0 : i[1];
        if (Number.isNaN(Number(s))) return;
        const r = s - (null != (a = null == (n = t.options) ? void 0 : n.seekToLiveOffset) ? a : 0);
        e.mediaCurrentTime.set(r, t)
    },
    [e.MEDIA_SHOW_SUBTITLES_REQUEST](e, t, {
        detail: i
    }) {
        var n;
        const {
            options: a
        } = t, s = ft(t), r = Je(i), o = null == (n = r[0]) ? void 0 : n.language;
        o && !a.noSubtitlesLangPref && P.localStorage.setItem("neptune-chrome-pref-subtitles-lang", o), nt(d.SHOWING, s, r)
    },
    [e.MEDIA_DISABLE_SUBTITLES_REQUEST](e, t, {
        detail: i
    }) {
        const n = ft(t);
        nt(d.DISABLED, n, null != i ? i : [])
    },
    [e.MEDIA_TOGGLE_SUBTITLES_REQUEST](e, t, {
        detail: i
    }) {
        yt(t, i)
    },
    [e.MEDIA_RENDITION_REQUEST](e, t, {
        detail: i
    }) {
        const n = i;
        e.mediaRenditionSelected.set(n, t)
    },
    [e.MEDIA_AUDIO_TRACK_REQUEST](e, t, {
        detail: i
    }) {
        const n = i;
        e.mediaAudioTrackEnabled.set(n, t)
    },
    [e.MEDIA_ENTER_PIP_REQUEST](e, t) {
        e.mediaIsFullscreen.get(t) && e.mediaIsFullscreen.set(!1, t), e.mediaIsPip.set(!0, t)
    },
    [e.MEDIA_EXIT_PIP_REQUEST](e, t) {
        e.mediaIsPip.set(!1, t)
    },
    [e.MEDIA_ENTER_FULLSCREEN_REQUEST](e, t) {
        e.mediaIsPip.get(t) && e.mediaIsPip.set(!1, t), e.mediaIsFullscreen.set(!0, t)
    },
    [e.MEDIA_EXIT_FULLSCREEN_REQUEST](e, t) {
        e.mediaIsFullscreen.set(!1, t)
    },
    [e.MEDIA_ENTER_CAST_REQUEST](e, t) {
        e.mediaIsFullscreen.get(t) && e.mediaIsFullscreen.set(!1, t), e.mediaIsCasting.set(!0, t)
    },
    [e.MEDIA_EXIT_CAST_REQUEST](e, t) {
        e.mediaIsCasting.set(!1, t)
    },
    [e.MEDIA_AIRPLAY_REQUEST](e, t) {
        e.mediaIsAirplaying.set(!0, t)
    }
},
Dt = ({
    media: e,
    fullscreenElement: t,
    documentElement: i,
    stateMediator: n = St,
    requestMap: a = Rt,
    options: s = {},
    monitorStateOwnersOnlyWithSubscriptions: r = !0
}) => {
    const o = [],
        l = {
            options: {
                ...s
            }
        };
    let d = Object.freeze({
        mediaPreviewTime: void 0,
        mediaPreviewImage: void 0,
        mediaPreviewCoords: void 0,
        mediaPreviewChapter: void 0
    });
    const c = e => {
            null != e && (_t(e, d) || (d = Object.freeze({
                ...d,
                ...e
            }), o.forEach((e => e(d)))))
        },
        u = () => {
            const e = Object.entries(n).reduce(((e, [t, {
                get: i
            }]) => (e[t] = i(l), e)), {});
            c(e)
        },
        h = {};
    let m;
    const p = async (e, t) => {
        var i, a, s, d, p, E, v, b, g, A, f, I, y, _, w, k;
        const T = !!m;
        if (m = {
                ...l,
                ...null != m ? m : {},
                ...e
            }, T) return;
        await (async (...e) => {
            await Promise.all(e.filter((e => e)).map((async e => {
                if (!("localName" in e && e instanceof P.HTMLElement)) return;
                const t = e.localName;
                if (!t.includes("-")) return;
                const i = P.customElements.get(t);
                i && e instanceof i || (await P.customElements.whenDefined(t), P.customElements.upgrade(e))
            })))
        })(...Object.values(e));
        const M = o.length > 0 && 0 === t && r,
            S = l.media !== m.media,
            R = (null == (i = l.media) ? void 0 : i.textTracks) !== (null == (a = m.media) ? void 0 : a.textTracks),
            D = (null == (s = l.media) ? void 0 : s.videoRenditions) !== (null == (d = m.media) ? void 0 : d.videoRenditions),
            C = (null == (p = l.media) ? void 0 : p.audioTracks) !== (null == (E = m.media) ? void 0 : E.audioTracks),
            L = (null == (v = l.media) ? void 0 : v.remote) !== (null == (b = m.media) ? void 0 : b.remote),
            x = l.documentElement !== m.documentElement,
            N = !!l.media && (S || M),
            U = !!(null == (g = l.media) ? void 0 : g.textTracks) && (R || M),
            O = !!(null == (A = l.media) ? void 0 : A.videoRenditions) && (D || M),
            W = !!(null == (f = l.media) ? void 0 : f.audioTracks) && (C || M),
            V = !!(null == (I = l.media) ? void 0 : I.remote) && (L || M),
            B = !!l.documentElement && (x || M),
            $ = N || U || O || W || V || B,
            H = 0 === o.length && 1 === t && r,
            F = !!m.media && (S || H),
            G = !!(null == (y = m.media) ? void 0 : y.textTracks) && (R || H),
            q = !!(null == (_ = m.media) ? void 0 : _.videoRenditions) && (D || H),
            Q = !!(null == (w = m.media) ? void 0 : w.audioTracks) && (C || H),
            K = !!(null == (k = m.media) ? void 0 : k.remote) && (L || H),
            j = !!m.documentElement && (x || H),
            Y = F || G || q || Q || K || j;
        if (!($ || Y)) return Object.entries(m).forEach((([e, t]) => {
            l[e] = t
        })), u(), void(m = void 0);
        Object.entries(n).forEach((([e, {
            get: t,
            mediaEvents: i = [],
            textTracksEvents: n = [],
            videoRenditionsEvents: a = [],
            audioTracksEvents: s = [],
            remoteEvents: r = [],
            rootEvents: o = [],
            stateOwnersUpdateHandlers: d = []
        }]) => {
            h[e] || (h[e] = {});
            const u = i => {
                const n = t(l, i);
                c({
                    [e]: n
                })
            };
            let p;
            p = h[e].mediaEvents, i.forEach((t => {
                p && N && (l.media.removeEventListener(t, p), h[e].mediaEvents = void 0), F && (m.media.addEventListener(t, u), h[e].mediaEvents = u)
            })), p = h[e].textTracksEvents, n.forEach((t => {
                var i, n;
                p && U && (null == (i = l.media.textTracks) || i.removeEventListener(t, p), h[e].textTracksEvents = void 0), G && (null == (n = m.media.textTracks) || n.addEventListener(t, u), h[e].textTracksEvents = u)
            })), p = h[e].videoRenditionsEvents, a.forEach((t => {
                var i, n;
                p && O && (null == (i = l.media.videoRenditions) || i.removeEventListener(t, p), h[e].videoRenditionsEvents = void 0), q && (null == (n = m.media.videoRenditions) || n.addEventListener(t, u), h[e].videoRenditionsEvents = u)
            })), p = h[e].audioTracksEvents, s.forEach((t => {
                var i, n;
                p && W && (null == (i = l.media.audioTracks) || i.removeEventListener(t, p), h[e].audioTracksEvents = void 0), Q && (null == (n = m.media.audioTracks) || n.addEventListener(t, u), h[e].audioTracksEvents = u)
            })), p = h[e].remoteEvents, r.forEach((t => {
                var i, n;
                p && V && (null == (i = l.media.remote) || i.removeEventListener(t, p), h[e].remoteEvents = void 0), K && (null == (n = m.media.remote) || n.addEventListener(t, u), h[e].remoteEvents = u)
            })), p = h[e].rootEvents, o.forEach((t => {
                p && B && (l.documentElement.removeEventListener(t, p), h[e].rootEvents = void 0), j && (m.documentElement.addEventListener(t, u), h[e].rootEvents = u)
            }));
            const E = h[e].stateOwnersUpdateHandlers;
            d.forEach((t => {
                E && $ && E(), Y && (h[e].stateOwnersUpdateHandlers = t(u, m))
            }))
        })), Object.entries(m).forEach((([e, t]) => {
            l[e] = t
        })), u(), m = void 0
    };
    return p({
        media: e,
        fullscreenElement: t,
        documentElement: i,
        options: s
    }), {
        dispatch(e) {
            const {
                type: t,
                detail: i
            } = e;
            a[t] && null == d.mediaErrorCode ? c(a[t](n, l, e)) : "mediaelementchangerequest" === t ? p({
                media: i
            }) : "fullscreenelementchangerequest" === t ? p({
                fullscreenElement: i
            }) : "documentelementchangerequest" === t ? p({
                documentElement: i
            }) : "optionschangerequest" === t && Object.entries(null != i ? i : {}).forEach((([e, t]) => {
                l.options[e] = t
            }))
        },
        getState: () => d,
        subscribe: e => (p({}, o.length + 1), o.push(e), e(d), () => {
            const t = o.indexOf(e);
            t >= 0 && (p({}, o.length - 1), o.splice(t, 1))
        })
    }
};
var Ct, Lt, xt, Nt, Ut, Pt, Ot, Wt, Vt, Bt, $t, Ht, Ft = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
Gt = (e, t, i) => (Ft(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
qt = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Qt = (e, t, i, n) => (Ft(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i),
Kt = (e, t, i) => (Ft(e, t, "access private method"), i);
const jt = ["ArrowLeft", "ArrowRight", "Enter", " ", "f", "m", "k", "c"],
Yt = "defaultsubtitles",
Zt = "defaultstreamtype",
zt = "defaultduration",
Xt = "fullscreenelement",
Jt = "hotkeys",
ei = "keysused",
ti = "liveedgeoffset",
ii = "seektoliveoffset",
ni = "noautoseektolive",
ai = "nohotkeys",
si = "novolumepref",
ri = "nosubtitleslangpref",
oi = "nodefaultstore",
li = "keyboardforwardseekoffset",
di = "keyboardbackwardseekoffset",
ci = "lang";
class ui extends We {
constructor() {
    super(), qt(this, Ot), qt(this, Vt), qt(this, $t), this.mediaStateReceivers = [], this.associatedElementSubscriptions = new Map, qt(this, Ct, new Ze(this, Jt)), qt(this, Lt, void 0), qt(this, xt, void 0), qt(this, Nt, void 0), qt(this, Ut, void 0), qt(this, Pt, (e => {
        var t;
        null == (t = Gt(this, xt)) || t.dispatch(e)
    })), this.associateElement(this);
    let e = {};
    Qt(this, Nt, (t => {
        Object.entries(t).forEach((([t, i]) => {
            if (t in e && e[t] === i) return;
            this.propagateMediaState(t, i);
            const n = t.toLowerCase(),
                a = new P.CustomEvent(o[n], {
                    composed: !0,
                    detail: i
                });
            this.dispatchEvent(a)
        })), e = t
    })), this.enableHotkeys()
}
static get observedAttributes() {
    return super.observedAttributes.concat(ai, Jt, Zt, Yt, zt, ci)
}
get mediaStore() {
    return Gt(this, xt)
}
set mediaStore(e) {
    var t, i;
    Gt(this, xt) && (null == (t = Gt(this, Ut)) || t.call(this), Qt(this, Ut, void 0)), Qt(this, xt, e), Gt(this, xt) || this.hasAttribute(oi) ? Qt(this, Ut, null == (i = Gt(this, xt)) ? void 0 : i.subscribe(Gt(this, Nt))) : Kt(this, Ot, Wt).call(this)
}
get fullscreenElement() {
    var e;
    return null != (e = Gt(this, Lt)) ? e : this
}
set fullscreenElement(e) {
    var t;
    this.hasAttribute(Xt) && this.removeAttribute(Xt), Qt(this, Lt, e), null == (t = Gt(this, xt)) || t.dispatch({
        type: "fullscreenelementchangerequest",
        detail: this.fullscreenElement
    })
}
get defaultSubtitles() {
    return J(this, Yt)
}
set defaultSubtitles(e) {
    ee(this, Yt, e)
}
get defaultStreamType() {
    return te(this, Zt)
}
set defaultStreamType(e) {
    ie(this, Zt, e)
}
get defaultDuration() {
    return z(this, zt)
}
set defaultDuration(e) {
    X(this, zt, e)
}
get noHotkeys() {
    return J(this, ai)
}
set noHotkeys(e) {
    ee(this, ai, e)
}
get keysUsed() {
    return te(this, ei)
}
set keysUsed(e) {
    ie(this, ei, e)
}
get liveEdgeOffset() {
    return z(this, ti)
}
set liveEdgeOffset(e) {
    X(this, ti, e)
}
get noAutoSeekToLive() {
    return J(this, ni)
}
set noAutoSeekToLive(e) {
    ee(this, ni, e)
}
get noVolumePref() {
    return J(this, si)
}
set noVolumePref(e) {
    ee(this, si, e)
}
get noSubtitlesLangPref() {
    return J(this, ri)
}
set noSubtitlesLangPref(e) {
    ee(this, ri, e)
}
get noDefaultStore() {
    return J(this, oi)
}
set noDefaultStore(e) {
    ee(this, oi, e)
}
attributeChangedCallback(e, t, i) {
    var n, a, s, r, o, l, d, c;
    if (super.attributeChangedCallback(e, t, i), e === ai) i !== t && "" === i ? (this.hasAttribute(Jt) && console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."), this.disableHotkeys()) : i !== t && null === i && this.enableHotkeys();
    else if (e === Jt) Gt(this, Ct).value = i;
    else if (e === Yt && i !== t) null == (n = Gt(this, xt)) || n.dispatch({
        type: "optionschangerequest",
        detail: {
            defaultSubtitles: this.hasAttribute(Yt)
        }
    });
    else if (e === Zt) null == (s = Gt(this, xt)) || s.dispatch({
        type: "optionschangerequest",
        detail: {
            defaultStreamType: null != (a = this.getAttribute(Zt)) ? a : void 0
        }
    });
    else if (e === ti) null == (r = Gt(this, xt)) || r.dispatch({
        type: "optionschangerequest",
        detail: {
            liveEdgeOffset: this.hasAttribute(ti) ? +this.getAttribute(ti) : void 0,
            seekToLiveOffset: this.hasAttribute(ii) ? void 0 : +this.getAttribute(ti)
        }
    });
    else if (e === ii) null == (o = Gt(this, xt)) || o.dispatch({
        type: "optionschangerequest",
        detail: {
            seekToLiveOffset: this.hasAttribute(ii) ? +this.getAttribute(ii) : void 0
        }
    });
    else if (e === ni) null == (l = Gt(this, xt)) || l.dispatch({
        type: "optionschangerequest",
        detail: {
            noAutoSeekToLive: this.hasAttribute(ni)
        }
    });
    else if (e === Xt) {
        const e = i ? null == (d = this.getRootNode()) ? void 0 : d.getElementById(i) : void 0;
        Qt(this, Lt, e), null == (c = Gt(this, xt)) || c.dispatch({
            type: "fullscreenelementchangerequest",
            detail: this.fullscreenElement
        })
    } else e === ci && i !== t && (M = i)
}
connectedCallback() {
    var e, t;
    Gt(this, xt) || this.hasAttribute(oi) || Kt(this, Ot, Wt).call(this), null == (e = Gt(this, xt)) || e.dispatch({
        type: "documentelementchangerequest",
        detail: O
    }), super.connectedCallback(), Gt(this, xt) && !Gt(this, Ut) && Qt(this, Ut, null == (t = Gt(this, xt)) ? void 0 : t.subscribe(Gt(this, Nt))), this.enableHotkeys()
}
disconnectedCallback() {
    var t, i, n, a;
    null == (t = super.disconnectedCallback) || t.call(this), Gt(this, xt) && (null == (i = Gt(this, xt)) || i.dispatch({
        type: "documentelementchangerequest",
        detail: void 0
    }), null == (n = Gt(this, xt)) || n.dispatch({
        type: e.MEDIA_TOGGLE_SUBTITLES_REQUEST,
        detail: !1
    })), Gt(this, Ut) && (null == (a = Gt(this, Ut)) || a.call(this), Qt(this, Ut, void 0))
}
mediaSetCallback(e) {
    var t;
    super.mediaSetCallback(e), null == (t = Gt(this, xt)) || t.dispatch({
        type: "mediaelementchangerequest",
        detail: e
    }), e.hasAttribute("tabindex") || (e.tabIndex = -1)
}
mediaUnsetCallback(e) {
    var t;
    super.mediaUnsetCallback(e), null == (t = Gt(this, xt)) || t.dispatch({
        type: "mediaelementchangerequest",
        detail: void 0
    })
}
propagateMediaState(e, t) {
    Ai(this.mediaStateReceivers, e, t)
}
associateElement(t) {
    if (!t) return;
    const {
        associatedElementSubscriptions: i
    } = this;
    if (i.has(t)) return;
    const n = this.registerMediaStateReceiver.bind(this),
        a = this.unregisterMediaStateReceiver.bind(this),
        s = fi(t, n, a);
    Object.values(e).forEach((e => {
        t.addEventListener(e, Gt(this, Pt))
    })), i.set(t, s)
}
unassociateElement(t) {
    if (!t) return;
    const {
        associatedElementSubscriptions: i
    } = this;
    if (!i.has(t)) return;
    i.get(t)(), i.delete(t), Object.values(e).forEach((e => {
        t.removeEventListener(e, Gt(this, Pt))
    }))
}
registerMediaStateReceiver(e) {
    if (!e) return;
    const t = this.mediaStateReceivers;
    t.indexOf(e) > -1 || (t.push(e), Gt(this, xt) && Object.entries(Gt(this, xt).getState()).forEach((([t, i]) => {
        Ai([e], t, i)
    })))
}
unregisterMediaStateReceiver(e) {
    const t = this.mediaStateReceivers,
        i = t.indexOf(e);
    i < 0 || t.splice(i, 1)
}
enableHotkeys() {
    this.addEventListener("keydown", Kt(this, $t, Ht))
}
disableHotkeys() {
    this.removeEventListener("keydown", Kt(this, $t, Ht)), this.removeEventListener("keyup", Kt(this, Vt, Bt))
}
get hotkeys() {
    return te(this, Jt)
}
set hotkeys(e) {
    ie(this, Jt, e)
}
keyboardShortcutHandler(t) {
    var i, n, a, s, r;
    const o = t.target;
    if ((null != (a = null != (n = null == (i = o.getAttribute(ei)) ? void 0 : i.split(" ")) ? n : null == o ? void 0 : o.keysUsed) ? a : []).map((e => "Space" === e ? " " : e)).filter(Boolean).includes(t.key)) return;
    let l, d, c;
    if (!(Gt(this, Ct).contains(`no${t.key.toLowerCase()}`) || " " === t.key && Gt(this, Ct).contains("nospace"))) switch (t.key) {
        case " ":
        case "k":
            l = Gt(this, xt).getState().mediaPaused ? e.MEDIA_PLAY_REQUEST : e.MEDIA_PAUSE_REQUEST, this.dispatchEvent(new P.CustomEvent(l, {
                composed: !0,
                bubbles: !0
            }));
            break;
        case "m":
            l = "off" === this.mediaStore.getState().mediaVolumeLevel ? e.MEDIA_UNMUTE_REQUEST : e.MEDIA_MUTE_REQUEST, this.dispatchEvent(new P.CustomEvent(l, {
                composed: !0,
                bubbles: !0
            }));
            break;
        case "f":
            l = this.mediaStore.getState().mediaIsFullscreen ? e.MEDIA_EXIT_FULLSCREEN_REQUEST : e.MEDIA_ENTER_FULLSCREEN_REQUEST, this.dispatchEvent(new P.CustomEvent(l, {
                composed: !0,
                bubbles: !0
            }));
            break;
        case "c":
            this.dispatchEvent(new P.CustomEvent(e.MEDIA_TOGGLE_SUBTITLES_REQUEST, {
                composed: !0,
                bubbles: !0
            }));
            break;
        case "ArrowLeft": {
            const t = this.hasAttribute(di) ? +this.getAttribute(di) : 10;
            d = Math.max((null != (s = this.mediaStore.getState().mediaCurrentTime) ? s : 0) - t, 0), c = new P.CustomEvent(e.MEDIA_SEEK_REQUEST, {
                composed: !0,
                bubbles: !0,
                detail: d
            }), this.dispatchEvent(c);
            break
        }
        case "ArrowRight": {
            const t = this.hasAttribute(li) ? +this.getAttribute(li) : 10;
            d = Math.max((null != (r = this.mediaStore.getState().mediaCurrentTime) ? r : 0) + t, 0), c = new P.CustomEvent(e.MEDIA_SEEK_REQUEST, {
                composed: !0,
                bubbles: !0,
                detail: d
            }), this.dispatchEvent(c);
            break
        }
    }
}
}
Ct = new WeakMap, Lt = new WeakMap, xt = new WeakMap, Nt = new WeakMap, Ut = new WeakMap, Pt = new WeakMap, Ot = new WeakSet, Wt = function() {
var e;
this.mediaStore = Dt({
    media: this.media,
    fullscreenElement: this.fullscreenElement,
    options: {
        defaultSubtitles: this.hasAttribute(Yt),
        defaultDuration: this.hasAttribute(zt) ? +this.getAttribute(zt) : void 0,
        defaultStreamType: null != (e = this.getAttribute(Zt)) ? e : void 0,
        liveEdgeOffset: this.hasAttribute(ti) ? +this.getAttribute(ti) : void 0,
        seekToLiveOffset: this.hasAttribute(ii) ? +this.getAttribute(ii) : this.hasAttribute(ti) ? +this.getAttribute(ti) : void 0,
        noAutoSeekToLive: this.hasAttribute(ni),
        noVolumePref: this.hasAttribute(si),
        noSubtitlesLangPref: this.hasAttribute(ri)
    }
})
}, Vt = new WeakSet, Bt = function(e) {
const {
    key: t
} = e;
jt.includes(t) ? this.keyboardShortcutHandler(e) : this.removeEventListener("keyup", Kt(this, Vt, Bt))
}, $t = new WeakSet, Ht = function(e) {
const {
    metaKey: t,
    altKey: i,
    key: n
} = e;
t || i || !jt.includes(n) ? this.removeEventListener("keyup", Kt(this, Vt, Bt)) : ([" ", "ArrowLeft", "ArrowRight"].includes(n) && !(Gt(this, Ct).contains(`no${n.toLowerCase()}`) || " " === n && Gt(this, Ct).contains("nospace")) && e.preventDefault(), this.addEventListener("keyup", Kt(this, Vt, Bt), {
    once: !0
}))
};
const hi = Object.values(a),
mi = Object.values(i),
pi = e => {
    var i, n, a, s;
    let {
        observedAttributes: r
    } = e.constructor;
    !r && (null == (i = e.nodeName) ? void 0 : i.includes("-")) && (P.customElements.upgrade(e), ({
        observedAttributes: r
    } = e.constructor));
    const o = null == (s = null == (a = null == (n = null == e ? void 0 : e.getAttribute) ? void 0 : n.call(e, t.MEDIA_CHROME_ATTRIBUTES)) ? void 0 : a.split) ? void 0 : s.call(a, /\s+/);
    return Array.isArray(r || o) ? (r || o).filter((e => hi.includes(e))) : []
},
Ei = e => (e => {
    var t, i;
    return !(null == (t = e.nodeName) ? void 0 : t.includes("-")) || !P.customElements.get(null == (i = e.nodeName) ? void 0 : i.toLowerCase()) || e instanceof P.customElements.get(e.nodeName.toLowerCase()) || P.customElements.upgrade(e), mi.some((t => t in e))
})(e) || !!pi(e).length,
vi = e => {
    var t;
    return null == (t = null == e ? void 0 : e.join) ? void 0 : t.call(e, ":")
},
bi = {
    [a.MEDIA_SUBTITLES_LIST]: tt,
    [a.MEDIA_SUBTITLES_SHOWING]: tt,
    [a.MEDIA_SEEKABLE]: vi,
    [a.MEDIA_BUFFERED]: e => null == e ? void 0 : e.map(vi).join(" "),
    [a.MEDIA_PREVIEW_COORDS]: e => null == e ? void 0 : e.join(" "),
    [a.MEDIA_RENDITION_LIST]: function(e) {
        return null == e ? void 0 : e.map(E).join(" ")
    },
    [a.MEDIA_AUDIO_TRACK_LIST]: function(e) {
        return null == e ? void 0 : e.map(v).join(" ")
    }
},
gi = (e, t) => {
    if ((e => {
            var t;
            return !!(null == (t = e.closest) ? void 0 : t.call(e, '*[slot="media"]'))
        })(e)) return;
    const i = (e, t) => {
            var i, n;
            Ei(e) && t(e);
            const {
                children: a = []
            } = null != e ? e : {};
            [...a, ...null != (n = null == (i = null == e ? void 0 : e.shadowRoot) ? void 0 : i.children) ? n : []].forEach((e => gi(e, t)))
        },
        n = null == e ? void 0 : e.nodeName.toLowerCase();
    !n.includes("-") || Ei(e) ? i(e, t) : P.customElements.whenDefined(n).then((() => {
        i(e, t)
    }))
},
Ai = (e, t, i) => {
    e.forEach((e => {
        if (t in e) return void(e[t] = i);
        const n = pi(e),
            a = t.toLowerCase();
        n.includes(a) && (async (e, t, i) => {
            var n, a;
            if (e.isConnected || await g(0), "boolean" == typeof i || null == i) return ee(e, t, i);
            if ("number" == typeof i) return X(e, t, i);
            if ("string" == typeof i) return ie(e, t, i);
            if (Array.isArray(i) && !i.length) return e.removeAttribute(t);
            const s = null != (a = null == (n = bi[t]) ? void 0 : n.call(bi, i)) ? a : i;
            e.setAttribute(t, s)
        })(e, a, i)
    }))
},
fi = (i, n, a) => {
    gi(i, n);
    const s = e => {
            var t;
            const i = null != (t = null == e ? void 0 : e.composedPath()[0]) ? t : e.target;
            n(i)
        },
        r = e => {
            var t;
            const i = null != (t = null == e ? void 0 : e.composedPath()[0]) ? t : e.target;
            a(i)
        };
    i.addEventListener(e.REGISTER_MEDIA_STATE_RECEIVER, s), i.addEventListener(e.UNREGISTER_MEDIA_STATE_RECEIVER, r);
    let o = [];
    const l = e => {
        const t = e.target;
        "media" !== t.name && (o.forEach((e => gi(e, a))), o = [...t.assignedElements({
            flatten: !0
        })], o.forEach((e => gi(e, n))))
    };
    i.addEventListener("slotchange", l);
    const d = new MutationObserver((e => {
        e.forEach((e => {
            const {
                addedNodes: i = [],
                removedNodes: s = [],
                type: r,
                target: o,
                attributeName: l
            } = e;
            "childList" === r ? (Array.prototype.forEach.call(i, (e => gi(e, n))), Array.prototype.forEach.call(s, (e => gi(e, a)))) : "attributes" === r && l === t.MEDIA_CHROME_ATTRIBUTES && (Ei(o) ? n(o) : a(o))
        }))
    }));
    d.observe(i, {
        childList: !0,
        attributes: !0,
        subtree: !0
    });
    return () => {
        gi(i, a), i.removeEventListener("slotchange", l), d.disconnect(), i.removeEventListener(e.REGISTER_MEDIA_STATE_RECEIVER, s), i.removeEventListener(e.UNREGISTER_MEDIA_STATE_RECEIVER, r)
    }
};
P.customElements.get("neptune-controller") || P.customElements.define("neptune-controller", ui);
var Ii, yi, _i, wi, ki, Ti, Mi, Si = ui,
Ri = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
Di = (e, t, i) => (Ri(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
Ci = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Li = (e, t, i, n) => (Ri(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const xi = "tooltipplacement",
Ni = "disabled",
Ui = "notooltip",
Pi = O.createElement("template");
Pi.innerHTML = '\n<style>\n  :host {\n    position: relative;\n    font: var(--neptune-font,\n      var(--neptune-font-weight, bold)\n      var(--neptune-font-size, 14px) /\n      var(--neptune-text-content-height, var(--neptune-control-height, 24px))\n      var(--neptune-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));\n    color: var(--neptune-text-color, var(--neptune-primary-color, rgb(238 238 238)));\n    background: var(--neptune-control-background, var(--neptune-secondary-color, rgb(20 20 30 / .7)));\n    padding: var(--neptune-button-padding, var(--neptune-control-padding, 10px));\n    justify-content: var(--neptune-button-justify-content, center);\n    display: inline-flex;\n    align-items: center;\n    vertical-align: middle;\n    box-sizing: border-box;\n    transition: background .15s linear;\n    pointer-events: auto;\n    cursor: var(--neptune-cursor, pointer);\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  \n  :host(:focus-visible) {\n    box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);\n    outline: 0;\n  }\n  \n  :host(:where(:focus)) {\n    box-shadow: none;\n    outline: 0;\n  }\n\n  :host(:hover) {\n    background: var(--neptune-control-hover-background, rgba(50 50 70 / .7));\n  }\n\n  svg, img, ::slotted(svg), ::slotted(img) {\n    width: var(--neptune-button-icon-width);\n    height: var(--neptune-button-icon-height, var(--neptune-control-height, 24px));\n    transform: var(--neptune-button-icon-transform);\n    transition: var(--neptune-button-icon-transition);\n    fill: var(--neptune-icon-color, var(--neptune-primary-color, rgb(238 238 238)));\n    vertical-align: middle;\n    max-width: 100%;\n    max-height: 100%;\n    min-width: 100%;\n  }\n\n  neptune-tooltip {\n    \n    max-width: 0;\n    overflow-x: clip;\n    opacity: 0;\n    transition: opacity .3s, max-width 0s 9s;\n  }\n\n  :host(:hover) neptune-tooltip,\n  :host(:focus-visible) neptune-tooltip {\n    max-width: 100vw;\n    opacity: 1;\n    transition: opacity .3s;\n  }\n\n  :host([notooltip]) slot[name="tooltip"] {\n    display: none;\n  }\n</style>\n\n<slot name="tooltip">\n  <neptune-tooltip part="tooltip" aria-hidden="true">\n    <slot name="tooltip-content"></slot>\n  </neptune-tooltip>\n</slot>\n';
class Oi extends P.HTMLElement {
constructor(e = {}) {
    var t;
    if (super(), Ci(this, Ti), Ci(this, Ii, void 0), this.preventClick = !1, this.tooltipEl = null, this.tooltipContent = "", Ci(this, yi, (e => {
            this.preventClick || this.handleClick(e), setTimeout(Di(this, _i), 0)
        })), Ci(this, _i, (() => {
            var e, t;
            null == (t = null == (e = this.tooltipEl) ? void 0 : e.updateXOffset) || t.call(e)
        })), Ci(this, wi, (e => {
            const {
                key: t
            } = e;
            this.keysUsed.includes(t) ? this.preventClick || this.handleClick(e) : this.removeEventListener("keyup", Di(this, wi))
        })), Ci(this, ki, (e => {
            const {
                metaKey: t,
                altKey: i,
                key: n
            } = e;
            t || i || !this.keysUsed.includes(n) ? this.removeEventListener("keyup", Di(this, wi)) : this.addEventListener("keyup", Di(this, wi), {
                once: !0
            })
        })), !this.shadowRoot) {
        this.attachShadow({
            mode: "open"
        });
        const i = Pi.content.cloneNode(!0);
        this.nativeEl = i;
        let n = e.slotTemplate;
        n || (n = O.createElement("template"), n.innerHTML = `<slot>${e.defaultContent||""}</slot>`), e.tooltipContent && (i.querySelector('slot[name="tooltip-content"]').innerHTML = null != (t = e.tooltipContent) ? t : "", this.tooltipContent = e.tooltipContent), this.nativeEl.appendChild(n.content.cloneNode(!0)), this.shadowRoot.appendChild(i)
    }
    this.tooltipEl = this.shadowRoot.querySelector("neptune-tooltip")
}
static get observedAttributes() {
    return ["disabled", xi, t.MEDIA_CONTROLLER]
}
enable() {
    this.addEventListener("click", Di(this, yi)), this.addEventListener("keydown", Di(this, ki)), this.tabIndex = 0
}
disable() {
    this.removeEventListener("click", Di(this, yi)), this.removeEventListener("keydown", Di(this, ki)), this.removeEventListener("keyup", Di(this, wi)), this.tabIndex = -1
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === t.MEDIA_CONTROLLER ? (i && (null == (s = null == (a = Di(this, Ii)) ? void 0 : a.unassociateElement) || s.call(a, this), Li(this, Ii, null)), n && this.isConnected && (Li(this, Ii, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = Di(this, Ii)) ? void 0 : o.associateElement) || l.call(o, this))) : "disabled" === e && n !== i ? null == n ? this.enable() : this.disable() : e === xi && this.tooltipEl && n !== i && (this.tooltipEl.placement = n), Di(this, _i).call(this)
}
connectedCallback() {
    var e, i, n;
    const {
        style: a
    } = Z(this.shadowRoot, ":host");
    a.setProperty("display", `var(--neptune-control-display, var(--${this.localName}-display, inline-flex))`), this.hasAttribute("disabled") ? this.disable() : this.enable(), this.setAttribute("role", "button");
    const s = this.getAttribute(t.MEDIA_CONTROLLER);
    s && (Li(this, Ii, null == (e = this.getRootNode()) ? void 0 : e.getElementById(s)), null == (n = null == (i = Di(this, Ii)) ? void 0 : i.associateElement) || n.call(i, this)), P.customElements.whenDefined("neptune-tooltip").then((() => {
        return (e = this, t = Ti, i = Mi, Ri(e, t, "access private method"), i).call(this);
        var e, t, i
    }))
}
disconnectedCallback() {
    var e, t;
    this.disable(), null == (t = null == (e = Di(this, Ii)) ? void 0 : e.unassociateElement) || t.call(e, this), Li(this, Ii, null), this.removeEventListener("mouseenter", Di(this, _i)), this.removeEventListener("focus", Di(this, _i)), this.removeEventListener("click", Di(this, yi))
}
get keysUsed() {
    return ["Enter", " "]
}
get tooltipPlacement() {
    return te(this, xi)
}
set tooltipPlacement(e) {
    ie(this, xi, e)
}
get mediaController() {
    return te(this, t.MEDIA_CONTROLLER)
}
set mediaController(e) {
    ie(this, t.MEDIA_CONTROLLER, e)
}
get disabled() {
    return J(this, Ni)
}
set disabled(e) {
    ee(this, Ni, e)
}
get noTooltip() {
    return J(this, Ui)
}
set noTooltip(e) {
    ee(this, Ui, e)
}
handleClick(e) {}
}
Ii = new WeakMap, yi = new WeakMap, _i = new WeakMap, wi = new WeakMap, ki = new WeakMap, Ti = new WeakSet, Mi = function() {
this.addEventListener("mouseenter", Di(this, _i)), this.addEventListener("focus", Di(this, _i)), this.addEventListener("click", Di(this, yi));
const e = this.tooltipPlacement;
e && this.tooltipEl && (this.tooltipEl.placement = e)
}, P.customElements.get("neptune-chrome-button") || P.customElements.define("neptune-chrome-button", Oi);
var Wi = Oi;
const Vi = '<svg aria-hidden="true" viewBox="0 0 26 24">\n  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>\n</svg>\n',
Bi = O.createElement("template");
Bi.innerHTML = `\n  <style>\n    :host([${a.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {\n      display: none !important;\n    }\n\n    \n    :host(:not([${a.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {\n      display: none !important;\n    }\n\n    :host([${a.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],\n    :host(:not([${a.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {\n      display: none;\n    }\n  </style>\n\n  <slot name="icon">\n    <slot name="enter">${Vi}</slot>\n    <slot name="exit">${Vi}</slot>\n  </slot>\n`;
const $i = `\n  <slot name="tooltip-enter">${S("start airplay")}</slot>\n  <slot name="tooltip-exit">${S("stop airplay")}</slot>\n`,
Hi = e => {
    const t = e.mediaIsAirplaying ? S("stop airplay") : S("start airplay");
    e.setAttribute("aria-label", t)
};
class Fi extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_IS_AIRPLAYING, a.MEDIA_AIRPLAY_UNAVAILABLE]
}
constructor(e = {}) {
    super({
        slotTemplate: Bi,
        tooltipContent: $i,
        ...e
    })
}
connectedCallback() {
    super.connectedCallback(), Hi(this)
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_IS_AIRPLAYING && Hi(this)
}
get mediaIsAirplaying() {
    return J(this, a.MEDIA_IS_AIRPLAYING)
}
set mediaIsAirplaying(e) {
    ee(this, a.MEDIA_IS_AIRPLAYING, e)
}
get mediaAirplayUnavailable() {
    return te(this, a.MEDIA_AIRPLAY_UNAVAILABLE)
}
set mediaAirplayUnavailable(e) {
    ie(this, a.MEDIA_AIRPLAY_UNAVAILABLE, e)
}
handleClick() {
    const t = new P.CustomEvent(e.MEDIA_AIRPLAY_REQUEST, {
        composed: !0,
        bubbles: !0
    });
    this.dispatchEvent(t)
}
}
P.customElements.get("neptune-airplay-button") || P.customElements.define("neptune-airplay-button", Fi);
var Gi = Fi;
const qi = O.createElement("template");
qi.innerHTML = '\n  <style>\n    :host([aria-checked="true"]) slot[name=off] {\n      display: none !important;\n    }\n\n    \n    :host(:not([aria-checked="true"])) slot[name=on] {\n      display: none !important;\n    }\n\n    :host([aria-checked="true"]) slot[name=tooltip-enable],\n    :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {\n      display: none;\n    }\n  </style>\n\n  <slot name="icon">\n    <slot name="on"><svg aria-hidden="true" viewBox="0 0 26 24">\n  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>\n</svg></slot>\n    <slot name="off"><svg aria-hidden="true" viewBox="0 0 26 24">\n  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>\n</svg></slot>\n  </slot>\n';
const Qi = `\n  <slot name="tooltip-enable">${S("Enable captions")}</slot>\n  <slot name="tooltip-disable">${S("Disable captions")}</slot>\n`,
Ki = e => {
    e.setAttribute("aria-checked", (e => {
        var t;
        return !!(null == (t = e.mediaSubtitlesShowing) ? void 0 : t.length) || e.hasAttribute(a.MEDIA_SUBTITLES_SHOWING)
    })(e).toString())
};
class ji extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_SUBTITLES_LIST, a.MEDIA_SUBTITLES_SHOWING]
}
constructor(e = {}) {
    super({
        slotTemplate: qi,
        tooltipContent: Qi,
        ...e
    }), this._captionsReady = !1
}
connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "switch"), this.setAttribute("aria-label", S("closed captions")), Ki(this)
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_SUBTITLES_SHOWING && Ki(this)
}
get mediaSubtitlesList() {
    return Yi(this, a.MEDIA_SUBTITLES_LIST)
}
set mediaSubtitlesList(e) {
    Zi(this, a.MEDIA_SUBTITLES_LIST, e)
}
get mediaSubtitlesShowing() {
    return Yi(this, a.MEDIA_SUBTITLES_SHOWING)
}
set mediaSubtitlesShowing(e) {
    Zi(this, a.MEDIA_SUBTITLES_SHOWING, e)
}
handleClick() {
    this.dispatchEvent(new P.CustomEvent(e.MEDIA_TOGGLE_SUBTITLES_REQUEST, {
        composed: !0,
        bubbles: !0
    }))
}
}
const Yi = (e, t) => {
    const i = e.getAttribute(t);
    return i ? Xe(i) : []
},
Zi = (e, t, i) => {
    if (!(null == i ? void 0 : i.length)) return void e.removeAttribute(t);
    const n = tt(i);
    e.getAttribute(t) !== n && e.setAttribute(t, n)
};
P.customElements.get("neptune-captions-button") || P.customElements.define("neptune-captions-button", ji);
var zi = ji;
const Xi = O.createElement("template");
Xi.innerHTML = `\n  <style>\n  :host([${a.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {\n    display: none !important;\n  }\n\n  \n  :host(:not([${a.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {\n    display: none !important;\n  }\n\n  :host([${a.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],\n    :host(:not([${a.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {\n      display: none;\n    }\n  </style>\n\n  <slot name="icon">\n    <slot name="enter"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg></slot>\n    <slot name="exit"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg></slot>\n  </slot>\n`;
const Ji = `\n  <slot name="tooltip-enter">${S("Start casting")}</slot>\n  <slot name="tooltip-exit">${S("Stop casting")}</slot>\n`,
en = e => {
    const t = e.mediaIsCasting ? S("stop casting") : S("start casting");
    e.setAttribute("aria-label", t)
};
class tn extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_IS_CASTING, a.MEDIA_CAST_UNAVAILABLE]
}
constructor(e = {}) {
    super({
        slotTemplate: Xi,
        tooltipContent: Ji,
        ...e
    })
}
connectedCallback() {
    super.connectedCallback(), en(this)
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_IS_CASTING && en(this)
}
get mediaIsCasting() {
    return J(this, a.MEDIA_IS_CASTING)
}
set mediaIsCasting(e) {
    ee(this, a.MEDIA_IS_CASTING, e)
}
get mediaCastUnavailable() {
    return te(this, a.MEDIA_CAST_UNAVAILABLE)
}
set mediaCastUnavailable(e) {
    ie(this, a.MEDIA_CAST_UNAVAILABLE, e)
}
handleClick() {
    const t = this.mediaIsCasting ? e.MEDIA_EXIT_CAST_REQUEST : e.MEDIA_ENTER_CAST_REQUEST;
    this.dispatchEvent(new P.CustomEvent(t, {
        composed: !0,
        bubbles: !0
    }))
}
}
P.customElements.get("neptune-cast-button") || P.customElements.define("neptune-cast-button", tn);
var nn, an, sn, rn, on, ln, dn, cn, un, hn, mn, pn, En, vn, bn, gn = tn,
An = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
fn = (e, t, i) => (An(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
In = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
yn = (e, t, i, n) => (An(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i),
_n = (e, t, i) => (An(e, t, "access private method"), i);
const wn = "open",
kn = "anchor";
class Tn extends P.HTMLElement {
constructor() {
    super(), In(this, rn), In(this, ln), In(this, cn), In(this, hn), In(this, pn), In(this, vn), In(this, nn, !1), In(this, an, null), In(this, sn, null), this.addEventListener("invoke", this), this.addEventListener("focusout", this), this.addEventListener("keydown", this)
}
static get observedAttributes() {
    return [wn, kn]
}
get open() {
    return J(this, wn)
}
set open(e) {
    ee(this, wn, e)
}
handleEvent(e) {
    switch (e.type) {
        case "invoke":
            _n(this, hn, mn).call(this, e);
            break;
        case "focusout":
            _n(this, pn, En).call(this, e);
            break;
        case "keydown":
            _n(this, vn, bn).call(this, e)
    }
}
connectedCallback() {
    _n(this, rn, on).call(this), this.role || (this.role = "dialog")
}
attributeChangedCallback(e, t, i) {
    _n(this, rn, on).call(this), e === wn && i !== t && (this.open ? _n(this, ln, dn).call(this) : _n(this, cn, un).call(this))
}
focus() {
    yn(this, an, j());
    const e = !this.dispatchEvent(new Event("focus", {
            composed: !0,
            cancelable: !0
        })),
        t = !this.dispatchEvent(new Event("focusin", {
            composed: !0,
            bubbles: !0,
            cancelable: !0
        }));
    if (e || t) return;
    const i = this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');
    null == i || i.focus()
}
get keysUsed() {
    return ["Escape", "Tab"]
}
}
nn = new WeakMap, an = new WeakMap, sn = new WeakMap, rn = new WeakSet, on = function() {
if (!fn(this, nn) && (yn(this, nn, !0), !this.shadowRoot)) {
    this.attachShadow({
        mode: "open"
    });
    const e = function(e) {
        const t = {};
        for (const i of e) t[i.name] = i.value;
        return t
    }(this.attributes);
    this.shadowRoot.innerHTML = `\n        ${this.constructor.getTemplateHTML(e)}\n      `, queueMicrotask((() => {
        const {
            style: e
        } = Z(this.shadowRoot, ":host");
        e.setProperty("transition", "display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")
    }))
}
}, ln = new WeakSet, dn = function() {
var e;
null == (e = fn(this, sn)) || e.setAttribute("aria-expanded", "true"), this.dispatchEvent(new Event("open", {
    composed: !0,
    bubbles: !0
})), this.addEventListener("transitionend", (() => this.focus()), {
    once: !0
})
}, cn = new WeakSet, un = function() {
var e;
null == (e = fn(this, sn)) || e.setAttribute("aria-expanded", "false"), this.dispatchEvent(new Event("close", {
    composed: !0,
    bubbles: !0
}))
}, hn = new WeakSet, mn = function(e) {
yn(this, sn, e.relatedTarget), Q(this, e.relatedTarget) || (this.open = !this.open)
}, pn = new WeakSet, En = function(e) {
var t;
Q(this, e.relatedTarget) || (null == (t = fn(this, an)) || t.focus(), fn(this, sn) && fn(this, sn) !== e.relatedTarget && this.open && (this.open = !1))
}, vn = new WeakSet, bn = function(e) {
var t, i, n, a, s;
const {
    key: r,
    ctrlKey: o,
    altKey: l,
    metaKey: d
} = e;
o || l || d || this.keysUsed.includes(r) && (e.preventDefault(), e.stopPropagation(), "Tab" === r ? (e.shiftKey ? null == (i = null == (t = this.previousElementSibling) ? void 0 : t.focus) || i.call(t) : null == (a = null == (n = this.nextElementSibling) ? void 0 : n.focus) || a.call(n), this.blur()) : "Escape" === r && (null == (s = fn(this, an)) || s.focus(), this.open = !1))
}, Tn.getTemplateHTML = function(e) {
return `\n    <style>\n      :host {\n        font: var(--neptune-font,\n          var(--neptune-font-weight, normal)\n          var(--neptune-font-size, 14px) /\n          var(--neptune-text-content-height, var(--neptune-control-height, 24px))\n          var(--neptune-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));\n        color: var(--neptune-text-color, var(--neptune-primary-color, rgb(238 238 238)));\n        display: var(--neptune-dialog-display, inline-flex);\n        justify-content: center;\n        align-items: center;\n        \n        transition-behavior: allow-discrete;\n        visibility: hidden;\n        opacity: 0;\n        transform: translateY(2px) scale(.99);\n        pointer-events: none;\n      }\n\n      :host([open]) {\n        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;\n        visibility: visible;\n        opacity: 1;\n        transform: translateY(0) scale(1);\n        pointer-events: auto;\n      }\n\n      #content {\n        display: flex;\n        position: relative;\n        box-sizing: border-box;\n        width: min(320px, 100%);\n        word-wrap: break-word;\n        max-height: 100%;\n        overflow: auto;\n        text-align: center;\n        line-height: 1.4;\n      }\n    </style>\n    ${this.getSlotTemplateHTML(e)}\n  `
}, Tn.getSlotTemplateHTML = function(e) {
return '\n    <slot id="content"></slot>\n  '
}, P.customElements.get("neptune-chrome-dialog") || P.customElements.define("neptune-chrome-dialog", Tn);
var Mn, Sn, Rn, Dn, Cn, Ln, xn, Nn, Un, Pn, On, Wn, Vn, Bn, $n, Hn, Fn, Gn, qn, Qn, Kn, jn, Yn, Zn, zn, Xn = Tn,
Jn = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
ea = (e, t, i) => (Jn(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
ta = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
ia = (e, t, i, n) => (Jn(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i),
na = (e, t, i) => (Jn(e, t, "access private method"), i);
const aa = O.createElement("template");
aa.innerHTML = '\n  <style>\n    :host {\n      --_focus-box-shadow: var(--neptune-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));\n      --_neptune-range-padding: var(--neptune-range-padding, var(--neptune-control-padding, 10px));\n\n      box-shadow: var(--_focus-visible-box-shadow, none);\n      background: var(--neptune-control-background, var(--neptune-secondary-color, rgb(20 20 30 / .7)));\n      height: calc(var(--neptune-control-height, 24px) + 2 * var(--_neptune-range-padding));\n      display: inline-flex;\n      align-items: center;\n      \n      vertical-align: middle;\n      box-sizing: border-box;\n      position: relative;\n      width: 100px;\n      transition: background .15s linear;\n      cursor: var(--neptune-cursor, pointer);\n      pointer-events: auto;\n      touch-action: none; \n    }\n\n    \n    input[type=range]:focus {\n      outline: 0;\n    }\n    input[type=range]:focus::-webkit-slider-runnable-track {\n      outline: 0;\n    }\n\n    :host(:hover) {\n      background: var(--neptune-control-hover-background, rgb(50 50 70 / .7));\n    }\n\n    #leftgap {\n      padding-left: var(--neptune-range-padding-left, var(--_neptune-range-padding));\n    }\n\n    #rightgap {\n      padding-right: var(--neptune-range-padding-right, var(--_neptune-range-padding));\n    }\n\n    #startpoint,\n    #endpoint {\n      position: absolute;\n    }\n\n    #endpoint {\n      right: 0;\n    }\n\n    #container {\n      \n      width: var(--neptune-range-track-width, 100%);\n      transform: translate(var(--neptune-range-track-translate-x, 0px), var(--neptune-range-track-translate-y, 0px));\n      position: relative;\n      height: 100%;\n      display: flex;\n      align-items: center;\n      min-width: 40px;\n    }\n\n    #range {\n      \n      display: var(--neptune-time-range-hover-display, block);\n      bottom: var(--neptune-time-range-hover-bottom, -7px);\n      height: var(--neptune-time-range-hover-height, max(100% + 7px, 25px));\n      width: 100%;\n      position: absolute;\n      cursor: var(--neptune-cursor, pointer);\n\n      -webkit-appearance: none; \n      -webkit-tap-highlight-color: transparent;\n      background: transparent; \n      margin: 0;\n      z-index: 1;\n    }\n\n    @media (hover: hover) {\n      #range {\n        bottom: var(--neptune-time-range-hover-bottom, -5px);\n        height: var(--neptune-time-range-hover-height, max(100% + 5px, 20px));\n      }\n    }\n\n    \n    \n    #range::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      background: transparent;\n      width: .1px;\n      height: .1px;\n    }\n\n    \n    #range::-moz-range-thumb {\n      background: transparent;\n      border: transparent;\n      width: .1px;\n      height: .1px;\n    }\n\n    #appearance {\n      height: var(--neptune-range-track-height, 4px);\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      width: 100%;\n      position: absolute;\n      \n      will-change: transform;\n    }\n\n    #track {\n      background: var(--neptune-range-track-background, rgb(255 255 255 / .2));\n      border-radius: var(--neptune-range-track-border-radius, 1px);\n      border: var(--neptune-range-track-border, none);\n      outline: var(--neptune-range-track-outline);\n      outline-offset: var(--neptune-range-track-outline-offset);\n      backdrop-filter: var(--neptune-range-track-backdrop-filter);\n      -webkit-backdrop-filter: var(--neptune-range-track-backdrop-filter);\n      box-shadow: var(--neptune-range-track-box-shadow, none);\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n    }\n\n    #progress,\n    #pointer {\n      position: absolute;\n      height: 100%;\n      will-change: width;\n    }\n\n    #progress {\n      background: var(--neptune-range-bar-color, var(--neptune-primary-color, rgb(238 238 238)));\n      transition: var(--neptune-range-track-transition);\n    }\n\n    #pointer {\n      background: var(--neptune-range-track-pointer-background);\n      border-right: var(--neptune-range-track-pointer-border-right);\n      transition: visibility .25s, opacity .25s;\n      visibility: hidden;\n      opacity: 0;\n    }\n\n    @media (hover: hover) {\n      :host(:hover) #pointer {\n        transition: visibility .5s, opacity .5s;\n        visibility: visible;\n        opacity: 1;\n      }\n    }\n\n    #thumb,\n    ::slotted([slot=thumb]) {\n      width: var(--neptune-range-thumb-width, 10px);\n      height: var(--neptune-range-thumb-height, 10px);\n      transition: var(--neptune-range-thumb-transition);\n      transform: var(--neptune-range-thumb-transform, none);\n      opacity: var(--neptune-range-thumb-opacity, 1);\n      translate: -50%;\n      position: absolute;\n      left: 0;\n      cursor: var(--neptune-cursor, pointer);\n    }\n\n    #thumb {\n      border-radius: var(--neptune-range-thumb-border-radius, 10px);\n      background: var(--neptune-range-thumb-background, var(--neptune-primary-color, rgb(238 238 238)));\n      box-shadow: var(--neptune-range-thumb-box-shadow, 1px 1px 1px transparent);\n      border: var(--neptune-range-thumb-border, none);\n    }\n\n    :host([disabled]) #thumb {\n      background-color: #777;\n    }\n\n    .segments #appearance {\n      height: var(--neptune-range-segment-hover-height, 7px);\n    }\n\n    #track {\n      clip-path: url(#segments-clipping);\n    }\n\n    #segments {\n      --segments-gap: var(--neptune-range-segments-gap, 2px);\n      position: absolute;\n      width: 100%;\n      height: 100%;\n    }\n\n    #segments-clipping {\n      transform: translateX(calc(var(--segments-gap) / 2));\n    }\n\n    #segments-clipping:empty {\n      display: none;\n    }\n\n    #segments-clipping rect {\n      height: var(--neptune-range-track-height, 4px);\n      y: calc((var(--neptune-range-segment-hover-height, 7px) - var(--neptune-range-track-height, 4px)) / 2);\n      transition: var(--neptune-range-segment-transition, transform .1s ease-in-out);\n      transform: var(--neptune-range-segment-transform, scaleY(1));\n      transform-origin: center;\n    }\n  </style>\n  <div id="leftgap"></div>\n  <div id="container">\n    <div id="startpoint"></div>\n    <div id="endpoint"></div>\n    <div id="appearance">\n      <div id="track" part="track">\n        <div id="pointer"></div>\n        <div id="progress" part="progress"></div>\n      </div>\n      <slot name="thumb">\n        <div id="thumb" part="thumb"></div>\n      </slot>\n      <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>\n    </div>\n    <input id="range" type="range" min="0" max="1" step="any" value="0">\n  </div>\n  <div id="rightgap"></div>\n';
class sa extends P.HTMLElement {
constructor() {
    super(), ta(this, Pn), ta(this, Wn), ta(this, Bn), ta(this, Hn), ta(this, Gn), ta(this, Qn), ta(this, jn), ta(this, Zn), ta(this, Mn, void 0), ta(this, Sn, void 0), ta(this, Rn, void 0), ta(this, Dn, void 0), ta(this, Cn, {}), ta(this, Ln, []), ta(this, xn, (() => {
        if (this.range.matches(":focus-visible")) {
            const {
                style: e
            } = Z(this.shadowRoot, ":host");
            e.setProperty("--_focus-visible-box-shadow", "var(--_focus-box-shadow)")
        }
    })), ta(this, Nn, (() => {
        const {
            style: e
        } = Z(this.shadowRoot, ":host");
        e.removeProperty("--_focus-visible-box-shadow")
    })), ta(this, Un, (() => {
        const e = this.shadowRoot.querySelector("#segments-clipping");
        e && e.parentNode.append(e)
    })), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(aa.content.cloneNode(!0))), this.container = this.shadowRoot.querySelector("#container"), ia(this, Rn, this.shadowRoot.querySelector("#startpoint")), ia(this, Dn, this.shadowRoot.querySelector("#endpoint")), this.range = this.shadowRoot.querySelector("#range"), this.appearance = this.shadowRoot.querySelector("#appearance")
}
static get observedAttributes() {
    return ["disabled", "aria-disabled", t.MEDIA_CONTROLLER]
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === t.MEDIA_CONTROLLER ? (i && (null == (s = null == (a = ea(this, Mn)) ? void 0 : a.unassociateElement) || s.call(a, this), ia(this, Mn, null)), n && this.isConnected && (ia(this, Mn, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = ea(this, Mn)) ? void 0 : o.associateElement) || l.call(o, this))) : ("disabled" === e || "aria-disabled" === e && i !== n) && (null == n ? (this.range.removeAttribute(e), na(this, Wn, Vn).call(this)) : (this.range.setAttribute(e, n), na(this, Bn, $n).call(this)))
}
connectedCallback() {
    var e, i, n;
    const {
        style: a
    } = Z(this.shadowRoot, ":host");
    a.setProperty("display", `var(--neptune-control-display, var(--${this.localName}-display, inline-flex))`), ea(this, Cn).pointer = Z(this.shadowRoot, "#pointer"), ea(this, Cn).progress = Z(this.shadowRoot, "#progress"), ea(this, Cn).thumb = Z(this.shadowRoot, '#thumb, ::slotted([slot="thumb"])'), ea(this, Cn).activeSegment = Z(this.shadowRoot, "#segments-clipping rect:nth-child(0)");
    const s = this.getAttribute(t.MEDIA_CONTROLLER);
    s && (ia(this, Mn, null == (e = this.getRootNode()) ? void 0 : e.getElementById(s)), null == (n = null == (i = ea(this, Mn)) ? void 0 : i.associateElement) || n.call(i, this)), this.updateBar(), this.shadowRoot.addEventListener("focusin", ea(this, xn)), this.shadowRoot.addEventListener("focusout", ea(this, Nn)), na(this, Wn, Vn).call(this), $(this.container, ea(this, Un))
}
disconnectedCallback() {
    var e, t;
    na(this, Bn, $n).call(this), null == (t = null == (e = ea(this, Mn)) ? void 0 : e.unassociateElement) || t.call(e, this), ia(this, Mn, null), this.shadowRoot.removeEventListener("focusin", ea(this, xn)), this.shadowRoot.removeEventListener("focusout", ea(this, Nn)), H(this.container, ea(this, Un))
}
updatePointerBar(e) {
    var t;
    null == (t = ea(this, Cn).pointer) || t.style.setProperty("width", 100 * this.getPointerRatio(e) + "%")
}
updateBar() {
    var e, t;
    const i = 100 * this.range.valueAsNumber;
    null == (e = ea(this, Cn).progress) || e.style.setProperty("width", `${i}%`), null == (t = ea(this, Cn).thumb) || t.style.setProperty("left", `${i}%`)
}
updateSegments(e) {
    const t = this.shadowRoot.querySelector("#segments-clipping");
    if (t.textContent = "", this.container.classList.toggle("segments", !!(null == e ? void 0 : e.length)), !(null == e ? void 0 : e.length)) return;
    const i = [...new Set([+this.range.min, ...e.flatMap((e => [e.start, e.end])), +this.range.max])];
    ia(this, Ln, [...i]);
    const n = i.pop();
    for (const [e, a] of i.entries()) {
        const [s, r] = [0 === e, e === i.length - 1], o = s ? "calc(var(--segments-gap) / -1)" : 100 * a + "%", l = `calc(${100*((r?n:i[e+1])-a)}%${s||r?"":" - var(--segments-gap)"})`, d = O.createElementNS("http://www.w3.org/2000/svg", "rect"), c = Z(this.shadowRoot, `#segments-clipping rect:nth-child(${e+1})`);
        c.style.setProperty("x", o), c.style.setProperty("width", l), t.append(d)
    }
}
getPointerRatio(e) {
    return function(e, t, i, n) {
        const a = n.x - i.x,
            s = n.y - i.y,
            r = a * a + s * s;
        if (0 === r) return 0;
        const o = ((e - i.x) * a + (t - i.y) * s) / r;
        return Math.max(0, Math.min(1, o))
    }(e.clientX, e.clientY, ea(this, Rn).getBoundingClientRect(), ea(this, Dn).getBoundingClientRect())
}
get dragging() {
    return this.hasAttribute("dragging")
}
handleEvent(e) {
    switch (e.type) {
        case "pointermove":
            na(this, Zn, zn).call(this, e);
            break;
        case "input":
            this.updateBar();
            break;
        case "pointerenter":
            na(this, Gn, qn).call(this, e);
            break;
        case "pointerdown":
            na(this, Hn, Fn).call(this, e);
            break;
        case "pointerup":
            na(this, Qn, Kn).call(this);
            break;
        case "pointerleave":
            na(this, jn, Yn).call(this)
    }
}
get keysUsed() {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]
}
}
Mn = new WeakMap, Sn = new WeakMap, Rn = new WeakMap, Dn = new WeakMap, Cn = new WeakMap, Ln = new WeakMap, xn = new WeakMap, Nn = new WeakMap, Un = new WeakMap, Pn = new WeakSet, On = function(e) {
const t = ea(this, Cn).activeSegment;
if (!t) return;
const i = this.getPointerRatio(e),
    n = `#segments-clipping rect:nth-child(${ea(this,Ln).findIndex(((e,t,n)=>{const a=n[t+1];return null!=a&&i>=e&&i<=a}))+1})`;
t.selectorText == n && t.style.transform || (t.selectorText = n, t.style.setProperty("transform", "var(--neptune-range-segment-hover-transform, scaleY(2))"))
}, Wn = new WeakSet, Vn = function() {
this.hasAttribute("disabled") || (this.addEventListener("input", this), this.addEventListener("pointerdown", this), this.addEventListener("pointerenter", this))
}, Bn = new WeakSet, $n = function() {
var e, t;
this.removeEventListener("input", this), this.removeEventListener("pointerdown", this), this.removeEventListener("pointerenter", this), null == (e = P.window) || e.removeEventListener("pointerup", this), null == (t = P.window) || t.removeEventListener("pointermove", this)
}, Hn = new WeakSet, Fn = function(e) {
var t;
ia(this, Sn, e.composedPath().includes(this.range)), null == (t = P.window) || t.addEventListener("pointerup", this)
}, Gn = new WeakSet, qn = function(e) {
var t;
"mouse" !== e.pointerType && na(this, Hn, Fn).call(this, e), this.addEventListener("pointerleave", this), null == (t = P.window) || t.addEventListener("pointermove", this)
}, Qn = new WeakSet, Kn = function() {
var e;
null == (e = P.window) || e.removeEventListener("pointerup", this), this.toggleAttribute("dragging", !1), this.range.disabled = this.hasAttribute("disabled")
}, jn = new WeakSet, Yn = function() {
var e, t;
this.removeEventListener("pointerleave", this), null == (e = P.window) || e.removeEventListener("pointermove", this), this.toggleAttribute("dragging", !1), this.range.disabled = this.hasAttribute("disabled"), null == (t = ea(this, Cn).activeSegment) || t.style.removeProperty("transform")
}, Zn = new WeakSet, zn = function(e) {
this.toggleAttribute("dragging", 1 === e.buttons || "mouse" !== e.pointerType), this.updatePointerBar(e), na(this, Pn, On).call(this, e), !this.dragging || "mouse" === e.pointerType && ea(this, Sn) || (this.range.disabled = !0, this.range.valueAsNumber = this.getPointerRatio(e), this.range.dispatchEvent(new Event("input", {
    bubbles: !0,
    composed: !0
})))
}, P.customElements.get("neptune-chrome-range") || P.customElements.define("neptune-chrome-range", sa);
var ra, oa = sa,
la = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
da = (e, t, i) => (la(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
ca = (e, t, i, n) => (la(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const ua = O.createElement("template");
ua.innerHTML = '\n  <style>\n    :host {\n      \n      box-sizing: border-box;\n      display: var(--neptune-control-display, var(--neptune-control-bar-display, inline-flex));\n      color: var(--neptune-text-color, var(--neptune-primary-color, rgb(238 238 238)));\n      --neptune-loading-indicator-icon-height: 44px;\n    }\n\n    ::slotted(neptune-time-range),\n    ::slotted(neptune-volume-range) {\n      min-height: 100%;\n    }\n\n    ::slotted(neptune-time-range),\n    ::slotted(neptune-clip-selector) {\n      flex-grow: 1;\n    }\n\n    ::slotted([role="menu"]) {\n      position: absolute;\n    }\n  </style>\n\n  <slot></slot>\n';
class ha extends P.HTMLElement {
constructor() {
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, ra, void 0), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(ua.content.cloneNode(!0)))
}
static get observedAttributes() {
    return [t.MEDIA_CONTROLLER]
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === t.MEDIA_CONTROLLER && (i && (null == (s = null == (a = da(this, ra)) ? void 0 : a.unassociateElement) || s.call(a, this), ca(this, ra, null)), n && this.isConnected && (ca(this, ra, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = da(this, ra)) ? void 0 : o.associateElement) || l.call(o, this)))
}
connectedCallback() {
    var e, i, n;
    const a = this.getAttribute(t.MEDIA_CONTROLLER);
    a && (ca(this, ra, null == (e = this.getRootNode()) ? void 0 : e.getElementById(a)), null == (n = null == (i = da(this, ra)) ? void 0 : i.associateElement) || n.call(i, this))
}
disconnectedCallback() {
    var e, t;
    null == (t = null == (e = da(this, ra)) ? void 0 : e.unassociateElement) || t.call(e, this), ca(this, ra, null)
}
}
ra = new WeakMap, P.customElements.get("neptune-control-bar") || P.customElements.define("neptune-control-bar", ha);
var ma, pa = ha,
Ea = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
va = (e, t, i) => (Ea(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
ba = (e, t, i, n) => (Ea(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const ga = O.createElement("template");
ga.innerHTML = "\n  <style>\n    :host {\n      font: var(--neptune-font,\n        var(--neptune-font-weight, normal)\n        var(--neptune-font-size, 14px) /\n        var(--neptune-text-content-height, var(--neptune-control-height, 24px))\n        var(--neptune-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));\n      color: var(--neptune-text-color, var(--neptune-primary-color, rgb(238 238 238)));\n      background: var(--neptune-text-background, var(--neptune-control-background, var(--neptune-secondary-color, rgb(20 20 30 / .7))));\n      padding: var(--neptune-control-padding, 10px);\n      display: inline-flex;\n      justify-content: center;\n      align-items: center;\n      vertical-align: middle;\n      box-sizing: border-box;\n      text-align: center;\n      pointer-events: auto;\n    }\n\n    \n    :host(:focus-visible) {\n      box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);\n      outline: 0;\n    }\n\n    \n    :host(:where(:focus)) {\n      box-shadow: none;\n      outline: 0;\n    }\n  </style>\n  <slot></slot>\n";
class Aa extends P.HTMLElement {
constructor() {
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, ma, void 0), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(ga.content.cloneNode(!0)))
}
static get observedAttributes() {
    return [t.MEDIA_CONTROLLER]
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === t.MEDIA_CONTROLLER && (i && (null == (s = null == (a = va(this, ma)) ? void 0 : a.unassociateElement) || s.call(a, this), ba(this, ma, null)), n && this.isConnected && (ba(this, ma, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = va(this, ma)) ? void 0 : o.associateElement) || l.call(o, this)))
}
connectedCallback() {
    var e, i, n;
    const {
        style: a
    } = Z(this.shadowRoot, ":host");
    a.setProperty("display", `var(--neptune-control-display, var(--${this.localName}-display, inline-flex))`);
    const s = this.getAttribute(t.MEDIA_CONTROLLER);
    s && (ba(this, ma, null == (e = this.getRootNode()) ? void 0 : e.getElementById(s)), null == (n = null == (i = va(this, ma)) ? void 0 : i.associateElement) || n.call(i, this))
}
disconnectedCallback() {
    var e, t;
    null == (t = null == (e = va(this, ma)) ? void 0 : e.unassociateElement) || t.call(e, this), ba(this, ma, null)
}
}
ma = new WeakMap, P.customElements.get("neptune-text-display") || P.customElements.define("neptune-text-display", Aa);
var fa, Ia = Aa,
ya = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
_a = (e, t, i) => (ya(e, t, "read from private field"), i ? i.call(e) : t.get(e));
class wa extends Aa {
constructor() {
    var e, t, i, n;
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, fa, void 0), e = this, t = fa, i = this.shadowRoot.querySelector("slot"), ya(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), _a(this, fa).textContent = I(0)
}
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_DURATION]
}
attributeChangedCallback(e, t, i) {
    e === a.MEDIA_DURATION && (_a(this, fa).textContent = I(+i)), super.attributeChangedCallback(e, t, i)
}
get mediaDuration() {
    return z(this, a.MEDIA_DURATION)
}
set mediaDuration(e) {
    X(this, a.MEDIA_DURATION, e)
}
}
fa = new WeakMap, P.customElements.get("neptune-duration-display") || P.customElements.define("neptune-duration-display", wa);
var ka = wa;
const Ta = {
    2: S("Network Error"),
    3: S("Decode Error"),
    4: S("Source Not Supported"),
    5: S("Encryption Error")
},
Ma = {
    2: S("A network error caused the media download to fail."),
    3: S("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),
    4: S("An unsupported error occurred. The server or network failed, or your browser does not support this format."),
    5: S("The media is encrypted and there are no keys to decrypt it.")
},
Sa = e => {
    var t, i;
    return 1 === e.code ? null : {
        title: null != (t = Ta[e.code]) ? t : `Error ${e.code}`,
        message: null != (i = Ma[e.code]) ? i : e.message
    }
};
var Ra, Da = (e, t, i) => {
if (!t.has(e)) throw TypeError("Cannot " + i)
};

function Ca(e) {
var t;
const {
    title: i,
    message: n
} = null != (t = Sa(e)) ? t : {};
let a = "";
return i && (a += `<slot name="error-${e.code}-title"><h3>${i}</h3></slot>`), n && (a += `<slot name="error-${e.code}-message"><p>${n}</p></slot>`), a
}
const La = [a.MEDIA_ERROR_CODE, a.MEDIA_ERROR_MESSAGE];
class xa extends Tn {
constructor() {
    super(...arguments), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, Ra, null)
}
static get observedAttributes() {
    return [...super.observedAttributes, ...La]
}
formatErrorMessage(e) {
    return this.constructor.formatErrorMessage(e)
}
attributeChangedCallback(e, t, i) {
    var n;
    if (super.attributeChangedCallback(e, t, i), !La.includes(e)) return;
    const a = null != (n = this.mediaError) ? n : {
        code: this.mediaErrorCode,
        message: this.mediaErrorMessage
    };
    var s;
    this.open = (s = a).code && null !== Sa(s), this.open && (this.shadowRoot.querySelector("slot").name = `error-${this.mediaErrorCode}`, this.shadowRoot.querySelector("#content").innerHTML = this.formatErrorMessage(a))
}
get mediaError() {
    return Da(e = this, t = Ra, "read from private field"), i ? i.call(e) : t.get(e);
    var e, t, i
}
set mediaError(e) {
    ((e, t, i, n) => {
        Da(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i)
    })(this, Ra, e)
}
get mediaErrorCode() {
    return z(this, "mediaerrorcode")
}
set mediaErrorCode(e) {
    X(this, "mediaerrorcode", e)
}
get mediaErrorMessage() {
    return te(this, "mediaerrormessage")
}
set mediaErrorMessage(e) {
    ie(this, "mediaerrormessage", e)
}
}
Ra = new WeakMap, xa.getSlotTemplateHTML = function(e) {
return `\n    <style>\n      :host {\n        background: rgb(20 20 30 / .8);\n      }\n\n      #content {\n        display: block;\n        padding: 1.2em 1.5em;\n      }\n\n      h3,\n      p {\n        margin-block: 0 .3em;\n      }\n    </style>\n    <slot name="error-${e.mediaerrorcode}" id="content">\n      ${Ca({code:+e.mediaerrorcode,message:e.mediaerrormessage})}\n    </slot>\n  `
}, xa.formatErrorMessage = Ca, P.customElements.get("neptune-error-dialog") || P.customElements.define("neptune-error-dialog", xa);
var Na = xa;
const Ua = O.createElement("template");
Ua.innerHTML = `\n  <style>\n    :host([${a.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {\n      display: none !important;\n    }\n\n    \n    :host(:not([${a.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {\n      display: none !important;\n    }\n\n    :host([${a.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],\n    :host(:not([${a.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {\n      display: none;\n    }\n  </style>\n\n  <slot name="icon">\n    <slot name="enter"><svg aria-hidden="true" viewBox="0 0 26 24">\n  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>\n</svg></slot>\n    <slot name="exit"><svg aria-hidden="true" viewBox="0 0 26 24">\n  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>\n</svg></slot>\n  </slot>\n`;
const Pa = `\n  <slot name="tooltip-enter">${S("Enter fullscreen mode")}</slot>\n  <slot name="tooltip-exit">${S("Exit fullscreen mode")}</slot>\n`,
Oa = e => {
    const t = e.mediaIsFullscreen ? S("exit fullscreen mode") : S("enter fullscreen mode");
    e.setAttribute("aria-label", t)
};
class Wa extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_IS_FULLSCREEN, a.MEDIA_FULLSCREEN_UNAVAILABLE]
}
constructor(e = {}) {
    super({
        slotTemplate: Ua,
        tooltipContent: Pa,
        ...e
    })
}
connectedCallback() {
    super.connectedCallback(), Oa(this)
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_IS_FULLSCREEN && Oa(this)
}
get mediaFullscreenUnavailable() {
    return te(this, a.MEDIA_FULLSCREEN_UNAVAILABLE)
}
set mediaFullscreenUnavailable(e) {
    ie(this, a.MEDIA_FULLSCREEN_UNAVAILABLE, e)
}
get mediaIsFullscreen() {
    return J(this, a.MEDIA_IS_FULLSCREEN)
}
set mediaIsFullscreen(e) {
    ee(this, a.MEDIA_IS_FULLSCREEN, e)
}
handleClick() {
    const t = this.mediaIsFullscreen ? e.MEDIA_EXIT_FULLSCREEN_REQUEST : e.MEDIA_ENTER_FULLSCREEN_REQUEST;
    this.dispatchEvent(new P.CustomEvent(t, {
        composed: !0,
        bubbles: !0
    }))
}
}
P.customElements.get("neptune-fullscreen-button") || P.customElements.define("neptune-fullscreen-button", Wa);
var Va = Wa;
const {
MEDIA_TIME_IS_LIVE: Ba,
MEDIA_PAUSED: $a
} = a, {
MEDIA_SEEK_TO_LIVE_REQUEST: Ha,
MEDIA_PLAY_REQUEST: Fa
} = e, Ga = O.createElement("template");
Ga.innerHTML = `\n  <style>\n  :host { --neptune-tooltip-display: none; }\n  \n  slot[name=indicator] > *,\n  :host ::slotted([slot=indicator]) {\n    \n    min-width: auto;\n    fill: var(--neptune-live-button-icon-color, rgb(140, 140, 140));\n    color: var(--neptune-live-button-icon-color, rgb(140, 140, 140));\n  }\n\n  :host([${Ba}]:not([${$a}])) slot[name=indicator] > *,\n  :host([${Ba}]:not([${$a}])) ::slotted([slot=indicator]) {\n    fill: var(--neptune-live-button-indicator-color, rgb(255, 0, 0));\n    color: var(--neptune-live-button-indicator-color, rgb(255, 0, 0));\n  }\n\n  :host([${Ba}]:not([${$a}])) {\n    cursor: var(--neptune-cursor, not-allowed);\n  }\n\n  slot[name=text]{\n    text-transform: uppercase;\n  }\n\n  </style>\n\n  <slot name="indicator"><svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg></slot>\n  \n  <slot name="spacer">&nbsp;</slot><slot name="text">${S("live")}</slot>\n`;
const qa = e => {
const t = e.mediaPaused || !e.mediaTimeIsLive,
    i = S(t ? "seek to live" : "playing live");
e.setAttribute("aria-label", i), t ? e.removeAttribute("aria-disabled") : e.setAttribute("aria-disabled", "true")
};
class Qa extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, $a, Ba]
}
constructor(e = {}) {
    super({
        slotTemplate: Ga,
        ...e
    })
}
connectedCallback() {
    qa(this), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), qa(this)
}
get mediaPaused() {
    return J(this, a.MEDIA_PAUSED)
}
set mediaPaused(e) {
    ee(this, a.MEDIA_PAUSED, e)
}
get mediaTimeIsLive() {
    return J(this, a.MEDIA_TIME_IS_LIVE)
}
set mediaTimeIsLive(e) {
    ee(this, a.MEDIA_TIME_IS_LIVE, e)
}
handleClick() {
    !this.mediaPaused && this.mediaTimeIsLive || (this.dispatchEvent(new P.CustomEvent(Ha, {
        composed: !0,
        bubbles: !0
    })), this.hasAttribute($a) && this.dispatchEvent(new P.CustomEvent(Fa, {
        composed: !0,
        bubbles: !0
    })))
}
}
P.customElements.get("neptune-live-button") || P.customElements.define("neptune-live-button", Qa);
var Ka, ja, Ya = Qa,
Za = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
za = (e, t, i) => (Za(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
Xa = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Ja = (e, t, i, n) => (Za(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const es = "loadingdelay",
ts = "noautohide",
is = O.createElement("template");
is.innerHTML = `\n<style>\n:host {\n  display: var(--neptune-control-display, var(--neptune-loading-indicator-display, inline-block));\n  vertical-align: middle;\n  box-sizing: border-box;\n  --_loading-indicator-delay: var(--neptune-loading-indicator-transition-delay, 500ms);\n}\n\n#status {\n  color: rgba(0,0,0,0);\n  width: 0px;\n  height: 0px;\n}\n\n:host slot[name=icon] > *,\n:host ::slotted([slot=icon]) {\n  opacity: var(--neptune-loading-indicator-opacity, 0);\n  transition: opacity 0.15s;\n}\n\n:host([${a.MEDIA_LOADING}]:not([${a.MEDIA_PAUSED}])) slot[name=icon] > *,\n:host([${a.MEDIA_LOADING}]:not([${a.MEDIA_PAUSED}])) ::slotted([slot=icon]) {\n  opacity: var(--neptune-loading-indicator-opacity, 1);\n  transition: opacity 0.15s var(--_loading-indicator-delay);\n}\n\n:host #status {\n  visibility: var(--neptune-loading-indicator-opacity, hidden);\n  transition: visibility 0.15s;\n}\n\n:host([${a.MEDIA_LOADING}]:not([${a.MEDIA_PAUSED}])) #status {\n  visibility: var(--neptune-loading-indicator-opacity, visible);\n  transition: visibility 0.15s var(--_loading-indicator-delay);\n}\n\nsvg, img, ::slotted(svg), ::slotted(img) {\n  width: var(--neptune-loading-indicator-icon-width);\n  height: var(--neptune-loading-indicator-icon-height, 100px);\n  fill: var(--neptune-icon-color, var(--neptune-primary-color, rgb(238 238 238)));\n  vertical-align: middle;\n}\n</style>\n\n<slot name="icon">\n<svg aria-hidden="true" viewBox="0 0 100 100">\n  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">\n    <animateTransform\n       attributeName="transform"\n       attributeType="XML"\n       type="rotate"\n       dur="1s"\n       from="0 50 50"\n       to="360 50 50"\n       repeatCount="indefinite" />\n  </path>\n</svg>\n</slot>\n<div id="status" role="status" aria-live="polite">${S("media loading")}</div>\n`;
class ns extends P.HTMLElement {
constructor() {
    if (super(), Xa(this, Ka, void 0), Xa(this, ja, 500), !this.shadowRoot) {
        const e = this.attachShadow({
                mode: "open"
            }),
            t = is.content.cloneNode(!0);
        e.appendChild(t)
    }
}
static get observedAttributes() {
    return [t.MEDIA_CONTROLLER, a.MEDIA_PAUSED, a.MEDIA_LOADING, es]
}
attributeChangedCallback(e, i, n) {
    var a, s, r, o, l;
    e === es && i !== n ? this.loadingDelay = Number(n) : e === t.MEDIA_CONTROLLER && (i && (null == (s = null == (a = za(this, Ka)) ? void 0 : a.unassociateElement) || s.call(a, this), Ja(this, Ka, null)), n && this.isConnected && (Ja(this, Ka, null == (r = this.getRootNode()) ? void 0 : r.getElementById(n)), null == (l = null == (o = za(this, Ka)) ? void 0 : o.associateElement) || l.call(o, this)))
}
connectedCallback() {
    var e, i, n;
    const a = this.getAttribute(t.MEDIA_CONTROLLER);
    a && (Ja(this, Ka, null == (e = this.getRootNode()) ? void 0 : e.getElementById(a)), null == (n = null == (i = za(this, Ka)) ? void 0 : i.associateElement) || n.call(i, this))
}
disconnectedCallback() {
    var e, t;
    null == (t = null == (e = za(this, Ka)) ? void 0 : e.unassociateElement) || t.call(e, this), Ja(this, Ka, null)
}
get loadingDelay() {
    return za(this, ja)
}
set loadingDelay(e) {
    Ja(this, ja, e);
    const {
        style: t
    } = Z(this.shadowRoot, ":host");
    t.setProperty("--_loading-indicator-delay", `var(--neptune-loading-indicator-transition-delay, ${e}ms)`)
}
get mediaPaused() {
    return J(this, a.MEDIA_PAUSED)
}
set mediaPaused(e) {
    ee(this, a.MEDIA_PAUSED, e)
}
get mediaLoading() {
    return J(this, a.MEDIA_LOADING)
}
set mediaLoading(e) {
    ee(this, a.MEDIA_LOADING, e)
}
get mediaController() {
    return te(this, t.MEDIA_CONTROLLER)
}
set mediaController(e) {
    ie(this, t.MEDIA_CONTROLLER, e)
}
get noAutohide() {
    return J(this, ts)
}
set noAutohide(e) {
    ee(this, ts, e)
}
}
Ka = new WeakMap, ja = new WeakMap, P.customElements.get("neptune-loading-indicator") || P.customElements.define("neptune-loading-indicator", ns);
var as = ns;
const {
MEDIA_VOLUME_LEVEL: ss
} = a, rs = '<svg aria-hidden="true" viewBox="0 0 24 24">\n  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>\n</svg>', os = O.createElement("template");
os.innerHTML = `\n  <style>\n  \n  :host(:not([${ss}])) slot[name=icon] slot:not([name=high]), \n  :host([${ss}=high]) slot[name=icon] slot:not([name=high]) {\n    display: none !important;\n  }\n\n  :host([${ss}=off]) slot[name=icon] slot:not([name=off]) {\n    display: none !important;\n  }\n\n  :host([${ss}=low]) slot[name=icon] slot:not([name=low]) {\n    display: none !important;\n  }\n\n  :host([${ss}=medium]) slot[name=icon] slot:not([name=medium]) {\n    display: none !important;\n  }\n\n  :host(:not([${ss}=off])) slot[name=tooltip-unmute],\n  :host([${ss}=off]) slot[name=tooltip-mute] {\n    display: none;\n  }\n  </style>\n\n  <slot name="icon">\n    <slot name="off"><svg aria-hidden="true" viewBox="0 0 24 24">\n  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>\n</svg></slot>\n    <slot name="low">${rs}</slot>\n    <slot name="medium">${rs}</slot>\n    <slot name="high"><svg aria-hidden="true" viewBox="0 0 24 24">\n  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>\n</svg></slot>\n  </slot>\n`;
const ls = `\n  <slot name="tooltip-mute">${S("Mute")}</slot>\n  <slot name="tooltip-unmute">${S("Unmute")}</slot>\n`,
ds = e => {
    const t = "off" === e.mediaVolumeLevel,
        i = S(t ? "unmute" : "mute");
    e.setAttribute("aria-label", i)
};
class cs extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_VOLUME_LEVEL]
}
constructor(e = {}) {
    super({
        slotTemplate: os,
        tooltipContent: ls,
        ...e
    })
}
connectedCallback() {
    ds(this), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    e === a.MEDIA_VOLUME_LEVEL && ds(this), super.attributeChangedCallback(e, t, i)
}
get mediaVolumeLevel() {
    return te(this, a.MEDIA_VOLUME_LEVEL)
}
set mediaVolumeLevel(e) {
    ie(this, a.MEDIA_VOLUME_LEVEL, e)
}
handleClick() {
    const t = "off" === this.mediaVolumeLevel ? e.MEDIA_UNMUTE_REQUEST : e.MEDIA_MUTE_REQUEST;
    this.dispatchEvent(new P.CustomEvent(t, {
        composed: !0,
        bubbles: !0
    }))
}
}
P.customElements.get("neptune-mute-button") || P.customElements.define("neptune-mute-button", cs);
var us = cs;
const hs = '<svg aria-hidden="true" viewBox="0 0 28 24">\n  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>\n</svg>',
ms = O.createElement("template");
ms.innerHTML = `\n  <style>\n  :host([${a.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {\n    display: none !important;\n  }\n\n  \n  :host(:not([${a.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {\n    display: none !important;\n  }\n\n  :host([${a.MEDIA_IS_PIP}]) slot[name=tooltip-enter],\n  :host(:not([${a.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {\n    display: none;\n  }\n  </style>\n\n  <slot name="icon">\n    <slot name="enter">${hs}</slot>\n    <slot name="exit">${hs}</slot>\n  </slot>\n`;
const ps = `\n  <slot name="tooltip-enter">${S("Enter picture in picture mode")}</slot>\n  <slot name="tooltip-exit">${S("Exit picture in picture mode")}</slot>\n`,
Es = e => {
    const t = e.mediaIsPip ? S("exit picture in picture mode") : S("enter picture in picture mode");
    e.setAttribute("aria-label", t)
};
class vs extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_IS_PIP, a.MEDIA_PIP_UNAVAILABLE]
}
constructor(e = {}) {
    super({
        slotTemplate: ms,
        tooltipContent: ps,
        ...e
    })
}
connectedCallback() {
    Es(this), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    e === a.MEDIA_IS_PIP && Es(this), super.attributeChangedCallback(e, t, i)
}
get mediaPipUnavailable() {
    return te(this, a.MEDIA_PIP_UNAVAILABLE)
}
set mediaPipUnavailable(e) {
    ie(this, a.MEDIA_PIP_UNAVAILABLE, e)
}
get mediaIsPip() {
    return J(this, a.MEDIA_IS_PIP)
}
set mediaIsPip(e) {
    ee(this, a.MEDIA_IS_PIP, e)
}
handleClick() {
    const t = this.mediaIsPip ? e.MEDIA_EXIT_PIP_REQUEST : e.MEDIA_ENTER_PIP_REQUEST;
    this.dispatchEvent(new P.CustomEvent(t, {
        composed: !0,
        bubbles: !0
    }))
}
}
P.customElements.get("neptune-pip-button") || P.customElements.define("neptune-pip-button", vs);
var bs, gs = vs,
As = (e, t, i) => (((e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
})(e, t, "read from private field"), i ? i.call(e) : t.get(e));
const fs = "rates",
Is = [1, 1.2, 1.5, 1.7, 2],
ys = O.createElement("template");
ys.innerHTML = '\n  <style>\n    :host {\n      min-width: 5ch;\n      padding: var(--neptune-button-padding, var(--neptune-control-padding, 10px 5px));\n    }\n  </style>\n  <slot name="icon"></slot>\n';
class _s extends Oi {
constructor(e = {}) {
    super({
        slotTemplate: ys,
        tooltipContent: S("Playback rate"),
        ...e
    }), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, bs, new Ze(this, fs, {
        defaultValue: Is
    })), this.container = this.shadowRoot.querySelector('slot[name="icon"]'), this.container.innerHTML = "1x"
}
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_PLAYBACK_RATE, fs]
}
attributeChangedCallback(e, t, i) {
    if (super.attributeChangedCallback(e, t, i), e === fs && (As(this, bs).value = i), e === a.MEDIA_PLAYBACK_RATE) {
        const e = i ? +i : Number.NaN,
            t = Number.isNaN(e) ? 1 : e;
        this.container.innerHTML = `${t}x`, this.setAttribute("aria-label", S("Playback rate {playbackRate}", {
            playbackRate: t
        }))
    }
}
get rates() {
    return As(this, bs)
}
set rates(e) {
    e ? Array.isArray(e) && (As(this, bs).value = e.join(" ")) : As(this, bs).value = ""
}
get mediaPlaybackRate() {
    return z(this, a.MEDIA_PLAYBACK_RATE, 1)
}
set mediaPlaybackRate(e) {
    X(this, a.MEDIA_PLAYBACK_RATE, e)
}
handleClick() {
    var t, i;
    const n = Array.from(this.rates.values(), (e => +e)).sort(((e, t) => e - t)),
        a = null != (i = null != (t = n.find((e => e > this.mediaPlaybackRate))) ? t : n[0]) ? i : 1,
        s = new P.CustomEvent(e.MEDIA_PLAYBACK_RATE_REQUEST, {
            composed: !0,
            bubbles: !0,
            detail: a
        });
    this.dispatchEvent(s)
}
}
bs = new WeakMap, P.customElements.get("neptune-playback-rate-button") || P.customElements.define("neptune-playback-rate-button", _s);
var ws = _s;
const ks = O.createElement("template");
ks.innerHTML = `\n  <style>\n    :host([${a.MEDIA_PAUSED}]) slot[name=pause],\n    :host(:not([${a.MEDIA_PAUSED}])) slot[name=play] {\n      display: none !important;\n    }\n\n    :host([${a.MEDIA_PAUSED}]) slot[name=tooltip-pause],\n    :host(:not([${a.MEDIA_PAUSED}])) slot[name=tooltip-play] {\n      display: none;\n    }\n  </style>\n\n  <slot name="icon">\n    <slot name="play"><svg aria-hidden="true" viewBox="0 0 24 24">\n  <path d="m6 21 15-9L6 3v18Z"/>\n</svg></slot>\n    <slot name="pause"><svg aria-hidden="true" viewBox="0 0 24 24">\n  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>\n</svg></slot>\n  </slot>\n`;
const Ts = `\n  <slot name="tooltip-play">${S("Play")}</slot>\n  <slot name="tooltip-pause">${S("Pause")}</slot>\n`,
Ms = e => {
    const t = e.mediaPaused ? S("play") : S("pause");
    e.setAttribute("aria-label", t)
};
class Ss extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_PAUSED, a.MEDIA_ENDED]
}
constructor(e = {}) {
    super({
        slotTemplate: ks,
        tooltipContent: Ts,
        ...e
    })
}
connectedCallback() {
    Ms(this), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    e === a.MEDIA_PAUSED && Ms(this), super.attributeChangedCallback(e, t, i)
}
get mediaPaused() {
    return J(this, a.MEDIA_PAUSED)
}
set mediaPaused(e) {
    ee(this, a.MEDIA_PAUSED, e)
}
handleClick() {
    const t = this.mediaPaused ? e.MEDIA_PLAY_REQUEST : e.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(new P.CustomEvent(t, {
        composed: !0,
        bubbles: !0
    }))
}
}
P.customElements.get("neptune-play-button") || P.customElements.define("neptune-play-button", Ss);
var Rs = Ss;
const Ds = "placeholdersrc",
Cs = "src",
Ls = O.createElement("template");
Ls.innerHTML = '\n  <style>\n    :host {\n      pointer-events: none;\n      display: var(--neptune-poster-image-display, inline-block);\n      box-sizing: border-box;\n    }\n\n    img {\n      max-width: 100%;\n      max-height: 100%;\n      min-width: 100%;\n      min-height: 100%;\n      background-repeat: no-repeat;\n      background-position: var(--neptune-poster-image-background-position, var(--neptune-object-position, center));\n      background-size: var(--neptune-poster-image-background-size, var(--neptune-object-fit, contain));\n      object-fit: var(--neptune-object-fit, contain);\n      object-position: var(--neptune-object-position, center);\n    }\n  </style>\n\n  <img part="poster img" aria-hidden="true" id="image"/>\n';
class xs extends P.HTMLElement {
static get observedAttributes() {
    return [Ds, Cs]
}
constructor() {
    super(), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(Ls.content.cloneNode(!0))), this.image = this.shadowRoot.querySelector("#image")
}
attributeChangedCallback(e, t, i) {
    e === Cs && (null == i ? this.image.removeAttribute(Cs) : this.image.setAttribute(Cs, i)), e === Ds && (null == i ? this.image.style.removeProperty("background-image") : ((e, t) => {
        e.style["background-image"] = `url('${t}')`
    })(this.image, i))
}
get placeholderSrc() {
    return te(this, Ds)
}
set placeholderSrc(e) {
    ie(this, Cs, e)
}
get src() {
    return te(this, Cs)
}
set src(e) {
    ie(this, Cs, e)
}
}
P.customElements.get("neptune-poster-image") || P.customElements.define("neptune-poster-image", xs);
var Ns, Us = xs,
Ps = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
};
class Os extends Aa {
constructor() {
    var e, t, i, n;
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, Ns, void 0), e = this, t = Ns, i = this.shadowRoot.querySelector("slot"), Ps(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i)
}
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_PREVIEW_CHAPTER]
}
attributeChangedCallback(e, t, i) {
    var n, s, r;
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_PREVIEW_CHAPTER && i !== t && null != i && ((n = this, s = Ns, Ps(n, s, "read from private field"), r ? r.call(n) : s.get(n)).textContent = i, "" !== i ? this.setAttribute("aria-valuetext", `chapter: ${i}`) : this.removeAttribute("aria-valuetext"))
}
get mediaPreviewChapter() {
    return te(this, a.MEDIA_PREVIEW_CHAPTER)
}
set mediaPreviewChapter(e) {
    ie(this, a.MEDIA_PREVIEW_CHAPTER, e)
}
}
Ns = new WeakMap, P.customElements.get("neptune-preview-chapter-display") || P.customElements.define("neptune-preview-chapter-display", Os);
var Ws, Vs = Os,
Bs = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
$s = (e, t, i) => (Bs(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
Hs = (e, t, i, n) => (Bs(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const Fs = O.createElement("template");
Fs.innerHTML = '\n  <style>\n    :host {\n      box-sizing: border-box;\n      display: var(--neptune-control-display, var(--neptune-preview-thumbnail-display, inline-block));\n      overflow: hidden;\n    }\n\n    img {\n      display: none;\n      position: relative;\n    }\n  </style>\n  <img crossorigin loading="eager" decoding="async">\n';
class Gs extends P.HTMLElement {
constructor() {
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, Ws, void 0), this.shadowRoot || (this.attachShadow({
        mode: "open"
    }), this.shadowRoot.appendChild(Fs.content.cloneNode(!0)))
}
static get observedAttributes() {
    return [t.MEDIA_CONTROLLER, a.MEDIA_PREVIEW_IMAGE, a.MEDIA_PREVIEW_COORDS]
}
connectedCallback() {
    var e, i, n;
    const a = this.getAttribute(t.MEDIA_CONTROLLER);
    a && (Hs(this, Ws, null == (e = this.getRootNode()) ? void 0 : e.getElementById(a)), null == (n = null == (i = $s(this, Ws)) ? void 0 : i.associateElement) || n.call(i, this))
}
disconnectedCallback() {
    var e, t;
    null == (t = null == (e = $s(this, Ws)) ? void 0 : e.unassociateElement) || t.call(e, this), Hs(this, Ws, null)
}
attributeChangedCallback(e, i, n) {
    var s, r, o, l, d;
    [a.MEDIA_PREVIEW_IMAGE, a.MEDIA_PREVIEW_COORDS].includes(e) && this.update(), e === t.MEDIA_CONTROLLER && (i && (null == (r = null == (s = $s(this, Ws)) ? void 0 : s.unassociateElement) || r.call(s, this), Hs(this, Ws, null)), n && this.isConnected && (Hs(this, Ws, null == (o = this.getRootNode()) ? void 0 : o.getElementById(n)), null == (d = null == (l = $s(this, Ws)) ? void 0 : l.associateElement) || d.call(l, this)))
}
get mediaPreviewImage() {
    return te(this, a.MEDIA_PREVIEW_IMAGE)
}
set mediaPreviewImage(e) {
    ie(this, a.MEDIA_PREVIEW_IMAGE, e)
}
get mediaPreviewCoords() {
    const e = this.getAttribute(a.MEDIA_PREVIEW_COORDS);
    if (e) return e.split(/\s+/).map((e => +e))
}
set mediaPreviewCoords(e) {
    e ? this.setAttribute(a.MEDIA_PREVIEW_COORDS, e.join(" ")) : this.removeAttribute(a.MEDIA_PREVIEW_COORDS)
}
update() {
    const e = this.mediaPreviewCoords,
        t = this.mediaPreviewImage;
    if (!e || !t) return;
    const [i, n, a, s] = e, r = t.split("#")[0], o = getComputedStyle(this), {
        maxWidth: l,
        maxHeight: d,
        minWidth: c,
        minHeight: u
    } = o, h = Math.min(parseInt(l) / a, parseInt(d) / s), m = Math.max(parseInt(c) / a, parseInt(u) / s), p = h < 1, E = p ? h : m > 1 ? m : 1, {
        style: v
    } = Z(this.shadowRoot, ":host"), b = Z(this.shadowRoot, "img").style, g = this.shadowRoot.querySelector("img"), A = p ? "min" : "max";
    v.setProperty(`${A}-width`, "initial", "important"), v.setProperty(`${A}-height`, "initial", "important"), v.width = a * E + "px", v.height = s * E + "px";
    const f = () => {
        b.width = this.imgWidth * E + "px", b.height = this.imgHeight * E + "px", b.display = "block"
    };
    g.src !== r && (g.onload = () => {
        this.imgWidth = g.naturalWidth, this.imgHeight = g.naturalHeight, f()
    }, g.src = r, f()), f(), b.transform = `translate(-${i*E}px, -${n*E}px)`
}
}
Ws = new WeakMap, P.customElements.get("neptune-preview-thumbnail") || P.customElements.define("neptune-preview-thumbnail", Gs);
var qs, Qs = Gs,
Ks = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
js = (e, t, i) => (Ks(e, t, "read from private field"), i ? i.call(e) : t.get(e));
class Ys extends Aa {
constructor() {
    var e, t, i, n;
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, qs, void 0), e = this, t = qs, i = this.shadowRoot.querySelector("slot"), Ks(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), js(this, qs).textContent = I(0)
}
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_PREVIEW_TIME]
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), e === a.MEDIA_PREVIEW_TIME && null != i && (js(this, qs).textContent = I(parseFloat(i)))
}
get mediaPreviewTime() {
    return z(this, a.MEDIA_PREVIEW_TIME)
}
set mediaPreviewTime(e) {
    X(this, a.MEDIA_PREVIEW_TIME, e)
}
}
qs = new WeakMap, P.customElements.get("neptune-preview-time-display") || P.customElements.define("neptune-preview-time-display", Ys);
var Zs = Ys;
const zs = "seekoffset",
Xs = O.createElement("template");
Xs.innerHTML = '\n  <slot name="icon"><svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">30</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg></slot>\n';
class Js extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_CURRENT_TIME, zs]
}
constructor(e = {}) {
    super({
        slotTemplate: Xs,
        tooltipContent: S("Seek backward"),
        ...e
    })
}
connectedCallback() {
    this.seekOffset = z(this, zs, 30), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    e === zs && (this.seekOffset = z(this, zs, 30)), super.attributeChangedCallback(e, t, i)
}
get seekOffset() {
    return z(this, zs, 30)
}
set seekOffset(e) {
    X(this, zs, e), this.setAttribute("aria-label", S("seek back {seekOffset} seconds", {
        seekOffset: this.seekOffset
    })), G(q(this, "icon"), this.seekOffset)
}
get mediaCurrentTime() {
    return z(this, a.MEDIA_CURRENT_TIME, 0)
}
set mediaCurrentTime(e) {
    X(this, a.MEDIA_CURRENT_TIME, e)
}
handleClick() {
    const t = Math.max(this.mediaCurrentTime - this.seekOffset, 0),
        i = new P.CustomEvent(e.MEDIA_SEEK_REQUEST, {
            composed: !0,
            bubbles: !0,
            detail: t
        });
    this.dispatchEvent(i)
}
}
P.customElements.get("neptune-seek-backward-button") || P.customElements.define("neptune-seek-backward-button", Js);
var er = Js;
const tr = "seekoffset",
ir = O.createElement("template");
ir.innerHTML = '\n  <slot name="icon"><svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(8.9 19.87)">30</text><path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/></svg></slot>\n';
class nr extends Oi {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_CURRENT_TIME, tr]
}
constructor(e = {}) {
    super({
        slotTemplate: ir,
        tooltipContent: S("Seek forward"),
        ...e
    })
}
connectedCallback() {
    this.seekOffset = z(this, tr, 30), super.connectedCallback()
}
attributeChangedCallback(e, t, i) {
    e === tr && (this.seekOffset = z(this, tr, 30)), super.attributeChangedCallback(e, t, i)
}
get seekOffset() {
    return z(this, tr, 30)
}
set seekOffset(e) {
    X(this, tr, e), this.setAttribute("aria-label", S("seek forward {seekOffset} seconds", {
        seekOffset: this.seekOffset
    })), G(q(this, "icon"), this.seekOffset)
}
get mediaCurrentTime() {
    return z(this, a.MEDIA_CURRENT_TIME, 0)
}
set mediaCurrentTime(e) {
    X(this, a.MEDIA_CURRENT_TIME, e)
}
handleClick() {
    const t = this.mediaCurrentTime + this.seekOffset,
        i = new P.CustomEvent(e.MEDIA_SEEK_REQUEST, {
            composed: !0,
            bubbles: !0,
            detail: t
        });
    this.dispatchEvent(i)
}
}
P.customElements.get("neptune-seek-forward-button") || P.customElements.define("neptune-seek-forward-button", nr);
var ar, sr = nr,
rr = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
or = (e, t, i) => (rr(e, t, "read from private field"), i ? i.call(e) : t.get(e));
const lr = {
    REMAINING: "remaining",
    SHOW_DURATION: "showduration",
    NO_TOGGLE: "notoggle"
},
dr = [...Object.values(lr), a.MEDIA_CURRENT_TIME, a.MEDIA_DURATION, a.MEDIA_SEEKABLE],
cr = ["Enter", " "],
ur = (e, {
    timesSep: t = "&nbsp;/&nbsp;"
} = {}) => {
    var i, n;
    const a = e.hasAttribute(lr.REMAINING),
        s = e.hasAttribute(lr.SHOW_DURATION),
        r = null != (i = e.mediaCurrentTime) ? i : 0,
        [, o] = null != (n = e.mediaSeekable) ? n : [];
    let l = 0;
    Number.isFinite(e.mediaDuration) ? l = e.mediaDuration : Number.isFinite(o) && (l = o);
    const d = I(a ? 0 - (l - r) : r);
    return s ? `${d}${t}${I(l)}` : d
};
class hr extends Aa {
constructor() {
    var e, t, i, n;
    super(), ((e, t, i) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, i)
    })(this, ar, void 0), e = this, t = ar, i = this.shadowRoot.querySelector("slot"), rr(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), or(this, ar).innerHTML = `${ur(this)}`
}
static get observedAttributes() {
    return [...super.observedAttributes, ...dr, "disabled"]
}
connectedCallback() {
    const {
        style: e
    } = Z(this.shadowRoot, ":host(:hover:not([notoggle]))");
    e.setProperty("cursor", "var(--neptune-cursor, pointer)"), e.setProperty("background", "var(--neptune-control-hover-background, rgba(50 50 70 / .7))"), this.hasAttribute("disabled") || this.enable(), this.setAttribute("role", "progressbar"), this.setAttribute("aria-label", S("playback time"));
    const t = e => {
        const {
            key: i
        } = e;
        cr.includes(i) ? this.toggleTimeDisplay() : this.removeEventListener("keyup", t)
    };
    this.addEventListener("keydown", (e => {
        const {
            metaKey: i,
            altKey: n,
            key: a
        } = e;
        i || n || !cr.includes(a) ? this.removeEventListener("keyup", t) : this.addEventListener("keyup", t)
    })), this.addEventListener("click", this.toggleTimeDisplay), super.connectedCallback()
}
toggleTimeDisplay() {
    this.noToggle || (this.hasAttribute("remaining") ? this.removeAttribute("remaining") : this.setAttribute("remaining", ""))
}
disconnectedCallback() {
    this.disable(), super.disconnectedCallback()
}
attributeChangedCallback(e, t, i) {
    dr.includes(e) ? this.update() : "disabled" === e && i !== t && (null == i ? this.enable() : this.disable()), super.attributeChangedCallback(e, t, i)
}
enable() {
    this.tabIndex = 0
}
disable() {
    this.tabIndex = -1
}
get remaining() {
    return J(this, lr.REMAINING)
}
set remaining(e) {
    ee(this, lr.REMAINING, e)
}
get showDuration() {
    return J(this, lr.SHOW_DURATION)
}
set showDuration(e) {
    ee(this, lr.SHOW_DURATION, e)
}
get noToggle() {
    return J(this, lr.NO_TOGGLE)
}
set noToggle(e) {
    ee(this, lr.NO_TOGGLE, e)
}
get mediaDuration() {
    return z(this, a.MEDIA_DURATION)
}
set mediaDuration(e) {
    X(this, a.MEDIA_DURATION, e)
}
get mediaCurrentTime() {
    return z(this, a.MEDIA_CURRENT_TIME)
}
set mediaCurrentTime(e) {
    X(this, a.MEDIA_CURRENT_TIME, e)
}
get mediaSeekable() {
    const e = this.getAttribute(a.MEDIA_SEEKABLE);
    if (e) return e.split(":").map((e => +e))
}
set mediaSeekable(e) {
    null != e ? this.setAttribute(a.MEDIA_SEEKABLE, e.join(":")) : this.removeAttribute(a.MEDIA_SEEKABLE)
}
update() {
    const e = ur(this);
    (e => {
        var t;
        const i = e.mediaCurrentTime,
            [, n] = null != (t = e.mediaSeekable) ? t : [];
        let a = null;
        if (Number.isFinite(e.mediaDuration) ? a = e.mediaDuration : Number.isFinite(n) && (a = n), null == i || null === a) return void e.setAttribute("aria-valuetext", "video not loaded, unknown time.");
        const s = e.hasAttribute(lr.REMAINING),
            r = e.hasAttribute(lr.SHOW_DURATION),
            o = f(s ? 0 - (a - i) : i);
        if (!r) return void e.setAttribute("aria-valuetext", o);
        const l = `${o} of ${f(a)}`;
        e.setAttribute("aria-valuetext", l)
    })(this), e !== or(this, ar).innerHTML && (or(this, ar).innerHTML = e)
}
}
ar = new WeakMap, P.customElements.get("neptune-time-display") || P.customElements.define("neptune-time-display", hr);
var mr, pr, Er, vr, br, gr, Ar, fr, Ir, yr, _r = hr,
wr = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
kr = (e, t, i) => (wr(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
Tr = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
Mr = (e, t, i, n) => (wr(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
class Sr {
constructor(e, t, i) {
    Tr(this, mr, void 0), Tr(this, pr, void 0), Tr(this, Er, void 0), Tr(this, vr, void 0), Tr(this, br, void 0), Tr(this, gr, void 0), Tr(this, Ar, void 0), Tr(this, fr, void 0), Tr(this, Ir, 0), Tr(this, yr, ((e = performance.now()) => {
        Mr(this, Ir, requestAnimationFrame(kr(this, yr))), Mr(this, vr, performance.now() - kr(this, Er));
        const t = 1e3 / this.fps;
        if (kr(this, vr) > t) {
            Mr(this, Er, e - kr(this, vr) % t);
            const r = 1e3 / ((e - kr(this, pr)) / ++(i = this, n = br, {
                    set _(e) {
                        Mr(i, n, e, a)
                    },
                    get _() {
                        return kr(i, n, s)
                    }
                })._),
                o = (e - kr(this, gr)) / 1e3 / this.duration;
            let l = kr(this, Ar) + o * this.playbackRate;
            l - kr(this, mr).valueAsNumber > 0 ? Mr(this, fr, this.playbackRate / this.duration / r) : (Mr(this, fr, .995 * kr(this, fr)), l = kr(this, mr).valueAsNumber + kr(this, fr)), this.callback(l)
        }
        var i, n, a, s
    })), Mr(this, mr, e), this.callback = t, this.fps = i
}
start() {
    0 === kr(this, Ir) && (Mr(this, Er, performance.now()), Mr(this, pr, kr(this, Er)), Mr(this, br, 0), kr(this, yr).call(this))
}
stop() {
    0 !== kr(this, Ir) && (cancelAnimationFrame(kr(this, Ir)), Mr(this, Ir, 0))
}
update({
    start: e,
    duration: t,
    playbackRate: i
}) {
    const n = e - kr(this, mr).valueAsNumber,
        a = Math.abs(t - this.duration);
    (n > 0 || n < -.03 || a >= .5) && this.callback(e), Mr(this, Ar, e), Mr(this, gr, performance.now()), this.duration = t, this.playbackRate = i
}
}
mr = new WeakMap, pr = new WeakMap, Er = new WeakMap, vr = new WeakMap, br = new WeakMap, gr = new WeakMap, Ar = new WeakMap, fr = new WeakMap, Ir = new WeakMap, yr = new WeakMap;
var Rr, Dr, Cr, Lr, xr, Nr, Ur, Pr, Or, Wr, Vr, Br, $r, Hr, Fr, Gr, qr, Qr, Kr, jr, Yr, Zr, zr, Xr, Jr, eo, to = (e, t, i) => {
    if (!t.has(e)) throw TypeError("Cannot " + i)
},
io = (e, t, i) => (to(e, t, "read from private field"), i ? i.call(e) : t.get(e)),
no = (e, t, i) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, i)
},
ao = (e, t, i, n) => (to(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i),
so = (e, t, i) => (to(e, t, "access private method"), i);
const ro = O.createElement("template");
ro.innerHTML = `\n  <style>\n    :host {\n      --neptune-box-border-radius: 4px;\n      --neptune-box-padding-left: 10px;\n      --neptune-box-padding-right: 10px;\n      --neptune-preview-border-radius: var(--neptune-box-border-radius);\n      --neptune-box-arrow-offset: var(--neptune-box-border-radius);\n      --_control-background: var(--neptune-control-background, var(--neptune-secondary-color, rgb(20 20 30 / .7)));\n      --_preview-background: var(--neptune-preview-background, var(--_control-background));\n\n      \n      contain: layout;\n    }\n\n    #buffered {\n      background: var(--neptune-time-range-buffered-color, rgb(255 255 255 / .4));\n      position: absolute;\n      height: 100%;\n      will-change: width;\n    }\n\n    #preview-rail,\n    #current-rail {\n      width: 100%;\n      position: absolute;\n      left: 0;\n      bottom: 100%;\n      pointer-events: none;\n      will-change: transform;\n    }\n\n    [part~="box"] {\n      width: min-content;\n      \n      position: absolute;\n      bottom: 100%;\n      flex-direction: column;\n      align-items: center;\n      transform: translateX(-50%);\n    }\n\n    [part~="current-box"] {\n      display: var(--neptune-current-box-display, var(--neptune-box-display, flex));\n      margin: var(--neptune-current-box-margin, var(--neptune-box-margin, 0 0 5px));\n      visibility: hidden;\n    }\n\n    [part~="preview-box"] {\n      display: var(--neptune-preview-box-display, var(--neptune-box-display, flex));\n      margin: var(--neptune-preview-box-margin, var(--neptune-box-margin, 0 0 5px));\n      transition-property: var(--neptune-preview-transition-property, visibility, opacity);\n      transition-duration: var(--neptune-preview-transition-duration-out, .25s);\n      transition-delay: var(--neptune-preview-transition-delay-out, 0s);\n      visibility: hidden;\n      opacity: 0;\n    }\n\n    :host(:is([${a.MEDIA_PREVIEW_IMAGE}], [${a.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {\n      transition-duration: var(--neptune-preview-transition-duration-in, .5s);\n      transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n      visibility: visible;\n      opacity: 1;\n    }\n\n    @media (hover: hover) {\n      :host(:is([${a.MEDIA_PREVIEW_IMAGE}], [${a.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {\n        transition-duration: var(--neptune-preview-transition-duration-in, .5s);\n        transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n        visibility: visible;\n        opacity: 1;\n      }\n    }\n\n    neptune-preview-thumbnail,\n    ::slotted(neptune-preview-thumbnail) {\n      visibility: hidden;\n      \n      transition: visibility 0s .25s;\n      transition-delay: calc(var(--neptune-preview-transition-delay-out, 0s) + var(--neptune-preview-transition-duration-out, .25s));\n      background: var(--neptune-preview-thumbnail-background, var(--_preview-background));\n      box-shadow: var(--neptune-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));\n      max-width: var(--neptune-preview-thumbnail-max-width, 180px);\n      max-height: var(--neptune-preview-thumbnail-max-height, 160px);\n      min-width: var(--neptune-preview-thumbnail-min-width, 120px);\n      min-height: var(--neptune-preview-thumbnail-min-height, 80px);\n      border: var(--neptune-preview-thumbnail-border);\n      border-radius: var(--neptune-preview-thumbnail-border-radius,\n        var(--neptune-preview-border-radius) var(--neptune-preview-border-radius) 0 0);\n    }\n\n    :host([${a.MEDIA_PREVIEW_IMAGE}][dragging]) neptune-preview-thumbnail,\n    :host([${a.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(neptune-preview-thumbnail) {\n      transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n      visibility: visible;\n    }\n\n    @media (hover: hover) {\n      :host([${a.MEDIA_PREVIEW_IMAGE}]:hover) neptune-preview-thumbnail,\n      :host([${a.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(neptune-preview-thumbnail) {\n        transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n        visibility: visible;\n      }\n\n      :host([${a.MEDIA_PREVIEW_TIME}]:hover) {\n        --neptune-time-range-hover-display: block;\n      }\n    }\n\n    neptune-preview-chapter-display,\n    ::slotted(neptune-preview-chapter-display) {\n      font-size: var(--neptune-font-size, 13px);\n      line-height: 17px;\n      min-width: 0;\n      visibility: hidden;\n      \n      transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;\n      transition-delay: calc(var(--neptune-preview-transition-delay-out, 0s) + var(--neptune-preview-transition-duration-out, .25s));\n      background: var(--neptune-preview-chapter-background, var(--_preview-background));\n      border-radius: var(--neptune-preview-chapter-border-radius,\n        var(--neptune-preview-border-radius) var(--neptune-preview-border-radius)\n        var(--neptune-preview-border-radius) var(--neptune-preview-border-radius));\n      padding: var(--neptune-preview-chapter-padding, 3.5px 9px);\n      margin: var(--neptune-preview-chapter-margin, 0 0 5px);\n      text-shadow: var(--neptune-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));\n    }\n\n    :host([${a.MEDIA_PREVIEW_IMAGE}]) neptune-preview-chapter-display,\n    :host([${a.MEDIA_PREVIEW_IMAGE}]) ::slotted(neptune-preview-chapter-display) {\n      transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n      border-radius: var(--neptune-preview-chapter-border-radius, 0);\n      padding: var(--neptune-preview-chapter-padding, 3.5px 9px 0);\n      margin: var(--neptune-preview-chapter-margin, 0);\n      min-width: 100%;\n    }\n\n    neptune-preview-chapter-display[${a.MEDIA_PREVIEW_CHAPTER}],\n    ::slotted(neptune-preview-chapter-display[${a.MEDIA_PREVIEW_CHAPTER}]) {\n      visibility: visible;\n    }\n\n    neptune-preview-chapter-display:not([aria-valuetext]),\n    ::slotted(neptune-preview-chapter-display:not([aria-valuetext])) {\n      display: none;\n    }\n\n    neptune-preview-time-display,\n    ::slotted(neptune-preview-time-display),\n    neptune-time-display,\n    ::slotted(neptune-time-display) {\n      font-size: var(--neptune-font-size, 13px);\n      line-height: 17px;\n      min-width: 0;\n      \n      transition: min-width 0s, border-radius 0s;\n      transition-delay: calc(var(--neptune-preview-transition-delay-out, 0s) + var(--neptune-preview-transition-duration-out, .25s));\n      background: var(--neptune-preview-time-background, var(--_preview-background));\n      border-radius: var(--neptune-preview-time-border-radius,\n        var(--neptune-preview-border-radius) var(--neptune-preview-border-radius)\n        var(--neptune-preview-border-radius) var(--neptune-preview-border-radius));\n      padding: var(--neptune-preview-time-padding, 3.5px 9px);\n      margin: var(--neptune-preview-time-margin, 0);\n      text-shadow: var(--neptune-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));\n      transform: translateX(min(\n        max(calc(50% - var(--_box-width) / 2),\n        calc(var(--_box-shift, 0))),\n        calc(var(--_box-width) / 2 - 50%)\n      ));\n    }\n\n    :host([${a.MEDIA_PREVIEW_IMAGE}]) neptune-preview-time-display,\n    :host([${a.MEDIA_PREVIEW_IMAGE}]) ::slotted(neptune-preview-time-display) {\n      transition-delay: var(--neptune-preview-transition-delay-in, .25s);\n      border-radius: var(--neptune-preview-time-border-radius,\n        0 0 var(--neptune-preview-border-radius) var(--neptune-preview-border-radius));\n      min-width: 100%;\n    }\n\n    :host([${a.MEDIA_PREVIEW_TIME}]:hover) {\n      --neptune-time-range-hover-display: block;\n    }\n\n    [part~="arrow"],\n    ::slotted([part~="arrow"]) {\n      display: var(--neptune-box-arrow-display, inline-block);\n      transform: translateX(min(\n        max(calc(50% - var(--_box-width) / 2 + var(--neptune-box-arrow-offset)),\n        calc(var(--_box-shift, 0))),\n        calc(var(--_box-width) / 2 - 50% - var(--neptune-box-arrow-offset))\n      ));\n      \n      border-color: transparent;\n      border-top-color: var(--neptune-box-arrow-background, var(--_control-background));\n      border-width: var(--neptune-box-arrow-border-width,\n        var(--neptune-box-arrow-height, 5px) var(--neptune-box-arrow-width, 6px) 0);\n      border-style: solid;\n      justify-content: center;\n      height: 0;\n    }\n  </style>\n  <div id="preview-rail">\n    <slot name="preview" part="box preview-box">\n      <neptune-preview-thumbnail></neptune-preview-thumbnail>\n      <neptune-preview-chapter-display></neptune-preview-chapter-display>\n      <neptune-preview-time-display></neptune-preview-time-display>\n      <slot name="preview-arrow"><div part="arrow"></div></slot>\n    </slot>\n  </div>\n  <div id="current-rail">\n    <slot name="current" part="box current-box">\n      \n    </slot>\n  </div>\n`;
const oo = (e, t = e.mediaCurrentTime) => {
    const i = Number.isFinite(e.mediaSeekableStart) ? e.mediaSeekableStart : 0,
        n = Number.isFinite(e.mediaDuration) ? e.mediaDuration : e.mediaSeekableEnd;
    if (Number.isNaN(n)) return 0;
    const a = (t - i) / (n - i);
    return Math.max(0, Math.min(a, 1))
},
lo = (e, t = e.range.valueAsNumber) => {
    const i = Number.isFinite(e.mediaSeekableStart) ? e.mediaSeekableStart : 0,
        n = Number.isFinite(e.mediaDuration) ? e.mediaDuration : e.mediaSeekableEnd;
    return Number.isNaN(n) ? 0 : t * (n - i) + i
};
class co extends sa {
constructor() {
    super(), no(this, Wr), no(this, Br), no(this, Fr), no(this, qr), no(this, Kr), no(this, Yr), no(this, zr), no(this, Jr), no(this, Rr, void 0), no(this, Dr, void 0), no(this, Cr, void 0), no(this, Lr, void 0), no(this, xr, void 0), no(this, Nr, void 0), no(this, Ur, void 0), no(this, Pr, void 0), no(this, Or, void 0), no(this, Hr, (e => {
        this.dragging || (b(e) && (this.range.valueAsNumber = e), this.updateBar())
    })), this.container.appendChild(ro.content.cloneNode(!0));
    this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin", '<div id="buffered" part="buffered"></div>'), ao(this, Cr, this.shadowRoot.querySelectorAll('[part~="box"]')), ao(this, xr, this.shadowRoot.querySelector('[part~="preview-box"]')), ao(this, Nr, this.shadowRoot.querySelector('[part~="current-box"]'));
    const e = getComputedStyle(this);
    ao(this, Ur, parseInt(e.getPropertyValue("--neptune-box-padding-left"))), ao(this, Pr, parseInt(e.getPropertyValue("--neptune-box-padding-right"))), ao(this, Dr, new Sr(this.range, io(this, Hr), 60))
}
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_PAUSED, a.MEDIA_DURATION, a.MEDIA_SEEKABLE, a.MEDIA_CURRENT_TIME, a.MEDIA_PREVIEW_IMAGE, a.MEDIA_PREVIEW_TIME, a.MEDIA_PREVIEW_CHAPTER, a.MEDIA_BUFFERED, a.MEDIA_PLAYBACK_RATE, a.MEDIA_LOADING, a.MEDIA_ENDED]
}
connectedCallback() {
    var e;
    super.connectedCallback(), this.range.setAttribute("aria-label", S("seek")), so(this, Wr, Vr).call(this), ao(this, Rr, this.getRootNode()), null == (e = io(this, Rr)) || e.addEventListener("transitionstart", this)
}
disconnectedCallback() {
    var e;
    super.disconnectedCallback(), so(this, Wr, Vr).call(this), null == (e = io(this, Rr)) || e.removeEventListener("transitionstart", this), ao(this, Rr, null)
}
attributeChangedCallback(e, t, i) {
    super.attributeChangedCallback(e, t, i), t != i && (e === a.MEDIA_CURRENT_TIME || e === a.MEDIA_PAUSED || e === a.MEDIA_ENDED || e === a.MEDIA_LOADING || e === a.MEDIA_DURATION || e === a.MEDIA_SEEKABLE ? (io(this, Dr).update({
        start: oo(this),
        duration: this.mediaSeekableEnd - this.mediaSeekableStart,
        playbackRate: this.mediaPlaybackRate
    }), so(this, Wr, Vr).call(this), (e => {
        const t = e.range,
            i = f(+lo(e)),
            n = f(+e.mediaSeekableEnd),
            a = i && n ? `${i} of ${n}` : "video not loaded, unknown time.";
        t.setAttribute("aria-valuetext", a)
    })(this)) : e === a.MEDIA_BUFFERED && this.updateBufferedBar(), e !== a.MEDIA_DURATION && e !== a.MEDIA_SEEKABLE || (this.mediaChaptersCues = io(this, Or), this.updateBar()))
}
get mediaChaptersCues() {
    return io(this, Or)
}
set mediaChaptersCues(e) {
    var t;
    ao(this, Or, e), this.updateSegments(null == (t = io(this, Or)) ? void 0 : t.map((e => ({
        start: oo(this, e.startTime),
        end: oo(this, e.endTime)
    }))))
}
get mediaPaused() {
    return J(this, a.MEDIA_PAUSED)
}
set mediaPaused(e) {
    ee(this, a.MEDIA_PAUSED, e)
}
get mediaLoading() {
    return J(this, a.MEDIA_LOADING)
}
set mediaLoading(e) {
    ee(this, a.MEDIA_LOADING, e)
}
get mediaDuration() {
    return z(this, a.MEDIA_DURATION)
}
set mediaDuration(e) {
    X(this, a.MEDIA_DURATION, e)
}
get mediaCurrentTime() {
    return z(this, a.MEDIA_CURRENT_TIME)
}
set mediaCurrentTime(e) {
    X(this, a.MEDIA_CURRENT_TIME, e)
}
get mediaPlaybackRate() {
    return z(this, a.MEDIA_PLAYBACK_RATE, 1)
}
set mediaPlaybackRate(e) {
    X(this, a.MEDIA_PLAYBACK_RATE, e)
}
get mediaBuffered() {
    const e = this.getAttribute(a.MEDIA_BUFFERED);
    return e ? e.split(" ").map((e => e.split(":").map((e => +e)))) : []
}
set mediaBuffered(e) {
    if (!e) return void this.removeAttribute(a.MEDIA_BUFFERED);
    const t = e.map((e => e.join(":"))).join(" ");
    this.setAttribute(a.MEDIA_BUFFERED, t)
}
get mediaSeekable() {
    const e = this.getAttribute(a.MEDIA_SEEKABLE);
    if (e) return e.split(":").map((e => +e))
}
set mediaSeekable(e) {
    null != e ? this.setAttribute(a.MEDIA_SEEKABLE, e.join(":")) : this.removeAttribute(a.MEDIA_SEEKABLE)
}
get mediaSeekableEnd() {
    var e;
    const [, t = this.mediaDuration] = null != (e = this.mediaSeekable) ? e : [];
    return t
}
get mediaSeekableStart() {
    var e;
    const [t = 0] = null != (e = this.mediaSeekable) ? e : [];
    return t
}
get mediaPreviewImage() {
    return te(this, a.MEDIA_PREVIEW_IMAGE)
}
set mediaPreviewImage(e) {
    ie(this, a.MEDIA_PREVIEW_IMAGE, e)
}
get mediaPreviewTime() {
    return z(this, a.MEDIA_PREVIEW_TIME)
}
set mediaPreviewTime(e) {
    X(this, a.MEDIA_PREVIEW_TIME, e)
}
get mediaEnded() {
    return J(this, a.MEDIA_ENDED)
}
set mediaEnded(e) {
    ee(this, a.MEDIA_ENDED, e)
}
updateBar() {
    super.updateBar(), this.updateBufferedBar(), this.updateCurrentBox()
}
updateBufferedBar() {
    var e;
    const t = this.mediaBuffered;
    if (!t.length) return;
    let i;
    if (this.mediaEnded) i = 1;
    else {
        const n = this.mediaCurrentTime,
            [, a = this.mediaSeekableStart] = null != (e = t.find((([e, t]) => e <= n && n <= t))) ? e : [];
        i = oo(this, a)
    }
    const {
        style: n
    } = Z(this.shadowRoot, "#buffered");
    n.setProperty("width", 100 * i + "%")
}
updateCurrentBox() {
    if (!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length) return;
    const e = Z(this.shadowRoot, "#current-rail"),
        t = Z(this.shadowRoot, '[part~="current-box"]'),
        i = so(this, Fr, Gr).call(this, io(this, Nr)),
        n = so(this, qr, Qr).call(this, i, this.range.valueAsNumber),
        a = so(this, Kr, jr).call(this, i, this.range.valueAsNumber);
    e.style.transform = `translateX(${n})`, e.style.setProperty("--_range-width", `${i.range.width}`), t.style.setProperty("--_box-shift", `${a}`), t.style.setProperty("--_box-width", `${i.box.width}px`), t.style.setProperty("visibility", "initial")
}
handleEvent(e) {
    switch (super.handleEvent(e), e.type) {
        case "input":
            so(this, Jr, eo).call(this);
            break;
        case "pointermove":
            so(this, Yr, Zr).call(this, e);
            break;
        case "pointerup":
        case "pointerleave":
            so(this, zr, Xr).call(this, null);
            break;
        case "transitionstart":
            Q(e.target, this) && setTimeout((() => so(this, Wr, Vr).call(this)), 0)
    }
}
}
Rr = new WeakMap, Dr = new WeakMap, Cr = new WeakMap, Lr = new WeakMap, xr = new WeakMap, Nr = new WeakMap, Ur = new WeakMap, Pr = new WeakMap, Or = new WeakMap, Wr = new WeakSet, Vr = function() {
so(this, Br, $r).call(this) ? io(this, Dr).start() : io(this, Dr).stop()
}, Br = new WeakSet, $r = function() {
return this.isConnected && !this.mediaPaused && !this.mediaLoading && !this.mediaEnded && this.mediaSeekableEnd > 0 && Y(this)
}, Hr = new WeakMap, Fr = new WeakSet, Gr = function(e) {
var t;
const i = (null != (t = this.getAttribute("bounds") ? K(this, `#${this.getAttribute("bounds")}`) : this.parentElement) ? t : this).getBoundingClientRect(),
    n = this.range.getBoundingClientRect(),
    a = e.offsetWidth;
return {
    box: {
        width: a,
        min: -(n.left - i.left - a / 2),
        max: i.right - n.left - a / 2
    },
    bounds: i,
    range: n
}
}, qr = new WeakSet, Qr = function(e, t) {
let i = 100 * t + "%";
const {
    width: n,
    min: a,
    max: s
} = e.box;
if (!n) return i;
if (!Number.isNaN(a)) {
    i = `max(${`calc(1 / var(--_range-width) * 100 * ${a}% + ${"var(--neptune-box-padding-left)"})`}, ${i})`
}
if (!Number.isNaN(s)) {
    i = `min(${i}, ${`calc(1 / var(--_range-width) * 100 * ${s}% - ${"var(--neptune-box-padding-right)"})`})`
}
return i
}, Kr = new WeakSet, jr = function(e, t) {
const {
    width: i,
    min: n,
    max: a
} = e.box, s = t * e.range.width;
if (s < n + io(this, Ur)) {
    return `${s-i/2+(e.range.left-e.bounds.left-io(this,Ur))}px`
}
if (s > a - io(this, Pr)) {
    return s + i / 2 - (e.bounds.right - e.range.right - io(this, Pr)) - e.range.width + "px"
}
return 0
}, Yr = new WeakSet, Zr = function(e) {
const t = [...io(this, Cr)].some((t => e.composedPath().includes(t)));
if (!this.dragging && (t || !e.composedPath().includes(this))) return void so(this, zr, Xr).call(this, null);
const i = this.mediaSeekableEnd;
if (!i) return;
const n = Z(this.shadowRoot, "#preview-rail"),
    a = Z(this.shadowRoot, '[part~="preview-box"]'),
    s = so(this, Fr, Gr).call(this, io(this, xr));
let r = (e.clientX - s.range.left) / s.range.width;
r = Math.max(0, Math.min(1, r));
const o = so(this, qr, Qr).call(this, s, r),
    l = so(this, Kr, jr).call(this, s, r);
n.style.transform = `translateX(${o})`, n.style.setProperty("--_range-width", `${s.range.width}`), a.style.setProperty("--_box-shift", `${l}`), a.style.setProperty("--_box-width", `${s.box.width}px`);
const d = Math.round(io(this, Lr)) - Math.round(r * i);
Math.abs(d) < 1 && r > .01 && r < .99 || (ao(this, Lr, r * i), so(this, zr, Xr).call(this, io(this, Lr)))
}, zr = new WeakSet, Xr = function(t) {
this.dispatchEvent(new P.CustomEvent(e.MEDIA_PREVIEW_REQUEST, {
    composed: !0,
    bubbles: !0,
    detail: t
}))
}, Jr = new WeakSet, eo = function() {
io(this, Dr).stop();
const t = lo(this);
this.dispatchEvent(new P.CustomEvent(e.MEDIA_SEEK_REQUEST, {
    composed: !0,
    bubbles: !0,
    detail: t
}))
}, P.customElements.get("neptune-time-range") || P.customElements.define("neptune-time-range", co);
var uo = co;
const ho = "placement",
mo = "bounds",
po = O.createElement("template");
po.innerHTML = '\n  <style>\n    :host {\n      --_tooltip-background-color: var(--neptune-tooltip-background-color, var(--neptune-secondary-color, rgba(20, 20, 30, .7)));\n      --_tooltip-background: var(--neptune-tooltip-background, var(--_tooltip-background-color));\n      --_tooltip-arrow-half-width: calc(var(--neptune-tooltip-arrow-width, 12px) / 2);\n      --_tooltip-arrow-height: var(--neptune-tooltip-arrow-height, 5px);\n      --_tooltip-arrow-background: var(--neptune-tooltip-arrow-color, var(--_tooltip-background-color));\n      position: relative;\n      pointer-events: none;\n      display: var(--neptune-tooltip-display, inline-flex);\n      justify-content: center;\n      align-items: center;\n      box-sizing: border-box;\n      z-index: var(--neptune-tooltip-z-index, 1);\n      background: var(--_tooltip-background);\n      color: var(--neptune-text-color, var(--neptune-primary-color, rgb(238 238 238)));\n      font: var(--neptune-font,\n        var(--neptune-font-weight, 400)\n        var(--neptune-font-size, 13px) /\n        var(--neptune-text-content-height, var(--neptune-control-height, 18px))\n        var(--neptune-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));\n      padding: var(--neptune-tooltip-padding, .35em .7em);\n      border: var(--neptune-tooltip-border, none);\n      border-radius: var(--neptune-tooltip-border-radius, 5px);\n      filter: var(--neptune-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));\n      white-space: var(--neptune-tooltip-white-space, nowrap);\n    }\n\n    :host([hidden]) {\n      display: none;\n    }\n\n    img, svg {\n      display: inline-block;\n    }\n\n    #arrow {\n      position: absolute;\n      width: 0px;\n      height: 0px;\n      border-style: solid;\n      display: var(--neptune-tooltip-arrow-display, block);\n    }\n\n    :host(:not([placement])),\n    :host([placement="top"]) {\n      position: absolute;\n      bottom: calc(100% + var(--neptune-tooltip-distance, 12px));\n      left: 50%;\n      transform: translate(calc(-50% - var(--neptune-tooltip-offset-x, 0px)), 0);\n    }\n    :host(:not([placement])) #arrow,\n    :host([placement="top"]) #arrow {\n      top: 100%;\n      left: 50%;\n      border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);\n      border-color: var(--_tooltip-arrow-background) transparent transparent transparent;\n      transform: translate(calc(-50% + var(--neptune-tooltip-offset-x, 0px)), 0);\n    }\n\n    :host([placement="right"]) {\n      position: absolute;\n      left: calc(100% + var(--neptune-tooltip-distance, 12px));\n      top: 50%;\n      transform: translate(0, -50%);\n    }\n    :host([placement="right"]) #arrow {\n      top: 50%;\n      right: 100%;\n      border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;\n      border-color: transparent var(--_tooltip-arrow-background) transparent transparent;\n      transform: translate(0, -50%);\n    }\n\n    :host([placement="bottom"]) {\n      position: absolute;\n      top: calc(100% + var(--neptune-tooltip-distance, 12px));\n      left: 50%;\n      transform: translate(calc(-50% - var(--neptune-tooltip-offset-x, 0px)), 0);\n    }\n    :host([placement="bottom"]) #arrow {\n      bottom: 100%;\n      left: 50%;\n      border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);\n      border-color: transparent transparent var(--_tooltip-arrow-background) transparent;\n      transform: translate(calc(-50% + var(--neptune-tooltip-offset-x, 0px)), 0);\n    }\n\n    :host([placement="left"]) {\n      position: absolute;\n      right: calc(100% + var(--neptune-tooltip-distance, 12px));\n      top: 50%;\n      transform: translate(0, -50%);\n    }\n    :host([placement="left"]) #arrow {\n      top: 50%;\n      left: 100%;\n      border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);\n      border-color: transparent transparent transparent var(--_tooltip-arrow-background);\n      transform: translate(0, -50%);\n    }\n    \n    :host([placement="none"]) #arrow {\n      display: none;\n    }\n\n  </style>\n  <slot></slot>\n  <div id="arrow"></div>\n';
class Eo extends P.HTMLElement {
constructor() {
    if (super(), this.updateXOffset = () => {
            var e;
            if (!Y(this, {
                    checkOpacity: !1,
                    checkVisibilityCSS: !1
                })) return;
            const t = this.placement;
            if ("left" === t || "right" === t) return void this.style.removeProperty("--neptune-tooltip-offset-x");
            const i = getComputedStyle(this),
                n = null != (e = K(this, "#" + this.bounds)) ? e : F(this);
            if (!n) return;
            const {
                x: a,
                width: s
            } = n.getBoundingClientRect(), {
                x: r,
                width: o
            } = this.getBoundingClientRect(), l = r + o, d = a + s, c = i.getPropertyValue("--neptune-tooltip-offset-x"), u = c ? parseFloat(c.replace("px", "")) : 0, h = i.getPropertyValue("--neptune-tooltip-container-margin"), m = h ? parseFloat(h.replace("px", "")) : 0, p = r - a + u - m, E = l - d + u + m;
            p < 0 ? this.style.setProperty("--neptune-tooltip-offset-x", `${p}px`) : E > 0 ? this.style.setProperty("--neptune-tooltip-offset-x", `${E}px`) : this.style.removeProperty("--neptune-tooltip-offset-x")
        }, this.shadowRoot || (this.attachShadow({
            mode: "open"
        }), this.shadowRoot.appendChild(po.content.cloneNode(!0))), this.arrowEl = this.shadowRoot.querySelector("#arrow"), Object.prototype.hasOwnProperty.call(this, "placement")) {
        const e = this.placement;
        delete this.placement, this.placement = e
    }
}
static get observedAttributes() {
    return [ho, mo]
}
get placement() {
    return te(this, ho)
}
set placement(e) {
    ie(this, ho, e)
}
get bounds() {
    return te(this, mo)
}
set bounds(e) {
    ie(this, mo, e)
}
}
P.customElements.get("neptune-tooltip") || P.customElements.define("neptune-tooltip", Eo);
var vo = Eo;
class bo extends sa {
static get observedAttributes() {
    return [...super.observedAttributes, a.MEDIA_VOLUME, a.MEDIA_MUTED, a.MEDIA_VOLUME_UNAVAILABLE]
}
constructor() {
    super(), this.range.addEventListener("input", (() => {
        const t = this.range.value,
            i = new P.CustomEvent(e.MEDIA_VOLUME_REQUEST, {
                composed: !0,
                bubbles: !0,
                detail: t
            });
        this.dispatchEvent(i)
    }))
}
connectedCallback() {
    super.connectedCallback(), this.range.setAttribute("aria-label", S("volume"))
}
attributeChangedCallback(e, t, i) {
    var n, s;
    super.attributeChangedCallback(e, t, i), e !== a.MEDIA_VOLUME && e !== a.MEDIA_MUTED || (this.range.valueAsNumber = (s = this).mediaMuted ? 0 : s.mediaVolume, this.range.setAttribute("aria-valuetext", (n = this.range.valueAsNumber, `${Math.round(100*n)}%`)), this.updateBar())
}
get mediaVolume() {
    return z(this, a.MEDIA_VOLUME, 1)
}
set mediaVolume(e) {
    X(this, a.MEDIA_VOLUME, e)
}
get mediaMuted() {
    return J(this, a.MEDIA_MUTED)
}
set mediaMuted(e) {
    ee(this, a.MEDIA_MUTED, e)
}
get mediaVolumeUnavailable() {
    return te(this, a.MEDIA_VOLUME_UNAVAILABLE)
}
set mediaVolumeUnavailable(e) {
    ie(this, a.MEDIA_VOLUME_UNAVAILABLE, e)
}
}
P.customElements.get("neptune-volume-range") || P.customElements.define("neptune-volume-range", bo);
var go = bo;
export {
Gi as MediaAirplayButton, zi as MediaCaptionsButton, gn as MediaCastButton, Wi as MediaChromeButton, Xn as MediaChromeDialog, oa as MediaChromeRange, qe as MediaContainer, pa as MediaControlBar, Si as MediaController, ka as MediaDurationDisplay, Na as MediaErrorDialog, Va as MediaFullscreenButton, Se as MediaGestureReceiver, Ya as MediaLiveButton, as as MediaLoadingIndicator, us as MediaMuteButton, gs as MediaPipButton, Rs as MediaPlayButton, ws as MediaPlaybackRateButton, Us as MediaPosterImage, Vs as MediaPreviewChapterDisplay, Qs as MediaPreviewThumbnail, Zs as MediaPreviewTimeDisplay, er as MediaSeekBackwardButton, sr as MediaSeekForwardButton, Ia as MediaTextDisplay, _r as MediaTimeDisplay, uo as MediaTimeRange, vo as MediaTooltip, go as MediaVolumeRange, p as constants, S as t, _ as timeUtils
};
export default null;
