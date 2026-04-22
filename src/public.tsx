"use client";

import {
	createPhotonKit,
	type PhotonInstallableKit,
	type PhotonModule,
} from "@init/photon/public";
import { publicationRichContentBindingAdapter } from "./binding-adapters/publication-rich-content";
import { publicationArchiveFeedDefinition } from "./blocks/publication-archive-feed";
import { publicationArticleShellDefinition } from "./blocks/publication-article-shell";
import { publicationPhotonSiteFrameExtension } from "./sdk";

export const publicationPublicPhotonModule: PhotonModule = {
	module: "publication-photon",
	label: "Publication Photon",
	labelKey: "publicationPhoton.module.label",
	version: "0.1.0",
	bindingAdapters: [publicationRichContentBindingAdapter],
	blocks: [publicationArchiveFeedDefinition, publicationArticleShellDefinition],
};

export const publicationPublicPhotonKit: PhotonInstallableKit =
	createPhotonKit({
		key: "publication-photon",
		label: "Publication Photon",
		modules: [publicationPublicPhotonModule],
		siteFrameExtensions: [publicationPhotonSiteFrameExtension],
	});
