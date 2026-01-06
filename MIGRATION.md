# Guia de Migração: Cordova → Capacitor

Este documento descreve como migrar do plugin Cordova (`cordova-plugin-axplugin`) para o plugin Capacitor (`@capacitor/axplugin`).

## Mudanças na API

### 1. Setup

**Cordova:**
```javascript
cordova.plugins.AxPlugin.setup("minha-chave-api",
  function(result) {
    console.log("Sucesso:", result);
  },
  function(error) {
    console.error("Erro:", error);
  }
);
```

**Capacitor:**
```typescript
try {
  const result = await AxPlugin.setup({ apiKey: "minha-chave-api" });
  console.log("Sucesso:", result.message);
} catch (error) {
  console.error("Erro:", error);
}
```

### 2. Start

**Cordova:**
```javascript
cordova.plugins.AxPlugin.start(
  function(velocidade) {
    console.log("Velocidade:", velocidade, "Mbps");
  },
  function(error) {
    console.error("Erro:", error);
  }
);
```

**Capacitor:**
```typescript
// Registrar listeners primeiro
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log("Velocidade:", data.value, "Mbps");
});

await AxPlugin.addListener('onError', (data) => {
  console.error("Erro:", data.error);
});

// Depois iniciar
await AxPlugin.start();
```

### 3. Stop

**Cordova:**
```javascript
cordova.plugins.AxPlugin.stop(
  function(result) {
    console.log("Parado:", result);
  },
  function(error) {
    console.error("Erro:", error);
  }
);
```

**Capacitor:**
```typescript
try {
  const result = await AxPlugin.stop();
  console.log("Parado:", result.message);
} catch (error) {
  console.error("Erro:", error);
}
```

### 4. IsAvailable

**Cordova:**
```javascript
cordova.plugins.AxPlugin.isAvailable(
  function(available) {
    console.log("Disponível:", available);
  },
  function(error) {
    console.error("Erro:", error);
  }
);
```

**Capacitor:**
```typescript
const { available } = await AxPlugin.isAvailable();
console.log("Disponível:", available);
```

## Exemplo Completo de Migração

### Antes (Cordova)

```javascript
document.addEventListener('deviceready', function() {
  // Setup
  cordova.plugins.AxPlugin.setup("api-key",
    function() {
      console.log("Configurado");

      // Start
      cordova.plugins.AxPlugin.start(
        function(speed) {
          updateUI(speed);
        },
        function(error) {
          showError(error);
        }
      );
    },
    function(error) {
      console.error("Erro no setup:", error);
    }
  );

  // Stop após 30 segundos
  setTimeout(function() {
    cordova.plugins.AxPlugin.stop(
      function() {
        console.log("Teste finalizado");
      },
      function(error) {
        console.error("Erro ao parar:", error);
      }
    );
  }, 30000);
});
```

### Depois (Capacitor)

```typescript
import { AxPlugin } from '@capacitor/axplugin';

async function runTest() {
  try {
    // Setup
    await AxPlugin.setup({ apiKey: "api-key" });
    console.log("Configurado");

    // Registrar listeners
    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      updateUI(data.value);
    });

    await AxPlugin.addListener('onError', (data) => {
      showError(data.error);
    });

    // Start
    await AxPlugin.start();

    // Stop após 30 segundos
    setTimeout(async () => {
      await AxPlugin.stop();
      await AxPlugin.removeAllListeners();
      console.log("Teste finalizado");
    }, 30000);

  } catch (error) {
    console.error("Erro:", error);
  }
}

runTest();
```

## Migração no OutSystems

### 1. Atualizar a Extensibilidade

1. Abra o módulo no Service Studio
2. Vá em **Module** → **Manage Dependencies**
3. Remova a referência ao plugin Cordova
4. Configure para usar **Universal Extensibility** (Capacitor)

### 2. Atualizar Actions JavaScript

**Antes (Cordova):**
```javascript
// Action: AxPlugin_Setup
$parameters.Result = new Promise((resolve, reject) => {
  cordova.plugins.AxPlugin.setup(
    $parameters.ApiKey,
    resolve,
    reject
  );
});
```

**Depois (Capacitor):**
```javascript
// Action: AxPlugin_Setup
const { AxPlugin } = require('@capacitor/axplugin');
$parameters.Result = await AxPlugin.setup({
  apiKey: $parameters.ApiKey
});
```

### 3. Atualizar Event Handlers

**Antes (Cordova):**
```javascript
// Action: AxPlugin_Start
cordova.plugins.AxPlugin.start(
  function(speed) {
    $actions.OnSpeedUpdate(speed);
  },
  function(error) {
    $actions.OnError(error);
  }
);
```

**Depois (Capacitor):**
```javascript
// Action: AxPlugin_Start
const { AxPlugin } = require('@capacitor/axplugin');

await AxPlugin.addListener('onSpeedUpdate', (data) => {
  $actions.OnSpeedUpdate(data.value);
});

await AxPlugin.addListener('onError', (data) => {
  $actions.OnError(data.error);
});

await AxPlugin.start();
```

## Principais Diferenças

| Aspecto | Cordova | Capacitor |
|---------|---------|-----------|
| **Callbacks** | Success/Error callbacks | Promises com async/await |
| **Eventos** | Passados como parâmetros | Registrados com addListener |
| **Import** | cordova.plugins.AxPlugin | import { AxPlugin } |
| **Tipagem** | JavaScript puro | TypeScript com tipos |
| **Namespace** | cordova.plugins | @capacitor |
| **Parâmetros** | Strings e valores diretos | Objetos { key: value } |

## Checklist de Migração

- [ ] Instalar `@capacitor/axplugin`
- [ ] Remover `cordova-plugin-axplugin`
- [ ] Atualizar imports nos arquivos JavaScript/TypeScript
- [ ] Converter callbacks para Promises/async-await
- [ ] Atualizar event handlers para usar addListener
- [ ] Testar no OutSystems com Universal Extensibility habilitado
- [ ] Validar que todos os métodos funcionam corretamente
- [ ] Atualizar documentação do projeto

## Troubleshooting

### Erro: "Plugin não encontrado"
- Verifique que executou `npx cap sync`
- Confirme que o plugin está listado em `package.json`
- Reconstrua o projeto Android

### Erro: "AxPlugin is not defined"
- Certifique-se de importar: `import { AxPlugin } from '@capacitor/axplugin'`
- No OutSystems, use `require('@capacitor/axplugin')`

### Erro de compilação Android
- Verifique que a biblioteca .aar está em `android/src/main/libs/`
- Confirme que o build.gradle está configurado corretamente
- Limpe e reconstrua: `cd android && ./gradlew clean build`

## Suporte

Para problemas ou dúvidas sobre a migração, consulte:
- README.md do plugin
- Documentação oficial do Capacitor
- OutSystems Community Forums
