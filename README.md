# FS FitLife — Suplementos & Emagrecedores

Site de vitrine de afiliados construído em [Astro](https://astro.build), focado em suplementos, termogênicos e emagrecedores. Cada produto tem sua própria página de detalhe; o botão de compra leva ao checkout do link de afiliado. O conteúdo dos produtos é editável por um painel CMS (Decap CMS) em `/admin`.

## Estrutura

```text
/
├── api/
│   ├── auth.js           # Inicia o login do GitHub (OAuth) para o CMS
│   └── callback.js       # Recebe o retorno do GitHub e autentica o CMS
├── public/
│   ├── admin/
│   │   └── index.html    # Painel de edição de conteúdo (Decap CMS)
│   └── images/           # Imagens enviadas pelo painel ficam aqui
├── src/
│   ├── components/        # Header, Hero, carrosséis, Footer, etc.
│   ├── content/
│   │   └── products/      # Um arquivo .json por produto (editado pelo painel)
│   ├── content.config.ts  # Schema de validação dos produtos
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro            # Página inicial / vitrine
│       └── produto/[slug].astro   # Página de detalhe do produto (gerada para cada produto)
```

## Painel de conteúdo (CMS)

Acesse **`https://fsfitlife.vercel.app/admin`** para editar produtos sem tocar em código: imagem, nome, descrição, preço, benefícios, link de afiliado, etc. Cada alteração salva no painel cria um commit automático neste repositório e a Vercel publica a mudança.

### Configuração inicial (uma única vez)

O painel autentica via GitHub OAuth. Para funcionar, é preciso:

1. **Criar um OAuth App no GitHub**: acesse [github.com/settings/developers](https://github.com/settings/developers) → "New OAuth App" e preencha:
   - **Application name**: FS FitLife CMS
   - **Homepage URL**: `https://fsfitlife.vercel.app`
   - **Authorization callback URL**: `https://fsfitlife.vercel.app/api/callback`
2. Copie o **Client ID** gerado e clique em "Generate a new client secret" para obter o **Client Secret**.
3. No painel da [Vercel](https://vercel.com), abra o projeto → **Settings → Environment Variables** e adicione:
   - `GITHUB_CLIENT_ID` = (o Client ID copiado)
   - `GITHUB_CLIENT_SECRET` = (o Client Secret copiado)
4. Faça um novo deploy (ou re-deploy) para que as variáveis entrem em vigor.
5. Acesse `/admin`, clique em "Login with GitHub" e autorize. A conta do GitHub usada precisa ter acesso de escrita a este repositório.

> Se o domínio final do site for diferente de `fsfitlife.vercel.app` (ex: domínio próprio), atualize a Homepage/Callback URL no GitHub e o campo `base_url` em `public/admin/index.html` para o novo domínio.

## Como adicionar/editar produtos sem o painel (manual)

Cada produto é um arquivo `.json` em [`src/content/products/`](src/content/products). O nome do arquivo (sem `.json`) é o slug usado na URL `/produto/<slug>`. Campos:

- `affiliateUrl`: **substitua pela URL real de checkout do seu link de afiliado** (Hotmart, Monetizze, Eduzz, Amazon Associates, etc.).
- `image`: URL da imagem do produto (ou caminho `/images/...` se enviada pelo painel).
- Demais campos (`description`, `longDescription`, `benefits`, `howToUse`, preços, categoria, avaliação) controlam o que aparece na vitrine e na página de detalhe.

Para criar um novo produto, basta adicionar um novo arquivo `.json` nessa pasta — o Astro gera automaticamente a página `/produto/<slug>` correspondente.

## Comandos

| Comando           | Ação                                          |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala as dependências                        |
| `npm run dev`        | Inicia o servidor local em `localhost:4321`   |
| `npm run build`      | Gera o build de produção em `./dist/`          |
| `npm run preview`    | Visualiza o build de produção localmente       |

## Deploy

O projeto já está configurado para deploy estático na [Vercel](https://vercel.com) (`vercel.json`), incluindo as funções serverless em `api/` usadas pelo painel de conteúdo. Basta conectar o repositório do GitHub ao seu projeto na Vercel — o build (`npm run build`) e o diretório de saída (`dist`) já estão definidos.
