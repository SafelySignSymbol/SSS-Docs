---
sidebar_position: 1
slug: /
---

# Introduction

## Install

### SSS Extension

ChromeWebStore から SSS Extension をインストール。通常時は最新版をご利用ください。開発者の方等による機能実装のリクエストがあった際に、
テストや確認を行うために開発・テスト版を使用する場合があります。
アーカイブ版は、最新版に不具合が発生するなど、最新版が使えない場合に旧バージョンを使用することができるように公開しています。
アーカイブ版は通常最新版の 1 つもしくは 2 つ後ろのバージョンが公開されています。

- [SSS Extension 最新版](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan)
- [SSS Extension 開発・テスト版](https://chrome.google.com/webstore/detail/sss-extension-dev-beta/bljghapgomlclpjmhhjbjhofbgdpiihp)
- [SSS Extension アーカイブ版](https://chrome.google.com/webstore/detail/sss-extension/mhgjebmbajeidolanlbekpncopdeclio)

### SSS Module

[SSS Module](https://www.npmjs.com/package/sss-module)は npm や yarn を用いてインストールすることができます。

SSS Module では symbol-sdk ver 2.0.0 を用いて型宣言を行っています。

```
npm install sss-module symbol-sdk@2.0.0 rxjs
```

```
yarn add sss-module symbol-sdk@2.0.0 rxjs
```

スクリプト上で import を用いてモジュールを読み込みます。

```ts
import { SSSWindow, getActiveAddress } from "sss-modle";
declare const window: SSSWindow;
```
