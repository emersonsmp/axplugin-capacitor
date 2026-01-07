import { registerPlugin } from '@capacitor/core';
const AxPlugin = registerPlugin('AxPlugin', {
    web: () => import('./web').then(m => new m.AxPluginWeb()),
});
export * from './definitions';
export { AxPlugin };
