export interface AxPluginPlugin {
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
    addListener(eventName: 'onSpeedUpdate', listenerFunc: (data: {
        value: number;
    }) => void): Promise<PluginListenerHandle>;
    addListener(eventName: 'onError', listenerFunc: (data: {
        error: string;
    }) => void): Promise<PluginListenerHandle>;
    removeAllListeners(): Promise<void>;
}
export interface PluginListenerHandle {
    remove: () => Promise<void>;
}
//# sourceMappingURL=definitions.d.ts.map