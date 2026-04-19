import {
	createWebsiteBuilderSiteFrameExtension,
	type WebsiteBuilderSiteFrameExtension,
} from "@init-modules/website-builder";

export const publicationWebsiteBuilderSiteFrameExtension: WebsiteBuilderSiteFrameExtension =
	createWebsiteBuilderSiteFrameExtension({
		id: "publication",
		label: "Publication",
		order: 40,
		header: {
			utilityLinks: [
				{ id: "publication:blog", label: "Blog", href: "/blog", order: 40 },
				{ id: "publication:news", label: "News", href: "/news", order: 50 },
			],
		},
		footer: {
			navigationColumns: [
				{
					id: "publication:footer",
					title: "Publication",
					order: 40,
					links: [
						{ id: "publication:footer-blog", label: "Blog", href: "/blog" },
						{ id: "publication:footer-news", label: "News", href: "/news" },
					],
				},
			],
		},
	});
