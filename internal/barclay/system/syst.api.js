// system.api.js
const SystemAPI = (function() {

    function getLanguage() {
        return navigator.language || navigator.userLanguage;
    }

    function getOSName() {
        let osName = "Unknown OS";
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();

        if (platform.includes('win')) {
            osName = 'Windows';
        } else if (platform.includes('mac')) {
            osName = 'MacOS';
        } else if (platform.includes('linux')) {
            osName = 'Linux';
        } else if (/android/.test(userAgent)) {
            osName = 'Android';
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            osName = 'iOS';
        }
        return osName;
    }

    function getBrowserName() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('chrome')) return 'Chrome';
        if (userAgent.includes('firefox')) return 'Firefox';
        if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
        if (userAgent.includes('edge')) return 'Edge';
        if (userAgent.includes('trident') || userAgent.includes('msie')) return 'Internet Explorer';
        return 'Unknown Browser';
    }

    function getBrowserVersion() {
        const userAgent = navigator.userAgent.toLowerCase();
        let version = 'Unknown Version';

        const match = userAgent.match(/(chrome|firefox|safari|edge|trident|msie|opr|opera)[\/\s]?([\d.]+)/);
        if (match && match.length > 2) {
            version = match[2];
        }

        return version;
    }

    function getPlatform() {
        return navigator.platform;
    }

    function getDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
            return 'Mobile';
        } else if (/tablet/.test(userAgent)) {
            return 'Tablet';
        } else {
            return 'Desktop';
        }
    }

    function getScreenResolution() {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    }

    function getColorDepth() {
        return window.screen.colorDepth;
    }

    function getTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    function getMemory() {
        return navigator.deviceMemory || 'Unknown';
    }

    function getCores() {
        return navigator.hardwareConcurrency || 'Unknown';
    }

    function getOnlineStatus() {
        return navigator.onLine ? 'Online' : 'Offline';
    }

    function getDoNotTrack() {
        return navigator.doNotTrack || navigator.msDoNotTrack || 'Unknown';
    }

    function getCookiesEnabled() {
        return navigator.cookieEnabled;
    }

    function getIP(callback) {
        const pc = new (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/g;

        let ipAddress = null;

        pc.createDataChannel('');
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .catch(err => this.giveError("Error creating offer: ", err));

        pc.onicecandidate = function(event) {
            if (event.candidate && event.candidate.candidate) {
                const ip = event.candidate.candidate.match(ipRegex);
                if (ip) {
                    ipAddress = ip[0];
                    pc.close();
                    if (callback) {
                        callback(ipAddress);
                    }
                }
            }
        };

        setTimeout(() => {
            if (!ipAddress && callback) {
                callback(null);
            }
        }, 1000);

        return ipAddress;
    }

    function getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                callback({ latitude, longitude });
            }, () => {
                callback({ error: 'Location access denied' });
            });
        } else {
            callback({ error: 'Geolocation is not supported' });
        }
    }

    function getBatteryInfo(callback) {
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                callback({
                    charging: battery.charging,
                    level: battery.level * 100,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                });
            });
        } else {
            callback({ error: 'Battery status not supported' });
        }
    }

    function getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            return {
                downlink: connection.downlink,
                effectiveType: connection.effectiveType,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return { error: 'Network information not supported' };
    }

    return {
        getLanguage,
        getOSName,
        getBrowserName,
        getBrowserVersion,
        getPlatform,
        getDeviceType,
        getScreenResolution,
        getColorDepth,
        getTimezone,
        getMemory,
        getCores,
        getOnlineStatus,
        getDoNotTrack,
        getCookiesEnabled,
        getLocation,
        getBatteryInfo,
        getNetworkInfo,
        getIP
    };

})();

export default SystemAPI;
