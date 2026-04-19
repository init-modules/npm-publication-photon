# @init-modules/publication-website-builder

Publication block kit for the package-first website builder.

## Назначение

@init-modules/publication-website-builder — npm/TypeScript package; Website Builder integration or runtime layer; publication domain layer. Пакет экспортирует TypeScript/React primitives для frontend-части Init/Rx и не должен смешивать backend-интеграции с клиентским runtime.

- Этот пакет находится в слое Website Builder. Доменная логика должна оставаться в базовых пакетах, а здесь должны быть только адаптеры, настройки страниц, runtime-провайдеры или UI-kit для конструктора.

## Установка

~~~bash
npm install @init-modules/publication-website-builder
~~~

Проверьте peer dependencies в host-приложении, особенно версии React, Next.js и соседних <code>@init-modules/*</code> пакетов.

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
- <code>@init-modules/publication ^0.1.0</code>
- <code>@init-modules/website-builder ^0.1.0</code>
- <code>react ^19.0.0</code>
- <code>react-dom ^19.0.0</code>

## Сборка

- Скрипты сборки в <code>package.json</code> не объявлены; пакет потребляется напрямую из <code>src</code>.

## Разработка

- держите типы публичного API рядом с основными entry points;
- не добавляйте host-specific код в базовые frontend SDK;
- Website Builder UI-kit и adapter packages должны оставаться над <code>@init-modules/website-builder</code>, не наоборот;
- перед публикацией выполните <code>npm run build</code>, если пакет собирается в <code>dist</code>.
