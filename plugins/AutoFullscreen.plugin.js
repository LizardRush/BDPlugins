/**
 * @name AutoFullscreen
 * @version 1.0.0
 * @description Automatically makes Discord fullscreen on startup.
 * @author Lizard Rush
 */

module.exports = class AutoFullscreen {
    getName() { return "AutoFullscreen"; }
    getDescription() { return "Automatically makes Discord fullscreen on startup."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "LRush"; }

    start() {
        // Wait for Discord to fully load
        setTimeout(() => {
            const electron = require('electron');
            const remote = electron.remote;
            remote.getCurrentWindow().maximize();
        }, 5000);
    }
    stop() {}
};
