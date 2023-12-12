# projetClarify

Ce projet est un système de réseau social très simple intégrant une IA d'image via API.
- On peut se connecter avec : username: a, mdp: 00.  
- Connecté, on peut voir une liste des posts des utilisateurs de l'application.  
- On peut poster un post avec une image et, à l'aide de l'API de Clarifai, récupérer 3 suggestions de tag à appliquer au post.  
- Chaque image poster a aussi une balise alt et title, contenant une description faite via les tags récupérés, pour les personnes malvoyantes.
- Système de blacklist pour les posts.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
