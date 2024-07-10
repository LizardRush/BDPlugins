/**
 * @name AutoFullscreen
 * @version 1.0.0
 * @description Automatically makes Discord fullscreen on startup.
 * @author YourName
 */

module.exports = (() => {
    const config = {
        info: {
            name: "AutoFullscreen",
            authors: [
                {
                    name: "YourName",
                    discord_id: "",
                    github_username: ""
                }
            ],
            version: "1.0.0",
            description: "Automatically makes Discord fullscreen on startup.",
            github: "",
            github_raw: "https://raw.githubusercontent.com/LizardRush/BDPlugins/main/plugins/AutoFullscreen.plugin.js"
        },
        changelog: [
            {
                title: "Initial Release",
                type: "added",
                items: ["Initial release of AutoFullscreen."]
            }
        ]
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return BdApi.showConfirmationModal("Error Downloading", ["Library plugin download failed. Manually install plugin library from the link below.", BdApi.React.createElement("a", { href: "https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js", target: "_blank" }, "Plugin Library")]);
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            return class AutoFullscreen extends Plugin {
                onStart() {
                    this.makeFullscreen();
                }

                onStop() {
                    // No cleanup needed
                }

                makeFullscreen() {
                    try {
                        const electron = require('electron');
                        const remote = electron.remote;
                        const currentWindow = remote.getCurrentWindow();
                        currentWindow.maximize();
                    } catch (error) {
                        console.error("Failed to maximize Discord window:", error);
                    }
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
