# @init/publication-photon

Publication block kit for the package-first photon.

## Назначение

@init/publication-photon — npm/TypeScript package; Photon integration or runtime layer; publication domain layer. Пакет экспортирует TypeScript/React primitives для frontend-части Init/Rx и не должен смешивать backend-интеграции с клиентским runtime.

- Этот пакет находится в слое Photon. Доменная логика должна оставаться в базовых пакетах, а здесь должны быть только адаптеры, настройки страниц, runtime-провайдеры или UI-kit для конструктора.

## Установка

~~~bash
npm install @init/publication-photon
~~~

Проверьте peer dependencies в host-приложении, особенно версии React, Next.js и соседних <code>@init/*</code> пакетов.

## Экспорты

- <code>.</code>

Основные entry points:
- <code>index.ts</code>

## Состав пакета

- **binding-adapters**: <code>binding-adapters/publication-rich-content.ts</code>
- **blocks**: <code>blocks/publication-archive-feed.tsx</code>, <code>blocks/publication-article-shell.tsx</code>
- **Root**: <code>index.ts</code>, <code>module.tsx</code>

## Зависимости

Runtime dependencies:
- <code>clsx ^2.1.1</code>

Peer dependencies:
- <code>@init/publication ^0.1.0</code>
- <code>@init/photon ^0.1.0</code>
- <code>react ^19.0.0</code>
- <code>react-dom ^19.0.0</code>

## Сборка

- Скрипты сборки в <code>package.json</code> не объявлены; пакет потребляется напрямую из <code>src</code>.

## Разработка

- держите типы публичного API рядом с основными entry points;
- не добавляйте host-specific код в базовые frontend SDK;
- Photon UI-kit и adapter packages должны оставаться над <code>@init/photon</code>, не наоборот;
- перед публикацией выполните <code>npm run build</code>, если пакет собирается в <code>dist</code>.
