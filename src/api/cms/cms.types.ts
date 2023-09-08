export type CmsHeading = {
  type: "heading";
  subType: "h1" | "h2" | "h3" | "h4" | "h5";
  id: string;
  name: string;
};

export type CmsQuickLinks = {
  type: "quick-links";
  id: string;
  cannedSearches: {
    name: string;
    term: string;
  }[];
};

export type CmsProductLister = {
  type: "product-lister";
  id: string;
  searchControlId: string;
  defaultCannedSearch: string;
};

export type CmsContent = CmsHeading | CmsQuickLinks | CmsProductLister;

export type IngridAd = {
  id: string;
  title: string;
  imgURL: string;
  placement: "ingrid1" | "ingrid2";
};
