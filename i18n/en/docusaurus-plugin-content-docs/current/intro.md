---
sidebar_position: 1
slug: /
---

# Introduction

## Install

### SSS Extension

You can easily install the SSS extension from the ChromeWebStore. Please always use the latest version.
The development/test version may be used for testing and confirmation.
Archived versions are released so that older versions can be used when the latest version is not available, such as when the latest version has a bug.
Archived versions are usually one or two versions behind the latest version.

Translated with www.DeepL.com/Translator (free version)

- [SSS Extension - New version](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan)
- [SSS Extension - Test version](https://chrome.google.com/webstore/detail/sss-extension-dev-beta/bljghapgomlclpjmhhjbjhofbgdpiihp)
- [SSS Extension - Archived version](https://chrome.google.com/webstore/detail/sss-extension/mhgjebmbajeidolanlbekpncopdeclio)

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
