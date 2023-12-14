Baptiste Houques - ESGI Mastère 2
# projetClarify

Ce projet est un système de réseau social très simple intégrant des IA vie API.
## TP1 - Input d'image
- On peut se connecter avec : username: a, mdp: 00.  
- Connecté, on peut voir une liste des posts des utilisateurs de l'application.  
- On peut poster un post avec une image et, à l'aide de l'IA "general-image-recognition" via l'API de Clarifai, récupérer 3 suggestions de tag à appliquer au post.  
- Chaque image postée a aussi une balise alt et title, contenant une description faite via les tags récupérés, pour les personnes malvoyantes.
- Système de blacklist pour les posts.

## TP2 - Input de texte
- Système de traduction de post avec l'IA de ChatGPT (GPT-3_5-turbo)

## Configuration
- Changer le PAT dans le .env par le votre.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

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
