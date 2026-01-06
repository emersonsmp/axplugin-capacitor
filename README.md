# @capacitor/axplugin

Plugin Capacitor para simular testes de velocidade de internet usando AxPlugin nativo.

## Instalação

### Instalação via NPM (após publicação)

```bash
npm install @capacitor/axplugin
npx cap sync android
```

### Instalação Local (desenvolvimento)

Para testar localmente antes de publicar:

```bash
# No diretório do plugin
cd /caminho/para/plugin-capacitor
npm install
npm run build

# No seu projeto Capacitor
npm install /caminho/completo/para/plugin-capacitor
npx cap sync android
```

## Configuração

### Android

O plugin está configurado automaticamente para Android. Certifique-se de que seu projeto Capacitor tem a plataforma Android configurada:

```bash
npx cap add android
```

**Importante:** O plugin inclui a biblioteca nativa `axplugin-release.aar` localizada em `android/src/main/libs/`. Esta biblioteca é necessária para o funcionamento do plugin.

### Requisitos

- **Capacitor:** 6.0.0 ou superior
- **Android:** API 22+ (Android 5.1+)
- **Java:** 17
- **Gradle:** 8.0+

## API

### setup(options)

Configura o plugin com a chave de API.

```typescript
import { AxPlugin } from '@capacitor/axplugin';

await AxPlugin.setup({ apiKey: 'sua-chave-api' });
```

**Parâmetros:**
- `apiKey` (string): Chave de autenticação do plugin

**Retorna:** Promise<{ message: string }>

---

### start()

Inicia o teste de velocidade. Os valores serão retornados via eventos.

```typescript
import { AxPlugin } from '@capacitor/axplugin';

// Adiciona listeners para os eventos
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log('Velocidade:', data.value, 'Mbps');
});

await AxPlugin.addListener('onError', (data) => {
  console.error('Erro:', data.error);
});

// Inicia o teste
await AxPlugin.start();
```

**Retorna:** Promise<void>

---

### stop()

Para o teste de velocidade.

```typescript
import { AxPlugin } from '@capacitor/axplugin';

await AxPlugin.stop();
```

**Retorna:** Promise<{ message: string }>

---

### isAvailable()

Verifica se o plugin está disponível na plataforma atual.

```typescript
import { AxPlugin } from '@capacitor/axplugin';

const { available } = await AxPlugin.isAvailable();
console.log('Plugin disponível:', available);
```

**Retorna:** Promise<{ available: boolean }>

---

### addListener(eventName, listenerFunc)

Adiciona um listener para eventos do plugin.

**Eventos disponíveis:**
- `onSpeedUpdate`: Disparado quando há uma atualização de velocidade
  - Dados: `{ value: number }` (velocidade em Mbps)
- `onError`: Disparado quando ocorre um erro
  - Dados: `{ error: string }` (mensagem de erro)

```typescript
import { AxPlugin } from '@capacitor/axplugin';

const speedListener = await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log('Velocidade:', data.value);
});

// Para remover o listener
await speedListener.remove();
```

---

### removeAllListeners()

Remove todos os listeners registrados.

```typescript
import { AxPlugin } from '@capacitor/axplugin';

await AxPlugin.removeAllListeners();
```

---

## Exemplo Completo

```typescript
import { AxPlugin } from '@capacitor/axplugin';

// 1. Verificar disponibilidade
const { available } = await AxPlugin.isAvailable();
if (!available) {
  console.error('Plugin não disponível nesta plataforma');
  return;
}

// 2. Configurar o plugin
await AxPlugin.setup({ apiKey: 'sua-chave-api' });

// 3. Adicionar listeners
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log('Velocidade atual:', data.value, 'Mbps');
});

await AxPlugin.addListener('onError', (data) => {
  console.error('Erro no teste:', data.error);
});

// 4. Iniciar o teste
await AxPlugin.start();

// 5. Parar o teste após 30 segundos
setTimeout(async () => {
  await AxPlugin.stop();
  await AxPlugin.removeAllListeners();
}, 30000);
```

## Uso no OutSystems

Para usar este plugin em um aplicativo OutSystems com Capacitor:

1. Instale o plugin no seu projeto
2. Configure a extensibilidade para Capacitor (não Cordova)
3. Use a ação JavaScript para chamar os métodos do plugin

### Exemplo de Ação JavaScript no OutSystems

#### Action: Setup
```javascript
// Importar o plugin
const { AxPlugin } = require('@capacitor/axplugin');

// Configurar
const result = await AxPlugin.setup({
  apiKey: $parameters.ApiKey
});

$parameters.Success = true;
$parameters.Message = result.message;
```

#### Action: Start Test
```javascript
// Importar o plugin
const { AxPlugin } = require('@capacitor/axplugin');

// Registrar listeners
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  $actions.OnSpeedUpdate(data.value);
});

await AxPlugin.addListener('onError', (data) => {
  $actions.OnError(data.error);
});

// Iniciar teste
await AxPlugin.start();

$parameters.Success = true;
```

#### Action: Stop Test
```javascript
// Importar o plugin
const { AxPlugin } = require('@capacitor/axplugin');

// Parar e limpar listeners
await AxPlugin.stop();
await AxPlugin.removeAllListeners();

$parameters.Success = true;
```

## Suporte

- **Plataformas suportadas:** Android
- **Versão mínima do Android:** API 22 (Android 5.1)
- **Versão do Capacitor:** 6.0.0+

## Licença

MIT

## Autor

Emerson Sampaio

## Migração do Cordova

Este plugin é a versão Capacitor do `cordova-plugin-axplugin`. As principais diferenças:

### Cordova (antigo)
```javascript
cordova.plugins.AxPlugin.setup("chave", success, error);
cordova.plugins.AxPlugin.start(onUpdate, onError);
cordova.plugins.AxPlugin.stop(success, error);
```

### Capacitor (novo)
```typescript
await AxPlugin.setup({ apiKey: "chave" });
await AxPlugin.addListener('onSpeedUpdate', onUpdate);
await AxPlugin.addListener('onError', onError);
await AxPlugin.start();
await AxPlugin.stop();
```

As principais mudanças:
1. ✅ Usa Promises ao invés de callbacks
2. ✅ Eventos são registrados com `addListener` ao invés de passar como parâmetro
3. ✅ API TypeScript tipada
4. ✅ Suporte melhor para Universal Extensibility do OutSystems
