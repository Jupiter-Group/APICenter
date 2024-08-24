// Copyright 2024 The API Authors
// Use of this source code is governed by a completely open license
// that can be found in the LICENSE file.

import UtilityLibrary from './sevolt.api.js';

export function checkVersion(currentVersion) {
    const requiredVersion = "1.9.3";

    function compareVersions(v1, v2) {
        const v1parts = v1.split('.').map(Number);
        const v2parts = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
            const v1part = v1parts[i] || 0;
            const v2part = v2parts[i] || 0;

            if (v1part > v2part) return 1;
            if (v1part < v2part) return -1;
        }

        return 0;
    }

    const comparison = compareVersions(currentVersion, requiredVersion);

    if (comparison === -1) {
        UtilityLibrary.giveWarn(`Error: Your version (${currentVersion}) is lower than the required version (${requiredVersion}). Please update the utility library.`);
    } else {
        UtilityLibrary.giveMessage(`Version check passed. Current version: ${currentVersion}`);
    }
}
