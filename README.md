# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### GIT COMMAND TO PUSH A VUE PROJECT IN GITHUB PAGES

## 1

```sh
npm run build
```

## 2
```sh
git add dist -f
```
## 3
```sh
git commit -m "adding dist, VERSION-1.0.9"
```

## 4
```sh
git subtree push --prefix dist origin gh-pages
```