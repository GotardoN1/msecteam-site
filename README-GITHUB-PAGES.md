# MSEC TEAM no GitHub Pages

Este projeto está preparado para publicação como site estático no GitHub Pages. O workflow em `.github/workflows/deploy-pages.yml` instala as dependências, gera o build, cria o fallback `404.html` para as rotas React e publica automaticamente a cada push na branch `main`.

## Publicação inicial

Crie um repositório no GitHub, por exemplo `msecteam-site`, e envie o conteúdo desta pasta:

```bash
git init
git add .
git commit -m "feat: site MSEC TEAM pronto para GitHub Pages"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/msecteam-site.git
git push -u origin main
```

Depois, no GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de publicação. O workflow será executado automaticamente e o endereço ficará no formato:

```text
https://SEU_USUARIO.github.io/msecteam-site/
```

Se o repositório for o site de usuário `SEU_USUARIO.github.io`, o mesmo workflow também funciona; nesse caso, o endereço não terá o sufixo `/msecteam-site/`.

## Rotas disponíveis

As rotas internas já usam o caminho base do Vite e funcionam em subdiretório:

- `/` — homepage;
- `/story` — Nossa história;
- `/tryout` — formulário de peneira;
- `/master` — painel local de conteúdo e candidaturas.

## Importante sobre o painel Master

O GitHub Pages hospeda apenas arquivos estáticos. Portanto, o conteúdo editado, a senha local e as candidaturas continuam salvos no `localStorage` do navegador usado. Eles **não são sincronizados entre dispositivos** e não devem ser tratados como autenticação ou armazenamento seguro.

Para produção, conecte o Master a um backend com autenticação e banco de dados. O frontend já separa os fluxos de conteúdo e candidaturas para essa futura integração.

## Assets

Os assets oficiais foram copiados para `client/public/assets`, comprimidos e referenciados por `assetPath`, respeitando o caminho base do GitHub Pages. O conjunto inclui a logo oficial, o hero, seis retratos do roster e três capas de notícias.

## Atualizações futuras

Depois da configuração inicial, basta fazer push na branch `main`:

```bash
git add .
git commit -m "atualiza conteúdo MSEC"
git push
```

O GitHub Actions publicará a nova versão automaticamente.
