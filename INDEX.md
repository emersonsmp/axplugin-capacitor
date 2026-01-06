# @capacitor/axplugin - Índice de Documentação

Plugin Capacitor para testes de velocidade de internet usando AxPlugin nativo Android.

**Versão:** 1.0.0
**Data de Conversão:** 2026-01-06
**Autor:** Emerson Sampaio
**Licença:** MIT

---

## 📚 Documentação

### Para Usuários

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[README.md](./README.md)** | Documentação completa da API | Referência completa de todos os métodos |
| **[QUICK_START.md](./QUICK_START.md)** | Guia de início rápido | Começar a usar o plugin rapidamente |
| **[MIGRATION.md](./MIGRATION.md)** | Guia de migração Cordova→Capacitor | Migrar de Cordova para Capacitor |
| **[example.html](./example.html)** | Exemplo interativo | Testar o plugin no navegador |

### Para Desenvolvedores

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)** | Resumo da conversão | Entender o que foi convertido |
| **[CHANGELOG.md](./CHANGELOG.md)** | Histórico de mudanças | Ver o que mudou entre versões |
| **[package.json](./package.json)** | Configuração npm | Dependências e scripts |
| **[tsconfig.json](./tsconfig.json)** | Configuração TypeScript | Compilação do código |

---

## 🚀 Início Rápido

### 1. Instalar e Compilar

```bash
cd plugin-capacitor
chmod +x install.sh
./install.sh
```

Ou manualmente:

```bash
npm install
npm run build
```

### 2. Instalar em um Projeto

```bash
# No seu projeto Capacitor
npm install /caminho/para/plugin-capacitor
npx cap sync android
```

### 3. Usar no Código

```typescript
import { AxPlugin } from '@capacitor/axplugin';

// Configurar
await AxPlugin.setup({ apiKey: 'sua-chave' });

// Registrar eventos
await AxPlugin.addListener('onSpeedUpdate', (data) => {
  console.log('Velocidade:', data.value, 'Mbps');
});

// Iniciar teste
await AxPlugin.start();

// Parar teste
await AxPlugin.stop();
```

---

## 📖 API Rápida

### Métodos Principais

| Método | Descrição | Retorno |
|--------|-----------|---------|
| `setup(options)` | Configura o plugin | `Promise<{message}>` |
| `start()` | Inicia teste de velocidade | `Promise<void>` |
| `stop()` | Para o teste | `Promise<{message}>` |
| `isAvailable()` | Verifica disponibilidade | `Promise<{available}>` |
| `addListener(event, callback)` | Registra listener | `Promise<Handle>` |
| `removeAllListeners()` | Remove todos listeners | `Promise<void>` |

### Eventos

| Evento | Dados | Descrição |
|--------|-------|-----------|
| `onSpeedUpdate` | `{ value: number }` | Atualização de velocidade |
| `onError` | `{ error: string }` | Erro durante o teste |

---

## 📁 Estrutura do Projeto

```
plugin-capacitor/
├── 📄 Documentação
│   ├── README.md              # API completa
│   ├── QUICK_START.md         # Início rápido
│   ├── MIGRATION.md           # Guia de migração
│   ├── CONVERSION_SUMMARY.md  # Resumo da conversão
│   ├── CHANGELOG.md           # Histórico
│   ├── INDEX.md              # Este arquivo
│   └── LICENSE               # Licença MIT
│
├── 🔧 Configuração
│   ├── package.json          # Configuração npm
│   ├── tsconfig.json         # Config TypeScript
│   ├── rollup.config.js      # Config bundler
│   ├── .eslintrc.json       # Config linter
│   ├── .gitignore           # Git ignore
│   └── install.sh           # Script de instalação
│
├── 💻 Código Fonte
│   └── src/
│       ├── index.ts         # Exportação principal
│       ├── definitions.ts   # Tipos TypeScript
│       └── web.ts          # Implementação web
│
├── 🤖 Android
│   └── android/
│       ├── build.gradle     # Config Gradle
│       └── src/main/
│           ├── AndroidManifest.xml
│           ├── java/com/axplugin/capacitor/
│           │   └── AxPlugin.java
│           └── libs/
│               └── axplugin-release.aar
│
└── 📝 Exemplos
    └── example.html         # Exemplo interativo
```

---

## 🎯 Fluxos de Trabalho Comuns

### Primeiro Uso

1. **[install.sh](./install.sh)** - Execute o script de instalação
2. **[QUICK_START.md](./QUICK_START.md)** - Siga o guia rápido
3. **[example.html](./example.html)** - Teste o exemplo
4. **[README.md](./README.md)** - Consulte a API completa

### Migração do Cordova

1. **[MIGRATION.md](./MIGRATION.md)** - Leia o guia de migração
2. **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)** - Entenda as mudanças
3. **[CHANGELOG.md](./CHANGELOG.md)** - Veja o que mudou
4. **[QUICK_START.md](./QUICK_START.md)** - Configure o novo plugin

### Desenvolvimento

1. **[src/definitions.ts](./src/definitions.ts)** - Veja os tipos
2. **[android/.../AxPlugin.java](./android/src/main/java/com/axplugin/capacitor/AxPlugin.java)** - Código nativo
3. **[package.json](./package.json)** - Scripts disponíveis
4. **[CHANGELOG.md](./CHANGELOG.md)** - Documente mudanças

### Uso no OutSystems

1. **[QUICK_START.md](./QUICK_START.md)** → Seção "Uso no OutSystems"
2. **[MIGRATION.md](./MIGRATION.md)** → Seção "Migração no OutSystems"
3. **[README.md](./README.md)** → Seção "Uso no OutSystems"

---

## 🔍 Encontrar Informações

| Procurando por... | Onde encontrar |
|-------------------|----------------|
| Como instalar? | [QUICK_START.md](./QUICK_START.md) |
| Como usar a API? | [README.md](./README.md) |
| Como migrar do Cordova? | [MIGRATION.md](./MIGRATION.md) |
| O que mudou? | [CHANGELOG.md](./CHANGELOG.md) |
| Exemplo de código? | [example.html](./example.html) ou [README.md](./README.md) |
| Usar no OutSystems? | [QUICK_START.md](./QUICK_START.md) |
| Tipos TypeScript? | [src/definitions.ts](./src/definitions.ts) |
| Código nativo? | [android/.../AxPlugin.java](./android/src/main/java/com/axplugin/capacitor/AxPlugin.java) |
| Como compilar? | [install.sh](./install.sh) ou [package.json](./package.json) |
| Licença? | [LICENSE](./LICENSE) |

---

## 🛠️ Comandos Úteis

```bash
# Instalação
npm install              # Instalar dependências
./install.sh            # Setup completo

# Build
npm run build           # Compilar plugin
npm run watch           # Watch mode
npm run clean           # Limpar build

# Qualidade
npm run lint            # Executar linter
npm run verify:android  # Verificar Android

# Distribuição
npm pack                # Criar .tgz
npm publish             # Publicar no NPM
```

---

## 📊 Comparação: Cordova vs Capacitor

| Aspecto | Cordova | Capacitor |
|---------|---------|-----------|
| **API Style** | Callbacks | Promises/async-await |
| **Events** | Callback params | addListener() |
| **Typing** | JavaScript | TypeScript |
| **OutSystems** | Cordova Extensibility | Universal Extensibility |
| **Namespace** | cordova.plugins.AxPlugin | AxPlugin |

Detalhes: [MIGRATION.md](./MIGRATION.md)

---

## ✅ Checklist de Implementação

### Setup Inicial
- [ ] Executar `./install.sh` ou `npm install && npm run build`
- [ ] Verificar que `dist/` foi gerado
- [ ] Testar com [example.html](./example.html)

### Integração em Projeto
- [ ] Instalar plugin no projeto
- [ ] Executar `npx cap sync android`
- [ ] Importar `AxPlugin` no código
- [ ] Testar `isAvailable()`
- [ ] Configurar com `setup()`

### OutSystems
- [ ] Ler [QUICK_START.md](./QUICK_START.md) - Seção OutSystems
- [ ] Configurar Universal Extensibility
- [ ] Criar Client Actions
- [ ] Testar na aplicação

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Plugin não encontrado | `npm install && npm run build` |
| Erro TypeScript | Ver [tsconfig.json](./tsconfig.json) |
| Erro Android | Verificar [build.gradle](./android/build.gradle) |
| Biblioteca .aar missing | Copiar para `android/src/main/libs/` |
| Cordova não funciona | Use [MIGRATION.md](./MIGRATION.md) |

---

## 📞 Suporte

- **Documentação:** Consulte os arquivos .md neste diretório
- **Exemplos:** [example.html](./example.html)
- **Código:** [src/](./src/) e [android/](./android/)

---

## 📝 Notas da Versão

**Versão 1.0.0** (2026-01-06)
- ✅ Conversão completa de Cordova para Capacitor
- ✅ API TypeScript tipada
- ✅ Sistema de eventos robusto
- ✅ Suporte Universal Extensibility
- ✅ Documentação completa
- ✅ Exemplos práticos
- ⚠️ Apenas Android suportado

Detalhes: [CHANGELOG.md](./CHANGELOG.md)

---

**Última Atualização:** 2026-01-06
**Próxima Revisão:** A definir
