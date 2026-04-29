import {
	createPhotonAppModule,
	type PhotonAppModule,
} from "@init/photon-nextjs";
import { publicationPhotonSiteFrameContributions } from "./contributions";

export const createPublicationPhotonAppModule = (): PhotonAppModule =>
	createPhotonAppModule({
		name: "publication-photon",
		siteFrameContributions: publicationPhotonSiteFrameContributions,
	});
