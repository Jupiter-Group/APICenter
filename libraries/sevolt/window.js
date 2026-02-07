/**
 * LD_Popup.js
 * A tiny helper library for opening and managing browser popups.
 *
 * Usage:
 *   LD_Popup.open('https://example.com', {
 *     width: 600,
 *     height: 500,
 *     name: 'exampleLD_Popup'
 *   });
 */

const LD_Popup = (() => {
    const DEFAULTS = {
        width: 600,
        height: 500,
        left: null,
        top: null,
        name: '_blank',
        focus: true,
        resizable: true,
        scrollbars: true,
        toolbar: false,
        menubar: false,
        location: false,
        status: false,
        noopener: true,
        noreferrer: true,
        onBlocked: null,
        onOpen: null
    };

    function getCenterPosition(width, height) {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;

        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;

        const left = dualScreenLeft + (screenWidth - width) / 2;
        const top = dualScreenTop + (screenHeight - height) / 2;

        return { left: Math.max(0, left), top: Math.max(0, top) };
    }

    function buildFeatures(options) {
        const features = [];

        for (const [key, value] of Object.entries(options)) {
            if (typeof value === 'boolean') {
                features.push(`${key}=${value ? 'yes' : 'no'}`);
            } else if (value !== null && value !== undefined) {
                features.push(`${key}=${value}`);
            }
        }

        return features.join(',');
    }

    function open(url, opts = {}) {
        const options = { ...DEFAULTS, ...opts };

        if (options.left === null || options.top === null) {
            const center = getCenterPosition(options.width, options.height);
            options.left ??= center.left;
            options.top ??= center.top;
        }

        const featureOptions = {
            width: options.width,
            height: options.height,
            left: options.left,
            top: options.top,
            resizable: options.resizable,
            scrollbars: options.scrollbars,
            toolbar: options.toolbar,
            menubar: options.menubar,
            location: options.location,
            status: options.status
        };

        if (options.noopener) featureOptions.noopener = true;
        if (options.noreferrer) featureOptions.noreferrer = true;

        const features = buildFeatures(featureOptions);

        const popup = window.open(url, options.name, features);

        if (!popup) {
            if (typeof options.onBlocked === 'function') {
                options.onBlocked();
            }
            return null;
        }

        if (options.focus) {
            popup.focus();
        }

        if (typeof options.onOpen === 'function') {
            options.onOpen(popup);
        }

        return popup;
    }

    return {
        open
    };
})();

// Optional global export
window.LD_Popup = LD_Popup;
