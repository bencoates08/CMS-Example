import type { CmsHeading as CmsHeadingProps } from "../../../api/cms/cms.types";
import styles from "../CmsComponent.module.css";

export const CmsHeading = ({ name, subType }: CmsHeadingProps) => {
  return (
    <div className={styles.container}>
      {(() => {
        switch (subType) {
          case "h5":
            return <h5>{name}</h5>;
          case "h4":
            return <h4>{name}</h4>;
          case "h3":
            return <h3>{name}</h3>;
          case "h2":
            return <h2>{name}</h2>;
          case "h1":
          default:
            return <h1>{name}</h1>;
        }
      })()}
    </div>
  );
};
