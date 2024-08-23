# Projeto Mobile

Este projeto foi criado usando [Expo](https://expo.dev/) e [React Native](https://reactnative.dev/).

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [TypeScript](https://www.typescriptlang.org/)
- [CocoaPods](https://cocoapods.org/) (para iOS)

## Passos para execução

Siga os passos abaixo para configurar e executar o projeto:

### 1. Criar o projeto

- Cria um novo projeto usando o template blank do Expo
```js
npx create-expo-app nomeProjeto --template blank
```
- Inicializa o TypeScript no projeto, criando um arquivo tsconfig.json
```js
tsc --init
```
- Executa o prebuild do Expo, configurando o projeto para ser executado diretamente no React Native CLI
npx expo prebuild

- Ejeta o projeto do Expo, permitindo controle completo sobre a configuração nativa
```js
expo eject
```
- Navega até o diretório ios e instala as dependências necessárias para iOS
cd ios
```js
pod install
```
- Volta para o diretório raiz do projeto
```js
cd ..
```
- Executa o projeto no simulador iOS usando o React Native CLI
```js
npx react-native run-ios || npx react-native run-android
```



### 1. Rodar o projeto
- Executa o projeto no simulador iOS usando o React Native CLI
```js
npx react-native run-ios || npx react-native run-android
```