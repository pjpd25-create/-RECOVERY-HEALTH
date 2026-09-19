# Guia de Implementação no Vercel (Deployment Guide)

Este projeto está 100% preparado e configurado para ser lançado na plataforma **Vercel**, tanto a parte do Frontend (React + Vite + Tailwind CSS + PWA) como o Backend de APIs Serverless (Express no diretório `/api`).

---

## 🚀 Método 1: Lançamento Direto via GitHub (Recomendado)

1. **Exportar o Projeto para o GitHub**:
   - No menu superior do Google AI Studio, clique em **Export** e selecione **Export to GitHub** (ou descarregue o ZIP e envie para o seu repositório GitHub).

2. **Importar na Vercel**:
   - Aceda a [https://vercel.com](https://vercel.com) e faça login.
   - Clique em **"Add New..."** ➜ **"Project"**.
   - Selecione o seu repositório GitHub do **RECOVERY HEALTH**.

3. **Configurações do Projeto na Vercel**:
   - **Framework Preset**: `Vite` (a Vercel deteta automaticamente).
   - **Build Command**: `npm run build` (ou padrão).
   - **Output Directory**: `dist` (ou padrão).

4. **Variáveis de Ambiente (Environment Variables)**:
   - No ecrã de configuração do projeto na Vercel (ou em **Settings ➜ Environment Variables**), adicione:
     - `GEMINI_API_KEY`: A sua chave da API do Google Gemini (obtenha em [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)).
     - `APP_URL`: URL atribuído pela Vercel após o deploy (ex.: `https://seu-app.vercel.app`).
     - `FIREBASE_PROJECT_ID`: `gen-lang-client-0760041056` (opcional, o código já possui fallback automático seguro).

5. **Clique em "Deploy"**:
   - A Vercel compilará a aplicação e disponibilizará o seu site instantaneamente com HTTPS e CDN global.

---

## 💻 Método 2: Lançamento via Vercel CLI

Se preferir utilizar a linha de comandos no seu computador local:

```bash
# 1. Instalar a CLI da Vercel (se ainda não tiver)
npm i -g vercel

# 2. Na pasta do projeto, execute:
vercel

# 3. Para enviar para produção:
vercel --prod
```

---

## 🛠️ O que foi preparado no projeto para a Vercel:

1. **`vercel.json` atualizado**:
   - Roteamento inteligente de rotas `/api/*` para as funções Serverless da Vercel.
   - Regras de reescrita SPA (`Single Page Application`) para evitar erros 404 ao navegar entre páginas como Casos Clínicos, Biblioteca e Perfil.
   - Cabeçalhos de cache otimizados para PWA (`sw.js` e `manifest.webmanifest`).

2. **Backend Serverless Resiliente (`server.ts` e `api/index.ts`)**:
   - Suporte nativo ao ambiente Serverless da Vercel (`process.env.VERCEL`).
   - Carregamento à prova de falhas da configuração do Firebase Firestore com fallbacks dinâmicos.
   - Separação entre modo de desenvolvimento local e execução na nuvem.

3. **Vite PWA & Cache Aumentado (`vite.config.ts`)**:
   - Limite de cache do Workbox expandido para 10 MB, evitando qualquer erro de limite de tamanho de bundles durante a compilação de produção.

4. **Ficheiro `.vercelignore`**:
   - Garante que ficheiros desnecessários (`node_modules`, `.env`, ficheiros de log) não sejam enviados, tornando o deploy ultra-rápido.
