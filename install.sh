#!/bin/bash

# Script de instalação e build do plugin Capacitor AxPlugin
# Autor: Emerson Sampaio
# Data: 2026-01-06

set -e  # Sair em caso de erro

echo "=================================="
echo "  AxPlugin Capacitor - Setup"
echo "=================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erro: Execute este script no diretório do plugin${NC}"
    exit 1
fi

# Passo 1: Verificar Node.js
echo -e "${YELLOW}[1/5] Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Erro: Node.js não está instalado${NC}"
    echo "Instale Node.js de: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js instalado: $NODE_VERSION${NC}"
echo ""

# Passo 2: Instalar dependências
echo -e "${YELLOW}[2/5] Instalando dependências...${NC}"
npm install
echo -e "${GREEN}✓ Dependências instaladas${NC}"
echo ""

# Passo 3: Verificar biblioteca .aar
echo -e "${YELLOW}[3/5] Verificando biblioteca nativa...${NC}"
if [ -f "android/src/main/libs/axplugin-release.aar" ]; then
    AAR_SIZE=$(du -h android/src/main/libs/axplugin-release.aar | cut -f1)
    echo -e "${GREEN}✓ Biblioteca .aar encontrada ($AAR_SIZE)${NC}"
else
    echo -e "${RED}✗ AVISO: axplugin-release.aar não encontrado!${NC}"
    echo "  Copie a biblioteca .aar para: android/src/main/libs/"
fi
echo ""

# Passo 4: Compilar plugin
echo -e "${YELLOW}[4/5] Compilando plugin TypeScript...${NC}"
npm run build
echo -e "${GREEN}✓ Plugin compilado${NC}"
echo ""

# Passo 5: Verificar output
echo -e "${YELLOW}[5/5] Verificando build...${NC}"
if [ -d "dist/esm" ] && [ -f "dist/plugin.js" ]; then
    echo -e "${GREEN}✓ Build concluído com sucesso${NC}"
    echo ""
    echo "Arquivos gerados:"
    ls -lh dist/ | grep -v "^total" | awk '{print "  - " $9 " (" $5 ")"}'
else
    echo -e "${RED}✗ Erro no build${NC}"
    exit 1
fi

echo ""
echo "=================================="
echo -e "${GREEN}  Plugin pronto para uso!${NC}"
echo "=================================="
echo ""
echo "Próximos passos:"
echo ""
echo "1. Para testar localmente:"
echo "   npm pack"
echo ""
echo "2. Para instalar em um projeto:"
echo "   cd /seu/projeto"
echo "   npm install /caminho/para/este/diretorio"
echo "   npx cap sync android"
echo ""
echo "3. Para publicar no NPM:"
echo "   npm login"
echo "   npm publish"
echo ""
echo "Documentação:"
echo "  - README.md        - API completa"
echo "  - QUICK_START.md   - Início rápido"
echo "  - MIGRATION.md     - Guia de migração"
echo "  - example.html     - Exemplo de uso"
echo ""
