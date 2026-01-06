package com.axplugin.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.axplugin.AxPluginEvents;

/**
 * Plugin Capacitor que faz a ponte entre JavaScript e o AxPlugin nativo (.aar)
 *
 * Este plugin permite que aplicativos OutSystems usem o AxPlugin nativo Android
 * para simular testes de velocidade de internet.
 */
@CapacitorPlugin(name = "AxPlugin")
public class AxPlugin extends Plugin {

    private com.axplugin.AxPlugin axPlugin;
    private boolean isConfigured = false;
    private String configuredApiKey = null;

    @Override
    public void load() {
        super.load();
        axPlugin = new com.axplugin.AxPlugin();
    }

    /**
     * Configura o plugin com a chave de API
     */
    @PluginMethod
    public void setup(PluginCall call) {
        String apiKey = call.getString("apiKey");

        if (apiKey == null || apiKey.isEmpty()) {
            call.reject("API Key é obrigatória e não pode ser vazia");
            return;
        }

        // Configura o plugin nativo com eventos básicos
        axPlugin.setup(apiKey, new AxPluginEvents() {
            @Override
            public void onSuccess(int value) {
                // Este callback será sobrescrito no método start()
            }

            @Override
            public void onFail(String value) {
                // Este callback será sobrescrito no método start()
            }
        });

        configuredApiKey = apiKey;
        isConfigured = true;

        JSObject result = new JSObject();
        result.put("message", "Plugin configurado com sucesso");
        call.resolve(result);
    }

    /**
     * Inicia o teste de velocidade
     * Os valores serão retornados continuamente via eventos
     */
    @PluginMethod
    public void start(PluginCall call) {
        if (!isConfigured) {
            call.reject("Plugin não configurado. Chame setup() primeiro.");
            return;
        }

        // Reconfigura o plugin com os callbacks atualizados para enviar eventos
        axPlugin.setup(configuredApiKey, new AxPluginEvents() {
            @Override
            public void onSuccess(int value) {
                JSObject event = new JSObject();
                event.put("value", value);
                notifyListeners("onSpeedUpdate", event);
            }

            @Override
            public void onFail(String errorMessage) {
                JSObject event = new JSObject();
                event.put("error", errorMessage);
                notifyListeners("onError", event);
            }
        });

        // Inicia o plugin nativo
        axPlugin.start();

        call.resolve();
    }

    /**
     * Para o teste de velocidade
     */
    @PluginMethod
    public void stop(PluginCall call) {
        axPlugin.stop();

        JSObject result = new JSObject();
        result.put("message", "Plugin parado com sucesso");
        call.resolve(result);
    }

    /**
     * Verifica se o plugin está disponível (sempre true no Android)
     */
    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", true);
        call.resolve(result);
    }

    /**
     * Limpa recursos quando o plugin é destruído
     */
    @Override
    protected void handleOnDestroy() {
        if (axPlugin != null) {
            axPlugin.stop();
        }
        super.handleOnDestroy();
    }
}
