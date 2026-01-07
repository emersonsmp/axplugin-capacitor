import { WebPlugin } from '@capacitor/core';
import type { AxPluginPlugin, PluginListenerHandle } from './definitions';
export declare class AxPluginWeb extends WebPlugin implements AxPluginPlugin {
    setup(options: {
        apiKey: string;
    }): Promise<{
        message: string;
    }>;
    start(): Promise<void>;
    stop(): Promise<{
        message: string;
    }>;
    isAvailable(): Promise<{
        available: boolean;
    }>;
    addListener(eventName: 'onSpeedUpdate' | 'onError', listenerFunc: (data: any) => void): Promise<PluginListenerHandle>;
    removeAllListeners(): Promise<void>;
}
//# sourceMappingURL=web.d.ts.map