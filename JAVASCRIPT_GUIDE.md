# Guia de Uso JavaScript - AxPlugin

Guia prático e direto de como usar o plugin AxPlugin em JavaScript.

---

## 📦 Importar o Plugin

### Em Projetos Modernos (ES6+)

```javascript
import { AxPlugin } from '@capacitor/axplugin';
```

### No OutSystems ou CommonJS

```javascript
const { AxPlugin } = require('@capacitor/axplugin');
```

---

## 🚀 Uso Básico - 3 Passos

### Passo 1: Setup (Configurar)

Configure o plugin com sua chave de API **antes** de usar qualquer outra função.

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

async function configurarPlugin() {
  try {
    const resultado = await AxPlugin.setup({
      apiKey: 'sua-chave-aqui'
    });

    console.log('✓ Plugin configurado:', resultado.message);
    // Saída: "Plugin configurado com sucesso"

  } catch (error) {
    console.error('✗ Erro ao configurar:', error);
  }
}

configurarPlugin();
```

**Parâmetros:**
- `apiKey` (obrigatório) - String com sua chave de API

**Retorna:**
```javascript
{ message: "Plugin configurado com sucesso" }
```

---

### Passo 2: Start (Iniciar Teste)

Inicie o teste de velocidade. Os valores chegam via **eventos** (não via retorno direto).

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

async function iniciarTeste() {
  try {
    // IMPORTANTE: Registre os listeners ANTES de chamar start()

    // Listener para receber valores de velocidade
    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      console.log('📊 Velocidade:', data.value, 'Mbps');
      // data.value é um número entre 21 e 248
    });

    // Listener para receber erros
    await AxPlugin.addListener('onError', (data) => {
      console.error('❌ Erro:', data.error);
    });

    // Agora inicia o teste
    await AxPlugin.start();
    console.log('✓ Teste iniciado!');

  } catch (error) {
    console.error('✗ Erro ao iniciar:', error);
  }
}

iniciarTeste();
```

**Como funciona:**
1. Você registra os listeners para receber os dados
2. Chama `start()` para iniciar
3. O plugin vai chamar seu listener várias vezes com novos valores
4. Continue até chamar `stop()`

**Eventos:**
- `onSpeedUpdate` - Disparado a cada atualização de velocidade
  - Recebe: `{ value: number }` (velocidade em Mbps)
- `onError` - Disparado quando ocorre um erro
  - Recebe: `{ error: string }` (mensagem de erro)

---

### Passo 3: Stop (Parar Teste)

Pare o teste e limpe os listeners.

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

async function pararTeste() {
  try {
    // Para o teste
    const resultado = await AxPlugin.stop();
    console.log('✓ Teste parado:', resultado.message);

    // Limpa todos os listeners
    await AxPlugin.removeAllListeners();
    console.log('✓ Listeners removidos');

  } catch (error) {
    console.error('✗ Erro ao parar:', error);
  }
}

pararTeste();
```

**Retorna:**
```javascript
{ message: "Plugin parado com sucesso" }
```

---

## 💡 Exemplo Completo

### Exemplo 1: Teste Simples

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

async function testeDeVelocidade() {
  try {
    // 1. Configurar
    console.log('Configurando plugin...');
    await AxPlugin.setup({ apiKey: 'minha-chave-123' });

    // 2. Registrar listeners
    console.log('Registrando listeners...');

    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      console.log(`📊 Velocidade atual: ${data.value} Mbps`);
    });

    await AxPlugin.addListener('onError', (data) => {
      console.error(`❌ Erro: ${data.error}`);
    });

    // 3. Iniciar
    console.log('Iniciando teste...');
    await AxPlugin.start();

    // 4. Parar após 30 segundos
    setTimeout(async () => {
      console.log('Parando teste...');
      await AxPlugin.stop();
      await AxPlugin.removeAllListeners();
      console.log('✓ Teste finalizado!');
    }, 30000);

  } catch (error) {
    console.error('Erro:', error);
  }
}

// Executar
testeDeVelocidade();
```

**Saída esperada:**
```
Configurando plugin...
Registrando listeners...
Iniciando teste...
📊 Velocidade atual: 45 Mbps
📊 Velocidade atual: 78 Mbps
📊 Velocidade atual: 123 Mbps
...
Parando teste...
✓ Teste finalizado!
```

---

### Exemplo 2: Com Atualização de Interface

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

// Variáveis para controle
let testando = false;
let velocidadeAtual = 0;

async function iniciar() {
  if (testando) {
    console.log('⚠️ Teste já está rodando!');
    return;
  }

  try {
    // Setup
    await AxPlugin.setup({ apiKey: 'minha-chave' });

    // Registrar listeners
    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      velocidadeAtual = data.value;
      atualizarInterface(data.value);
    });

    await AxPlugin.addListener('onError', (data) => {
      mostrarErro(data.error);
    });

    // Iniciar
    await AxPlugin.start();
    testando = true;

    console.log('✓ Teste iniciado');

  } catch (error) {
    console.error('Erro:', error);
  }
}

async function parar() {
  if (!testando) {
    console.log('⚠️ Nenhum teste rodando!');
    return;
  }

  try {
    await AxPlugin.stop();
    await AxPlugin.removeAllListeners();
    testando = false;
    velocidadeAtual = 0;

    console.log('✓ Teste parado');

  } catch (error) {
    console.error('Erro:', error);
  }
}

function atualizarInterface(velocidade) {
  // Atualizar sua interface aqui
  console.log(`Atualizar UI: ${velocidade} Mbps`);

  // Exemplo com DOM:
  // document.getElementById('velocidade').textContent = velocidade + ' Mbps';
}

function mostrarErro(mensagem) {
  console.error('Erro no teste:', mensagem);

  // Exemplo com DOM:
  // document.getElementById('erro').textContent = mensagem;
}

// Usar:
// iniciar();  // Para começar
// parar();    // Para parar
```

---

### Exemplo 3: Verificar Disponibilidade

Sempre verifique se o plugin está disponível antes de usar (especialmente se seu app roda na web).

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

async function verificarEIniciar() {
  try {
    // Verificar se está disponível
    const { available } = await AxPlugin.isAvailable();

    if (!available) {
      console.log('❌ Plugin não disponível nesta plataforma');
      console.log('ℹ️ O plugin só funciona no Android');
      return;
    }

    console.log('✓ Plugin disponível!');

    // Continuar com setup e start
    await AxPlugin.setup({ apiKey: 'minha-chave' });

    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      console.log('Velocidade:', data.value);
    });

    await AxPlugin.start();

  } catch (error) {
    console.error('Erro:', error);
  }
}

verificarEIniciar();
```

---

## 🎯 Uso no OutSystems

### Action 1: Setup

**Nome:** `AxPlugin_Setup`

**Inputs:**
- `ApiKey` (Text)

**Outputs:**
- `Success` (Boolean)
- `Message` (Text)

**JavaScript:**
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

---

### Action 2: Start Test

**Nome:** `AxPlugin_Start`

**Outputs:**
- `Success` (Boolean)

**Event Handlers Necessários:**
- `OnSpeedUpdate` (Input: `Speed` - Decimal)
- `OnError` (Input: `Error` - Text)

**JavaScript:**
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

try {
  // Registrar listeners
  await AxPlugin.addListener('onSpeedUpdate', (data) => {
    // Chama seu Server Action ou atualiza variável
    $actions.OnSpeedUpdate(data.value);
  });

  await AxPlugin.addListener('onError', (data) => {
    $actions.OnError(data.error);
  });

  // Iniciar teste
  await AxPlugin.start();

  $parameters.Success = true;

} catch (error) {
  $parameters.Success = false;
}
```

---

### Action 3: Stop Test

**Nome:** `AxPlugin_Stop`

**Outputs:**
- `Success` (Boolean)
- `Message` (Text)

**JavaScript:**
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

---

### Action 4: Is Available (Opcional)

**Nome:** `AxPlugin_IsAvailable`

**Outputs:**
- `Available` (Boolean)

**JavaScript:**
```javascript
const { AxPlugin } = require('@capacitor/axplugin');

try {
  const result = await AxPlugin.isAvailable();
  $parameters.Available = result.available;
} catch (error) {
  $parameters.Available = false;
}
```

---

## ⚠️ Pontos Importantes

### ✅ DO (Faça)

```javascript
// ✅ Sempre registre listeners ANTES de start()
await AxPlugin.addListener('onSpeedUpdate', callback);
await AxPlugin.start();

// ✅ Sempre chame setup() primeiro
await AxPlugin.setup({ apiKey: 'chave' });
await AxPlugin.start();

// ✅ Sempre limpe listeners ao parar
await AxPlugin.stop();
await AxPlugin.removeAllListeners();

// ✅ Use try/catch para erros
try {
  await AxPlugin.start();
} catch (error) {
  console.error(error);
}
```

### ❌ DON'T (Não faça)

```javascript
// ❌ NÃO inicie sem setup
await AxPlugin.start(); // ERRO: Plugin não configurado

// ❌ NÃO registre listener depois de start
await AxPlugin.start();
await AxPlugin.addListener(...); // Pode perder eventos

// ❌ NÃO espere retorno direto de start()
const velocidade = await AxPlugin.start(); // NÃO funciona assim!
// Use listeners para receber valores

// ❌ NÃO esqueça de limpar listeners
await AxPlugin.stop();
// Falta: await AxPlugin.removeAllListeners();
```

---

## 🔧 Troubleshooting

### Erro: "Plugin não configurado"
```javascript
// Solução: Chame setup() primeiro
await AxPlugin.setup({ apiKey: 'sua-chave' });
await AxPlugin.start();
```

### Erro: "API Key é obrigatória"
```javascript
// Solução: Passe a apiKey
await AxPlugin.setup({ apiKey: 'sua-chave' }); // ✓
// NÃO:
await AxPlugin.setup({}); // ✗
```

### Não recebo valores de velocidade
```javascript
// Solução: Registre listener ANTES de start()

// ✓ CORRETO:
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log(data.value);
});
await AxPlugin.start();

// ✗ ERRADO:
await AxPlugin.start();
await AxPlugin.addListener(...); // Tarde demais!
```

### Plugin não disponível
```javascript
// Solução: Verifique a plataforma
const { available } = await AxPlugin.isAvailable();
if (!available) {
  console.log('Plugin só funciona no Android');
}
```

---

## 📱 Fluxo Completo Recomendado

```javascript
const { AxPlugin } = require('@capacitor/axplugin');

// Estado da aplicação
let pluginConfigurado = false;
let testeAtivo = false;

// 1. Inicialização (executar uma vez no início)
async function inicializar() {
  try {
    // Verificar disponibilidade
    const { available } = await AxPlugin.isAvailable();
    if (!available) {
      console.log('Plugin não disponível');
      return false;
    }

    // Configurar
    await AxPlugin.setup({ apiKey: 'sua-chave' });
    pluginConfigurado = true;
    console.log('Plugin pronto para usar');
    return true;

  } catch (error) {
    console.error('Erro na inicialização:', error);
    return false;
  }
}

// 2. Iniciar teste
async function iniciarTeste() {
  if (!pluginConfigurado) {
    console.log('Execute inicializar() primeiro');
    return;
  }

  if (testeAtivo) {
    console.log('Teste já está rodando');
    return;
  }

  try {
    // Registrar listeners
    await AxPlugin.addListener('onSpeedUpdate', (data) => {
      console.log('Velocidade:', data.value, 'Mbps');
      // Atualizar sua interface aqui
    });

    await AxPlugin.addListener('onError', (data) => {
      console.error('Erro:', data.error);
      // Mostrar erro na interface
    });

    // Iniciar
    await AxPlugin.start();
    testeAtivo = true;
    console.log('Teste iniciado');

  } catch (error) {
    console.error('Erro ao iniciar:', error);
  }
}

// 3. Parar teste
async function pararTeste() {
  if (!testeAtivo) {
    console.log('Nenhum teste rodando');
    return;
  }

  try {
    await AxPlugin.stop();
    await AxPlugin.removeAllListeners();
    testeAtivo = false;
    console.log('Teste parado');

  } catch (error) {
    console.error('Erro ao parar:', error);
  }
}

// Uso:
// 1. Inicializar uma vez
await inicializar();

// 2. Iniciar quando quiser
await iniciarTeste();

// 3. Parar quando quiser
await pararTeste();
```

---

## 📚 Referência Rápida

| Método | Quando usar | Retorna |
|--------|-------------|---------|
| `setup({ apiKey })` | Primeiro, antes de tudo | `{ message: string }` |
| `start()` | Depois de setup + listeners | `void` |
| `stop()` | Para parar o teste | `{ message: string }` |
| `isAvailable()` | Para verificar se funciona | `{ available: boolean }` |
| `addListener(event, callback)` | Antes de start() | `PluginListenerHandle` |
| `removeAllListeners()` | Ao parar o teste | `void` |

**Eventos:**
- `onSpeedUpdate` → `{ value: number }`
- `onError` → `{ error: string }`

---

**Dúvidas?** Consulte:
- README.md - Documentação completa
- QUICK_START.md - Guia rápido
- example.html - Exemplo visual
