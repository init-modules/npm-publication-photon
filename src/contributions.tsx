import {
	definePhotonSiteFrameContribution,
	type PhotonSiteFrameContributionRenderProps,
	footerNavigationSlot,
	headerUtilitySlot,
} from "@init/photon";
import { PhotonLink } from "@init/photon/public";

const pickLocalized = (
	value: Record<string, string> | undefined,
	fallback: string,
): string => {
	if (!value) return fallback;
	return value.en ?? value.ru ?? Object.values(value)[0] ?? fallback;
};

type SimpleLinkDefaults = {
	enabled?: boolean;
	order?: number;
	label?: Record<string, string>;
	href?: string;
};

const SimpleLinkComponent = (
	props: PhotonSiteFrameContributionRenderProps<SimpleLinkDefaults>,
) => (
	<PhotonLink href={props.href ?? "#"}>
		<span>{pickLocalized(props.label, "")}</span>
	</PhotonLink>
);

export const publicationBlogContribution = definePhotonSiteFrameContribution({
	id: "publication.utility.blog",
	packageName: "publication-photon",
	slot: headerUtilitySlot,
	defaults: {
		enabled: true,
		order: 40,
		label: { ru: "Блог", en: "Blog" },
		href: "/blog",
	} satisfies SimpleLinkDefaults,
	configurable: {
		enabled: { kind: "toggle" },
		label: { kind: "localized-text", label: "Blog link label" },
		order: { kind: "order" },
	},
	component: SimpleLinkComponent,
});

export const publicationNewsContribution = definePhotonSiteFrameContribution({
	id: "publication.utility.news",
	packageName: "publication-photon",
	slot: headerUtilitySlot,
	defaults: {
		enabled: true,
		order: 50,
		label: { ru: "Новости", en: "News" },
		href: "/news",
	} satisfies SimpleLinkDefaults,
	configurable: {
		enabled: { kind: "toggle" },
		label: { kind: "localized-text", label: "News link label" },
		order: { kind: "order" },
	},
	component: SimpleLinkComponent,
});

type PublicationFooterColumnDefaults = {
	enabled?: boolean;
	order?: number;
	title?: Record<string, string>;
	links?: ReadonlyArray<{
		id: string;
		label: Record<string, string>;
		href: string;
	}>;
};

const PublicationFooterColumnComponent = (
	props: PhotonSiteFrameContributionRenderProps<PublicationFooterColumnDefaults>,
) => (
	<section>
		<h3>{pickLocalized(props.title, "Publication")}</h3>
		<ul>
			{(props.links ?? []).map((link) => (
				<li key={link.id}>
					<PhotonLink href={link.href}>
						{pickLocalized(link.label, link.id)}
					</PhotonLink>
				</li>
			))}
		</ul>
	</section>
);

export const publicationFooterColumnContribution =
	definePhotonSiteFrameContribution({
		id: "publication.footer-column",
		packageName: "publication-photon",
		slot: footerNavigationSlot,
		defaults: {
			enabled: true,
			order: 40,
			title: { ru: "Публикации", en: "Publication" },
			links: [
				{
					id: "publication.footer.blog",
					label: { ru: "Блог", en: "Blog" },
					href: "/blog",
				},
				{
					id: "publication.footer.news",
					label: { ru: "Новости", en: "News" },
					href: "/news",
				},
			],
		} satisfies PublicationFooterColumnDefaults,
		configurable: {
			enabled: { kind: "toggle", label: "Show Publication footer column" },
			title: { kind: "localized-text", label: "Column title" },
			order: { kind: "order" },
		},
		component: PublicationFooterColumnComponent,
	});

export const publicationPhotonSiteFrameContributions = [
	publicationBlogContribution,
	publicationNewsContribution,
	publicationFooterColumnContribution,
];
