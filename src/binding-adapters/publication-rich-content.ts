import {
	getPhotonAnchorRel,
	sanitizePhotonLinkHref,
	sanitizePhotonRichTextHtml,
	type PhotonBindingAdapter,
} from "@init/photon/public";

const escapeHtml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");

const escapeAttribute = (value: string) =>
	escapeHtml(value).replaceAll('"', "&quot;");

const normalizeHref = (value: unknown) => {
	const sanitizedHref = sanitizePhotonLinkHref(value, "");

	return sanitizedHref === "" ? null : sanitizedHref;
};

const renderMarks = (html: string, marks: unknown): string => {
	if (!Array.isArray(marks)) {
		return html;
	}

	return marks.reduce((current, mark) => {
		if (!mark || typeof mark !== "object") {
			return current;
		}

		const source = mark as {
			type?: unknown;
			attrs?: Record<string, unknown>;
		};

		switch (source.type) {
			case "bold":
			case "strong":
				return `<strong>${current}</strong>`;
			case "italic":
			case "em":
				return `<em>${current}</em>`;
			case "code":
				return `<code>${current}</code>`;
			case "link": {
				const href = normalizeHref(source.attrs?.href);

				if (!href) {
					return current;
				}

				const title =
					typeof source.attrs?.title === "string"
						? ` title="${escapeAttribute(source.attrs.title)}"`
						: "";
				const target =
					source.attrs?.target === "_blank" ? ` target="_blank"` : "";
				const rel = getPhotonAnchorRel(
					source.attrs?.target,
					source.attrs?.rel,
				);
				const relAttribute = rel ? ` rel="${escapeAttribute(rel)}"` : "";

				return `<a href="${escapeAttribute(href)}"${title}${target}${relAttribute}>${current}</a>`;
			}
			default:
				return current;
		}
	}, html);
};

const renderProseMirrorNode = (node: unknown): string => {
	if (!node || typeof node !== "object") {
		return "";
	}

	const source = node as {
		type?: unknown;
		text?: unknown;
		content?: unknown;
		marks?: unknown;
		attrs?: Record<string, unknown>;
	};
	const children = Array.isArray(source.content)
		? source.content.map(renderProseMirrorNode).join("")
		: "";

	switch (source.type) {
		case "text":
			return renderMarks(escapeHtml(String(source.text ?? "")), source.marks);
		case "heading": {
			const level =
				typeof source.attrs?.level === "number" &&
				source.attrs.level >= 1 &&
				source.attrs.level <= 6
					? source.attrs.level
					: 2;
			return `<h${level}>${children}</h${level}>`;
		}
		case "paragraph":
			return `<p>${children}</p>`;
		case "blockquote":
			return `<blockquote>${children}</blockquote>`;
		case "bulletList":
			return `<ul>${children}</ul>`;
		case "orderedList":
			return `<ol>${children}</ol>`;
		case "listItem":
			return `<li>${children}</li>`;
		case "hardBreak":
			return "<br>";
		default:
			return children;
	}
};

export const publicationRichContentBindingAdapter: PhotonBindingAdapter =
	{
		key: "publication-photon::rich-content-json",
		read: (value) => {
			if (typeof value === "string") {
				return sanitizePhotonRichTextHtml(value);
			}

			if (!value || typeof value !== "object") {
				return "";
			}

			const document = value as { content?: unknown };

			const html = Array.isArray(document.content)
				? document.content.map(renderProseMirrorNode).join("")
				: "";

			return sanitizePhotonRichTextHtml(html);
		},
	};
