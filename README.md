# ChronoTac Web

> Jogo da Velha moderno com funcionalidade offline e PWA

## 📋 Sobre o Projeto

ChronoTac é uma aplicação web moderna de Jogo da Velha (Tic-Tac-Toe) desenvolvida com React, TypeScript e Vite. O projeto oferece uma experiência de usuário fluida com suporte offline, tema escuro/claro e funcionalidades PWA (Progressive Web App).

## ✨ Funcionalidades

- 🎮 **Jogo da Velha Interativo**: Interface moderna e responsiva
- 🌙 **Tema Escuro/Claro**: Alternância entre temas com persistência
- 📱 **PWA**: Instalável como aplicativo nativo
- 🔄 **Funcionalidade Offline**: Jogue mesmo sem conexão
- 📊 **Histórico de Jogos**: Visualize partidas anteriores
- 🎯 **Detecção de Vitória**: Sistema inteligente de detecção de padrões
- 📱 **Design Responsivo**: Otimizado para desktop e mobile
- ⚡ **Performance**: Carregamento rápido com Vite

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18.3.1** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Roteamento

### UI/UX

- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Next Themes** - Gerenciamento de temas
- **Tailwind Animate** - Animações-

### PWA e Offline

- **Service Worker** - Cache e funcionalidade offline
- **Web App Manifest** - Configurações PWA
- **LocalStorage** - Persistência local

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd chronotac-web

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:8080
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run build:dev    # Build para desenvolvimento
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

## 🎮 Como Jogar

1. **Início**: O jogador X sempre começa
2. **Jogada**: Clique em qualquer quadrado vazio
3. **Alternância**: Os jogadores alternam entre X e O
4. **Vitória**: Primeiro a fazer 3 em linha (horizontal, vertical ou diagonal) vence
5. **Empate**: Se todos os quadrados forem preenchidos sem vencedor
6. **Reiniciar**: Use o botão "Reiniciar Jogo" para uma nova partida

## 📱 PWA (Progressive Web App)

O ChronoTac pode ser instalado como um aplicativo nativo:

1. Acesse a aplicação no navegador
2. Procure pelo ícone de "Instalar" na barra de endereços
3. Clique em "Instalar" quando solicitado
4. O app será adicionado à sua tela inicial

### Funcionalidades PWA

- ✅ Funciona offline
- ✅ Instalável
- ✅ Ícones personalizados
- ✅ Splash screen
- ✅ Cache inteligente

## 🔧 Configuração

### Temas

A aplicação suporta tema escuro e claro com detecção automática do sistema.

### API Backend

Por padrão, a aplicação se conecta a `http://localhost:3333/api`. Para alterar:

```typescript
// src/services/api/index.ts
private static readonly BASE_URL = 'sua-url-aqui';
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
