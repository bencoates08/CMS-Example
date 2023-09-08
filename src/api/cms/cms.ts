import mockCMSContent from "./mockResponses/mockCMSContent.json";
import mockCMSAds from "./mockResponses/mockCMSAds.json";
import { CmsContent, IngridAd } from "./cms.types";

export const fetchCMS = async (path: string): Promise<CmsContent[]> => {
  return Promise.resolve(mockCMSContent as any);
};

export const fetchAds = (): Promise<IngridAd[]> => {
  return Promise.resolve(mockCMSAds as any);
};
