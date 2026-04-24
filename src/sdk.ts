import {
	createPhotonSiteFrameExtension,
	type PhotonSiteFrameExtension,
} from "@init/photon/public";

export const publicationPhotonSiteFrameExtension: PhotonSiteFrameExtension =
	createPhotonSiteFrameExtension({
		id: "publication",
		label: "Publication",
		order: 40,
		header: {
			slots: {
				utility: {
					links: [
						{
							id: "publication:blog",
							label: "Blog",
							href: "/blog",
							order: 40,
						},
						{
							id: "publication:news",
							label: "News",
							href: "/news",
							order: 50,
						},
					],
				},
			},
		},
		footer: {
			slots: {
				navigation: {
					navigationColumns: [
						{
							id: "publication:footer",
							title: "Publication",
							order: 40,
							links: [
								{
									id: "publication:footer-blog",
									label: "Blog",
									href: "/blog",
								},
								{
									id: "publication:footer-news",
									label: "News",
									href: "/news",
								},
							],
						},
					],
				},
			},
		},
	});
