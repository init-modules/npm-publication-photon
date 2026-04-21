"use client";

import {
	createWebsiteBuilderLocalizedDefault,
	defineWebsiteBuilderBlockDefinition,
	EditableImage,
	EditableRichText,
	EditableText,
	EditableTextarea,
	useWebsiteBuilder,
	useWebsiteBuilderI18n,
	useWebsiteBuilderValueAtPath,
	type WebsiteBuilderBlockComponentProps,
	type WebsiteBuilderBlockDefinition,
} from "@init-modules/website-builder/public";
import clsx from "clsx";

type PublicationArticleCategory = {
	id: string;
	name: string;
	slug: string;
};

type PublicationArticleShellProps = {
	eyebrow: string;
	backLabel: string;
	showExcerpt: boolean;
	showCover: boolean;
	showMeta: boolean;
	title?: string;
	excerpt?: null | string;
	content?: string;
	previewImage?: unknown;
	publishedAt?: null | string;
	categories?: PublicationArticleCategory[];
	archiveHref?: string;
	entityLabel?: string;
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
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(parsed);
};

const PublicationArticleShell = ({
	block,
}: WebsiteBuilderBlockComponentProps<PublicationArticleShellProps>) => {
	const { mode } = useWebsiteBuilder();
	const { contentLocale } = useWebsiteBuilderI18n();
	const publishedAt = useWebsiteBuilderValueAtPath(block.id, "publishedAt") as
		| null
		| string;
	const categories = (useWebsiteBuilderValueAtPath(block.id, "categories") ??
		[]) as PublicationArticleCategory[];
	const archiveHref = (useWebsiteBuilderValueAtPath(block.id, "archiveHref") ??
		"/") as string;
	const entityLabel =
		(useWebsiteBuilderValueAtPath(block.id, "entityLabel") as null | string) ??
		block.props.eyebrow;

	return (
		<section className="rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(7,17,31,0.88),rgba(4,10,19,0.98))] px-6 py-8 shadow-[0_32px_110px_rgba(2,8,23,0.32)] sm:px-8 sm:py-10 lg:px-10">
			<a
				href={archiveHref}
				onClick={(event) => {
					if (mode !== "preview") {
						event.preventDefault();
					}
				}}
				className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-100/72"
			>
				<span>{block.props.backLabel}</span>
				<span className="text-white/28">/</span>
				<span>{entityLabel}</span>
			</a>

			<div className="mt-5">
				<div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/34">
					{block.props.eyebrow}
				</div>
				<EditableText
					blockId={block.id}
					path="title"
					as="h1"
					className="mt-4 block text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-white sm:text-4xl xl:text-5xl"
				/>
			</div>

			{block.props.showMeta ? (
				<div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/44">
					{formatPublicationDate(publishedAt, contentLocale) ? (
						<div>{formatPublicationDate(publishedAt, contentLocale)}</div>
					) : null}
					{categories.map((category) => (
						<div
							key={category.id}
							className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-white/66"
						>
							{category.name}
						</div>
					))}
				</div>
			) : null}

			{block.props.showCover ? (
				<EditableImage
					blockId={block.id}
					path="previewImage"
					className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/55"
					imageClassName="aspect-[1.82] h-full w-full object-cover"
				/>
			) : null}

			{block.props.showExcerpt ? (
				<EditableTextarea
					blockId={block.id}
					path="excerpt"
					className={clsx(
						"mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-5 text-base leading-8 text-slate-200",
					)}
				/>
			) : null}

			<div className="mt-8">
				<EditableRichText
					blockId={block.id}
					path="content"
					className="text-base leading-8 text-slate-100"
				/>
			</div>
		</section>
	);
};

export const publicationArticleShellDefinition: WebsiteBuilderBlockDefinition<PublicationArticleShellProps> =
	defineWebsiteBuilderBlockDefinition<PublicationArticleShellProps>({
		type: "publication-article-shell",
		label: "Publication Article Shell",
		labelKey: "publicationWebsiteBuilder.articleShell.label",
		description:
			"Single publication page where builder structure stays shared and content binds to the current record.",
		descriptionKey: "publicationWebsiteBuilder.articleShell.description",
		category: "Publication",
		icon: "file-text",
		defaults: {
			eyebrow: createWebsiteBuilderLocalizedDefault({
				en: "Publication",
				ru: "Публикация",
			}),
			backLabel: createWebsiteBuilderLocalizedDefault({
				en: "Back to archive",
				ru: "Назад в архив",
			}),
			showExcerpt: true,
			showCover: true,
			showMeta: true,
			title: "Publication title",
			excerpt: "Publication excerpt",
			content: "<p>Publication content</p>",
		},
		bindings: {
			title: {
				source: "publication",
				path: "title",
				mode: "write",
			},
			excerpt: {
				source: "publication",
				path: "excerpt",
				mode: "write",
			},
			content: {
				source: "publication",
				path: "content",
				mode: "write",
				adapter: "publication-website-builder::rich-content-json",
			},
			previewImage: {
				source: "publication",
				path: "previewImage",
				mode: "write",
			},
			publishedAt: {
				source: "publication",
				path: "publishedAt",
				mode: "read",
			},
			categories: {
				source: "publication",
				path: "categories",
				mode: "read",
			},
			archiveHref: {
				source: "publication",
				path: "archiveHref",
				mode: "read",
			},
			entityLabel: {
				source: "publication",
				path: "entityLabel",
				mode: "read",
			},
		},
		fields: [
			{
				path: "eyebrow",
				label: "Eyebrow",
				labelKey: "publicationWebsiteBuilder.articleShell.eyebrow.label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "backLabel",
				label: "Back label",
				labelKey: "publicationWebsiteBuilder.articleShell.backLabel.label",
				kind: "text",
				group: "content",
				localization: "localized",
			},
			{
				path: "showExcerpt",
				label: "Show excerpt",
				labelKey: "publicationWebsiteBuilder.articleShell.showExcerpt.label",
				kind: "toggle",
				group: "content",
				localization: "shared",
			},
			{
				path: "showCover",
				label: "Show cover",
				labelKey: "publicationWebsiteBuilder.articleShell.showCover.label",
				kind: "toggle",
				group: "content",
				localization: "shared",
			},
			{
				path: "showMeta",
				label: "Show meta",
				labelKey: "publicationWebsiteBuilder.articleShell.showMeta.label",
				kind: "toggle",
				group: "content",
				localization: "shared",
			},
		],
		component: PublicationArticleShell,
	});
