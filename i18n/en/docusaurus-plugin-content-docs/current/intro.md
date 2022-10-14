---
sidebar_position: 1
slug: /
---

# Introduction

## Install

### SSS Extension

Install SSS Extension from ChromeWebStore. Please use the latest version under normal circumstances. When there is a request for function implementation by developers, etc., the development and test version may be used for testing and confirmation.
The development/test version may be used for testing and confirmation.
Archived versions are released so that older versions can be used when the latest version is not available, for example, when a bug occurs in the latest version.
Archived versions are usually one or two versions behind the latest version.

Translated with www.DeepL.com/Translator (free version)

- [SSS Extension 最新版](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan)
- [SSS Extension 開発・テスト版](https://chrome.google.com/webstore/detail/sss-extension-dev-beta/bljghapgomlclpjmhhjbjhofbgdpiihp)
- [SSS Extension アーカイブ版](https://chrome.google.com/webstore/detail/sss-extension/mhgjebmbajeidolanlbekpncopdeclio)

### SSS Module

The [SSS Module](https://www.npmjs.com/package/sss-module) can be installed using npm or yarn.

The SSS Module uses symbol-sdk ver 2.0.0 to declare types.

```
npm install sss-module symbol-sdk@2.0.0 rxjs
```

```
yarn add sss-module symbol-sdk@2.0.0 rxjs
```

Load the module using import on the script.

```ts
import { SSSWindow, getActiveAddress } from "sss-modle";
declare const window: SSSWindow;
```
