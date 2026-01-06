import { registerPlugin } from '@capacitor/core';

import type { AxPluginPlugin } from './definitions';

const AxPlugin = registerPlugin<AxPluginPlugin>('AxPlugin', {
  web: () => import('./web').then(m => new m.AxPluginWeb()),
});

export * from './definitions';
export { AxPlugin };
