---
sidebar_position: 1
slug: /
---

# Введение

## Установка

### SSS Extension

Вы можете с легкостью установите расширение SSS из ChromeWebStore. Пожалуйста, всегда используйте актуальную версию. 
Версия для разработки/тестирования может использоваться для тестирования и подтверждения.
Архивные версии выпускаются, чтобы можно было использовать более старые версии, когда последняя версия недоступна, например, когда в последней версии имеется ошибка.
Архивные версии обычно на одну или две версии отстают от последней версии.

Translated with www.DeepL.com/Translator (free version)

- [SSS Extension - Новая версия](https://chrome.google.com/webstore/detail/sss-extension/llildiojemakefgnhhkmiiffonembcan)
- [SSS Extension - Тестовая версия](https://chrome.google.com/webstore/detail/sss-extension-dev-beta/bljghapgomlclpjmhhjbjhofbgdpiihp)
- [SSS Extension - Архивная версия](https://chrome.google.com/webstore/detail/sss-extension/mhgjebmbajeidolanlbekpncopdeclio)

### Модуль SSS

The [Модуль SSS](https://www.npmjs.com/package/sss-module) можно установить с помощью npm или yarn.

Модуль SSS использует symbol-sdk версии 2.0.0.

```
npm install sss-module symbol-sdk@2.0.0 rxjs
```

```
yarn add sss-module symbol-sdk@2.0.0 rxjs
```

Загрузите модуль с помощью импорта в скрипт.

```ts
import { SSSWindow, getActiveAddress } from "sss-modle";
declare const window: SSSWindow;
```
