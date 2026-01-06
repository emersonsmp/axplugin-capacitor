export interface AxPluginPlugin {
  /**
   * Configura o plugin com a chave de API
   *
   * @param options - Objeto contendo a apiKey
   * @returns Promise que resolve quando a configuração for bem-sucedida
   */
  setup(options: { apiKey: string }): Promise<{ message: string }>;

  /**
   * Inicia o teste de velocidade
   * Os valores de velocidade serão retornados via callback de listener
   * Use addListener('onSpeedUpdate', ...) para receber os valores
   *
   * @returns Promise que resolve quando o teste for iniciado
   */
  start(): Promise<void>;

  /**
   * Para o teste de velocidade
   *
   * @returns Promise que resolve quando o teste for parado
   */
  stop(): Promise<{ message: string }>;

  /**
   * Verifica se o plugin está disponível (apenas Android)
   *
   * @returns Promise que resolve com um booleano indicando disponibilidade
   */
  isAvailable(): Promise<{ available: boolean }>;

  /**
   * Adiciona um listener para eventos de atualização de velocidade
   *
   * @param eventName - Nome do evento ('onSpeedUpdate' ou 'onError')
   * @param listenerFunc - Função callback que receberá os eventos
   * @returns Promise com o handle do listener para remoção posterior
   */
  addListener(
    eventName: 'onSpeedUpdate',
    listenerFunc: (data: { value: number }) => void,
  ): Promise<PluginListenerHandle>;

  addListener(
    eventName: 'onError',
    listenerFunc: (data: { error: string }) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Remove todos os listeners
   */
  removeAllListeners(): Promise<void>;
}

/**
 * Interface para o handle do listener
 */
export interface PluginListenerHandle {
  remove: () => Promise<void>;
}
