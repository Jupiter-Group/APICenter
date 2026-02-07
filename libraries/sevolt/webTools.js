// LinkDriver WebTools Library 2026 Redistributable - 10.11.21328

// Copyright (c) 2026 LinkDriver Group
// Use of this source code is governed by an open license
// that can be found in the LICENSE file.

const WebTools = {
    functionName: function () {
        // code
    },

    getCurrentTime: function () {
        const now = new Date();
        return now.toLocaleTimeString();
    },

    getCurrentDate: function () {
        const now = new Date();
        return now.toLocaleDateString();
    },

    toClipboard: function (text) {
        if (!navigator.clipboard) {
            this.giveError('Clipboard API not supported.');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                this.giveMessage("Text copied to the clipboard.");
            })
            .catch(err => {
                this.giveError("Failed to copy text: ", err);
            });
    },

    onButtonClick: function(buttonId, callback) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', callback);
        } else {
            this.giveError(`Button with id "${buttonId}" not found.`);
        }
    },

    fileToBase64: function (fileUrl, callback) {
        this.giveError('fileToBase64: This function is highly broken and may be removed in future releases.');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (xhr.status === 200) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                };
                reader.readAsDataURL(xhr.response);
            } else {
                this.giveError("Failed to load file: ", xhr.statusText);
                callback(null);
            }
        };
        xhr.onerror = function () {
            this.giveError("XHR Error: ", xhr.statusText);
            callback(null);
        };
        xhr.send();
    },

    getRandomNumber: function (min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') {
            this.giveError("getRandomNumber: Both 'min' and 'max' parameters must be numbers.");
            return;
        }

        if (min > max) {
            this.giveError("getRandomNumber: The 'min' parameter must be less than or equal to the 'max' parameter.");
            return;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    hexToRgb: function (hex) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            this.giveError("hexToRgb: Invalid HEX color format.");
            return;
        }

        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(char => char + char).join('');
        }

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        return `rgb(${r}, ${g}, ${b})`;
    },

    hexToRgba: function (hex, alpha = 1.0) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            this.giveError("hexToRgba: Invalid HEX color format.");
            return;
        }

        if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
            this.giveError("hexToRgba: Alpha must be a number between 0 and 1.");
            return;
        }

        const rgb = this.hexToRgb(hex).replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        return rgb;
    },

    hexToHsl: function (hex) {
        if (typeof hex !== 'string' || !/^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(hex)) {
            this.giveError("hexToHsl: Invalid HEX color format.");
            return;
        }

        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(char => char + char).join('');
        }

        const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
        const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
        const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    },

    printMe: function (text) {
        if (typeof text !== 'string' || text < 0) {
            this.giveError("printMe: This function requireds text.");
            return;
        }

        return text;
    },

    getRandCard: function () {
        const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
        const values = [
            "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "Jack", "Queen", "King"
        ];

        let deck = [];

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                let card = { Value: values[x], Suit: suits[i] };
                deck.push(card);
            }
        }

        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

        let drawnCards = [];
        for (let i = 0; i < 5; i++) {
            drawnCards.push(`${deck[i].Value} of ${deck[i].Suit}`);
        }

        return `The first five cards are: ${drawnCards.join(', ')}`;
    },

    asciiChar: function (char) {
        const result = char.charCodeAt(0);

        return `The ASCII value is ${result}`
    },

    isPalendrome: function (string) {
        const len = string.length;

        for (let i = 0; i < len / 2; i++) {

            if (string[i] !== string[len - 1 - i]) {
                return 'It is not a palindrome';
            }
        }
        return 'It is a palindrome';
    },

    reverse: function (string) {
        let newString = "";
        for (let i = string.length - 1; i >= 0; i--) {
            newString += string[i];
        }
        return newString;
    },

    convertSecondsToTime: function (seconds) {
        if (typeof seconds !== 'number' || seconds < 0) {
            this.giveError("convertSecondsToTime: The 'seconds' parameter must be a non-negative number.");
            return;
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    decToBin: function (x) {
        let bin = 0;
        let rem, i = 1, step = 1;
        while (x != 0) {
            rem = x % 2;
            x = parseInt(x / 2);
            bin = bin + rem * i;
            i = i * 10;
        }

        return `${bin}`;
    },

    makeBase64: function (string) {
        const b64 = string; 

        const result = window.btoa(b64);
        return result;
    },

    currentUrl: function () {
        const url1 = window.location.href;

        return url1
    },

    validateEmail: function (email) {
        const regex_pattern =      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (regex_pattern.test(email)) {
            return 'The email address is valid';
        }
        else {
            return 'The email address is not valid';
        }
    },

    giveMessage: function (message) {
        console.log(message);
    },

    giveInfo: function (message) {
        console.info(message);
    },

    giveWarn: function (message) {
        console.warn(message);
    },

    giveError: function (message) {
        console.error(message);
    },

    giveAssert: function (condition, message) {
        console.assert(condition, message);
    },    

    // imageSize: function (src) {
    //     console.error('imageSize: This function is highly broken and may be removed in future releases.');
    //     const img = new Image();
    // 
    //     img.src = src;
    // 
    //     img.onload = function() {
    //         width = this.width;
    //         height = this.height;
    //         return `${width}px x ${height}px`;
    //     }
    // },

    convertRelsToTime: function (rels) {
        this.giveWarn("convertRelsToTime: This function is meant to be a joke and may be removed in the future.");
        if (typeof rels !== 'number' || rels < 0) {
            this.giveError("convertRelsToTime: The 'rels' parameter must be a non-negative number.");
            return;
        }
    
        const totalSeconds = rels * 1.2;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    sendto: function (url, delay) {
        if (typeof url !== 'string' || typeof delay !== 'number' || delay < 0) {
            this.giveError("sendto: 'url' must be a string and 'delay' must be a non-negative number.");
            return;
        }
        setTimeout(() => {
            window.location.href = url;
        }, delay);
    },

    convertDistance: function (value, fromUnit, toUnit) {
        const conversionRates = {
            km: { mile: 0.621371, meter: 1000, yard: 1093.61 },
            mile: { km: 1.60934, meter: 1609.34, yard: 1760 },
            meter: { km: 0.001, mile: 0.000621371, yard: 1.09361 },
            yard: { km: 0.0009144, mile: 0.000568182, meter: 0.9144 }
        };

        if (fromUnit === toUnit) return value;

        return value * (conversionRates[fromUnit] ? conversionRates[fromUnit][toUnit] : 1);
    },

    convertLength: function (value, fromUnit, toUnit) {
        const conversionRates = {
            cm: { inch: 0.393701, foot: 0.0328084 },
            inch: { cm: 2.54, foot: 0.0833333 },
            foot: { cm: 30.48, inch: 12 }
        };

        if (fromUnit === toUnit) return value;

        return value * (conversionRates[fromUnit] ? conversionRates[fromUnit][toUnit] : 1);
    },

    convertTemperature: function (value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        if (fromUnit === "C" && toUnit === "F") {
            return (value * 9/5) + 32;
        } else if (fromUnit === "F" && toUnit === "C") {
            return (value - 32) * 5/9;
        } else if (fromUnit === "C" && toUnit === "K") {
            return value + 273.15;
        } else if (fromUnit === "K" && toUnit === "C") {
            return value - 273.15;
        } else if (fromUnit === "F" && toUnit === "K") {
            return (value - 32) * 5/9 + 273.15;
        } else if (fromUnit === "K" && toUnit === "F") {
            return (value - 273.15) * 9/5 + 32;
        }

        return value;
    },
    
    encrypt: function (str) {
        if (typeof str !== 'string' || !str.length) {
            this.giveError("encrypt: Invalid input string.");
            return;
        }
        let encryptedStr = btoa(unescape(encodeURIComponent(str)));
        return encryptedStr;
    },

    decrypt: function (str) {
        if (typeof str !== 'string' || !str.length) {
            this.giveError("decrypt: Invalid input string.");
            return;
        }
        let decryptedStr = decodeURIComponent(escape(atob(str)));
        return decryptedStr;
    },
};

export default WebTools;
