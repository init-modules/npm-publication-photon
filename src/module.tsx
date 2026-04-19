"use client";

import {
  createWebsiteBuilderKit,
  type WebsiteBuilderInstallableKit,
  type WebsiteBuilderModule,
} from "@init-modules/website-builder";
import { publicationArchiveFeedDefinition } from "./blocks/publication-archive-feed";
import { publicationRichContentBindingAdapter } from "./binding-adapters/publication-rich-content";
import { publicationArticleShellDefinition } from "./blocks/publication-article-shell";

export const publicationWebsiteBuilderModule: WebsiteBuilderModule = {
  module: "publication-website-builder",
  label: "Publication Website Builder",
  labelKey: "publicationWebsiteBuilder.module.label",
  version: "0.1.0",
  bindingAdapters: [publicationRichContentBindingAdapter],
  blocks: [publicationArchiveFeedDefinition, publicationArticleShellDefinition],
};

export const publicationWebsiteBuilderKit: WebsiteBuilderInstallableKit =
  createWebsiteBuilderKit({
    key: "publication-website-builder",
    label: "Publication Website Builder",
    modules: [publicationWebsiteBuilderModule],
  });
