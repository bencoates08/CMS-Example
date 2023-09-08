import { CmsContent } from "../../api/cms/cms.types";
import { CmsHeading } from "./CmsHeading/CmsHeading";
import { CmsQuickLinks } from "./CmsQuickLinks/CmsQuickLinks";
import { CmsProductLister } from "./CmsProductLister/CmsProductLister";

interface CmsComponentProps {
  content: CmsContent;
}

export const CmsComponent = ({ content }: CmsComponentProps): JSX.Element => {
  switch (content.type) {
    case "heading":
      return <CmsHeading {...content} />;
    case "quick-links":
      return <CmsQuickLinks {...content} />;
    case "product-lister":
      return <CmsProductLister {...content} />;
    default:
      throw new Error("component not found");
  }
};
