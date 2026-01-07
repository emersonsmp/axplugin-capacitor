var capacitorAxPlugin = (function (exports, core) {
    'use strict';

    const AxPlugin = core.registerPlugin('AxPlugin', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.AxPluginWeb()),
    });

    class AxPluginWeb extends core.WebPlugin {
        async setup(options) {
            console.log('AxPlugin setup called on web with apiKey:', options.apiKey);
            throw this.unavailable('AxPlugin is only available on Android');
        }
        async start() {
            console.log('AxPlugin start called on web');
            throw this.unavailable('AxPlugin is only available on Android');
        }
        async stop() {
            console.log('AxPlugin stop called on web');
            throw this.unavailable('AxPlugin is only available on Android');
        }
        async isAvailable() {
            return { available: false };
        }
        async addListener(eventName, listenerFunc) {
            console.log('AxPlugin addListener called on web for event:', eventName);
            return {
                remove: async () => {
                    console.log('AxPlugin listener removed on web');
                },
            };
        }
        async removeAllListeners() {
            console.log('AxPlugin removeAllListeners called on web');
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AxPluginWeb: AxPluginWeb
    });

    exports.AxPlugin = AxPlugin;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
