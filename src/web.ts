import { WebPlugin } from '@capacitor/core';

import type { AxPluginPlugin, PluginListenerHandle } from './definitions';

export class AxPluginWeb extends WebPlugin implements AxPluginPlugin {
  async setup(options: { apiKey: string }): Promise<{ message: string }> {
    console.log('AxPlugin setup called on web with apiKey:', options.apiKey);
    throw this.unavailable('AxPlugin is only available on Android');
  }

  async start(): Promise<void> {
    console.log('AxPlugin start called on web');
    throw this.unavailable('AxPlugin is only available on Android');
  }

  async stop(): Promise<{ message: string }> {
    console.log('AxPlugin stop called on web');
    throw this.unavailable('AxPlugin is only available on Android');
  }

  async isAvailable(): Promise<{ available: boolean }> {
    return { available: false };
  }

  async addListener(
    eventName: 'onSpeedUpdate' | 'onError',
    listenerFunc: (data: any) => void,
  ): Promise<PluginListenerHandle> {
    console.log('AxPlugin addListener called on web for event:', eventName);
    // Retorna um handle vazio já que não há listeners na web
    return {
      remove: async () => {
        console.log('AxPlugin listener removed on web');
      },
    };
  }

  async removeAllListeners(): Promise<void> {
    console.log('AxPlugin removeAllListeners called on web');
    // Não faz nada na web
  }
}
