# Quick Start - Plugin Capacitor

## Instalação Rápida

### 1. Compilar o Plugin

```bash
cd plugin-capacitor
npm install
npm run build
```

### 2. Instalar em um Projeto

```bash
# No seu projeto Capacitor
npm install /caminho/completo/para/plugin-capacitor
npx cap sync android
```

### 3. Usar no Código

```typescript
import { AxPlugin } from '@capacitor/axplugin';

// Setup
await AxPlugin.setup({ apiKey: 'sua-chave' });

// Registrar eventos
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log('Velocidade:', data.value, 'Mbps');
});

// Iniciar
await AxPlugin.start();

// Parar depois
await AxPlugin.stop();
await AxPlugin.removeAllListeners();
```

## Uso no OutSystems

### Passo 1: Publicar o Plugin

**Opção A - NPM Público:**
```bash
cd plugin-capacitor
npm publish
```

**Opção B - NPM Privado/Registry:**
```bash
npm publish --registry https://seu-registry.com
```

**Opção C - Arquivo Local (desenvolvimento):**
```bash
npm pack
# Gera: capacitor-axplugin-1.0.0.tgz
```

### Passo 2: Configurar no OutSystems

1. Abra o módulo mobile no Service Studio
2. Vá em **Module → Properties**
3. Em **Extensibility Configurations**:
   - Selecione **Universal** (não Cordova!)
   - Adicione no package.json:

```json
{
  "dependencies": {
    "@capacitor/axplugin": "^1.0.0"
  }
}
```

### Passo 3: Criar Client Actions

#### Action: AxPlugin_Setup
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

try {
  const result = await AxPlugin.setup({
    apiKey: $parameters.ApiKey
  });
  $parameters.Success = true;
  $parameters.Message = result.message;
} catch (error) {
  $parameters.Success = false;
  $parameters.Message = error.toString();
}
```

**Inputs:**
- ApiKey (Text)

**Outputs:**
- Success (Boolean)
- Message (Text)

---

#### Action: AxPlugin_StartTest
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

// Registrar listener para velocidade
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  // Chamar Server Action ou atualizar variável
  $actions.OnSpeedUpdate(data.value);
});

// Registrar listener para erros
await AxPlugin.addListener('onError', (data) => {
  $actions.OnError(data.error);
});

// Iniciar o teste
await AxPlugin.start();

$parameters.Success = true;
```

**Outputs:**
- Success (Boolean)

**Event Handlers Necessários:**
- OnSpeedUpdate (Input: Speed - Decimal)
- OnError (Input: ErrorMessage - Text)

---

#### Action: AxPlugin_StopTest
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

try {
  const result = await AxPlugin.stop();
  await AxPlugin.removeAllListeners();

  $parameters.Success = true;
  $parameters.Message = result.message;
} catch (error) {
  $parameters.Success = false;
  $parameters.Message = error.toString();
}
```

**Outputs:**
- Success (Boolean)
- Message (Text)

---

#### Action: AxPlugin_IsAvailable
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

try {
  const result = await AxPlugin.isAvailable();
  $parameters.Available = result.available;
} catch (error) {
  $parameters.Available = false;
}
```

**Outputs:**
- Available (Boolean)

---

### Passo 4: Usar nas Screens

```
Screen: SpeedTest
├── OnReady
│   └── AxPlugin_IsAvailable
│       └── If Available
│           └── AxPlugin_Setup (ApiKey = "sua-chave")
│
├── Button: Start Test
│   └── OnClick
│       └── AxPlugin_StartTest
│           ├── OnSpeedUpdate Handler
│           │   └── Assign: SpeedText = Speed + " Mbps"
│           └── OnError Handler
│               └── Message: ErrorMessage
│
└── Button: Stop Test
    └── OnClick
        └── AxPlugin_StopTest
```

## Exemplo Completo OutSystems

### Screen Variables
```
SpeedValue: Decimal
IsTestRunning: Boolean
StatusMessage: Text
```

### Logic Flow

```
OnReady:
  1. AxPlugin_IsAvailable
  2. If Available = True
     → AxPlugin_Setup(ApiKey = "test-key")
     → StatusMessage = "Plugin configurado"
  3. Else
     → StatusMessage = "Plugin não disponível"

OnClickStart:
  1. AxPlugin_StartTest
     Event OnSpeedUpdate:
       → SpeedValue = Speed
       → StatusMessage = "Teste em andamento..."
     Event OnError:
       → StatusMessage = "Erro: " + ErrorMessage
  2. IsTestRunning = True

OnClickStop:
  1. AxPlugin_StopTest
  2. IsTestRunning = False
  3. StatusMessage = "Teste finalizado"
```

## Comandos Úteis

### Desenvolvimento

```bash
# Compilar plugin
npm run build

# Watch mode (recompila automaticamente)
npm run watch

# Lint
npm run lint

# Limpar build
npm run clean
```

### Teste

```bash
# Criar projeto de teste
npm install -g @capacitor/cli
npm init @capacitor/app test-app
cd test-app

# Instalar plugin
npm install /caminho/para/plugin-capacitor

# Adicionar Android
npx cap add android
npx cap sync

# Abrir no Android Studio
npx cap open android

# Ou executar direto
npx cap run android
```

### Publicação

```bash
# Build de produção
npm run build

# Publicar no NPM
npm login
npm publish

# Ou publicar como scoped package
npm publish --access public
```

## Verificação Rápida

Para verificar se tudo está funcionando:

```bash
cd plugin-capacitor

# 1. Verificar estrutura
ls -la src/ android/

# 2. Instalar e compilar
npm install
npm run build

# 3. Verificar output
ls -la dist/

# Deve conter:
# - esm/
# - plugin.js
# - plugin.cjs.js
```

## Troubleshooting Rápido

**Erro: Module not found**
```bash
npm install
npm run build
```

**Erro: Cannot find @capacitor/core**
```bash
npm install @capacitor/core --save-dev
```

**Erro: Java compilation failed**
```bash
# Verificar que o .aar está presente
ls android/src/main/libs/axplugin-release.aar
```

**Erro no OutSystems: Plugin not implemented**
```
- Verifique que selecionou "Universal" e não "Cordova"
- Execute "Sync" após adicionar o plugin
- Reconstrua a app nativa
```

## Recursos

- 📄 [README.md](./README.md) - Documentação completa
- 🔄 [MIGRATION.md](./MIGRATION.md) - Guia de migração
- 📊 [example.html](./example.html) - Exemplo web
- 📝 [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md) - Resumo da conversão

---

**Pronto para usar!** 🚀
