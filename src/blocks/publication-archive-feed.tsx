"use client";

import clsx from "clsx";
import {
  EditableText,
  EditableTextarea,
  type WebsiteBuilderBlockComponentProps,
  type WebsiteBuilderBlockDefinition,
  createWebsiteBuilderLocalizedDefault,
  defineWebsiteBuilderBlockDefinition,
  useWebsiteBuilder,
  useWebsiteBuilderI18n,
  useWebsiteBuilderValueAtPath,
} from "@init-modules/website-builder";

type PublicationArchiveItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: null | string;
  href: string;
  publishedAt?: null | string;
  previewImage?: null | string;
};

type PublicationArchiveFeedProps = {
  eyebrow: string;
  title: string;
  body: string;
  emptyTitle: string;
  emptyBody: string;
  cardCtaLabel: string;
  columns: number;
  showExcerpt: boolean;
  showImage: boolean;
  items?: PublicationArchiveItem[];
};

const formatPublicationDate = (value?: null | string, locale = "en") => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

const PublicationArchiveFeed = ({
  block,
}: WebsiteBuilderBlockComponentProps<PublicationArchiveFeedProps>) => {
  const { mode } = useWebsiteBuilder();
  const { contentLocale } = useWebsiteBuilderI18n();
  const rawItems = useWebsiteBuilderValueAtPath(block.id, "items");
  const items = Array.isArray(rawItems)
    ? (rawItems as PublicationArchiveItem[])
    : [];
  const columns = Math.min(Math.max(Number(block.props.columns || 3), 1), 4);

  return (
    <section className="rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,17,31,0.85),rgba(6,12,22,0.96))] px-6 py-8 shadow-[0_30px_90px_rgba(2,8,23,0.28)] sm:px-8 sm:py-10">
      <div className="max-w-3xl">
        <EditableText
          blockId={block.id}
          path="eyebrow"
          className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/68"
        />
        <EditableText
          blockId={block.id}
          path="title"
          as="h1"
          className="mt-4 block text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl xl:text-5xl"
        />
        <EditableTextarea
          blockId={block.id}
          path="body"
          className="mt-5 max-w-2xl text-base leading-8 text-slate-300"
        />
      </div>

      {items.length > 0 ? (
        <div
          className="mt-8 grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(event) => {
                if (mode !== "preview") {
                  event.preventDefault();
                }
              }}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition hover:border-cyan-300/18 hover:bg-white/[0.05]"
            >
              {block.props.showImage && item.previewImage ? (
                <div className="aspect-[1.28] overflow-hidden bg-slate-950/60">
                  <img
                    src={item.previewImage}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col px-5 py-5">
                {formatPublicationDate(item.publishedAt, contentLocale) ? (
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/36">
                    {formatPublicationDate(item.publishedAt, contentLocale)}
                  </div>
                ) : null}
                <div className="mt-3 text-lg font-semibold leading-7 text-white">
                  {item.title}
                </div>
                {block.props.showExcerpt && item.excerpt ? (
                  <div className="mt-3 text-sm leading-7 text-slate-300">
                    {item.excerpt}
                  </div>
                ) : null}
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/72">
                  {block.props.cardCtaLabel}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-12 text-center">
          <div className="text-lg font-semibold text-white">
            {block.props.emptyTitle}
          </div>
          <div className="mt-3 text-sm leading-7 text-white/58">
            {block.props.emptyBody}
          </div>
        </div>
      )}
    </section>
  );
};

export const publicationArchiveFeedDefinition: WebsiteBuilderBlockDefinition<PublicationArchiveFeedProps> =
  defineWebsiteBuilderBlockDefinition<PublicationArchiveFeedProps>({
    type: "publication-archive-feed",
    label: "Publication Archive Feed",
    labelKey: "publicationWebsiteBuilder.archiveFeed.label",
    description:
      "Archive intro plus live publication cards for the current entity route.",
    descriptionKey: "publicationWebsiteBuilder.archiveFeed.description",
    category: "Publication",
    icon: "files",
    defaults: {
      eyebrow: createWebsiteBuilderLocalizedDefault({
        en: "Publication",
        ru: "Публикации",
      }),
      title: createWebsiteBuilderLocalizedDefault({
        en: "Archive",
        ru: "Архив",
      }),
      body: createWebsiteBuilderLocalizedDefault({
        en: "Template-owned intro copy sits above the live publication feed.",
        ru: "Вступительный текст шаблона расположен над живой лентой публикаций.",
      }),
      emptyTitle: createWebsiteBuilderLocalizedDefault({
        en: "No publications yet",
        ru: "Публикаций пока нет",
      }),
      emptyBody: createWebsiteBuilderLocalizedDefault({
        en: "Publish the first record to unlock this archive.",
        ru: "Опубликуйте первую запись, чтобы открыть этот архив.",
      }),
      cardCtaLabel: createWebsiteBuilderLocalizedDefault({
        en: "Open publication",
        ru: "Открыть публикацию",
      }),
      columns: 3,
      showExcerpt: true,
      showImage: true,
      items: [],
    },
    bindings: {
      items: {
        source: "publicationArchive",
        path: "items",
        mode: "read",
      },
    },
    fields: [
      {
        path: "eyebrow",
        label: "Eyebrow",
        labelKey: "publicationWebsiteBuilder.archiveFeed.eyebrow.label",
        kind: "text",
        group: "content",
        localization: "localized",
      },
      {
        path: "title",
        label: "Title",
        labelKey: "publicationWebsiteBuilder.archiveFeed.title.label",
        kind: "text",
        group: "content",
        localization: "localized",
      },
      {
        path: "body",
        label: "Body",
        labelKey: "publicationWebsiteBuilder.archiveFeed.body.label",
        kind: "textarea",
        group: "content",
        localization: "localized",
      },
      {
        path: "emptyTitle",
        label: "Empty title",
        labelKey: "publicationWebsiteBuilder.archiveFeed.emptyTitle.label",
        kind: "text",
        group: "content",
        localization: "localized",
      },
      {
        path: "emptyBody",
        label: "Empty body",
        labelKey: "publicationWebsiteBuilder.archiveFeed.emptyBody.label",
        kind: "textarea",
        group: "content",
        localization: "localized",
      },
      {
        path: "cardCtaLabel",
        label: "Card CTA label",
        kind: "text",
        group: "content",
        localization: "localized",
      },
      {
        path: "columns",
        label: "Columns",
        labelKey: "publicationWebsiteBuilder.archiveFeed.columns.label",
        kind: "number",
        group: "layout",
        min: 1,
        max: 4,
        step: 1,
        localization: "shared",
      },
      {
        path: "showExcerpt",
        label: "Show excerpt",
        labelKey: "publicationWebsiteBuilder.archiveFeed.showExcerpt.label",
        kind: "toggle",
        group: "content",
        localization: "shared",
      },
      {
        path: "showImage",
        label: "Show image",
        labelKey: "publicationWebsiteBuilder.archiveFeed.showImage.label",
        kind: "toggle",
        group: "content",
        localization: "shared",
      },
    ],
    component: PublicationArchiveFeed,
  });
