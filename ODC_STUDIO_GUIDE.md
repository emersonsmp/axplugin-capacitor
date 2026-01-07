# Guia ODC Studio - Plugin AxPlugin

Guia completo de como usar o plugin AxPlugin no **ODC Studio** (OutSystems Developer Cloud).

---

## 📦 Instalação no ODC

### 1. Adicionar Plugin ao Projeto

No ODC Studio, vá em **Module → Manage Dependencies**:

1. Adicione o plugin nas dependências do Capacitor
2. Configure o `package.json` do projeto para incluir:

```json
{
  "dependencies": {
    "@capacitor/axplugin": "^1.0.0"
  }
}
```

**Ou** se estiver testando localmente (não publicado no NPM):

```json
{
  "dependencies": {
    "@capacitor/axplugin": "file:///caminho/para/plugin-capacitor"
  }
}
```

### 2. Configurar Extensibility

**IMPORTANTE:** Configure para **Universal Extensibility** (não Cordova!)

1. Module Properties → Extensibility Configurations
2. Selecione: **Universal**
3. Adicione o package.json acima

---

## 🎯 Como Usar no ODC Studio

No ODC, você acessa o plugin via `Capacitor.Plugins.AxPlugin`:

```javascript
const { AxPlugin } = Capacitor.Plugins;
```

---

## 📝 Exemplos Completos para ODC

### Client Action 1: Setup

**Nome:** `AxPlugin_Setup`

**Inputs:**
- `ApiKey` (Text)

**Outputs:**
- `Success` (Boolean)
- `Message` (Text)

**JavaScript:**

```javascript
(async () => {
    const { AxPlugin } = Capacitor.Plugins;

    // Verificar se plugin existe
    if (!AxPlugin) {
        $public.FeedbackMessage.showFeedbackMessage(
            "Plugin não encontrado! Verifique a instalação.",
            /* messageType */ 3  // Error
        );
        $parameters.Success = false;
        $parameters.Message = "Plugin não encontrado";
        $resolve();
        return;
    }

    try {
        // Configurar plugin
        const result = await AxPlugin.setup({
            apiKey: $parameters.ApiKey
        });

        $parameters.Success = true;
        $parameters.Message = result.message;

        $public.FeedbackMessage.showFeedbackMessage(
            "Plugin configurado com sucesso!",
            /* messageType */ 1  // Success
        );

    } catch (error) {
        $parameters.Success = false;
        $parameters.Message = error.toString();

        $public.FeedbackMessage.showFeedbackMessage(
            "Erro ao configurar: " + error.toString(),
            /* messageType */ 3  // Error
        );
    }

    $resolve();
})();
```

---

### Client Action 2: Check Availability

**Nome:** `AxPlugin_IsAvailable`

**Outputs:**
- `Available` (Boolean)

**JavaScript:**

```javascript
(async () => {
    const { AxPlugin } = Capacitor.Plugins;

    if (!AxPlugin) {
        $parameters.Available = false;

        $public.FeedbackMessage.showFeedbackMessage(
            "Plugin não disponível",
            /* messageType */ 2  // Warning
        );

        $resolve();
        return;
    }

    try {
        const result = await AxPlugin.isAvailable();
        $parameters.Available = result.available;

        if (result.available) {
            $public.FeedbackMessage.showFeedbackMessage(
                "Plugin disponível e pronto!",
                /* messageType */ 1  // Success
            );
        } else {
            $public.FeedbackMessage.showFeedbackMessage(
                "Plugin não disponível nesta plataforma (Android only)",
                /* messageType */ 2  // Warning
            );
        }

    } catch (error) {
        $parameters.Available = false;

        $public.FeedbackMessage.showFeedbackMessage(
            "Erro: " + error.toString(),
            /* messageType */ 3  // Error
        );
    }

    $resolve();
})();
```

---

### Client Action 3: Start Test

**Nome:** `AxPlugin_Start`

**Outputs:**
- `Success` (Boolean)

**IMPORTANTE:** Esta action precisa de **Event Handlers**!

**JavaScript:**

```javascript
(async () => {
    const { AxPlugin } = Capacitor.Plugins;

    if (!AxPlugin) {
        $parameters.Success = false;
        $public.FeedbackMessage.showFeedbackMessage(
            "Plugin não encontrado",
            /* messageType */ 3
        );
        $resolve();
        return;
    }

    try {
        // Registrar listener para atualizações de velocidade
        await AxPlugin.addListener('onSpeedUpdate', (data) => {
            // IMPORTANTE: No ODC, você pode chamar Server Actions ou atualizar variáveis

            // Opção 1: Atualizar variável local (se estiver no client)
            // $parameters.CurrentSpeed = data.value;

            // Opção 2: Chamar Server Action (recomendado para salvar)
            $actions.OnSpeedUpdate(data.value);

            // Opção 3: Mostrar feedback visual
            $public.FeedbackMessage.showFeedbackMessage(
                "Velocidade: " + data.value + " Mbps",
                /* messageType */ 1
            );
        });

        // Registrar listener para erros
        await AxPlugin.addListener('onError', (data) => {
            $actions.OnError(data.error);

            $public.FeedbackMessage.showFeedbackMessage(
                "Erro no teste: " + data.error,
                /* messageType */ 3
            );
        });

        // Iniciar o teste
        await AxPlugin.start();

        $parameters.Success = true;

        $public.FeedbackMessage.showFeedbackMessage(
            "Teste de velocidade iniciado!",
            /* messageType */ 1
        );

    } catch (error) {
        $parameters.Success = false;

        $public.FeedbackMessage.showFeedbackMessage(
            "Erro ao iniciar: " + error.toString(),
            /* messageType */ 3
        );
    }

    $resolve();
})();
```

**Event Handlers necessários:**
- Crie uma **Server Action** ou **Client Action** chamada `OnSpeedUpdate`
  - Input: `Speed` (Decimal)
- Crie uma **Server Action** ou **Client Action** chamada `OnError`
  - Input: `ErrorMessage` (Text)

---

### Client Action 4: Stop Test

**Nome:** `AxPlugin_Stop`

**Outputs:**
- `Success` (Boolean)
- `Message` (Text)

**JavaScript:**

```javascript
(async () => {
    const { AxPlugin } = Capacitor.Plugins;

    if (!AxPlugin) {
        $parameters.Success = false;
        $parameters.Message = "Plugin não encontrado";
        $resolve();
        return;
    }

    try {
        // Parar o teste
        const result = await AxPlugin.stop();

        // Remover todos os listeners
        await AxPlugin.removeAllListeners();

        $parameters.Success = true;
        $parameters.Message = result.message;

        $public.FeedbackMessage.showFeedbackMessage(
            "Teste parado com sucesso!",
            /* messageType */ 1
        );

    } catch (error) {
        $parameters.Success = false;
        $parameters.Message = error.toString();

        $public.FeedbackMessage.showFeedbackMessage(
            "Erro ao parar: " + error.toString(),
            /* messageType */ 3
        );
    }

    $resolve();
})();
```

---

## 🎨 Exemplo de Screen Completa

### Screen: SpeedTestScreen

#### Local Variables:
```
IsPluginAvailable: Boolean (False)
IsTestRunning: Boolean (False)
CurrentSpeed: Decimal (0)
ApiKey: Text ("sua-chave-api")
```

#### OnReady Logic:

```
1. AxPlugin_IsAvailable
   └─ Available = True?
      ├─ Yes:
      │   └─ Assign: IsPluginAvailable = True
      │   └─ AxPlugin_Setup
      │       └─ ApiKey = ApiKey
      │       └─ Success?
      │           └─ Yes: Ready para usar
      │           └─ No: Show error
      └─ No:
          └─ Message: "Plugin não disponível"
```

#### Button: Start Test

```
OnClick:
  1. AxPlugin_Start
     └─ Success?
         ├─ Yes:
         │   └─ Assign: IsTestRunning = True
         │   └─ Enable "Stop" button
         │   └─ Disable "Start" button
         └─ No: Show error
```

#### Button: Stop Test

```
OnClick:
  1. AxPlugin_Stop
     └─ Success?
         ├─ Yes:
         │   └─ Assign: IsTestRunning = False
         │   └─ Enable "Start" button
         │   └─ Disable "Stop" button
         └─ No: Show error
```

#### OnSpeedUpdate Handler (Client Action)

**Input:** `Speed` (Decimal)

**Logic:**
```
1. Assign: CurrentSpeed = Speed
2. Refresh data on screen
3. (Optional) Save to database
4. (Optional) Update chart/graph
```

#### OnError Handler (Client Action)

**Input:** `ErrorMessage` (Text)

**Logic:**
```
1. Log error
2. Show feedback message
3. Stop test (call AxPlugin_Stop)
```

---

## 💾 Exemplo com Salvamento em Database

### Client Action: OnSpeedUpdate

```javascript
// Esta action é chamada automaticamente pelo listener

// Input: Speed (Decimal)

// Logic:
1. Assign: CurrentSpeed = $parameters.Speed

2. Server Action: SaveSpeedMeasurement
   - Speed: $parameters.Speed
   - Timestamp: CurrDateTime()
   - TestId: CurrentTestId

3. Refresh: SpeedList (se tiver uma lista)

4. Update UI elements
```

---

## 🔄 Fluxo Completo Recomendado

```javascript
Screen OnReady:
├─ 1. Check Availability
│  └─ AxPlugin_IsAvailable
│      └─ Available?
│          ├─ Yes → Continue
│          └─ No → Show warning, disable features
│
├─ 2. Setup Plugin
│  └─ AxPlugin_Setup(ApiKey)
│      └─ Success?
│          ├─ Yes → Enable "Start" button
│          └─ No → Show error
│
Button "Start Test" Click:
├─ 3. Start Test
│  └─ AxPlugin_Start
│      ├─ Registers listeners
│      ├─ Starts test
│      └─ Success?
│          ├─ Yes →
│          │   ├─ IsTestRunning = True
│          │   ├─ Disable "Start"
│          │   └─ Enable "Stop"
│          └─ No → Show error
│
Events During Test:
├─ onSpeedUpdate → OnSpeedUpdate(Speed)
│  ├─ Update CurrentSpeed
│  ├─ Save to database
│  └─ Update UI
│
└─ onError → OnError(Error)
   ├─ Log error
   ├─ Show message
   └─ Stop test
│
Button "Stop Test" Click:
└─ 4. Stop Test
   └─ AxPlugin_Stop
       ├─ Stops test
       ├─ Removes listeners
       └─ Success?
           ├─ Yes →
           │   ├─ IsTestRunning = False
           │   ├─ Enable "Start"
           │   └─ Disable "Stop"
           └─ No → Show error
```

---

## 🎯 Exemplo de UI (Widget Tree)

```
Screen: SpeedTest
├─ Container (Header)
│  └─ Text: "Teste de Velocidade"
│
├─ Container (Status)
│  ├─ If (IsPluginAvailable)
│  │  └─ Text: "✓ Plugin disponível"
│  └─ Else
│     └─ Text: "✗ Plugin não disponível"
│
├─ Container (Current Speed)
│  ├─ Text: "Velocidade Atual:"
│  └─ Expression: CurrentSpeed + " Mbps"
│     └─ Style: Large, Bold
│
├─ Container (Controls)
│  ├─ Button: "Iniciar Teste"
│  │  ├─ Enabled: IsPluginAvailable AND NOT IsTestRunning
│  │  └─ OnClick: Start Test Logic
│  │
│  └─ Button: "Parar Teste"
│     ├─ Enabled: IsTestRunning
│     └─ OnClick: Stop Test Logic
│
└─ Container (History - Optional)
   └─ List: Recent Speed Measurements
      └─ ListItem: Speed + " Mbps - " + Timestamp
```

---

## ⚠️ Pontos Importantes para ODC

### 1. Acesso ao Plugin

```javascript
// ✅ CORRETO no ODC:
const { AxPlugin } = Capacitor.Plugins;

// ❌ ERRADO no ODC (funciona em apps web normais):
import { AxPlugin } from '@capacitor/axplugin';
```

### 2. Verificar se Plugin Existe

```javascript
// SEMPRE verifique antes de usar:
if (!AxPlugin) {
    // Plugin não carregado
    return;
}
```

### 3. Listeners e Eventos

```javascript
// Listeners devem ser registrados ANTES de start()
await AxPlugin.addListener('onSpeedUpdate', callback);
await AxPlugin.start();

// NÃO:
await AxPlugin.start();
await AxPlugin.addListener(...); // Tarde demais!
```

### 4. Cleanup

```javascript
// SEMPRE remova listeners ao parar:
await AxPlugin.stop();
await AxPlugin.removeAllListeners();
```

### 5. Event Handlers

Os callbacks dos listeners podem:
- ✅ Chamar Server Actions: `$actions.MyServerAction(data)`
- ✅ Atualizar variáveis: `$parameters.Variable = value`
- ✅ Mostrar feedback: `$public.FeedbackMessage.showFeedbackMessage(...)`
- ❌ NÃO podem navegar diretamente (use flags e navegue fora)

---

## 🐛 Troubleshooting ODC

### Erro: "Plugin não encontrado"

**Causa:** Plugin não foi instalado ou não carregou

**Solução:**
```
1. Verificar package.json tem a dependência
2. Fazer rebuild da app nativa
3. Executar: npx cap sync android
4. Verificar que está em Universal Extensibility (não Cordova)
```

### Erro: "AxPlugin is undefined"

**Causa:** Tentando acessar antes do Capacitor carregar

**Solução:**
```javascript
// Aguardar Capacitor carregar
(async () => {
    // Esperar um pouco se necessário
    await new Promise(resolve => setTimeout(resolve, 100));

    const { AxPlugin } = Capacitor.Plugins;
    // ... resto do código
})();
```

### Eventos não chegam

**Causa:** Listeners registrados após start()

**Solução:**
```javascript
// CORRETO:
await AxPlugin.addListener('onSpeedUpdate', callback);
await AxPlugin.start(); // Depois dos listeners
```

### Erro: "Plugin não configurado"

**Causa:** Tentou start() sem setup()

**Solução:**
```javascript
// Sempre chamar setup() primeiro
await AxPlugin.setup({ apiKey: "chave" });
await AxPlugin.start();
```

---

## 📱 Testando no ODC

### 1. No Browser (Desenvolvimento)

- Plugin retornará `available: false`
- Útil para testar lógica da UI
- Eventos não funcionarão

### 2. No Android (Produção)

```bash
# Build da app
odc build android

# Instalar no dispositivo
# Ou baixar APK do ODC Portal
```

---

## 🔐 Configuração da API Key

### Opção 1: Hardcoded (Desenvolvimento)

```javascript
await AxPlugin.setup({
    apiKey: "minha-chave-de-teste"
});
```

### Opção 2: De Variável do Site

```javascript
// No ODC, configure Site Property: ApiKey_AxPlugin
await AxPlugin.setup({
    apiKey: $parameters.ApiKey  // Vem de Site Property
});
```

### Opção 3: De Servidor

```javascript
// Server Action retorna a API Key
const apiKey = await $actions.GetAxPluginApiKey();

await AxPlugin.setup({
    apiKey: apiKey
});
```

---

## 📊 Exemplo Completo de Implementação

### 1. Create Entities (Opcional - para histórico)

```
Entity: SpeedMeasurement
├─ Id (Long Integer, Auto)
├─ Speed (Decimal)
├─ Timestamp (DateTime)
├─ TestId (Text)
└─ UserId (User Identifier)
```

### 2. Create Server Actions

#### SaveSpeedMeasurement
- Input: Speed (Decimal), TestId (Text)
- Logic: Create SpeedMeasurement record

#### GetTestHistory
- Output: List of SpeedMeasurement
- Logic: Get measurements for current user

### 3. Create Client Actions

Já mostradas acima:
- AxPlugin_Setup
- AxPlugin_IsAvailable
- AxPlugin_Start
- AxPlugin_Stop
- OnSpeedUpdate
- OnError

### 4. Create Screen

Use a estrutura mostrada na seção "Exemplo de UI" acima.

---

## ✅ Checklist de Implementação

- [ ] Plugin adicionado ao package.json
- [ ] Universal Extensibility configurada
- [ ] App rebuild feita
- [ ] Client Action: AxPlugin_Setup criada
- [ ] Client Action: AxPlugin_IsAvailable criada
- [ ] Client Action: AxPlugin_Start criada
- [ ] Client Action: AxPlugin_Stop criada
- [ ] Event Handler: OnSpeedUpdate criado
- [ ] Event Handler: OnError criado
- [ ] Screen com UI criada
- [ ] Variáveis locais configuradas
- [ ] Logic flows conectados
- [ ] Testado no Android

---

## 🎓 Resumo Rápido

```javascript
// 1. Sempre acesse via Capacitor.Plugins
const { AxPlugin } = Capacitor.Plugins;

// 2. Sempre verifique se existe
if (!AxPlugin) return;

// 3. Setup primeiro
await AxPlugin.setup({ apiKey: "chave" });

// 4. Listeners antes de start
await AxPlugin.addListener('onSpeedUpdate', callback);
await AxPlugin.start();

// 5. Cleanup ao parar
await AxPlugin.stop();
await AxPlugin.removeAllListeners();
```

---

**Pronto para usar no ODC Studio!** 🚀

Para mais detalhes técnicos do plugin, consulte:
- README.md
- JAVASCRIPT_GUIDE.md
- QUICK_START.md
